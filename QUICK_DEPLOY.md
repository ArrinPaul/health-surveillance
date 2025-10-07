# Quick Deployment Instructions

## 🚀 Deploy to Vercel (Recommended)

### Method 1: GitHub Integration (Easiest)

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Sign in with your GitHub account

2. **Import Project**
   - Click "New Project"
   - Select "Import Git Repository"
   - Choose your `health-surveillance` repository
   - Click "Import"

3. **Configure Settings**
   - Framework Preset: `Next.js` (auto-detected)
   - Root Directory: `./` (default)
   - Build Command: `npm run build`
   - Output Directory: `.next`

4. **Add Environment Variables**
   ```
   CONVEX_DEPLOY_KEY=your_convex_deploy_key
   NEXT_PUBLIC_CONVEX_URL=your_convex_url
   JWT_SECRET=your_secure_jwt_secret_32_chars
   GEMINI_API_KEY=your_gemini_api_key
   OPENWEATHER_API_KEY=your_openweather_api_key
   NODE_ENV=production
   NEXT_PUBLIC_API_URL=https://your-domain.vercel.app
   NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Get your live URL!

### Method 2: Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

## 🔧 Required API Keys

### 1. Google Gemini AI API
- Go to: https://makersuite.google.com/app/apikey
- Create API key
- Copy to `GEMINI_API_KEY`

### 2. OpenWeather API
- Go to: https://openweathermap.org/api
- Sign up and get free API key
- Copy to `OPENWEATHER_API_KEY`

### 3. Convex Database
- Go to: https://convex.dev/
- Create project
- Get deployment key and URL
- Copy to `CONVEX_DEPLOY_KEY` and `NEXT_PUBLIC_CONVEX_URL`

### 4. JWT Secret
- Generate secure string (32+ characters)
- Use: `openssl rand -base64 32`
- Copy to `JWT_SECRET`

## ✅ Post-Deployment Checklist

1. **Test Authentication**
   - Try login/register
   - Test different user roles

2. **Test AI Features**
   - Symptom analysis
   - Health queries
   - Make sure API keys work

3. **Test Navigation**
   - All pages load correctly
   - Navigation links work
   - Mobile responsiveness

4. **Test PWA**
   - Install app prompt
   - Offline functionality
   - Performance

## 🎯 Your App Is Now Live!

After successful deployment:
- Your app will be available at: `https://your-project-name.vercel.app`
- Set up custom domain if needed
- Monitor performance with Vercel Analytics
- Check logs for any issues

## 📞 Support

If you encounter issues:
1. Check Vercel build logs
2. Verify environment variables
3. Test API endpoints
4. Review error messages in browser console

Your Health Surveillance System is production-ready! 🎉