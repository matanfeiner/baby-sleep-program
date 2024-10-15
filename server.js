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
        "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://cdn.rudderlabs.com https://assets.anytrack.io https://d2wy8f7a9ursnm.cloudfront.net; " +
        "connect-src 'self' https://api.rudderstack.com https://d2wy8f7a9ursnm.cloudfront.net; " +
        "font-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com data:; " +
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
        "img-src 'self' data:;"
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
