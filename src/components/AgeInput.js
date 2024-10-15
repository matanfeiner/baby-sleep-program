import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';

const AgeInput = ({ value, onChange, defaultUnit = 'months' }) => {
    const [unit, setUnit] = useState(defaultUnit);
    const [age, setAge] = useState(value || '');
    const [error, setError] = useState('');

    useEffect(() => {
        if (age && !isNaN(parseInt(age))) {
            setError('');
            onChange(parseInt(age), unit);
        } else if (age !== '') {
            setError('Please enter a valid number');
            onChange(null, unit);
        } else {
            onChange(null, unit);
        }
    }, [age, unit, onChange]);

    const handleUnitChange = (newUnit) => {
        setUnit(newUnit);
        const parsedAge = parseInt(age);
        if (!isNaN(parsedAge)) {
            const newAge = newUnit === 'months'
                ? parsedAge * 12
                : Math.floor(parsedAge / 12);
            setAge(newAge.toString());
        }
    };

    const handleAgeChange = (e) => {
        setAge(e.target.value);
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
            <div className="flex items-center justify-center mb-4">
                <Calendar className="text-blue-500 mr-2" />
                <h2 className="text-2xl font-semibold text-gray-800">Age Input</h2>
            </div>
            <div className="flex justify-center space-x-2 mb-4">
                {['months', 'years'].map((unitOption) => (
                    <button
                        key={unitOption}
                        className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${
                            unit === unitOption
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                        onClick={() => handleUnitChange(unitOption)}
                    >
                        {unitOption}
                    </button>
                ))}
            </div>
            <div className="relative">
                <input
                    type="number"
                    value={age}
                    onChange={handleAgeChange}
                    className={`w-full p-3 border-2 rounded-lg text-center text-2xl ${
                        error ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                    } transition-colors duration-200`}
                    placeholder={`Enter age in ${unit}`}
                    step="1"
                    min="0"
                    aria-label={`Age in ${unit}`}
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    {unit}
                </span>
            </div>
            {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
        </div>
    );
};

export default AgeInput;