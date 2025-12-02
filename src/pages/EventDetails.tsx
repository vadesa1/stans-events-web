import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEvent, getEventDeals } from '@/lib/api';
import { Event, Deal } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Tag, ArrowLeft, Clock } from 'lucide-react';
import { formatDate, formatCurrency, formatDateTime } from '@/lib/utils';
import { isDealsEnabled } from '@/lib/featureFlags';

export const EventDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadEventData();
    }
  }, [id]);

  const loadEventData = async () => {
    if (!id) return;

    try {
      setLoading(true);

      // Only load deals if feature is enabled
      if (isDealsEnabled()) {
        const [eventData, dealsData] = await Promise.all([
          getEvent(id),
          getEventDeals(id, 10), // Search within 10 miles
        ]);

        if (!eventData) {
          console.error('Event not found');
          setEvent(null);
          setDeals([]);
          return;
        }

        setEvent(eventData);
        setDeals(dealsData);
      } else {
        // Deals disabled - only load event
        const eventData = await getEvent(id);

        if (!eventData) {
          console.error('Event not found');
          setEvent(null);
          return;
        }

        setEvent(eventData);
        setDeals([]); // No deals
      }
    } catch (error) {
      console.error('Error loading event data:', error);
      setEvent(null);
      setDeals([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-4">Event Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The event you're looking for could not be found or is no longer available.
          </p>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Events
          </Button>
        </div>
      </div>
    );
  }

  // Extract data from either format (simplified or Ticketmaster)
  const venueName = event.venue || event._embedded?.venues?.[0]?.name || 'Venue TBD';
  const venueAddress = event.address || event._embedded?.venues?.[0]?.address?.line1;
  const eventImage = event.image_url || event.images?.[0]?.url;
  const eventDescription = event.description || event.info;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Button variant="ghost" onClick={() => navigate('/')} className="mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Events
      </Button>

      {/* Event Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          {eventImage && (
            <div className="aspect-video w-full overflow-hidden rounded-lg mb-6">
              <img
                src={eventImage}
                alt={event.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <h1 className="text-3xl md:text-4xl font-bold mb-4">{event.name}</h1>

          <div className="space-y-3 text-muted-foreground mb-6">
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <span>{formatDateTime(event.dates || event.date)}</span>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <div>
                <p>{venueName}</p>
                {venueAddress && <p className="text-sm">{venueAddress}</p>}
              </div>
            </div>
          </div>

          {eventDescription && (
            <div className="prose max-w-none">
              <p className="whitespace-pre-line">{eventDescription}</p>
            </div>
          )}
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Event Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {event.category && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Category</p>
                  <p className="font-medium">{event.category}</p>
                </div>
              )}
              {event.source && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Source</p>
                  <p className="font-medium capitalize">{event.source.replace('_', ' ')}</p>
                </div>
              )}
              {event.city && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Location</p>
                  <p className="font-medium">
                    {event.city}
                    {event.state && `, ${event.state}`}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Nearby Deals - Only show if deals feature is enabled */}
      {isDealsEnabled() && (
        <div>
          <h2 className="text-2xl font-bold mb-6">
            Nearby Deals
            {deals.length > 0 && (
              <span className="text-muted-foreground text-lg ml-2">({deals.length})</span>
            )}
          </h2>

          {deals.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">
                  No deals available for this event yet. Check back soon!
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {deals.map((deal) => (
                <Card
                  key={deal.id}
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => navigate(`/deals/${deal.id}`)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <CardTitle className="line-clamp-2 text-lg">{deal.merchant_name}</CardTitle>
                      <div className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded flex-shrink-0">
                        {deal.savings_percentage}% OFF
                      </div>
                    </div>
                    <CardDescription className="line-clamp-2">{deal.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold">
                          {formatCurrency(deal.discounted_price)}
                        </span>
                        <span className="text-muted-foreground line-through">
                          {formatCurrency(deal.original_price)}
                        </span>
                      </div>

                      {deal.distance_miles !== undefined && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{deal.distance_miles.toFixed(1)} miles away</span>
                          {deal.walking_time_minutes && (
                            <>
                              <span>•</span>
                              <Clock className="h-4 w-4" />
                              <span>{deal.walking_time_minutes} min walk</span>
                            </>
                          )}
                        </div>
                      )}

                      <Button className="w-full">View Deal</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
