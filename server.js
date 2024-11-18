const express = require('express');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Use Heroku Config Vars

const app = express();
const PORT = process.env.PORT || 3000;

// Enable gzip compression for all responses
app.use(compression());

// Use helmet for basic security headers
app.use(helmet());

// Enable JSON parsing for API requests
app.use(express.json());

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

// Add Stripe payment intent API
app.post('/api/create-payment-intent', async (req, res) => {
    try {
        const { amount, metadata } = req.body; // Extract amount and metadata from the request body

        // Create a PaymentIntent with the given amount and metadata
        const paymentIntent = await stripe.paymentIntents.create({
            amount, // Amount in cents (e.g., 1000 for $10.00)
            currency: 'usd', // Set the currency
            metadata, // Include custom metadata (e.g., customerName, planDuration)
        });

        // Respond with the client secret for the PaymentIntent
        res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error('Error creating payment intent:', error.message);
        res.status(500).json({ error: 'Failed to create payment intent' });
    }
});

// Handle React routing, return all requests to the React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
