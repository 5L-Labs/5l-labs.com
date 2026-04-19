import sys
import os
from pathlib import Path
import shutil
from unittest.mock import MagicMock, patch

# Ensure we can import the script
sys.path.append('scripts')
import generate_embeddings

def verify_path_traversal():
    print("Verifying path traversal protection...")
    embeddings_dir = Path("embeddings").resolve()
    embeddings_dir.mkdir(exist_ok=True)

    # Case 1: Malicious URL with '..'
    malicious_url = "http://example.com/../../tmp/passwd"

    print(f"Test Case 1: Standard path traversal: {malicious_url}")

    try:
        # dummy embedding
        dummy_embedding = [0.1, 0.2, 0.3]

        # This should raise ValueError
        generate_embeddings.save_embedding(
            malicious_url,
            dummy_embedding,
            "test-model",
            "http://example.com",
            "embeddings"
        )

        print("❌ VULNERABILITY Case 1: save_embedding did not raise exception!")
        return False

    except ValueError as e:
        if "Security check failed" in str(e) or "Path is outside" in str(e):
             print(f"✅ Protection triggered (ValueError): {e}")
        else:
             print(f"❓ Unexpected ValueError: {e}")
             return False
    except Exception as e:
        print(f"❓ Unexpected Exception: {e}")
        return False

    # Case 2: Prefix matching attack
    malicious_url_2 = "http://example.com/../../embeddings-suffix/foo"
    print(f"\nTest Case 2: Prefix matching attack: {malicious_url_2}")

    Path("embeddings-suffix").mkdir(exist_ok=True)

    try:
        generate_embeddings.save_embedding(
            malicious_url_2,
            dummy_embedding,
            "test-model",
            "http://example.com",
            "embeddings"
        )
        print("❌ VULNERABILITY Case 2: Prefix match check failed!")
        return False
    except ValueError as e:
         if "Security check failed" in str(e):
             print(f"✅ Protection triggered (ValueError): {e}")
         else:
             print(f"❓ Unexpected ValueError: {e}")
             return False
    except Exception as e:
         print(f"❓ Unexpected Exception: {e}")
         return False
    finally:
        if Path("embeddings-suffix").exists():
            Path("embeddings-suffix").rmdir()

    return True

def verify_response_size_limit():
    print("\nVerifying response size limit...")

    # 1. Content-Length check
    with patch('requests.get') as mock_get:
        mock_resp = MagicMock()
        mock_resp.is_redirect = False
        mock_resp.headers = {'Content-Length': str(20 * 1024 * 1024), 'Content-Type': 'text/html'} # 20MB
        mock_resp.raise_for_status.return_value = None
        mock_get.return_value = mock_resp

        result = generate_embeddings.get_page_content("http://example.com/huge-header", "http://example.com")
        if result is None:
            print("✅ Content-Length check passed (returned None for 20MB)")
        else:
            print("❌ Content-Length check failed (did not return None)")
            return False

    # 2. Stream size check
    with patch('requests.get') as mock_get:
        mock_resp = MagicMock()
        mock_resp.is_redirect = False
        mock_resp.headers = {'Content-Type': 'text/html'}
        mock_resp.raise_for_status.return_value = None
        # Generator yielding 1MB chunks
        def oversized_generator():
            chunk = "A" * (1024 * 1024) # 1MB
            for _ in range(15): # 15MB total
                yield chunk

        mock_resp.iter_content.return_value = oversized_generator()
        mock_get.return_value = mock_resp

        result = generate_embeddings.get_page_content("http://example.com/stream", "http://example.com", max_size=10 * 1024 * 1024)
        if result is None:
            print("✅ Stream size check passed (returned None for >10MB stream)")
        else:
            # We can't check len(result) if result is None
            print(f"❌ Stream size check failed (returned content)")
            return False

    return True

def verify_ssrf_protection():
    print("\nVerifying SSRF protection...")

    replacement_base = "https://5l-labs.com"
    target_base = "http://localhost:3000"

    # Case 1: Valid URL
    valid_url = "https://5l-labs.com/blog/post"
    resolved = generate_embeddings.resolve_fetch_url(valid_url, replacement_base, target_base)
    if resolved == "http://localhost:3000/blog/post":
        print(f"✅ Valid URL resolved correctly: {resolved}")
    else:
        print(f"❌ Valid URL failed to resolve correctly: {resolved}")
        return False

    # Case 2: URL not matching base
    invalid_base_url = "https://evil.com/blog/post"
    resolved = generate_embeddings.resolve_fetch_url(invalid_base_url, replacement_base, target_base)
    if resolved is None:
        print(f"✅ Invalid base URL correctly rejected")
    else:
        print(f"❌ Invalid base URL was NOT rejected: {resolved}")
        return False

    # Case 3: Prefix matching attack
    prefix_attack_url = "https://5l-labs.com.evil.com/exploit"
    resolved = generate_embeddings.resolve_fetch_url(prefix_attack_url, replacement_base, target_base)
    if resolved is None:
        print(f"✅ Prefix match attack correctly rejected")
    else:
        print(f"❌ Prefix match attack was NOT rejected: {resolved}")
        return False

    return True

