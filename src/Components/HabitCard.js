import React, { useEffect, useState } from 'react';
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { deleteHabit } from '../Slices/habitSlice';

function HabitCard({ habit }) {
    const dispatch = useDispatch();
    const { title, description, details } = habit;
    const [doneCount, setDoneCount] = useState(0);
    const [failCount, setFailCount] = useState(0);
    const [noActionCount, setNoActionCount] = useState(0);
    const [percentage, setPercentage] = useState('0%');

    const deleteHandler = () => dispatch(deleteHabit(title));

    useEffect(() => {
        const counts = details.reduce((acc, { status }) => {
            acc[status === 'done' ? 'done' : status === 'fail' ? 'fail' : 'noAction']++;
            return acc;
        }, { done: 0, fail: 0, noAction: 0 });

        setDoneCount(counts.done);
        setFailCount(counts.fail);
        setNoActionCount(counts.noAction);
        const total = details.length || 1; 
        setPercentage(`${Math.round((counts.done / total) * 100)}%`);
    }, [details]);

    return (
        <div className="m-2 border text-white border-slate-200 rounded-lg hover:shadow-md hover:scale-105">
            <h2 className="mx-2 text-2xl mb-2">{title}
                <button onClick={deleteHandler} className="text-red-700 text-lg px-2 float-right">
                    <FaTrashAlt />
                </button>
            </h2>
            <div className='p-2 italic'>{description}</div>
            <hr className='my-1 mx-2' />
            <div className="p-2 flex justify-between text-xs">
                <span>Done: {doneCount} days</span>
                <span>No Action: {noActionCount} days</span>
                <span>Fail: {failCount} days</span>
            </div>
            <div className="my-1 mx-2 h-2 bg-blue-200 rounded-full">
                <div style={{ width: percentage }} className="h-full text-sm text-black bg-blue-600 rounded-full"></div>
            </div>
        </div>
    );
}

export default HabitCard;
