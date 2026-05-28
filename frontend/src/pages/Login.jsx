import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiArrowRight, FiActivity } from 'react-icons/fi';
import axios from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleForm = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(API_PATHS.AUTH.LOGIN, form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('name', res.data.name);
      navigate('/dashboard');
    } catch (error) {
      alert(error.response?.data?.message || 'Login Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-10">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-blue-500/20"
          >
            <FiActivity className="text-white text-3xl" />
          </motion.div>
          <h1 className="text-4xl font-black tracking-tight mb-2 text-white">Welcome Back</h1>
          <p className="text-blue-400 font-bold uppercase tracking-[0.2em] text-[10px]">Secure Authentication Portal</p>
        </div>

        <div className="exam-card p-10 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Email Address</label>
              <div className="relative group">
                <FiMail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  className="input-field pl-16 ring-0 focus:ring-0"
                  onChange={handleForm}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Password</label>
                <a href="#" className="text-[9px] font-black uppercase tracking-widest text-blue-500 hover:text-blue-600">Forgot?</a>
              </div>
              <div className="relative group">
                <FiLock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="input-field pl-16 ring-0 focus:ring-0"
                  onChange={handleForm}
                  required
                />
              </div>
            </div>

            <button
              disabled={loading}
              className="exam-button w-full flex items-center justify-center group"
            >
              {loading ? 'Logging in...' : 'Login Now'}
              <FiArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest leading-loose">
              Don't have an account? <button onClick={() => navigate('/signup')} className="text-blue-500 hover:text-blue-600 transition-colors">Sign Up</button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;