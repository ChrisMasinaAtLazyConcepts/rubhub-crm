import React from 'react';
import { X, Shield, Lock, FileText, AlertCircle, CheckCircle, Database, Share2, Users } from 'lucide-react';

interface PopiaTermsPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
}

const PopiaTermsPopup: React.FC<PopiaTermsPopupProps> = ({ isOpen, onClose, onAccept }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        />
        
        {/* Popup Container */}
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-green-600 to-emerald-700 text-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Shield className="w-8 h-8" />
                <div>
                  <h2 className="text-2xl font-bold">Terms of Service & POPIA Compliance</h2>
                  <p className="text-green-100 text-sm">Mobile Spa Network (Pty) Ltd</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:text-green-200 transition-colors p-2 rounded-full hover:bg-white/10"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
          
          {/* Content - Scrollable */}
          <div className="p-8 overflow-y-auto max-h-[60vh]">
            {/* Important Notice */}
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6 rounded">
              <div className="flex">
                <AlertCircle className="w-6 h-6 text-yellow-500 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-yellow-800">Important Notice</h3>
                  <p className="text-yellow-700 text-sm mt-1">
                    This document outlines how Mobile Spa collects, processes, and protects your personal information 
                    in compliance with the Protection of Personal Information Act (POPIA) of South Africa.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-8">
              {/* Section 1: Definitions */}
              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-green-600" />
                  1. Definitions & Interpretation
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li><strong>"Personal Information"</strong> means information relating to an identifiable, living, natural person.</li>
                    <li><strong>"Processing"</strong> means any operation or activity concerning personal information.</li>
                    <li><strong>"Data Subject"</strong> means the person to whom personal information relates (you).</li>
                    <li><strong>"Responsible Party"</strong> means Mobile Spa Network (Pty) Ltd.</li>
                    <li><strong>"Operator"</strong> means a person who processes personal information for the Responsible Party.</li>
                  </ul>
                </div>
              </section>
              
              {/* Section 2: Information We Collect */}
              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-3">2. Personal Information We Collect</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-700 mb-2">Professional Information</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Full name and contact details</li>
                      <li>• Email address and phone numbers</li>
                      <li>• Professional qualifications</li>
                      <li>• Years of experience</li>
                      <li>• Specializations and skills</li>
                    </ul>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-700 mb-2">Operational Information</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Service preferences</li>
                      <li>• Availability schedules</li>
                      <li>• Payment information (via PayFast)</li>
                      <li>• Service history and ratings</li>
                      <li>• Communication records</li>
                    </ul>
                  </div>
                </div>
              </section>
              
              {/* NEW SECTION: Data Processing & Sharing */}
              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                  <Database className="w-5 h-5 mr-2 text-green-600" />
                  3. Data Processing & Internal Sharing
                </h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                  <div className="flex items-start mb-4">
                    <Share2 className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-blue-800">Internal Data Sharing Notice</h4>
                      <p className="text-blue-700 mt-1">
                        By submitting your application, you acknowledge and consent that your personal information will be processed and shared among our internal systems for operational purposes.
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg border border-blue-100">
                      <div className="flex items-center mb-2">
                        <Users className="w-5 h-5 text-green-600 mr-2" />
                        <h5 className="font-semibold text-gray-800">Internal Systems That Process Your Data</h5>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span><strong>Booking Platform:</strong> For client matching and scheduling</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span><strong>Payment System:</strong> For secure payment processing via PayFast</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span><strong>CRM Database:</strong> For client relationship management</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span><strong>Quality Assurance:</strong> For service monitoring and improvement</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border border-blue-100">
                      <div className="flex items-center mb-2">
                        <Shield className="w-5 h-5 text-green-600 mr-2" />
                        <h5 className="font-semibold text-gray-800">How Your Data is Protected</h5>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li className="flex items-start">
                          <Lock className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span><strong>Encrypted Transfers:</strong> All data transfers between systems are encrypted</span>
                        </li>
                        <li className="flex items-start">
                          <Lock className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span><strong>Access Controls:</strong> Strict role-based access permissions</span>
                        </li>
                        <li className="flex items-start">
                          <Lock className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span><strong>Audit Logs:</strong> All data access is logged and monitored</span>
                        </li>
                        <li className="flex items-start">
                          <Lock className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span><strong>Data Minimization:</strong> Only necessary data is shared between systems</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-blue-100 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Important:</strong> Your data will only be shared with third parties as explicitly stated in our Privacy Policy or as required by law. We do not sell your personal information to third parties.
                    </p>
                  </div>
                </div>
              </section>
              
              {/* Section 4: Purpose of Processing (renumbered from 3) */}
              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-3">4. Purpose of Processing Your Information</h3>
                <p className="text-gray-700 mb-3">
                  We process your personal information for the following legitimate business purposes:
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    "Service matching with clients",
                    "Payment processing and invoicing",
                    "Quality assurance and training",
                    "Regulatory compliance",
                    "Communication about bookings",
                    "Performance analytics",
                    "Marketing (with consent)",
                    "Client feedback collection"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center bg-green-50 p-3 rounded">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </section>
              
              {/* Section 5: Your Rights under POPIA (renumbered from 4) */}
              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-3">5. Your Rights as a Data Subject</h3>
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-5">
                  <p className="text-blue-800 font-semibold mb-3">
                    Under POPIA, you have the right to:
                  </p>
                  <div className="grid md:grid-cols-2 gap-3">
                    {[
                      { title: "Access", desc: "Request access to your personal information" },
                      { title: "Correction", desc: "Request correction of inaccurate information" },
                      { title: "Deletion", desc: "Request deletion of your information" },
                      { title: "Objection", desc: "Object to processing of your information" },
                      { title: "Complaint", desc: "Lodge a complaint with the Information Regulator" },
                      { title: "Consent Withdrawal", desc: "Withdraw consent at any time" }
                    ].map((right, index) => (
                      <div key={index} className="bg-white p-3 rounded border border-blue-100">
                        <h4 className="font-bold text-blue-700">{right.title}</h4>
                        <p className="text-sm text-blue-600 mt-1">{right.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              
              {/* Section 6: Data Security (renumbered from 5) */}
              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                  <Lock className="w-5 h-5 mr-2 text-green-600" />
                  6. Data Security Measures
                </h3>
                <div className="bg-gray-50 p-5 rounded-lg">
                  <p className="text-gray-700 mb-4">
                    We implement appropriate technical and organizational measures to ensure:
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-green-100 p-2 rounded mr-3">
                        <Shield className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Encryption</h4>
                        <p className="text-sm text-gray-600">256-bit SSL encryption for all data transmission</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-green-100 p-2 rounded mr-3">
                        <Lock className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Access Control</h4>
                        <p className="text-sm text-gray-600">Role-based access and authentication protocols</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-green-100 p-2 rounded mr-3">
                        <FileText className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Data Retention</h4>
                        <p className="text-sm text-gray-600">Information retained only for legally required periods</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              
              {/* Section 7: Contact Information (renumbered from 6) */}
              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-3">7. Contact & Complaints</h3>
                <div className="border border-gray-200 rounded-lg p-5">
                  <p className="text-gray-700 mb-4">
                    For POPIA-related inquiries or to exercise your rights:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-green-700">Information Officer</h4>
                      <p className="text-sm text-gray-600">Mobile Spa Network (Pty) Ltd</p>
                      <p className="text-sm text-gray-600">Email: privacy@mobilespa.co.za</p>
                      <p className="text-sm text-gray-600">Phone: 010 234 5678</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-700">Information Regulator</h4>
                      <p className="text-sm text-gray-600">JD House, 27 Stiemens Street, Braamfontein</p>
                      <p className="text-sm text-gray-600">Email: complaints.IR@justice.gov.za</p>
                      <p className="text-sm text-gray-600">Phone: 010 023 5200</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
          
          {/* Footer with Action Buttons */}
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <div className="flex items-center text-gray-600 text-sm">
                <input
                  type="checkbox"
                  id="terms-agreement"
                  className="w-4 h-4 text-green-600 rounded border-gray-300 focus:ring-green-500 mr-2"
                />
                <label htmlFor="terms-agreement">
                  I have read and understood these Terms of Service, including the Data Processing & Internal Sharing clause
                </label>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={onClose}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const checkbox = document.getElementById('terms-agreement') as HTMLInputElement;
                    if (checkbox && !checkbox.checked) {
                      alert('Please acknowledge that you have read and understood the terms.');
                      return;
                    }
                    onAccept();
                    onClose();
                  }}
                  className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  Accept & Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopiaTermsPopup;