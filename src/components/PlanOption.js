import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = ({ duration, price, babyName, sleepGoal, onSuccess, onError }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        setIsLoading(true);
        setError(null);

        try {
            const cardElement = elements.getElement(CardElement);

            // Step 1: Create payment intent
            const response = await fetch('/api/create-payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: price * 100, // Convert price to cents
                    metadata: {
                        customerName: babyName,
                        planDuration: duration,
                        sleepGoal,
                    },
                }),
            });

            const { clientSecret } = await response.json();

            // Step 2: Confirm card payment
            const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: { name: babyName || 'Anonymous' },
                },
            });

            if (stripeError) {
                throw new Error(stripeError.message);
            }

            onSuccess(paymentIntent);
        } catch (err) {
            setError(err.message);
            onError(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4">
            <CardElement className="mb-4 p-2 border rounded" />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
                type="submit"
                disabled={isLoading || !stripe || !elements}
                className={`w-full bg-blue-500 text-white py-2 rounded ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                {isLoading ? 'Processing...' : 'Confirm Payment'}
            </button>
        </form>
    );
};

const PlanOption = ({ duration, price, perDay, popular = false, planImage, babyName = '', sleepGoal = 12 }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handlePaymentSuccess = (paymentIntent) => {
        console.log('Payment successful:', paymentIntent);
        setIsModalOpen(false);
        alert('Payment successful! Thank you for your purchase.');
    };

    const handlePaymentError = (error) => {
        console.error('Payment error:', error);
    };

    return (
        <div className={`bg-white p-4 rounded-lg shadow-md ${popular ? 'border-2 border-blue-500' : ''}`}>
            {planImage && <img src={planImage} alt={`${duration} Plan`} className="w-full h-auto mb-4 rounded" />}
            <h3 className="text-lg font-semibold">{duration}</h3>
            <p className="text-2xl font-bold">${price.toFixed(2)}</p>
            <p className="text-md">${perDay.toFixed(2)} per day</p>
            {popular && <span className="text-sm text-blue-500">Most Popular!</span>}

            <button
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-blue-500 text-white mt-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
                Choose Plan
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 w-96">
                        <h2 className="text-lg font-bold mb-4">Complete Payment</h2>
                        <Elements stripe={stripePromise}>
                            <CheckoutForm
                                duration={duration}
                                price={price}
                                babyName={babyName}
                                sleepGoal={sleepGoal}
                                onSuccess={handlePaymentSuccess}
                                onError={handlePaymentError}
                            />
                        </Elements>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="text-red-500 mt-4"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PlanOption;
