# ExploreCotswolds.com 🏰

A dynamic, comprehensive tourism website for the Cotswolds, England - showcasing the region's charming villages, historic attractions, award-winning restaurants, and beautiful countryside accommodations.

![ExploreCotswolds Homepage](https://img.shields.io/badge/Status-Development-yellow)
![Database](https://img.shields.io/badge/Listings-TBD-blue)
![Tests](https://img.shields.io/badge/Tests-TBD-yellow)

## 🌟 Features

### Content & Data
- **Attractions** - Historic villages, manor houses, gardens, museums, scenic viewpoints
- **Events** - Country fairs, farmers markets, festivals, seasonal celebrations
- **Restaurants** - Traditional pubs, fine dining, cafes featuring local Cotswolds produce
- **Accommodations** - Country hotels, B&Bs, cottages, luxury manor houses
- **Tours** - Village tours, walking experiences, countryside drives
- **Venues** - Wedding venues, event spaces across the Cotswolds

### Functionality
- ✅ **Powerful Search** - Real-time search across all content types with tabbed results
- ✅ **SEO Optimized** - Meta tags, Open Graph, structured data (JSON-LD), sitemap, robots.txt
- ✅ **Interactive Maps** - Google Maps integration on attraction detail pages
- ✅ **Responsive Design** - Mobile-first, works beautifully on all devices
- ✅ **Contact Forms** - Working contact form with database storage
- ✅ **Newsletter Signup** - Email subscription functionality
- ✅ **Click-to-Call** - Phone numbers with tel: links for mobile users
- ✅ **Get Directions** - One-click navigation to Google Maps

### Design
- **Modern UI** - Clean, minimalistic design with professional aesthetics
- **Custom Color Palette** - Honey stone yellows, countryside greens, rustic tones
- **Typography** - Inter for headlines, Open Sans for body text
- **AI-Generated Images** - Custom imagery for Cotswolds villages and landscapes

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first styling
- **shadcn/ui** - High-quality component library
- **Wouter** - Lightweight routing
- **TanStack Query** - Data fetching and caching

### Backend
- **Node.js 22** - Runtime environment
- **Express 4** - Web server
- **tRPC 11** - End-to-end typesafe APIs
- **Drizzle ORM** - Type-safe database queries
- **MySQL/TiDB** - Relational database
- **Zod** - Schema validation

### Development
- **Vite 7** - Fast build tool
- **Vitest** - Unit testing (19 tests passing)
- **pnpm** - Fast, efficient package manager
- **TypeScript 5.9** - Static type checking

## 📦 Installation

### Prerequisites
- Node.js 22+
- pnpm 10+
- MySQL or TiDB database

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/dioara/explorecotswolds.git
cd explorecotswolds
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Set up environment variables**
Create a `.env` file in the root directory:
```env
DATABASE_URL=mysql://user:password@host:port/database
JWT_SECRET=your-jwt-secret-here
VITE_APP_ID=your-app-id
OAUTH_SERVER_URL=your-oauth-server
VITE_OAUTH_PORTAL_URL=your-oauth-portal
```

4. **Run database migrations**
```bash
pnpm db:push
```

5. **Seed the database**
```bash
pnpm exec tsx server/expanded-seed.ts
```

6. **Start development server**
```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

## 🧪 Testing

Run the test suite:
```bash
pnpm test
```

All 19 tests should pass:
- ✅ Authentication tests (1)
- ✅ Contact form tests (3)
- ✅ Attractions API tests (5)
- ✅ Events API tests (5)
- ✅ Search functionality tests (5)

## 📁 Project Structure

```
explorecotswolds/
├── client/                 # Frontend React application
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── lib/           # Utilities and tRPC client
│   │   └── App.tsx        # Main app component
├── server/                # Backend Express + tRPC
│   ├── _core/             # Core server infrastructure
│   ├── db.ts              # Database queries
│   ├── routers.ts         # tRPC API routes
│   └── *.test.ts          # Test files
├── drizzle/               # Database schema and migrations
│   └── schema.ts          # Database tables
└── shared/                # Shared types and constants
```

## 🗺️ Key Routes

- `/` - Homepage with hero, search, featured content
- `/explore` - Browse all attractions with filters
- `/events` - Upcoming events calendar
- `/eat-drink` - Restaurant listings by cuisine
- `/stay` - Accommodation options
- `/blog` - Travel guides and articles
- `/villages` - Cotswolds villages guide
- `/travel-info` - Practical visitor information
- `/contact` - Contact form
- `/search?q=query` - Search results
- `/attraction/:slug` - Attraction detail page
- `/event/:slug` - Event detail page
- `/restaurant/:slug` - Restaurant detail page

## 🔌 API Endpoints (tRPC)

### Attractions
- `attractions.list` - Get all attractions
- `attractions.featured` - Get featured attractions
- `attractions.bySlug` - Get attraction by slug
- `attractions.byCategory` - Filter by category

### Events
- `events.list` - Get all events
- `events.upcoming` - Get upcoming events
- `events.featured` - Get featured events
- `events.bySlug` - Get event by slug
- `events.byCategory` - Filter by category

### Restaurants
- `restaurants.list` - Get all restaurants
- `restaurants.featured` - Get featured restaurants
- `restaurants.bySlug` - Get restaurant by slug
- `restaurants.byCuisine` - Filter by cuisine

### Search
- `search.query` - Global search across all content

### Contact
- `contact.submit` - Submit contact form

### Newsletter
- `newsletter.subscribe` - Subscribe to newsletter

## 🎨 Design System

### Colors
- **Honey Stone**: TBD - Warm yellows inspired by Cotswolds stone
- **Countryside Green**: TBD - Natural greens from rolling hills
- **Rustic Brown**: TBD - Earthy tones

### Typography
- **Headings**: Inter (Google Fonts)
- **Body**: Open Sans (Google Fonts)

### Components
All UI components from shadcn/ui:
- Buttons, Cards, Dialogs, Forms
- Navigation, Tabs, Badges
- Input fields, Select dropdowns
- Responsive layouts

## 📈 SEO Features

- ✅ Meta tags (title, description, keywords)
- ✅ Open Graph tags for social sharing
- ✅ Twitter Card metadata
- ✅ JSON-LD structured data (Organization, LocalBusiness, Event, Restaurant)
- ✅ Semantic HTML5 elements
- ✅ Dynamic sitemap generation (`/api/sitemap`)
- ✅ robots.txt configuration
- ✅ Canonical URLs
- ✅ Image alt tags
- ✅ Mobile-responsive design

## 🚀 Deployment

### Build for production
```bash
pnpm build
```

### Start production server
```bash
pnpm start
```

The build output will be in the `dist/` directory.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 🔗 Links

- **Live Site**: [explorecotswolds.com](https://explorecotswolds.com) (Coming Soon)
- **GitHub**: [github.com/dioara/explorecotswolds](https://github.com/dioara/explorecotswolds)

## 📧 Contact

For inquiries about ExploreCotswolds.com, please contact: contact@lampstand.consulting

---

Built with ❤️ for the Cotswolds, England - Area of Outstanding Natural Beauty

Cloned from Explore Hull and customized for the Cotswolds region.
