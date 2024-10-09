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
// Import images
import crawlingBaby from '../assets/images/nadavfe_full_body_picture_of_crawling_baby_on_a_white_screen_4e6550ea-55e7-4f2a-8ee7-2aaff0ca6de2.png';
import playingHappyBaby from '../assets/images/nadavfe_full_body_picture_of_playing_happy_baby_on_a_white_scre_b8a00ff0-5e66-42e4-a7f8-2e749bcb5dcc.png';
import playingHappyBaby2 from '../assets/images/nadavfe_full_body_picture_of_playing_happy_baby_on_a_white_scre_d98ac995-c276-4a50-9e65-8fe703c723a8.png';
import sleepingHappyBaby from '../assets/images/nadavfe_full_body_picture_of_sleeping_happy_baby_on_a_white_scr_8610e1b7-6455-4588-89d2-162d36826742.png';
import standingHappyBaby from '../assets/images/nadavfe_full_body_picture_of_standing_happy_baby_on_a_white_scr_371213f7-5b4b-41f6-91da-b0977d346e40.png';
import standingHappyBaby2 from '../assets/images/nadavfe_full_body_picture_of_standing_happy_baby_on_a_white_scr_21039812-6052-4f3e-8906-660f7cfe0c6a.png';
import walkingHappyBaby from '../assets/images/nadavfe_full_body_picture_of_walking_happy_baby_on_a_white_scre_5070c7f5-831a-460c-90e5-9ee97748305c.png';
import walkingHappyBaby2 from '../assets/images/nadavfe_full_body_picture_of_walking_happy_baby_on_a_white_scre_739971d0-d52c-4856-b306-2776b5e5aec5.png';
import walkingHappyBaby3 from '../assets/images/nadavfe_full_body_picture_of_walking_happy_baby_on_a_white_scre_d732c37c-c7d1-4924-87b0-3c210e6b87d0.png';
import sleepingBabyInCrib from '../assets/images/nadavfe_picture_of_sleeping_baby_in_a_crib_on_a_white_screen_4e040b55-58be-4283-a5c6-81b903cd839b.png';
import sittingHappyBaby from '../assets/images/nadavfe_sitting_happy_baby_on_white_screen_1e1c64c1-68d8-41c5-919d-30ca0cee484c.png';

