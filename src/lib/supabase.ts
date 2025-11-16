import { createClient } from '@supabase/supabase-js';

// Production Supabase configuration
const PROD_SUPABASE_URL = "https://ugzgxijyosjaryvwimrq.supabase.co";
const PROD_SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVnemd4aWp5b3NqYXJ5dndpbXJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc1MTgxNDEsImV4cCI6MjA1MzA5NDE0MX0.uI17rUNTgBbIJjIODxSatBABj_N4Tum0NkxSb3MZpvo";

// QA Supabase configuration
const QA_SUPABASE_URL = "https://dzmolzjevrhzesdqeqsv.supabase.co";
const QA_SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6bW9sempldnJoemVzZHFlcXN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5MjgzMTEsImV4cCI6MjA2NTUwNDMxMX0.45RVUbjHJmi1VBeovUrr6ohg-n8pCquK3WSKv5iHrGg";

/**
 * Detect environment based on URL
 */
const detectEnvironment = (): 'production' | 'qa' => {
  const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
  const href = typeof window !== 'undefined' ? window.location.href : '';

  // Production domains
  if (hostname === 'stans.app' || hostname === 'www.stans.app' || hostname === 'events.stans.app') {
    return 'production';
  }

  // QA domains
  if (hostname === 'qa.stans.app' || hostname === 'events.qa.stans.app') {
    return 'qa';
  }

  // Check for localhost
  const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';

  // Check for local network IPs (192.168.x.x, 10.x.x.x, 172.16-31.x.x)
  const isLocalNetwork = /^(192\.168\.|10\.|172\.(1[6-9]|2[0-9]|3[0-1])\.)/.test(hostname);

  // Check for development port (5173, 3000, 8080, etc.)
  const isDevelopmentPort = href.includes(':5173') ||
                           href.includes(':3000') ||
                           href.includes(':8080') ||
                           href.includes(':5174');

  const isLocal = isLocalhost || isLocalNetwork || isDevelopmentPort;

  console.log('🔍 Environment Detection:', {
    hostname,
    href,
    isLocalhost,
    isLocalNetwork,
    isDevelopmentPort,
    isLocal
  });

  // Use QA for local development
  if (isLocal) {
    return 'qa';
  }

  // Default to production for unknown domains
  return 'production';
};

// Get current environment
const currentEnvironment = detectEnvironment();

// Select appropriate configuration based on environment
const SUPABASE_URL = currentEnvironment === 'qa' ? QA_SUPABASE_URL : PROD_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = currentEnvironment === 'qa' ? QA_SUPABASE_PUBLISHABLE_KEY : PROD_SUPABASE_PUBLISHABLE_KEY;

// Create Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

// Export helper to get current environment
export const getCurrentEnvironment = () => currentEnvironment;

// Log current environment for debugging
console.log(`🔧 Supabase Environment: ${currentEnvironment.toUpperCase()}`);
console.log(`🔗 Supabase URL: ${SUPABASE_URL}`);
