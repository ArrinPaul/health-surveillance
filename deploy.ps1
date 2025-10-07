# Health Surveillance System Deployment Script (PowerShell)
# This script helps deploy the application to Vercel

Write-Host "🚀 Health Surveillance System Deployment" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# Check if Vercel CLI is installed
$vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue
if (-not $vercelInstalled) {
    Write-Host "📦 Installing Vercel CLI..." -ForegroundColor Yellow
    npm install -g vercel
}

# Build the application
Write-Host "🔨 Building application..." -ForegroundColor Yellow
$buildResult = npm run build
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build successful!" -ForegroundColor Green
} else {
    Write-Host "❌ Build failed. Please fix errors before deployment." -ForegroundColor Red
    exit 1
}

# Deploy to Vercel
Write-Host "🚀 Deploying to Vercel..." -ForegroundColor Yellow
vercel --prod

Write-Host "🎉 Deployment complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Post-deployment checklist:" -ForegroundColor Cyan
Write-Host "1. Set up environment variables in Vercel dashboard" -ForegroundColor White
Write-Host "2. Test all user flows and API endpoints" -ForegroundColor White
Write-Host "3. Verify mobile responsiveness" -ForegroundColor White
Write-Host "4. Check PWA functionality" -ForegroundColor White
Write-Host ""
Write-Host "📖 For detailed instructions, see DEPLOYMENT.md" -ForegroundColor Cyan