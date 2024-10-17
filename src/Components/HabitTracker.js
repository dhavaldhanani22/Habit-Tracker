import React, { useState } from 'react';
import { FaPlusCircle, FaTrashAlt } from "react-icons/fa";

const HabitTracker = () => {
    const [habits, setHabits] = useState([]);
    const [formData, setFormData] = useState({ name: '', goal: '', startDate: '', frequency: 'daily' });
    const handleChange = ({ target: { name, value } }) => setFormData({ ...formData, [name]: value });
    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.name && formData.goal && formData.startDate) {
            setHabits([...habits, formData]);
            setFormData({ name: '', goal: '', startDate: '', frequency: 'daily' });
        }
    };
    const handleDelete = (index) => setHabits(habits.filter((_, i) => i !== index));
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
    <h1 className="text-2xl font-bold mb-4">Habit Tracker</h1>
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded shadow-lg w-80">
        {['name', 'goal', 'startDate'].map(field => (
            <div className="mb-4" key={field}>
                <label className="block text-sm mb-2">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <input
                    type={field === 'goal' ? 'number' : field === 'startDate' ? 'date' : 'text'}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-gray-700 text-white"
                    required
                    min={field === 'goal' ? "1" : undefined}
                />
            </div>
        ))}
        <select name="frequency" value={formData.frequency} onChange={handleChange} className="mb-4 w-full p-2 rounded bg-gray-700 text-white">
            {['daily', 'weekly', 'monthly'].map(freq => (
                <option key={freq} value={freq}>{freq.charAt(0).toUpperCase() + freq.slice(1)}</option>
            ))}
        </select>
        <button type="submit" className="w-full p-2 bg-blue-600 rounded flex items-center justify-center gap-2">
            <FaPlusCircle /> Add Habit
        </button>
    </form>
    <div className="mt-8 w-80">
        <h2 className="text-xl font-semibold mb-4">Habits List</h2>
        {habits.length ? (
            <ul className="space-y-2">
                {habits.map((habit, index) => (
                    <li key={index} className="bg-gray-800 p-4 rounded shadow-lg flex justify-between items-center">
                        <div>
                            <h3 className="text-lg font-bold">{habit.name}</h3>
                            <p>Goal: {habit.goal}</p>
                            <p>Start Date: {habit.startDate}</p>
                            <p>Frequency: {habit.frequency}</p>
                        </div>
                        <button onClick={() => handleDelete(index)} className="text-red-600">
                            <FaTrashAlt />
                        </button>
                    </li>
                ))}
            </ul>
        ) : (
            <p className="text-gray-400">No habits added yet.</p>
        )}
    </div>
</div>
    );
};

export default HabitTracker;
