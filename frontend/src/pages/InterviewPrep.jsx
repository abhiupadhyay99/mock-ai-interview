import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import { FiCheckCircle, FiClock, FiXCircle } from "react-icons/fi";

const InterviewPrep = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [loading, setLoading] = useState(true);

  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const res = await axios.get(`${API_PATHS.SESSION.GET_ONE}/${id}`);
        setQuestions(res.data.session.questions || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSession();
  }, [id]);

  useEffect(() => {
    if (loading || quizFinished || isAnswered || questions.length === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [loading, quizFinished, isAnswered, currentIdx, questions]);

  const handleTimeOut = () => {
    setIsAnswered(true);
    setTimeout(nextQuestion, 2000);
  };

  const handleOptionSelect = (option) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);

    if (option === questions[currentIdx].answer) {
      setScore((prev) => prev + 1);
    }

    setTimeout(nextQuestion, 2000);
  };

  const nextQuestion = async () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setTimeLeft(30);
    } else {
      setQuizFinished(true);
      await submitScore();
    }
  };

  const submitScore = async () => {
    try {
      // Use active closure values since state updates asynchronously
      let finalScore = score;
      if (selectedOption === questions[currentIdx].answer) finalScore += 1;

      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await axios.patch(`${API_PATHS.SESSION.GET_ONE}/${id}`, { score: finalScore });
    } catch (err) {
      console.error("Failed to sync score");
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading interview...</div>;
  if (!questions || questions.length === 0) return <div className="min-h-screen flex items-center justify-center">No questions found. Try recreating the session.</div>;

  if (quizFinished) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-3xl shadow-xl w-full max-w-lg p-10 text-center border-t-8 border-orange-500">
          <FiCheckCircle className="text-orange-500 w-24 h-24 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Interview Complete!</h2>
          <p className="text-gray-500 mb-8 text-lg">You simulated a high-pressure technical screen.</p>

          <div className="bg-orange-50 rounded-2xl p-6 mb-8 border border-orange-100 flex flex-col items-center justify-center">
            <h3 className="text-5xl font-black text-orange-600 mb-2">
              {/* Ensure Score renders the accurate closure aggregate rather than just state */}
              {selectedOption === questions[currentIdx].answer ? score + 1 : score}
              <span className="text-2xl text-orange-400"> / {questions.length}</span>
            </h3>
            <p className="font-semibold text-orange-800 uppercase tracking-widest text-sm">Correct Answers</p>
          </div>

          <button onClick={() => navigate("/dashboard")} className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition shadow-lg">
            Return to Dashboard
          </button>
        </motion.div>
      </div>
    );
  }

  const q = questions[currentIdx];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-12 flex flex-col items-center">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button onClick={() => navigate("/dashboard")} className="text-gray-500 hover:text-black transition font-medium">← Abandon Mock</button>
          <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200 text-sm font-bold text-gray-700">
            Question {currentIdx + 1} of {questions.length}
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden"
          >
            {/* Timer Bar */}
            <div className="h-2 w-full bg-gray-100">
              <motion.div
                className={`h-full ${timeLeft <= 10 ? 'bg-red-500' : 'bg-orange-500'}`}
                initial={{ width: "100%" }}
                animate={{ width: `${(timeLeft / 30) * 100}%` }}
                transition={{ duration: 1, ease: "linear" }}
              />
            </div>

            <div className="p-8 md:p-12">
              <div className="flex justify-between items-start mb-8 gap-4">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 leading-relaxed">
                  {q.question}
                </h2>
                <div className={`flex shrink-0 items-center space-x-2 px-4 py-2 rounded-xl font-bold text-lg ${timeLeft <= 10 ? 'bg-red-50 text-red-600' : 'bg-orange-50 text-orange-600'}`}>
                  <FiClock />
                  <span>{timeLeft}s</span>
                </div>
              </div>

              <div className="space-y-4">
                {q.options?.map((opt, i) => {
                  let btnStyle = "border-gray-200 hover:border-orange-400 hover:bg-orange-50 text-gray-700 font-medium bg-white";
                  if (isAnswered) {
                    if (opt === q.answer) {
                      btnStyle = "border-green-500 bg-green-50 text-green-700 font-bold shadow-sm shadow-green-100";
                    } else if (opt === selectedOption) {
                      btnStyle = "border-red-500 bg-red-50 text-red-700 font-bold shadow-sm shadow-red-100";
                    } else {
                      btnStyle = "border-gray-100 bg-gray-50 text-gray-400 opacity-60";
                    }
                  }

                  return (
                    <button
                      key={i}
                      disabled={isAnswered}
                      onClick={() => handleOptionSelect(opt)}
                      className={`w-full text-left p-5 rounded-2xl border-2 transition-all flex justify-between items-center ${btnStyle}`}
                    >
                      <span className="text-base md:text-lg">{opt}</span>
                      {isAnswered && opt === q.answer && <FiCheckCircle className="text-xl" />}
                      {isAnswered && opt === selectedOption && opt !== q.answer && <FiXCircle className="text-xl" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default InterviewPrep;