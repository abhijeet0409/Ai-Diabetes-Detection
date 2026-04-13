import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, ShieldCheck, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Login() {
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId.trim() || !userName.trim()) return;
    
    // Simplistic mock authentication
    login(userId.trim(), userName.trim());
    navigate('/dashboard'); // Go directly to dashboard to see history, or '/predict'
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[var(--bg-color)] py-20 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] animate-blob pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/4 w-[30rem] h-[30rem] bg-teal-500/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] animate-blob pointer-events-none" style={{ animationDelay: '2s' }}></div>

      <motion.div 
        className="max-w-md mx-auto w-full relative z-10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="glass p-8 md:p-10 rounded-[2.5rem] border border-[var(--border-color)] shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col items-center mb-8 text-center">
            <div className="w-16 h-16 bg-[#0b5c92]/10 dark:bg-[#1ebd95]/20 rounded-full flex items-center justify-center mb-4">
              <Activity className="w-8 h-8 text-[#0b5c92] dark:text-[#1ebd95]" />
            </div>
            <h1 className="text-3xl font-extrabold text-[var(--text-main)] mb-2">Patient Portal</h1>
            <p className="text-sm text-[var(--text-muted)] flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 mr-1 text-[#1ebd95]" /> 
              Secure Access Authentication
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-[var(--text-main)] mb-2">Patient Name</label>
              <input 
                type="text" 
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
                className="w-full px-5 py-4 rounded-xl border border-[var(--border-color)] bg-[var(--surface-color)] text-[var(--text-main)] focus:ring-2 focus:ring-[#0b5c92] dark:focus:ring-[#1ebd95] focus:border-transparent transition-all outline-none"
                placeholder="Jane Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[var(--text-main)] mb-2">Patient ID or Email</label>
              <input 
                type="text" 
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
                className="w-full px-5 py-4 rounded-xl border border-[var(--border-color)] bg-[var(--surface-color)] text-[var(--text-main)] focus:ring-2 focus:ring-[#0b5c92] dark:focus:ring-[#1ebd95] focus:border-transparent transition-all outline-none"
                placeholder="PID-84920"
              />
            </div>
            
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-[#0b5c92] to-[#1282c2] hover:from-[#1282c2] hover:to-[#0d7bb8] text-white px-8 py-4 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(11,92,146,0.3)] hover:shadow-[0_0_30px_rgba(11,92,146,0.5)] dark:from-[#1ebd95] dark:to-[#17a07c] dark:hover:from-[#23d8ab] dark:hover:to-[#1ebd95] dark:text-gray-900 mt-4"
            >
              <span>Access Records</span>
              <LogIn className="w-5 h-5 ml-1" />
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
