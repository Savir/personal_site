const hexToUint8Array = (hex) => {
    const bytes = new Uint8Array(hex.length / 2);
    for (let i = 0; i < hex.length; i += 2) {
        bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
    }
    return bytes;
};

export const decryptContent = async (encryptedText, key) => {
    try {
        const rawData = hexToUint8Array(encryptedText);
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

        return new TextDecoder().decode(decrypted); // Return decrypted text
    } catch (error) {
        console.error("❌ Decryption Failed:", error);
        throw new Error("Decryption failed: Incorrect key or corrupted data"); // Throw an error instead of handling state
    }
};

