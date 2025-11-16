import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from './ui/button';
import { DownloadAppBanner } from './DownloadAppBanner';
import { Calendar, Ticket, User, LogOut } from 'lucide-react';

export const Layout: React.FC = () => {
  const { session, user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <DownloadAppBanner />

      {/* Navigation */}
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-primary">
              Stans Events
            </Link>

            <nav className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Events
                </Button>
              </Link>

              {session ? (
                <>
                  <Link to="/vouchers">
                    <Button variant="ghost" size="sm">
                      <Ticket className="h-4 w-4 mr-2" />
                      My Vouchers
                    </Button>
                  </Link>
                  <Link to="/profile">
                    <Button variant="ghost" size="sm">
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" onClick={handleSignOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="outline" size="sm">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button size="sm">Sign Up</Button>
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Stans Events</h3>
              <p className="text-sm text-muted-foreground">
                Discover events and exclusive pre-event deals near you.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/" className="text-muted-foreground hover:text-foreground">
                    Browse Events
                  </Link>
                </li>
                <li>
                  <Link to="/vouchers" className="text-muted-foreground hover:text-foreground">
                    My Vouchers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Get the App</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Download our mobile app for the best experience
              </p>
              <Button size="sm" onClick={() => window.open('https://apps.apple.com/stans-events', '_blank')}>
                Download Now
              </Button>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Stans Events. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};
