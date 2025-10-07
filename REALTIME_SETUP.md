# 🚀 Real-Time Data Setup Guide

This guide will help you enable real-time data in your Health Surveillance application.

## ✅ Prerequisites

1. Node.js 18+ installed
2. Convex account (free): https://convex.dev
3. API Keys (already configured in `.env`)

## 📋 Setup Steps

### Step 1: Install Convex CLI
```bash
npm install -g convex
```

### Step 2: Initialize Convex
```bash
npx convex dev
```

This will:
- Create a Convex project
- Generate `./_generated/server` files
- Start the Convex development server
- Give you a deployment URL

### Step 3: Update Environment Variables

Add these to your `.env.local`:
```env
# Convex
NEXT_PUBLIC_CONVEX_URL=https://your-project.convex.cloud
CONVEX_DEPLOY_KEY=your-deploy-key

# Existing variables (keep these)
NEXT_PUBLIC_GEMINI_API_KEY=your-key
JWT_SECRET=your-jwt-secret
```

### Step 4: Enable Convex Provider

Uncomment the ConvexProvider in `src/components/ClientProviders.tsx`:

```tsx
import { ConvexProvider, ConvexReactClient } from "convex/react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ConvexProvider client={convex}>
      <SettingsProvider>
        <AuthProvider>
          <AppLayout>{children}</AppLayout>
        </AuthProvider>
      </SettingsProvider>
    </ConvexProvider>
  );
}
```

### Step 5: Update Dashboard to Use Real Data

The dashboard will automatically use Convex queries for:
- Real-time health metrics
- Live disease tracking
- User activity monitoring
- Alert notifications

### Step 6: Deploy to Vercel

```bash
# Add Convex environment variables to Vercel
vercel env add NEXT_PUBLIC_CONVEX_URL
vercel env add CONVEX_DEPLOY_KEY

# Deploy
git add .
git commit -m "Enable real-time data with Convex"
git push origin main
```

## 🔄 What Changes to Real-Time

### Before (Mock Data):
- Static health records
- Simulated disease cases
- Fake user profiles
- No live updates

### After (Real-Time Data):
- Live health data from Convex database
- Real-time disease outbreak tracking
- Actual user authentication and profiles
- Instant updates across all clients
- Persistent data storage

## 📊 Real-Time Features Enabled

1. **Health Data Tracking**
   - Blood pressure, heart rate, temperature
   - Symptom logging with timestamps
   - Historical trends and analytics

2. **Disease Surveillance**
   - Live outbreak notifications
   - Geographic disease mapping
   - Community health reports

3. **User Management**
   - Secure authentication with JWT
   - Profile management
   - Activity tracking

4. **AI Integration**
   - Google Gemini chatbot (already real-time)
   - Health predictions based on real data
   - Personalized recommendations

5. **Water Quality Monitoring**
   - Real-time sensor data (when connected)
   - pH, turbidity, contamination levels
   - Alert system for unsafe water

## 🧪 Testing Real-Time Data

1. Open two browser windows
2. Log in to both
3. Add health data in one window
4. See instant update in the other window

## 📱 Data Flow Architecture

```
User Action → Next.js Frontend → Convex Mutation → Database
                                       ↓
Other Clients ← WebSocket Update ← Convex Query
```

## ⚠️ Important Notes

- Convex free tier: 1GB storage, 1M function calls/month
- All data is encrypted in transit and at rest
- Real-time updates use WebSockets (no polling)
- Offline support with automatic sync

## 🆘 Troubleshooting

### Error: "Cannot find module './_generated/server'"
**Solution:** Run `npx convex dev` to generate server files

### Error: "NEXT_PUBLIC_CONVEX_URL is not defined"
**Solution:** Add the URL to `.env.local` after running `npx convex dev`

### Data not updating in real-time
**Solution:** Check browser console for WebSocket connection errors

## 🔗 Resources

- Convex Docs: https://docs.convex.dev
- Next.js Integration: https://docs.convex.dev/quickstart/nextjs
- Convex Dashboard: https://dashboard.convex.dev
