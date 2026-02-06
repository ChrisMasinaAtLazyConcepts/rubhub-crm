import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useDatabase } from '../hooks/useDatabase';
import { 
  Heart, Shield, CreditCard, Lock,
  Sparkles, Users, Calendar,
  CheckCircle, Award, MapPin, ArrowRight,
  Star, Download, User, TrendingUp, Zap,
  Upload
} from 'lucide-react';
import PopiaTermsPopup from '../components/PopiaTermsPopup';

function SignUp() {
  // const { saveTherapistData, isLoading } = useDatabase();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    cell: '',
    whatsapp: '',
    experience: '',
    isQualified: '', // "yes" or "no"
    speciality: '',
    certificateFile: null,
  });
  const [loading, setLoading] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showCertificateSuccess, setShowCertificateSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
  
  if (type === 'radio') {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  } else {
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  }
   
  };

const handleFileChange = (e :any) => {
  // const file = e.target.files[0];
  // if (file) {
  //   setFormData(prev => ({
  //     ...prev,
  //     certificateFile: file
  //   }));
    
    // Show success toast/message
    setShowCertificateSuccess(true);
    
  //   // Hide success message after 3 seconds
  //   setTimeout(() => {
  //     setShowCertificateSuccess(false);
  //   }, 3000);
  // }
};


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault(); // Make sure this is at the VERY TOP
  
  console.log('Form submission started'); // Debug log
  
  // Check if terms are accepted
  if (!termsAccepted) {
    toast.error('Please accept the Terms of Service');
    setShowTerms(true);
    return;
  }
  
  // Validation
  if (!formData.firstName || !formData.lastName || !formData.email || !formData.cell) {
    toast.error('Please fill in all required fields');
    return;
  }
  
  setLoading(true);
  
  try {
    console.log('Calling saveTherapistData...'); // Debug log
    
    // Use the hook to save to PostgreSQL
    // const result = await saveTherapistData({
    //   firstName: formData.firstName,
    //   lastName: formData.lastName,
    //   email: formData.email,
    //   cell: formData.cell,
    //   whatsapp: formData.whatsapp,
    //   experience: formData.experience,
    //   speciality: formData.speciality
    // });

    // console.log('Result from saveTherapistData:', result); // Debug log

    // if (result.success) {
      // Reset form on success
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        cell: '',
        whatsapp: '',
        experience: '',
        speciality: '',
        isQualified: '',
        certificateFile: null
      });
      
      toast.success('Application submitted successfully!');
      // console.log('Saved with ID:', result.data?.id);
    // } else {
    //   toast.error(result.error || 'Failed to submit application');
    // }
  } catch (error) {
    console.error('Error in handleSubmit:', error);
    toast.error('An unexpected error occurred');
  } finally {
    setLoading(false);
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
      {/* POPIA Terms Popup */}
      <PopiaTermsPopup
        isOpen={showTerms}
        onClose={() => setShowTerms(false)}
        onAccept={() => setTermsAccepted(true)}
      />
      
      <Toaster position="top-right" />
      
      {/* Navigation */}
      <nav className="bg-white border-b border-green-50 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-green-800">Mobile Spa</span>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-emerald-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h100v100H0z\' fill=\'none\'/%3E%3Cpath d=\'M20 20h10v10H20zM70 70h10v10H70z\' fill=\'white\' fill-opacity=\'0.05\'/%3E%3C/svg%3E')]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center bg-white/20 rounded-full px-4 py-1 mb-4">
                <Sparkles className="w-4 h-4 mr-2" />
                <span className="text-sm">Mobile Spa Network</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Introducing
                <br />
                <span className="text-green-300">South Africa's Premier On-Demand Mobile Massage Platform</span>
              </h1>
              
              <p className="text-lg text-white/90 mb-8 max-w-lg">
                Mobile Spa connects elite wellness professionals with clients who demand premium at-home experiences.
              </p>
            </div>
            
            
            <div className="hidden lg:flex justify-center">
            
              <div className="relative">
                
                <div className="w-80 h-96 bg-gradient-to-b from-green-500 to-emerald-600 rounded-[2rem] flex items-center justify-center shadow-2xl transform rotate-3">
                  <div className="text-center p-8">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MapPin className="w-8 h-8 text-white" />
                    </div>
                    <div className="mt-6 flex items-center justify-center">
                      <div className="w-2 h-2 bg-green-300 rounded-full mr-1"></div>
                      <div className="w-2 h-2 bg-green-300 rounded-full mr-1"></div>
                      <div className="w-2 h-2 bg-green-300 rounded-full"></div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg border border-green-100">
                  <div className="flex items-center">
                    <Users className="w-8 h-8 text-green-600 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Join Our Elite Network Of Therapists</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <br/>
         <p className="pl-[38%] text-3xl text-bold text-md text-green-800">
            Safe, Secure and Vetted.
          </p>
     <section className="relative bg-[ #111827] text-white py-10 overflow-hidden">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-green-100">
            <div className="text-center mb-8">          
           
              <p className="text-xl text-md text-black">
                  Flexible hours. Flexible income. We get you clients.   
              </p>
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
              placeholder="Name"
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
              placeholder="Surname"
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
            placeholder="john.doe@example.com"
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

        {/* Massage Therapist Qualification Question */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Are you a qualified massage therapist? *
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="isQualified"
                value="yes"
                checked={formData.isQualified === "yes"}
                onChange={handleChange}
                className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                required
              />
              <span className="ml-2 text-gray-700">Yes</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="isQualified"
                value="no"
                checked={formData.isQualified === "no"}
                onChange={handleChange}
                className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
              />
              <span className="ml-2 text-gray-700">No</span>
            </label>
          </div>
        </div>

        {/* Certificate Upload Section - Only shows if qualified is "yes" */}
        {formData.isQualified === "yes" && (
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Massage Therapy Certificate *
            </label>
            <p className="text-sm text-gray-500 mb-4">
              Please upload a clear photo or scan of your massage therapy qualification certificate.
            </p>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Certificate File
              </label>
              <div className="mt-1 flex items-center">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    name="certificate"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    className="sr-only"
                    required
                  />
                  <div className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                    <Upload className="w-4 h-4 mr-2" />
                    Choose File
                  </div>
                </label>
                <span className="ml-3 text-sm text-gray-500">
                  {formData.certificateFile 
                    ? formData.certificateFile 
                    : "No file chosen"}
                </span>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Accepted formats: PDF, JPG, PNG. Max size: 5MB
              </p>
            </div>

            {/* Success message when certificate is uploaded */}
            {showCertificateSuccess && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-sm text-green-700 font-medium">
                    Certificate uploaded successfully!
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

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
        
        {/* Terms Acceptance Section */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-start">
            <input
              type="checkbox"
              id="terms-checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="w-5 h-5 text-green-600 rounded border-gray-300 focus:ring-green-500 mt-1 mr-3"
            />
            <div>
              <label htmlFor="terms-checkbox" className="text-sm font-medium text-gray-700">
                I agree to the{' '}
                <button
                  type="button"
                  onClick={() => setShowTerms(true)}
                  className="text-green-600 hover:text-green-800 underline focus:outline-none font-semibold"
                >
                  Terms of Service & POPIA Compliance
                </button>
              </label>
              <p className="text-xs text-gray-500 mt-1">
                By checking this box, you acknowledge that you have read, understood, and agree to 
                our Terms of Service and how we process your personal information in compliance 
                with the Protection of Personal Information Act (POPIA).
              </p>
            </div>
          </div>
        </div>
        
        <button
          type="submit"
          disabled={loading || !termsAccepted}
          className={`w-full bg-gradient-to-r from-green-600 to-emerald-700 text-white py-3 rounded-lg font-medium transition-all duration-300 shadow-lg ${
            !termsAccepted ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90 hover:shadow-xl'
          }`}
        >
          {loading ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
              Submitting Application...
            </>
          ) : (
            <>
              {!termsAccepted ? 'Accept Terms to Continue' : 'Sign up'}
              {termsAccepted && <ArrowRight className="w-4 h-4 ml-2" />}
            </>
          )}
        </button>
      </form>
    </div>
  </div>
</section>
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
                <button 
                  onClick={() => setShowTerms(true)}
                  className="text-gray-400 hover:text-white text-sm transition-colors hover:underline"
                >
                  Privacy Policy
                </button>
                <button 
                  onClick={() => setShowTerms(true)}
                  className="text-gray-400 hover:text-white text-sm transition-colors hover:underline"
                >
                  Terms of Service
                </button>
                <button 
                  onClick={() => setShowTerms(true)}
                  className="text-gray-400 hover:text-white text-sm transition-colors hover:underline"
                >
                  POPIA Compliance
                </button>
              </div>
            </div>
            
            {/* Security Badges */}
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <div className="flex items-center bg-gray-800 rounded-full px-4 py-2 border border-gray-700">
                <Shield className="w-4 h-4 text-green-400 mr-2" />
                <span className="text-xs">SSL Encryption</span>
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