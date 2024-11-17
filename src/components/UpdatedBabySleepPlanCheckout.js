import React, { useState, useEffect } from 'react';
import { Star, Check, ChevronDown, ChevronUp } from 'lucide-react';

// Import images and icons
import mobileAppIllustration from '../assets/images/app-without-background.png';
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
import beforeImage from '../assets/images/before.jpg';
import afterImage from '../assets/images/after.jpg';
import testimonialImage from '../assets/images/WhatsApp Image 2024-10-15 at 14.21.41.jpeg';
import testimonialImage2 from '../assets/images/nadavfe_iphone_photo_of_a_mom_holding_happy_sleeping_baby_165d4444-7684-4430-9865-099749307555.jpg';
import shieldIcon from '../assets/images/shield-icon.png';
import planImage1Week from '../assets/images/Firstcovercentered01.png';
import planImage2Weeks from '../assets/images/Firstcovercentered02.png';
import planImage4Weeks from '../assets/images/Firstcovercentered04.png';

const PlanOption = ({ duration, price, perDay, popular = false, onSelect, planImage, babyName = "", sleepGoal = 12 }) => {
    const getDisplayedSleepGoal = (duration, sleepGoal) => {
        switch(duration) {
            case "1-Week Trial":
                return Math.round(sleepGoal / 4);
            case "2-Week Plan":
                return Math.round(sleepGoal / 2);
            case "4-Week Plan":
                return Math.round(sleepGoal);
            default:
                return Math.round(sleepGoal);
        }
    };

    const displayedSleepGoal = getDisplayedSleepGoal(duration, sleepGoal);

    return (
        <div className={`bg-white p-4 rounded-lg shadow-md ${popular ? 'border-2 border-blue-500' : ''}`}>
            <div className="relative">
                {planImage && (
                    <div className="relative">
                        <img
                            src={planImage}
                            alt={`${duration} Plan`}
                            className="w-full h-auto mb-4 rounded"
                        />
                        <div className="absolute top-[15%] left-[55%] right-0 text-left">
                            <div className="text-white font-serif leading-tight text-lg">
                                {babyName ? `${babyName}'s` : 'Your'}
                                <br />
                                {displayedSleepGoal}Hr
                                <br />
                                Sleep Plan
                            </div>
                        </div>
                    </div>
                )}
            </div>
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
};

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

const UpdatedBabySleepPlanCheckout = ({ onPlanSelect, babyName = "", sleepGoal = 12 }) => {
    const [progress, setProgress] = useState(0);
    const [currentLogoIndex, setCurrentLogoIndex] = useState(0);
    const logos = [featuredInLogo1, featuredInLogo2, featuredInLogo3, featuredInLogo4, featuredInLogo5];

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
        let url;
        switch(duration) {
            case "1-Week Trial":
                url = 'https://dididesk.com/cart/49247434670360:1';
                break;
            case "2-Week Plan":
                url = 'https://dididesk.com/checkouts/cn/Z2NwLWV1cm9wZS13ZXN0MTowMUpBUTVLTk1NNDJZV0FEWlBUTUc1ODNSUQ';
                break;
            case "4-Week Plan":
                url = 'https://dididesk.com/checkouts/cn/Z2NwLWV1cm9wZS13ZXN0MTowMUpBUTVLTk1NNDJZV0FEWlBUTUc1ODNSUQ';
                break;
            default:
                url = 'https://plan.mytinymilestones.com/something-went-wrong/';
        }
        window.location.href = url;
    };

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6">
            <div className="bg-blue-100 text-blue-800 p-2 rounded-lg mb-4 relative">
                <span className="absolute top-0 right-0 bg-blue-500 text-white px-2 py-1 text-xs rounded-bl">
                    Limited Offer: 50% Off
                </span>
                <p className="font-semibold">Get your personalized sleep plan now</p>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">Your Baby Sleep Journey</h1>

            <div className="bg-gray-50 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
                <div className="flex flex-col sm:flex-row justify-between items-center">
                    <div className="text-center sm:text-left w-full sm:w-1/2 mb-4 sm:mb-0">
                        <h3 className="font-bold mb-2">Now</h3>
                        <div className="bg-gray-200 w-32 h-32 mx-auto mb-2 rounded-full flex items-center justify-center">
                            <img src={beforeImage} alt="Before" className="w-full h-full object-cover rounded-full"/>
                        </div>
                        <p className="font-semibold">Sleep time: 6 hours</p>
                        <p className="text-red-500 font-bold">Bad</p>
                        <ProgressBar progress={25}/>
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
                            <img src={afterImage} alt="After" className="w-full h-full object-cover rounded-full"/>
                        </div>
                        <p className="font-semibold">Sleep time: {sleepGoal} hours</p>
                        <p className="text-green-500 font-bold">Good</p>
                        <ProgressBar progress={100}/>
                    </div>
                </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6">Choose Your Plan</h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 sm:mb-8">
                <PlanOption
                    duration="1-Week Trial"
                    price={9.99}
                    perDay={1.43}
                    onSelect={handlePlanSelection}
                    planImage={planImage1Week}
                    babyName={babyName}
                    sleepGoal={sleepGoal}
                />
                <PlanOption
                    duration="2-Week Plan"
                    price={19.99}
                    perDay={0.71}
                    popular={true}
                    onSelect={handlePlanSelection}
                    planImage={planImage2Weeks}
                    babyName={babyName}
                    sleepGoal={sleepGoal}
                />
                <PlanOption
                    duration="4-Week Plan"
                    price={29.99}
                    perDay={0.35}
                    onSelect={handlePlanSelection}
                    planImage={planImage4Weeks}
                    babyName={babyName}
                    sleepGoal={sleepGoal}
                />
            </div>

            <div className="bg-gray-100 p-4 sm:p-6 rounded-lg mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl font-bold mb-4">What you get:</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <Feature icon={iconSleepSchedule}
                                 text="Personalized sleep schedule based on your baby's age and needs"/>
                        <Feature icon={iconGuide} text="Step-by-step guide to implement gentle sleep training methods"/>
                        <Feature icon={iconSupport} text="Daily tips and support to help you stay consistent"/>
                        <Feature icon={iconTracking}
                                 text="Track your baby's sleep patterns and see improvements over time"/>
                        <Feature icon={iconConsultant} text="Access to sleep consultants for personalized advice"/>
                    </div>
                    <div className="flex items-center justify-center">
                        <img src={mobileAppIllustration} alt="Mobile App" className="max-w-full h-auto"/>
                    </div>
                </div>
            </div>

            <div className="mb-6 sm:mb-8">
                <h2 className="text-lg sm:text-xl font-bold mb-4">As featured in</h2>
                <div className="flex flex-wrap justify-between items-center">
                    <img src={featuredInLogo1} alt="USA Today" className="w-1/2 sm:w-auto mb-2 sm:mb-0"/>
                    <img src={featuredInLogo2} alt="Forbes" className="w-1/2 sm:w-auto mb-2 sm:mb-0"/>
                    <img src={featuredInLogo3} alt="WSJ" className="w-1/2 sm:w-auto mb-2 sm:mb-0"/>
                    <img src={featuredInLogo4} alt="New York Post" className="w-1/2 sm:w-auto mb-2 sm:mb-0"/>
                    <img src={featuredInLogo5} alt="Mashable" className="w-1/2 sm:w-auto"/>
                </div>
            </div>

            <div className="mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl font-bold mb-4">Results that make us proud</h2>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <img src={testimonialImage} alt="Testimonial" className="w-full mb-2 rounded"/>
                    <h3 className="font-bold">Tina, mother of Olivia</h3>
                    <p className="text-sm">Since introducing the program to our nightly routine, it's been a game changer for little Max and me. The personalized weekly notebooks help us stay on track and make consistent progress.</p>
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
                    answer="Upon purchase, you'll receive weekly personalized notebooks containing your baby's custom sleep schedule, tracking tools, and expert guidance tailored to your baby's progress."
                />
                <FAQItem
                    question="Is this suitable for all ages?"
                    answer="Yes, our sleep plans are customized for babies from newborn to 24 months old, with age-appropriate strategies and techniques."
                />
            </div>

            <div className="bg-gray-100 p-4 sm:p-6 rounded-lg mb-6 sm:mb-8">
                <div className="flex items-center justify-center mb-4">
                    <img src={shieldIcon} alt="Shield" className="w-8 h-8 mr-2"/>
                    <h2 className="text-xl sm:text-2xl font-bold">30-day money-back guarantee</h2>
                </div>
                <p className="text-center mb-4">
                    We believe that our plan may work for you and you'll get visible results in 4 weeks!
                    We even are ready to return your money back if you don't see visible results and
                    can demonstrate that you followed our plan.
                </p>
                <p className="text-center text-sm text-blue-600">
                    Find more about applicable limitations in our <a href="#" className="underline">money-back
                    policy</a>.
                </p>
            </div>

            <div className="mb-6 sm:mb-8">
                <h2 className="text-lg sm:text-xl font-bold mb-4 text-center">As featured in</h2>
                <div className="flex justify-center items-center">
                    <img src={logos[currentLogoIndex]} alt="Featured In" className="w-32 h-auto"/>
                </div>
            </div>

            <div className="mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl font-bold mb-4">Results that make us proud</h2>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <img src={testimonialImage2} alt="Testimonial" className="w-full mb-2 rounded"/>
                    <h3 className="font-bold">Jane, mother of Emma</h3>
                    <p className="text-sm">"The weekly notebooks have been a lifesaver! Having a structured plan that adapts to Emma's progress has made all the difference. She's now sleeping through the night and our whole family is happier."</p>
                    <a href="#" className="text-blue-500 text-sm">Read more</a>
                </div>
            </div>

            <p className="text-xs text-gray-500 text-center">
                By selecting a plan, you agree to our Terms of Service and Privacy Policy. You can cancel anytime
                through your account settings.
            </p>
        </div>
    );
};

export default UpdatedBabySleepPlanCheckout;