import React, { useState } from 'react';
import { HiMenu } from "react-icons/hi";
import { HiXMark } from "react-icons/hi2";
import logo from '../assets/logo.png';
import AddHabit from './AddHabit.js';
import { Link } from 'react-router-dom';

const Navbar = () => {
  let Links = [
    { name: "HOME", link: "/" },
    { name: "Week View", link: "/habits/week" }
  ];
  let [open, setOpen] = useState(false);
  let [showAddhabit, setShowAddHabit] = useState(false);
  return (
    <div className='shadow-md w-full sticky top-0 left-0'>
      <div className='md:flex items-center justify-between bg-white md:px-7 px-5'>
        <div className='font-bold text-2xl flex items-center gap-3'>
          <img src={logo} alt='logo' className='w-20 h-15 text-blue-600' />
          <span> Habits Track App</span>
      
          <div onClick={() => setOpen(!open)} className='cursor-pointer md:hidden w-7 h-7'>
            {
              open ? <HiXMark /> : <HiMenu />
            }
          </div>
        </div>
        <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full 
      md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-15' : 'top-[-490px]'}`}>
    {Links.map((link, index) => (
        <li key={index} className='md:ml-8 my-7 font-semibold'>
            <Link to={link.link}>
                <button onClick={() => setOpen(false)} className='text-gray-800 hover:text-blue-400 duration-500'>
                    {link.name}
                </button>
            </Link>
        </li>
    ))}
    <li>
        <button onClick={() => { setShowAddHabit(true); setOpen(false) }} 
            className='btn bg-blue-600 text-white md:ml-8 font-semibold px-3 py-1 rounded duration-500 md:static'>
            Add Habit
        </button>
    </li>
</ul>
      </div>
      <AddHabit show={showAddhabit} onClose={() => setShowAddHabit(false)} />
    </div>
  );
};

export default Navbar;