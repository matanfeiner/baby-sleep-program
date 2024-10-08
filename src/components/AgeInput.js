import React, { useState } from 'react';

const AgeInput = ({ value, onChange }) => {
    const [unit, setUnit] = useState('months');
    const [age, setAge] = useState(value || '');

    const handleUnitChange = (newUnit) => {
        setUnit(newUnit);
        if (age) {
            const newAge = newUnit === 'months' ? age * 12 : Math.floor(age / 12);
            setAge(newAge);
        }
    };

    const handleAgeChange = (e) => {
        const newAge = e.target.value;
        setAge(newAge);
    };

    const handleSubmit = () => {
        onChange(age, unit);
    };

    return (
        <div className="flex flex-col items-center">
            <div className="flex space-x-2 mb-2">
                <button
                    className={`px-2 py-1 rounded ${unit === 'months' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => handleUnitChange('months')}
                >
                    months
                </button>
                <button
                    className={`px-2 py-1 rounded ${unit === 'years' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => handleUnitChange('years')}
                >
                    years
                </button>
            </div>
            <input
                type="number"
                value={age}
                onChange={handleAgeChange}
                className="w-full p-2 border rounded text-center text-2xl"
                placeholder={`Enter ${unit}`}
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

export default AgeInput;
