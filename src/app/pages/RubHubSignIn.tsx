import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { 
  LogIn, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Shield,
  Building,
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
    <div className="min-h-screen flex flex-col relative">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        {/* High-quality background image with crisp optimization */}
       <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat bg-fixed"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1920&q=80&auto=format&fit=crop")',
            // Use only one imageRendering property
            imageRendering: 'crisp-edges'
          }}
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/80 to-gray-900/90" />
        {/* Subtle pattern overlay for texture */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <Toaster position="top-right" />

      <div className="relative z-10 flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo and Header with glass effect */}
          <div className="text-center mb-8 backdrop-blur-sm bg-white/10 rounded-2xl p-8 border border-white/20">
            <div className="flex justify-center mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-400 rounded-xl flex items-center justify-center shadow-lg">
                </div>
                <div className="text-left">
                  <h1 className="text-3xl font-bold text-white">RubHub</h1>
                  <p className="text-emerald-200 text-sm font-medium">CRM Platform</p>
                </div>
              </div>
            </div>
            <p className="text-gray-300 mt-4">
              Sign in to manage your Mobile Spa operations
            </p>
          </div>

          {/* Sign In Card with glass effect */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-400 rounded-lg flex items-center justify-center mr-3 backdrop-blur-sm">
                <LogIn className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-white">Sign In to Your Account</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
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
                    className="block w-full pl-10 pr-3 py-3 bg-white/10 border border-gray-300/30 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-white placeholder-gray-400 backdrop-blur-sm"
                    placeholder="you@company.com"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
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
                    className="block w-full pl-10 pr-10 py-3 bg-white/10 border border-gray-300/30 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-white placeholder-gray-400 backdrop-blur-sm"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
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
                    className="w-4 h-4 text-emerald-500 bg-white/10 border-gray-300/30 rounded focus:ring-emerald-500"
                  />
                  <span className="ml-2 text-sm text-gray-300">Remember me</span>
                </label>
                
                <Link 
                  to="/crm/forgot-password" 
                  className="text-sm text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-gradient-to-r from-green-700 to-emerald-500 text-white py-3 rounded-lg font-medium transition-all duration-300 shadow-lg flex items-center justify-center backdrop-blur-sm ${
                  loading ? 'opacity-80 cursor-not-allowed' : 'hover:opacity-90 hover:shadow-xl transform hover:-translate-y-0.5'
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

          </div>

        </div>
      </div>
    </div>
  );
}

export default RubHubSignIn;