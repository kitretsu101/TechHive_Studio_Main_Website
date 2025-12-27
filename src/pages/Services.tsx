import { Link } from 'react-router-dom';
import { Palette, Code, Database, Wrench, TrendingUp, Clock, CheckCircle, ArrowRight } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: Palette,
      title: 'UI/UX Design for Web & Mobile',
      description: 'Create stunning, user-centric interfaces that drive engagement and conversions.',
      features: [
        'User research and persona development',
        'Wireframing and prototyping',
        'Complete design systems',
        'Mobile-first responsive design',
        'Accessibility compliance',
        'Usability testing and iteration',
      ],
      technologies: ['Figma', 'Adobe XD', 'Sketch', 'InVision', 'Principle'],
    },
    {
      icon: Code,
      title: 'Full-Stack Development',
      description: 'Build robust, scalable applications using cutting-edge technologies and best practices.',
      features: [
        'Custom web application development',
        'RESTful & GraphQL API design',
        'Real-time features with WebSockets',
        'Progressive Web Apps (PWA)',
        'Microservices architecture',
        'CI/CD pipeline setup',
      ],
      technologies: ['React', 'Node.js', 'Python', 'Java', 'PostgreSQL', 'MongoDB'],
    },
    {
      icon: Database,
      title: 'Database Setup & Management',
      description: 'Design and optimize database architecture for performance, scalability, and reliability.',
      features: [
        'Database schema design',
        'Query optimization',
        'Data migration services',
        'Backup and recovery solutions',
        'Performance monitoring',
        'Security hardening',
      ],
      technologies: ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL', 'Elasticsearch'],
    },
    {
      icon: Wrench,
      title: 'Debugging & Performance Optimization',
      description: 'Identify and resolve complex issues, optimize performance, and improve code quality.',
      features: [
        'Code review and analysis',
        'Performance profiling',
        'Memory leak detection',
        'Load testing and optimization',
        'Security vulnerability assessment',
        'Technical debt reduction',
      ],
      technologies: ['Chrome DevTools', 'Lighthouse', 'New Relic', 'Sentry', 'DataDog'],
    },
    {
      icon: TrendingUp,
      title: 'Maintenance & Scaling',
      description: 'Ensure your application grows smoothly with your business needs.',
      features: [
        'Application monitoring',
        'Infrastructure scaling',
        'Load balancing setup',
        'CDN integration',
        'Caching strategies',
        'Auto-scaling configuration',
      ],
      technologies: ['AWS', 'Docker', 'Kubernetes', 'Nginx', 'CloudFlare'],
    },
    {
      icon: Clock,
      title: 'Technical Consulting & Support',
      description: 'Expert guidance and round-the-clock support to keep your project on track.',
      features: [
        'Architecture consultation',
        'Technology stack selection',
        'Code audits and reviews',
        '24/7 emergency support',
        'Team training and mentoring',
        'Documentation and knowledge transfer',
      ],
      technologies: ['Custom Solutions', 'Best Practices', 'Industry Standards'],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-950 pt-24 pb-20">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
            <span className="text-blue-400 text-sm font-medium">Our Expertise</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Comprehensive Development Services
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            From initial concept to ongoing maintenance, we provide end-to-end solutions. Hire us for the complete product or individual services.
          </p>
        </div>

        <div className="space-y-8 mb-20">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative rounded-2xl border border-blue-500/20 bg-gray-900/50 backdrop-blur-xl overflow-hidden hover:border-blue-500/40 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-300"></div>

              <div className="relative p-8 md:p-10">
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="md:col-span-1">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <service.icon className="text-blue-400" size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                    <p className="text-gray-400 mb-6">{service.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {service.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <h4 className="text-lg font-semibold text-white mb-4">What's Included:</h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start space-x-3">
                          <CheckCircle className="text-blue-400 flex-shrink-0 mt-0.5" size={20} />
                          <span className="text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="relative rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-xl p-12 md:p-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
          <div className="relative">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-white mb-6">
                  Flexible Hiring Options
                </h2>
                <p className="text-gray-300 text-lg mb-8">
                  Whether you need a complete product built from scratch or specific services to complement your existing team, we're here to help.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="text-blue-400 flex-shrink-0 mt-1" size={24} />
                    <div>
                      <div className="text-white font-semibold mb-1">Full Product Development</div>
                      <div className="text-gray-400">End-to-end solution from concept to deployment</div>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="text-blue-400 flex-shrink-0 mt-1" size={24} />
                    <div>
                      <div className="text-white font-semibold mb-1">Individual Services</div>
                      <div className="text-gray-400">Pick specific services that match your needs</div>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="text-blue-400 flex-shrink-0 mt-1" size={24} />
                    <div>
                      <div className="text-white font-semibold mb-1">Dedicated Teams</div>
                      <div className="text-gray-400">Work with our experienced engineers full-time</div>
                    </div>
                  </li>
                </ul>
                <Link
                  to="/contact"
                  className="inline-flex items-center space-x-2 px-8 py-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold transition-all"
                >
                  <span>Discuss Your Project</span>
                  <ArrowRight size={20} />
                </Link>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-2xl"></div>
                <div className="relative grid grid-cols-2 gap-4">
                  <div className="rounded-xl border border-blue-500/20 bg-gray-900/50 backdrop-blur-xl p-6 text-center">
                    <div className="text-3xl font-bold text-white mb-2">50+</div>
                    <div className="text-gray-400 text-sm">Projects Completed</div>
                  </div>
                  <div className="rounded-xl border border-blue-500/20 bg-gray-900/50 backdrop-blur-xl p-6 text-center">
                    <div className="text-3xl font-bold text-white mb-2">15+</div>
                    <div className="text-gray-400 text-sm">Technologies</div>
                  </div>
                  <div className="rounded-xl border border-blue-500/20 bg-gray-900/50 backdrop-blur-xl p-6 text-center">
                    <div className="text-3xl font-bold text-white mb-2">100%</div>
                    <div className="text-gray-400 text-sm">Client Satisfaction</div>
                  </div>
                  <div className="rounded-xl border border-blue-500/20 bg-gray-900/50 backdrop-blur-xl p-6 text-center">
                    <div className="text-3xl font-bold text-white mb-2">24/7</div>
                    <div className="text-gray-400 text-sm">Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
