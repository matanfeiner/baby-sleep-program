import React, { useState } from 'react';
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


const BabySleepDevelopmentForm = ({ onSubmit }) => {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({});

    const handleNext = () => {
        if (step < questions.length - 1) {
            setStep(step + 1);
        } else {
            onSubmit(formData);
        }
    };
    const handlePrevious = () => setStep(step - 1);

    const updateFormData = (key, value, type) => {
        if (type === "multiSelect") {
            const currentSelections = formData[key] || [];
            const updatedSelections = currentSelections.includes(value)
                ? currentSelections.filter(item => item !== value)
                : [...currentSelections, value];
            setFormData({ ...formData, [key]: updatedSelections });
        } else {
            setFormData({ ...formData, [key]: value });
        }
    };

    const questions = [
        {
            question: "How many times do you wake up for your little one at night?",
            type: "clickable",
            options: ["0-1", "2-3", "4-5", "6+"],
            key: "nightWakings"
        },
        {
            content: "Consistent bedtime routines can reduce night wakings by up to 37% in infants.",
            type: "education",
            image: "/api/placeholder/300/200"
        },
        {
            question: "Are you willing to invest 15 minutes daily to improve your little sleeper's rest?",
            type: "clickable",
            options: ["Absolutely!", "I'll try my best", "I'm not sure"],
            key: "timeCommitment"
        },
        {
            question: "How old is your bundle of joy?",
            type: "clickable",
            options: ["0-3 months", "4-6 months", "7-12 months", "1-2 years", "2-3 years", "3+ years"],
            key: "childAge"
        },
        {
            question: "Have you tried the Montessori method with your little one?",
            type: "clickable",
            options: ["Yes", "No", "I'm not familiar with it"],
            key: "montessoriMethod"
        },
        {
            content: "Montessori sleep routines focus on creating a safe, accessible sleep environment for your little one.",
            type: "education",
            image: "/api/placeholder/300/200"
        },
        {
            question: "Was your little one born full-term?",
            type: "clickable",
            options: ["Yes, full-term (37-42 weeks)", "No, premature (before 37 weeks)", "No, post-term (after 42 weeks)", "Unsure"],
            key: "birthTerm"
        },
        {
            question: "What else do you hope to achieve with this plan for your youngster?",
            type: "multiSelect",
            options: ["Better sleep routine", "Improved nutrition", "Developmental milestones", "Behavior management"],
            key: "goals"
        },
        {
            question: "Can you commit to following the program for your little dreamer for at least 21 days?",
            type: "clickable",
            options: ["Yes, I'm all in", "I'll give it a shot", "I need more information"],
            key: "programCommitment"
        },
        {
            question: "How happy is your little one in the evening?",
            type: "clickable",
            options: ["Very happy", "Somewhat happy", "Neutral", "Somewhat unhappy", "Very unhappy"],
            key: "eveningMood"
        },
        {
            question: "Which aspect of your youngster's development concerns you the most?",
            type: "clickable",
            options: ["Sleep", "Feeding", "Motor skills", "Language", "Social skills", "None"],
            key: "developmentConcern"
        },
        {
            content: "Quality sleep boosts cognitive development, emotional regulation, and physical growth in infants and toddlers.",
            type: "education",
            image: "/api/placeholder/300/200"
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
            question: "Where does your bundle of joy sleep?",
            type: "clickable",
            options: ["In a bed", "In a crib", "In a stroller", "Other"],
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
            image: "/api/placeholder/300/200"
        },
        {
            question: "How does your little dreamer typically fall asleep?",
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
            question: "Where does your little sleeper rest at night?",
            type: "clickable",
            options: ["In their own crib/bed in a separate room", "In a crib/bed in parents' room", "Co-sleeping with parent(s)", "Combination of above"],
            key: "nightSleepLocation"
        },
        {
            question: "Do you use any sleep aids for your bundle of joy?",
            type: "multiSelect",
            options: ["White noise machine", "Pacifier", "Swaddle or sleep sack", "Comfort object (stuffed animal, blanket)", "None"],
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
            image: "/api/placeholder/300/200"
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
            question: "Has your little one started eating solids?",
            type: "clickable",
            options: ["Yes", "No", "Just starting"],
            key: "solidFoods"
        },
        {
            question: "Does your bundle of joy fall asleep while feeding?",
            type: "clickable",
            options: ["Always", "Often", "Sometimes", "Rarely", "Never"],
            key: "sleepWhileFeeding"
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
            question: "Does your bundle of joy suffer from colic?",
            type: "clickable",
            options: ["Yes", "No", "Unsure"],
            key: "colic"
        },
        {
            question: "Does your little one suffer from reflux?",
            type: "clickable",
            options: ["Yes", "No", "Unsure"],
            key: "reflux"
        },
        {
            question: "Does your youngster suffer from constipation or diarrhea?",
            type: "clickable",
            options: ["Constipation", "Diarrhea", "Both", "Neither"],
            key: "digestiveIssues"
        },
        {
            question: "Does your little dreamer suffer from skin rash?",
            type: "clickable",
            options: ["Yes", "No", "Occasionally"],
            key: "skinRash"
        },
        {
            content: "Health issues can impact sleep. Our program considers these factors for a holistic approach.",
            type: "education",
            image: "/api/placeholder/300/200"
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
            question: "What are your bundle of joy's sleep cycles?",
            type: "multiSelect",
            options: ["Morning nap", "Afternoon nap", "Evening nap", "Night sleep"],
            key: "sleepCycles"
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
            image: "/api/placeholder/300/200"
        },
        {
            question: "How would you describe your youngster's typical sleep pattern?",
            type: "clickable",
            options: ["Consistent", "Somewhat consistent", "Inconsistent", "Very irregular"],
            key: "sleepPattern"
        },
        {
            question: "Do you have other children besides your little one?",
            type: "clickable",
            options: ["Yes, 1 other child", "Yes, 2 or more children", "No, this is our first", "Expecting another"],
            key: "otherChildren"
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
            question: "Does your little one have any food allergies or dietary restrictions?",
            type: "clickable",
            options: ["Yes", "No", "Suspected but not confirmed"],
            key: "foodAllergies"
        },
        {
            question: "Have you tried any sleep training methods for your bundle of joy before?",
            type: "clickable",
            options: ["Yes", "No", "Not sure"],
            key: "previousSleepTraining"
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
            question: "Have any of the following life events impacted your family's sleep routine in the last year?",
            type: "multiSelect",
            options: [
                "New baby or adoption",
                "Moving to a new home",
                "Change in work schedule",
                "Family illness or medical issue",
                "Travel or vacation",
                "None of the above"
            ],
            key: "lifeEvents"
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
            image: "/api/placeholder/300/200"
        },
        {
            content: "Imagine your bundle of joy hitting milestones easily, thanks to quality sleep. You've got this!",
            type: "future",
            image: "/api/placeholder/300/200"
        },
        {
            content: "You're almost there! Your commitment to this process is admirable. Remember, consistency is key in establishing healthy sleep habits. Let's work together to give your child the gift of great sleep!",
            type: "education",
            image: "/api/placeholder/300/200"
        },
        {
            question: "What is your goal for your baby's total sleep duration in a 24-hour period?",
            type: "sleepDurationGoal",
            key: "sleepGoal"
        }
    ];

    const renderIcon = (option) => {

        switch (option) {

            case "Sensitive back": return <AlertCircle />;

            case "Sensitive knees": return <AlertCircle />;

            case "Almost every day": return <Sun />;

            case "Several times per week": return <Moon />;

            case "Several times per month": return <Coffee />;

            case "Never": return <X />;

            case "Breastfed": return <Heart />;

            case "Formula-fed": return <Battery />;

            case "Solid foods": return <Apple />;

            case "0-1 times": return <Moon />;

            case "2-3 times": return <Moon />;

            case "4-5 times": return <Moon />;

            case "6+ times": return <Moon />;

            case "Less than 6 hours": return <Clock />;

            case "6-8 hours": return <Clock />;

            case "8-10 hours": return <Clock />;

            case "10-12 hours": return <Clock />;

            case "More than 12 hours": return <Clock />;

            case "0-3 months": return <Calendar />;

            case "4-6 months": return <Calendar />;

            case "7-12 months": return <Calendar />;

            case "1-2 years": return <Calendar />;

            case "2-3 years": return <Calendar />;

            case "3+ years": return <Calendar />;

            default: return null;

        }

    };

        const renderQuestion = (q) => {
        if (!q) return null; // Add this check to prevent errors when q is undefined
        switch (q.type) {
            case "clickable":
                return (
                    <div className="space-y-2">
                        {q.options.map((option) => (
                            <button
                                key={option}
                                onClick={() => {
                                    updateFormData(q.key, option, q.type);
                                    handleNext();
                                }}
                                className="w-full p-3 text-left bg-white rounded-lg shadow hover:bg-gray-50 transition-colors flex items-center justify-between"
                            >
                                <span>{option}</span>
                                <div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
                            </button>
                        ))}
                    </div>
                );
            case "multiSelect":
                return (
                    <div className="space-y-2">
                        {q.options.map((option) => (
                            <label key={option} className="flex items-center justify-between p-3 bg-white rounded-lg shadow w-full">
                                <span>{option}</span>
                                <input
                                    type="checkbox"
                                    value={option}
                                    checked={(formData[q.key] || []).includes(option)}
                                    onChange={() => updateFormData(q.key, option, q.type)}
                                    className="form-checkbox h-6 w-6 text-blue-600 rounded-full"
                                />
                            </label>
                        ))}
                    </div>
                );
            case 'weight':
                return (
                    <WeightInput
                        value={formData[q.key]?.weight}
                        onChange={(weight, unit) => updateFormData(q.key, { weight, unit })}
                        defaultUnit="lbs"
                    />
                );
            case 'age':
                return (
                    <AgeInput
                        value={formData[q.key]?.age}
                        onChange={(age, unit) => updateFormData(q.key, { age, unit })}
                    />
                );
            case 'sleepDurationGoal':
                return (
                    <SleepDurationGoalInput
                        value={formData[q.key]}
                        onChange={(value) => updateFormData(q.key, value)}
                    />
                );
            case "education":
            case "future":
                return (
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h3 className="text-xl font-semibold mb-4">{q.title}</h3>
                        <img src={q.image} alt="Educational content" className="w-full rounded mb-4" />
                        <p className="mb-4">{q.content}</p>
                    </div>
                );
            default:
                return null;
        }
    };

    const totalSteps = 5;
    const currentStep = Math.min(Math.floor((step / questions.length) * totalSteps) + 1, totalSteps);

    const showNextButton = ['multiSelect', 'education', 'future', 'weight', 'age', 'sleepDurationGoal'].includes(questions[step]?.type);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-pink-100 to-blue-100 p-4">
            <div className="w-full max-w-md flex flex-col min-h-[80vh]">
                <div className="flex-grow">
                    <div className="flex items-center mb-6">
                        {step > 0 && (
                            <button onClick={handlePrevious} className="p-2 rounded-full hover:bg-gray-200 transition-colors">
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                        )}
                        <Baby className="text-pink-500 w-8 h-8 mr-2" />
                        <h1 className="text-2xl font-bold text-blue-800 ml-4">Baby Sleep Program</h1>
                    </div>

                    <div className="mb-4 bg-white p-1 rounded-full">
                        <div className="flex">
                            {[...Array(totalSteps)].map((_, index) => (
                                <div
                                    key={index}
                                    className={`flex-1 h-1 rounded-full mx-0.5 ${
                                        index < currentStep ? 'bg-blue-500' : 'bg-gray-300'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="mb-6">
                        {questions[step]?.question && (
                            <h2 className="text-xl font-semibold mb-4 text-blue-800">{questions[step].question}</h2>
                        )}
                        {renderQuestion(questions[step])}
                    </div>
                </div>

                {showNextButton && (
                    <div className="mt-auto pb-[15%]">
                        <button
                            onClick={handleNext}
                            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold text-xl hover:bg-blue-600 transition-colors"
                        >
                            NEXT STEP
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BabySleepDevelopmentForm;