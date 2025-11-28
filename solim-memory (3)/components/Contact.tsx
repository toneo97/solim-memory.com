import React, { useState } from 'react';
import { Send } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    alert("Thank you for your message. We'll be in touch soon.");
  };

  return (
    <section id="contact" className="py-32 bg-slate-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -left-20 top-20 w-96 h-96 bg-white rounded-full blur-3xl opacity-60"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-serif text-slate-900 mb-4">Get in Touch</h2>
          <p className="text-slate-500">
            If you have questions about memory reLIV or want support, we’re here to help.
          </p>
        </div>

        <div className="bg-white border border-slate-100 rounded-[2rem] p-8 md:p-12 shadow-xl shadow-slate-200/50">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-slate-700 ml-1">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400 transition-all placeholder-slate-400"
                  placeholder="Your full name"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-slate-700 ml-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400 transition-all placeholder-slate-400"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-slate-700 ml-1">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400 transition-all placeholder-slate-400 resize-none"
                placeholder="How can we help you?"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 text-white font-semibold py-4 rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 group shadow-lg shadow-slate-900/10"
            >
              Send Message
              <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;