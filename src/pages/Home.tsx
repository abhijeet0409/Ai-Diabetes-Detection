import { ArrowRight, Brain, Stethoscope, ShieldCheck, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, type Variants } from 'framer-motion';

export default function Home() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 80, damping: 20 } }
  };

  return (
    <div className="flex flex-col items-center overflow-hidden">
      {/* Hero Section */}
      <section className="w-full relative min-h-[90vh] flex items-center bg-gradient-to-br from-[#f8fafc] via-white to-[#e0f2fe] dark:from-[#090e17] dark:via-[#0f172a] dark:to-[#1e293b] py-20 px-4 sm:px-6 lg:px-8">
        
        {/* Animated Background Orbs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[15%] w-72 h-72 bg-blue-500/20 dark:bg-blue-600/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[80px] animate-blob"></div>
          <div className="absolute top-[20%] right-[10%] w-96 h-96 bg-teal-400/20 dark:bg-[#1ebd95]/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] animate-blob" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-[10%] left-[30%] w-80 h-80 bg-indigo-500/20 dark:bg-indigo-600/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[90px] animate-blob" style={{ animationDelay: '4s' }}></div>
        </div>

        <motion.div 
          className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10 space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 glass text-[#0b5c92] dark:text-[#1ebd95] px-5 py-2.5 rounded-full text-sm font-bold mb-4 shadow-sm backdrop-blur-xl border border-blue-200/50 dark:border-[#1ebd95]/30">
            <Activity className="w-4 h-4 animate-pulse" />
            <span>AI-Powered Medical Intelligence v2.0</span>
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold text-[var(--text-main)] tracking-tight max-w-5xl leading-tight">
            Predictive Healthcare <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0b5c92] to-[#1ebd95] drop-shadow-sm">Reimagined</span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-lg md:text-2xl text-[var(--text-muted)] max-w-3xl leading-relaxed">
            Leverage an advanced deep-learning engine to assess diabetes risk instantly. Enter fundamental medical parameters and obtain authoritative AI-driven insights.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-5 mt-10">
            <Link
              to="/predict"
              className="inline-flex items-center justify-center space-x-3 bg-gradient-to-r from-[#0b5c92] to-[#0d7bb8] hover:from-[#1282c2] hover:to-[#119dec] text-white px-10 py-5 rounded-2xl text-lg font-bold transition-all shadow-[0_0_40px_rgba(11,92,146,0.4)] hover:shadow-[0_0_60px_rgba(11,92,146,0.6)] dark:from-[#1ebd95] dark:to-[#17a07c] dark:hover:from-[#23d8ab] dark:hover:to-[#1ebd95] dark:text-gray-900 group"
            >
              <span>Initialize Risk Assessment</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Feature Section with Premium Glass Float */}
      <section className="w-full py-32 bg-[var(--bg-color)] relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-extrabold text-[var(--text-main)] mb-6 tracking-tight">An Ecosystem Built for Reliability</h2>
            <p className="text-xl text-[var(--text-muted)] max-w-3xl mx-auto">
              Our architecture combines diagnostic medical science with cutting-edge artificial intelligence, forming a seamless pipeline for high-fidelity preliminary assessments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: Brain,
                color: 'text-blue-500',
                bg: 'bg-blue-500/10',
                title: 'Predictive NLP Engine',
                desc: 'A tuned analytical model trained on vast clinical datasets designed to detect microscopic patterns spanning various human metabolic features.'
              },
              {
                icon: Stethoscope,
                color: 'text-emerald-500',
                bg: 'bg-emerald-500/10',
                title: 'Clinical Grade Reports',
                desc: 'Generate downloadable and shareable PDF documents embedding transparent AI explanations, prescriptions, and mapped probabilities.'
              },
              {
                icon: ShieldCheck,
                color: 'text-indigo-500',
                bg: 'bg-indigo-500/10',
                title: 'Zero-Knowledge Privacy',
                desc: 'Locally run evaluations where personal data executes strictly on the edge. No data persistence, no tracking. Absolute confidentiality.'
              }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -15, scale: 1.02 }}
                className="glass p-10 rounded-[2rem] flex flex-col items-start border border-[var(--border-color)] group hover:border-[#1ebd95]/50 transition-colors duration-500"
              >
                <div className={`w-20 h-20 ${feature.bg} rounded-2xl flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 transition-transform duration-500`}>
                  <feature.icon className={`w-10 h-10 ${feature.color}`} />
                </div>
                <h3 className="text-2xl font-bold text-[var(--text-main)] mb-4">{feature.title}</h3>
                <p className="text-lg text-[var(--text-muted)] leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
