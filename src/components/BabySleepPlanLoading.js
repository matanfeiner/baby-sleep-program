import React, { useState, useEffect } from 'react';

const BabySleepPlanLoading = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const totalDuration = 9000; // 9 seconds in milliseconds
    const intervalDuration = 100; // Interval time in milliseconds
    const increment = 100 / (totalDuration / intervalDuration); // Increment per interval to reach 100 in 9 seconds

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress >= 100) {
                    clearInterval(interval);
                    if (onComplete) {
                        onComplete(); // Move to the next step when progress reaches 100%
                    }
                    return 100;
                }
                return prevProgress + increment;
            });
        }, intervalDuration);

        return () => clearInterval(interval);
    }, [increment, intervalDuration, onComplete]);

    // Calculate the stroke offset based on the progress percentage
    const circumference = 251.2;
    const strokeDashoffset = circumference - (circumference * progress) / 100;

    return (
        <div className="max-w-md mx-auto p-6 text-center">
            <h1 className="text-3xl font-bold mb-8">BabyRestWell</h1>

            <div className="relative w-48 h-48 mx-auto mb-6">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle
                        className="text-gray-200 stroke-current"
                        strokeWidth="10"
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                    ></circle>
                    <circle
                        className="text-blue-500 progress-ring stroke-current"
                        strokeWidth="10"
                        strokeLinecap="round"
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        style={{ transition: 'stroke-dashoffset 0.1s linear' }}
                    ></circle>
                </svg>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl font-bold">
                    {Math.floor(progress)}%
                </div>
            </div>

            <p className="text-xl mb-8">Creating your Personalized Baby Sleep Plan</p>

            <p className="text-3xl font-bold text-blue-600 mb-2">2.5 million families</p>
            <p className="text-lg mb-8">have chosen BabyRestWell</p>

            <div className="bg-gray-100 p-4 rounded-lg text-left">
                <div className="flex items-center mb-2">
                    <div className="text-yellow-400">★★★★★</div>
                    <div className="ml-2 font-semibold">Life-changing program!</div>
                </div>
                <p className="text-sm mb-2">
                    This sleep training program has been a game-changer for our family. The personalized plan was easy to follow, and the support was incredible. Our baby now sleeps through the night, and we're all much happier and well-rested. I can't recommend it enough!
                </p>
                <p className="text-sm text-right">Sarah, mother of 6-month-old</p>
            </div>
        </div>
    );
};

export default BabySleepPlanLoading;
