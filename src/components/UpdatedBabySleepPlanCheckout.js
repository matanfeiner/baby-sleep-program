import React, { useState, useEffect } from 'react';
import { Star, Check, ChevronDown, ChevronUp } from 'lucide-react';

// Import images and icons
import mobileAppIllustration from '../assets/images/WhatsApp Image 2024-10-15 at 15.49.50.jpeg';
import featuredInLogo1 from '../assets/images/usa-today-new.webp';
import featuredInLogo2 from '../assets/images/forbes-logo-black-transparent.png';
import featuredInLogo3 from '../assets/images/wall-street-journal-logo.png';
import featuredInLogo4 from '../assets/images/ny-post-logo.png';
import featuredInLogo5 from '../assets/images/mashable-logo.png';
import iconSleepSchedule from '../assets/icons/icon-sleep-schedule.png';
import iconGuide from '../assets/icons/icon-guide.png';
import iconSupport from '../assets/icons/icon-support.png';
import iconTracking from '../assets/icons/icon-tracking.png';
import iconConsultant from '../assets/icons/icon-consultant.png';
import beforeImage from '../assets/images/before.png';
import afterImage from '../assets/images/after.png';
import testimonialImage from '../assets/images/WhatsApp Image 2024-10-15 at 14.21.41.jpeg';
import shieldIcon from '../assets/images/shield-icon.png';

const PlanOption = ({ duration, price, perDay, popular = false, onSelect }) => (
    <div className={`bg-white p-4 rounded-lg shadow-md ${popular ? 'border-2 border-blue-500' : ''}`}>
        <h3 className="text-lg font-semibold">{duration}</h3>
        <p className="text-2xl font-bold">${price.toFixed(2)}</p>
        <p className="text-md">${perDay.toFixed(2)} per day</p>
        {popular && <span className="text-sm text-blue-500">Most Popular!</span>}
        <button
            onClick={() => onSelect(duration, price)}
            className="w-full bg-blue-500 text-white mt-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
            Choose Plan
        </button>
    </div>
);

const Feature = ({ text, icon }) => (
    <div className="flex items-center mb-2">
        <img src={icon} alt="Feature Icon" className="w-6 h-6 mr-2" />
        <p className="ml-2">{text}</p>
    </div>
);

