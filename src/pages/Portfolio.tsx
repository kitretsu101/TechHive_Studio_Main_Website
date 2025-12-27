import { useEffect, useState } from 'react';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';

interface Project {
  id: string;
  title: string;
  description: string;
  problem: string;
  solution: string;
  tech_stack: string[];
  outcome: string;
  image_url: string;
  category: string;
}

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', ...Array.from(new Set(projects.map(p => p.category)))];

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-950 pt-24 pb-20">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
            <span className="text-blue-400 text-sm font-medium">Case Studies</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Our Portfolio
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Explore our recent projects and see how we've helped businesses achieve their goals
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                  : 'bg-gray-900/50 border border-blue-500/20 text-gray-300 hover:border-blue-500/40'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="space-y-16">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className={`grid md:grid-cols-2 gap-8 items-center ${
                  index % 2 === 1 ? 'md:grid-flow-dense' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'md:col-start-2' : ''}>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-2xl group-hover:blur-3xl transition-all"></div>
                    <div className="relative rounded-2xl border border-blue-500/20 bg-gray-900/50 backdrop-blur-xl overflow-hidden">
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-auto transform group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>

                <div className={index % 2 === 1 ? 'md:col-start-1 md:row-start-1' : ''}>
                  <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
                    {project.category}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    {project.title}
                  </h2>
                  <p className="text-gray-400 mb-6 text-lg">{project.description}</p>

                  <div className="space-y-6 mb-6">
                    <div>
                      <h3 className="text-white font-semibold mb-2">Problem</h3>
                      <p className="text-gray-400">{project.problem}</p>
                    </div>

                    <div>
                      <h3 className="text-white font-semibold mb-2">Solution</h3>
                      <p className="text-gray-400">{project.solution}</p>
                    </div>

                    <div>
                      <h3 className="text-white font-semibold mb-2">Outcome</h3>
                      <p className="text-gray-400">{project.outcome}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-white font-semibold mb-3">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tech_stack.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                    <span>View Case Study</span>
                    <ExternalLink size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="relative rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-xl p-12 md:p-16 overflow-hidden mt-20">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
          <div className="relative text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Let's Create Your Success Story
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Ready to build something extraordinary? Get in touch and let's discuss your project.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center space-x-2 px-8 py-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold transition-all"
            >
              <span>Start Your Project</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
