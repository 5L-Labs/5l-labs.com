#!/usr/bin/env python3

import argparse
import json
import logging
import os
import sys
import time
from datetime import datetime

try:
    import defusedxml.ElementTree as ET
except ImportError:
    raise ImportError("defusedxml is required for secure XML parsing. Install it with: uv pip install defusedxml")
from io import StringIO
from pathlib import Path
from urllib.parse import urlparse, urljoin

import requests
import toml
from tqdm import tqdm

# Conditionally import ollama if available
try:
    import ollama

    OLLAMA_AVAILABLE = True
except ImportError:
    OLLAMA_AVAILABLE = False
    logging.warning(
        "ollama package not available. Only OpenAI-compatible API mode will work."
    )


logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

DEFAULT_EMBEDDING_MODEL_NAME = "nomic-embed-text:v1.5"


def run_embed(input_text: str, model: str = DEFAULT_EMBEDDING_MODEL_NAME):
    """
    Gets an embedding using Ollama directly.
    """
    if not OLLAMA_AVAILABLE:
        raise RuntimeError(
            "Ollama package is not available. Install it with: uv pip install ollama"
        )

    ollama_response = ollama.embed(model, input_text)
    if not ollama_response:
        logger.error("Failed to get a response from Ollama.")
        return None
    return ollama_response.embeddings[0]


def get_embedding(text, api_base, api_key, model):
    """
    Gets an embedding for the given text using an OpenAI-compatible API.
    """
    headers = {
        "Content-Type": "application/json",
    }
    if api_key and api_key != "ollama":
        headers["Authorization"] = f"Bearer {api_key}"

    data = {"model": model, "input": text}

    try:
        response = requests.post(
            f"{api_base}/embeddings", headers=headers, json=data, timeout=30
        )
        response.raise_for_status()
        embedding_data = response.json()
        return embedding_data["data"][0]["embedding"]
    except requests.exceptions.RequestException as e:
        logger.error(f"Error getting embedding: {e}")
        return None


def get_page_content(url, base_url, max_size=10 * 1024 * 1024, max_redirects=5):  # 10MB limit
    """
    Fetches the text content of a web page with a size limit and safe redirect following.
    """
    current_url = url
    redirect_count = 0

    while redirect_count < max_redirects:
        try:
            # Security: Disable redirects to prevent SSRF, handle manually
            response = requests.get(current_url, timeout=30, stream=True, allow_redirects=False)

            # Check for redirects
            if response.is_redirect:
                redirect_count += 1
                location = response.headers.get('Location')
                if not location:
                    response.close()
                    logger.warning(f"Skipping {current_url}: Redirect without Location header")
                    return None

                # Resolve relative redirects
                next_url = urljoin(current_url, location)

                # Security Check: Ensure next_url starts with base_url (SSRF protection)
                if not next_url.startswith(base_url):
                    response.close()
                    logger.warning(f"Skipping {current_url}: Redirect to external/forbidden URL {next_url}")
                    return None

                # Strict prefix check to prevent domain confusion (e.g. localhost:3000.evil.com)
                if len(next_url) > len(base_url):
                    next_char = next_url[len(base_url)]
                    if (
                        not base_url.endswith("/")
                        and next_char != "/"
                        and next_char != "?"
                        and next_char != "#"
                    ):
                        response.close()
                        logger.warning(
                            f"Skipping {current_url}: Potential prefix match attack: {next_url} vs {base_url}"
                        )
                        return None

                logger.debug(f"Following redirect: {current_url} -> {next_url}")
                current_url = next_url
                response.close()
                continue

            response.raise_for_status()

            # Security Check: Verify Content-Type
            content_type = response.headers.get("Content-Type", "").lower()
            # Split to handle charset (e.g. text/html; charset=utf-8)
            mime_type = content_type.split(";")[0].strip()

            allowed_types = [
                "text/html",
                "application/xml",
                "text/xml",
                "application/xhtml+xml",
                "application/rss+xml",
                "application/atom+xml"
            ]

            if mime_type not in allowed_types:
                response.close()
                logger.warning(f"Skipping {current_url}: Invalid Content-Type {content_type}")
                return None

            # Check Content-Length if available
            if 'Content-Length' in response.headers:
                try:
                    content_length = int(response.headers['Content-Length'])
                    if content_length > max_size:
                        logger.warning(f"Skipping {url}: Content-Length {content_length} exceeds limit {max_size}")
                        return None
                except (ValueError, TypeError):
                    pass  # Ignore invalid Content-Length

            content_chunks = []
            current_size = 0
            for chunk in response.iter_content(chunk_size=8192, decode_unicode=True):
                if chunk:
                    content_chunks.append(chunk)
                    current_size += len(chunk)
                    if current_size > max_size:
                        logger.warning(f"Skipping {url}: Content size exceeds limit {max_size}")
                        return None
            return "".join(content_chunks)

        except requests.exceptions.RequestException as e:
            logger.error(f"Error fetching page content from {url}: {e}")
            return None

    logger.warning(f"Skipping {url}: Too many redirects ({max_redirects})")
    return None


def url_to_file_path(
    url: str, base_url: str, embeddings_dir: str = "embeddings"
) -> Path:
    """
    Converts a URL to a file path following the pattern:
    https://5l-labs.com/blog/my-post -> ./embeddings/blog/my-post.embedding.json
    """
    # Parse the URL to get just the path component
    parsed = urlparse(url)
    url_path = parsed.path.lstrip("/")

    # If empty (root path), use "index"
    if not url_path or url_path == "/":
        url_path = "index"

    # Remove .html extension if present
    if url_path.endswith(".html"):
        url_path = url_path[:-5]

    # Remove trailing slash
    url_path = url_path.rstrip("/")

    # Create the full path
    file_path = Path(embeddings_dir) / f"{url_path}.embedding.json"

    return file_path


