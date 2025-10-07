# 🚀 Enable Real-Time Features - Step by Step

## ✅ Step 1: Install Convex (DONE)
```powershell
npm install convex
```

## 📋 Step 2: Run Convex Setup

Open a **new PowerShell terminal** and run:

```powershell
npx convex dev
```

### What will happen:
1. ✅ Opens your browser automatically
2. ✅ Prompts you to login/signup (use GitHub, Google, or email)
3. ✅ Creates a new Convex project
4. ✅ Generates `convex/_generated/` folder
5. ✅ Shows you a deployment URL like: `https://your-project-123.convex.cloud`

### Important Notes:
- ⏰ This process takes 2-3 minutes
- 🔐 Convex is **100% FREE** (no credit card needed)
- 📦 Free tier: 1GB storage, 1M function calls/month
- ✅ The terminal will stay open - that's normal!

---

## 📝 Step 3: Copy Your Deployment URL

After `npx convex dev` completes, you'll see:

```
✓ Deployment URL: https://your-project-123.convex.cloud
```

**COPY THIS URL!** You'll need it in the next step.

---

## 🔧 Step 4: Create .env.local File

Create a new file called `.env.local` in your project root with this content:

```env
# Convex Real-Time Database
NEXT_PUBLIC_CONVEX_URL=https://your-project-123.convex.cloud

# Google Gemini AI (already have this)
NEXT_PUBLIC_GEMINI_API_KEY=AIzaSyCjkFq967aetPL-8S2ltdC13zozhYdLvaE

# JWT Secret for Authentication
JWT_SECRET=health-surveillance-secret-key-change-in-production-2025
```

**Replace** `https://your-project-123.convex.cloud` with YOUR actual URL from Step 3!

---

## ✏️ Step 5: Uncomment ConvexProvider

Open: `src/components/ClientProviders.tsx`

Find these lines and **uncomment them**:

### Line 8-9: Uncomment imports
**Before:**
```typescript
// import { ConvexProvider, ConvexReactClient } from "convex/react";
// const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
```

**After:**
```typescript
import { ConvexProvider, ConvexReactClient } from "convex/react";
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
```

### Line 14: Uncomment opening tag
**Before:**
```typescript
// <ConvexProvider client={convex}>
```

**After:**
```typescript
<ConvexProvider client={convex}>
```

### Line 20: Uncomment closing tag
**Before:**
```typescript
// </ConvexProvider>
```

**After:**
```typescript
</ConvexProvider>
```

---

## 🎯 Step 6: Update Dashboard to Use Real Data

Open: `src/app/dashboard/page.tsx`

Add these imports at the top:

```typescript
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
```

Then replace mock data with real queries. For example:

**Before:**
```typescript
const healthData = mockHealthData;
```

**After:**
```typescript
const healthData = useQuery(api.healthData.getUserHealthData, {
  userId: user?.id || "",
});
```

---

## 🚀 Step 7: Start Your App

In a **new terminal** (keep `npx convex dev` running!):

```powershell
npm run dev
```

Open: http://localhost:3000

---

## ✅ Step 8: Test Real-Time Updates

1. Open your app in **two browser windows**
2. Make a change in one window (e.g., update health data)
3. Watch it appear **instantly** in the other window! 🎉

---

## 🎉 You're Live!

Your app now has:
- ✅ Real-time data synchronization
- ✅ WebSocket-powered updates
- ✅ Full database persistence
- ✅ Multi-user collaboration
- ✅ Automatic offline sync

---

## 🐛 Troubleshooting

### Browser didn't open?
Manually go to: https://dashboard.convex.dev

### "Cannot find module convex/react"?
```powershell
npm install convex
```

### Build errors after enabling?
```powershell
Remove-Item -Recurse -Force .next
npm run build
```

### Convex dev not starting?
Make sure you're in the project root directory where `convex/` folder exists.

---

## 📊 What Happens Next

### Immediate:
- All data now persists to Convex database
- Changes sync across all connected clients in <100ms
- Dashboard shows real-time metrics

### Soon:
- Add real-time alerts system
- Connect IoT water sensors
- Enable push notifications
- Deploy to production with Convex

---

## 🎯 Current Progress

- ✅ Convex package installed
- ⏳ Need to run: `npx convex dev`
- ⏳ Need to create: `.env.local`
- ⏳ Need to uncomment: `ConvexProvider`
- ⏳ Need to update: Dashboard queries

---

## 💡 Quick Reference

### Terminal 1 (Keep Running):
```powershell
npx convex dev
```

### Terminal 2 (Dev Server):
```powershell
npm run dev
```

### Deploy to Production:
```powershell
npx convex deploy
git add .
git commit -m "Enable real-time features with Convex"
git push origin main
```

---

## ✨ Summary

You're 5 steps away from real-time data:

1. ✅ Install Convex (DONE)
2. ⏳ Run `npx convex dev`
3. ⏳ Copy URL to `.env.local`
4. ⏳ Uncomment ConvexProvider
5. ⏳ Start app with `npm run dev`

**Ready? Run `npx convex dev` now!** 🚀