const ProgressBar = ({ progress }) => {
    const [currentProgress, setCurrentProgress] = useState(0);

    useEffect(() => {
        setTimeout(() => setCurrentProgress(progress), 500);
    }, [progress]);

    return (
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 overflow-hidden">
            <div
                className="h-2.5 rounded-full transition-all duration-1000"
                style={{
                    width: `${currentProgress}%`,
                    background: `linear-gradient(to right, #f87171, #fbbf24, #34d399)`,
                }}
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

const UpdatedBabySleepPlanCheckout = ({ onPlanSelect }) => {
    const [timeLeft, setTimeLeft] = useState(600);
    const [progress, setProgress] = useState(0);
    const [currentLogoIndex, setCurrentLogoIndex] = useState(0);
    const logos = [featuredInLogo1, featuredInLogo2, featuredInLogo3, featuredInLogo4, featuredInLogo5];

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        setProgress(25);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentLogoIndex((prevIndex) => (prevIndex + 1) % logos.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const handlePlanSelection = (duration, price) => {
        onPlanSelect({ duration, price });
    };

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6">
            <div className="bg-blue-100 text-blue-800 p-2 rounded-lg mb-4 relative">
                <span className="absolute top-0 right-0 bg-blue-500 text-white px-2 py-1 text-xs rounded-bl">Limited Offer: 50% Off</span>
                <p className="font-semibold">Get your personalized sleep plan now</p>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">Your Baby Sleep Journey</h1>

            <div className="bg-gray-50 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
                <div className="flex flex-col sm:flex-row justify-between items-center">
                    <div className="text-center sm:text-left w-full sm:w-1/2 mb-4 sm:mb-0">
                        <h3 className="font-bold mb-2">Now</h3>
                        <div className="bg-gray-200 w-32 h-32 mx-auto mb-2 rounded-full flex items-center justify-center">
                            <img src={beforeImage} alt="Before" className="w-full h-full object-cover rounded-full" />
                        </div>
                        <p className="font-semibold">Sleep time: 6 hours</p>
                        <p className="text-red-500 font-bold">Bad</p>
                        <ProgressBar progress={25} />
                    </div>
                    <div className="mx-4 flex items-center justify-center">
                        <svg
                            width="24"
                            height="48"
                            viewBox="0 0 14 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="animate-bounce"
                        >
                            <path
                                d="M3.28379 0.474938L13.6611 11.1135C13.7842 11.2401 13.8713 11.3773 13.9222 11.5251C13.9739 11.6728 13.9998 11.8311 13.9998 12C13.9998 12.1689 13.9739 12.3272 13.9222 12.4749C13.8713 12.6227 13.7842 12.7599 13.6611 12.8865L3.28379 23.5567C2.99639 23.8522 2.63714 24 2.20603 24C1.77493 24 1.40541 23.8417 1.09748 23.5251C0.789552 23.2084 0.635587 22.839 0.635587 22.4169C0.635587 21.9947 0.789552 21.6253 1.09748 21.3087L10.1507 12L1.09748 2.6913C0.810082 2.39578 0.666381 2.03188 0.666381 1.59958C0.666381 1.16644 0.820347 0.79156 1.12828 0.474938C1.43621 0.158315 1.79546 0 2.20604 0C2.61661 0 2.97586 0.158315 3.28379 0.474938Z"
                                fill="var(--themePrimaryColor)"
                            ></path>
                        </svg>
                    </div>
                    <div className="text-center sm:text-left w-full sm:w-1/2">
                        <h3 className="font-bold mb-2">Your Goal</h3>
                        <div className="bg-gray-200 w-32 h-32 mx-auto mb-2 rounded-full flex items-center justify-center">
                            <img src={afterImage} alt="After" className="w-full h-full object-cover rounded-full" />
                        </div>
                        <p className="font-semibold">Sleep time: 12 hours</p>
                        <p className="text-green-500 font-bold">Good</p>
                        <ProgressBar progress={100} />
                    </div>
                </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6">Choose Your Plan</h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 sm:mb-8">
                <PlanOption duration="1-Week Trial" price={9.90} perDay={1.41} onSelect={handlePlanSelection} />
                <PlanOption duration="4-Week Plan" price={15.00} perDay={0.53} popular={true} onSelect={handlePlanSelection} />
                <PlanOption duration="12-Week Plan" price={30.00} perDay={0.35} onSelect={handlePlanSelection} />
            </div>

            <div className="bg-gray-100 p-4 sm:p-6 rounded-lg mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl font-bold mb-4">What you get:</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <Feature icon={iconSleepSchedule} text="Personalized sleep schedule based on your baby's age and needs" />
                        <Feature icon={iconGuide} text="Step-by-step guide to implement gentle sleep training methods" />
                        <Feature icon={iconSupport} text="Daily tips and support to help you stay consistent" />
                        <Feature icon={iconTracking} text="Track your baby's sleep patterns and see improvements over time" />
                        <Feature icon={iconConsultant} text="Access to sleep consultants for personalized advice" />
                    </div>
                    <div className="flex items-center justify-center">
                        <img src={mobileAppIllustration} alt="Mobile App" className="max-w-full h-auto" />
                    </div>
                </div>
            </div>

            <div className="mb-6 sm:mb-8">
                <h2 className="text-lg sm:text-xl font-bold mb-4">As featured in</h2>
                <div className="flex flex-wrap justify-between items-center">
                    <img src={featuredInLogo1} alt="USA Today" className="w-1/2 sm:w-auto mb-2 sm:mb-0" />
                    <img src={featuredInLogo2} alt="Forbes" className="w-1/2 sm:w-auto mb-2 sm:mb-0" />
                    <img src={featuredInLogo3} alt="WSJ" className="w-1/2 sm:w-auto mb-2 sm:mb-0" />
                    <img src={featuredInLogo4} alt="New York Post" className="w-1/2 sm:w-auto mb-2 sm:mb-0" />
                    <img src={featuredInLogo5} alt="Mashable" className="w-1/2 sm:w-auto" />
                </div>
            </div>

            <div className="mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl font-bold mb-4">Results that make us proud</h2>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <img src={testimonialImage} alt="Testimonial" className="w-full mb-2 rounded" />
                    <h3 className="font-bold">Eun, -5 kg</h3>
                    <p className="text-sm">It helps you track everything you need when you want to help yourself lower weight or keep it, from water to food and calories...</p>
                    <a href="#" className="text-blue-500 text-sm">Read more</a>
                </div>
            </div>

            <div className="mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">People often ask</h2>
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

            {/* Choose Your Plan section (repeated) */}
            <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6">Choose Your Plan</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 sm:mb-8">
                <PlanOption duration="1-Week Trial" price={9.90} perDay={1.41} onSelect={handlePlanSelection} />
                <PlanOption duration="4-Week Plan" price={15.00} perDay={0.53} popular={true} onSelect={handlePlanSelection} />
                <PlanOption duration="12-Week Plan" price={30.00} perDay={0.35} onSelect={handlePlanSelection} />
            </div>

            {/* 30-day money-back guarantee section */}
            <div className="bg-gray-100 p-4 sm:p-6 rounded-lg mb-6 sm:mb-8">
                <div className="flex items-center justify-center mb-4">
                    <img src={shieldIcon} alt="Shield" className="w-8 h-8 mr-2" />
                    <h2 className="text-xl sm:text-2xl font-bold">30-day money-back guarantee</h2>
                </div>
                <p className="text-center mb-4">
                    We believe that our plan may work for you and you'll get visible results in 4 weeks!
                    We even are ready to return your money back if you don't see visible results and
                    can demonstrate that you followed our plan.
                </p>
                <p className="text-center text-sm text-blue-600">
                    Find more about applicable limitations in our <a href="#" className="underline">money-back policy</a>.
                </p>
            </div>

            {/* Logo carousel */}
            <div className="mb-6 sm:mb-8">
                <h2 className="text-lg sm:text-xl font-bold mb-4 text-center">As featured in</h2>
                <div className="flex justify-center items-center">
                    <img src={logos[currentLogoIndex]} alt="Featured In" className="w-32 h-auto" />
                </div>
            </div>

            <div className="mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl font-bold mb-4">Results that make us proud</h2>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <img src={testimonialImage} alt="Testimonial" className="w-full mb-2 rounded" />
                    <h3 className="font-bold">Baby Olivia, -5 kg</h3>
                    <p className="text-sm">It helps you track everything you need when you want to help yourself lower weight or keep it, from water to food and calories...</p>
                    <a href="#" className="text-blue-500 text-sm">Read more</a>
                </div>
            </div>

            <p className="text-xs text-gray-500 text-center">
                By selecting a plan, you agree to our Terms of Service and Privacy Policy. You can cancel anytime through your account settings.
            </p>
        </div>
    );
};

export default UpdatedBabySleepPlanCheckout;