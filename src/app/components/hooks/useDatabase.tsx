// hooks/useDatabase.ts
import { useState } from 'react';
import toast from 'react-hot-toast';

interface TherapistData {
  firstName: string;
  lastName: string;
  email: string;
  cell: string;
  whatsapp: string;
  experience: string;
  speciality: string;
}

interface DatabaseResponse {
  success: boolean;
  message?: string;
  data?: any;
  error?: string;
}

export function useDatabase() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveTherapistData = async (data: TherapistData): Promise<DatabaseResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      // ✅ CORRECT: Vite uses import.meta.env with VITE_ prefix
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      
      console.log('📡 API URL being used:', API_URL);
      console.log('📤 Sending data:', data);
      
      const response = await fetch(`${API_URL}/api/therapists/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          ...data,
          submissionDate: new Date().toISOString()
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || `HTTP error! status: ${response.status}`);
      }

      toast.success(result.message || 'Your application has been submitted successfully!');
      
      console.log('✅ Application saved:', result.data);

      return { 
        success: true, 
        message: result.message,
        data: result.data
      };

    } catch (err: any) {
      const errorMessage = err.message || 'An unknown error occurred';
      setError(errorMessage);
      
      console.error('❌ Save error:', err);
      
      // Don't show toast here - let the component handle it
      // This prevents duplicate toasts

      return { 
        success: false, 
        error: errorMessage 
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Remove these functions if not used, or fix them:
  const checkEmailExists = async (email: string): Promise<boolean> => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const response = await fetch(`${API_URL}/api/therapists/check-email?email=${encodeURIComponent(email)}`);
      const result = await response.json();
      return result.exists || false;
    } catch {
      return false;
    }
  };

  const getTherapistStats = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const response = await fetch(`${API_URL}/api/therapists/stats`);
      return await response.json();
    } catch {
      return null;
    }
  };

  return { 
    saveTherapistData, 
    checkEmailExists,
    getTherapistStats,
    isLoading, 
    error 
  };
}