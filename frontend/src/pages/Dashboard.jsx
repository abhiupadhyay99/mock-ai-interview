import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiPlay, FiClock, FiCheckCircle, FiTrendingUp, FiSettings, FiLogOut } from 'react-icons/fi';
import axios from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';
import moment from 'moment';

const Dashboard = () => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

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

      // 1. Create empty session
      const sessionRes = await axios.post(API_PATHS.SESSION.CREATE, {
        ...setupForm,
        description: "AI-generated Mock Interview",
        questions: []
      });
      const sessionId = sessionRes.data.session._id;

      // 2. Generate AI questions (limited to 50)
      await axios.post(API_PATHS.AI.GENERATE_QUESTIONS, { sessionId });

      // 3. Jump to Interview Screen
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
    navigate("/login");
  };

  // Derive aggregates
  const completedSessions = sessions.filter(s => s.isCompleted);
  const totalScore = completedSessions.reduce((acc, s) => acc + (s.score || 0), 0);
  const totalQs = completedSessions.reduce((acc, s) => acc + (s.questions?.length || 0), 0);
  const avgScore = totalQs > 0 ? Math.round((totalScore / totalQs) * 100) + "%" : "N/A";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
            InterviewAI
          </h1>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <a href="#" className="flex items-center space-x-3 text-orange-600 bg-orange-50 px-4 py-3 rounded-xl font-medium transition cursor-default">
            <FiTrendingUp className="text-lg" />
            <span>Dashboard</span>
          </a>
          <a href="#" className="flex items-center space-x-3 text-gray-600 hover:bg-gray-100 px-4 py-3 rounded-xl font-medium transition cursor-default">
            <FiClock className="text-lg" />
            <span>History</span>
          </a>
        </nav>
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 text-gray-600 hover:text-red-600 hover:bg-red-50 w-full px-4 py-3 rounded-xl font-medium transition"
          >
            <FiLogOut className="text-lg" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="mb-8 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Welcome back! 👋</h2>
            <p className="text-gray-500 mt-1">Ready to ace your next interview?</p>
          </div>
          <motion.button
            onClick={() => setIsModalOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-black text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:bg-gray-800 transition flex items-center space-x-2"
          >
            <FiPlay className="text-lg" />
            <span>Start Practice</span>
          </motion.button>
        </header>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
                <div className="w-12 h-12 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center text-xl">
                  <FiCheckCircle />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">{completedSessions.length}</h3>
                  <p className="text-sm text-gray-500 font-medium">Interviews Completed</p>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-xl">
                  <FiTrendingUp />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">{avgScore}</h3>
                  <p className="text-sm text-gray-500 font-medium">Average Score</p>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center text-xl">
                  <FiClock />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">{sessions.length > 0 ? `${(sessions.length * 0.5).toFixed(1)}h` : "0h"}</h3>
                  <p className="text-sm text-gray-500 font-medium">Practice Time</p>
                </div>
              </motion.div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-800">Recent Sessions</h3>
                {sessions.length > 0 && <button className="text-orange-500 text-sm font-medium hover:underline">View All</button>}
              </div>
              <div className="divide-y divide-gray-100">
                {sessions.length === 0 ? (
                  <p className="p-6 text-center text-gray-500">No mock interviews completed yet. Start preparing!</p>
                ) : (
                  sessions.slice(0, 5).map((session, i) => (
                    <motion.div onClick={() => navigate(`/interview/${session._id}`)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 + (i * 0.1) }} key={session._id || i} className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between hover:bg-gray-50 transition cursor-pointer">
                      <div>
                        <h4 className="font-semibold text-gray-800 capitalize">{session.role} Role Interview</h4>
                        <p className="text-sm text-gray-500 mt-1">{moment(session.createdAt).fromNow()}</p>
                      </div>
                      <div className="text-left md:text-right mt-2 md:mt-0">
                        {session.isCompleted ? (
                          <>
                            <span className={`font-bold text-green-500`}>Score: {session.score} / {session.questions?.length || 0}</span>
                            <p className="text-xs text-gray-400 mt-1">Completed</p>
                          </>
                        ) : (
                          <>
                            <span className={`font-bold text-orange-500`}>In Progress</span>
                            <p className="text-xs text-gray-400 mt-1">{session.questions?.length || 0} Questions</p>
                          </>
                        )}
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </>
        )}
      </main>

      {/* Interview Setup Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            {!generating ? (
              <>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Setup Mock Interview</h3>
                <p className="text-gray-500 text-sm mb-6">Choose your domain constraint and skill level to begin.</p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Interview Role</label>
                    <select
                      className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
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

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
                    <input
                      type="number" min="0" max="20"
                      className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                      value={setupForm.experience}
                      onChange={(e) => setSetupForm({ ...setupForm, experience: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Specific Topics to Focus On (Optional)</label>
                    <input
                      type="text" placeholder="e.g. Microservices, Multithreading, System Design"
                      className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                      value={setupForm.topicsToFocus}
                      onChange={(e) => setSetupForm({ ...setupForm, topicsToFocus: e.target.value })}
                    />
                  </div>
                </div>

                <div className="mt-8 flex space-x-3">
                  <button onClick={() => setIsModalOpen(false)} className="flex-1 py-3 border border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition">
                    Cancel
                  </button>
                  <button onClick={handleStartPractice} className="flex-1 py-3 bg-orange-500 rounded-xl font-semibold text-white hover:bg-orange-600 transition shadow-md shadow-orange-500/30">
                    Generate AI Interview
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="animate-spin inline-block w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full mb-6"></div>
                <h3 className="text-xl font-bold text-gray-800">Compiling 50 Custom Questions...</h3>
                <p className="text-gray-500 mt-2 text-sm max-w-xs mx-auto">
                  Our Gemini LLM engine is generating a completely unique mock interview for a {setupForm.experience}-year {setupForm.role}. This may take 30-40 seconds.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;