import { Link } from 'react-router-dom';
import { ArrowRight, Palette, Code, Database, Wrench, TrendingUp, Users, Clock, Target } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Home() {
  const [metrics, setMetrics] = useState({
    satisfaction: 0,
    productivity: 0,
  });

  useEffect(() => {
    const animateMetrics = () => {
      const duration = 2000;
      const steps = 60;
      const increment = duration / steps;

      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        setMetrics({
          satisfaction: Math.floor(progress * 100),
          productivity: Math.floor(progress * 10),
        });

        if (step >= steps) clearInterval(timer);
      }, increment);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateMetrics();
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    const metricsElement = document.getElementById('metrics-section');
    if (metricsElement) observer.observe(metricsElement);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-blue-400 text-sm font-medium">Available for New Projects</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Building Scalable Software.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                Designing Digital Excellence.
              </span>
            </h1>

            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12">
              Elite software development agency delivering robust modern solutions, expert technical consulting, and premium UI/UX design services that drive results.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact"
                className="group relative px-8 py-4 rounded-lg overflow-hidden w-full sm:w-auto"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative flex items-center justify-center space-x-2 text-white font-semibold">
                  <span>Start a Project</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link
                to="/portfolio"
                className="group px-8 py-4 rounded-lg border border-blue-500/30 bg-blue-500/5 hover:bg-blue-500/10 text-white font-semibold transition-all w-full sm:w-auto text-center"
              >
                View Portfolio
              </Link>
            </div>
          </div>

          <div className="relative mt-20">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-3xl"></div>
            <div className="relative rounded-2xl border border-blue-500/20 bg-gray-900/50 backdrop-blur-xl p-8 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
              <img
                src="https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Modern Dashboard"
                className="relative w-full h-auto rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="relative py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              From concept to deployment, we provide comprehensive solutions tailored to your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Palette,
                title: 'UI/UX Design',
                description: 'Beautiful, intuitive interfaces that users love. Complete design systems for web and mobile applications.',
              },
              {
                icon: Code,
                title: 'Full-Stack Development',
                description: 'End-to-end development using modern technologies. MERN, Java, Python, or any tech stack you need.',
              },
              {
                icon: Database,
                title: 'Database Engineering',
                description: 'Robust database architecture, optimization, and management. PostgreSQL, MongoDB, Redis, and more.',
              },
              {
                icon: Wrench,
                title: 'Technical Consulting',
                description: 'Expert guidance on architecture, performance optimization, and debugging complex issues.',
              },
              {
                icon: TrendingUp,
                title: 'Scaling & Performance',
                description: 'Optimize your application for growth. Handle millions of users with confidence.',
              },
              {
                icon: Clock,
                title: '24/7 Support',
                description: 'Long-term maintenance and support to keep your application running smoothly.',
              },
            ].map((service, index) => (
              <div
                key={index}
                className="group relative rounded-2xl border border-blue-500/20 bg-gray-900/50 backdrop-blur-xl p-8 hover:border-blue-500/40 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 rounded-2xl transition-all duration-300"></div>
                <div className="relative">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <service.icon className="text-blue-400" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{service.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/services"
              className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 font-semibold transition-colors"
            >
              <span>View All Services</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>

      <div id="metrics-section" className="relative py-24 bg-gradient-to-b from-transparent to-blue-950/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
              <div className="relative rounded-2xl border border-blue-500/20 bg-gray-900/50 backdrop-blur-xl p-8 text-center">
                <div className="flex items-center justify-center mb-4">
                  <Target className="text-blue-400" size={48} />
                </div>
                <div className="text-5xl font-bold text-white mb-2">{metrics.satisfaction}%</div>
                <div className="text-gray-400 font-medium">Client Satisfaction</div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
              <div className="relative rounded-2xl border border-blue-500/20 bg-gray-900/50 backdrop-blur-xl p-8 text-center">
                <div className="flex items-center justify-center mb-4">
                  <TrendingUp className="text-blue-400" size={48} />
                </div>
                <div className="text-5xl font-bold text-white mb-2">{metrics.productivity}x</div>
                <div className="text-gray-400 font-medium">Productivity Increase</div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
              <div className="relative rounded-2xl border border-blue-500/20 bg-gray-900/50 backdrop-blur-xl p-8 text-center">
                <div className="flex items-center justify-center mb-4">
                  <Users className="text-blue-400" size={48} />
                </div>
                <div className="text-5xl font-bold text-white mb-2">24/7</div>
                <div className="text-gray-400 font-medium">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-xl p-12 md:p-16 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
            <div className="relative text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Build Something Amazing?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Let's discuss your project and create a solution that exceeds expectations
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center space-x-2 px-8 py-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold transition-all"
              >
                <span>Get Started Today</span>
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
