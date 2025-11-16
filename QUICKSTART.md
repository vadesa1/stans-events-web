# Quick Start Guide

Get the Stans Events consumer web app running in 5 minutes.

## Prerequisites

- Node.js 18+
- npm or yarn

## Installation

```bash
# Navigate to project directory
cd /Volumes/X10\ Pro/stans/stans-events-web

# Install dependencies
npm install
```

## Environment Setup

The `.env.development` file is already configured for QA environment. No changes needed for local development!

If you need to modify settings, edit `.env.development`:
- Supabase URL and keys are pre-configured for QA
- API points to QA backend: `https://stans-events-qa.onrender.com/api/v1`
- Stripe key needs to be added (get from team)

## Run Development Server

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

## What You Should See

1. Home page with event listings from Ticketmaster
2. Download app banner at the top
3. Navigation with Events, Sign In, Sign Up buttons
4. Search bar to find events
5. Event cards displaying event info

## Test the App

### Browse Events
- Homepage shows events automatically
- Use search to find specific events
- Click on an event card to see details

### View Deals
- Click on an event to see nearby deals
- Deals show distance from event venue
- Click on a deal to see full details

### Create Account
1. Click "Sign Up" in navigation
2. Enter email and password (min 6 chars)
3. Check email for confirmation (Supabase)
4. Sign in with your credentials

### Purchase a Deal
1. Sign in to your account
2. Navigate to a deal
3. Click "Purchase Deal"
4. Enter Stripe test card: `4242 4242 4242 4242`
5. Complete payment

### View Vouchers
1. After purchase, click "My Vouchers" in nav
2. See your purchased deals
3. Click "Generate Redemption PIN" to get PIN code
4. PIN expires in 15 minutes

## Project Structure Overview

```
src/
├── pages/              # Main pages (Home, EventDetails, etc.)
├── components/         # Reusable components
│   └── ui/            # shadcn/ui components
├── lib/               # Services (API, Supabase)
├── contexts/          # React contexts (Auth)
└── types/             # TypeScript interfaces
```

## Key Files

- `src/App.tsx` - Main router and app setup
- `src/lib/api.ts` - Backend API integration
- `src/lib/supabase.ts` - Supabase client with env detection
- `src/contexts/AuthContext.tsx` - Authentication state
- `src/pages/Home.tsx` - Events listing page

## Common Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Build for development/QA
npm run build:dev

# Lint code
npm run lint

# Preview production build
npm run preview
```

## Environment Variables

All variables are prefixed with `VITE_` for client-side access:

- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_PUBLISHABLE_KEY` - Supabase anon key
- `VITE_API_URL` - Backend API base URL
- `VITE_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key
- `VITE_APP_STORE_URL` - App download link

## Troubleshooting

### "Module not found" errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### API connection errors
- Check that backend is running at https://stans-events-qa.onrender.com/api/v1
- Verify CORS is enabled on backend
- Check browser console for specific errors

### Supabase auth errors
- Verify Supabase URL and key are correct
- Check Supabase dashboard for project status
- Ensure email confirmation is enabled in Supabase settings

### Stripe errors
- Use test card: `4242 4242 4242 4242`
- Verify you're using test mode keys
- Check browser console for Stripe errors

## Next Steps

1. Add your Stripe test key to `.env.development`
2. Test the full purchase flow
3. Review the code in `src/pages/` and `src/lib/`
4. Customize branding and styling as needed
5. Deploy to Vercel or Netlify for testing

## Support

- See full documentation in `README.md`
- Check `CLAUDE.md` at project root for system overview
- Review API endpoints in `src/lib/api.ts`

## Production Deployment

When ready to deploy:

1. Create `.env.production` with production values
2. Run `npm run build`
3. Deploy `dist/` folder to hosting platform
4. Update domain in Supabase redirect URLs

Happy coding!
