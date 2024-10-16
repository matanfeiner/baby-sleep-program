import React, { useState, useEffect, useRef } from 'react';
import {
    ChevronLeft,
    AlertCircle,
    Sun,
    Moon,
    Coffee,
    X,
    Heart,
    Battery,
    Apple,
    Clock,
    Calendar,
    Baby
} from 'lucide-react';
import WeightInput from './WeightInput';
import AgeInput from './AgeInput';
import SleepDurationGoalInput from './SleepDurationGoalInput';
import rudderanalytics from '../rudderstack';
import { useFormData } from '../contexts/FormDataContext';
import { questions, questionTypes } from '../data/questions';

const BabySleepDevelopmentForm = ({ onSubmit }) => {
    const { formData, updateFormData } = useFormData();
    const [step, setStep] = useState(0);
    const [isNextDisabled, setIsNextDisabled] = useState(false);
    const [clickedOption, setClickedOption] = useState(null);
    const bottomRef = useRef(null);

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [step]);

    const handleNext = () => {
        setIsNextDisabled(true);
        if (step < questions.length - 1) {
            rudderanalytics.track('Next Question', {
                currentQuestionIndex: step,
                nextQuestionIndex: step + 1
            });
            setStep(step + 1);
            setIsNextDisabled(false);
        } else {
            rudderanalytics.track('Form Completed', formData);
            onSubmit(formData);
        }
    };

    const handlePrevious = () => {
        rudderanalytics.track('Previous Question', {
            currentQuestionIndex: step,
            previousQuestionIndex: step - 1
        });
        setStep(step - 1);
    };

    const handleOptionClick = (key, value, type) => {
        if (type === questionTypes.MULTI_SELECT) {
            const currentSelections = formData[key] || [];
            const updatedSelections = currentSelections.includes(value)
                ? currentSelections.filter(item => item !== value)
                : [...currentSelections, value];
            updateFormData({ [key]: updatedSelections });
        } else {
            setClickedOption(value);
            updateFormData({ [key]: value });
        }

        rudderanalytics.track('Answer Submitted', {
            question: key,
            answer: value,
            questionType: type
        });

        if (window.navigator && window.navigator.vibrate) {
            window.navigator.vibrate(50);
        }

        if (type === questionTypes.CLICKABLE) {
            setTimeout(() => {
                handleNext();
            }, 300);
        }
    };

    const renderProgressBar = () => {
        const progressPercentage = (step / (questions.length - 1)) * 100;
        return (
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mb-4">
                <div
                    className="bg-blue-500 h-full transition-all duration-300 ease-in-out"
                    style={{ width: `${progressPercentage}%` }}
                />
            </div>
        );
    };

    const renderSleepQuestion = (q) => {
        if (!q) return null;
        switch (q.type) {
            case questionTypes.CLICKABLE:
                return (
                    <div className="space-y-4">
                        {q.options.map((option) => (
                            <button
                                key={option}
                                onClick={() => handleOptionClick(q.key, option, q.type)}
                                className={`w-full p-4 text-left bg-white rounded-lg shadow hover:bg-gray-50 active:bg-gray-100 transition-all flex items-center justify-between text-lg
                                ${clickedOption === option ? 'ring-2 ring-blue-500 bg-blue-50 scale-[0.98] animate-pulse' : ''}`}
                            >
                                <span>{option}</span>
                                <div className={`w-6 h-6 border-2 rounded-full transition-all duration-200 ease-in-out
                                ${clickedOption === option ? 'bg-blue-500 border-blue-500 scale-110' : 'border-gray-300'}`}>
                                    {clickedOption === option && (
                                        <div className="w-full h-full rounded-full bg-white scale-50"/>
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>
                );
            case questionTypes.MULTI_SELECT:
                return (
                    <div className="space-y-4">
                        {q.options.map((option) => (
                            <label key={option} className={`flex items-center justify-between p-4 bg-white rounded-lg shadow w-full text-lg transition-all
                            ${(formData[q.key] || []).includes(option) ? 'ring-2 ring-blue-500 bg-blue-50 scale-[0.98]' : ''}`}>
                                <span>{option}</span>
                                <input
                                    type="checkbox"
                                    value={option}
                                    checked={(formData[q.key] || []).includes(option)}
                                    onChange={() => handleOptionClick(q.key, option, q.type)}
                                    className="form-checkbox h-6 w-6 text-blue-600 rounded-full transition-all duration-200 ease-in-out"
                                />
                            </label>
                        ))}
                    </div>
                );
            // ... (rest of the cases remain the same)
        }
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex-grow overflow-y-auto">
                <div className="p-4">
                    {renderProgressBar()}
                    <div className="mb-6">
                        {questions[step]?.question && (
                            <h2 className="text-lg font-semibold mb-4 text-blue-800">{questions[step].question}</h2>
                        )}
                        {renderSleepQuestion(questions[step])}
                    </div>
                    <div ref={bottomRef}/>
                </div>
            </div>

            {/* Footer for NEXT button, only show if it's NOT a radio button question */}
            {questions[step]?.type !== questionTypes.CLICKABLE && (
                <div className="sticky bottom-0 bg-white p-4 border-t border-gray-200">
                    <button
                        onClick={handleNext}
                        disabled={isNextDisabled}
                        className={`w-full bg-blue-500 text-white py-4 rounded-lg font-semibold text-xl hover:bg-blue-600 active:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                        NEXT STEP
                    </button>
                </div>
            )}
        </div>
    );
}

export default BabySleepDevelopmentForm;