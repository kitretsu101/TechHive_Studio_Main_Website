import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative border-t border-blue-500/10 mt-24">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-950/20"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center space-x-3 group mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur-lg opacity-50"></div>
                <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
                  <div className="w-8 h-8 bg-gray-950 rounded flex items-center justify-center">
                    <span className="text-blue-400 font-bold text-lg">TH</span>
                  </div>
                </div>
              </div>
              <span className="text-2xl font-bold text-white">
                TechHive<span className="text-blue-400">Studio</span>
              </span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              Building scalable software and designing digital excellence. Your trusted partner for modern web solutions and technical consulting.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 transition-all"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 transition-all"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 transition-all"
              >
                <Twitter size={20} />
              </a>
              <a
                href="mailto:hello@techhivestudio.com"
                className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 transition-all"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/engineers" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Our Engineers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Get Started</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Start a Project
                </Link>
              </li>
              <li>
                <Link to="/contribute" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Contribute
                </Link>
              </li>
              <li>
                <a href="mailto:hello@techhivestudio.com" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-500/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © 2024 TechHive Studio. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-blue-400 text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 hover:text-blue-400 text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
