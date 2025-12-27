import { useState, FormEvent } from 'react';
import { Users, Code, Rocket, CheckCircle, Send } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Contribute() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    expertise: '',
    portfolio_url: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const { error: submitError } = await supabase
        .from('contributions')
        .insert([formData]);

      if (submitError) throw submitError;

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        expertise: '',
        portfolio_url: '',
        message: '',
      });
    } catch (err) {
      setError('Failed to submit application. Please try again.');
      console.error('Error submitting contribution:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-950 pt-24 pb-20">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
            <span className="text-blue-400 text-sm font-medium">Join Our Network</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Collaborate With Us
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We're always looking for talented developers and designers to join our collaborative network
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Why Contribute?</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <Users className="text-blue-400" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Join a Dynamic Team</h3>
                  <p className="text-gray-400">
                    Work alongside talented professionals on cutting-edge projects. Expand your network and learn from industry experts.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <Code className="text-blue-400" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Work on Exciting Projects</h3>
                  <p className="text-gray-400">
                    Contribute to diverse, challenging projects across various industries. Build your portfolio with high-quality work.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <Rocket className="text-blue-400" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Flexible Opportunities</h3>
                  <p className="text-gray-400">
                    Choose projects that match your interests and schedule. Work remotely on your own terms with competitive compensation.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 rounded-2xl border border-blue-500/20 bg-gray-900/50 backdrop-blur-xl">
              <h3 className="text-white font-semibold mb-4">We're Looking For:</h3>
              <ul className="space-y-3">
                {[
                  'Full-Stack Developers',
                  'Frontend Specialists',
                  'Backend Engineers',
                  'UI/UX Designers',
                  'DevOps Engineers',
                  'Database Architects',
                ].map((role, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <CheckCircle className="text-blue-400 flex-shrink-0" size={20} />
                    <span className="text-gray-300">{role}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-2xl"></div>
            <div className="relative rounded-2xl border border-blue-500/20 bg-gray-900/50 backdrop-blur-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Apply Now</h2>

              {success && (
                <div className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                  <p className="text-green-400 font-medium">
                    Application submitted successfully! We'll review your profile and get back to you soon.
                  </p>
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                  <p className="text-red-400 font-medium">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-white font-medium mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-blue-500/20 text-white placeholder-gray-500 focus:border-blue-500/40 focus:outline-none transition-colors"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-white font-medium mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-blue-500/20 text-white placeholder-gray-500 focus:border-blue-500/40 focus:outline-none transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="expertise" className="block text-white font-medium mb-2">
                    Area of Expertise *
                  </label>
                  <select
                    id="expertise"
                    name="expertise"
                    value={formData.expertise}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-blue-500/20 text-white focus:border-blue-500/40 focus:outline-none transition-colors"
                  >
                    <option value="">Select your expertise</option>
                    <option value="Full-Stack Development">Full-Stack Development</option>
                    <option value="Frontend Development">Frontend Development</option>
                    <option value="Backend Development">Backend Development</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="DevOps">DevOps</option>
                    <option value="Database Architecture">Database Architecture</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="portfolio_url" className="block text-white font-medium mb-2">
                    Portfolio / GitHub URL
                  </label>
                  <input
                    type="url"
                    id="portfolio_url"
                    name="portfolio_url"
                    value={formData.portfolio_url}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-blue-500/20 text-white placeholder-gray-500 focus:border-blue-500/40 focus:outline-none transition-colors"
                    placeholder="https://github.com/yourusername"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-white font-medium mb-2">
                    Tell Us About Yourself *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-blue-500/20 text-white placeholder-gray-500 focus:border-blue-500/40 focus:outline-none transition-colors resize-none"
                    placeholder="Share your experience, skills, and what excites you about joining our team..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center space-x-2 px-8 py-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Application</span>
                      <Send size={20} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
