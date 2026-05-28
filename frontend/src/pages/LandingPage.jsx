import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCheckCircle, FiPlay, FiCpu, FiShield, FiTrendingUp, FiActivity } from 'react-icons/fi';

const LandingPage = () => {
    const navigate = useNavigate();

    const features = [
        { icon: <FiCpu className="text-indigo-400" />, title: "AI-Driven Insights", desc: "Our advanced Gemini models generate personalized, domain-specific questions to challenge you." },
        { icon: <FiShield className="text-emerald-400" />, title: "Live Proctoring", desc: "Experience a realistic exam environment with real-time proctoring and feedback simulations." },
        { icon: <FiTrendingUp className="text-purple-400" />, title: "Score Analysis", desc: "Receive immediate accuracy reports and identifying areas for technical growth." }
    ];

    return (
        <div className="min-h-screen bg-[#030712] text-white selection:bg-indigo-500/30 overflow-x-hidden">
            {/* Animated Mesh Background */}
            <div className="fixed inset-0 pointer-events-none -z-10">
                <motion.div 
                    animate={{ scale: [1, 1.2, 1], x: [-50, 50, -50], y: [-20, 20, -20] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[10%] left-[10%] w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[120px]"
                />
                <motion.div 
                    animate={{ scale: [1, 1.3, 1], x: [50, -50, 50], y: [20, -20, 20] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-[10%] right-[10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px]"
                />
            </div>

            {/* Navbar */}
            <nav className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center relative z-10">
                <div className="flex items-center space-x-3 group cursor-pointer">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
                        <FiActivity className="text-white text-xl" />
                    </div>
                    <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                        InterviewAI
                    </span>
                </div>
                <div className="hidden md:flex items-center space-x-10 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                    <a href="#" className="hover:text-white transition-colors">Features</a>
                    <a href="#" className="hover:text-white transition-colors">Enterprise</a>
                    <a href="#" className="hover:text-white transition-colors">Resources</a>
                </div>
                <button 
                  onClick={() => navigate('/login')}
                  className="px-10 py-4 rounded-xl border border-white/10 glass-morphism hover:bg-white/10 transition-all font-black uppercase tracking-widest text-[11px] shadow-xl"
                >
                    Login
                </button>
            </nav>

            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-6 py-24 md:py-32 relative z-10 text-center">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center space-x-2 px-4 py-2 bg-indigo-500/10 rounded-full border border-indigo-500/20 mb-8">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></div>
                        <span className="text-[9px] font-black uppercase tracking-widest text-indigo-400">Powered by Gemini Pro 1.5</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
                        Master Your Next <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-white to-purple-400">Technical Interview</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-slate-500 text-lg md:text-xl font-medium mb-12 leading-relaxed">
                        Precision-engineered AI assessments tailored to your specific role and experience level. Elevate your confidence with real-time feedback.
                    </p>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <button 
                          onClick={() => navigate('/signup')} 
                          className="w-full md:w-auto group px-12 py-6 rounded-[2rem] bg-white text-black font-black uppercase tracking-widest text-[11px] shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center"
                        >
                            Get Started Now <FiArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </motion.div>

            </section>

            {/* Features Grid */}
            <section className="max-w-7xl mx-auto px-6 py-24 border-t border-white/5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((f, i) => (
                        <motion.div
                            key={i}
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                            className="p-10 rounded-[2.5rem] glass-card hover:border-white/20 transition-all border-white/5 group"
                        >
                            <div className="text-4xl mb-8 transform group-hover:scale-110 transition-transform flex justify-center">
                                {f.icon}
                            </div>
                            <h3 className="text-xl font-black mb-4 tracking-tight text-center">{f.title}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed text-center font-medium">
                                {f.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-slate-500 text-[10px] font-black uppercase tracking-widest">
                <span>© 2024 InterviewAI. All Rights Reserved.</span>
                <div className="flex space-x-8 mt-6 md:mt-0">
                    <a href="#" className="hover:text-white transition-colors">Privacy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms</a>
                    <a href="#" className="hover:text-white transition-colors">Support</a>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;