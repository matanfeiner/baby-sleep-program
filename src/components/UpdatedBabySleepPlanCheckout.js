import React, { useState, useEffect } from 'react';
import { Star, Check, Clock, ChevronDown, ChevronUp } from 'lucide-react';

const PlanOption = ({ duration, price, perDay, popular = false }) => (
    <div className={`bg-white p-4 rounded-lg shadow-md ${popular ? 'border-2 border-blue-500' : ''}`}>
        <h3 className="text-lg font-semibold">{duration}</h3>
        <p className="text-2xl font-bold">${price.toFixed(2)}</p>
        <p className="text-md">${perDay.toFixed(2)} per day</p>
        {popular && <span className="text-sm text-blue-500">Most Popular!</span>}
        <button className="w-full bg-blue-500 text-white mt-4 py-2 rounded hover:bg-blue-600 transition-colors">
            Choose Plan
        </button>
    </div>
);

const Feature = ({ text }) => (
    <div className="flex items-center mb-2">
        <Check className="w-5 h-5 text-green-500 mr-2" />
        <p>{text}</p>
    </div>
);

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-200 py-4">
            <button
                className="flex justify-between items-center w-full text-left"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="font-semibold">{question}</span>
                {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            {isOpen && <p className="mt-2 text-gray-600">{answer}</p>}
        </div>
    );
};

const UpdatedBabySleepPlanCheckout = () => {
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-8">Your Baby Sleep Journey</h1>

            {/* Visual representation of current status and goal */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
                {/* Add your visual representation here */}
            </div>

            <h2 className="text-2xl font-bold text-center mb-6">Choose Your Plan</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <PlanOption duration="1-Week Trial" price={9.90} perDay={1.41} />
                <PlanOption duration="4-Week Plan" price={15.00} perDay={0.53} popular={true} />
                <PlanOption duration="12-Week Plan" price={30.00} perDay={0.35} />
            </div>

            <div className="bg-gray-100 p-6 rounded-lg mb-8">
                <h2 className="text-2xl font-bold mb-4">What you get:</h2>
                <Feature text="Personalized sleep schedule based on your baby's age and needs" />
                <Feature text="Step-by-step guide to implement gentle sleep training methods" />
                <Feature text="Daily tips and support to help you stay consistent" />
                <Feature text="Track your baby's sleep patterns and see improvements over time" />
                <Feature text="Access to sleep consultants for personalized advice" />
            </div>

            <div className="text-center mb-8">
                <h3 className="text-xl font-bold mb-2">Limited Time Offer</h3>
                <div className="text-3xl font-bold text-blue-600">
                    {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
                </div>
            </div>

            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-xl hover:bg-blue-700 transition duration-300 mb-8">
                GET MY SLEEP PLAN
            </button>

            {/* Rest of the component remains the same */}

            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-center">People often ask</h2>
                <FAQItem
                    question="How can this plan help improve my baby's sleep?"
                    answer="Our plan provides personalized strategies based on your baby's age and sleep patterns, along with expert guidance to implement effective sleep training methods."
                />
                <FAQItem
                    question="How will the plan be delivered?"
                    answer="Upon purchase, you'll receive immediate access to our app where you can view your personalized sleep plan, track progress, and access expert advice."
                />
                <FAQItem
                    question="Is this suitable for all ages?"
                    answer="Yes, our sleep plans are customized for babies from newborn to 24 months old, with age-appropriate strategies and techniques."
                />
            </div>

            {/* More sections as in the original component */}

            <p className="text-xs text-gray-500 text-center">
                By selecting a plan, you agree to our Terms of Service and Privacy Policy. You can cancel anytime through your account settings.
            </p>
        </div>
    );
};

export default UpdatedBabySleepPlanCheckout;