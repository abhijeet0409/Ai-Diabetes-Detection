import { z } from 'zod';

export const medicalMeasurementSchema = z.object({
  age: z.number().min(0, "Age must be a positive number").max(120, "Please enter a realistic age"),
  bmi: z.number().min(10, "BMI seems too low").max(60, "BMI seems abnormally high").step(0.1),
  glucose: z.number().min(20, "Glucose level too low").max(400, "Glucose level too high"),
  bloodPressure: z.number().min(20, "BP too low").max(200, "BP too high"),
  insulin: z.number().min(0, "Insulin cannot be negative").max(1000, "Insulin level too high"),
  skinThickness: z.number().min(0, "Skin thickness cannot be negative").max(99, "Skin thickness too high"),
  pregnancies: z.number().min(0, "Cannot be negative").max(20, "Value too high").int("Must be an integer"),
});

export type MedicalData = z.infer<typeof medicalMeasurementSchema>;

export type RiskLevel = 'Low' | 'Medium' | 'High';

export interface PredictionResult {
  riskLevel: RiskLevel;
  probability: number; // 0-100 percentage
  insights: string[];
}
