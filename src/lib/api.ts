import axios, { AxiosError } from 'axios';
import { supabase } from './supabase';
import type {
  Event,
  Deal,
  Purchase,
  PaymentIntentResponse,
  DealPricing,
  EventSearchParams,
  DealFilterParams,
  ApiError,
} from '@/types';

/**
 * Detect API URL based on environment
 */
const detectApiUrl = (): string => {
  const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
  const href = typeof window !== 'undefined' ? window.location.href : '';

  // Production domains
  if (hostname === 'stans.app' || hostname === 'www.stans.app' || hostname === 'events.stans.app') {
    return 'https://stans-events.onrender.com/api/v1';
  }

  // QA domains
  if (hostname === 'qa.stans.app' || hostname === 'events.qa.stans.app') {
    return 'https://stans-events-qa.onrender.com/api/v1';
  }

  // Check for localhost or local network
  const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
  const isLocalNetwork = /^(192\.168\.|10\.|172\.(1[6-9]|2[0-9]|3[0-1])\.)/.test(hostname);
  const isDevelopmentPort = href.includes(':5173') || href.includes(':3000') || href.includes(':8080');

  if (isLocalhost || isLocalNetwork || isDevelopmentPort) {
    // Use QA for local development
    return 'https://stans-events-qa.onrender.com/api/v1';
  }

  // Default to production
  return 'https://stans-events.onrender.com/api/v1';
};

const API_BASE_URL = detectApiUrl();

console.log(`🌐 API Base URL: ${API_BASE_URL}`);

/**
 * Get authorization header with current user token
 */
async function getAuthHeader(): Promise<{ Authorization: string } | {}> {
  const { data: { session } } = await supabase.auth.getSession();

  if (session?.access_token) {
    return { Authorization: `Bearer ${session.access_token}` };
  }

  return {};
}

/**
 * Handle API errors
 */
function handleApiError(error: unknown): never {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiError>;
    const message = axiosError.response?.data?.detail || axiosError.message || 'An error occurred';
    throw new Error(message);
  }
  throw error;
}

// ============================================================================
// Events API
// ============================================================================

/**
 * Get list of events with optional filters
 */
export async function getEvents(params?: EventSearchParams): Promise<Event[]> {
  try {
    const response = await axios.get(`${API_BASE_URL}/events/`, { params });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

/**
 * Get event by ID
 */
export async function getEvent(eventId: string): Promise<Event> {
  try {
    const response = await axios.get(`${API_BASE_URL}/events/${eventId}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

/**
 * Search events
 */
export async function searchEvents(params: EventSearchParams): Promise<Event[]> {
  try {
    const response = await axios.get(`${API_BASE_URL}/events/search`, { params });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

/**
 * Get deals for a specific event
 */
export async function getEventDeals(eventId: string, maxDistance: number = 1): Promise<Deal[]> {
  try {
    const response = await axios.get(`${API_BASE_URL}/events/${eventId}/deals`, {
      params: { max_distance: maxDistance },
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

// ============================================================================
// Deals API
// ============================================================================

/**
 * Get deal by ID
 */
export async function getDeal(dealId: string): Promise<Deal> {
  try {
    const response = await axios.get(`${API_BASE_URL}/deals/${dealId}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

/**
 * Get featured deals (highest savings)
 */
export async function getFeaturedDeals(limit: number = 10): Promise<Deal[]> {
  try {
    const response = await axios.get(`${API_BASE_URL}/deals/featured`, {
      params: { limit },
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

/**
 * Get popular deals (most purchases)
 */
export async function getPopularDeals(limit: number = 10): Promise<Deal[]> {
  try {
    const response = await axios.get(`${API_BASE_URL}/deals/popular`, {
      params: { limit },
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

/**
 * Get pricing breakdown for a deal
 */
export async function getDealPricing(dealId: string): Promise<DealPricing> {
  try {
    const response = await axios.get(`${API_BASE_URL}/payments/deals/${dealId}/pricing`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

// ============================================================================
// Payments API
// ============================================================================

/**
 * Create payment intent for authenticated user
 */
export async function createPaymentIntent(dealId: string): Promise<PaymentIntentResponse> {
  try {
    const headers = await getAuthHeader();
    const response = await axios.post(
      `${API_BASE_URL}/payments/deals/${dealId}/create-intent`,
      {},
      { headers }
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

/**
 * Create payment intent for guest checkout
 */
export async function createGuestPaymentIntent(
  dealId: string,
  guestEmail: string,
  guestPhone?: string
): Promise<PaymentIntentResponse> {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/payments/deals/${dealId}/create-intent-guest`,
      {
        guest_email: guestEmail,
        guest_phone: guestPhone,
      }
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

/**
 * Get user's purchase history
 */
export async function getPurchases(): Promise<Purchase[]> {
  try {
    const headers = await getAuthHeader();
    const response = await axios.get(`${API_BASE_URL}/payments/purchases`, { headers });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

/**
 * Request redemption PIN for a purchase
 */
export async function requestRedemptionPin(purchaseId: string): Promise<{ pin: string }> {
  try {
    const headers = await getAuthHeader();
    const response = await axios.post(
      `${API_BASE_URL}/payments/purchases/${purchaseId}/request-redemption-pin`,
      {},
      { headers }
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

// ============================================================================
// Users API
// ============================================================================

/**
 * Get current user profile
 */
export async function getCurrentUser() {
  try {
    const headers = await getAuthHeader();
    const response = await axios.get(`${API_BASE_URL}/users/me`, { headers });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

/**
 * Update current user profile
 */
export async function updateUserProfile(data: { full_name?: string; phone?: string }) {
  try {
    const headers = await getAuthHeader();
    const response = await axios.put(`${API_BASE_URL}/users/me`, data, { headers });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}
