import React, { useState } from 'react';

const ParentBabyNameInput = ({ onNameSubmit }) => {
    const [parentName, setParentName] = useState('');
    const [babyName, setBabyName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onNameSubmit(parentName, babyName);
    };

    return (
        <div className="max-w-md mx-auto p-6">
            <h1 className="text-4xl font-bold text-center mb-12">Let's get to know you</h1>
            <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                    <label htmlFor="parentName" className="block text-2xl font-semibold mb-2">What's your name?</label>
                    <input
                        type="text"
                        id="parentName"
                        value={parentName}
                        onChange={(e) => setParentName(e.target.value)}
                        placeholder="Your name"
                        className="w-full p-3 text-xl border-b-2 border-gray-300 focus:border-blue-500 outline-none transition-colors"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="babyName" className="block text-2xl font-semibold mb-2">What's your baby's name?</label>
                    <input
                        type="text"
                        id="babyName"
                        value={babyName}
                        onChange={(e) => setBabyName(e.target.value)}
                        placeholder="Baby's name"
                        className="w-full p-3 text-xl border-b-2 border-gray-300 focus:border-blue-500 outline-none transition-colors"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-xl hover:bg-blue-700 transition duration-300 mt-8"
                >
                    Continue
                </button>
            </form>
        </div>
    );
};

export default ParentBabyNameInput;