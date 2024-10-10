import React, { useState, useEffect } from 'react';
import { Star, Check, ChevronDown, ChevronUp } from 'lucide-react';

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

const ProgressBar = ({ progress }) => {
    const progressColors = ['bg-red-500', 'bg-yellow-500', 'bg-green-500'];
    const progressColor = progress < 33 ? progressColors[0] : progress < 66 ? progressColors[1] : progressColors[2];

    return (
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 overflow-hidden">
            <div
                className={`h-2.5 ${progressColor} transition-all duration-1000`}
                style={{ width: `${progress}%` }}
            ></div>
        </div>
    );
};

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
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        // Filling effect for the progress bar when the component loads
        setTimeout(() => {
            setProgress(25); // Example initial progress value
        }, 500);
    }, []);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-8">Your Baby Sleep Journey</h1>

            {/* Visual representation of current status and goal */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <div className="flex justify-between items-center">
                    <div className="text-left w-1/2">
                        <h3 className="font-bold mb-2">Now</h3>
                        <div className="bg-gray-200 w-32 h-32 mx-auto mb-2 rounded-full flex items-center justify-center">
                            <span className="text-gray-500">Crying Baby</span>
                        </div>
                        <p className="font-semibold">Sleep time: 6 hours</p>
                        <p className="text-red-500 font-bold">Bad</p>
                        <ProgressBar progress={progress} />
                    </div>
                    <div className="animation-arrows_container__Fvs3R animation-arrows_isAnimated__RKH3A mx-4">
                        <svg width="14" height="24" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="animation-arrows_animationTriangle1__s7j_d">
                            <path d="M3.28379 0.474938L13.6611 11.1135C13.7842 11.2401 13.8713 11.3773 13.9222 11.5251C13.9739 11.6728 13.9998 11.8311 13.9998 12C13.9998 12.1689 13.9739 12.3272 13.9222 12.4749C13.8713 12.6227 13.7842 12.7599 13.6611 12.8865L3.28379 23.5567C2.99639 23.8522 2.63714 24 2.20603 24C1.77493 24 1.40541 23.8417 1.09748 23.5251C0.789552 23.2084 0.635587 22.839 0.635587 22.4169C0.635587 21.9947 0.789552 21.6253 1.09748 21.3087L10.1507 12L1.09748 2.6913C0.810082 2.39578 0.666381 2.03188 0.666381 1.59958C0.666381 1.16644 0.820347 0.79156 1.12828 0.474938C1.43621 0.158315 1.79546 4.62499e-06 2.20604 4.6619e-06C2.61661 4.69881e-06 2.97586 0.158315 3.28379 0.474938Z" fill="var(--themePrimaryColor)"></path>
                        </svg>
                        {/* Repeat SVGs as needed for animation */}
                    </div>
                    <div className="text-left w-1/2">
                        <h3 className="font-bold mb-2">Your Goal</h3>
                        <div className="bg-gray-200 w-32 h-32 mx-auto mb-2 rounded-full flex items-center justify-center">
                            <span className="text-gray-500">Happy Sleeping Baby</span>
                        </div>
                        <p className="font-semibold">Sleep time: 12 hours</p>
                        <p className="text-green-500 font-bold">Good</p>
                        <ProgressBar progress={100} />
                    </div>
                </div>
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

            <p className="text-xs text-gray-500 text-center">
                By selecting a plan, you agree to our Terms of Service and Privacy Policy. You can cancel anytime through your account settings.
            </p>
        </div>
    );
};

export default UpdatedBabySleepPlanCheckout;
