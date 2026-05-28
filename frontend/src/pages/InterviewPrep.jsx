import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiClock, FiCheckCircle, FiXCircle, FiArrowRight, FiArrowLeft, FiAlertCircle, FiActivity, FiCpu } from 'react-icons/fi';
import axios from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';

const InterviewPrep = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Base State
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showScore, setShowScore] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  // Persistence State (Answers Memory)
  const [answers, setAnswers] = useState({}); // { [index]: selectedChoice }
  const [finalScore, setFinalScore] = useState(0);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const res = await axios.get(`${API_PATHS.SESSION.GET_SESSION}/${id}`);
        const sessionData = res.data.session;
        setQuestions(sessionData.questions || []);

        // Load existing answers (Server Memory)
        if (sessionData.userAnswers) {
          const loadedAnswers = {};
          sessionData.questions.forEach((q, idx) => {
            if (sessionData.userAnswers[q._id]) {
              loadedAnswers[idx] = sessionData.userAnswers[q._id];
            }
          });
          setAnswers(loadedAnswers);

          // Auto-forward to first unanswered question
          const firstUnanswered = sessionData.questions.findIndex(q => !sessionData.userAnswers[q._id]);
          if (firstUnanswered !== -1) {
            setCurrentIdx(firstUnanswered);
          } else if (sessionData.questions.length > 0) {
            setCurrentIdx(sessionData.questions.length - 1);
            if (sessionData.isCompleted) setShowScore(true);
          }
        }
      } catch (error) {
        console.error("Error fetching session", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSession();
  }, [id]);

  useEffect(() => {
    if (timeLeft > 0 && !showScore && !loading && !answers[currentIdx]) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !answers[currentIdx]) {
      handleOptionSelect(null);
    }
  }, [timeLeft, showScore, loading, answers, currentIdx]);

  const handleOptionSelect = async (option) => {
    if (answers[currentIdx]) return; // LOCK: Prevent re-answering
    const qId = questions[currentIdx]._id;

    // Local Update
    setAnswers(prev => ({ ...prev, [currentIdx]: option }));
    
    // Server Sync (Cheat-Proof Lock)
    try {
        await axios.patch(`${API_PATHS.SESSION.SAVE_ANSWER}/${id}/answer`, {
            questionId: qId,
            selectedOption: option
        });
    } catch (err) {
        console.error("Failed to sync answer", err);
    }

    // Auto-advance after 1.5 seconds with feedback
    setTimeout(() => {
      handleNext();
    }, 1500);
  };

  const handleNext = async () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setTimeLeft(30);
    } else {
      // Calculate final results
      let score = 0;
      questions.forEach((q, idx) => {
        if (answers[idx] === q.answer) {
          score++;
        }
      });
      setFinalScore(score);
      await axios.patch(`${API_PATHS.SESSION.UPDATE_SCORE}/${id}`, { score });
      setShowScore(true);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
    </div>
  );

  if (!questions || questions.length === 0) return (
    <div className="min-h-screen bg-[#030712] flex flex-col items-center justify-center p-6 text-center">
      <FiAlertCircle className="text-6xl text-orange-500 mb-6" />
      <h2 className="text-2xl font-bold text-white mb-2">No Questions Found</h2>
      <button onClick={() => navigate("/dashboard")} className="mt-8 exam-button">Back to Dashboard</button>
    </div>
  );

  // Summary/Score Screen
  if (showScore) return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#030712] flex items-center justify-center p-6"
    >
      <div className="exam-card max-w-2xl w-full p-12 md:p-20 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-blue-500"></div>
        <div className="w-20 h-20 bg-emerald-500/10 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <FiCheckCircle className="text-4xl" />
        </div>
        <h2 className="text-4xl font-extrabold text-slate-800 tracking-tight mb-2">Assessment Complete</h2>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mb-12">Your scores have been validated.</p>
        
        <div className="grid grid-cols-2 gap-4 mb-12">
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
                <div className="text-4xl font-extrabold text-slate-800 mb-1">{finalScore} / {questions.length}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Score Achieved</div>
            </div>
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
                <div className="text-4xl font-extrabold text-blue-600">{Math.round((finalScore/questions.length)*100)}%</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Accuracy Rate</div>
            </div>
        </div>

        <button onClick={() => navigate("/dashboard")} className="exam-button w-full">Return to Dashboard</button>
      </div>
    </motion.div>
  );

  const q = questions[currentIdx];
  const selectedOption = answers[currentIdx];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        {/* Exam Header */}
        <div className="flex justify-between items-center mb-16 border-b border-slate-200 pb-8">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg">
              <FiCheckCircle />
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-slate-800">InterviewAI</h1>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Professional Exam Center</span>
            </div>
          </div>

          <div className="flex items-center space-x-4 pr-2">
            <div className="text-right">
                <div className="text-xs font-extrabold text-slate-800">{(localStorage.getItem("name") || "USER")}</div>
                <div className="text-[9px] font-bold uppercase tracking-widest text-blue-500">Active Test</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 font-extrabold">
              {(localStorage.getItem("name")?.[0] || "U").toUpperCase()}
            </div>
          </div>
        </div>

        {/* Progress & Timer */}
        <div className="mb-12">
           <div className="flex justify-between items-end mb-4">
              <div>
                 <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-600">Question {currentIdx + 1} of {questions.length}</span>
                 <h2 className="text-3xl font-extrabold tracking-tight text-slate-800 mt-1">Technical Assessment</h2>
              </div>
              <div className={`flex items-center space-x-3 px-6 py-3 rounded-2xl border-2 transition-all ${timeLeft < 10 ? "border-red-500 bg-red-50 text-red-600 animate-pulse" : "border-slate-200 bg-white text-slate-400"}`}>
                 <FiClock />
                 <span className="font-extrabold text-xl tabular-nums">{timeLeft}s</span>
              </div>
           </div>
           <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <motion.div 
               initial={{ width: "0%" }}
               animate={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
               className="h-full bg-blue-600"
              />
           </div>
        </div>

        {/* Question Area */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentIdx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="exam-card p-10 md:p-16 relative overflow-hidden"
          >
              <p className="text-xl md:text-2xl font-bold leading-relaxed text-slate-800 mb-12">
                {q.question}
              </p>

              <div className="grid grid-cols-1 gap-4">
                {q.options?.map((opt, i) => {
                  const hasAnswered = !!selectedOption;
                  const isCorrect = opt === q.answer;
                  const isSelected = selectedOption === opt;

                  let btnStyle = "border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50";
                  
                  if (hasAnswered) {
                    if (isCorrect) {
                      btnStyle = "border-emerald-500 bg-emerald-50 text-emerald-600 font-extrabold";
                    } else if (isSelected) {
                      btnStyle = "border-red-500 bg-red-50 text-red-600 font-extrabold";
                    } else {
                      btnStyle = "border-slate-100 bg-white text-slate-300 opacity-50";
                    }
                  }

                  return (
                    <button
                      key={i}
                      disabled={hasAnswered}
                      onClick={() => handleOptionSelect(opt)}
                      className={`w-full text-left px-8 py-6 rounded-2xl border-2 transition-all flex justify-between items-center ${btnStyle}`}
                    >
                      <span className="text-lg font-bold">{opt}</span>
                      {hasAnswered && isCorrect && <FiCheckCircle className="text-xl" />}
                      {hasAnswered && isSelected && !isCorrect && <FiXCircle className="text-xl" />}
                    </button>
                  );
                })}
              </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        <div className="mt-12 flex items-center justify-end">
           {currentIdx < questions.length - 1 ? (
             <button onClick={handleNext} className="exam-button flex items-center">
                Skip Question <FiArrowRight className="ml-3" />
             </button>
           ) : (
             <button onClick={handleNext} className="exam-button bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20 flex items-center">
                Finish Exam <FiCheckCircle className="ml-3" />
             </button>
           )}
        </div>
      </div>
    </div>
  );
};

export default InterviewPrep;