import type { MedicalData, PredictionResult } from './types';

export interface PrescriptionAdvice {
  id: string;
  category: 'Diet' | 'Exercise' | 'Medical' | 'Lifestyle';
  title: string;
  description: string;
}

export const generatePrescription = (data: MedicalData, result: PredictionResult): PrescriptionAdvice[] => {
  const advices: PrescriptionAdvice[] = [];

  // Diet
  if (data.glucose > 100 || data.bmi > 25) {
    advices.push({
      id: 'diet-1',
      category: 'Diet',
      title: 'Low Glycemic Diet',
      description: 'Focus on whole grains, non-starchy vegetables, and lean proteins. Reduce intake of simple sugars and processed carbohydrates.'
    });
  } else {
    advices.push({
      id: 'diet-2',
      category: 'Diet',
      title: 'Maintain Healthy Diet',
      description: 'Continue eating a balanced diet rich in vegetables, fruits, and lean proteins to maintain your current health levels.'
    });
  }

  // Exercise
  if (data.bmi > 25) {
    advices.push({
      id: 'exercise-1',
      category: 'Exercise',
      title: 'Regular Aerobic Activity',
      description: 'Aim for at least 150 minutes of moderate aerobic activity or 75 minutes of vigorous aerobic activity a week.'
    });
  } else {
    advices.push({
      id: 'exercise-2',
      category: 'Exercise',
      title: 'Maintain Active Lifestyle',
      description: 'Keep up with regular physical activity to support cardiovascular health and glucose metabolism.'
    });
  }

  // Medical
  if (result.riskLevel === 'High') {
    advices.push({
      id: 'med-1',
      category: 'Medical',
      title: 'Urgent Doctor Consultation',
      description: 'Please schedule an appointment with a healthcare provider immediately to discuss these results and arrange for clinical testing.'
    });
  } else if (result.riskLevel === 'Medium') {
    advices.push({
      id: 'med-2',
      category: 'Medical',
      title: 'Routine Check-up Recommended',
      description: 'Consider scheduling a routine check-up with your doctor within the next few months to monitor these indicators.'
    });
  }

  // Lifestyle
  if (data.bloodPressure > 80) {
    advices.push({
      id: 'life-1',
      category: 'Lifestyle',
      title: 'Blood Pressure Management',
      description: 'Monitor your sodium intake, manage stress levels, and ensure you are getting adequate sleep.'
    });
  }

  return advices;
};
