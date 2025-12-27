import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Github, Linkedin, ExternalLink, ArrowLeft, Briefcase } from 'lucide-react';
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

interface Project {
  id: string;
  title: string;
  description: string;
  tech_stack: string[];
  image_url: string;
  category: string;
  contribution: string;
}

export default function EngineerPortfolio() {
  const { id } = useParams<{ id: string }>();
  const [engineer, setEngineer] = useState<Engineer | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadEngineerData(id);
    }
  }, [id]);

  const loadEngineerData = async (engineerId: string) => {
    try {
      const { data: engineerData, error: engineerError } = await supabase
        .from('engineers')
        .select('*')
        .eq('id', engineerId)
        .maybeSingle();

      if (engineerError) throw engineerError;
      setEngineer(engineerData);

      const { data: projectsData, error: projectsError } = await supabase
        .from('engineer_projects')
        .select(`
          contribution,
          projects (
            id,
            title,
            description,
            tech_stack,
            image_url,
            category
          )
        `)
        .eq('engineer_id', engineerId);

      if (projectsError) throw projectsError;

      const formattedProjects = projectsData?.map((ep: any) => ({
        ...ep.projects,
        contribution: ep.contribution,
      })) || [];

      setProjects(formattedProjects);
    } catch (error) {
      console.error('Error loading engineer data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!engineer) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Engineer not found</h2>
          <Link to="/engineers" className="text-blue-400 hover:text-blue-300">
            Back to Engineers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 pt-24 pb-20">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/engineers"
          className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          <span>Back to Engineers</span>
        </Link>

        <div className="grid md:grid-cols-3 gap-12 mb-16">
          <div className="md:col-span-1">
            <div className="relative rounded-2xl border border-blue-500/20 bg-gray-900/50 backdrop-blur-xl overflow-hidden sticky top-28">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>

              <div className="relative p-6">
                <div className="relative mb-6 overflow-hidden rounded-xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20"></div>
                  <img
                    src={engineer.photo_url}
                    alt={engineer.name}
                    className="relative w-full aspect-square object-cover"
                  />
                </div>

                <h1 className="text-3xl font-bold text-white mb-2">{engineer.name}</h1>
                <p className="text-blue-400 font-medium mb-6">{engineer.role}</p>

                <p className="text-gray-400 mb-6 leading-relaxed">{engineer.bio}</p>

                <div className="flex items-center space-x-3 mb-6">
                  <a
                    href={engineer.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center space-x-2 p-3 rounded-lg bg-white/5 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 transition-all"
                  >
                    <Github size={20} />
                    <span className="text-sm font-medium">GitHub</span>
                  </a>
                  <a
                    href={engineer.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center space-x-2 p-3 rounded-lg bg-white/5 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 transition-all"
                  >
                    <Linkedin size={20} />
                    <span className="text-sm font-medium">LinkedIn</span>
                  </a>
                </div>

                {engineer.portfolio_url && (
                  <a
                    href={engineer.portfolio_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 w-full p-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold transition-all"
                  >
                    <span>View Portfolio</span>
                    <ExternalLink size={18} />
                  </a>
                )}

                <div className="mt-6 pt-6 border-t border-blue-500/20">
                  <h3 className="text-white font-semibold mb-3">Skills & Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {engineer.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-6">
                <Briefcase className="text-blue-400" size={28} />
                <h2 className="text-3xl font-bold text-white">Project Contributions</h2>
              </div>
              <p className="text-gray-400 text-lg">
                Projects that {engineer.name.split(' ')[0]} has contributed to at TechHive Studio
              </p>
            </div>

            {projects.length === 0 ? (
              <div className="rounded-2xl border border-blue-500/20 bg-gray-900/50 backdrop-blur-xl p-12 text-center">
                <p className="text-gray-400">No projects to display yet</p>
              </div>
            ) : (
              <div className="space-y-8">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="group relative rounded-2xl border border-blue-500/20 bg-gray-900/50 backdrop-blur-xl overflow-hidden hover:border-blue-500/40 transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-300"></div>

                    <div className="relative grid md:grid-cols-5 gap-6 p-6">
                      <div className="md:col-span-2">
                        <div className="relative overflow-hidden rounded-lg">
                          <img
                            src={project.image_url}
                            alt={project.title}
                            className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      </div>

                      <div className="md:col-span-3">
                        <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-3">
                          {project.category}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                        <p className="text-gray-400 mb-4">{project.description}</p>

                        {project.contribution && (
                          <div className="mb-4 p-3 rounded-lg bg-blue-500/5 border border-blue-500/20">
                            <p className="text-sm text-gray-400">
                              <span className="text-blue-400 font-semibold">Contribution: </span>
                              {project.contribution}
                            </p>
                          </div>
                        )}

                        <div className="flex flex-wrap gap-2">
                          {project.tech_stack.map((tech, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
