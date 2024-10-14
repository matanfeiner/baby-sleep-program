import React from 'react';
import {
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

export const questionTypes = {
    CLICKABLE: 'clickable',
    MULTI_SELECT: 'multiSelect',
    EDUCATION: 'education',
    FUTURE: 'future',
    WEIGHT: 'weight',
    AGE: 'age',
    SLEEP_DURATION_GOAL: 'sleepDurationGoal'
};

export const iconMap = {
    "Sensitive back": AlertCircle,
    "Sensitive knees": AlertCircle,
    "Almost every day": Sun,
    "Several times per week": Moon,
    "Several times per month": Coffee,
    "Never": X,
    "Breastfed": Heart,
    "Formula-fed": Battery,
    "Solid foods": Apple,
    "0-1 times": Moon,
    "2-3 times": Moon,
    "4-5 times": Moon,
    "6+ times": Moon,
    "Less than 6 hours": Clock,
    "6-8 hours": Clock,
    "8-10 hours": Clock,
    "10-12 hours": Clock,
    "More than 12 hours": Clock,
    "0-3 months": Calendar,
    "4-6 months": Calendar,
    "7-12 months": Calendar,
    "1-2 years": Calendar,
    "2-3 years": Calendar,
    "3+ years": Calendar
};

export const questions = [
    {
        id: 1,
        question: "How many times do you wake up for your baby at night?",
        type: "clickable",
        options: ["0", "1", "2", "3", "4+"],
        key: "nightWakings"
    },
    {
        id: 2,
        content: "Consistent bedtime routines can reduce night wakings by up to 37% in infants.",
        type: "education",
        image: sleepingBabyInCrib,
        alt: "Baby sleeping peacefully in a crib"
    },
    {
        id: 3,
        question: "Are you willing to invest 15 minutes daily to improve your little sleeper's rest?",
        type: "clickable",
        options: ["Absolutely!", "I'll try my best", "I'm not sure"],
        key: "timeCommitment"
    },
    {
        id: 4,
        question: "How old is your baby?",
        type: "clickable",
        options: ["0-3 months", "4-6 months", "7-12 months", "1-2 years", "2-3 years", "3+ years"],
        key: "childAge"
    },
    {
        id: 5,
        question: "Have you tried the Ferber-Montessori method with your little one?",
        type: "clickable",
        options: ["Yes", "No", "I'm not familiar with it"],
        key: "montessoriMethod"
    },
    {
        id: 6,
        content: "The Ferber-Montessori method is great for teaching babies to self-soothe gradually. You're going to find it very helpful!",
        type: "education",
        image: sleepingHappyBaby,
        alt: "Happy baby sleeping in a Montessori-style bed"
    },
    {
        id: 7,
        question: "Was your little one born full-term?",
        type: "clickable",
        options: ["Yes, full-term", "No, premature", "No, post-term", "Unsure"],
        key: "birthTerm"
    },
    {
        id: 8,
        question: "What else do you hope to achieve with this plan for your youngster?",
        type: "multiSelect",
        options: ["Improved nutrition", "Developmental milestones", "Behavior management", "Other"],
        key: "goals"
    },
    {
        id: 9,
        question: "Can you commit to following the program for your little dreamer for at least 21 days?",
        type: "clickable",
        options: ["Yes, I'm all in", "I'll give it a shot", "I need more information"],
        key: "programCommitment"
    },
    {
        id: 10,
        question: "Does your baby have any medical conditions or health concerns?",
        type: "clickable",
        options: ["Reflux or colic", "Allergies or intolerances", "Chronic health conditions", "None", "Other"],
        key: "medicalConditions"
    },
    {
        id: 11,
        question: "Which aspect of your youngster's development concerns you the most?",
        type: "clickable",
        options: ["Sleep", "Feeding", "Motor skills", "Language", "Social skills", "None", "All"],
        key: "developmentConcern"
    },
    {
        id: 12,
        content: "Quality sleep boosts cognitive development, emotional regulation, and physical growth in infants and toddlers.",
        type: "education",
        image: playingHappyBaby,
        alt: "Happy baby playing, demonstrating good development"
    },
    {
        id: 13,
        question: "Does your little one cry when getting to bed?",
        type: "clickable",
        options: ["Yes, often", "Sometimes", "Rarely", "Never"],
        key: "cryingAtBedtime"
    },
    {
        id: 14,
        question: "Are you open to adjusting your little sleeper's current routine?",
        type: "clickable",
        options: ["Definitely", "To some extent", "I'm hesitant"],
        key: "routineAdjustment"
    },
    {
        id: 15,
        question: "Where does your baby sleep at night?",
        type: "clickable",
        options: ["In their own crib", "Co-sleeping with parents", "Bassinet in parent’s room", "Rotates between different locations"],
        key: "sleepLocation"
    },
    {
        id: 16,
        question: "Does your little one use a pacifier?",
        type: "clickable",
        options: ["Yes", "No", "Sometimes"],
        key: "usePacifier"
    },
    {
        id: 17,
        content: "Pacifiers can reduce SIDS risk, but may affect dental development if used long-term.",
        type: "education",
        image: sittingHappyBaby,
        alt: "Baby sitting and playing with a pacifier"
    },
    {
        id: 18,
        question: "How does your little one typically fall asleep?",
        type: "clickable",
        options: ["Independently in crib/bed", "While feeding", "Being rocked or held", "With parent in room"],
        key: "fallingAsleepMethod"
    },
    {
        id: 19,
        question: "How many naps does your youngster take per day?",
        type: "clickable",
        options: ["1 nap", "2 naps", "3 or more naps", "No regular nap schedule"],
        key: "napsPerDay"
    },
    {
        id: 20,
        question: "How long does it take for your little one to fall asleep once put down?",
        type: "clickable",
        options: ["Less than 10 minutes", "10-30 minutes", "30-60 minutes", "More than an hour"],
        key: "timeToFallAsleep"
    },
    {
        id: 21,
        question: "Do you use any sleep aids for your bundle of joy?",
        type: "multiSelect",
        options: ["White noise machine", "Pacifier", "Swaddle or sleep sack", "Comfort object (stuffed animal, blanket)", "None"],
        key: "sleepAids"
    },
    {
        id: 22,
        question: "What is your current bedtime routine for your little dreamer?",
        type: "multiSelect",
        options: ["Bath", "Massage", "Reading a book", "Singing or lullabies", "Feeding", "No specific routine"],
        key: "bedtimeRoutine"
    },
    {
        id: 23,
        content: "A simple, consistent routine can lay the groundwork for better sleep habits.",
        type: "education",
        image: standingHappyBaby,
        alt: "Happy baby standing, ready for bedtime routine"
    },
    {
        id: 24,
        question: "How is your little one fed?",
        type: "multiSelect",
        options: ["Breastfed", "Formula-fed", "Combination of breast and formula", "Solid foods"],
        key: "feedingMethod"
    },
    {
        id: 25,
        question: "How often does your youngster feed at night?",
        type: "clickable",
        options: ["0 times", "1-2 times", "3-4 times", "5 or more times"],
        key: "nightFeedings"
    },
    {
        id: 26,
        question: "What is the room like where your little dreamer sleeps?",
        type: "multiSelect",
        options: ["Dark", "Bright", "Quiet", "Cool temperature", "Warm temperature", "Noisy"],
        key: "sleepEnvironment"
    },
    {
        id: 27,
        question: "Do you use blackout curtains or control light exposure for your little one?",
        type: "clickable",
        options: ["Yes, we use blackout curtains", "Yes, we control light exposure", "No, we don't control light"],
        key: "lightControl"
    },
    {
        id: 28,
        question: "Is your youngster's sleep space shared with others?",
        type: "clickable",
        options: ["No, has own room", "Yes, shared with parents", "Yes, shared with siblings", "Yes, shared with multiple family members"],
        key: "sharedSleepSpace"
    },
    {
        id: 29,
        question: "How much screen time does your little one have each day?",
        type: "clickable",
        options: ["No screen time", "Less than 1 hour", "1-2 hours", "More than 2 hours"],
        key: "screenTime"
    },
    {
        id: 30,
        question: "What is your little one's current weight pattern?",
        type: "clickable",
        options: ["Following typical growth curve", "Underweight for age", "Overweight for age", "Unsure"],
        key: "weightPattern"
    },
    {
        id: 31,
        question: "When do you most often engage in activities with your youngster?",
        type: "clickable",
        options: ["Morning", "Afternoon", "Evening", "Throughout the day"],
        key: "activityTime"
    },
    {
        id: 32,
        question: "How many siblings does your little one have?",
        type: "clickable",
        options: ["0", "1", "2", "3 or more"],
        key: "siblings"
    },
    {
        id: 33,
        question: "How many hours does your little dreamer sleep on an average night?",
        type: "clickable",
        options: ["Less than 6", "6-8", "8-10", "10-12", "More than 12"],
        key: "sleepHours"
    },
    {
        id: 34,
        content: "Imagine your little one sleeping through the night, and you waking up refreshed!",
        type: "future",
        image: sleepingHappyBaby,
        alt: "Peaceful sleeping baby"
    },
    {
        id: 35,
        question: "Does anyone in the family have sleep issues?",
        type: "multiSelect",
        options: ["Parent(s) with sleep disorders", "Sibling(s) with sleep issues", "Both parents and siblings", "No known sleep issues"],
        key: "familySleepIssues"
    },
    {
        id: 36,
        question: "What is your family's typical daily routine?",
        type: "clickable",
        options: ["Structured, predictable routine", "Semi-structured, somewhat predictable", "Unstructured, no set routine", "Varies due to work or other factors"],
        key: "familyRoutine"
    },
    {
        id: 37,
        question: "Who handles your little sleeper's bedtime routine?",
        type: "clickable",
        options: ["Primarily one parent", "Both parents equally", "Shared with other family members", "Caregiver or nanny"],
        key: "sleepRoutineHandler"
    },
    {
        id: 38,
        question: "How many meals does your youngster eat per day?",
        type: "clickable",
        options: ["1-2", "3-4", "5-6", "More than 6"],
        key: "mealsPerDay"
    },
    {
        id: 39,
        question: "Which sleep training method(s) have you tried with your little dreamer?",
        type: "multiSelect",
        options: ["Cry It Out", "Ferber Method", "Chair Method", "Pick Up Put Down", "Gradual Withdrawal", "None"],
        key: "sleepTrainingMethods"
    },
    {
        id: 40,
        question: "What's your biggest concern about sleep training your little one?",
        type: "clickable",
        options: ["Crying", "Effect on attachment", "Consistency", "Time commitment", "No major concerns"],
        key: "sleepTrainingConcerns"
    },
    {
        id: 41,
        question: "How confident are you in your parenting regarding your youngster's development milestones?",
        type: "clickable",
        options: ["Very confident", "Somewhat confident", "Neutral", "Not very confident", "Not at all confident"],
        key: "parentingConfidence"
    },
    {
        id: 42,
        question: "Have there been any recent changes in your little one's life?",
        type: "multiSelect",
        options: ["New sibling", "Moving homes", "Starting daycare", "Illness", "Teething", "No major changes"],
        key: "recentLifeChanges"
    },
    {
        id: 43,
        question: "How has your bundle of joy's sleep affected your own well-being?",
        type: "clickable",
        options: ["Significantly impacted", "Moderately impacted", "Slightly impacted", "Not impacted"],
        key: "parentWellbeing"
    },
    {
        id: 44,
        question: "What are your goals for improving your little dreamer's sleep?",
        type: "multiSelect",
        options: ["Longer night sleep", "Fewer night wakings", "Easier bedtime routine", "More consistent naps", "Self-soothing skills"],
        key: "sleepGoals"
    },
    {
        id: 45,
        question: "Which of the following factors do you think contribute to your child's sleep challenges?",
        type: "multiSelect",
        options: [
            "Inconsistent bedtime routine",
            "Overstimulation before bed",
            "Hunger or discomfort",
            "Separation anxiety",
            "Noise or Light",
            "Not sure"
        ],
        key: "sleepChallengeFactors"
    },
    {
        id: 46,
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
        id: 47,
        question: "What is your baby's current weight?",
        type: "weight",
        key: "babyWeight"
    },
    {
        id: 48,
        question: "How old is your baby?",
        type: "age",
        key: "babyAge"
    },
    {
        id: 49,
        content: "Picture peaceful bedtimes and sweet dreams for your little one. It's possible!",
        type: "future",
        image: sleepingBabyInCrib,
        alt: "Baby sleeping peacefully in a crib at night"
    },
    {
        id: 50,
        question: "What is your goal for your baby's total sleep duration in a 24-hour period?",
        type: "sleepDurationGoal",
        key: "sleepGoal"
    }
];

export const getIconForOption = (option) => {
    const Icon = iconMap[option];
    return Icon ? <Icon /> : null;
};

export const getQuestionById = (id) => questions.find(q => q.id === id);
