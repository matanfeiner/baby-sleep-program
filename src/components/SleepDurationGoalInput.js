import React, { useState } from 'react';

const SleepDurationGoalInput = ({ value, onChange }) => {
    const [hours, setHours] = useState(value?.hours || '');
    const [minutes, setMinutes] = useState(value?.minutes || '0');

    const handleHoursChange = (e) => {
        setHours(e.target.value);
    };

    const handleMinutesChange = (e) => {
        setMinutes(e.target.value);
    };

    const handleSubmit = () => {
        onChange({ hours, minutes });
    };

    return (
        <div className="flex flex-col items-center">
            <div className="flex items-center space-x-2 mb-4">
                <input
                    type="number"
                    value={hours}
                    onChange={handleHoursChange}
                    className="w-20 p-2 border rounded text-center text-xl"
                    placeholder="Hours"
                    min="0"
                    max="24"
                />
                <span className="text-lg">hours</span>
                <select
                    value={minutes}
                    onChange={handleMinutesChange}
                    className="w-20 p-2 border rounded text-center text-xl"
                >
                    <option value="0">00</option>
                    <option value="15">15</option>
                    <option value="30">30</option>
                    <option value="45">45</option>
                </select>
                <span className="text-lg">minutes</span>
            </div>
            <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
            >
                Next
            </button>
        </div>
    );
};

export default SleepDurationGoalInput;
