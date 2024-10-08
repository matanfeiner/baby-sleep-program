import React, { useState } from 'react';

const WeightInput = ({ value, onChange, defaultUnit = 'kg' }) => {
    const [unit, setUnit] = useState(defaultUnit);
    const [weight, setWeight] = useState(value || '');

    const handleUnitChange = (newUnit) => {
        setUnit(newUnit);
        if (weight) {
            const newWeight = newUnit === 'kg'
                ? Math.round(weight / 2.205 * 10) / 10
                : Math.round(weight * 2.205 * 10) / 10;
            setWeight(newWeight);
        }
    };

    const handleWeightChange = (e) => {
        const newWeight = e.target.value;
        setWeight(newWeight);
    };

    const handleSubmit = () => {
        onChange(weight, unit);
    };

    return (
        <div className="flex flex-col items-center">
            <div className="flex space-x-2 mb-2">
                <button
                    className={`px-2 py-1 rounded ${unit === 'kg' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => handleUnitChange('kg')}
                >
                    kg
                </button>
                <button
                    className={`px-2 py-1 rounded ${unit === 'lbs' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => handleUnitChange('lbs')}
                >
                    lbs
                </button>
            </div>
            <input
                type="number"
                value={weight}
                onChange={handleWeightChange}
                className="w-full p-2 border rounded text-center text-2xl"
                placeholder={`Enter ${unit}`}
                step="0.1"
            />
            <span className="mt-2 text-lg">{unit}</span>
            <button
                onClick={handleSubmit}
                className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
            >
                Next
            </button>
        </div>
    );
};

export default WeightInput;
