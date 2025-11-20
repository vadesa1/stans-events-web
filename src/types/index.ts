/**
 * Event model from backend
 * Supports both simplified format (from listing) and Ticketmaster format (from single event fetch)
 */
export interface Event {
  id: string;
  ticketmaster_id?: string;
  name: string;
  venue?: string; // Optional for Ticketmaster format
  date?: string; // Simple format from listing
  dates?: { // Ticketmaster format from single event fetch
    start: {
      localDate?: string;
      localTime?: string;
      dateTime?: string;
    };
  };
  _embedded?: { // Ticketmaster venue data
    venues?: Array<{
      name?: string;
      location?: {
        latitude?: string;
        longitude?: string;
      };
      address?: {
        line1?: string;
      };
      city?: {
        name?: string;
      };
      state?: {
        name?: string;
        stateCode?: string;
      };
    }>;
  };
  latitude?: number;
  longitude?: number;
  source?: 'ticketmaster' | 'admin_created' | 'restaurant_created';
  approval_status?: 'approved' | 'pending_approval' | 'rejected';
  category?: string;
  image_url?: string;
  images?: Array<{ // Ticketmaster images
    url: string;
    ratio?: string;
    width?: number;
    height?: number;
  }>;
  description?: string;
  info?: string; // Ticketmaster description field
  address?: string;
  city?: string;
  state?: string;
  created_at?: string;
}

/**
 * Merchant model
 */
export interface Merchant {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  merchant_type: 'restaurant' | 'bar' | 'hotel' | 'sports_bar';
  cuisine_type?: string;
  email: string;
  stripe_account_id?: string;
  stripe_onboarding_complete: boolean;
}

/**
 * Deal model (previously MerchantDeal)
 */
export interface Deal {
  id: string;
  merchant_id: string;
  event_id?: string;
  deal_type: 'pay_in_app' | 'voucher' | 'discount';
  description: string;
  full_description?: string;
  original_price: number;
  discounted_price: number;
  savings_percentage: number;
  merchant_name: string;
  merchant_address: string;
  valid_from: string;
  valid_until: string;
  highlights?: string[];
  fine_print?: string[];
  active: boolean;
  distance_miles?: number;
  walking_time_minutes?: number;
  created_at?: string;
}

/**
 * Purchase model (DealPurchase)
 */
export interface Purchase {
  id: string;
  deal_id: string;
  user_id?: string;
  guest_email?: string;
  guest_phone?: string;
  payment_intent_id: string;
  status: 'pending' | 'completed' | 'failed' | 'canceled';
  voucher_code: string;
  purchase_date: string;
  redemption_date?: string;
  deal?: Deal;
}

/**
 * User model
 */
export interface User {
  id: string;
  email: string;
  full_name?: string;
  phone?: string;
  merchant_id?: string;
  role: 'customer' | 'merchant' | 'admin';
  created_at?: string;
}

/**
 * Stripe payment intent creation response
 */
export interface PaymentIntentResponse {
  client_secret: string;
  paymentIntent?: string; // For backward compatibility with mobile app
  publishableKey: string;
  stripeAccountId: string; // Connected account ID for Direct Charges
  purchase_id: string;
}

/**
 * Deal pricing breakdown
 */
export interface DealPricing {
  original_price: number;
  discounted_price: number;
  platform_fee: number;
  total_amount: number;
  savings_percentage: number;
}

/**
 * API error response
 */
export interface ApiError {
  detail: string;
  status_code?: number;
}

/**
 * Pagination parameters
 */
export interface PaginationParams {
  skip?: number;
  limit?: number;
}

/**
 * Event search parameters
 */
export interface EventSearchParams extends PaginationParams {
  query?: string;
  category?: string;
  latitude?: number;
  longitude?: number;
  radius?: number;
  start_date?: string;
  end_date?: string;
}

/**
 * Deal filter parameters
 */
export interface DealFilterParams extends PaginationParams {
  event_id?: string;
  merchant_id?: string;
  deal_type?: string;
  min_savings?: number;
}