def resolve_fetch_url(original_url: str, replacement_base: str, target_base: str) -> str:
    """
    Safely resolves the fetch URL by replacing the base URL.
    Validates that the original URL starts with the replacement base
    and that the resulting URL strictly starts with the target base.
    """
    if not original_url.startswith(replacement_base):
        logger.warning(
            f"URL {original_url} does not start with expected base {replacement_base}"
        )
        return None

    # Calculate the relative part
    relative_path = original_url[len(replacement_base) :]

    fetch_url = target_base + relative_path

    # Security Check: Ensure fetch_url actually starts with target_base
    if not fetch_url.startswith(target_base):
        logger.warning(
            f"Resolved URL {fetch_url} does not start with target base {target_base}"
        )
        return None

    # Strict prefix check to prevent domain confusion (e.g. localhost:3000.evil.com)
    if len(fetch_url) > len(target_base):
        next_char = fetch_url[len(target_base)]
        if (
            not target_base.endswith("/")
            and next_char != "/"
            and next_char != "?"
            and next_char != "#"
        ):
            logger.warning(
                f"Potential prefix match attack: {fetch_url} vs {target_base}"
            )
            return None

    return fetch_url


def save_embedding(
    url: str,
    embedding: list,
    model: str,
    base_url: str,
    embeddings_dir: str = "embeddings",
):
    """
    Saves an individual embedding to a file based on the URL path.
    """
    file_path = url_to_file_path(url, base_url, embeddings_dir)

    # Security check: Prevent path traversal
    try:
        # Resolve both paths to absolute paths to compare
        # Note: file_path might not exist yet, but we resolve the path string
        abs_file_path = file_path.resolve()
        abs_embeddings_dir = Path(embeddings_dir).resolve()

        # Check if the file path is within the embeddings directory
        # relative_to checks containment and handles path separators correctly
        abs_file_path.relative_to(abs_embeddings_dir)
    except Exception as e:
        logger.error(f"Security check failed for {url}: {e}")
        raise ValueError(f"Security check failed: Path traversal detected for {url}")

    # Create directory structure if it doesn't exist
    file_path.parent.mkdir(parents=True, exist_ok=True)

    # Create the embedding data structure
    embedding_data = {
        "version": "1.0",
        "metadata": {"generated": datetime.now().isoformat(), "model": model},
        "content": [
            {
                "uri": url,
                "embeddings": [
                    {"model": model, "dimensions": len(embedding), "vector": embedding}
                ],
            }
        ],
    }

    # Write to file
    with open(file_path, "w") as f:
        json.dump(embedding_data, f, indent=2)

    logger.debug(f"Saved embedding to {file_path}")
    return file_path


def main():
    # Configuration from config.toml
    config = toml.load("scripts/config.toml")
    settings = config.get("settings", {})

    # Environment variables override config file
    model = os.environ.get("EMBEDDING_MODEL", settings.get("model", "nomic-embed-text:v1.5"))
    api_base = os.environ.get("OPENAI_API_BASE", settings.get("embedding_api_url", "http://localhost:11434/v1"))
    embedding_content_base_url = settings.get(
        "embedding_content_base_url", "http://localhost:3000"
    )
    replacement_base_url = settings.get("replacement_base_url", "https://5l-labs.com")
    embeddings_dir = settings.get("embeddings_dir", "embeddings")

    api_key = os.environ.get("OPENAI_API_KEY", "ollama")

    # Get sitemap
    sitemap_url = embedding_content_base_url + "/sitemap.xml"
    logger.info(f"Fetching sitemap from {sitemap_url}...")
    sitemap_content = get_page_content(sitemap_url, embedding_content_base_url)

    if not sitemap_content:
        logger.error(f"Failed to fetch sitemap from {sitemap_url}")
        logger.error(
            "Make sure the dev server is running with: bun run start"
        )
        return

    try:
        # Parse XML from string
        root = ET.fromstring(sitemap_content)
    except ET.ParseError as e:
        logger.error(f"Error: Could not parse sitemap XML: {e}")
        return

    # Extract URLs from sitemap
    urls = [
        elem.text
        for elem in root.findall(".//{http://www.sitemaps.org/schemas/sitemap/0.9}loc")
    ]

    if not urls:
        logger.warning("No URLs found in sitemap")
        return

    logger.info(f"Found {len(urls)} URLs in sitemap")

    # Process each URL
    success_count = 0
    error_count = 0

    for url in tqdm(urls, desc="Generating embeddings"):
        # Resolve the fetch URL safely
        fetch_url = resolve_fetch_url(
            url, replacement_base_url, embedding_content_base_url
        )

        if not fetch_url:
            logger.warning(f"Skipping {url} - failed to resolve fetch URL safely")
            error_count += 1
            continue

        logger.debug(f"Processing {fetch_url}...")

        content = get_page_content(fetch_url, embedding_content_base_url)
        if not content:
            logger.warning(f"Skipping {url} - failed to fetch content")
            error_count += 1
            continue

        embedding = get_embedding(content, api_base, api_key, model)
        if not embedding:
            logger.warning(f"Skipping {url} - failed to generate embedding")
            error_count += 1
            continue

        # Save individual embedding file
        try:
            save_embedding(url, embedding, model, replacement_base_url, embeddings_dir)
            success_count += 1
        except Exception as e:
            logger.error(f"Error saving embedding for {url}: {e}")
            error_count += 1

    logger.info(f"\nEmbedding generation complete!")
    logger.info(f"Successfully generated: {success_count}")
    logger.info(f"Errors: {error_count}")
    logger.info(f"Output directory: {embeddings_dir}/")


if __name__ == "__main__":
    main()
