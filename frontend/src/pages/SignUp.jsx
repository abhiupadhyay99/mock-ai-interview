import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiArrowRight, FiActivity } from 'react-icons/fi';
import axios from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';

const SignUp = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleForm = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(API_PATHS.AUTH.SIGNUP, form);
      alert('Account Created Successfully! Please login.');
      navigate('/login');
    } catch (error) {
      alert(error.response?.data?.message || 'SignUp Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated Mesh Background */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <motion.div
          animate={{ scale: [1, 1.2, 1], x: [-50, 50, -50], y: [-20, 20, -20] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-indigo-600/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], x: [50, -50, 50], y: [20, -20, 20] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-purple-600/10 rounded-full blur-[120px]"
        />
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <motion.div
            whileHover={{ scale: 1.1, rotate: -5 }}
            className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-indigo-500/20"
          >
            <FiActivity className="text-white text-3xl" />
          </motion.div>
          <h1 className="text-4xl font-black tracking-tight mb-2">Create Account</h1>
          <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-[8px]">Sign up for your account</p>
        </div>

        <div className="glass-card rounded-[3rem] p-10 md:p-12 border-white/10 shadow-[0_0_80px_rgba(99,102,241,0.1)]">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Full Name</label>
              <div className="relative group">
                <FiUser className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                <input
                  type="text"
                  name="name"
                  placeholder="Abhishek Upadhyay"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 pl-14 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-white/10 transition-all font-medium"
                  onChange={handleForm}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Email Address</label>
              <div className="relative group">
                <FiMail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 pl-14 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-white/10 transition-all font-medium"
                  onChange={handleForm}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Password</label>
              <div className="relative group">
                <FiLock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 pl-14 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-white/10 transition-all font-medium"
                  onChange={handleForm}
                  required
                />
              </div>
            </div>

            <button
              disabled={loading}
              className="w-full group relative flex items-center justify-center bg-indigo-600 py-6 rounded-[2rem] font-black text-white uppercase tracking-widest text-xs shadow-2xl shadow-indigo-500/20 active:scale-95 transition-all disabled:opacity-50"
            >
              <span className="relative flex items-center">
                {loading ? 'Creating Account...' : 'Sign Up'}
                <FiArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest leading-loose">
              Already have an account? <button onClick={() => navigate('/login')} className="text-indigo-400 hover:text-indigo-300 transition-colors">Login</button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;