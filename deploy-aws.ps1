#!/usr/bin/env powershell
# AWS Lambda Deployment Script for Citizen Connect

Write-Host "╔════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║     Citizen Connect - AWS Lambda Deployment Script             ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan

# Configuration
$FUNCTION_NAME = "citizen-connect-grievances"
$AWS_REGION = "ap-south-1"
$ZIP_FILE = "lambda-deployment.zip"

Write-Host ""
Write-Host "📋 Deployment Configuration:" -ForegroundColor Yellow
Write-Host "   Function Name: $FUNCTION_NAME"
Write-Host "   Region: $AWS_REGION"
Write-Host "   ZIP File: $ZIP_FILE"
Write-Host ""

# Step 1: Verify ZIP exists
Write-Host "1️⃣  Checking deployment package..." -ForegroundColor Cyan
if (-Not (Test-Path $ZIP_FILE)) {
    Write-Host "❌ ERROR: $ZIP_FILE not found!" -ForegroundColor Red
    Write-Host "   Please run: npm install --production && powershell Compress-Archive..."
    exit 1
}

$zipSize = (Get-Item $ZIP_FILE).Length / 1MB
Write-Host "   ✅ Found: $($zipSize.ToString('F2')) MB" -ForegroundColor Green
Write-Host ""

# Step 2: Check AWS credentials
Write-Host "2️⃣  Checking AWS credentials..." -ForegroundColor Cyan
try {
    $awsIdentity = aws sts get-caller-identity --region $AWS_REGION 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "   ✅ AWS credentials configured" -ForegroundColor Green
    } else {
        Write-Host "   ⚠️  Warning: Cannot verify AWS credentials" -ForegroundColor Yellow
        Write-Host "   Make sure to configure: aws configure"
    }
} catch {
    Write-Host "   ⚠️  Warning: AWS CLI not found or credentials not configured" -ForegroundColor Yellow
}
Write-Host ""

# Step 3: Display deployment steps
Write-Host "3️⃣  Next Steps for AWS Deployment:" -ForegroundColor Cyan
Write-Host ""
Write-Host "   A. Deploy via AWS CLI:" -ForegroundColor Green
Write-Host "      aws lambda update-function-code \" -ForegroundColor White
Write-Host "        --function-name $FUNCTION_NAME \" -ForegroundColor White
Write-Host "        --zip-file fileb://$ZIP_FILE \" -ForegroundColor White
Write-Host "        --region $AWS_REGION" -ForegroundColor White
Write-Host ""
Write-Host "   B. Deploy via AWS Console:" -ForegroundColor Green
Write-Host "      1. Go to AWS Lambda" -ForegroundColor White
Write-Host "      2. Select: $FUNCTION_NAME" -ForegroundColor White
Write-Host "      3. Click: Upload from .zip file" -ForegroundColor White
Write-Host "      4. Select: $ZIP_FILE" -ForegroundColor White
Write-Host "      5. Click: Deploy" -ForegroundColor White
Write-Host ""

# Step 4: Provide verification commands
Write-Host "4️⃣  Verification Commands:" -ForegroundColor Cyan
Write-Host ""
Write-Host "   After deploying, test with:" -ForegroundColor Green
Write-Host "   `n   # Health check`n   aws lambda invoke --function-name $FUNCTION_NAME --payload '{\"httpMethod\":\"GET\",\"path\":\"/health\"}' /tmp/response.json --region $AWS_REGION" -ForegroundColor White
Write-Host ""
Write-Host "   # View logs`n   aws logs tail /aws/lambda/$FUNCTION_NAME --follow --region $AWS_REGION" -ForegroundColor White
Write-Host ""

# Step 5: Auto-deploy option
Write-Host "5️⃣  Auto-Deploy?" -ForegroundColor Cyan
Write-Host "   ⚠️  Make sure:" -ForegroundColor Yellow
Write-Host "      ✅ AWS CLI is installed (aws --version)"
Write-Host "      ✅ AWS credentials are configured (aws configure)"
Write-Host "      ✅ You have permission to update Lambda"
Write-Host ""

$deploy = Read-Host "   Do you want to deploy now? (y/n)"
if ($deploy -eq "y" -or $deploy -eq "Y") {
    Write-Host ""
    Write-Host "🚀 Deploying to AWS Lambda..." -ForegroundColor Cyan
    try {
        $result = & aws lambda update-function-code `
            --function-name $FUNCTION_NAME `
            --zip-file fileb://$ZIP_FILE `
            --region $AWS_REGION `
            --output json 2>&1
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Deployment successful!" -ForegroundColor Green
            Write-Host ""
            Write-Host "📊 Monitoring & Testing:" -ForegroundColor Yellow
            Write-Host "   - Check CloudWatch logs: aws logs tail /aws/lambda/$FUNCTION_NAME --follow --region $AWS_REGION"
            Write-Host "   - Test endpoint in AWS Console"
            Write-Host "   - Set up API Gateway if not done"
            Write-Host ""
        } else {
            Write-Host "❌ Deployment failed!" -ForegroundColor Red
            Write-Host "Error: $result" -ForegroundColor Red
        }
    } catch {
        Write-Host "❌ Deployment failed!" -ForegroundColor Red
        Write-Host "Error: $_" -ForegroundColor Red
    }
} else {
    Write-Host ""
    Write-Host "⏭️  Skipping deployment." -ForegroundColor Yellow
    Write-Host "   Run the CLI command manually when ready:" -ForegroundColor White
    Write-Host "   aws lambda update-function-code --function-name $FUNCTION_NAME --zip-file fileb://$ZIP_FILE --region $AWS_REGION"
    Write-Host ""
}

Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "📚 For more details, see: AWS_DEPLOYMENT_GUIDE.md" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
