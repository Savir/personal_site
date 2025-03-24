export const gLogEvent = (name, params = {}) => {
    if (typeof window.gtag === 'function') {
        window.gtag('event', name, params);
    }
};