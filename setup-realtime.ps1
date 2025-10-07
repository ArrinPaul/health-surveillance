#!/usr/bin/env pwsh
# PowerShell script to set up real-time data with Convex

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
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install

Write-Host ""
Write-Host "🔧 Setting up Convex..." -ForegroundColor Yellow
Write-Host ""
Write-Host "IMPORTANT: You'll need a Convex account (free)" -ForegroundColor Cyan
Write-Host "1. Sign up at: https://convex.dev" -ForegroundColor White
Write-Host "2. The next command will open your browser" -ForegroundColor White
Write-Host "3. Follow the prompts to create a project" -ForegroundColor White
Write-Host ""

$response = Read-Host "Ready to continue? (y/n)"
if ($response -ne "y") {
    Write-Host "Setup cancelled." -ForegroundColor Yellow
    exit 0
}

Write-Host ""
Write-Host "🚀 Starting Convex development server..." -ForegroundColor Yellow
Write-Host ""

# Run convex dev
npx convex dev

Write-Host ""
Write-Host "✅ Convex setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Next steps:" -ForegroundColor Cyan
Write-Host "1. Copy the NEXT_PUBLIC_CONVEX_URL from above" -ForegroundColor White
Write-Host "2. Add it to your .env.local file" -ForegroundColor White
Write-Host "3. Uncomment ConvexProvider in src/components/ClientProviders.tsx" -ForegroundColor White
Write-Host "4. Run: npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "📚 Full guide: REALTIME_SETUP.md" -ForegroundColor Cyan
