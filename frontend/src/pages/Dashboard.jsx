import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlay, FiClock, FiCheckCircle, FiTrendingUp, FiLogOut, FiLayout, FiActivity, FiArrowRight, FiCpu, FiMessageSquare } from 'react-icons/fi';
import axios from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';
import moment from 'moment';

const Dashboard = () => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");

  // Setup Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [setupForm, setSetupForm] = useState({
    role: "Java Fullstack",
    experience: "1",
    topicsToFocus: ""
  });

  const handleStartPractice = async () => {
    try {
      setGenerating(true);
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const sessionRes = await axios.post(API_PATHS.SESSION.CREATE, {
        ...setupForm,
        description: "Professional Mock Interview",
        questions: []
      });
      const sessionId = sessionRes.data.session._id;

      await axios.post(API_PATHS.AI.GENERATE_QUESTIONS, { sessionId });
      navigate(`/interview/${sessionId}`);
    } catch (error) {
      console.error("Setup error", error);
      alert("Failed to organize mock interview: " + (error.response?.data?.message || "Timeout."));
      setGenerating(false);
    }
  };

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const res = await axios.get(API_PATHS.SESSION.GET_ALL);
        setSessions(res.data.sessions || []);
      } catch (error) {
        console.error("Error fetching sessions", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/login");
  };

  const completedSessions = sessions.filter(s => s.isCompleted);
  const totalScore = completedSessions.reduce((acc, s) => acc + (s.score || 0), 0);
  const totalQs = completedSessions.reduce((acc, s) => acc + (s.questions?.length || 0), 0);
  const avgScore = totalQs > 0 ? Math.round((totalScore / totalQs) * 100) + "%" : "0%";

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex flex-col md:flex-row selection:bg-blue-500/30 overflow-hidden text-slate-800">
      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-[#0f172a] text-white flex flex-col z-30 shadow-2xl">
        <div className="p-8">
          <div className="flex items-center space-x-3 mb-12">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg">
              <FiCheckCircle className="text-xl" />
            </div>
            <h1 className="text-2xl font-black tracking-tighter">
              InterviewAI
            </h1>
          </div>

          <nav className="space-y-1">
            {[
              { id: "dashboard", icon: <FiLayout />, label: "Dashboard" },
              { id: "history", icon: <FiClock />, label: "History" },
              { id: "feedback", icon: <FiMessageSquare />, label: "Feedback" }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-6 py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all ${
                  activeTab === item.id 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" 
                  : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-8 border-t border-white/5">
          <div className="flex items-center space-x-4 mb-8 p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-slate-700 flex items-center justify-center text-white font-black text-sm">
              {(localStorage.getItem("name")?.[0] || "U").toUpperCase()}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-black truncate max-w-[120px]">{localStorage.getItem("name") || "User"}</span>
              <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">Active Status</span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 text-slate-400 hover:text-red-400 px-6 py-3 w-full font-bold uppercase tracking-widest text-[10px] transition-colors"
          >
            <FiLogOut className="text-lg" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto h-screen scrollbar-hide bg-[#f8fafc]">
        <header className="mb-12 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <div className="h-px w-8 bg-blue-600"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">Administrative Center</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-800">
              Welcome, <span className="text-blue-600">{localStorage.getItem("name")?.split(' ')[0] || "Candidate"}</span>
            </h2>
            <p className="text-slate-500 mt-2 font-bold uppercase tracking-[0.2em] text-[10px]">Your professional examination portal is ready.</p>
          </div>
          
          <button
            onClick={() => setIsModalOpen(true)}
            className="exam-button"
          >
            <FiPlay className="inline-block mr-2 text-lg" /> Generate AI Qus
          </button>
        </header>

        {loading ? (
          <div className="flex justify-center items-center h-64">
             <div className="w-12 h-12 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: "Tests Completed", value: completedSessions.length, icon: <FiCheckCircle />, color: "text-blue-600" },
                { label: "Overall Accuracy", value: avgScore, icon: <FiTrendingUp />, color: "text-emerald-600" },
                { label: "Total Sessions", value: sessions.length, icon: <FiActivity />, color: "text-slate-600" }
              ].map((stat, i) => (
                <div 
                  key={i}
                  className="exam-card relative p-8 flex flex-col space-y-2"
                >
                  <div className={`absolute right-8 top-8 text-4xl opacity-10 ${stat.color}`}>{stat.icon}</div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{stat.label}</span>
                  <span className="text-4xl font-black text-slate-800">{stat.value}</span>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <section>
              <div className="flex justify-between items-center mb-8 px-2 border-b border-slate-200 pb-4">
                <h3 className="text-xl font-black tracking-tight flex items-center text-slate-800">
                  <FiClock className="mr-3 text-blue-600" /> Recent Examinations
                </h3>
                <button className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-700">View All History</button>
              </div>

              <div className="space-y-4">
                {sessions.length === 0 ? (
                  <div className="exam-card p-12 text-center">
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">No examination records found.</p>
                  </div>
                ) : (
                  sessions.slice(0, 5).map((session, i) => (
                    <div 
                      key={session._id || i}
                      onClick={() => navigate(`/interview/${session._id}`)}
                      className="group p-6 md:p-10 exam-card hover:border-blue-300 transition-all cursor-pointer flex flex-col md:flex-row items-start md:items-center justify-between"
                    >
                      <div className="flex items-center space-x-6">
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-xl ${session.isCompleted ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600"}`}>
                          {session.isCompleted ? <FiCheckCircle /> : <FiActivity />}
                        </div>
                        <div>
                          <h4 className="text-lg font-black text-slate-800 capitalize">{session.role} Assessment</h4>
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{moment(session.createdAt).format('MMMM Do, YYYY')}</span>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0 flex items-center space-x-8">
                        <div className="text-left md:text-right">
                          {session.isCompleted ? (
                            <>
                              <div className="text-2xl font-black text-emerald-600">{session.score} / {session.questions?.length || 10}</div>
                              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Validated Score</span>
                            </>
                          ) : (
                            <>
                              <div className="text-2xl font-black text-slate-400">PENDING</div>
                              <span className="text-[9px] font-black uppercase tracking-widest text-blue-500 font-black">Resume Assessment</span>
                            </>
                          )}
                        </div>
                        <div className="h-10 w-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-blue-600 group-hover:border-blue-600 transition-all">
                          <FiArrowRight />
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Modal Wrapper */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-[2rem] w-full max-w-lg overflow-hidden shadow-2xl border border-slate-200"
            >
              {!generating ? (
                <div className="p-10">
                  <div className="flex justify-between items-start mb-10">
                    <div>
                      <h3 className="text-3xl font-black text-slate-800 tracking-tight mb-2">Configure Test</h3>
                      <p className="text-slate-400 font-bold uppercase tracking-widest text-[9px]">Select your assessment criteria.</p>
                    </div>
                    <button onClick={() => setIsModalOpen(false)} className="p-3 rounded-full hover:bg-slate-50 transition-colors text-slate-400">
                        <FiLogOut className="rotate-180" />
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Target Domain</label>
                       <select
                         className="w-full bg-slate-50 border border-slate-200 rounded-xl p-5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 appearance-none cursor-pointer"
                         value={setupForm.role}
                         onChange={(e) => setSetupForm({ ...setupForm, role: e.target.value })}
                       >
                         <option value="Java Fullstack">Java Fullstack Developer</option>
                         <option value="Python Fullstack">Python Fullstack Developer</option>
                         <option value="Frontend">Frontend Developer (React)</option>
                         <option value="Backend">Backend Developer (Node.js)</option>
                         <option value="Data Scientist">Data Scientist</option>
                       </select>
                    </div>

                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Experience (Years)</label>
                       <input
                         type="number" min="0" max="20"
                         className="w-full bg-slate-50 border border-slate-200 rounded-xl p-5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                         value={setupForm.experience}
                         onChange={(e) => setSetupForm({ ...setupForm, experience: e.target.value })}
                       />
                    </div>

                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Skills to focus</label>
                       <input
                         type="text" placeholder="e.g. React, SQL"
                         className="w-full bg-slate-50 border border-slate-200 rounded-xl p-5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                         value={setupForm.topicsToFocus}
                         onChange={(e) => setSetupForm({ ...setupForm, topicsToFocus: e.target.value })}
                       />
                    </div>
                  </div>

                  <button 
                    onClick={handleStartPractice}
                    className="exam-button w-full mt-10"
                  >
                    Generate AI Qus
                  </button>
                </div>
              ) : (
                <div className="p-20 text-center flex flex-col items-center">
                  <div className="w-16 h-16 border-4 border-slate-100 border-t-blue-600 rounded-full animate-spin mb-10"></div>
                  <h3 className="text-2xl font-black text-slate-800 tracking-tight mb-4">Organizing Questions...</h3>
                  <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[9px] max-w-xs leading-loose">
                    Preparing your professional technical assessment based on the selected criteria.
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;