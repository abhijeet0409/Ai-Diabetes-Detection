import type { MedicalData, PredictionResult, RiskLevel } from './types';

/**
 * Mock AI Prediction Engine
 * Analyzes medical metrics and returns a simulated risk level.
 * Weights are loosely inspired by generic diabetes risk risk factors.
 */
export async function predictDiabetesRisk(data: MedicalData): Promise<PredictionResult> {
  // Simulate network delay for AI processing
  await new Promise(resolve => setTimeout(resolve, 2000));

  let score = 0;
  const insights: string[] = [];

  // Age factor
  if (data.age > 45) {
    score += 25;
    insights.push("Age over 45 is a common risk factor.");
  } else if (data.age > 30) {
    score += 10;
  }

  // BMI factor
  if (data.bmi >= 30) {
    score += 30;
    insights.push(`BMI of ${data.bmi} indicates obesity, increasing risk.`);
  } else if (data.bmi >= 25) {
    score += 15;
    insights.push("BMI is in the overweight category.");
  }

  // Glucose factor
  if (data.glucose > 125) {
    score += 35;
    insights.push(`Fasting glucose of ${data.glucose} mg/dL is notably high.`);
  } else if (data.glucose >= 100) {
    score += 20;
    insights.push("Glucose levels indicate prediabetes range.");
  }

  // Blood Pressure factor
  if (data.bloodPressure > 90) {
    score += 15;
    insights.push("Elevated diastolic blood pressure noted.");
  }

  // Pregnancies factor
  if (data.pregnancies > 3) {
    score += 10;
    insights.push("History of multiple pregnancies slightly increases risk.");
  }

  // Cap score at 99
  const probability = Math.min(score + Math.floor(Math.random() * 10), 99);
  
  let riskLevel: RiskLevel = 'Low';
  if (probability > 70) {
    riskLevel = 'High';
  } else if (probability > 40) {
    riskLevel = 'Medium';
  }

  if (insights.length === 0) {
    insights.push("All provided metrics are within normal, healthy ranges.");
  }

  return {
    riskLevel,
    probability,
    insights
  };
}
