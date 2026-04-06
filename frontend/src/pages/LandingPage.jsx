import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi"; // Needs react-icons

const LandingPage = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 flex flex-col">
      {/* Navbar */}
      <nav className="w-full p-4 md:px-8 flex justify-between items-center shadow-sm bg-white/50 backdrop-blur-md fixed top-0 z-50">
        <h1 className="text-xl font-extrabold text-gray-800 tracking-tight">AI Interview<span className="text-orange-500">.</span></h1>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          <Link to="/login" className="text-gray-600 hover:text-black font-medium transition">Login</Link>
          <button onClick={() => navigate("/signup")} className="bg-black text-white px-5 py-2 rounded-lg hover:scale-105 transition shadow-md">Sign Up</button>
        </div>

        {/* Mobile Hamburger */}
        <button className="md:hidden text-2xl text-gray-800" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="fixed top-16 left-0 w-full bg-white shadow-md flex flex-col items-center py-6 gap-4 md:hidden z-40 animate-fade-in">
          <Link to="/login" className="text-lg font-medium text-gray-700" onClick={() => setIsOpen(false)}>Login</Link>
          <button onClick={() => { setIsOpen(false); navigate("/signup"); }} className="bg-orange-500 text-white px-8 py-2 rounded-full font-medium shadow-lg">Sign Up</button>
        </div>
      )}

      {/* Hero Section */}
      <main className="flex-1 flex flex-col justify-center items-center text-center px-6 mt-20">
        <div className="max-w-3xl space-y-6">
          <span className="bg-orange-100 text-orange-600 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide uppercase shadow-sm">
            Launch Your Career
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Master Every Interview with <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">
              AI-Powered Feedback
            </span>
          </h1>
          <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Practice real-world interview questions in a stress-free environment. Get instant, tailored feedback on your answers and land your dream job faster.
          </p>
          <div className="pt-4">
            <button
              onClick={() => navigate("/signup")}
              className="bg-black text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-gray-800 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
            >
              Start Practicing for Free
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 text-center text-gray-500 text-sm bg-white/50">
        &copy; {new Date().getFullYear()} AI Interview Prep. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;