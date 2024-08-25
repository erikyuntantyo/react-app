import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Main = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Main;
