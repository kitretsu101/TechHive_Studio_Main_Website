import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, ExternalLink } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Engineer {
  id: string;
  name: string;
  role: string;
  bio: string;
  skills: string[];
  photo_url: string;
  github_url: string;
  linkedin_url: string;
  portfolio_url: string;
}

export default function Engineers() {
  const [engineers, setEngineers] = useState<Engineer[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState<string>('all');

  useEffect(() => {
    loadEngineers();
  }, []);

  const loadEngineers = async () => {
    try {
      const { data, error } = await supabase
        .from('engineers')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      setEngineers(data || []);
    } catch (error) {
      console.error('Error loading engineers:', error);
    } finally {
      setLoading(false);
    }
  };

  const roles = ['all', ...Array.from(new Set(engineers.map(e => e.role)))];

  const filteredEngineers = selectedRole === 'all'
    ? engineers
    : engineers.filter(e => e.role === selectedRole);

  return (
    <div className="min-h-screen bg-gray-950 pt-24 pb-20">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
            <span className="text-blue-400 text-sm font-medium">Meet the Team</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Our Expert Engineers
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A talented team of designers and developers passionate about creating exceptional digital experiences
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {roles.map((role) => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                selectedRole === role
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                  : 'bg-gray-900/50 border border-blue-500/20 text-gray-300 hover:border-blue-500/40'
              }`}
            >
              {role === 'all' ? 'All' : role}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredEngineers.map((engineer) => (
              <Link
                key={engineer.id}
                to={`/engineer/${engineer.id}`}
                className="group relative rounded-2xl border border-blue-500/20 bg-gray-900/50 backdrop-blur-xl overflow-hidden hover:border-blue-500/40 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-300"></div>

                <div className="relative p-6">
                  <div className="relative mb-6 overflow-hidden rounded-xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 group-hover:scale-110 transition-transform duration-500"></div>
                    <img
                      src={engineer.photo_url}
                      alt={engineer.name}
                      className="relative w-full aspect-square object-cover"
                    />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {engineer.name}
                  </h3>

                  <p className="text-blue-400 text-sm font-medium mb-3">{engineer.role}</p>

                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">{engineer.bio}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {engineer.skills.slice(0, 3).map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                    {engineer.skills.length > 3 && (
                      <span className="px-2 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs">
                        +{engineer.skills.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center space-x-3">
                    <a
                      href={engineer.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 transition-all"
                    >
                      <Github size={16} />
                    </a>
                    <a
                      href={engineer.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 transition-all"
                    >
                      <Linkedin size={16} />
                    </a>
                    {engineer.portfolio_url && (
                      <a
                        href={engineer.portfolio_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 transition-all"
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
            ))}
          </div>
        )}

        <div className="relative rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-xl p-12 md:p-16 overflow-hidden mt-20">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
          <div className="relative text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Want to Join Our Team?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              We're always looking for talented developers and designers to collaborate with
            </p>
            <Link
              to="/contribute"
              className="inline-flex items-center space-x-2 px-8 py-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold transition-all"
            >
              <span>Apply Now</span>
              <ExternalLink size={20} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
