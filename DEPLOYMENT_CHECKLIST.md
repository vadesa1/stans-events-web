# Deployment Checklist

Use this checklist before deploying the Stans Events consumer web app to production.

## Pre-Deployment Setup

### 1. Environment Configuration

- [ ] Add Stripe test publishable key to `.env.development`
- [ ] Add Stripe live publishable key to `.env.production`
- [ ] Verify Supabase URLs are correct in both env files
- [ ] Update App Store URL when iOS app is published

### 2. Dependencies

```bash
cd /Volumes/X10\ Pro/stans/stans-events-web
npm install
```

- [ ] All dependencies installed without errors
- [ ] No security vulnerabilities (`npm audit`)

### 3. Local Testing

```bash
npm run dev
```

- [ ] App runs on http://localhost:5173
- [ ] No console errors
- [ ] All pages load correctly
- [ ] Navigation works

## Functional Testing

### Authentication
- [ ] Sign up with new email
- [ ] Receive confirmation email from Supabase
- [ ] Confirm email and sign in
- [ ] Sign out works
- [ ] Protected routes redirect to login
- [ ] Login redirect works after auth

### Events
- [ ] Events load on home page
- [ ] Search works
- [ ] Event details page shows correct data
- [ ] Deals appear for events
- [ ] Distance calculations are accurate

### Deals
- [ ] Deal details page loads
- [ ] Pricing is correct
- [ ] Purchase button works
- [ ] Guest vs authenticated flow works

### Payments
- [ ] Checkout page loads with Stripe Elements
- [ ] Test card (4242 4242 4242 4242) works
- [ ] Payment success redirects to vouchers
- [ ] Payment failure shows error
- [ ] Purchase appears in backend

### Vouchers
- [ ] Purchased vouchers appear
- [ ] Voucher code is displayed
- [ ] Generate PIN works
- [ ] PIN displays correctly (6 digits)
- [ ] Redeemed vouchers show in history

### Profile
- [ ] Profile page loads with user data
- [ ] Edit name and phone works
- [ ] Changes save to database
- [ ] Email shows as read-only

### UI/UX
- [ ] Download app banner appears
- [ ] Banner can be dismissed
- [ ] All CTAs link to correct URLs
- [ ] Mobile responsive (test on phone)
- [ ] Tablet responsive
- [ ] Desktop layout looks good

## Code Quality

### TypeScript
```bash
npm run build
```

- [ ] No TypeScript errors
- [ ] Build completes successfully
- [ ] No type warnings

### Linting
```bash
npm run lint
```

- [ ] No ESLint errors
- [ ] Warnings addressed or documented

## Backend Verification

### QA Environment
- [ ] API accessible at https://stans-events-qa.onrender.com/api/v1
- [ ] Events endpoint returns data
- [ ] Deals endpoint returns data
- [ ] Auth endpoints work
- [ ] Payment endpoints work

### Production Environment
- [ ] API accessible at https://stans-events.onrender.com/api/v1
- [ ] All endpoints tested and working
- [ ] Stripe production keys configured on backend

## Supabase Configuration

### QA Project (dzmolzjevrhzesdqeqsv)
- [ ] Auth enabled
- [ ] Email confirmation enabled
- [ ] Users table exists
- [ ] Row level security configured

### Production Project (ugzgxijyosjaryvwimrq)
- [ ] Auth enabled
- [ ] Email confirmation enabled
- [ ] Users table exists
- [ ] Row level security configured
- [ ] Redirect URLs updated for production domain

## Build Process

### Development Build
```bash
npm run build:dev
```

- [ ] Build completes without errors
- [ ] dist/ folder created
- [ ] Assets optimized
- [ ] Environment variables embedded correctly

### Production Build
```bash
npm run build
```

- [ ] Build completes without errors
- [ ] dist/ folder created
- [ ] Production env variables used
- [ ] Bundle size acceptable (< 1MB recommended)

## Deployment Platform Setup

### Option A: Vercel (Recommended)

1. [ ] Connect GitHub repository
2. [ ] Configure environment variables:
   - VITE_SUPABASE_URL
   - VITE_SUPABASE_PUBLISHABLE_KEY
   - VITE_API_URL
   - VITE_STRIPE_PUBLISHABLE_KEY
   - VITE_APP_STORE_URL
3. [ ] Set build command: `npm run build`
4. [ ] Set output directory: `dist`
5. [ ] Deploy and test

### Option B: Netlify

1. [ ] Connect GitHub repository
2. [ ] Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. [ ] Add environment variables
4. [ ] Enable automatic deployments
5. [ ] Deploy and test

### Option C: Custom Hosting

1. [ ] Upload dist/ folder to server
2. [ ] Configure web server (nginx/Apache)
3. [ ] Set up SSL certificate
4. [ ] Configure redirects for SPA routing
5. [ ] Test deployment

## Post-Deployment Verification

### Production URLs
- [ ] Main domain accessible (e.g., stans.app)
- [ ] SSL certificate valid
- [ ] All pages load correctly
- [ ] No mixed content warnings

### Functionality on Production
- [ ] Sign up works
- [ ] Sign in works
- [ ] Event browsing works
- [ ] Deal viewing works
- [ ] Stripe checkout works (test mode first!)
- [ ] Vouchers display
- [ ] Profile editing works

### Performance
- [ ] Page load time < 3 seconds
- [ ] Images optimized
- [ ] No console errors
- [ ] Lighthouse score > 80

### Analytics & Monitoring
- [ ] Google Analytics installed (if applicable)
- [ ] Error tracking configured (Sentry, etc.)
- [ ] User tracking working

## Domain & DNS

- [ ] Custom domain configured
- [ ] DNS records updated
- [ ] SSL certificate issued
- [ ] www redirect configured
- [ ] Update Supabase redirect URLs with production domain

## Supabase Redirect URLs

Update in Supabase dashboard → Authentication → URL Configuration:

QA:
- http://localhost:5173/*
- https://qa.stans.app/*
- https://events.qa.stans.app/*

Production:
- https://stans.app/*
- https://www.stans.app/*
- https://events.stans.app/*

## Final Checks

- [ ] All placeholder text replaced
- [ ] All TODO comments addressed
- [ ] Console.logs removed from production code
- [ ] Error messages are user-friendly
- [ ] Privacy policy link (if required)
- [ ] Terms of service link (if required)

## Launch Day

- [ ] Monitor error logs
- [ ] Watch for unusual activity
- [ ] Test critical paths
- [ ] Monitor Stripe dashboard
- [ ] Check Supabase usage
- [ ] Verify email delivery

## Rollback Plan

If issues occur:

1. [ ] Revert to previous deployment
2. [ ] Check error logs
3. [ ] Fix issues locally
4. [ ] Test thoroughly
5. [ ] Redeploy

## Post-Launch Tasks

- [ ] Announce launch
- [ ] Monitor user feedback
- [ ] Track analytics
- [ ] Plan feature enhancements
- [ ] Schedule regular backups
- [ ] Set up monitoring alerts

## Support Contacts

- **Backend API**: [Contact info]
- **Supabase Support**: support@supabase.io
- **Stripe Support**: support@stripe.com
- **Hosting Support**: [Platform specific]

---

**Checklist Version**: 1.0
**Last Updated**: November 2025
**Project**: Stans Events Consumer Web App
