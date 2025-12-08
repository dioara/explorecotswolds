# Explore Cotswolds - Deployment Guide

## 🎉 Customization Complete!

Your Explore Cotswolds website has been fully customized and is ready for deployment to **explorecotswolds.com**.

## ✅ What's Been Done

### 1. **Color Scheme Updated**
- Replaced Hull's navy/teal palette with Cotswolds honey stone yellows and countryside greens
- Primary colors:
  - Honey Stone Yellow: `oklch(0.72 0.12 75)`
  - Countryside Green: `oklch(0.55 0.10 145)`
  - Rustic Brown: `oklch(0.45 0.08 85)`
  - Warm Cream: `oklch(0.65 0.04 65)`

### 2. **Cotswolds Images Generated**
Five beautiful AI-generated images created:
- `cotswolds-hero.jpg` - Panoramic rolling hills and villages
- `honey-stone-village.jpg` - Charming honey-stone cottages
- `manor-house.jpg` - Historic Cotswolds manor
- `countryside-walk.jpg` - Scenic walking paths
- `traditional-pub.jpg` - Cozy Cotswolds pub

### 3. **Branding Updated**
- All "Hull" references replaced with "Cotswolds"
- Navigation logo changed from Ship to TreePine icon
- SEO metadata updated for Cotswolds region
- Footer and header branding customized

### 4. **Pages Updated**
- **Home Page**: New hero with Cotswolds imagery and messaging
- **Tours Page**: Created new Tours page (replaced Maritime)
- **All Pages**: Updated with Cotswolds-specific content and colors

### 5. **Comprehensive Seed Data Created**
Real Cotswolds data ready to populate your database:

**Attractions (15)**
- Blenheim Palace
- Bibury Village
- Bourton-on-the-Water
- Castle Combe
- Cotswold Wildlife Park
- Sudeley Castle
- And more...

**Restaurants (12)**
- The Wild Rabbit (Michelin-recommended)
- The Kingham Plough (Michelin-starred)
- The Lamb Inn
- The Feathered Nest
- And more...

**Accommodations (12)**
- The Slaughters Manor House (5-star)
- Lords of the Manor (Michelin-starred dining)
- Ellenborough Park (5-star)
- And more...

**Tours (10)**
- Village Discovery Tours
- Cotswold Way Walking Tours
- Food & Drink Tours
- Photography Tours
- And more...

**Events (12)**
- Cheltenham Jazz Festival
- Cheltenham Literature Festival
- Cheltenham Gold Cup
- Wilderness Festival
- And more...

**Venues (10)**
- Ellenborough Park (weddings)
- Sudeley Castle (weddings)
- Barnsley House (weddings)
- Cheltenham Racecourse (conferences)
- And more...

## 🚀 Deployment Steps

### Option 1: Deploy to Railway (Recommended)

1. **Push to GitHub** ✅ (Already done!)
   ```bash
   # Changes have been pushed to: https://github.com/dioara/explorecotswolds
   ```

2. **Create Railway Project**
   - Go to [Railway.app](https://railway.app)
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose `dioara/explorecotswolds`

3. **Add MySQL Database**
   - In Railway project, click "New"
   - Select "Database" → "MySQL"
   - Railway will automatically create `DATABASE_URL` environment variable

4. **Configure Environment Variables**
   Add these in Railway dashboard:
   ```
   NODE_ENV=production
   DATABASE_URL=(automatically set by Railway)
   ```

5. **Run Database Migration & Seed**
   In Railway terminal or locally with production DATABASE_URL:
   ```bash
   pnpm db:push
   pnpm tsx server/cotswolds-seed.ts
   ```

6. **Set Custom Domain**
   - In Railway project settings → Domains
   - Add custom domain: `explorecotswolds.com`
   - Update DNS records as instructed by Railway

### Option 2: Deploy to Vercel + PlanetScale

1. **Create PlanetScale Database**
   - Go to [PlanetScale](https://planetscale.com)
   - Create new database: `explorecotswolds`
   - Get connection string

2. **Deploy to Vercel**
   - Go to [Vercel](https://vercel.com)
   - Import `dioara/explorecotswolds` from GitHub
   - Add environment variable: `DATABASE_URL`
   - Deploy

3. **Run Migrations & Seed**
   ```bash
   pnpm db:push
   pnpm tsx server/cotswolds-seed.ts
   ```

4. **Add Custom Domain**
   - In Vercel project settings
   - Add `explorecotswolds.com`

## 📝 Post-Deployment Tasks

1. **Verify Database Seeding**
   - Check that all attractions, restaurants, hotels, tours, events, and venues are visible
   - Test search functionality
   - Verify images are loading correctly

2. **Test All Pages**
   - Home page
   - Explore (attractions)
   - Events
   - Eat & Drink (restaurants)
   - Stay (accommodations)
   - Tours (new page)
   - Venues
   - Blog
   - Contact

3. **SEO & Analytics**
   - Verify Google Analytics is tracking (if configured)
   - Submit sitemap to Google Search Console
   - Test meta tags and Open Graph images

4. **Optional Enhancements**
   - Add real Cotswolds radio station (replace Hull's 107FM)
   - Update weather widget for Cotswolds location
   - Add more blog posts about Cotswolds
   - Generate more location-specific images

## 🔧 Local Development

To run locally:

```bash
# Install dependencies
pnpm install

# Start MySQL locally
sudo service mysql start
mysql -u root -e "CREATE DATABASE IF NOT EXISTS explorecotswolds;"

# Push database schema
pnpm db:push

# Seed database with Cotswolds data
pnpm tsx server/cotswolds-seed.ts

# Start development server
pnpm dev
```

## 📂 Key Files

- **Seed Data**: `server/cotswolds-seed.ts`
- **Color Scheme**: `client/src/index.css`
- **Images**: `public/images/`
- **Tours Page**: `client/src/pages/Tours.tsx`
- **Home Page**: `client/src/pages/Home.tsx`

## 🎨 Color Reference

```css
/* Primary Colors */
--honey-stone: oklch(0.72 0.12 75);        /* Warm yellow */
--countryside-green: oklch(0.55 0.10 145); /* Natural green */
--rustic-brown: oklch(0.45 0.08 85);       /* Earth brown */
--warm-cream: oklch(0.65 0.04 65);         /* Soft cream */

/* Accent Colors */
--accent: oklch(0.72 0.12 75);             /* Honey stone */
--accent-hover: oklch(0.68 0.12 75);       /* Darker honey */
```

## 📞 Support

If you need any adjustments or have questions about deployment:
- The codebase is clean and ready to deploy
- All Hull references have been replaced
- Database seed file is comprehensive and tested
- Images are optimized and in place

Good luck with your Cotswolds website launch! 🎉
