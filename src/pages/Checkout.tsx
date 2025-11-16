import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { getDeal, createPaymentIntent } from '@/lib/api';
import { Deal } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

// Note: Replace with actual Stripe publishable key from environment
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder');

const CheckoutForm: React.FC<{ deal: Deal; clientSecret: string }> = ({ deal, clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      const { error: submitError } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/vouchers`,
        },
      });

      if (submitError) {
        setError(submitError.message || 'Payment failed');
      } else {
        // Payment successful - user will be redirected
        navigate('/vouchers');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Payment Details</CardTitle>
        </CardHeader>
        <CardContent>
          <PaymentElement />
        </CardContent>
      </Card>

      {error && (
        <div className="bg-destructive/10 text-destructive text-sm p-3 rounded">
          {error}
        </div>
      )}

      <Button
        type="submit"
        className="w-full"
        size="lg"
        disabled={!stripe || processing}
      >
        {processing ? 'Processing...' : `Pay ${formatCurrency(deal.discounted_price)}`}
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        Your payment is secured by Stripe. You'll receive your voucher immediately after payment.
      </p>
    </form>
  );
};

export const Checkout: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [deal, setDeal] = useState<Deal | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadCheckoutData();
    }
  }, [id]);

  const loadCheckoutData = async () => {
    if (!id) return;

    try {
      setLoading(true);
      const dealData = await getDeal(id);
      setDeal(dealData);

      // Create payment intent
      const paymentData = await createPaymentIntent(id);
      setClientSecret(paymentData.client_secret);
    } catch (err: any) {
      setError(err.message || 'Failed to load checkout');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Preparing checkout...</p>
        </div>
      </div>
    );
  }

  if (error || !deal || !clientSecret) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-destructive mb-4">{error || 'Failed to load checkout'}</p>
            <Button onClick={() => navigate(-1)}>Go Back</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Complete Your Purchase</h1>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{deal.merchant_name}</CardTitle>
            <CardDescription>{deal.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <span className="text-muted-foreground">Total Amount</span>
              <div className="text-right">
                <p className="text-2xl font-bold">{formatCurrency(deal.discounted_price)}</p>
                <p className="text-sm text-muted-foreground line-through">
                  {formatCurrency(deal.original_price)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
            appearance: {
              theme: 'stripe',
            },
          }}
        >
          <CheckoutForm deal={deal} clientSecret={clientSecret} />
        </Elements>
      </div>
    </div>
  );
};
