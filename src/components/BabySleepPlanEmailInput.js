import React, { useState } from 'react';
import { Lock } from 'lucide-react';

const BabySleepPlanEmailInput = ({ onSubmit }) => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log('Email submitted:', email);
        if (onSubmit) {
            onSubmit(email); // Call the onSubmit prop function to navigate to the next step
        }
    };

    return (
        <div className="max-w-md mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-6">
                Enter your email to get your
                <br />
                <span className="text-blue-600">Personalized Baby Sleep Plan</span>
            </h1>

            <form onSubmit={handleSubmit} className="mb-4">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                >
                    Get My Sleep Plan
                </button>
            </form>

            <div className="flex items-start text-sm text-gray-600">
                <Lock className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                <p>
                    We respect your privacy and are committed to protecting your personal data. Your data will
                    be processed in accordance with our <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
                </p>
            </div>
        </div>
    );
};

export default BabySleepPlanEmailInput;
