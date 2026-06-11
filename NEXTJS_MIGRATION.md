# Next.js Migration Guide

This project has been successfully converted from Vite + React Router to Next.js 15 with the App Router.

## Key Changes

### Directory Structure
- **Old**: `src/pages/` (React Router pages)
- **New**: `app/` (Next.js App Router)
  - `app/(pages)/` - Main pages (home, search, gallery)
  - `app/product/[id]/` - Dynamic product page
  - `app/layout.js` - Root layout

### Routing Changes
- React Router → Next.js App Router
- `useNavigate()` → `useRouter()` / `Link`
- `useLocation()` → `useSearchParams()` / `useParams()`
- Route parameters: `/product/:id` → `/product/[id]`

### Services
- Firebase setup moved to `lib/firebase.js`
- All imports updated from `@/src` to `@/lib`

### CSS & Styles
- All CSS files remain in `src/css/`
- Imported in `app/layout.js`
- CSS Modules or Tailwind can be added if needed

### Components
- Added `"use client"` directive to client components
- Updated navigation imports from React Router to Next.js Link
- All components in `src/components/`

## Installation & Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Environment Variables
Create a `.env.local` file:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=promptselz.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=promptselz
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=promptselz.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=129069832755
NEXT_PUBLIC_FIREBASE_APP_ID=1:129069832755:web:6986b5e52fb9357e2b2146
```

### 3. Run Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### 4. Build for Production
```bash
npm run build
npm start
```

## File Structure

```
promptselz/
├── app/                          # Next.js app directory
│   ├── (pages)/                 # Route group for main pages
│   │   ├── page.js             # Home page
│   │   ├── gallery/
│   │   │   └── page.js         # Gallery page
│   │   └── search/
│   │       └── page.js         # Search page
│   ├── product/
│   │   └── [id]/
│   │       └── page.js         # Product details page
│   └── layout.js               # Root layout
├── lib/                         # Utilities & services
│   └── firebase.js             # Firebase configuration
├── src/
│   ├── components/             # Reusable components
│   ├── css/                    # Stylesheets
│   ├── pages/                  # Old pages (can be deleted)
│   └── services/               # Old services (can be deleted)
├── public/                     # Static assets
├── next.config.js             # Next.js configuration
├── jsconfig.json             # Path aliases
└── package.json              # Dependencies

## Key Updates Made

### Components Updated
- `Header.jsx` - Now uses Next.js Link instead of useNavigate
- `ProductCard.jsx` - Now wraps in Link component
- `CategoryChip.jsx` - Added "use client" directive
- `AdSense.jsx` - Added "use client" directive

### Pages Created
- `app/(pages)/page.js` - Home page (equivalent to src/pages/Home.jsx)
- `app/(pages)/search/page.js` - Search page (equivalent to src/pages/Search.jsx)
- `app/(pages)/gallery/page.js` - Gallery page (equivalent to src/pages/Gallery.jsx)
- `app/product/[id]/page.js` - Product page (equivalent to src/pages/ProductView.jsx)

### Configuration Files
- `next.config.js` - Next.js configuration
- `jsconfig.json` - Path aliases (@/* for root imports)
- `.gitignore` - Updated for Next.js

## Migration Notes

1. **Static Generation**: Consider using `generateStaticParams()` in `app/product/[id]/page.js` for better performance
2. **Image Optimization**: Use Next.js `Image` component instead of `<img>` for better performance
3. **API Routes**: You can add API routes in `app/api/` if needed
4. **Middleware**: You can add middleware.js in the root for auth/redirects if needed

## Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Other Platforms
- Build: `npm run build`
- Start: `npm start`
- Public folder: `out/` after build

## Need Help?

- [Next.js Documentation](https://nextjs.org/docs)
- [App Router Guide](https://nextjs.org/docs/app)
- [Firebase with Next.js](https://firebase.google.com/docs/web/setup)
