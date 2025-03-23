const hexToUint8Array = (hex) => {
    const bytes = new Uint8Array(hex.length / 2);
    for (let i = 0; i < hex.length; i += 2) {
        bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
    }
    return bytes;
};

export const decryptContent = async (fullBlob, key) => {
    try {
        const sigLength = 64; // SHA-256 in hex
        const encryptedHex = fullBlob.slice(0, -sigLength);
        const expectedHash = fullBlob.slice(-sigLength);
        const rawData = hexToUint8Array(encryptedHex);
        const nonce = rawData.slice(0, 16);
        const encryptedBytes = rawData.slice(16, rawData.length - 16);
        const tag = rawData.slice(rawData.length - 16);

        const keyMaterial = await crypto.subtle.importKey(
            "raw",
            new TextEncoder().encode(key.padEnd(32, " ").slice(0, 32)),
            { name: "AES-GCM", length: 256 },
            false,
            ["decrypt"]
        );

        const decrypted = await crypto.subtle.decrypt(
            { name: "AES-GCM", iv: nonce, tagLength: 128 },
            keyMaterial,
            new Uint8Array([...encryptedBytes, ...tag])
        );

        const decryptedText = new TextDecoder().decode(decrypted);

        // ✅ Verify SHA-256
        const hashBuffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(decryptedText));
        const actualHash = Array.from(new Uint8Array(hashBuffer))
            .map(b => b.toString(16).padStart(2, "0"))
            .join("");

        if (actualHash !== expectedHash) {
            throw new Error("Integrity check failed: SHA-256 mismatch.");
        }

        return decryptedText;
    } catch (error) {
        console.error("❌ Decryption Failed:", error);
        throw new Error("Decryption failed: Incorrect key or corrupted data");
    }
};
