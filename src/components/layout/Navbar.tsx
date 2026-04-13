import { Activity, Moon, Sun, Menu, X, UserCircle, LogOut } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="glass sticky top-0 z-50 w-full border-b border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Activity className="h-8 w-8 text-[#0b5c92] dark:text-[#1ebd95] animate-pulse" />
            <span className="font-bold text-xl tracking-tight text-[#0b5c92] dark:text-[#1ebd95]">
              DiaDetect AI
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-[#1282c2] dark:hover:text-[#1ebd95] ${
                  location.pathname === link.path
                    ? 'text-[#0b5c92] dark:text-[#1ebd95]'
                    : 'text-[var(--text-muted)]'
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Check Risk CTA */}
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm text-[var(--text-main)] font-semibold">
                  <UserCircle className="w-5 h-5 text-[#0b5c92] dark:text-[#1ebd95]" />
                  <span>{user.name}</span>
                </div>
                <button
                  onClick={logout}
                  title="Logout"
                  className="bg-red-500/10 hover:bg-red-500/20 text-red-600 p-2 rounded-lg text-sm font-medium transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
                <Link
                  to="/predict"
                  className="bg-[#0b5c92] hover:bg-[#1282c2] text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-md hover:shadow-lg dark:bg-[#1ebd95] dark:hover:bg-[#1282c2] dark:text-gray-900"
                >
                  Check Your Risk
                </Link>
              </div>
            ) : (
                <Link
                  to="/login"
                  className="bg-[#0b5c92] hover:bg-[#1282c2] text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-md hover:shadow-lg dark:bg-[#1ebd95] dark:hover:bg-[#1282c2] dark:text-gray-900"
                >
                  Patient Login
                </Link>
            )}

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5 text-gray-600" />
              ) : (
                <Sun className="h-5 w-5 text-gray-300" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5 text-gray-600" />
              ) : (
                <Sun className="h-5 w-5 text-gray-300" />
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass border-b border-[var(--border-color)]">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === link.path
                    ? 'bg-[#0b5c92] text-white'
                    : 'text-[var(--text-main)] hover:bg-[#e2e8f0] dark:hover:bg-gray-800'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {user ? (
              <>
                <Link
                  to="/predict"
                  className="block w-full text-center mt-4 bg-[#0b5c92] hover:bg-[#1282c2] text-white px-4 py-2 rounded-lg text-base font-medium transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Check Your Risk
                </Link>
                <button
                  onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                  className="block w-full text-center mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-base font-medium transition-colors"
                >
                  Log Out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block w-full text-center mt-4 bg-[#0b5c92] hover:bg-[#1282c2] text-white px-4 py-2 rounded-lg text-base font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Patient Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
