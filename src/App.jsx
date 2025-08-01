import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import Welcome from './pages/Welcome';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Editor from './pages/Editor';
import Pomodoro from './pages/Pomodoro';
import Notes from './pages/Notes';
import Chatbot from './pages/Chatbot';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import EditProfile from './pages/EditProfile';
import ChangePassword from './pages/ChangePassword';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/notes' element={<Notes/>} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/pomodoro" element={<Pomodoro />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/changepassword" element={<ChangePassword />} />

      </Routes>
    </BrowserRouter>
  );
}
