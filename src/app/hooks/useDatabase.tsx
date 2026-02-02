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
      // API endpoint - adjust URL based on your setup
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      
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
      
      // Log to console for debugging
      console.log('Application saved:', result.data);

      return { 
        success: true, 
        message: result.message,
        data: result.data
      };

    } catch (err: any) {
      const errorMessage = err.message || 'An unknown error occurred';
      setError(errorMessage);
      
      // More specific error messages
      if (err.message.includes('Failed to fetch')) {
        toast.error('Unable to connect to server. Please check your connection.');
      } else if (err.message.includes('already exists')) {
        toast.error('This email is already registered.');
      } else {
        toast.error(`Error: ${errorMessage}`);
      }

      return { 
        success: false, 
        error: errorMessage 
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Additional database functions you might need
  const checkEmailExists = async (email: string): Promise<boolean> => {
    try {
      const response = await fetch(`/api/therapists/check-email?email=${encodeURIComponent(email)}`);
      const result = await response.json();
      return result.exists || false;
    } catch {
      return false;
    }
  };

  const getTherapistStats = async () => {
    try {
      const response = await fetch('/api/therapists/stats');
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