import { ChevronLeftIcon } from '@heroicons/react/16/solid';
import { Cog6ToothIcon, HomeIcon, LockClosedIcon, MusicalNoteIcon, UserIcon, UsersIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../redux/authSlice';

import api from '../api/axios';
import { NavSeparator } from './ui-elements';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async (e) => {
    e.preventDefault();

    await api.post('/account/token/revoke');

    dispatch(logout());

    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken')

    navigate('/login');
  };

  return (
    <div className={`relative ${isOpen ? 'w-64' : 'w-16'} bg-gray-800 text-white h-screen flex flex-col transition-all duration-300`}>
      <button
        className="absolute top-4 right-3 flex items-center justify-center bg-gray-700 rounded-full p-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <ChevronLeftIcon className={`w-6 h-6 ${isOpen ? 'transform rotate-0' : 'transform rotate-180'} transition-transform duration-300`} />
      </button>
      <div className="block px-0 py-6 flex-grow">
        <h2 className={`mt-6 pl-4 text-medium font-bold ${isOpen ? 'block' : 'hidden'}`}>Menu</h2>
        <nav className={`mt-6 ${isOpen ? 'pt-0' : 'pt-16'}`}>
          <NavLink
            to="/home"
            className={({ isActive }) =>
              isActive ? 'flex items-center py-2 px-4 bg-gray-700' : 'flex items-center py-2 px-4 hover:bg-gray-700'
            }
          >
            <HomeIcon className="w-6 h-6" />
            <span className={`ml-2 ${isOpen ? 'block' : 'hidden'}`}>Dashboard</span>
          </NavLink>
          <NavSeparator />
          <NavLink
            to="/songs"
            className={({ isActive }) =>
              isActive ? 'flex items-center py-2 px-4 bg-gray-700' : 'flex items-center py-2 px-4 hover:bg-gray-700'
            }
          >
            <MusicalNoteIcon className="w-6 h-6" />
            <span className={`ml-2 ${isOpen ? 'block' : 'hidden'}`}>Songs</span>
          </NavLink>
          <NavLink
            to="/users"
            className={({ isActive }) =>
              isActive ? 'flex items-center py-2 px-4 bg-gray-700' : 'flex items-center py-2 px-4 hover:bg-gray-700'
            }
          >
            <UsersIcon className="w-6 h-6" />
            <span className={`ml-2 ${isOpen ? 'block' : 'hidden'}`}>Users</span>
          </NavLink>
        </nav>
      </div>
      <div className="px-0 pb-4">
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? 'flex items-center py-2 px-4 bg-gray-700' : 'flex items-center py-2 px-4 hover:bg-gray-700'
          }
        >
          <UserIcon className="w-6 h-6" />
          <span className={`ml-2 ${isOpen ? 'block' : 'hidden'}`}>Profile</span>
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive ? 'flex items-center py-2 px-4 bg-gray-700' : 'flex items-center py-2 px-4 hover:bg-gray-700'
          }
        >
          <Cog6ToothIcon className="w-6 h-6" />
          <span className={`ml-2 ${isOpen ? 'block' : 'hidden'}`}>Settings</span>
        </NavLink>
        <NavSeparator />
        <NavLink
          to="/login"
          onClick={handleLogout}
          className={({ isActive }) =>
            isActive ? 'flex items-center py-2 px-4 bg-gray-700' : 'flex items-center py-2 px-4 hover:bg-gray-700'
          }
        >
          <LockClosedIcon className="w-6 h-6" />
          <span className={`ml-2 ${isOpen ? 'block' : 'hidden'}`}>Log Out</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
