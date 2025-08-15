import React, { useState } from 'react';
import { auth, googleProvider } from '../firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import googleImg from '../assets/icons8-google.svg';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword((prev) => !prev);

  // Sign Up / Login handler
  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert('Account created successfully!');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert('Logged in successfully!');
      }
      navigate('/dashboard');
    } catch (error) {
      console.error('Firebase error:', error);
      alert(error.message);
    }
  };

  // Google Sign-in handler
  const handleGoogleSignIn = async () => {
    try {
      const provider = googleProvider;
      provider.setCustomParameters({
        prompt: 'select_account',
      });

      await signInWithPopup(auth, provider);
      console.log('User signed in with Google!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Auth Error Code:', error.code);
      console.error('Auth Error Message:', error.message);
      alert(error.message);
    }
  };

  // Forgot password handler
  const handleForgotPassword = async () => {
    if (!email) {
      alert('Please enter your email address first.');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert('Password reset email sent! Check your inbox.');
    } catch (error) {
      console.error('Error sending password reset email:', error);
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-300 via-purple-400 to-purple-500 px-4">
      <div className="w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-center text-purple-800 mb-6">
          {isSignUp ? 'Create an Account' : 'Welcome Back'}
        </h2>

        <form onSubmit={handleAuth} className="space-y-5">
          <div className="flex w-full justify-between items-center mb-4">
            <button
              type="button"
              className="text-purple-700 cursor-pointer font-semibold hover:underline"
              onClick={() => setIsSignUp(true)}
            >
              Sign Up
            </button>
            <button
              type="button"
              className="text-purple-700 cursor-pointer font-semibold hover:underline"
              onClick={() => setIsSignUp(false)}
            >
              Log in
            </button>
          </div>

          {/* Email */}
          <div>
            <label className="block text-black font-semibold mb-1">Your Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border bg-white text-black rounded-lg focus-ring-2 focus:ring-purple-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-black font-semibold mb-1 mt-2">Password</label>
            <div className="relative w-full">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none"
              />
              <span
                className="absolute right-3 top-3 text-white cursor-pointer"
                onClick={togglePassword}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {/* Forgot password - only show in login mode */}
            {!isSignUp && (
              <p
                onClick={handleForgotPassword}
                className="text-sm text-purple-700 hover:underline cursor-pointer mt-2"
              >
                Forgot Password?
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-700 hover:bg-purple-800 cursor-pointer text-white py-2 rounded-lg font-semibold transition"
          >
            {isSignUp ? 'Sign Up' : 'Continue'}
          </button>
        </form>

        <div className="my-4 text-center text-gray-500 font-medium">OR</div>

        {/* Google Auth */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="flex w-full items-center justify-center gap-2 border py-2 rounded-lg cursor-pointer bg-white hover:bg-purple-50 transition text-purple-700 font-semibold"
        >
          <img src={googleImg} alt="Google logo" className="w-5 h-5" />
          {isSignUp ? 'Sign Up with Google' : 'Login with Google'}
        </button>

        {/* Toggle between Sign Up and Login */}
        <p className="mt-4 flex gap-2 text-sm text-center text-black">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            className="text-purple-800 cursor-pointer font-semibold hover:underline"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? 'Login here' : 'Sign up here'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
