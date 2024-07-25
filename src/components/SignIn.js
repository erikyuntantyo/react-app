import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { EnvelopeIcon, KeyIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { loginStart, loginSuccess, loginFailure } from '../redux/authSlice';
import api from '../api/axios';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      const response = await api.post('/auth/login', { email, password });
      dispatch(loginSuccess(response.data));
      localStorage.setItem('token', response.data.token); // Save token to localStorage
    } catch (error) {
      dispatch(loginFailure(error.response.data));
    }
  };

  return (
    <div className="bg-yellow-400 dark:bg-gray-800 h-screen overflow-hidden flex items-center justify-center">
      <div className="bg-white lg:w-6/12 md:7/12 w-8/12 shadow-3xl rounded-xl">
        <div className="bg-gray-800 shadow shadow-gray-200 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full p-2 md:p-4">
          <LockClosedIcon className="h-16 w-16 text-white" />
        </div>
        <form className="p-12 md:p-24" onSubmit={handleSubmit}>
          <div className="flex items-center text-lg mb-6 md:mb-8">
            <EnvelopeIcon className="absolute ml-3 w-6" />
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full" placeholder="Email" />
          </div>
          <div className="flex items-center text-lg mb-6 md:mb-8">
            <KeyIcon className="absolute ml-3 w-6" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full"
              placeholder="Password" />
          </div>
          <button
            type="submit"
            className="bg-gradient-to-b from-gray-700 to-gray-900 font-medium p-2 md:p-4 text-white uppercase w-full rounded">
            Login
          </button>
          <div className="md:mt-8 text-center">Don't have account? <Link className="font-semibold underline" to="/signup">SIGN UP</Link></div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
