// frontend/src/App.tsx
import React from 'react';
import Header from './app/components/Header';
import Footer from './app/components/Footer';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './app/components/contexts/AuthContext';
import { ChatProvider } from './app/components/contexts/ChatContext';

// Import all pages
import AdminDashboard from './app/pages/AdminDashboard';
import HomePage from './app/pages/HomePage';
import TherapistManagement from './app/pages/TherapistManagement';
import PaymentManagement from './app/pages/PaymentManagement';
import UserManagement from './app/pages/UserManagement';
import AnalyticsDashboard from './app/pages/AnalyticsDashboard';
import LiveTracking from './app/pages/LiveTracking';
import BookingManagement from './app/pages/BookingManagement';
import ServiceManagement from './app/pages/ServiceManagement';
import CommunicationCenter from './app/pages/CommunicationCentre';
import SignUp from './app/pages/SignUp';
import PromotionManagement from './app/pages/PromotionManagement';
import SupportCenter from './app/pages/SupportCenter';
import TherapistOnboarding from './app/pages/TherapistOnboarding';
import LoyaltyManagement from './app/pages/LoyaltyManagement';
import TherapistTargets from './app/components/therapist-targets';
import GeofencingPage from './app/pages/Geofencing';
import Security from './app/pages/Security';

const App: React.FC = () => {

  return (                   
      <Router>
        <AuthProvider>
          <ChatProvider>
            <div className="min-h-screen bg-[#F9FDFF]">
              {/* Only show Header/Footer on authenticated routes */}
              <Routes>
                <Route path="/" element={<SignUp />} />
                <Route path="/*" element={
                  <>
                    <Header />
                    <main>
                      <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/admin" element={<AdminDashboard />} />
                        <Route path="/analytics" element={<AnalyticsDashboard />} />
                        
                        <Route path="/geofencing" element={<GeofencingPage />} /> 
                        {/* Therapy Operations */}
                        <Route path="/therapists" element={<TherapistManagement />} />
                        <Route path="/therapists/onboarding" element={<TherapistOnboarding />} />
                        <Route path="/targets" element={<TherapistTargets />} />
                        <Route path="/services" element={<ServiceManagement />} />
                        <Route path="/bookings" element={<BookingManagement />} />
                        <Route path="/live-tracking" element={<LiveTracking />} />
                        
                        {/* Patient Care */}
                        <Route path="/users" element={<UserManagement />} />
                        <Route path="/communication" element={<CommunicationCenter />} />
                        <Route path="/support" element={<SupportCenter />} />
                        
                        {/* Financial */}
                        <Route path="/payments" element={<PaymentManagement />} />
                        <Route path="/loyalty" element={<LoyaltyManagement />} />
                        <Route path="/promotions" element={<PromotionManagement />} />
                        
                        {/* Security */}
                        <Route path="/security" element={<Security  />} />
                        
                        {/* Catch all route */}
                        <Route path="*" element={<Navigate to="/" replace />} />
                      </Routes>
                    </main>
                    <Footer />
                  </>
                } />
              </Routes>
            </div>
          </ChatProvider>
        </AuthProvider>
      </Router>
  );
};

export default App;