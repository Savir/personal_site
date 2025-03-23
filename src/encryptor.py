import binascii
import hashlib
import os
from pathlib import Path
import textwrap
from Crypto.Cipher import AES

MAX_LINE_LENGTH = 120

def encrypt_content(content, key):
    cipher = AES.new(key.ljust(32)[:32].encode(), AES.MODE_GCM)
    nonce = cipher.nonce
    encrypted_bytes, tag = cipher.encrypt_and_digest(content.encode())

    # Structure: nonce + ciphertext + tag
    encrypted_data = nonce + encrypted_bytes + tag
    return binascii.hexlify(encrypted_data).decode()

def sha256_hex(content):
    return hashlib.sha256(content.encode()).hexdigest()

if __name__ == "__main__":
    secret_key = os.getenv('SECRET_KEY')
    if not secret_key:
        raise EnvironmentError("SECRET_KEY environment variable not set")

    plain_file = Path(__file__).parent / 'plainContent.js'
    with plain_file.open('r') as f:
        plaintext = f.read()

    encrypted_hex = encrypt_content(plaintext, secret_key)
    signature = sha256_hex(plaintext)

    # Append the 64-char signature to the encrypted hex string
    full_blob = encrypted_hex + signature

    # Format into multiple lines for JS readability
    wrapped_lines = textwrap.wrap(full_blob, MAX_LINE_LENGTH)
    encrypted_file = Path(__file__).parent / 'encryptedContent.js'

    with encrypted_file.open('w') as f:
        f.write('const encryptedContent = (\n')
        for line in wrapped_lines:
            f.write(f'"{line}" +\n')
        f.write('"");\n')
        f.write("export default encryptedContent;\n")

    print("✅ Encrypted and signed content written to encryptedContent.js")
