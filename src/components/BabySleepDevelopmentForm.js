import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, Baby } from 'lucide-react';
import WeightInput from './WeightInput';
import AgeInput from './AgeInput';
import SleepDurationGoalInput from './SleepDurationGoalInput';
import rudderanalytics from '../rudderstack';
import { useFormData } from '../contexts/FormDataContext';
import { questions, questionTypes, getIconForOption, getQuestionById } from '../data/questions';

const BabySleepDevelopmentForm = ({ onSubmit }) => {
    const { formData, updateFormData } = useFormData();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const bottomRef = useRef(null);

    const currentQuestion = questions[currentQuestionIndex];

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            rudderanalytics.track('Next Question', {
                currentQuestionIndex,
                nextQuestionIndex: currentQuestionIndex + 1
            });
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
            setSelectedOption(null);
        } else {
            rudderanalytics.track('Form Completed', formData);
            onSubmit(formData);
        }
    };

    const handleOptionClick = (key, value, type) => {
        setSelectedOption(value);

        if (type === questionTypes.MULTI_SELECT) {
            const currentSelections = formData[key] || [];
            const updatedSelections = currentSelections.includes(value)
                ? currentSelections.filter(item => item !== value)
                : [...currentSelections, value];
            updateFormData({ [key]: updatedSelections });
        } else {
            updateFormData({ [key]: value });
        }

        rudderanalytics.track('Answer Selected', {
            question: key,
            answer: value,
            questionType: type
        });

        if (window.navigator && window.navigator.vibrate) {
            window.navigator.vibrate(50);
        }

        // Automatically go to the next question when a radio option is selected
        if (type !== questionTypes.MULTI_SELECT) {
            handleNext();
        }
    };

    const renderQuestion = (q) => {
        if (!q) return null;
        switch (q.type) {
            case questionTypes.CLICKABLE:
            case questionTypes.MULTI_SELECT:
                return (
                    <div className="space-y-4">
                        {q.options.map((option) => (
                            <label
                                key={option}
                                className={`w-full p-4 text-left bg-white rounded-lg shadow hover:bg-gray-50 active:bg-gray-100 transition-all flex items-center justify-between text-lg cursor-pointer
                                ${selectedOption === option ? 'ring-2 ring-blue-500 bg-blue-50' : ''}`}
                            >
                                <span>{option}</span>
                                <input
                                    type={q.type === questionTypes.MULTI_SELECT ? "checkbox" : "radio"}
                                    checked={q.type === questionTypes.MULTI_SELECT
                                        ? (formData[q.key] || []).includes(option)
                                        : selectedOption === option}
                                    onChange={() => handleOptionClick(q.key, option, q.type)}
                                    className="form-checkbox h-6 w-6 text-blue-600 rounded-full"
                                />
                            </label>
                        ))}
                    </div>
                );
            case questionTypes.EDUCATION:
            case questionTypes.FUTURE:
                return (
                    <div className="education-card bg-white p-6 rounded-lg shadow-lg">
                        <img
                            src={q.image}
                            alt={q.alt || "Educational content"}
                            className="w-full rounded-lg mb-6"
                        />
                        <div className="text-center">
                            <p className="education-text text-2xl font-bold mb-4 text-blue-800 leading-tight">
                                "{q.content}"
                            </p>
                            <p className="text-lg text-gray-700 italic flex items-center justify-center">
                                <Baby className="w-5 h-5 mr-2 pulse-icon text-blue-500" />
                                Baby Sleep Wisdom
                            </p>
                        </div>
                    </div>
                );
            case questionTypes.WEIGHT:
                return <WeightInput value={formData[q.key]} onChange={(weight, unit) => updateFormData({ [q.key]: { weight, unit } })} />;
            case questionTypes.AGE:
                return <AgeInput value={formData[q.key]} onChange={(age, unit) => updateFormData({ [q.key]: { age, unit } })} />;
            case questionTypes.SLEEP_DURATION_GOAL:
                return <SleepDurationGoalInput value={formData[q.key]} onChange={(value) => updateFormData({ [q.key]: value })} />;
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex-grow overflow-y-auto">
                <div className="p-4">
                    <div className="mb-6">
                        {currentQuestion?.question && (
                            <h2 className="text-lg font-semibold mb-4 text-blue-800">{currentQuestion.question}</h2>
                        )}
                        {renderQuestion(currentQuestion)}
                    </div>
                    <div ref={bottomRef}/>
                </div>
            </div>

            {/* Hide the button when the current question is a radio type */}
            <div className="p-4 border-t border-gray-200">
                {currentQuestion?.type !== questionTypes.CLICKABLE && (
                    <button
                        onClick={handleNext}
                        disabled={!formData[currentQuestion.key] && ![questionTypes.EDUCATION, questionTypes.FUTURE].includes(currentQuestion.type)}
                        className="w-full bg-blue-500 text-white py-4 rounded-lg font-semibold text-xl hover:bg-blue-600 active:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        NEXT STEP
                    </button>
                )}
            </div>
        </div>
    );
};

export default BabySleepDevelopmentForm;
