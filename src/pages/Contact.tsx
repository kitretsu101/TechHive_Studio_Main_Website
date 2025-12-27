import { useState, FormEvent } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project_type: '',
    budget_range: '',
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
        .from('inquiries')
        .insert([formData]);

      if (submitError) throw submitError;

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        project_type: '',
        budget_range: '',
        message: '',
      });
    } catch (err) {
      setError('Failed to submit inquiry. Please try again.');
      console.error('Error submitting inquiry:', err);
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
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
            <span className="text-blue-400 text-sm font-medium">Get In Touch</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Let's Build Something Great
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Tell us about your project and we'll get back to you within 24 hours
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
            <div className="relative rounded-2xl border border-blue-500/20 bg-gray-900/50 backdrop-blur-xl p-8 text-center">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mx-auto mb-4">
                <Mail className="text-blue-400" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Email Us</h3>
              <a href="mailto:hello@techhivestudio.com" className="text-gray-400 hover:text-blue-400 transition-colors">
                hello@techhivestudio.com
              </a>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
            <div className="relative rounded-2xl border border-blue-500/20 bg-gray-900/50 backdrop-blur-xl p-8 text-center">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mx-auto mb-4">
                <Phone className="text-blue-400" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Call Us</h3>
              <a href="tel:+1234567890" className="text-gray-400 hover:text-blue-400 transition-colors">
                +1 (234) 567-890
              </a>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
            <div className="relative rounded-2xl border border-blue-500/20 bg-gray-900/50 backdrop-blur-xl p-8 text-center">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-blue-400" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Visit Us</h3>
              <p className="text-gray-400">
                Remote & Global<br />Serving Clients Worldwide
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-2xl"></div>
            <div className="relative rounded-2xl border border-blue-500/20 bg-gray-900/50 backdrop-blur-xl p-8 md:p-12">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Start Your Project</h2>

              {success && (
                <div className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                  <p className="text-green-400 font-medium">
                    Thank you for your inquiry! We'll review your request and get back to you within 24 hours.
                  </p>
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                  <p className="text-red-400 font-medium">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-white font-medium mb-2">
                      Your Name *
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
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="project_type" className="block text-white font-medium mb-2">
                      Project Type *
                    </label>
                    <select
                      id="project_type"
                      name="project_type"
                      value={formData.project_type}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-blue-500/20 text-white focus:border-blue-500/40 focus:outline-none transition-colors"
                    >
                      <option value="">Select a service</option>
                      <option value="UI/UX Design">UI/UX Design</option>
                      <option value="Full-Stack Development">Full-Stack Development</option>
                      <option value="Database Engineering">Database Engineering</option>
                      <option value="Technical Consulting">Technical Consulting</option>
                      <option value="Maintenance & Scaling">Maintenance & Scaling</option>
                      <option value="Complete Product">Complete Product</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="budget_range" className="block text-white font-medium mb-2">
                      Budget Range
                    </label>
                    <select
                      id="budget_range"
                      name="budget_range"
                      value={formData.budget_range}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-blue-500/20 text-white focus:border-blue-500/40 focus:outline-none transition-colors"
                    >
                      <option value="">Select budget range</option>
                      <option value="< $5,000">Less than $5,000</option>
                      <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                      <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                      <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                      <option value="$50,000+">$50,000+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-white font-medium mb-2">
                    Project Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-blue-500/20 text-white placeholder-gray-500 focus:border-blue-500/40 focus:outline-none transition-colors resize-none"
                    placeholder="Tell us about your project, your goals, timeline, and any specific requirements or challenges you're facing..."
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
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Inquiry</span>
                      <Send size={20} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-4">Prefer a different method?</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:hello@techhivestudio.com"
              className="px-6 py-3 rounded-lg border border-blue-500/20 bg-gray-900/50 text-white hover:bg-blue-500/10 hover:border-blue-500/40 transition-all"
            >
              Email Us Directly
            </a>
            <a
              href="https://calendly.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg border border-blue-500/20 bg-gray-900/50 text-white hover:bg-blue-500/10 hover:border-blue-500/40 transition-all"
            >
              Schedule a Call
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
