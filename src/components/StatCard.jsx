import React from 'react';

const StatCard = ({ icon, title, value, color }) => {
    const colors = { blue: 'from-blue-500 to-blue-600', green: 'from-green-500 to-green-600', red: 'from-red-500 to-red-600', purple: 'from-purple-500 to-purple-600' };
    return (
        <div className={`bg-gradient-to-r ${colors[color]} rounded-xl p-4 text-white shadow-lg`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="opacity-80">{title}</p>
                    <p className="text-2xl font-bold">{value}</p>
                </div>
                <div className="opacity-50">{icon}</div>
            </div>
        </div>
    );
};

export default StatCard;