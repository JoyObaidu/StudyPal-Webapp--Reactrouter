import React, { useState, useEffect } from 'react';
import BottomNav from '../components/Navbar';
import Button from '../components/Button';

const Pomodoro = () => {
  const [secondsLeft, setSecondsLeft] = useState(1500); // 25 minutes
  const [active, setActive] = useState(false);
  const [taskDescription, setTaskDescription] = useState('');

  // Load saved task on mount
  useEffect(() => {
    const savedTask = localStorage.getItem('pomodoroTask') || '';
    setTaskDescription(savedTask);
  }, []);

  // Save task to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('pomodoroTask', taskDescription);
  }, [taskDescription]);

  // Timer logic
  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [active]);

  const resetTimer = () => {
    setActive(false);
    setSecondsLeft(1500);
  };

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
  const seconds = String(secondsLeft % 60).padStart(2, '0');

  return (
    <div className="min-h-screen pb-24 bg-gradient-to-b from-purple-50 to-purple-200 flex flex-col items-center px-4">
      <Button />

      {/* Header */}
      <h1 className="text-3xl font-bold text-purple-800 mt-8 mb-6">Pomodoro Timer</h1>

      {/* Timer Display */}
      <div className="text-7xl font-mono text-purple-900 mb-8 rounded-lg px-8 py-6 bg-white shadow-lg border border-purple-300">
        {minutes}:{seconds}
      </div>

      {/* Task Description */}
      <textarea
        name="text"
        id="textarea"
        placeholder="Enter what you want to do..."
        cols="10"
        rows="2"
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        className="w-full max-w-md p-4 text-purple-950 bg-white border border-purple-300 rounded-lg shadow-sm mb-6 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
      />

      {/* Controls */}
      <div className="flex gap-4 mb-10">
        <button
          onClick={() => setActive(!active)}
          className="bg-purple-700 hover:bg-purple-800 text-white font-semibold px-6 py-2 rounded-lg shadow transition"
        >
          {active ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={resetTimer}
          className="bg-white border border-purple-400 text-purple-700 font-semibold px-6 py-2 rounded-lg shadow hover:bg-purple-50 transition"
        >
          Reset
        </button>
      </div>

      <BottomNav />
    </div>
  );
};

export default Pomodoro;
