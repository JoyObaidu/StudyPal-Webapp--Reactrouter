import React, {useState} from 'react';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  if (email === 'admin@example.com' && password === '123456') {
      setError('');
      navigate('/dashboard');
    } else {
      setError('Invalid email or password');
    }
 

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-black">
      
      {/* Logo */}
      <div className="flex flex-col items-center mb-8">
        <img src={logo} alt="STUDYPAL Logo" className="w-16 h-16 rounded-full mb-2" />
        <h2 className="text-2xl font-bold text-purple-800">STUDYPAL</h2>
      </div>

      {/* Toggle Buttons */}
      <div className="flex space-x-4 mb-6">
        <button className=" text-white px-6 py-2 rounded font-semibold shadow">
          Login
        </button>
        <button className=" text-purple-800 px-6 py-2 rounded font-semibold border border-purple-800">
          Sign Up
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleLogin} className="p-6 w-full max-w-sm">
        <label className="flex text-sm font-bold mb-1">Your Email</label>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-3 py-2 border rounded bg-purple-50 focus:ring-2 focus:ring-purple-400"
        />

        <label className="flex text-sm font-bold mb-1">Your Password</label>
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-2 px-3 py-2 border rounded bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        <div className="text-right mb-4">
          <a href="#" className="text-xs text-purple-600 hover:underline">Forgot Password?</a>
        </div>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        <button className="w-full bg-purple-800 text-white py-2 rounded font-semibold hover:bg-purple-700 mb-4">
          Continue
        </button>

        <div className="text-center text-sm text-gray-500 mb-4">or</div>

        <button className="w-full bg-white text-black py-2 rounded mb-3">
          Log in with Apple
        </button>
        <button className="w-full bg-white text-black border py-2 rounded">
          Log in with Google
        </button>
      </form>

      {/* Sign Up Prompt */}
      <p className="mt-6 text-sm">
        Don't have an account?{' '}
        <a href="#" className="text-purple-600 font-semibold hover:underline">Sign Up</a>
      </p>
    </div>
  );
};



export default Login;
