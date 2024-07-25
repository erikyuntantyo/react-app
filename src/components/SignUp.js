import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { EnvelopeIcon, PlusIcon, KeyIcon } from '@heroicons/react/24/outline';
import api from '../api/axios';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await api.post('/users/register/', { email, password });
      window.location.href = '/login';
    } catch (error) {
      console.error('Sign up failed', error);
    }
  };

  return (
    <div className="bg-yellow-400 dark:bg-gray-800 h-screen overflow-hidden flex items-center justify-center">
      <div className="bg-white lg:w-6/12 md:7/12 w-8/12 shadow-3xl rounded-xl relative">
        <div className="bg-gray-800 shadow shadow-gray-200 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full p-2 md:p-4">
          <PlusIcon className="h-16 w-16 text-white" />
        </div>
        <form className="p-12 md:p-24" onSubmit={handleSubmit}>
          <div className="flex items-center text-lg mb-6 md:mb-8">
            <EnvelopeIcon className="absolute ml-3 w-6" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full"
              placeholder="Email"
            />
          </div>
          <div className="flex items-center text-lg mb-6 md:mb-8">
            <KeyIcon className="absolute ml-3 w-6" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full"
              placeholder="Password"
            />
          </div>
          <div className="flex items-center text-lg mb-6 md:mb-8">
            <KeyIcon className="absolute ml-3 w-6" />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full"
              placeholder="Confirm Password"
            />
          </div>
          <button
            type="submit"
            className="bg-gradient-to-b from-gray-700 to-gray-900 font-medium p-2 md:p-4 text-white uppercase w-full rounded"
          >
            Sign Up
          </button>
          <div className="md:mt-8 text-center">
            Already have an account? <Link to="/signin" className="underline">SIGN IN</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
