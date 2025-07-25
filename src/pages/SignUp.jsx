import React, { useState } from 'react';
import { auth, googleProvider } from '../firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import googleImg from '../assets/icons8-google.svg'; 

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(true);
  const navigate = useNavigate();

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
      console.error(error.message);
      alert(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      console.log('User signed in with Google!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Google sign-in error:', error.message);
      alert('Google sign-in failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-purple-800 mb-6">
          {isSignUp ? 'Create an account' : 'Welcome back'}
        </h2>

        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label className="block text-purple-800 font-semibold">Email</label>
            <input
              type="email"
              className="w-full p-2 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-purple-800 font-semibold">Password</label>
            <input
              type="password"
              className="w-full p-2 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-800 text-white py-2 rounded hover:bg-purple-700 transition"
          >
            {isSignUp ? 'Sign Up' : ''}
          </button>
        </form>

        <div className="my-4 text-center text-gray-500">OR</div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="flex w-full items-center justify-center border py-2 rounded bg-white hover:bg-gray-100 transition"
        >
          <img src={googleImg} alt="Google logo" className="w-5 h-5 mr-2" />
          {isSignUp ? 'Sign Up with Google' : 'Log in with Google'}
        </button>

        <p className="mt-4 text-sm text-center text-gray-600">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            className="text-purple-700 font-semibold hover:underline"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? ' here' : 'Sign up here'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
