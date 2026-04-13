import { useEffect, useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Download, Activity, MapPin, Pill, AlertTriangle, CheckCircle, Info, Clock } from 'lucide-react';
import { toast } from 'react-toastify';
import { 
  Tooltip as RechartsTooltip, ResponsiveContainer,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import { motion, type Variants } from 'framer-motion';

import type { MedicalData, PredictionResult } from '../services/types';
import { generatePDFReport } from '../services/pdfService';
import { generatePrescription } from '../services/prescriptionService';
import { getRecommendedHospitals, type Hospital } from '../services/hospitalService';
import { useAuth } from '../context/AuthContext';

interface HistoryItem {
  id: string;
  date: string;
  inputData: MedicalData;
  prediction: PredictionResult;
}

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loadingHospitals, setLoadingHospitals] = useState(true);
  const [selectedHistoryId, setSelectedHistoryId] = useState<string | null>(null);

  const historyKey = user ? `diadetect_history_${user.id}` : '';
  const history = useMemo(() => {
    if (!historyKey) return [];
    try {
      return JSON.parse(localStorage.getItem(historyKey) || '[]');
    } catch {
      return [];
    }
  }, [historyKey]);

  const activeData = useMemo(() => {
    if (selectedHistoryId) {
      return history.find((h: HistoryItem) => h.id === selectedHistoryId) || null;
    }
    if (location.state?.inputData && location.state?.prediction) {
      return location.state;
    }
    if (history.length > 0) {
      return history[0];
    }
    return null;
  }, [selectedHistoryId, location.state, history]);

  const inputData = activeData?.inputData;
  const prediction = activeData?.prediction;

  useEffect(() => {
    if (!inputData || !prediction) {
      toast.error('No prediction data found. Please fill out the form.');
      navigate('/predict');
      return;
    }

    const fetchHospitals = async () => {
      try {
        const data = await getRecommendedHospitals();
        setHospitals(data);
      } catch (err) {
        console.error('Error fetching hospitals', err);
        toast.error('Could not load hospital recommendations');
      } finally {
        setLoadingHospitals(false);
      }
    };

    fetchHospitals();
  }, [inputData, prediction, navigate]);

  if (!inputData || !prediction) return null;

  const handleDownloadPDF = () => {
    try {
      generatePDFReport(inputData, prediction);
      toast.success('Report downloaded successfully!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to generate report');
    }
  };

  const prescriptions = generatePrescription(inputData, prediction);

  const radarData = [
    { metric: 'BMI', value: inputData.bmi, fullMark: 60 },
    { metric: 'Glucose', value: inputData.glucose, fullMark: 300 },
    { metric: 'Insulin', value: inputData.insulin, fullMark: 200 },
    { metric: 'BP', value: inputData.bloodPressure, fullMark: 180 },
    { metric: 'Skin Thk', value: inputData.skinThickness, fullMark: 100 },
  ];

  const getRiskColor = (level: string) => {
    if (level === 'High') return 'text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]';
    if (level === 'Medium') return 'text-amber-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.8)]';
    return 'text-[#1ebd95] drop-shadow-[0_0_15px_rgba(30,189,149,0.8)]';
  };

  const getRiskBg = (level: string) => {
    if (level === 'High') return 'bg-red-50/80 dark:bg-red-900/40 border-red-300 dark:border-red-500/50 shadow-[0_0_40px_rgba(239,68,68,0.3)]';
    if (level === 'Medium') return 'bg-amber-50/80 dark:bg-amber-900/40 border-amber-300 dark:border-amber-500/50 shadow-[0_0_40px_rgba(245,158,11,0.3)]';
    return 'bg-emerald-50/80 dark:bg-[#1ebd95]/20 border-emerald-300 dark:border-[#1ebd95]/50 shadow-[0_0_40px_rgba(30,189,149,0.3)]';
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.15 } 
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 80 } }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-color)] py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-indigo-500/5 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] animate-blob pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-emerald-500/5 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000 pointer-events-none"></div>

      <motion.div 
        className="max-w-7xl mx-auto space-y-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        
        {/* Header Section */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass p-6 rounded-[2rem] border border-[var(--border-color)]">
          <div>
            <h1 className="text-3xl font-extrabold text-[var(--text-main)] tracking-tight">Assessment Dashboard</h1>
            <p className="text-[var(--text-muted)] mt-1 font-medium">Review your AI-generated risk analysis and tailored recommendations.</p>
          </div>
          <button
            onClick={handleDownloadPDF}
            className="inline-flex flex-shrink-0 items-center space-x-2 bg-gradient-to-r from-[var(--surface-color)] to-[var(--bg-color)] border border-[var(--border-color)] hover:border-[#0b5c92]/50 text-[var(--text-main)] px-6 py-3 rounded-xl font-bold transition-all shadow-md hover:shadow-lg"
          >
            <Download className="w-5 h-5 text-[#0b5c92] dark:text-[#1ebd95]" />
            <span>Export PDF Report</span>
          </button>
        </motion.div>

        {/* History Selector */}
        {history.length > 1 && (
          <motion.div variants={itemVariants} className="glass p-6 rounded-[2rem] border border-[var(--border-color)]">
            <h3 className="text-lg font-bold text-[var(--text-main)] mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-[#0b5c92] dark:text-[#1ebd95]" />
              Assessment History
            </h3>
            <div className="flex space-x-4 overflow-x-auto pb-2 custom-scrollbar">
              {history.map((h: HistoryItem) => (
                <button
                  key={h.id}
                  onClick={() => setSelectedHistoryId(h.id)}
                  className={`flex-shrink-0 px-5 py-3 text-left rounded-xl border text-sm font-medium transition-all ${
                    (selectedHistoryId === h.id) || (!selectedHistoryId && h.id === history[0].id)
                      ? 'bg-[#0b5c92] text-white border-transparent dark:bg-[#1ebd95] dark:text-gray-900 shadow-md' 
                      : 'bg-white/50 text-[var(--text-main)] border-[var(--border-color)] hover:border-[#0b5c92]/50 dark:bg-[#0f172a]/50 dark:hover:border-[#1ebd95]/50'
                  }`}
                >
                  <div className="font-bold">{new Date(h.date).toLocaleDateString()}</div>
                  <div className="text-xs mt-1 opacity-80">{h.prediction.riskLevel} Risk</div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Top Row: Risk Result & Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Risk Card */}
          <motion.div variants={itemVariants} className={`col-span-1 rounded-[2.5rem] border p-8 flex flex-col justify-center items-center text-center backdrop-blur-xl ${getRiskBg(prediction.riskLevel)} relative overflow-hidden group`}>
            <div className="absolute inset-0 bg-white/20 dark:bg-black/10 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out"></div>
            
            <div className="relative z-10 flex flex-col items-center">
              {prediction.riskLevel === 'High' ? (
                <AlertTriangle className={`w-20 h-20 mb-6 ${getRiskColor(prediction.riskLevel)} animate-pulse`} />
              ) : prediction.riskLevel === 'Medium' ? (
                <Info className={`w-20 h-20 mb-6 ${getRiskColor(prediction.riskLevel)}`} />
              ) : (
                <CheckCircle className={`w-20 h-20 mb-6 ${getRiskColor(prediction.riskLevel)}`} />
              )}
              
              <h2 className="text-xl font-bold text-[var(--text-main)] mb-2 uppercase tracking-wide opacity-80">Diabetes Risk Level</h2>
              <div className={`text-6xl font-black tracking-tighter mb-4 ${getRiskColor(prediction.riskLevel)}`}>
                {prediction.riskLevel}
              </div>
              
              <p className="text-[var(--text-main)]/80 dark:text-gray-300 mt-2 font-medium">
                Probability detected: <span className="font-black text-2xl ml-1">{prediction.probability}%</span>
              </p>
            </div>
          </motion.div>

          {/* Key Insights List */}
          <motion.div variants={itemVariants} className="col-span-1 lg:col-span-2 glass rounded-[2.5rem] border border-[var(--border-color)] p-8 shadow-xl">
            <h3 className="text-2xl font-black text-[var(--text-main)] mb-6 flex items-center tracking-tight">
              <Activity className="w-8 h-8 mr-3 text-[#0b5c92] dark:text-[#1ebd95]" />
              Diagnostic Insights
            </h3>
            <ul className="space-y-5">
              {prediction.insights.map((insight: string, idx: number) => (
                <li key={idx} className="flex items-start bg-white/40 dark:bg-[#0f172a]/40 p-4 rounded-2xl border border-[var(--border-color)]/50">
                  <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-[#0b5c92] to-[#1282c2] dark:from-[#1ebd95] dark:to-[#17a07c] text-white flex items-center justify-center font-bold mr-5 shadow-inner">
                    {idx + 1}
                  </span>
                  <span className="text-[var(--text-main)] text-lg leading-relaxed font-medium mt-1">{insight}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Middle Row: Charts & Data */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Radar Chart */}
          <motion.div variants={itemVariants} className="glass rounded-[2.5rem] border border-[var(--border-color)] p-8 shadow-xl">
            <h3 className="text-2xl font-black text-[var(--text-main)] mb-6 tracking-tight">Metrics Overview</h3>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                  <PolarGrid stroke="var(--border-color)" />
                  <PolarAngleAxis dataKey="metric" tick={{ fill: 'var(--text-muted)', fontSize: 13, fontWeight: 600 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 'dataMax']} tick={{ fill: 'var(--text-muted)' }} />
                  <Radar name="Patient Stats" dataKey="value" stroke="#0b5c92" strokeWidth={3} fill="url(#colorUv)" fillOpacity={0.6} />
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1ebd95" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#0b5c92" stopOpacity={0.2}/>
                    </linearGradient>
                  </defs>
                  <RechartsTooltip wrapperClassName="dark:bg-gray-800 dark:text-white rounded-xl shadow-2xl border-gray-700 font-bold" />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Prescriptive Advice */}
          <motion.div variants={itemVariants} className="glass rounded-[2.5rem] border border-[var(--border-color)] p-8 shadow-xl">
            <h3 className="text-2xl font-black text-[var(--text-main)] mb-6 flex items-center tracking-tight">
              <Pill className="w-8 h-8 mr-3 text-[#0b5c92] dark:text-[#1ebd95]" />
              Tailored Prescriptive Plan
            </h3>
            <div className="space-y-4 max-h-[350px] overflow-y-auto pr-3 custom-scrollbar">
              {prescriptions.map((adv) => (
                <div key={adv.id} className="p-5 rounded-2xl bg-white/50 dark:bg-[#0f172a]/50 border border-[var(--border-color)] hover:border-[#1ebd95]/50 transition-colors shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-[var(--text-main)] text-lg">{adv.title}</h4>
                    <span className="text-xs px-3 py-1.5 bg-gradient-to-r from-blue-100 to-emerald-100 dark:from-blue-900/50 dark:to-emerald-900/50 border border-blue-200 dark:border-emerald-800 rounded-full text-[var(--text-main)] font-bold tracking-wide uppercase">
                      {adv.category}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed font-medium">
                    {adv.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* Bottom Row: Hospital Recommendations */}
        <motion.div variants={itemVariants} className="glass rounded-[2.5rem] border border-[var(--border-color)] p-8 shadow-xl">
          <h3 className="text-2xl font-black text-[var(--text-main)] mb-8 flex items-center tracking-tight">
            <MapPin className="w-8 h-8 mr-3 text-[#0b5c92] dark:text-[#1ebd95]" />
            Recommended Healthcare Facilities Near You
          </h3>
          
          {loadingHospitals ? (
            <div className="flex justify-center items-center py-16">
              <div className="animate-pulse space-y-6 w-full max-w-4xl">
                <div className="h-24 bg-gray-200 dark:bg-gray-700/50 rounded-2xl w-full"></div>
                <div className="h-24 bg-gray-200 dark:bg-gray-700/50 rounded-2xl w-full"></div>
                <div className="h-24 bg-gray-200 dark:bg-gray-700/50 rounded-2xl w-full"></div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hospitals.map((hospital) => (
                <div key={hospital.id} className="p-6 rounded-3xl bg-white/60 dark:bg-[#0f172a]/60 border border-[var(--border-color)] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group">
                  <h4 className="font-black text-[var(--text-main)] text-xl mb-2 group-hover:text-[#0b5c92] dark:group-hover:text-[#1ebd95] transition-colors">{hospital.name}</h4>
                  <p className="text-sm text-[var(--text-muted)] mb-4 flex items-center font-bold">
                    <MapPin className="w-4 h-4 mr-1.5 text-[#1ebd95]" />
                    {hospital.distance} away
                  </p>
                  <p className="text-sm text-[var(--text-main)] mb-5 font-medium leading-relaxed">
                    {hospital.address}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {hospital.specialties.map(spec => (
                      <span key={spec} className="inline-block text-[10px] uppercase font-bold px-2.5 py-1 rounded-md bg-[#0b5c92]/10 dark:bg-[#1ebd95]/20 text-[#0b5c92] dark:text-[#1ebd95] shadow-sm">
                        {spec}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto pt-5 border-t border-[var(--border-color)] flex justify-between items-center text-sm">
                    <span className="font-bold text-[var(--text-main)]">{hospital.contact}</span>
                    <span className="flex items-center text-amber-500 font-extrabold bg-amber-100 dark:bg-amber-900/30 px-2 py-1 rounded-lg">
                      ★ {hospital.rating}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

      </motion.div>
    </div>
  );
}
