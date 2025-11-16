# Stans Events - Consumer Web App

A consumer-facing web application for browsing events and purchasing exclusive pre-event deals from nearby merchants.

## Overview

This web app allows users to:
- Browse events from Ticketmaster and custom-created events
- Discover deals near event venues
- Purchase deals with Stripe integration
- View and redeem purchased vouchers
- Manage their profile

Built with modern web technologies for a fast, responsive experience while encouraging mobile app downloads for enhanced features.

## Technology Stack

- **Framework**: Vite + React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Authentication**: Supabase Auth
- **Backend API**: FastAPI (Render)
- **Payments**: Stripe
- **Routing**: React Router v6
- **State Management**: React Query (TanStack Query)

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── Layout.tsx      # Main layout with navigation
│   ├── ProtectedRoute.tsx
│   └── DownloadAppBanner.tsx
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication state
├── lib/                # Utilities and services
│   ├── supabase.ts     # Supabase client
│   ├── api.ts          # Backend API client
│   └── utils.ts        # Helper functions
├── pages/              # Page components
│   ├── Home.tsx        # Events listing
│   ├── EventDetails.tsx
│   ├── DealDetails.tsx
│   ├── Login.tsx
│   ├── SignUp.tsx
│   ├── Checkout.tsx    # Stripe payment
│   ├── Vouchers.tsx    # Purchased deals
│   └── Profile.tsx
├── types/              # TypeScript types
│   └── index.ts        # Shared interfaces
├── App.tsx             # App router
├── main.tsx            # Entry point
└── index.css           # Global styles
```

## Setup Instructions

### Prerequisites

- Node.js 18+ and npm
- Access to Supabase projects (QA & Production)
- Stripe account with API keys

### 1. Install Dependencies

```bash
cd /Volumes/X10\ Pro/stans/stans-events-web
npm install
```

### 2. Configure Environment

Create a `.env.development` file (or copy from `.env.example`):

```bash
cp .env.example .env.development
```

Update the environment variables:

```env
# QA Supabase (for local development)
VITE_SUPABASE_URL=https://dzmolzjevrhzesdqeqsv.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# QA Backend API
VITE_API_URL=https://stans-events-qa.onrender.com/api/v1

# Stripe Test Key
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here

# App Store URL (placeholder)
VITE_APP_STORE_URL=https://apps.apple.com/stans-events
```

### 3. Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### 4. Build for Production

```bash
# Build for development environment
npm run build:dev

# Build for production environment
npm run build
```

## Environment Detection

The app automatically detects the environment based on the URL:

- **Local Development** (`localhost`, `127.0.0.1`, ports 5173/3000/8080): Uses QA Supabase & API
- **QA Domains** (`qa.stans.app`, `events.qa.stans.app`): Uses QA Supabase & API
- **Production Domains** (`stans.app`, `events.stans.app`): Uses Production Supabase & API

No manual environment switching is needed - the app intelligently chooses the right configuration.

## Key Features

### Authentication
- Email/password authentication via Supabase
- Protected routes for authenticated-only pages
- Session management with automatic token refresh

### Event Discovery
- Browse events from Ticketmaster API
- Search events by name, venue, or category
- View event details with date, venue, and location

### Deal Purchasing
- View deals near event venues with distance calculations
- Stripe checkout integration
- Support for both authenticated and guest checkout (if backend supports)

### Voucher Management
- View purchased deals with voucher codes
- Generate time-limited redemption PINs
- Track redeemed vouchers

### Mobile App CTAs
- Persistent download banner at top
- Feature limitation cards on key pages
- App download buttons in footer and throughout the app

## API Integration

The app connects to the FastAPI backend with these key endpoints:

- `GET /events/` - List events
- `GET /events/{id}` - Event details
- `GET /events/{id}/deals` - Deals near event
- `GET /deals/{id}` - Deal details
- `POST /payments/deals/{id}/create-intent` - Create payment
- `GET /payments/purchases` - User's purchases
- `POST /payments/purchases/{id}/request-redemption-pin` - Get PIN
- `GET /users/me` - Current user profile

See `src/lib/api.ts` for complete API documentation.

## Deployment

### Production Environment Variables

For production deployment, create a `.env.production` file:

```env
VITE_SUPABASE_URL=https://ugzgxijyosjaryvwimrq.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_API_URL=https://stans-events.onrender.com/api/v1
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_key_here
VITE_APP_STORE_URL=https://apps.apple.com/stans-events
```

### Build Commands

```bash
# Development build (uses QA environment)
npm run build:dev

# Production build (uses production environment)
npm run build
```

### Hosting Options

The built files in `dist/` can be deployed to:
- **Vercel** (recommended for React apps)
- **Netlify**
- **AWS S3 + CloudFront**
- **Render Static Site**
- **GitHub Pages**

## Design Decisions

### Limited Features (vs Mobile App)

To drive mobile app downloads, the web app intentionally excludes:
- Push notifications
- Saved/favorited events
- Social features (reviews, sharing)
- Advanced filtering
- Location-based recommendations

These limitations are highlighted throughout the app with prominent CTAs.

### Responsive Design

The app is fully mobile-responsive but optimized for desktop/tablet viewing. The mobile experience is intentionally less polished to encourage app downloads.

### Authentication Flow

- Protected routes redirect to login with return URL
- Login page supports redirect query parameter
- Session persists across page refreshes
- Automatic token refresh on expiry

## Development Notes

### Adding New Pages

1. Create page component in `src/pages/`
2. Add route in `src/App.tsx`
3. Add navigation link in `src/components/Layout.tsx`
4. Add to protected routes if authentication required

### Adding shadcn/ui Components

```bash
# Install a specific component (if CLI is set up)
npx shadcn-ui@latest add [component-name]

# Or manually copy from https://ui.shadcn.com/
```

### TypeScript Types

All shared types are in `src/types/index.ts`. Update when backend models change.

### Environment Variables

All environment variables must be prefixed with `VITE_` to be accessible in the client.

## Troubleshooting

### Build Errors

If you encounter build errors:
1. Clear node_modules: `rm -rf node_modules && npm install`
2. Clear build cache: `rm -rf dist`
3. Check TypeScript errors: `npm run lint`

### API Connection Issues

- Verify environment variables are set correctly
- Check browser console for CORS errors
- Ensure backend API is running and accessible
- Check Supabase project settings

### Stripe Integration Issues

- Verify Stripe publishable key matches environment (test vs live)
- Check browser console for Stripe errors
- Ensure backend has matching Stripe secret key
- Test with Stripe test card: `4242 4242 4242 4242`

## Related Projects

- **Backend API**: `/Volumes/X10 Pro/stans/stans-backend/stans-events`
- **Merchant Portal**: `/Volumes/X10 Pro/stans/stans-backend/stans-merchants/stans-restaurant-deals`
- **iOS Mobile App**: `/Users/vadesanmi/stans-native/stans-events-mobile/stans-events`

## Support

For issues or questions, refer to the main project documentation in `CLAUDE.md` at the repository root.

## License

Proprietary - All rights reserved
