import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2, Activity, Zap } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';
import { medicalMeasurementSchema, type MedicalData } from '../services/types';
import { predictDiabetesRisk } from '../services/aiEngine';

export default function PredictionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MedicalData>({
    resolver: zodResolver(medicalMeasurementSchema),
    defaultValues: {
      age: undefined,
      bmi: undefined,
      glucose: undefined,
      bloodPressure: undefined,
      insulin: undefined,
      skinThickness: undefined,
      pregnancies: 0,
    }
  });

  const onSubmit = async (data: MedicalData) => {
    setIsSubmitting(true);
    try {
      const result = await predictDiabetesRisk(data);
      if (user) {
         const historyKey = `diadetect_history_${user.id}`;
         const currentHistory = JSON.parse(localStorage.getItem(historyKey) || '[]');
         // eslint-disable-next-line react-hooks/purity
         const newEntry = {
           id: Date.now().toString(),
           date: new Date().toISOString(),
           inputData: data,
           prediction: result
         };
         currentHistory.unshift(newEntry);
         localStorage.setItem(historyKey, JSON.stringify(currentHistory));
      }
      navigate('/dashboard', { state: { inputData: data, prediction: result } });
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1, delayChildren: 0.2 } 
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
  };

  const inputClass = (hasError?: boolean) => 
    `w-full px-5 py-4 rounded-xl border bg-white/50 dark:bg-[#0f172a]/50 text-[var(--text-main)] transition-all glow-input outline-none backdrop-blur-md shadow-inner ${
      hasError 
        ? 'border-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.2)]' 
        : 'border-[var(--border-color)] hover:border-blue-400/50 dark:hover:border-[#1ebd95]/50'
    }`;

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#f8fafc] via-white to-[#e0f2fe] dark:from-[#090e17] dark:via-[#0f172a] dark:to-[#1e293b] py-20 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      
      {/* Animated Orbs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] animate-blob pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/4 w-[30rem] h-[30rem] bg-teal-500/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] animate-blob pointer-events-none" style={{ animationDelay: '2s' }}></div>

      <motion.div 
        className="max-w-4xl mx-auto w-full relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-4 bg-white/60 dark:bg-gray-800/60 rounded-full mb-6 backdrop-blur-md shadow-lg border border-white/20">
            <Activity className="w-10 h-10 text-[#0b5c92] dark:text-[#1ebd95]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--text-main)] tracking-tight mb-4 drop-shadow-sm">
            Clinical Data <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0b5c92] to-[#1ebd95]">Ingestion</span>
          </h1>
          <p className="text-lg text-[var(--text-muted)]">
            A secure portal to stream your physiological parameters into our assessment model.
          </p>
        </div>

        <motion.div className="glass p-8 md:p-12 rounded-[2.5rem] border border-[var(--border-color)] shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-[var(--text-main)] mb-2 uppercase tracking-wide">Age (years)</label>
                <input type="number" {...register('age', { valueAsNumber: true })} className={inputClass(!!errors.age)} placeholder="e.g., 35" />
                {errors.age && <p className="mt-2 text-sm text-red-500 font-medium">{errors.age.message}</p>}
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-[var(--text-main)] mb-2 uppercase tracking-wide">BMI (kg/m²)</label>
                <input type="number" step="0.1" {...register('bmi', { valueAsNumber: true })} className={inputClass(!!errors.bmi)} placeholder="e.g., 24.5" />
                {errors.bmi && <p className="mt-2 text-sm text-red-500 font-medium">{errors.bmi.message}</p>}
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-[var(--text-main)] mb-2 uppercase tracking-wide">Fasting Glucose (mg/dL)</label>
                <input type="number" {...register('glucose', { valueAsNumber: true })} className={inputClass(!!errors.glucose)} placeholder="e.g., 90" />
                {errors.glucose && <p className="mt-2 text-sm text-red-500 font-medium">{errors.glucose.message}</p>}
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-[var(--text-main)] mb-2 uppercase tracking-wide">Diastolic Blood Pressure (mm Hg)</label>
                <input type="number" {...register('bloodPressure', { valueAsNumber: true })} className={inputClass(!!errors.bloodPressure)} placeholder="e.g., 80" />
                {errors.bloodPressure && <p className="mt-2 text-sm text-red-500 font-medium">{errors.bloodPressure.message}</p>}
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-[var(--text-main)] mb-2 uppercase tracking-wide">Serum Insulin (mu U/ml)</label>
                <input type="number" {...register('insulin', { valueAsNumber: true })} className={inputClass(!!errors.insulin)} placeholder="e.g., 30" />
                {errors.insulin && <p className="mt-2 text-sm text-red-500 font-medium">{errors.insulin.message}</p>}
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-[var(--text-main)] mb-2 uppercase tracking-wide">Triceps Skin Fold (mm)</label>
                <input type="number" {...register('skinThickness', { valueAsNumber: true })} className={inputClass(!!errors.skinThickness)} placeholder="e.g., 20" />
                {errors.skinThickness && <p className="mt-2 text-sm text-red-500 font-medium">{errors.skinThickness.message}</p>}
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-[var(--text-main)] mb-2 uppercase tracking-wide">Number of Pregnancies</label>
                <input type="number" {...register('pregnancies', { valueAsNumber: true })} className={inputClass(!!errors.pregnancies)} placeholder="e.g., 0" />
                {errors.pregnancies && <p className="mt-2 text-sm text-red-500 font-medium">{errors.pregnancies.message}</p>}
              </motion.div>
            </motion.div>

            <motion.div 
              className="pt-10 border-t border-[var(--border-color)] mt-8 flex justify-end"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center space-x-3 bg-gradient-to-r from-[#0b5c92] to-[#1282c2] hover:from-[#1282c2] hover:to-[#0d7bb8] text-white px-10 py-5 rounded-2xl font-bold transition-all shadow-[0_0_30px_rgba(11,92,146,0.5)] hover:shadow-[0_0_50px_rgba(11,92,146,0.8)] dark:from-[#1ebd95] dark:to-[#17a07c] dark:hover:from-[#23d8ab] dark:hover:to-[#1ebd95] dark:text-gray-900 dark:shadow-[0_0_30px_rgba(30,189,149,0.3)] dark:hover:shadow-[0_0_50px_rgba(30,189,149,0.5)] disabled:opacity-70 disabled:cursor-not-allowed group relative overflow-hidden"
              >
                {isSubmitting && (
                  <div className="absolute inset-0 bg-white/20 dark:bg-black/10 animate-pulse"></div>
                )}
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin relative z-10" />
                    <span className="relative z-10">Neural Analysis Active...</span>
                  </>
                ) : (
                  <>
                    <span className="relative z-10">Execute Model Run</span>
                    <Zap className="w-6 h-6 group-hover:scale-110 transition-transform relative z-10" />
                  </>
                )}
              </button>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}
