import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Star, MessageSquare, Zap, ArrowRight, Building2, User, Mail, Globe } from 'lucide-react';

export default function BookDemo() {
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    website: '',
    volume: '10k-50k'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-white pt-24 md:pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Left Column: Value Prop & Social Proof */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:sticky lg:top-32"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs md:text-sm font-medium mb-6 border border-emerald-100">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              Live Demo Available
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-950 mb-6 leading-tight">
              See how top brands automate <span className="text-gradient">social revenue.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed max-w-lg">
              Get a personalized walkthrough of GrowthSync. We'll show you exactly how to turn your Instagram DMs and comments into a predictable sales channel.
            </p>

            <div className="space-y-6 mb-12">
              {[
                "Custom ROI analysis for your brand",
                "Live walkthrough of the AI agent builder",
                "Strategies for your specific product catalog",
                "Pricing and implementation timeline"
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-violet-600" />
                  </div>
                  <p className="text-gray-700 font-medium">{item}</p>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-gray-900 font-medium text-lg mb-6 italic">
                "GrowthSync paid for itself in the first 48 hours. We automated our entire DM funnel and saw a 34% lift in conversion rate from social traffic."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop" 
                    alt="Sarah Jenkins"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <p className="font-bold text-gray-950">Sarah Jenkins</p>
                  <p className="text-sm text-gray-500">VP of Growth, Glossier</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-10 relative overflow-hidden"
          >
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-violet-50 to-pink-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="relative z-10">
              {isSuccess ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h3 className="text-3xl font-display font-bold text-gray-950 mb-4">You're on the list!</h3>
                  <p className="text-gray-600 text-lg mb-8 max-w-sm mx-auto">
                    Thanks for your interest. One of our growth specialists will be in touch within 24 hours to schedule your demo.
                  </p>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="px-6 py-3 rounded-full bg-gray-100 text-gray-900 font-medium hover:bg-gray-200 transition-colors"
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-display font-bold text-gray-950 mb-2">Book your demo</h3>
                  <p className="text-gray-500 mb-8">Fill out the form below and we'll be in touch shortly.</p>
                  
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label htmlFor="firstName" className="text-sm font-medium text-gray-700">First name</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-4 w-4 text-gray-400" />
                          </div>
                          <input 
                            type="text" 
                            id="firstName" 
                            name="firstName" 
                            required
                            value={formState.firstName}
                            onChange={handleChange}
                            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-gray-50 text-gray-900 transition-colors"
                            placeholder="Jane"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="lastName" className="text-sm font-medium text-gray-700">Last name</label>
                        <input 
                          type="text" 
                          id="lastName" 
                          name="lastName" 
                          required
                          value={formState.lastName}
                          onChange={handleChange}
                          className="block w-full px-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-gray-50 text-gray-900 transition-colors"
                          placeholder="Doe"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-gray-700">Work email</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-4 w-4 text-gray-400" />
                        </div>
                        <input 
                          type="email" 
                          id="email" 
                          name="email" 
                          required
                          value={formState.email}
                          onChange={handleChange}
                          className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-gray-50 text-gray-900 transition-colors"
                          placeholder="jane@company.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="company" className="text-sm font-medium text-gray-700">Company name</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Building2 className="h-4 w-4 text-gray-400" />
                        </div>
                        <input 
                          type="text" 
                          id="company" 
                          name="company" 
                          required
                          value={formState.company}
                          onChange={handleChange}
                          className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-gray-50 text-gray-900 transition-colors"
                          placeholder="Acme Corp"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="website" className="text-sm font-medium text-gray-700">Company website</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Globe className="h-4 w-4 text-gray-400" />
                        </div>
                        <input 
                          type="url" 
                          id="website" 
                          name="website" 
                          required
                          value={formState.website}
                          onChange={handleChange}
                          className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-gray-50 text-gray-900 transition-colors"
                          placeholder="https://acme.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="volume" className="text-sm font-medium text-gray-700">Monthly DM volume</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MessageSquare className="h-4 w-4 text-gray-400" />
                        </div>
                        <select 
                          id="volume" 
                          name="volume" 
                          value={formState.volume}
                          onChange={handleChange}
                          className="block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-gray-50 text-gray-900 transition-colors appearance-none"
                        >
                          <option value="<10k">Less than 10,000</option>
                          <option value="10k-50k">10,000 - 50,000</option>
                          <option value="50k-100k">50,000 - 100,000</option>
                          <option value=">100k">100,000+</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <ArrowRight className="h-4 w-4 text-gray-400 rotate-90" />
                        </div>
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl bg-gray-950 text-white font-semibold text-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        <>Get my demo <ArrowRight className="w-5 h-5" /></>
                      )}
                    </button>
                    
                    <p className="text-xs text-center text-gray-500 mt-4">
                      By submitting this form, you agree to our Privacy Policy and Terms of Service.
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
