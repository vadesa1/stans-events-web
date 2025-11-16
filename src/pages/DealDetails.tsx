import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDeal, getDealPricing } from '@/lib/api';
import { Deal, DealPricing } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { MapPin, Tag, ArrowLeft, Clock, CheckCircle, AlertCircle, Calendar } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';

export const DealDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { session } = useAuth();
  const [deal, setDeal] = useState<Deal | null>(null);
  const [pricing, setPricing] = useState<DealPricing | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadDealData();
    }
  }, [id]);

  const loadDealData = async () => {
    if (!id) return;

    try {
      setLoading(true);
      const [dealData, pricingData] = await Promise.all([
        getDeal(id),
        getDealPricing(id),
      ]);
      setDeal(dealData);
      setPricing(pricingData);
    } catch (error) {
      console.error('Error loading deal data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = () => {
    if (!session) {
      // Redirect to login with return URL
      navigate(`/login?redirect=/deals/${id}`);
      return;
    }
    // Navigate to checkout page
    navigate(`/checkout/${id}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading deal details...</p>
        </div>
      </div>
    );
  }

  if (!deal) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-muted-foreground">Deal not found</p>
      </div>
    );
  }

  const isExpired = new Date(deal.valid_until) < new Date();
  const isNotYetValid = new Date(deal.valid_from) > new Date();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="mb-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <h1 className="text-3xl md:text-4xl font-bold">{deal.merchant_name}</h1>
              <div className="bg-green-100 text-green-800 text-xl font-bold px-4 py-2 rounded flex-shrink-0">
                {deal.savings_percentage}% OFF
              </div>
            </div>

            <p className="text-xl text-muted-foreground mb-4">{deal.description}</p>

            {deal.full_description && (
              <p className="text-muted-foreground">{deal.full_description}</p>
            )}
          </div>

          {/* Highlights */}
          {deal.highlights && deal.highlights.length > 0 && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">What's Included</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {deal.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Fine Print */}
          {deal.fine_print && deal.fine_print.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Terms & Conditions</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {deal.fine_print.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Purchase Card */}
          <Card>
            <CardHeader>
              <CardTitle>Purchase Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-sm text-muted-foreground">Original Price</span>
                  <span className="text-lg line-through text-muted-foreground">
                    {formatCurrency(deal.original_price)}
                  </span>
                </div>
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-sm text-muted-foreground">Discounted Price</span>
                  <span className="text-2xl font-bold text-green-600">
                    {formatCurrency(deal.discounted_price)}
                  </span>
                </div>
                {pricing && pricing.platform_fee > 0 && (
                  <div className="flex items-baseline justify-between mb-1 text-sm">
                    <span className="text-muted-foreground">Platform Fee</span>
                    <span>{formatCurrency(pricing.platform_fee)}</span>
                  </div>
                )}
                <div className="border-t pt-2 mt-2">
                  <div className="flex items-baseline justify-between font-bold">
                    <span>Total</span>
                    <span className="text-xl">
                      {pricing ? formatCurrency(pricing.total_amount) : formatCurrency(deal.discounted_price)}
                    </span>
                  </div>
                </div>
              </div>

              {isExpired ? (
                <Button disabled className="w-full">
                  Deal Expired
                </Button>
              ) : isNotYetValid ? (
                <Button disabled className="w-full">
                  Not Yet Available
                </Button>
              ) : !deal.active ? (
                <Button disabled className="w-full">
                  Deal Unavailable
                </Button>
              ) : (
                <Button onClick={handlePurchase} className="w-full" size="lg">
                  Purchase Deal
                </Button>
              )}

              {!session && (
                <p className="text-xs text-center text-muted-foreground">
                  You'll be asked to sign in to complete your purchase
                </p>
              )}
            </CardContent>
          </Card>

          {/* Deal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Deal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-start gap-2 mb-2">
                  <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">{deal.merchant_address}</p>
                    {deal.distance_miles !== undefined && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {deal.distance_miles.toFixed(1)} miles from event
                        {deal.walking_time_minutes && ` • ${deal.walking_time_minutes} min walk`}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-start gap-2">
                  <Calendar className="h-5 w-5 flex-shrink-0 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Valid Period</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(deal.valid_from)} - {formatDate(deal.valid_until)}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-start gap-2">
                  <Tag className="h-5 w-5 flex-shrink-0 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Deal Type</p>
                    <p className="text-sm text-muted-foreground capitalize">
                      {deal.deal_type.replace('_', ' ')}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
