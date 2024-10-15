import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Moon, Cake } from 'lucide-react';

const BabySleepImprovementPrediction = () => {
    const sampleData = [
        { week: 'Week 1', sleepHours: 6 },
        { week: 'Week 2', sleepHours: 7 },
        { week: 'Week 3', sleepHours: 8 },
        { week: 'Week 4', sleepHours: 9 },
        { week: 'Week 5', sleepHours: 10 },
        { week: 'Week 6', sleepHours: 12 },
    ];

    const [lineColor, setLineColor] = useState('#FF0000');

    useEffect(() => {
        let colorTransition = setInterval(() => {
            setLineColor((prevColor) => {
                const r = parseInt(prevColor.slice(1, 3), 16);
                const g = parseInt(prevColor.slice(3, 5), 16);
                const b = parseInt(prevColor.slice(5, 7), 16);

                const newR = r > 0 ? r - 8 : 0;
                const newG = g < 255 ? g + 8 : 255;

                const newColor = `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
                return newColor;
            });
        }, 100);

        return () => clearInterval(colorTransition);
    }, []);

    return (
        <div className="max-w-md mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-4">Your Baby's Sleep Improvement Journey</h1>
            <p className="text-center text-gray-600 mb-4">
                We predict your baby will sleep through the night by Week 4
            </p>
            <div className="bg-white p-3 rounded-lg mb-4 flex items-center justify-center">
                <Moon className="text-blue-500 w-5 h-5 mr-2" />
                <span className="text-lg">Just in time for a good night's sleep!</span>
                <Cake className="text-purple-500 w-5 h-5 ml-2" />
            </div>

            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={sampleData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="week" />
                        <YAxis label={{ value: 'Sleep Hours', angle: -90, position: 'insideLeft' }} />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="sleepHours"
                            stroke={lineColor}
                            strokeWidth={2}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-4 text-sm text-gray-500">
                *Based on data from babies with similar sleep patterns. Results may vary. Always consult with your pediatrician.
            </div>
        </div>
    );
};

export default BabySleepImprovementPrediction;