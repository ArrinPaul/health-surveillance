# Deployment Guide - Health Surveillance System

This guide provides step-by-step instructions for deploying the Health Surveillance System to production environments, with a focus on Vercel deployment.

## Pre-Deployment Checklist

### Code Preparation
- [ ] All features tested locally
- [ ] Build process completes without errors
- [ ] Environment variables documented
- [ ] Security configurations verified
- [ ] Performance optimizations applied
- [ ] Multi-language support tested

### Environment Variables Required
```env
# Convex Database
CONVEX_DEPLOY_KEY=your_convex_deploy_key
NEXT_PUBLIC_CONVEX_URL=your_convex_url

# JWT Secret (generate a secure random string)
JWT_SECRET=your_jwt_secret_key

# API Keys
GEMINI_API_KEY=your_gemini_api_key
OPENWEATHER_API_KEY=your_openweather_api_key

# Application Configuration
NODE_ENV=production
PORT=3000
BACKEND_PORT=5000
NEXT_PUBLIC_API_URL=https://your-app-name.vercel.app
NEXT_PUBLIC_APP_URL=https://your-app-name.vercel.app

# Security Configuration
CORS_ORIGIN=https://your-app-name.vercel.app
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100
```

## Vercel Deployment (Recommended)

Vercel provides the best hosting solution for Next.js applications with automatic deployments and excellent performance.

### Step 1: Prepare Your Repository

1. **Ensure your code is committed to Git**
```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

2. **Test build locally**
```bash
npm run build
npm start
```

### Step 2: Set Up Vercel Account

1. **Sign up for Vercel**
   - Visit https://vercel.com
   - Sign up using GitHub, GitLab, or Bitbucket
   - Connect your repository

2. **Install Vercel CLI** (optional)
```bash
npm install -g vercel
vercel login
```

### Step 3: Deploy via Vercel Dashboard

1. **Import Project**
   - Click "New Project" in Vercel Dashboard
   - Import from your Git provider
   - Select the health-surveillance repository

2. **Configure Build Settings**
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

3. **Environment Variables**
   Add all environment variables from the checklist above.

### Step 4: Deploy via CLI (Alternative)

```bash
# In your project directory
vercel

# Follow the prompts:
# Set up and deploy? [Y/n] y
# Which scope? Select your account
# Link to existing project? [y/N] n
# What's your project's name? health-surveillance
# In which directory is your code located? ./

# For production deployment
vercel --prod
```

### Step 5: Configure Custom Domain (Optional)

1. **Add Domain in Vercel Dashboard**
   - Go to Project Settings > Domains
   - Add your custom domain
   - Follow DNS configuration instructions

2. **Update Environment Variables**
   - Update `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_APP_URL`
   - Update `CORS_ORIGIN` to match your domain

## Backend Deployment Options

The backend can be deployed using several approaches:

### Option 1: Vercel Serverless Functions (Recommended)

Convert your Express.js routes to Vercel serverless functions:

1. **Create API routes structure**
```
pages/api/
├── auth/
│   ├── login.js
│   ├── register.js
│   └── logout.js
├── chatbot/
│   └── message.js
├── health/
│   ├── reports.js
│   └── analytics.js
└── water/
    └── quality.js
```

2. **Convert Express routes to Vercel functions**
```javascript
// pages/api/auth/login.js
export default function handler(req, res) {
  if (req.method === 'POST') {
    // Your authentication logic here
    const { email, password } = req.body;
    // Process login
    res.status(200).json({ success: true });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
```

### Option 2: Railway Deployment

1. **Create Railway account**
   - Visit https://railway.app
   - Sign up with GitHub

2. **Deploy backend**
```bash
cd src/backend
railway login
railway init
railway up
```

3. **Configure environment variables in Railway dashboard**

4. **Update frontend environment variables**
   - Set `NEXT_PUBLIC_API_URL` to your Railway backend URL

### Option 3: Render Deployment

1. **Create Render account**
   - Visit https://render.com
   - Connect your GitHub repository

2. **Create new Web Service**
   - Select your repository
   - Set build command: `cd src/backend && npm install`
   - Set start command: `cd src/backend && npm start`

3. **Configure environment variables**

## Database Setup (Convex)

### Development Database

1. **Install Convex CLI**
```bash
npm install -g convex
```

2. **Initialize Convex**
```bash
npx convex dev
```

3. **Follow setup prompts**
   - Create account or login
   - Create new project
   - Copy deployment key

### Production Database

1. **Deploy to production**
```bash
npx convex deploy --prod
```

2. **Update environment variables**
   - Use production deployment key
   - Update Convex URL

## Performance Optimization

### Build Optimization

1. **Next.js Configuration**
Create or update `next.config.js`:
```javascript
const nextConfig = {
  experimental: {
    optimizeCss: true,
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  images: {
    domains: ['example.com'],
    formats: ['image/webp', 'image/avif'],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
```

2. **Bundle Analysis**
```bash
npm install --save-dev @next/bundle-analyzer
```

### Caching Strategy

1. **Create vercel.json**
```json
{
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "s-maxage=60, stale-while-revalidate"
        }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/api/backend/(.*)",
      "destination": "https://your-backend-url.com/$1"
    }
  ]
}
```

## Security Configuration

### Security Headers

1. **Content Security Policy**
Add to `next.config.js`:
```javascript
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  }
];

