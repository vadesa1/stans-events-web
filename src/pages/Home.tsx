import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEvents, searchEvents } from '@/lib/api';
import { Event } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Calendar, MapPin, Smartphone } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export const Home: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getUserLocation();
  }, []);

  useEffect(() => {
    if (userLocation || locationError) {
      loadEvents();
    }
  }, [userLocation, locationError]);

  const getUserLocation = () => {
    if (!navigator.geolocation) {
      console.warn('Geolocation not supported');
      setLocationError('Geolocation not supported');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        console.log('User location:', position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        console.warn('Error getting location:', error.message);
        setLocationError(error.message);
      }
    );
  };

  const loadEvents = async () => {
    try {
      setLoading(true);
      const params: any = { size: 20 }; // Backend expects 'size', not 'limit'

      // Add location parameters if available
      if (userLocation) {
        params.lat = userLocation.latitude;
        params.lon = userLocation.longitude;
        // Note: radius is hardcoded to 50 on backend
      }

      const data = await getEvents(params);
      setEvents(data);
    } catch (error) {
      console.error('Error loading events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      loadEvents();
      return;
    }

    try {
      setLoading(true);
      const params: any = { query: searchQuery, size: 20 }; // Backend expects 'size'

      // Add location parameters if available
      if (userLocation) {
        params.lat = userLocation.latitude;
        params.lon = userLocation.longitude;
        // Note: radius is hardcoded to 50 on backend
      }

      const data = await searchEvents(params);
      setEvents(data);
    } catch (error) {
      console.error('Error searching events:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Discover Events & Exclusive Deals
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Find amazing pre-event deals from nearby restaurants and bars
        </p>

        {/* Feature Limitation CTA */}
        <Card className="max-w-2xl mx-auto bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Smartphone className="h-8 w-8 text-blue-600 flex-shrink-0 mt-1" />
              <div className="text-left flex-1">
                <h3 className="font-semibold text-lg mb-2">Get More with Our Mobile App</h3>
                <ul className="text-sm text-muted-foreground space-y-1 mb-4">
                  <li>• Save and favorite events</li>
                  <li>• Get push notifications for new deals</li>
                  <li>• Access location-based recommendations</li>
                  <li>• Share events with friends</li>
                </ul>
                <Button onClick={() => window.open('https://apps.apple.com/stans-events', '_blank')}>
                  Download App
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-2 max-w-2xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search events by name, venue, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button type="submit">Search</Button>
        </div>
      </form>

      {/* Events Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading events...</p>
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No events found. Try a different search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Card
              key={event.id}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => navigate(`/events/${event.id}`)}
            >
              {event.image_url && (
                <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                  <img
                    src={event.image_url}
                    alt={event.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle className="line-clamp-2">{event.name}</CardTitle>
                <CardDescription>
                  <div className="flex items-start gap-2 mt-2">
                    <Calendar className="h-4 w-4 flex-shrink-0 mt-0.5" />
                    <span>{formatDate((event as any).dates || (event as any).date)}</span>
                  </div>
                  <div className="flex items-start gap-2 mt-1">
                    <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                    <span className="line-clamp-1">
                      {event.venue || (event as any)._embedded?.venues?.[0]?.name || 'Venue TBD'}
                    </span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">View Deals</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
