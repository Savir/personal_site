import React, {useCallback, useEffect, useState} from "react";
import {decryptContent} from "../utils/decryptor";
import encryptedContent from "../encryptedContent";
import "../styles/AreaStyles.css"; // Import the unified styles
import "../styles/PrivateArea.css"

const PrivateArea = () => {
    const [secretKey, setSecretKey] = useState("");
    const [hasAccess, setHasAccess] = useState(false);
    const [decryptedComponent, setDecryptedComponent] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    // Function to update the URL in real time
    const updateURL = (key) => {
        const newURL = `${window.location.pathname}?key=${encodeURIComponent(key)}`;
        window.history.replaceState({}, "", newURL);
    };

    const handleDecrypt = useCallback(async (key, updateURLFlag = true) => {
        setErrorMessage("");
        try {
            const decryptedText = await decryptContent(encryptedContent, key);
            setHasAccess(true);
            setDecryptedComponent(() => evaluateJSX(decryptedText));

            if (updateURLFlag) {
                updateURL(key);
            }
        } catch (error) {
            console.error(error.message);
            setErrorMessage("❌ Incorrect key or decryption failed.");
            setHasAccess(false);
            setDecryptedComponent(null);
        }
    }, []);

    useEffect(() => {
        // Read the key from the URL when the component loads
        const params = new URLSearchParams(window.location.search);
        const urlKey = params.get("key");
        if (urlKey) {
            setSecretKey(urlKey);
            handleDecrypt(urlKey, false); // Decrypt without changing the URL again
        }
    }, [handleDecrypt]);

    const handleInputChange = (e) => {
        // Handle input change and update URL in real-time
        const newKey = e.target.value;
        setSecretKey(newKey);
        updateURL(newKey); // Update the URL as the user types
        setErrorMessage(""); // Clear error messages while typing
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleDecrypt(secretKey);
        }
    };

    const evaluateJSX = (jsxCode) => {
        try {
            return new Function("React", `"use strict"; return (${jsxCode})`)(React);
        } catch (error) {
            console.error("Error evaluating JSX:", error);
            setErrorMessage("❌ Decryption succeeded, but content is invalid.");
            return null;
        }
    };

    return (
        <div className="area-container">
            <h2 className="area-heading">🔒 Private Area</h2>
            {hasAccess ? (
                decryptedComponent ? (
                    React.createElement(decryptedComponent)
                ) : (
                    <p className="loading">Loading component...</p>
                )
            ) : (
                <div>
                    <p className="instruction">Enter the secret key to access this content:</p>
                    <input
                        type="text"
                        value={secretKey}
                        onChange={handleInputChange} // Updates URL on input
                        onKeyDown={handleKeyPress}
                        className="input-field"
                        placeholder="Enter secret key..."
                    />
                    <button onClick={() => handleDecrypt(secretKey)} className="primary-button">
                        Submit
                    </button>

                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                </div>
            )}
        </div>
    );
};

export default PrivateArea;
