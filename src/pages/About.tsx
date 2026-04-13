import { Brain, HeartPulse, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="min-h-screen bg-[var(--bg-color)] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
            <Brain className="w-10 h-10 text-[#0b5c92] dark:text-[#1ebd95]" />
          </div>
          <h1 className="text-4xl font-extrabold text-[var(--text-main)] tracking-tight">
            Role of AI in Early Diabetes Detection
          </h1>
          <p className="text-xl text-[var(--text-muted)] max-w-2xl mx-auto">
            Understanding how artificial intelligence is shaping the future of proactive healthcare.
          </p>
        </div>

        {/* Content Blocks */}
        <div className="space-y-12">
          
          {/* Section 1 */}
          <div className="glass p-8 rounded-2xl border border-[var(--border-color)] flex flex-col md:flex-row gap-8 items-start animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-150">
            <div className="flex-shrink-0 bg-teal-100 dark:bg-teal-900/40 p-4 rounded-xl">
              <HeartPulse className="w-8 h-8 text-[#0b5c92] dark:text-[#1ebd95]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[var(--text-main)] mb-4">The Need for Early Diagnosis</h2>
              <p className="text-[var(--text-muted)] leading-relaxed mb-4">
                Diabetes is a chronic condition that, if left undetected, can lead to severe complications including neuropathy, retinopathy, and cardiovascular disease. Early diagnosis is the most critical factor in managing and even reversing the progression of the disease through lifestyle modifications and timely medical intervention.
              </p>
              <p className="text-[var(--text-muted)] leading-relaxed">
                Unfortunately, millions of people remain undiagnosed because early symptoms are often mild or non-existent. Proactive screening is essential for identifying at-risk individuals before complications arise.
              </p>
            </div>
          </div>

          {/* Section 2 */}
          <div className="glass p-8 rounded-2xl border border-[var(--border-color)] flex flex-col md:flex-row gap-8 items-start animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900/40 p-4 rounded-xl">
              <Activity className="w-8 h-8 text-[#0b5c92] dark:text-[#1ebd95]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[var(--text-main)] mb-4">How AI Bridges the Gap</h2>
              <p className="text-[var(--text-muted)] leading-relaxed mb-4">
                Artificial Intelligence models excel at recognizing complex patterns in multidimensional data that might be subtle to the human eye. By analyzing inputs such as age, BMI, glucose levels, insulin levels, and blood pressure, machine learning algorithms can predict the probability of diabetes with high accuracy.
              </p>
              <ul className="list-disc pl-5 text-[var(--text-muted)] space-y-2 mt-4">
                <li><strong>Pattern Recognition:</strong> Correlating non-obvious health metrics.</li>
                <li><strong>Scalability:</strong> Providing instant preliminary assessments globally.</li>
                <li><strong>Personalized Insights:</strong> Tailoring recommendations based on specific risk factors.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-[#0b5c92] text-white dark:bg-[#1e293b] dark:text-[var(--text-main)] rounded-2xl p-10 border border-transparent dark:border-[var(--border-color)] shadow-xl animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
          <h3 className="text-2xl font-bold mb-4">Take Control of Your Health</h3>
          <p className="text-blue-100 dark:text-[var(--text-muted)] mb-8 max-w-xl mx-auto">
            Use our AI model to get an instant preliminary assessment of your diabetes risk. It's fast, secure, and completely free.
          </p>
          <Link
            to="/predict"
            className="inline-block bg-white text-[#0b5c92] hover:bg-gray-100 px-8 py-3 rounded-xl font-bold shadow-md transition-colors dark:bg-[#1ebd95] dark:text-gray-900 dark:hover:bg-[#1282c2]"
          >
            Start Risk Assessment
          </Link>
        </div>

      </div>
    </div>
  );
}
