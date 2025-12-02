import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export function SmsOptIn() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [consentChecked, setConsentChecked] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, "");

    // Format as (XXX) XXX-XXXX
    if (digits.length <= 3) {
      return digits;
    } else if (digits.length <= 6) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    } else {
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate phone number (10 digits)
    const digits = phoneNumber.replace(/\D/g, "");
    if (digits.length !== 10) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }

    if (!consentChecked || !termsChecked) {
      setError("Please check all required boxes to continue");
      return;
    }

    setIsSubmitting(true);

    // Simulate submission (in production, this would call your API)
    try {
      // Here you would typically call your backend API to register the opt-in
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubmitted(true);
    } catch {
      setError("Failed to register. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">You're All Set!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for opting in to receive SMS messages from Stans. You'll receive important updates
            about your account, deals, and events.
          </p>
          <p className="text-sm text-gray-500">
            Remember, you can opt out at any time by replying STOP to any message.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-2xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Stans SMS Opt-In</h1>
          <p className="text-gray-600">
            Stay connected with important updates about your deals and events
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Phone Number Input */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={phoneNumber}
                onChange={handlePhoneChange}
                placeholder="(555) 123-4567"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
                required
              />
            </div>

            {/* SMS Consent Checkbox */}
            <div className="bg-purple-50 rounded-lg p-4">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consentChecked}
                  onChange={(e) => setConsentChecked(e.target.checked)}
                  className="mt-1 h-5 w-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  required
                />
                <span className="text-sm text-gray-700">
                  <strong>I consent to receive SMS messages from Stans</strong> at the phone number provided.
                  Message frequency varies based on your activity (account verification, deal confirmations,
                  redemption codes, and important updates). Message and data rates may apply.
                  <span className="text-red-500"> *</span>
                </span>
              </label>
            </div>

            {/* Terms Checkbox */}
            <div className="bg-gray-50 rounded-lg p-4">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={termsChecked}
                  onChange={(e) => setTermsChecked(e.target.checked)}
                  className="mt-1 h-5 w-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  required
                />
                <span className="text-sm text-gray-700">
                  I have read and agree to the{" "}
                  <Link to="/terms" className="text-purple-600 hover:underline font-medium">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-purple-600 hover:underline font-medium">
                    Privacy Policy
                  </Link>
                  <span className="text-red-500"> *</span>
                </span>
              </label>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !consentChecked || !termsChecked}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-lg"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "Opt In to SMS"
              )}
            </button>
          </form>

          {/* Opt-Out Instructions */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">How to Opt Out</h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <p className="text-sm text-gray-600">
                <strong>To stop receiving messages:</strong> Reply <span className="font-mono bg-gray-200 px-2 py-0.5 rounded">STOP</span> to any message
              </p>
              <p className="text-sm text-gray-600">
                <strong>For help:</strong> Reply <span className="font-mono bg-gray-200 px-2 py-0.5 rounded">HELP</span> or contact us at{" "}
                <a href="mailto:info@stans.app" className="text-purple-600 hover:underline">info@stans.app</a>
              </p>
            </div>
          </div>

          {/* Message Types */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Types of Messages You'll Receive</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-purple-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Account verification codes for secure login
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-purple-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Deal purchase confirmations and voucher codes
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-purple-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Redemption PIN codes for merchant verification
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-purple-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Important account and service notifications
              </li>
            </ul>
          </div>

          {/* Additional Info */}
          <div className="mt-6 text-xs text-gray-500 text-center">
            <p>
              By providing your phone number, you confirm that you are the owner or authorized user
              of this mobile device. Standard message and data rates from your carrier may apply.
            </p>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-8 text-center text-sm text-gray-500 space-x-4">
          <Link to="/privacy" className="hover:text-purple-600">Privacy Policy</Link>
          <span>|</span>
          <Link to="/terms" className="hover:text-purple-600">Terms of Service</Link>
          <span>|</span>
          <a href="mailto:info@stans.app" className="hover:text-purple-600">Contact Us</a>
        </div>

        {/* Company Info */}
        <div className="mt-4 text-center text-xs text-gray-400">
          <p>STANS LLC | 2916 Fairland Road, Silver Spring, MD 20904</p>
        </div>
      </div>
    </div>
  );
}

export default SmsOptIn;
