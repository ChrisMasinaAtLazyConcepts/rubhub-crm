// frontend/src/components/Footer.tsx
import { Building, Calendar, CheckCircle, Heart, Lock, MapPin, Shield, Users } from 'lucide-react';
import React from 'react';
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
  <footer className="mt-auto bg-gray-900 text-white py-12">
  <div className="max-w-7xl mx-auto px-4 sm:px-6">
    <div className="grid md:grid-cols-3 gap-8">
      {/* Company Info */}
      <div>
        <div className="flex items-center mb-4">
        
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-green-600">RubHub</span>
          <span className="text-sm text-gray-500 font-normal">CRM</span>
        </div>
        </div>
        <p className="text-gray-400 text-sm mb-4">
          South Africa's premier CRM platform for mobile spa businesses, streamlining operations and maximizing therapist performance.
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
      
 
      
      {/* Mobile Spa Partnership */}
      <div>
        <div className="flex items-center mb-3">
          <div className="w-8 h-8 bg-green-900 rounded-full flex items-center justify-center mr-3">
            <Heart className="w-4 h-4 text-green-400" />
          </div>
          <h4 className="font-semibold text-lg">Mobile Spa </h4>
        </div>
        <p className="text-gray-400 text-sm mb-4">
          Official CRM partner of Mobile Spa Network. Manage your therapists, bookings, and payments seamlessly.
        </p>
        <div className="mt-3">
          <div className="flex items-center text-sm text-gray-300">
            <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded flex items-center justify-center mr-2">
              <Heart className="w-3 h-3 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
    

  </div>
</footer>
  );
};

export default Footer;