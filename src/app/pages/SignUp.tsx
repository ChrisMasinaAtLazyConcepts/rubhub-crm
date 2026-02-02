import React, { useState } from 'react';  // Combine them
import { Toaster, toast } from 'react-hot-toast';
import { useDatabase } from '../hooks/useDatabase';
import { 
  Star, Download, User, ArrowRight,
  Heart, Shield, CreditCard, Lock,
  Sparkles, TrendingUp, Users, Calendar,
  Zap, CheckCircle, Award, MapPin
} from 'lucide-react';


function SignUp() {
  const { saveTherapistData, isLoading } = useDatabase();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    cell: '',
    whatsapp: '',
    experience: '',
    speciality: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.cell) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    setLoading(true);
    
    // Use the hook to save to PostgreSQL
    const result = await saveTherapistData({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      cell: formData.cell,
      whatsapp: formData.whatsapp,
      experience: formData.experience,
      speciality: formData.speciality
    });

    setLoading(false);

    if (result.success) {
      // Reset form on success
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        cell: '',
        whatsapp: '',
        experience: '',
        speciality: '',
      });
      
      toast.success('Application submitted successfully!');
      console.log('Saved with ID:', result.data?.id);
    } else {
      toast.error(result.error || 'Failed to submit application');
    }
  };

  const specialities = [
    'Swedish Massage',
    'Deep Tissue',
    'Sports Massage',
    'Prenatal',
    'Reflexology',
    'Aromatherapy',
    'Hot Stone',
    'Thai Massage',
    'Shiatsu',
    'Corporate Wellness',
    'Mobile Spa Services'
  ];

