import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import {FaApple} from 'react-icons/fa';
import googleImg from '../assets/icons8-google.svg'; // Assuming you have a Google logo image


const Auth = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setError('');

    if (isSignUp) {
      // Simulate account creation → go to login
      setIsSignUp(false);
      setEmail('');
      setPassword('');
    } else {
      // Simulate login success → go to dashboard
      navigate('/dashboard');
    }
  };

  return (
    <div className="h-screen flex flex-col items-center px-4 text-black">
      {/* Logo */}
      <div className="flex flex-col items-center mb-2">
        <img src={logo} alt="STUDYPAL Logo" className="w-14 h-14 rounded-full mb-2" />
        <h3 className="text-xl font-bold text-purple-800">STUDYPAL</h3>
      </div>

      {/* Toggle Buttons */}
<div className="flex relative w-full justify-between mb-4">
  <button
    onClick={() => setIsSignUp(false)}
    className={`px-4 cursor-pointer py-2 rounded font-semibold transition border-b-2 ${
      !isSignUp
        ? 'border-purple-700 text-purple-700 hover:border-purple-900 bg-transparent hover:bg-transparent'
        : 'border-transparent text-purple-800 hover:border-purple-500 bg-transparent hover:bg-transparent'
    }`}
  >
    Login
  </button>
  <button
    onClick={() => setIsSignUp(true)}
    className={`px-6 py-2 rounded font-semibold transition border-b-2 cursor-pointer ${
      isSignUp
        ? 'border-purple-700 text-purple-700 hover:border-purple-900 bg-transparent hover:bg-transparent'
        : 'border-transparent text-purple-800 hover:border-purple-500 bg-transparent hover:bg-transparent'
    }`}
  >
    Sign Up
  </button>
</div>


      {/* Shared Form */}
      <form onSubmit={handleSubmit} className="p-6 w-full max-w-sm">
        <label className="flex text-sm font-bold mb-1">Email</label>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full cursor-pointer mb-2 px-3 py-2 border rounded bg-purple-50 focus:ring-2 focus:ring-purple-400 hover:border-purple-400"
        />

        <label className="flex text-sm font-bold mb-1">Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full cursor-pointer mb-2 px-3 py-2 border rounded bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-400 hover:border-purple-400"
        />

        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <button
          type="submit"
          className="mt-3 w-full cursor-pointer bg-purple-800 text-white py-2 rounded font-semibold hover:bg-purple-700 transition mb-4"
        >
          {isSignUp ? 'Create Account' : 'Continue'}
        </button>

        {/* Sign up options */}
        {isSignUp && (
          <>
            <button type="button" className="cursor-pointer mt-5 flex w-full items-center justify-center bg-white text-black py-2 rounded mb-3 border hover:bg-gray-100 transition">
              <FaApple className="mr-2 text-black" />Sign Up with Apple
            </button>
            <button type="button" className="cursor-pointer flex w-full items-center justify-center bg-white text-black border py-2 rounded hover:bg-gray-100 transition">
              <img src={googleImg} alt="google logo" className="w-5 h-5 mr-2" />Sign Up with Google
            </button>
          </>
        )}

        {/* Login extra options */}
        {!isSignUp && (
          <>
            <div className="text-right mb-2">
              <a href="#" className="text-xs cursor-pointer text-purple-600 hover:underline transition">Forgot Password?</a>
            </div>
            <div className="text-center text-sm text-gray-500 mb-4">or <hr /></div>
            <button type="button" className="flex cursor-pointer items-center justify-center w-full bg-white text-black py-2 rounded mb-3 border hover:bg-gray-100 transition">
              <FaApple className="mr-2 text-black" />Log in with Apple
            </button>
            <button type="button" className=" flex w-full items-center justify-center bg-white text-black border py-2 rounded hover:bg-gray-100 transition">
              <img src={googleImg} alt="google logo" className="w-5 h-5 mr-2" />Log in with Google
            </button>
          </>
        )}
      </form>

      <p className="mt-6 text-sm">
        {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-purple-600 cursor-pointer font-semibold hover:underline transition"
        >
          {isSignUp ? 'Login' : 'Sign Up'}
        </button>
      </p>
    </div>
  );
};

export default Auth;
