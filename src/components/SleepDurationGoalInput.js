import React, { useState, useEffect } from 'react';
import { Moon } from 'lucide-react';

const SleepDurationGoalInput = ({ value, onChange }) => {
    const [hours, setHours] = useState(value?.hours || 12);

    useEffect(() => {
        onChange({ hours: parseFloat(hours.toFixed(1)) });
    }, [hours, onChange]);

    const handleSliderChange = (e) => {
        setHours(parseFloat(e.target.value));
    };

    const getGradientColor = (value) => {
        const colors = ['#f87171', '#fbbf24', '#34d399', '#60a5fa', '#818cf8'];
        const index = (value - 6) / (18 - 6) * (colors.length - 1);
        const lowerIndex = Math.floor(index);
        const upperIndex = Math.ceil(index);
        const ratio = index - lowerIndex;

        if (lowerIndex === upperIndex) return colors[lowerIndex];

        const r = Math.round(parseInt(colors[lowerIndex].slice(1, 3), 16) * (1 - ratio) + parseInt(colors[upperIndex].slice(1, 3), 16) * ratio);
        const g = Math.round(parseInt(colors[lowerIndex].slice(3, 5), 16) * (1 - ratio) + parseInt(colors[upperIndex].slice(3, 5), 16) * ratio);
        const b = Math.round(parseInt(colors[lowerIndex].slice(5, 7), 16) * (1 - ratio) + parseInt(colors[upperIndex].slice(5, 7), 16) * ratio);

        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
            <div className="flex items-center justify-center mb-4">
                <Moon className="text-blue-500 mr-2" />
                <h2 className="text-2xl font-semibold text-gray-800">Sleep Duration Goal</h2>
            </div>
            <div className="mb-4">
                <input
                    type="range"
                    min="6"
                    max="18"
                    step="0.1"
                    value={hours}
                    onChange={handleSliderChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    style={{
                        background: `linear-gradient(to right, #f87171, #fbbf24, #34d399, #60a5fa, #818cf8)`,
                    }}
                />
            </div>
            <div className="text-center">
                <span className="text-4xl font-bold" style={{ color: getGradientColor(hours) }}>
                    {hours.toFixed(1)}
                </span>
                <span className="text-2xl text-gray-600 ml-2">hours</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>6 hours</span>
                <span>18 hours</span>
            </div>
        </div>
    );
};

export default SleepDurationGoalInput;