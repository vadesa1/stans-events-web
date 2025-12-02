/**
 * Feature flags for Stans Events Web
 *
 * These flags control feature visibility across different environments.
 * Set in .env.development (QA) and .env.production files.
 */

export const featureFlags = {
  /**
   * Whether deals feature is enabled
   * - true in development/QA for testing
   * - false in production for launch (events + AI ticket finder only)
   */
  dealsEnabled: import.meta.env.VITE_DEALS_ENABLED === 'true',
};

// Helper function to check if deals are enabled
export const isDealsEnabled = (): boolean => featureFlags.dealsEnabled;
