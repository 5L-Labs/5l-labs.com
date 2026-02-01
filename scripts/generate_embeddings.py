#!/usr/bin/env python3

import argparse
import json
import logging
import os
import sys
import time
try:
    import defusedxml.ElementTree as ET
except ImportError:
    raise ImportError("defusedxml is required. Install it with: pip install defusedxml")
from datetime import datetime
from io import StringIO
from pathlib import Path
from urllib.parse import urlparse

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
            "Ollama package is not available. Install it with: pip install ollama"
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


def get_page_content(url):
    """
    Fetches the text content of a web page.
    """
    try:
        response = requests.get(url, timeout=30)
        response.raise_for_status()
        return response.text
    except requests.exceptions.RequestException as e:
        logger.error(f"Error fetching page content from {url}: {e}")
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
    sitemap_content = get_page_content(sitemap_url)

    if not sitemap_content:
        logger.error(f"Failed to fetch sitemap from {sitemap_url}")
        logger.error(
            "Make sure the dev server is running with: npm start or yarn start"
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
        # Replace the base URL for fetching content
        fetch_url = url.replace(replacement_base_url, embedding_content_base_url)
        logger.debug(f"Processing {fetch_url}...")

        content = get_page_content(fetch_url)
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
