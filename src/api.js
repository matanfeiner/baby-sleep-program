// api.js

export async function fetchDashboardData(userId) {
    const response = await fetch(`/api/dashboard-data/${userId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch dashboard data');
    }
    const rawData = await response.json();
    return processDashboardData(rawData);
}

function processDashboardData(rawData) {
    return {
        babyMetrics: {
            sleepDuration: calculateAverageSleepDuration(rawData),
            sleepQuality: assessSleepQuality(rawData),
            development: assessDevelopment(rawData),
        },
        parentMetrics: {
            sleep: calculateParentSleepMetrics(rawData),
            stressLevel: assessStressLevel(rawData),
            selfCare: assessSelfCare(rawData),
        },
        dailyRhythm: {
            wakeTime: calculateAverageWakeTime(rawData),
            bedTime: calculateAverageBedTime(rawData),
        },
        insights: generateInsights(rawData),
    };
}

// Helper functions for calculations
function calculateAverageSleepDuration(rawData) {
    const avgDuration = rawData.sleepDurations.reduce((sum, duration) => sum + duration, 0) / rawData.sleepDurations.length;
    return {
        value: `${avgDuration.toFixed(1)} hours`,
        description: avgDuration >= 11 ? "Within recommended range" : "Below recommended range",
        reference: avgDuration >= 11 ? "Good" : "Low"
    };
}

function assessSleepQuality(rawData) {
    const quality = rawData.nightWakings <= 1 ? "Good" : rawData.nightWakings <= 3 ? "Fair" : "Poor";
    return {
        value: quality,
        description: `${4 - rawData.nightWakings} out of 4 sleep cycles completed`,
        reference: quality === "Good" ? "Good" : quality === "Fair" ? "Standard" : "Low"
    };
}

function assessDevelopment(rawData) {
    const milestonePercentage = (rawData.achievedMilestones / rawData.totalMilestones) * 100;
    return {
        value: milestonePercentage >= 90 ? "On Track" : "Needs Attention",
        description: `Meeting ${milestonePercentage.toFixed(0)}% of milestones`,
        reference: milestonePercentage >= 90 ? "Good" : "Standard"
    };
}

function calculateParentSleepMetrics(rawData) {
    const avgDuration = rawData.parentSleepDurations.reduce((sum, duration) => sum + duration, 0) / rawData.parentSleepDurations.length;
    return {
        value: `${avgDuration.toFixed(1)} hours`,
        description: avgDuration >= 7 ? "Within optimal range" : "Below optimal range",
        reference: avgDuration >= 7 ? "Good" : avgDuration >= 6 ? "Standard" : "Low"
    };
}

function assessStressLevel(rawData) {
    const stressScore = rawData.parentStressIndicators.reduce((sum, score) => sum + score, 0) / rawData.parentStressIndicators.length;
    let level, reference;
    if (stressScore <= 3) { level = "Low"; reference = "Good"; }
    else if (stressScore <= 6) { level = "Moderate"; reference = "Standard"; }
    else { level = "High"; reference = "Low"; }
    return {
        value: level,
        description: "Based on daily stress indicators",
        reference: reference
    };
}

function assessSelfCare(rawData) {
    const selfCareScore = rawData.parentSelfCareActivities.length;
    return {
        value: `${selfCareScore}/5 activities`,
        description: selfCareScore >= 3 ? "Good self-care routine" : "Try to increase self-care activities",
        reference: selfCareScore >= 3 ? "Good" : selfCareScore >= 2 ? "Standard" : "Low"
    };
}

function calculateAverageWakeTime(rawData) {
    // Implement logic to calculate average wake time
    return "7:00 AM"; // Placeholder
}

function calculateAverageBedTime(rawData) {
    // Implement logic to calculate average bedtime
    return "8:30 PM"; // Placeholder
}

function generateInsights(rawData) {
    const insights = [];
    if (rawData.sleepDurations[rawData.sleepDurations.length - 1] > rawData.sleepDurations[0]) {
        insights.push("Your baby's sleep pattern is improving. Keep up the consistent bedtime routine!");
    }
    if (rawData.parentSleepDurations[rawData.parentSleepDurations.length - 1] < 7) {
        insights.push("Consider going to bed 30 minutes earlier to increase your sleep duration.");
    }
    if (rawData.parentStressIndicators[rawData.parentStressIndicators.length - 1] > 5) {
        insights.push("Try incorporating a 10-minute meditation during your baby's morning nap for stress relief.");
    }
    return insights;
}