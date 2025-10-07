#!/bin/bash

# Health Surveillance System Deployment Script
# This script helps deploy the application to Vercel

echo "🚀 Health Surveillance System Deployment"
echo "========================================"

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Build the application
echo "🔨 Building application..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed. Please fix errors before deployment."
    exit 1
fi

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

echo "🎉 Deployment complete!"
echo ""
echo "📋 Post-deployment checklist:"
echo "1. Set up environment variables in Vercel dashboard"
echo "2. Test all user flows and API endpoints"
echo "3. Verify mobile responsiveness"
echo "4. Check PWA functionality"
echo ""
echo "📖 For detailed instructions, see DEPLOYMENT.md"