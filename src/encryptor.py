import binascii
import os
from pathlib import Path
import textwrap

from Crypto.Cipher import AES

MAX_LINE_LENGTH = 120  # Maximum characters per line


def encrypt_content(content, key):
    cipher = AES.new(key.ljust(32)[:32].encode(), AES.MODE_GCM)
    nonce = cipher.nonce
    encrypted_bytes, tag = cipher.encrypt_and_digest(content.encode())

    # Use HEX encoding instead of Base64
    encrypted_data = binascii.hexlify(nonce + encrypted_bytes + tag).decode()

    # ✅ Debugging output
    print(f"Nonce (HEX): {binascii.hexlify(nonce).decode()}")
    print(f"Encrypted (HEX): {binascii.hexlify(encrypted_bytes).decode()}")
    print(f"Tag (HEX): {binascii.hexlify(tag).decode()}")

    return encrypted_data


if __name__ == "__main__":
    secret_key = os.getenv('SECRET_KEY')
    if not secret_key:
        raise EnvironmentError("SECRET_KEY environment variable not set")
    plain_file = Path(__file__).parent / 'plainContent.js'
    with plain_file.open('r') as f:
        encr = encrypt_content(f.read(), secret_key)
    wrapped_lines = textwrap.wrap(encr, MAX_LINE_LENGTH)
    encrypted_file = Path(__file__).parent / 'encryptedContent.js'
    with encrypted_file.open('w') as f:
        f.write('const encryptedContent = (\n')
        for line in wrapped_lines:
            f.write(f'"{line}" +\n')  # Each line is a string, concatenated in JS
        f.write('"");\n')  # Close the final string correctly
        f.write("export default encryptedContent;\n")

    print("✅ Encrypted JSX saved to encryptedContent.js")
