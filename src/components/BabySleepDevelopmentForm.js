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
import { questions, questionTypes, getIconForOption, getQuestionById } from '../data/questions';

// Import images
import crawlingBaby from '../assets/images/nadavfe_full_body_picture_of_crawling_baby_on_a_white_screen_4e6550ea-55e7-4f2a-8ee7-2aaff0ca6de2.jpg';
import playingHappyBaby from '../assets/images/nadavfe_full_body_picture_of_playing_happy_baby_on_a_white_scre_b8a00ff0-5e66-42e4-a7f8-2e749bcb5dcc.jpg';
import sleepingHappyBaby from '../assets/images/nadavfe_full_body_picture_of_sleeping_happy_baby_on_a_white_scr_8610e1b7-6455-4588-89d2-162d36826742.jpg';
import standingHappyBaby from '../assets/images/nadavfe_full_body_picture_of_standing_happy_baby_on_a_white_scr_21039812-6052-4f3e-8906-660f7cfe0c6a.jpg';
import walkingHappyBaby from '../assets/images/nadavfe_full_body_picture_of_walking_happy_baby_on_a_white_scre_5070c7f5-831a-460c-90e5-9ee97748305c.jpg';
import walkingHappyBaby2 from '../assets/images/nadavfe_full_body_picture_of_walking_happy_baby_on_a_white_scre_739971d0-d52c-4856-b306-2776b5e5aec5.jpg';
import cryingBabyInCrib1 from '../assets/images/nadavfe_photo_of_a_crying_baby_in_a_crib_on_white_screen_12ff85d9-7d9e-4d83-a051-d0fcdae29cdf.jpg';
import cryingBabyInCrib2 from '../assets/images/nadavfe_photo_of_a_crying_baby_in_a_crib_on_white_screen_2513d2db-9b77-4534-a009-19d85659b8d2.jpg';
import screamingBabyInCrib from '../assets/images/nadavfe_photo_of_a_screaming_baby_in_a_crib_on_white_screen_8d03b4d2-ad17-429b-85b1-9e7fd406b91a.jpg';
import smilingSleepingBabyInCrib from '../assets/images/nadavfe_photo_of_a_smiling_sleeping_baby_in_a_crib_on_white_scr_3e0a4752-9fd2-4444-8b07-7d182113d924.jpg';
import sleepingBabyInCrib from '../assets/images/nadavfe_picture_of_sleeping_baby_in_a_crib_on_a_white_screen_4e040b55-58be-4283-a5c6-81b903cd839b.jpg';
import sittingHappyBaby from '../assets/images/nadavfe_sitting_happy_baby_on_white_screen_1e1c64c1-68d8-41c5-919d-30ca0cee484c.jpg';

const BabySleepDevelopmentForm = ({ onSubmit }) => {
    const { formData, updateFormData } = useFormData();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isNextDisabled, setIsNextDisabled] = useState(false);
    const [clickedOption, setClickedOption] = useState(null);
    const bottomRef = useRef(null);

    const currentQuestion = questions[currentQuestionIndex];

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            rudderanalytics.track('Next Question', {
                currentQuestionIndex,
                nextQuestionIndex: currentQuestionIndex + 1
            });
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        } else {
            rudderanalytics.track('Form Completed', formData);
            onSubmit(formData);
        }
    };

    const handlePrevious = () => {
        rudderanalytics.track('Previous Question', {
            currentQuestionIndex,
            previousQuestionIndex: currentQuestionIndex - 1
        });
        setCurrentQuestionIndex(prevIndex => prevIndex - 1);
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

    const renderQuestion = (q) => {
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
                                <div className="flex items-center">
                                    {getIconForOption(option)}
                                    <div className={`ml-2 w-6 h-6 border-2 rounded-full transition-all duration-200 ease-in-out
                                    ${clickedOption === option ? 'bg-blue-500 border-blue-500 scale-110' : 'border-gray-300'}`}>
                                        {clickedOption === option && (
                                            <div className="w-full h-full rounded-full bg-white scale-50"/>
                                        )}
                                    </div>
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
                                <div className="flex items-center">
                                    {getIconForOption(option)}
                                    <input
                                        type="checkbox"
                                        value={option}
                                        checked={(formData[q.key] || []).includes(option)}
                                        onChange={() => handleOptionClick(q.key, option, q.type)}
                                        className="ml-2 form-checkbox h-6 w-6 text-blue-600 rounded-full transition-all duration-200 ease-in-out"
                                    />
                                </div>
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

    const totalSteps = questions.length;
    const currentStep = currentQuestionIndex + 1;

    const showNextButton = currentQuestion && [questionTypes.MULTI_SELECT, questionTypes.WEIGHT, questionTypes.AGE, questionTypes.SLEEP_DURATION_GOAL].includes(currentQuestion.type);

    useEffect(() => {
        if (currentQuestion && [questionTypes.EDUCATION, questionTypes.FUTURE].includes(currentQuestion.type)) {
            const timer = setTimeout(() => handleNext(), 5000); // 5 seconds delay
            return () => clearTimeout(timer);
        }
    }, [currentQuestionIndex, currentQuestion]);

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

            {showNextButton && (
                <div className="p-4 border-t border-gray-200">
                    <button
                        onClick={handleNext}
                        disabled={isNextDisabled || !formData[currentQuestion.key]}
                        className={`w-full bg-blue-500 text-white py-4 rounded-lg font-semibold text-xl hover:bg-blue-600 active:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${clickedOption ? 'ring-2 ring-blue-300' : ''}`}
                    >
                        NEXT STEP
                    </button>
                </div>
            )}
        </div>
    );
};

export default BabySleepDevelopmentForm;