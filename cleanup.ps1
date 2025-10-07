# Clean up script for Health Surveillance project
# Run this script to remove unnecessary files

Write-Host "🧹 Cleaning up Health Surveillance project..." -ForegroundColor Green

# Remove deployment scripts
$filesToRemove = @(
    "deploy.bat",
    "deploy.ps1", 
    "deploy.sh",
    "deployment-fix.ps1",
    "DEPLOYMENT.md",
    "DEPLOYMENT_CHECKLIST.md",
    "DEPLOY_NOW.md",
    "QUICK_DEPLOY.md",
    "VERCEL_DEPLOYMENT.md"
)

foreach ($file in $filesToRemove) {
    if (Test-Path $file) {
        Remove-Item $file -Force
        Write-Host "✅ Removed: $file" -ForegroundColor Yellow
    } else {
        Write-Host "⚠️  Not found: $file" -ForegroundColor Gray
    }
}

# Remove build artifacts
$buildArtifacts = @(
    ".next",
    ".vercel", 
    "tsconfig.tsbuildinfo"
)

foreach ($artifact in $buildArtifacts) {
    if (Test-Path $artifact) {
        Remove-Item $artifact -Recurse -Force
        Write-Host "✅ Removed build artifact: $artifact" -ForegroundColor Yellow
    }
}

# Remove local environment files (keep .env.example)
$envFiles = @(
    ".env",
    ".env.local"
)

foreach ($envFile in $envFiles) {
    if (Test-Path $envFile) {
        Remove-Item $envFile -Force
        Write-Host "✅ Removed environment file: $envFile" -ForegroundColor Yellow
    }
}

Write-Host "🎉 Cleanup completed!" -ForegroundColor Green
Write-Host "Ready to commit clean codebase" -ForegroundColor Cyan