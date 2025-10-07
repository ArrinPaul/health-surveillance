# Deployment Guide for Health Surveillance System

This guide provides detailed instructions for deploying the Health Surveillance System to Vercel.

## Prerequisites

- GitHub account with the project repository
- Vercel account (free tier available)
- Required API keys (see below)

## Required API Keys

Before deployment, ensure you have the following API keys:

1. **Google Gemini API Key**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Sign in with your Google account
   - Create a new API key
   - Copy the key for use in environment variables

2. **OpenWeather API Key**
   - Visit [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for a free account
   - Generate an API key
   - Copy the key for use in environment variables

3. **Convex Database Setup**
   - Visit [Convex](https://convex.dev/)
   - Create a new project
   - Get your deployment key and URL
   - Copy both values for environment variables

4. **JWT Secret**
   - Generate a secure random string (32+ characters)
   - You can use: `openssl rand -base64 32`
   - Or use an online JWT secret generator

## Deployment Steps

### Step 1: Prepare Repository

1. Ensure your code is committed to GitHub
2. Make sure `.env` file is in `.gitignore` (it should not be committed)
3. Verify that `.env.example` exists with all required variables

### Step 2: Connect to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Select "Import Git Repository"
4. Choose your GitHub repository
5. Click "Import"

### Step 3: Configure Project Settings

1. **Framework Preset**: Next.js (should be auto-detected)
2. **Root Directory**: Leave as default (`./`)
3. **Build Command**: `npm run build` (default)
4. **Output Directory**: `.next` (default)
5. **Install Command**: `npm install` (default)

### Step 4: Add Environment Variables

In the Vercel project settings, add the following environment variables:

```
CONVEX_DEPLOY_KEY=your_actual_convex_deploy_key
NEXT_PUBLIC_CONVEX_URL=your_actual_convex_url
JWT_SECRET=your_generated_jwt_secret
GEMINI_API_KEY=your_actual_gemini_api_key
OPENWEATHER_API_KEY=your_actual_openweather_api_key
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://your-domain.vercel.app
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
CORS_ORIGIN=https://your-domain.vercel.app
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100
```

**Important Notes:**
- Replace `your-domain` with your actual Vercel domain
- Use your actual API keys (not placeholder text)
- Environment variables in Vercel are secure and encrypted
- These variables are not exposed to the client-side code

### Step 5: Deploy

1. Click "Deploy" button
2. Wait for the build process to complete
3. Once deployed, you'll get a URL like `https://your-project-name.vercel.app`

### Step 6: Verify Deployment

1. Visit your deployed URL
2. Test the login functionality
3. Check that AI features work (they require API keys)
4. Verify that maps and other features load correctly

## Post-Deployment Configuration

### Custom Domain (Optional)

1. Go to your project settings in Vercel
2. Navigate to "Domains" tab
3. Add your custom domain
4. Follow DNS configuration instructions

### Environment Variables Updates

To update environment variables after deployment:

1. Go to Vercel project settings
2. Navigate to "Environment Variables"
3. Edit or add new variables
4. Redeploy the project for changes to take effect

### Analytics and Monitoring

The project includes:
- Vercel Analytics (already configured)
- Performance monitoring
- Error tracking

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check that all dependencies are in `package.json`
   - Verify TypeScript configuration
   - Ensure no syntax errors in code

2. **API Key Issues**
   - Verify all environment variables are set correctly
   - Check API key validity and quotas
   - Ensure proper formatting of keys

3. **Runtime Errors**
   - Check Vercel function logs
   - Verify CORS configuration
   - Check for missing environment variables

### Debugging

1. **Check Build Logs**
   - Go to Vercel dashboard
   - Select your project
   - View build logs for errors

2. **Function Logs**
   - Navigate to "Functions" tab
   - View runtime logs for API routes

3. **Performance Monitoring**
   - Use Vercel Analytics
   - Check Core Web Vitals
   - Monitor response times

## Security Considerations

1. **Environment Variables**
   - Never commit `.env` file to version control
   - Use strong, unique secrets
   - Rotate API keys regularly

2. **API Security**
   - Implement rate limiting (already configured)
   - Validate all inputs
   - Use HTTPS only (enforced by Vercel)

3. **Authentication**
   - Use strong JWT secrets
   - Implement proper session management
   - Add login rate limiting

## Maintenance

### Regular Updates

1. Keep dependencies updated
2. Monitor security advisories
3. Check API key quotas and usage
4. Review and update environment variables

### Backup and Recovery

1. Export Convex data regularly
2. Keep environment variables documented
3. Maintain development environment parity

## Support

For deployment issues:
1. Check Vercel documentation
2. Review project logs
3. Contact support if needed

## Performance Optimization

The project includes:
- Image optimization
- Code splitting
- Server-side rendering
- Static generation where possible
- Service worker for offline functionality

Your Health Surveillance System should now be successfully deployed on Vercel with all features functional.