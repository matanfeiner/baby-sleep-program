import React, { useState, useEffect } from 'react';
import { Scale } from 'lucide-react';

const WeightInput = ({ value, onChange, defaultUnit = 'lbs' }) => {
    const [unit, setUnit] = useState(defaultUnit);
    const [weight, setWeight] = useState(value || '');
    const [error, setError] = useState('');

    useEffect(() => {
        if (weight && !isNaN(parseFloat(weight))) {
            setError('');
        } else if (weight !== '') {
            setError('Please enter a valid number');
        }
    }, [weight]);

    const handleUnitChange = (newUnit) => {
        setUnit(newUnit);
        const parsedWeight = parseFloat(weight);
        if (!isNaN(parsedWeight)) {
            const newWeight = newUnit === 'kg'
                ? Math.round(parsedWeight / 2.205 * 10) / 10
                : Math.round(parsedWeight * 2.205 * 10) / 10;
            setWeight(newWeight.toFixed(1));
        }
    };

    const handleWeightChange = (e) => {
        setWeight(e.target.value);
    };

    useEffect(() => {
        const parsedWeight = parseFloat(weight);
        if (!isNaN(parsedWeight) && parsedWeight > 0) {
            onChange(parsedWeight, unit);
        }
    }, [weight, unit, onChange]);

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
            <div className="flex items-center justify-center mb-4">
                <Scale className="text-blue-500 mr-2" />
                <h2 className="text-2xl font-semibold text-gray-800">Weight Input</h2>
            </div>
            <div className="flex justify-center space-x-2 mb-4">
                {['lbs', 'kg'].map((unitOption) => (
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
                    value={weight}
                    onChange={handleWeightChange}
                    className={`w-full p-3 border-2 rounded-lg text-center text-2xl ${
    error ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
} transition-colors duration-200`}
                    placeholder={`Enter weight in ${unit}`}
                    step="0.1"
                    aria-label={`Weight in ${unit}`}
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    {unit}
                </span>
            </div>
            {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
        </div>
    );
};

export default WeightInput;