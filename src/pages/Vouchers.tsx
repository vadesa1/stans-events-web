import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPurchases, requestRedemptionPin } from '@/lib/api';
import { Purchase } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Ticket, Calendar, MapPin, Check, Smartphone } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

export const Vouchers: React.FC = () => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [showingPin, setShowingPin] = useState<string | null>(null);
  const [pin, setPin] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    loadPurchases();
  }, []);

  const loadPurchases = async () => {
    try {
      setLoading(true);
      const data = await getPurchases();
      setPurchases(data);
    } catch (error) {
      console.error('Error loading purchases:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleShowPin = async (purchaseId: string) => {
    try {
      const response = await requestRedemptionPin(purchaseId);
      setPin(response.pin);
      setShowingPin(purchaseId);

      // Auto-hide PIN after 15 minutes (matching backend expiry)
      setTimeout(() => {
        setShowingPin(null);
        setPin('');
      }, 15 * 60 * 1000);
    } catch (error) {
      console.error('Error requesting PIN:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading your vouchers...</p>
        </div>
      </div>
    );
  }

  const activePurchases = purchases.filter(p => p.status === 'completed' && !p.redemption_date);
  const redeemedPurchases = purchases.filter(p => p.redemption_date);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Vouchers</h1>
        <p className="text-muted-foreground">
          Manage your purchased deals and redeem them at merchants
        </p>
      </div>

      {/* App Download CTA */}
      <Card className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <Smartphone className="h-8 w-8 text-blue-600 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2">Manage Vouchers on the Go</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Download our app to easily access and redeem your vouchers from your phone
              </p>
              <Button size="sm" onClick={() => window.open('https://apps.apple.com/stans-events', '_blank')}>
                Download App
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Vouchers */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Active Vouchers</h2>

        {activePurchases.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Ticket className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">
                You don't have any active vouchers yet
              </p>
              <Button onClick={() => navigate('/')}>Browse Events & Deals</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activePurchases.map((purchase) => (
              <Card key={purchase.id}>
                <CardHeader>
                  <CardTitle className="flex items-start justify-between gap-2">
                    <span className="line-clamp-1">
                      {purchase.deal?.merchant_name || 'Deal'}
                    </span>
                    <div className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded flex-shrink-0">
                      ACTIVE
                    </div>
                  </CardTitle>
                  <CardDescription>
                    {purchase.deal?.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground mb-1">Value</p>
                      <p className="font-semibold">
                        {purchase.deal && formatCurrency(purchase.deal.discounted_price)}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Purchased</p>
                      <p className="font-semibold">{formatDate(purchase.purchase_date)}</p>
                    </div>
                  </div>

                  {purchase.deal && (
                    <>
                      <div className="text-sm">
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            {purchase.deal.merchant_address}
                          </span>
                        </div>
                      </div>

                      <div className="text-sm">
                        <div className="flex items-start gap-2">
                          <Calendar className="h-4 w-4 flex-shrink-0 mt-0.5 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            Valid until {formatDate(purchase.deal.valid_until)}
                          </span>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="border-t pt-4">
                    <p className="text-sm font-medium mb-2">Voucher Code</p>
                    <p className="font-mono text-lg font-bold bg-muted p-2 rounded text-center">
                      {purchase.voucher_code}
                    </p>
                  </div>

                  {showingPin === purchase.id && pin ? (
                    <div className="border-t pt-4">
                      <p className="text-sm font-medium mb-2 text-center">
                        Redemption PIN (expires in 15 min)
                      </p>
                      <div className="flex justify-center">
                        <InputOTP maxLength={6} value={pin} readOnly>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </div>
                      <p className="text-xs text-center text-muted-foreground mt-2">
                        Show this PIN to the merchant to redeem
                      </p>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => handleShowPin(purchase.id)}
                    >
                      Generate Redemption PIN
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Redeemed Vouchers */}
      {redeemedPurchases.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Redeemed Vouchers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {redeemedPurchases.map((purchase) => (
              <Card key={purchase.id} className="opacity-60">
                <CardHeader>
                  <CardTitle className="flex items-start justify-between gap-2">
                    <span className="line-clamp-1">
                      {purchase.deal?.merchant_name || 'Deal'}
                    </span>
                    <div className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded flex-shrink-0 flex items-center gap-1">
                      <Check className="h-3 w-3" />
                      REDEEMED
                    </div>
                  </CardTitle>
                  <CardDescription>
                    {purchase.deal?.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Redeemed on</span>
                    <span className="font-semibold">
                      {purchase.redemption_date && formatDate(purchase.redemption_date)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Value</span>
                    <span className="font-semibold">
                      {purchase.deal && formatCurrency(purchase.deal.discounted_price)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
