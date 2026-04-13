🧠 AI-Based Early Diabetes Detection System

A modern, responsive web application that uses medical input data to predict the risk of diabetes at an early stage using AI-based logic. The system generates a detailed health report, provides basic prescription suggestions, and recommends nearby hospitals based on user location.

🚀 Features
📥 Medical Data Input Form
Age, BMI, Glucose, Blood Pressure, Insulin, Skin Thickness, Pregnancies
Input validation with realistic ranges
🤖 AI-Based Risk Prediction
Classifies risk as Low / Medium / High
Displays probability and insights
📊 Report Generation
Generates a professional medical report
Includes inputs, results, and recommendations
📄 Downloadable as PDF
🩺 Prescription Generator
Lifestyle suggestions
Diet recommendations
Exercise guidance
📍 Hospital Recommendation System
Uses Geolocation API
Suggests nearby hospitals
🌙 Dual Theme Support
Light & Dark mode toggle
Persistent theme using localStorage
📱 Fully Responsive
Mobile-first design
Works across all devices
⚙️ Tech Stack
Frontend: React + TypeScript
Build Tool: Vite
Styling: Tailwind CSS
State Management: React Hooks
PDF Generation: jsPDF / html2canvas (or equivalent)
Icons: Lucide / FontAwesome
📂 Project Structure
src/
│── components/     # Reusable UI components
│── pages/          # Main pages (Home, Dashboard, etc.)
│── utils/          # Helper functions
│── assets/         # Images & icons
│── App.tsx         # Main app component
│── main.tsx        # Entry point
🛠️ Installation & Setup
1. Clone the repository
git clone https://github.com/your-username/diabetes-detection.git
cd diabetes-detection
2. Install dependencies
npm install
3. Run development server
npm run dev
4. Build for production
npm run build
🌐 Usage
Open the app in your browser
Enter medical details in the form
Click “Execute Model Run”
View:
Risk prediction
AI-generated report
Prescription suggestions
Nearby hospitals
Download the report as PDF
⚠️ Disclaimer

This system provides AI-based predictions and recommendations.
It is not a substitute for professional medical advice. Always consult a qualified doctor for medical decisions.

🎨 Customization
Update styles in Tailwind config
Modify prediction logic in utils/
Integrate real ML model via API (Python/Node backend)
🔮 Future Improvements
Real ML model integration
User authentication & history tracking
Advanced analytics dashboard
Integration with wearable health devices
🙌 Acknowledgements
React & Vite community
Open-source libraries used in this project
🔗 Author

Made by Abhijeet Sharma
