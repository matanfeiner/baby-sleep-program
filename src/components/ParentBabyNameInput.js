import React, { useState, useEffect } from 'react';
import { Baby } from 'lucide-react';

const ParentBabyNameInput = ({ onNameChange }) => {
    const [parentName, setParentName] = useState('');
    const [babyName, setBabyName] = useState('');
    const [activeInput, setActiveInput] = useState(null);

    useEffect(() => {
        onNameChange({ parentName, babyName });
    }, [parentName, babyName, onNameChange]);

    const handleInputFocus = (inputName) => {
        setActiveInput(inputName);
    };

    const handleInputBlur = () => {
        setActiveInput(null);
    };

    return (
        <div className="w-full max-w-md mx-auto flex flex-col bg-white shadow-lg">
            <div className="sticky top-0 bg-white z-10 pt-safe">
                <div className="px-4 py-3 shadow-sm">
                    <div className="flex items-center">
                        <Baby className="text-pink-500 w-6 h-6 mr-2" />
                        <h1 className="text-xl font-bold text-blue-800 ml-2">Baby Sleep Program</h1>
                    </div>
                </div>
            </div>

            <div className="flex-grow overflow-y-auto">
                <div className="p-4">
                    <h2 className="text-2xl font-semibold mb-6 text-blue-800">Let's get to know you</h2>
                    <div className="space-y-8">
                        <div>
                            <label htmlFor="parentName" className="block text-lg font-semibold mb-2 text-gray-700">What's your name?</label>
                            <input
                                type="text"
                                id="parentName"
                                value={parentName}
                                onChange={(e) => setParentName(e.target.value)}
                                onFocus={() => handleInputFocus('parent')}
                                onBlur={handleInputBlur}
                                placeholder="Your name"
                                className={`w-full p-4 text-lg border-2 rounded-lg ${
                                    activeInput === 'parent' ? 'border-blue-500' : 'border-gray-300'
                                } focus:outline-none transition-colors`}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="babyName" className="block text-lg font-semibold mb-2 text-gray-700">What's your baby's name?</label>
                            <input
                                type="text"
                                id="babyName"
                                value={babyName}
                                onChange={(e) => setBabyName(e.target.value)}
                                onFocus={() => handleInputFocus('baby')}
                                onBlur={handleInputBlur}
                                placeholder="Baby's name"
                                className={`w-full p-4 text-lg border-2 rounded-lg ${
                                    activeInput === 'baby' ? 'border-blue-500' : 'border-gray-300'
                                } focus:outline-none transition-colors`}
                                required
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ParentBabyNameInput;