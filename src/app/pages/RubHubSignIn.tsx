import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { 
  LogIn, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  User,
  Shield,
  Building,
  Smartphone,
  ChevronLeft
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

function RubHubSignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email || !formData.password ) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!formData.email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes - in production, this would be a real API call
      if (formData.email === 'admin@rubhub.co.za' && formData.password === 'RubHubCRM2026#' ) {
        toast.success('Welcome back to RubHub CRM!');
        
        // Store auth token and user data in localStorage
        localStorage.setItem('rubhub_auth_token', 'demo_token_xyz123');
        localStorage.setItem('rubhub_user', JSON.stringify({
          email: formData.email,
          name: 'Admin User',
          role: 'admin'
        }));
        
        // Store remember me preference
        if (rememberMe) {
          localStorage.setItem('rubhub_remember', 'true');
        } else {
          sessionStorage.setItem('rubhub_session', 'true');
        }
        
        // Redirect to dashboard
        setTimeout(() => navigate('/home'), 1000);
      } else {
        toast.error('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Sign in error:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Demo credentials helper
  const fillDemoCredentials = () => {
    setFormData({
      email: 'admin@rubhub.com',
      password: 'demo123',
    });
    setRememberMe(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      <Toaster position="top-right" />
      
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* <Link to="/" className="flex items-center space-x-3">
            <ChevronLeft className="w-5 h-5 text-gray-600" />
            <span className="text-gray-600 hover:text-gray-900">Back to Mobile Spa</span>
          </Link> */}
          
          {/* <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">New to RubHub?</span>
            <Link 
              to="/crm/signup" 
              className="px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors text-sm font-medium"
            >
              Request Access
            </Link>
          </div> */}
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            {/* Logo */}
            <div className="flex justify-center mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-3xl font-bold text-green-600">RubHub</span>
                <span className="text-sm text-gray-500 font-normal">CRM</span>
              </div>
            </div>
           
            <p className="text-gray-600">
              Sign in to manage your Mobile Spa operations
            </p>
          </div>

          {/* Sign In Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <LogIn className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Sign In to Your Account</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Company ID */}
              
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="you@company.com"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* Options Row */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Remember me</span>
                </label>
                
                <Link 
                  to="/crm/forgot-password" 
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Forgot password?
                </Link>
              </div>

           
              {/* Sign In Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-gradient-to-r from-green-800 to-green-300 text-white py-3 rounded-lg font-medium transition-all duration-300 shadow-lg flex items-center justify-center ${
                  loading ? 'opacity-80 cursor-not-allowed' : 'hover:opacity-90 hover:shadow-xl'
                }`}
              >
                {loading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
                    Signing In...
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In to RubHub CRM
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="mt-8 mb-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Or sign in with</span>
                </div>
              </div>
            </div>

            {/* Alternative Sign In Methods */}
            <div className="space-y-3">
             
            </div>

            {/* Support Info */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-center text-sm text-gray-500">
                <Shield className="w-4 h-4 mr-2" />
              </div>
              
             
            </div>
          </div>

          {/* Footer Links */}
          <div className="mt-8 text-center space-y-2">
            <p className="text-sm text-gray-600">
              By signing in, you agree to our{' '}
              <Link to="/terms" className="text-blue-600 hover:underline font-medium">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-blue-600 hover:underline font-medium">
                Privacy Policy
              </Link>
            </p>
            
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} RubHub CRM. A Mobile Spa Network product.
            </p>
          </div>
        </div>
      </div>

      {/* Features Preview
      <div className="hidden lg:block fixed right-0 top-0 bottom-0 w-1/3 bg-gradient-to-b from-blue-900 to-purple-900 p-12">
        <div className="h-full flex flex-col justify-center">
          <h3 className="text-2xl font-bold text-white mb-6">
            Welcome to RubHub CRM
          </h3>
          
          <div className="space-y-8">
            <div className="flex items-start">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-4">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-1">Therapist Management</h4>
                <p className="text-blue-100">
                  Manage your entire therapist network from one dashboard
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-4">
                <Building className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-1">Booking Management</h4>
                <p className="text-blue-100">
                  Real-time booking system with automated scheduling
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-4">
                <Smartphone className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-1">Mobile Access</h4>
                <p className="text-blue-100">
                  Access your CRM from any device, anywhere
                </p>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default RubHubSignIn;