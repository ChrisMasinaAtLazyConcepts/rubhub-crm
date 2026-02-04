// hooks/useDatabase.ts
import { useState } from 'react';

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
      // ✅ Fixed: Always use localhost:8080 for your local service
      const API_URL = 'http://localhost:8080';
      
      console.log('📡 Calling local service at:', API_URL);
      console.log('📤 Sending data:', data);
      
      const response = await fetch(`${API_URL}/api/therapists`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // Check if response is OK
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Server error response:', errorText);
        
        let errorMessage = `Server error: ${response.status}`;
        try {
          const errorJson = JSON.parse(errorText);
          errorMessage = errorJson.error || errorJson.message || errorMessage;
        } catch {
          errorMessage = errorText || errorMessage;
        }
        
        throw new Error(errorMessage);
      }

      const result = await response.json();

      console.log('✅ Success response:', result);

      return { 
        success: true, 
        message: 'Application submitted successfully!',
        data: result
      };

    } catch (err: any) {
      const errorMessage = err.message || 'Failed to connect to server';
      setError(errorMessage);
      
      console.error('❌ Save error:', err);
      
      // More specific error messages
      let userMessage = 'Failed to submit application';
      if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        userMessage = 'Cannot connect to server. Make sure your backend is running on port 8080.';
      } else if (err.message.includes('CORS')) {
        userMessage = 'CORS error. Check backend CORS settings.';
      }

      return { 
        success: false, 
        error: userMessage,
        message: err.message // Include technical details for debugging
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Optional: Add a health check function
  const checkServerHealth = async (): Promise<boolean> => {
    try {
      const response = await fetch('http://localhost:8080/api/health', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
      return response.ok;
    } catch {
      return false;
    }
  };

  // Remove or keep these based on your needs
  const checkEmailExists = async (email: string): Promise<boolean> => {
    try {
      const response = await fetch(`http://localhost:8080/api/therapists/check-email?email=${encodeURIComponent(email)}`);
      const result = await response.json();
      return result.exists || false;
    } catch {
      return false;
    }
  };

  const getTherapistStats = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/therapists/stats');
      return await response.json();
    } catch {
      return null;
    }
  };

  return { 
    saveTherapistData, 
    checkEmailExists,
    getTherapistStats,
    checkServerHealth, // Added health check
    isLoading, 
    error 
  };
}