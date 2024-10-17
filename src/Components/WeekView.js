import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaCheckCircle, FaTasks } from "react-icons/fa";
import { HiXCircle } from "react-icons/hi2";
import { changeStatus } from '../Slices/habitSlice';

function WeekView() {
  const { habits } = useSelector((state) => state.allHabits);
  const dispatch = useDispatch();

  const updateStatus = (title, day, status) => {
    dispatch(changeStatus({ title, details: [{ day, status }] }));
  };

  return (
    <div className="container mt-4">
      <div className="flex flex-col gap-5 items-center xl:items-start">
        {habits.map(({ title, description, details }) => (
          <div className='text-white w-4/5 border border-slate-200 rounded-lg p-4' key={title}>
            <div className='text-amber-800'>
              <FaTasks className='inline md:text-2xl text-xl' />
              <span className='font-bold mx-2 md:text-2xl text-xl'>{title}: </span>
              <span className='text-xl'>{description}</span>
            </div>
            <hr className='my-2' />
            <div className='flex flex-wrap justify-between'>
              {details.map(({ day, status }) => (
                <div className='flex flex-col items-center md:mx-5 mx-2' key={day}>
                  <p>{day}</p>
                  {status === 'none' && <FaCheckCircle onClick={() => updateStatus(title, day, 'done')} className='text-white' />}
                  {status === 'done' && <FaCheckCircle onClick={() => updateStatus(title, day, 'fail')} className='text-green-700' />}
                  {status === 'fail' && <HiXCircle onClick={() => updateStatus(title, day, 'none')} className='text-red-600' />}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeekView;
