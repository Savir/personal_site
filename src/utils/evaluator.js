import React from "react";

export const evaluateJSX = (jsxCode) => {
    try {
        return new Function("React", `"use strict"; return (${jsxCode})`)(React);
    } catch (error) {
        console.error("❌ Error evaluating JSX:", error);
        return null;
    }
};
