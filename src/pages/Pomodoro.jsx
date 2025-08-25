import React, { useState, useEffect, useRef } from 'react';
import BottomNav from '../components/Navbar';
import Button from '../components/Button';
import headerImage from '../assets/POMODORO _ Okamoto Issen Graphic Design Co_,Ltd_ 1.png';
import alarmSound from '../assets/mixkit-alarm-digital-clock-beep-989.wav'; 
import Footer from '../components/Footer';

const Pomodoro = () => {
  const WORK_TIME = 1500; // 25 min
  const SHORT_BREAK = 300; // 5 min
  const LONG_BREAK = 900; // 15 min

  const [secondsLeft, setSecondsLeft] = useState(WORK_TIME);
  const [active, setActive] = useState(false);
  const [mode, setMode] = useState('work'); // work | short | long
  const [taskDescription, setTaskDescription] = useState('');
  const audioRef = useRef(null);

  // ✅ Restore saved task + timer state
  useEffect(() => {
    const savedTask = localStorage.getItem('pomodoroTask') || '';
    setTaskDescription(savedTask);

    const savedEndTime = localStorage.getItem('pomodoro_endTime');
    const savedMode = localStorage.getItem('pomodoro_mode');
    const savedIsRunning = localStorage.getItem('pomodoro_isRunning');
    const savedTimeLeft = localStorage.getItem('pomodoro_timeLeft');

    if (savedMode) setMode(savedMode);

    if (savedIsRunning === "true" && savedEndTime) {
      const remaining = Math.floor((savedEndTime - Date.now()) / 1000);
      setSecondsLeft(remaining > 0 ? remaining : 0);
      setActive(true);
    } else if (savedTimeLeft) {
      setSecondsLeft(Number(savedTimeLeft));
    }
  }, []);

  // ✅ Save task whenever it changes
  useEffect(() => {
    localStorage.setItem('pomodoroTask', taskDescription);
  }, [taskDescription]);

  // ✅ Timer logic with persistence
  useEffect(() => {
    if (!active) return;

    const interval = setInterval(() => {
      setSecondsLeft((s) => {
        if (s > 0) return s - 1;
        handleTimeEnd();
        return 0;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [active]);

  // ✅ Start/Pause timer with localStorage updates
  const toggleTimer = () => {
    if (!active) {
      const endTime = Date.now() + secondsLeft * 1000;
      localStorage.setItem("pomodoro_endTime", endTime);
      localStorage.setItem("pomodoro_mode", mode);
      localStorage.setItem("pomodoro_isRunning", true);
    } else {
      localStorage.setItem("pomodoro_timeLeft", secondsLeft);
      localStorage.setItem("pomodoro_isRunning", false);
    }
    setActive(!active);
  };

  const handleTimeEnd = () => {
    setActive(false);
    localStorage.setItem("pomodoro_isRunning", false);
    if (audioRef.current) audioRef.current.play();
  };

  const resetTimer = (newMode = mode) => {
    setActive(false);
    setMode(newMode);

    let newTime = WORK_TIME;
    if (newMode === 'short') newTime = SHORT_BREAK;
    if (newMode === 'long') newTime = LONG_BREAK;

    setSecondsLeft(newTime);
    localStorage.setItem("pomodoro_timeLeft", newTime);
    localStorage.setItem("pomodoro_mode", newMode);
    localStorage.setItem("pomodoro_isRunning", false);
  };

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
  const seconds = String(secondsLeft % 60).padStart(2, '0');

  return (
    <div className="min-h-screen pb-24 bg-gradient-to-b from-purple-50 to-purple-200 flex flex-col items-center px-4">
      <Button />
      <audio ref={audioRef} src={alarmSound} preload="auto" />

      {/* Header */}
      <img src={headerImage} alt="Pomodoro Timer" />

      {/* Timer Display */}
      <div className="text-7xl font-mono text-purple-900 mb-8 rounded-lg px-8 py-6 bg-white shadow-lg border border-purple-300">
        {minutes}:{seconds}
      </div>

      {/* Mode Buttons */}
      <div className="flex gap-3 mb-6">
        <button onClick={() => resetTimer('work')}
          className={`px-4 py-2 rounded-lg font-semibold ${mode === 'work' ? 'bg-purple-700 text-white' : 'bg-white border border-purple-400 text-purple-700'}`}>
          Work
        </button>
        <button onClick={() => resetTimer('short')}
          className={`px-4 py-2 rounded-lg font-semibold ${mode === 'short' ? 'bg-purple-700 text-white' : 'bg-white border border-purple-400 text-purple-700'}`}>
          Short Break
        </button>
        <button onClick={() => resetTimer('long')}
          className={`px-4 py-2 rounded-lg font-semibold ${mode === 'long' ? 'bg-purple-700 text-white' : 'bg-white border border-purple-400 text-purple-700'}`}>
          Long Break
        </button>
      </div>

      {/* Task Description */}
      <textarea
        name="text"
        placeholder="Enter what you want to do..."
        cols="10"
        rows="2"
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        className="w-full max-w-md p-4 text-purple-950 bg-white border border-purple-300 rounded-lg shadow-sm mb-6 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
      />
      <button type="submit" className='bg-purple-700 mb-5 flex align-self-end cursor-pointer text-white px-4 py-2 rounded-lg shadow hover:bg-purple-800 transition' onClick={() => alert('Task saved!')}>Save</button>

      {/* Controls */}
      <div className="flex gap-4 mb-10">
        <button onClick={toggleTimer}
          className="bg-purple-700 hover:bg-purple-800 cursor-pointer text-white font-semibold px-6 py-2 rounded-lg shadow transition">
          {active ? 'Pause' : 'Start'}
        </button>
        <button onClick={() => resetTimer(mode)}
          className="bg-white border cursor-pointer border-purple-400 text-purple-700 font-semibold px-6 py-2 rounded-lg shadow hover:bg-purple-50 transition">
          Reset
        </button>
      </div>

      <BottomNav />
    </div>
  );
};

export default Pomodoro;