return (
  <div className="min-h-screen bg-gradient-to-b from-[#F0FFF4] to-white flex flex-col">
      <Toaster position="top-right" />
      {/* Navigation */}
      <nav className="bg-white border-b border-green-50 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-green-800">Mobile Spa</span>
            <span className="hidden sm:inline text-sm text-green-600 bg-green-50 px-2 py-1 rounded-full">
              Premium
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#features" className="text-green-700 hover:text-green-900 font-medium">
              Benefits
            </a>
            <a href="#earnings" className="text-green-700 hover:text-green-900 font-medium">
              Earnings
            </a>
            <a href="#signup" className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 flex items-center">
              <User className="w-4 h-4 mr-2" />
              Join Our Team
            </a>
          </div>
        </div>
      </nav>
      
      {/* Hero Section - ONLY fix the SVG */}
      <section className="relative bg-gradient-to-r from-green-600 to-emerald-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h100v100H0z\' fill=\'none\'/%3E%3Cpath d=\'M20 20h10v10H20zM70 70h10v10H70z\' fill=\'white\' fill-opacity=\'0.05\'/%3E%3C/svg%3E')]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center bg-white/20 rounded-full px-4 py-1 mb-4">
                <Sparkles className="w-4 h-4 mr-2" />
                <span className="text-sm">Join South Africa's First Mobile Spa Network</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                On-demand Spa Service
                <br />
                <span className="text-green-300">To Doorstep</span>
              </h1>
              
              <p className="text-lg text-white/90 mb-8 max-w-lg">
                Mobile Spa connects elite wellness professionals with clients who demand premium at-home experiences.
                <span className="block mt-2 font-semibold">Average therapist earnings: R9,500+ per week</span>
              </p>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-300 mr-2" />
                  <span>Keep track of your earnings</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-300 mr-2" />
                  <span>Premium mobile spa kit</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <a href="#signup" className="bg-white text-green-700 hover:bg-white/90 px-6 py-3 rounded-lg font-medium inline-flex items-center text-lg shadow-lg">
                  <Zap className="w-5 h-5 mr-2" />
                  Start Your Mobile Spa Journey
                </a>
              </div>
            </div>
            
            <div className="hidden lg:flex justify-center">
              <div className="relative">
                <div className="w-80 h-96 bg-gradient-to-b from-green-500 to-emerald-600 rounded-[2rem] flex items-center justify-center shadow-2xl transform rotate-3">
                  <div className="text-center p-8">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MapPin className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-white font-bold text-2xl mb-2">Coming soon</h3>
                    <p className="text-white/70">Avg. Monthly Earnings</p>
                    <div className="mt-6 flex items-center justify-center">
                      <div className="w-2 h-2 bg-green-300 rounded-full mr-1"></div>
                      <div className="w-2 h-2 bg-green-300 rounded-full mr-1"></div>
                      <div className="w-2 h-2 bg-green-300 rounded-full"></div>
                      <span className="text-sm text-white/70 ml-2">Live Bookings</span>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg border border-green-100">
                  <div className="flex items-center">
                    <Users className="w-8 h-8 text-green-600 mr-3" />
                    <div>
                      <p className="font-bold text-gray-900">750+</p>
                      <p className="text-sm text-gray-600">Elite Therapists</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-800 mb-2">R58M+</div>
              <div className="text-green-600">Paid to Therapists</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-800 mb-2">4.9★</div>
              <div className="text-green-600">Client Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-800 mb-2">24K+</div>
              <div className="text-green-600">Premium Sessions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-800 mb-2">96%</div>
              <div className="text-green-600">Repeat Clients</div>
            </div>
          </div>
        </div>
      </section>

      {/* Signup Form */}
      <section id="signup" className="py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-green-100">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-4">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Join Mobile Spa's Elite Network
              </h2>
              <p className="text-gray-600">
                Apply in 2 minutes. Start your mobile spa career in 48 hours.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Thandi"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Mokoena"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="thandi@example.com"
                  required
                />
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cell Number *
                  </label>
                  <input
                    type="tel"
                    name="cell"
                    value={formData.cell}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="071 234 5678"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="071 234 5678"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Years of Experience *
                  </label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select</option>
                    <option value="0-1">0-1 years</option>
                    <option value="1-3">1-3 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="5+">5+ years</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Speciality *
                  </label>
                  <select
                    name="speciality"
                    value={formData.speciality}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select your speciality</option>
                    {specialities.map((spec) => (
                      <option key={spec} value={spec}>{spec}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-700 text-white py-3 rounded-lg font-medium hover:opacity-90 disabled:opacity-50 flex items-center justify-center text-lg shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                {loading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
                    Submitting Application...
                  </>
                ) : (
                  <>
                    Sign up
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </button>
              
              <p className="text-xs text-gray-500 text-center">
                By joining Mobile Spa, you agree to our Terms of Service. 
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Footer with POPIA and PayFast */}
        {/* Footer with POPIA and PayFast */}
      <footer className="mt-auto bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-3">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Mobile Spa</h3>
                  <p className="text-green-300 text-sm">Premium At-Home Wellness</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                South Africa's premier network for mobile spa professionals, bringing luxury wellness experiences directly to clients' homes and offices.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Calendar className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Users className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <MapPin className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            {/* POPIA Compliance */}
            <div>
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-green-900 rounded-full flex items-center justify-center mr-3">
                  <Shield className="w-4 h-4 text-green-400" />
                </div>
                <h4 className="font-semibold text-lg">POPIA Compliant</h4>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Mobile Spa is fully compliant with the Protection of Personal Information Act (POPIA). 
                Your professional data is encrypted and protected with enterprise-grade security.
              </p>
              <div className="mt-3 flex items-center text-sm text-gray-300">
                <Lock className="w-4 h-4 mr-2" />
                <span>GDPR & POPIA Certified</span>
              </div>
            </div>
            
            {/* Payment Partner with REAL PayFast Logo */}
            <div>
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center mr-3">
                  <CreditCard className="w-4 h-4 text-blue-400" />
                </div>
                <h4 className="font-semibold text-lg">Payment Partner</h4>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Secure payments powered by PayFast, South Africa's leading payment gateway. Get paid directly to your bank account.
              </p>
              <div className="mt-3">
                <img 
                  src="https://payfast.io/wp-content/uploads/2024/12/Payfast-logo.svg" 
                  alt="PayFast" 
                  className="h-8 w-auto bg-white p-2 rounded"
                  onError={(e) => {
                    // Fallback if CDN fails
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      parent.innerHTML = `
                        <div class="flex items-center text-sm text-gray-300">
                          <CreditCard class="w-4 h-4 mr-2 text-blue-400" />
                          <span>PayFast Payment Gateway</span>
                        </div>
                      `;
                    }
                  }}
                />
              </div>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className="text-gray-400 text-sm">
                  © {new Date().getFullYear()} Mobile Spa Network. All rights reserved.
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  Bringing luxury wellness to every corner of South Africa
                </p>
              </div>
              
              <div className="flex flex-wrap justify-center gap-6">
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors hover:underline">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors hover:underline">
                  Terms of Service
                </a>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors hover:underline">
                  POPIA Compliance
                </a>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors hover:underline">
                  Therapist Agreement
                </a>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors hover:underline">
                  Contact Support
                </a>
              </div>
            </div>
            
            {/* Security Badges */}
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <div className="flex items-center bg-gray-800 rounded-full px-4 py-2 border border-gray-700">
                <Shield className="w-4 h-4 text-green-400 mr-2" />
                <span className="text-xs">256-bit SSL Encryption</span>
              </div>
              <div className="flex items-center bg-gray-800 rounded-full px-4 py-2 border border-gray-700">
                <Lock className="w-4 h-4 text-blue-400 mr-2" />
                <span className="text-xs">Bank-Level Security</span>
              </div>
              <div className="flex items-center bg-gray-800 rounded-full px-4 py-2 border border-gray-700">
                <CreditCard className="w-4 h-4 text-purple-400 mr-2" />
                <span className="text-xs">PCI DSS Certified</span>
              </div>
              <div className="flex items-center bg-gray-800 rounded-full px-4 py-2 border border-gray-700">
                <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                <span className="text-xs">Verified Partners</span>
              </div>
            </div>
            
            {/* Registration Info */}
            <div className="mt-8 text-center">
              <p className="text-xs text-gray-500">
                Mobile Spa Network (Pty) Ltd • Registration: 2023/123456/07 • 
                VAT: 4560127890 • Physical: Innovation House, Sandton, Johannesburg
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default SignUp;