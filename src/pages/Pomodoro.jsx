import React from 'react'
import { useState, useEffect } from 'react'


const Pomodoro = () => {
  const [secondsLeft, setSecondsLeft] = useState(1500); // 25 mins
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [active]);

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
  const seconds = String(secondsLeft % 60).padStart(2, '0');

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-primary text-white">
      <h1 className="text-4xl font-bold mb-4">Pomodoro Timer</h1>
      <div className="text-6xl font-mono mb-6">{minutes}:{seconds}</div>
      <button
        onClick={() => setActive(!active)}
        className="bg-white text-primary px-6 py-2 rounded font-bold hover:bg-gray-200"
      >
        {active ? 'Pause' : 'Start'}
      </button>
    </div>
  )
}

export default Pomodoro