def verify_redirect_protection():
    print("\nVerifying redirect protection...")
    base_url = "http://example.com"

    # Test 1: Malicious Redirect (External)
    with patch('requests.get') as mock_get:
        # Simulate a 302 redirect to external
        mock_resp = MagicMock()
        mock_resp.status_code = 302
        mock_resp.is_redirect = True
        mock_resp.headers = {'Location': 'http://malicious.com'}
        mock_get.return_value = mock_resp

        url = "http://example.com/redirect"
        result = generate_embeddings.get_page_content(url, base_url)

        # Ensure allow_redirects=False was used
        args, kwargs = mock_get.call_args
        if kwargs.get('allow_redirects') is not False:
             print(f"❌ allow_redirects=False was NOT passed to requests.get! kwargs: {kwargs}")
             return False

        if result is None:
            print("✅ External Redirect correctly rejected (returned None)")
        else:
            print(f"❌ External Redirect was NOT rejected (returned {result})")
            return False

    # Test 2: Valid Redirect (Internal)
    with patch('requests.get') as mock_get:
        # 1st call: 301 Redirect
        mock_resp_1 = MagicMock()
        mock_resp_1.status_code = 301
        mock_resp_1.is_redirect = True
        mock_resp_1.headers = {'Location': '/foo/bar'} # Relative redirect

        # 2nd call: 200 OK
        mock_resp_2 = MagicMock()
        mock_resp_2.status_code = 200
        mock_resp_2.is_redirect = False
        mock_resp_2.headers = {'Content-Type': 'text/html'}
        mock_resp_2.iter_content.return_value = iter(["Success"])

        mock_get.side_effect = [mock_resp_1, mock_resp_2]

        url = "http://example.com/foo"
        result = generate_embeddings.get_page_content(url, base_url)

        if result == "Success":
            print("✅ Internal Redirect correctly followed")
        else:
            print(f"❌ Internal Redirect failed (returned {result})")
            return False

    return True

def verify_content_type_check():
    print("\nVerifying Content-Type check...")

    base_url = "http://example.com"

    # Test 1: Invalid Content-Type (image/jpeg)
    with patch('requests.get') as mock_get:
        mock_resp = MagicMock()
        mock_resp.is_redirect = False
        mock_resp.headers = {'Content-Type': 'image/jpeg'}
        mock_resp.raise_for_status.return_value = None
        mock_get.return_value = mock_resp

        result = generate_embeddings.get_page_content("http://example.com/image.jpg", base_url)

        if result is None:
            print("✅ Invalid Content-Type correctly rejected (returned None)")
        else:
            print(f"❌ Invalid Content-Type was NOT rejected (returned {result})")
            return False

    # Test 2: Valid Content-Type (text/html)
    with patch('requests.get') as mock_get:
        mock_resp = MagicMock()
        mock_resp.is_redirect = False
        mock_resp.headers = {'Content-Type': 'text/html'}
        mock_resp.raise_for_status.return_value = None
        mock_resp.iter_content.return_value = iter(["<html>Content</html>"])
        mock_get.return_value = mock_resp

        result = generate_embeddings.get_page_content("http://example.com/page.html", base_url)

        if result == "<html>Content</html>":
            print("✅ Valid Content-Type (text/html) accepted")
        else:
            print(f"❌ Valid Content-Type (text/html) failed (returned {result})")
            return False

    # Test 3: Valid Content-Type with charset (text/html; charset=utf-8)
    with patch('requests.get') as mock_get:
        mock_resp = MagicMock()
        mock_resp.is_redirect = False
        mock_resp.headers = {'Content-Type': 'text/html; charset=utf-8'}
        mock_resp.raise_for_status.return_value = None
        mock_resp.iter_content.return_value = iter(["<html>UTF-8 Content</html>"])
        mock_get.return_value = mock_resp

        result = generate_embeddings.get_page_content("http://example.com/utf8.html", base_url)

        if result == "<html>UTF-8 Content</html>":
            print("✅ Valid Content-Type with charset accepted")
        else:
            print(f"❌ Valid Content-Type with charset failed (returned {result})")
            return False

    return True

if __name__ == "__main__":
    success = True
    if not verify_path_traversal():
        success = False
    if not verify_response_size_limit():
        success = False
    if not verify_ssrf_protection():
        success = False
    if not verify_redirect_protection():
        success = False
    if not verify_content_type_check():
        success = False

    if not success:
        sys.exit(1)
