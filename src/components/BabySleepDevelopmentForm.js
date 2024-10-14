import React, { useState, useEffect, useRef } from 'react';
import {
    ChevronLeft,
    Baby,
    AlertCircle,
    Sun,
    Moon,
    Coffee,
    X,
    Heart,
    Battery,
    Apple,
    Clock,
    Calendar
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
        document.body.style.overflow = 'hidden'; // Disable background scroll
        return () => {
            document.body.style.overflow = 'unset'; // Enable background scroll when component unmounts
        };
    }, []);

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [step]);

    const handleNext = () => {
        if (step < questions.length - 1) {
            rudderanalytics.track('Next Question', {
                currentQuestionIndex: step,
                nextQuestionIndex: step + 1
            });
            setStep(step + 1);
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
        setIsNextDisabled(true);
        setClickedOption(value);

        if (type === questionTypes.MULTI_SELECT) {
            const currentSelections = formData[key] || [];
            const updatedSelections = currentSelections.includes(value)
                ? currentSelections.filter(item => item !== value)
                : [...currentSelections, value];
            updateFormData({ [key]: updatedSelections });
        } else {
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

        setTimeout(() => {
            setIsNextDisabled(false);
            setClickedOption(null);
            if (type === questionTypes.CLICKABLE) {
                handleNext();
            }
        }, 300);
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
                            ${clickedOption === option ? 'ring-2 ring-blue-500 bg-blue-50 scale-[0.98]' : ''}`}>
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
            case questionTypes.WEIGHT:
            case questionTypes.AGE:
            case questionTypes.SLEEP_DURATION_GOAL:
                return (
                    <div className="bg-white p-4 rounded-lg shadow">
                        {q.type === questionTypes.WEIGHT && (
                            <WeightInput
                                value={formData[q.key]?.weight}
                                onChange={(weight, unit) => updateFormData({ [q.key]: { weight, unit } })}
                                defaultUnit="lbs"
                            />
                        )}
                        {q.type === questionTypes.AGE && (
                            <AgeInput
                                value={formData[q.key]?.age}
                                onChange={(age, unit) => updateFormData({ [q.key]: { age, unit } })}
                            />
                        )}
                        {q.type === questionTypes.SLEEP_DURATION_GOAL && (
                            <SleepDurationGoalInput
                                value={formData[q.key]}
                                onChange={(value) => updateFormData({ [q.key]: value })}
                            />
                        )}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col h-full">
            <div className="sticky top-0 bg-white z-10 pt-safe shadow-sm">
                <div className="px-4 py-2">
                    <div className="flex items-center mb-2">
                        {step > 0 && (
                            <button onClick={handlePrevious}
                                    className="p-2 rounded-full hover:bg-gray-200 active:bg-gray-300 transition-colors">
                                <ChevronLeft className="w-6 h-6"/>
                            </button>
                        )}
                        <Baby className="text-pink-500 w-6 h-6 mr-2"/>
                        <h1 className="text-xl font-bold text-blue-800 ml-2">Baby Sleep Program</h1>
                    </div>
                </div>
            </div>

            <div className="flex-grow overflow-y-auto">
                <div className="p-4">
                    <div className="mb-6">
                        {questions[step]?.question && (
                            <h2 className="text-lg font-semibold mb-4 text-blue-800">{questions[step].question}</h2>
                        )}
                        {renderSleepQuestion(questions[step])}
                    </div>
                    <div ref={bottomRef}/>
                </div>
            </div>

            <div className="sticky bottom-0 bg-white p-4 border-t border-gray-200">
                {['MULTI_SELECT', 'WEIGHT', 'AGE', 'SLEEP_DURATION_GOAL'].includes(questions[step]?.type) && (
                    <button
                        onClick={handleNext}
                        disabled={isNextDisabled}
                        className={`w-full bg-blue-500 text-white py-4 rounded-lg font-semibold text-xl hover:bg-blue-600 active:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${clickedOption ? 'ring-2 ring-blue-300' : ''}`}
                    >
                        NEXT STEP
                    </button>
                )}
            </div>
        </div>
    );
}

export default BabySleepDevelopmentForm;
