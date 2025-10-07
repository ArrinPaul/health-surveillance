#!/usr/bin/env pwsh
# PowerShell script to set up real-time data with Convex

Write-Host ""
Write-Host "🚀 Health Surveillance - Real-Time Data Setup" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
Write-Host "📋 Checking prerequisites..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js $nodeVersion installed" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js not found. Please install Node.js 18+ first." -ForegroundColor Red
    Write-Host "Download: https://nodejs.org/" -ForegroundColor White
    exit 1
}

# Check if npm is installed
try {
    $npmVersion = npm --version
    Write-Host "✓ npm $npmVersion installed" -ForegroundColor Green
} catch {
    Write-Host "✗ npm not found." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "📦 Installing Convex package..." -ForegroundColor Yellow
npm install convex

if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Failed to install Convex package" -ForegroundColor Red
    exit 1
}

Write-Host "✓ Convex package installed" -ForegroundColor Green
Write-Host ""

Write-Host "🔧 Setting up Convex..." -ForegroundColor Yellow
Write-Host ""
Write-Host "IMPORTANT INFORMATION:" -ForegroundColor Cyan
Write-Host "1. Convex is FREE (no credit card needed)" -ForegroundColor White
Write-Host "2. Free tier: 1GB storage, 1M function calls/month" -ForegroundColor White
Write-Host "3. Your browser will open for authentication" -ForegroundColor White
Write-Host "4. You can login with GitHub, Google, or email" -ForegroundColor White
Write-Host "5. The process takes 2-3 minutes" -ForegroundColor White
Write-Host ""

$response = Read-Host "Ready to continue? (y/n)"
if ($response -ne "y") {
    Write-Host "Setup cancelled." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "To resume later, run:" -ForegroundColor Cyan
    Write-Host "  npx convex dev" -ForegroundColor White
    exit 0
}

Write-Host ""
Write-Host "🚀 Starting Convex..." -ForegroundColor Yellow
Write-Host "⏰ This will open your browser for authentication" -ForegroundColor Cyan
Write-Host ""
Write-Host "After authentication, you'll see:" -ForegroundColor Yellow
Write-Host "  ✓ Deployment URL: https://your-project-123.convex.cloud" -ForegroundColor White
Write-Host ""
Write-Host "COPY THAT URL - you'll need it!" -ForegroundColor Green
Write-Host ""
Write-Host "Press Ctrl+C to stop Convex dev server when done" -ForegroundColor Yellow
Write-Host ""

# Run convex dev
npx convex dev

Write-Host ""
Write-Host "✅ Convex is running!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Next steps:" -ForegroundColor Cyan
Write-Host "1. Copy your NEXT_PUBLIC_CONVEX_URL from above" -ForegroundColor White
Write-Host "2. Create .env.local file with:" -ForegroundColor White
Write-Host "   NEXT_PUBLIC_CONVEX_URL=https://your-project.convex.cloud" -ForegroundColor Gray
Write-Host "   NEXT_PUBLIC_GEMINI_API_KEY=AIzaSyCjkFq967aetPL-8S2ltdC13zozhYdLvaE" -ForegroundColor Gray
Write-Host "   JWT_SECRET=your-secret-key-minimum-32-chars" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Uncomment ConvexProvider in:" -ForegroundColor White
Write-Host "   src/components/ClientProviders.tsx" -ForegroundColor Gray
Write-Host ""
Write-Host "4. Run: npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "📚 Full guide: ENABLE_REALTIME_NOW.md" -ForegroundColor Cyan
Write-Host ""