const BabySleepDevelopmentForm = ({ onSubmit }) => {
    const { formData, updateFormData } = useFormData();
    const [step, setStep] = useState(0);
    const [isNextDisabled, setIsNextDisabled] = useState(false);
    const [clickedOption, setClickedOption] = useState(null);
    const bottomRef = useRef(null);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
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

        if (type === "multiSelect") {
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
            if (type === "clickable") {
                handleNext();
            }
        }, 300);
    };

    const renderSleepQuestion = (q) => {
        if (!q) return null;
        switch (q.type) {
            case "clickable":
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
            case "multiSelect":
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
            case 'weight':
            case 'age':
            case 'sleepDurationGoal':
                return (
                    <div className="bg-white p-4 rounded-lg shadow">
                        {q.type === 'weight' && (
                            <WeightInput
                                value={formData[q.key]?.weight}
                                onChange={(weight, unit) => updateFormData({ [q.key]: { weight, unit } })}
                                defaultUnit="lbs"
                            />
                        )}
                        {q.type === 'age' && (
                            <AgeInput
                                value={formData[q.key]?.age}
                                onChange={(age, unit) => updateFormData({ [q.key]: { age, unit } })}
                            />
                        )}
                        {q.type === 'sleepDurationGoal' && (
                            <SleepDurationGoalInput
                                value={formData[q.key]}
                                onChange={(value) => updateFormData({ [q.key]: value })}
                            />
                        )}
                    </div>
                );
            case "education":
            case "future":
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
                                <Moon className="w-5 h-5 mr-2 pulse-icon text-blue-500" />
                                Baby Sleep Wisdom
                            </p>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    const questions = [
        {
            question: "How many times do you wake up for your baby at night?",
            type: "clickable",
            options: ["0", "2", "3", "4+"],
            key: "nightWakings"
        },
        {
            content: "Consistent bedtime routines can reduce night wakings by up to 37% in infants.",
            type: "education",
            image: sleepingBabyInCrib,
            alt: "Baby sleeping peacefully in a crib"
        },
        {
            question: "Are you willing to invest 15 minutes daily to improve your little sleeper's rest?",
            type: "clickable",
            options: ["Absolutely!", "I'll try my best", "I'm not sure"],
            key: "timeCommitment"
        },
        {
            question: "How old is your baby?",
            type: "clickable",
            options: ["0-3 months", "4-6 months", "7-12 months", "1-2 years", "2-3 years", "3+ years"],
            key: "childAge"
        },
        {
            question: "Have you tried the Ferber-Montessori method with your little one?",
            type: "clickable",
            options: ["Yes", "No", "I'm not familiar with it"],
            key: "montessoriMethod"
        },
        {
            content: "The Ferber method is great for teaching babies to self-soothe gradually. You're going to find it very helpful!",
            type: "education",
            image: sleepingHappyBaby,
            alt: "Happy baby sleeping in a Montessori-style bed"
        },
        {
            question: "Was your little one born full-term?",
            type: "clickable",
            options: ["Yes, full-term", "No, premature", "No, post-term", "Unsure"],
            key: "birthTerm"
        },
        {
            question: "What else do you hope to achieve with this plan for your youngster?",
            type: "multiSelect",
            options: ["Improved nutrition", "Developmental milestones", "Behavior management"],
            key: "goals"
        },
        {
            question: "Can you commit to following the program for your little dreamer for at least 21 days?",
            type: "clickable",
            options: ["Yes, I'm all in", "I'll give it a shot", "I need more information"],
            key: "programCommitment"
        },
        {
            question: "Does your baby have any medical conditions or health concerns?",
            type: "clickable",
            options: ["Reflux or colic", "Allergies or intolerances", "Chronic health conditions", "None", "Other"],
            key: "medicalConditions"
        },
        {
            question: "Which aspect of your youngster's development concerns you the most?",
            type: "clickable",
            options: ["Sleep", "Feeding", "Motor skills", "Language", "Social skills", "None", "All"],
            key: "developmentConcern"
        },
        {
            content: "Quality sleep boosts cognitive development, emotional regulation, and physical growth in infants and toddlers.",
            type: "education",
            image: playingHappyBaby,
            alt: "Happy baby playing, demonstrating good development"
        },
        {
            question: "Does your little one cry when getting to bed?",
            type: "clickable",
            options: ["Yes, often", "Sometimes", "Rarely", "Never"],
            key: "cryingAtBedtime"
        },
        {
            question: "Are you open to adjusting your little sleeper's current routine?",
            type: "clickable",
            options: ["Definitely", "To some extent", "I'm hesitant"],
            key: "routineAdjustment"
        },
        {
            question: "Where does your baby sleep at night?",
            type: "clickable",
            options: ["In their own crib", "Co-sleeping with parents", "Bassinet in parent’s room", "Rotates between different locations"],
            key: "sleepLocation"
        },
        {
            question: "Does your little one use a pacifier?",
            type: "clickable",
            options: ["Yes", "No", "Sometimes"],
            key: "usePacifier"
        },
        {
            content: "Pacifiers can reduce SIDS risk, but may affect dental development if used long-term.",
            type: "education",
            image: sittingHappyBaby,
            alt: "Baby sitting and playing with a pacifier"
        },
        {
            question: "How does your little one typically fall asleep?",
            type: "clickable",
            options: ["Independently in crib/bed", "While feeding", "Being rocked or held", "With parent in room"],
            key: "fallingAsleepMethod"
        },
        {
            question: "How many naps does your youngster take per day?",
            type: "clickable",
            options: ["1 nap", "2 naps", "3 or more naps", "No regular nap schedule"],
            key: "napsPerDay"
        },
        {
            question: "How long does it take for your little one to fall asleep once put down?",
            type: "clickable",
            options: ["Less than 10 minutes", "10-30 minutes", "30-60 minutes", "More than an hour"],
            key: "timeToFallAsleep"
        },
        {
            question: "Do you use any sleep aids for your bundle of joy?",
            type: "multiSelect",
            options: ["White noise machine", "Pacifier", "Swaddle or sleep sack", "Comfort object (stuffed animal, blanket)", "None", "All"],
            key: "sleepAids"
        },
        {
            question: "What is your current bedtime routine for your little dreamer?",
            type: "multiSelect",
            options: ["Bath", "Massage", "Reading a book", "Singing or lullabies", "Feeding", "No specific routine"],
            key: "bedtimeRoutine"
        },
        {
            content: "A simple, consistent routine can lay the groundwork for better sleep habits.",
            type: "education",
            image: standingHappyBaby,
            alt: "Happy baby standing, ready for bedtime routine"
        },
        {
            question: "How is your little one fed?",
            type: "multiSelect",
            options: ["Breastfed", "Formula-fed", "Combination of breast and formula", "Solid foods"],
            key: "feedingMethod"
        },
        {
            question: "How often does your youngster feed at night?",
            type: "clickable",
            options: ["0 times", "1-2 times", "3-4 times", "5 or more times"],
            key: "nightFeedings"
        },
        {
            question: "What is the room like where your little dreamer sleeps?",
            type: "multiSelect",
            options: ["Dark", "Quiet", "Cool temperature", "Warm temperature", "Noisy"],
            key: "sleepEnvironment"
        },
        {
            question: "Do you use blackout curtains or control light exposure for your little one?",
            type: "clickable",
            options: ["Yes, we use blackout curtains", "Yes, we control light exposure", "No, we don't control light"],
            key: "lightControl"
        },
        {
            question: "Is your youngster's sleep space shared with others?",
            type: "clickable",
            options: ["No, has own room", "Yes, shared with parents", "Yes, shared with siblings", "Yes, shared with multiple family members"],
            key: "sharedSleepSpace"
        },
        {
            question: "How much screen time does your little one have each day?",
            type: "clickable",
            options: ["No screen time", "Less than 1 hour", "1-2 hours", "More than 2 hours"],
            key: "screenTime"
        },
        {
            question: "What is your little one's current weight pattern?",
            type: "clickable",
            options: ["Following typical growth curve", "Underweight for age", "Overweight for age", "Unsure"],
            key: "weightPattern"
        },
        {
            question: "When do you most often engage in activities with your youngster?",
            type: "clickable",
            options: ["Morning", "Afternoon", "Evening", "Throughout the day"],
            key: "activityTime"
        },
        {
            question: "How many siblings does your little one have?",
            type: "clickable",
            options: ["0", "1", "2", "3 or more"],
            key: "siblings"
        },
        {
            question: "How many hours does your little dreamer sleep on an average night?",
            type: "clickable",
            options: ["Less than 6", "6-8", "8-10", "10-12", "More than 12"],
            key: "sleepHours"
        },
        {
            content: "Imagine your little one sleeping through the night, and you waking up refreshed!",
            type: "future",
            image: sleepingHappyBaby,
            alt: "Peaceful sleeping baby"
        },
        {
            question: "Does anyone in the family have sleep issues?",
            type: "multiSelect",
            options: ["Parent(s) with sleep disorders", "Sibling(s) with sleep issues", "Both parents and siblings", "No known sleep issues"],
            key: "familySleepIssues"
        },
        {
            question: "What is your family's typical daily routine?",
            type: "clickable",
            options: ["Structured, predictable routine", "Semi-structured, somewhat predictable", "Unstructured, no set routine", "Varies due to work or other factors"],
            key: "familyRoutine"
        },
        {
            question: "Who handles your little sleeper's bedtime routine?",
            type: "clickable",
            options: ["Primarily one parent", "Both parents equally", "Shared with other family members", "Caregiver or nanny"],
            key: "sleepRoutineHandler"
        },
        {
            question: "How many meals does your youngster eat per day?",
            type: "clickable",
            options: ["1-2", "3-4", "5-6", "More than 6"],
            key: "mealsPerDay"
        },
        {
            question: "Which sleep training method(s) have you tried with your little dreamer?",
            type: "multiSelect",
            options: ["Cry It Out", "Ferber Method", "Chair Method", "Pick Up Put Down", "Gradual Withdrawal", "None"],
            key: "sleepTrainingMethods"
        },
        {
            question: "What's your biggest concern about sleep training your little one?",
            type: "clickable",
            options: ["Crying", "Effect on attachment", "Consistency", "Time commitment", "No major concerns"],
            key: "sleepTrainingConcerns"
        },
        {
            question: "How confident are you in your parenting regarding your youngster's development milestones?",
            type: "clickable",
            options: ["Very confident", "Somewhat confident", "Neutral", "Not very confident", "Not at all confident"],
            key: "parentingConfidence"
        },
        {
            question: "Have there been any recent changes in your little one's life?",
            type: "multiSelect",
            options: ["New sibling", "Moving homes", "Starting daycare", "Illness", "Teething", "No major changes"],
            key: "recentLifeChanges"
        },
        {
            question: "How has your bundle of joy's sleep affected your own well-being?",
            type: "clickable",
            options: ["Significantly impacted", "Moderately impacted", "Slightly impacted", "Not impacted"],
            key: "parentWellbeing"
        },
        {
            question: "What are your goals for improving your little dreamer's sleep?",
            type: "multiSelect",
            options: ["Longer night sleep", "Fewer night wakings", "Easier bedtime routine", "More consistent naps", "Self-soothing skills"],
            key: "sleepGoals"
        },
        {
            question: "Which of the following factors do you think contribute to your child's sleep challenges?",
            type: "multiSelect",
            options: [
                "Inconsistent bedtime routine",
                "Overstimulation before bed",
                "Hunger or discomfort",
                "Separation anxiety",
                "Environmental factors (noise, light, temperature)",
                "Not sure"
            ],
            key: "sleepChallengeFactors"
        },
        {
            question: "What methods have you tried to improve your child's sleep?",
            type: "multiSelect",
            options: [
                "Sleep training",
                "Adjusting bedtime",
                "Creating a bedtime routine",
                "Using white noise or lullabies",
                "Modifying diet or feeding schedule",
                "Consulting a pediatrician",
                "None of the above"
            ],
            key: "previousMethods"
        },
        {
            question: "What is your baby's current weight?",
            type: "weight",
            key: "babyWeight"
        },
        {
            question: "How old is your baby?",
            type: "age",
            key: "babyAge"
        },
        {
            content: "Picture peaceful bedtimes and sweet dreams for your little one. It's possible!",
            type: "future",
            image: sleepingBabyInCrib,
            alt: "Baby sleeping peacefully in a crib at night"
        },
        {
            content: "Imagine your bundle of joy hitting milestones easily, thanks to quality sleep. You've got this!",
            type: "future",
            image: walkingHappyBaby,
            alt: "Happy baby taking first steps"
        },
        {
            question: "What is your goal for your baby's total sleep duration in a 24-hour period?",
            type: "sleepDurationGoal",
            key: "sleepGoal"
        }
    ];

    const renderIcon = (option) => {

        switch (option) {

            case "Sensitive back":
                return <AlertCircle/>;

            case "Sensitive knees":
                return <AlertCircle/>;

            case "Almost every day":
                return <Sun/>;

            case "Several times per week":
                return <Moon/>;

            case "Several times per month":
                return <Coffee/>;

            case "Never":
                return <X/>;

            case "Breastfed":
                return <Heart/>;

            case "Formula-fed":
                return <Battery/>;

            case "Solid foods":
                return <Apple/>;

            case "0-1 times":
                return <Moon/>;

            case "2-3 times":
                return <Moon/>;

            case "4-5 times":
                return <Moon/>;

            case "6+ times":
                return <Moon/>;

            case "Less than 6 hours":
                return <Clock/>;

            case "6-8 hours":
                return <Clock/>;

            case "8-10 hours":
                return <Clock/>;

            case "10-12 hours":
                return <Clock/>;

            case "More than 12 hours":
                return <Clock/>;

            case "0-3 months":
                return <Calendar/>;

            case "4-6 months":
                return <Calendar/>;

            case "7-12 months":
                return <Calendar/>;

            case "1-2 years":
                return <Calendar/>;

            case "2-3 years":
                return <Calendar/>;

            case "3+ years":
                return <Calendar/>;

            default:
                return null;

        }

    };
    const totalSteps = 5;
    const currentStep = Math.min(Math.floor((step / questions.length) * totalSteps) + 1, totalSteps);

    const showNextButton = ['multiSelect', 'weight', 'age', 'sleepDurationGoal', 'education', 'future'].includes(questions[step]?.type);

    return <div className="flex justify-center items-start min-h-screen bg-gradient-to-br from-pink-100 to-blue-100 p-0 overflow-hidden">
        <div className="w-full max-w-md flex flex-col h-screen bg-white shadow-lg">
            <div className="sticky top-0 bg-white z-10 pt-safe">
                <div className="px-4 py-2 shadow-sm">
                    <div className="flex items-center mb-2">
                        {step > 0 && <button onClick={handlePrevious}
                                    className="p-2 rounded-full hover:bg-gray-200 active:bg-gray-300 transition-colors">
                                <ChevronLeft className="w-6 h-6"/>
                            </button>}
                        <Baby className="text-pink-500 w-6 h-6 mr-2"/>
                        <h1 className="text-xl font-bold text-blue-800 ml-2">Baby Sleep Program</h1>
                    </div>
                    <div className="bg-gray-200 p-1 rounded-full">
                        <div className="flex">
                            {[...Array(totalSteps)].map((_, index) => <div
                                    key={index}
                                    className={`flex-1 h-1 rounded-full mx-0.5 ${
                                        index < currentStep ? 'bg-blue-500' : 'bg-gray-300'
                                    }`}
                                />)}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-grow overflow-y-auto">
                <div className="p-4">
                    <div className="mb-6">
                        {questions[step]?.question && <h2 className="text-lg font-semibold mb-4 text-blue-800">{questions[step].question}</h2>}
                        {renderSleepQuestion(questions[step])}
                    </div>
                    <div ref={bottomRef}/>
                </div>
            </div>

            {showNextButton && <div className="sticky bottom-0 bg-white p-4 border-t border-gray-200">
                    <button
                        onClick={handleNext}
                        disabled={isNextDisabled}
                        className={`w-full bg-blue-500 text-white py-4 rounded-lg font-semibold text-xl hover:bg-blue-600 active:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${clickedOption ? 'ring-2 ring-blue-300' : ''}`}
                    >
                        NEXT STEP
                    </button>
                </div>}
        </div>
    </div>;

}

export default BabySleepDevelopmentForm;