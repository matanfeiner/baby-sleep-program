// src/components/SuccessPage.js
import React from 'react';
import { Link } from 'react-router-dom';

const SuccessPage = () => {
    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 text-center">
            <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
            <p className="mb-4">Thank you for your purchase. You will receive your sleep plan shortly.</p>
            <Link to="/" className="text-blue-500 hover:text-blue-700">
                Return to Home
            </Link>
        </div>
    );
};

export default SuccessPage;

// src/components/CancelPage.js
import React from 'react';
import { Link } from 'react-router-dom';

const CancelPage = () => {
    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 text-center">
            <h1 className="text-2xl font-bold mb-4">Payment Cancelled</h1>
            <p className="mb-4">Your payment was cancelled. Please try again if you wish to purchase the sleep plan.</p>
            <Link to="/" className="text-blue-500 hover:text-blue-700">
                Return to Home
            </Link>
        </div>
    );
};

export default CancelPage;