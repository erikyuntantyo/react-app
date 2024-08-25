import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { Main, PrivateRoute, SignIn, SignUp } from './components';
import { DashboardPage } from './components/dashboard';
import { SongsList, SongEditor } from './components/songs';
import { UsersList } from './components/users';
import { ProfileEditor } from './components/profile';
import { SettingsEditor } from './components/settings';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Main />
            </PrivateRoute>
          }
        >
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<DashboardPage />} />
          <Route path="/songs" element={<SongsList />} />
          <Route path="/songs/create" element={<SongEditor />} />
          <Route path="/songs/edit/:id" element={<SongEditor />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/profile" element={<ProfileEditor />} />
          <Route path="/settings" element={<SettingsEditor />} />
          <Route path="" element={<Navigate to="/home" />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

export default App;
