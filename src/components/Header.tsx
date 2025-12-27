import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Our Engineers', path: '/engineers' },
    { name: 'Contribute', path: '/contribute' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-blue-500/10">
      <div className="absolute inset-0 bg-gray-950/80 backdrop-blur-xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
                <div className="w-8 h-8 bg-gray-950 rounded flex items-center justify-center">
                  <span className="text-blue-400 font-bold text-lg">TH</span>
                </div>
              </div>
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">
              TechHive<span className="text-blue-400">Studio</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-blue-500/10 text-blue-400'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Link
              to="/contact"
              className="relative group px-6 py-2.5 rounded-lg overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-100 group-hover:opacity-90 transition-opacity"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="relative text-white font-semibold text-sm">Start a Project</span>
            </Link>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-300 hover:text-white"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-blue-500/10">
          <div className="absolute inset-0 bg-gray-950/95 backdrop-blur-xl"></div>
          <nav className="relative px-4 py-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  isActive(item.path)
                    ? 'bg-blue-500/10 text-blue-400'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-center px-4 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-sm"
            >
              Start a Project
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
