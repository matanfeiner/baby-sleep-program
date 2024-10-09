import React, { useState } from 'react';
import { Baby, ChevronRight } from 'lucide-react';

const ParentBabyNameInput = ({ onNameSubmit }) => {
    const [parentName, setParentName] = useState('');
    const [babyName, setBabyName] = useState('');
    const [activeInput, setActiveInput] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        onNameSubmit(parentName, babyName);
    };

    const handleInputFocus = (inputName) => {
        setActiveInput(inputName);
    };

    const handleInputBlur = () => {
        setActiveInput(null);
    };

    return (
        <div className="flex justify-center items-start min-h-screen bg-gradient-to-br from-pink-100 to-blue-100 p-0 overflow-hidden">
            <div className="w-full max-w-md flex flex-col h-screen bg-white shadow-lg">
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
                        <form onSubmit={handleSubmit} className="space-y-8">
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
                        </form>
                    </div>
                </div>

                <div className="sticky bottom-0 bg-white p-4 border-t border-gray-200">
                    <button
                        onClick={handleSubmit}
                        className="w-full bg-blue-500 text-white py-4 rounded-lg font-semibold text-xl hover:bg-blue-600 active:bg-blue-700 transition-colors flex items-center justify-center"
                    >
                        NEXT STEP
                        <ChevronRight className="ml-2 w-6 h-6" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ParentBabyNameInput;