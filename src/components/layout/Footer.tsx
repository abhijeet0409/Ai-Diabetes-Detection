import { Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[var(--surface-color)] border-t border-[var(--border-color)] mt-auto w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Activity className="h-6 w-6 text-[#0b5c92] dark:text-[#1ebd95]" />
              <span className="font-bold text-lg tracking-tight text-[#0b5c92] dark:text-[#1ebd95]">
                DiaDetect AI
              </span>
            </Link>
            <p className="text-[var(--text-muted)] text-sm mb-4 leading-relaxed max-w-md">
              A modern medical application leveraging artificial intelligence for early 
              diabetes detection based on clinical, lifestyle, and historical data.
            </p>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 mb-6">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-yellow-700 dark:text-yellow-400 font-medium">
                    ⚠️ Disclaimer (IMPORTANT)
                  </p>
                  <p className="text-sm text-yellow-600 dark:text-yellow-500 mt-1">
                    This system provides AI-based predictions and is not a substitute for professional medical advice.
                  </p>
                </div>
              </div>
            </div>

          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-[var(--text-main)]">
              Navigation
            </h3>
            <ul className="space-y-3 shrink-0">
              <li>
                <Link to="/" className="text-sm text-[var(--text-muted)] hover:text-[#0b5c92] dark:hover:text-[#1ebd95] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/predict" className="text-sm text-[var(--text-muted)] hover:text-[#0b5c92] dark:hover:text-[#1ebd95] transition-colors">
                  Risk Assessment
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-[var(--text-muted)] hover:text-[#0b5c92] dark:hover:text-[#1ebd95] transition-colors">
                  About AI Model
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-[var(--text-muted)] hover:text-[#0b5c92] dark:hover:text-[#1ebd95] transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-[var(--text-main)]">
              Connect
            </h3>
            <ul className="space-y-3 shrink-0">
              <li>
                <a href="https://engineer-abhijeet.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--text-muted)] hover:text-[#0b5c92] dark:hover:text-[#1ebd95] transition-colors">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/abhijeet-sharma-a87b30264" target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--text-muted)] hover:text-[#0b5c92] dark:hover:text-[#1ebd95] transition-colors">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://github.com/abhijeet0409" target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--text-muted)] hover:text-[#0b5c92] dark:hover:text-[#1ebd95] transition-colors">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t border-[var(--border-color)] pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-[var(--text-muted)]">
          <p>© {new Date().getFullYear()} DiaDetect AI. All rights reserved.</p>
          <p className="mt-4 md:mt-0 font-medium">
            Made by <a href="https://www.linkedin.com/in/abhijeet-sharma-a87b30264" target="_blank" rel="noopener noreferrer" className="text-[#0b5c92] dark:text-[#1ebd95] hover:underline">Abhijeet Sharma</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
