const express = require('express');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable gzip compression for all responses
app.use(compression());

// Use helmet for basic security headers
app.use(helmet());

// Add custom Content Security Policy (CSP) to allow external scripts
app.use((req, res, next) => {
    res.setHeader(
        "Content-Security-Policy",
        "default-src 'self'; " +
        "script-src * 'unsafe-inline' 'unsafe-eval'; " + // Allow scripts from any source
        "connect-src *; " + // Allow connections from any source
        "img-src * data:; " + // Allow images from any source
        "font-src * data:; " + // Allow fonts from any source
        "style-src * 'unsafe-inline';" // Allow inline styles and external styles from any source
    );
    next();
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build'), { maxAge: '1y' }));

// Handle React routing, return all requests to the React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
