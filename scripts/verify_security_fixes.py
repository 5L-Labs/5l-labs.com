import sys
import os
from pathlib import Path
import shutil

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
    # We attempt to write to 'embeddings-suffix' which shares prefix with 'embeddings'
    # 'embeddings' resolves to .../embeddings
    # 'embeddings-suffix' resolves to .../embeddings-suffix
    # In string comparison, .../embeddings-suffix STARTSWITH .../embeddings is TRUE (if no separator check)
    # So this tests if we use secure check.

    malicious_url_2 = "http://example.com/../../embeddings-suffix/foo"
    print(f"\nTest Case 2: Prefix matching attack: {malicious_url_2}")

    # We create the directory so real path resolution works if needed (though Python pathlib handles abstract paths too)
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

if __name__ == "__main__":
    if not verify_path_traversal():
        sys.exit(1)