module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};
```

### Environment Security

1. **Production Environment Variables**
   - Use strong JWT secrets (32+ characters)
   - Rotate API keys regularly
   - Use HTTPS URLs only
   - Restrict CORS origins

2. **API Key Security**
   - Store sensitive keys in Vercel environment variables
   - Use API key rotation
   - Monitor API usage

## Monitoring and Analytics

### Vercel Analytics

1. **Enable Vercel Analytics**
```bash
npm install @vercel/analytics
```

2. **Add to your app**
```javascript
// pages/_app.js
import { Analytics } from '@vercel/analytics/react';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
```

### Error Monitoring

1. **Sentry Integration**
```bash
npm install @sentry/nextjs
```

2. **Configure Sentry**
```javascript
// sentry.client.config.js
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
});
```

## Testing Deployment

### Pre-Launch Testing

1. **Functional Testing**
   - [ ] User registration and login
   - [ ] Language switching (all 15 languages)
   - [ ] AI chatbot functionality
   - [ ] Voice synthesis
   - [ ] Water quality data submission
   - [ ] Health report creation
   - [ ] Mobile responsiveness

2. **Performance Testing**
   - [ ] Page load speeds < 3 seconds
   - [ ] API response times < 1 second
   - [ ] Image optimization
   - [ ] Bundle size optimization

3. **Security Testing**
   - [ ] HTTPS enforcement
   - [ ] Security headers
   - [ ] Input validation
   - [ ] Authentication flows
   - [ ] API rate limiting

### Load Testing

1. **Test with Artillery**
```bash
npm install -g artillery
artillery quick --count 50 --num 5 https://your-app.vercel.app
```

2. **Monitor performance**
   - Use Vercel Analytics
   - Check API response times
   - Monitor database performance

## Maintenance and Updates

### Continuous Deployment

1. **Automatic deployments**
   - Vercel automatically deploys on Git push
   - Set up staging environments for testing

2. **Environment promotion**
   - Test changes in staging
   - Promote to production after validation

### Backup Strategy

1. **Database backups**
   - Regular Convex data exports
   - Version control for schema changes

2. **Code backups**
   - Git repository backups
   - Tagged releases

## Troubleshooting

### Common Issues

#### Build Failures
```bash
# Clear build cache
rm -rf .next
rm -rf node_modules
npm install
npm run build
```

#### Environment Variable Issues
- Check variable names in Vercel dashboard
- Ensure all required variables are set
- Verify variable values are correct

#### Performance Issues
- Check bundle size with bundle analyzer
- Optimize images and assets
- Review API response times

### Getting Help

1. **Vercel Support**
   - Check Vercel documentation
   - Use Vercel community Discord
   - Contact Vercel support for pro accounts

2. **Project Support**
   - Create issues in project repository
   - Check deployment logs
   - Review application logs

## Cost Optimization

### Vercel Pricing Tiers

1. **Free Tier** (Suitable for small deployments)
   - 100GB bandwidth per month
   - 100 builds per month
   - 10 serverless functions

2. **Pro Tier** (Recommended for production)
   - 1TB bandwidth per month
   - Unlimited builds
   - Advanced analytics
   - Custom domains

### Backend Hosting Costs

1. **Railway**: Pay-as-you-go pricing
2. **Render**: Free tier available, paid tiers from $7/month
3. **Heroku**: Free tier discontinued, paid tiers from $5/month

Choose based on your expected traffic and budget requirements.

## Conclusion

This deployment guide covers the complete process of deploying the Health Surveillance System to production. Follow these steps carefully and test thoroughly before making the system available to end users.

For additional support or questions about deployment, please refer to the project documentation or create an issue in the repository.