@echo off
REM AWS Lambda Deployment Script for Citizen Connect

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║     Citizen Connect - AWS Lambda Deployment                    ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

REM Configuration
setlocal enabledelayedexpansion
set FUNCTION_NAME=citizen-connect-grievances
set AWS_REGION=ap-south-1
set ZIP_FILE=lambda-deployment.zip

echo 1. Checking deployment package...
if exist %ZIP_FILE% (
    echo    OK: Found %ZIP_FILE%
) else (
    echo    ERROR: %ZIP_FILE% not found!
    exit /b 1
)
echo.

echo 2. AWS CLI Deployment Commands:
echo.
echo    Copy and run this command in PowerShell:
echo.
echo    aws lambda update-function-code --function-name %FUNCTION_NAME% --zip-file fileb://%ZIP_FILE% --region %AWS_REGION%
echo.

echo 3. OR use AWS Console:
echo    - Go to AWS Lambda
echo    - Select: %FUNCTION_NAME%
echo    - Upload: %ZIP_FILE%
echo.

echo 4. Verify Deployment:
echo    aws logs tail /aws/lambda/%FUNCTION_NAME% --follow --region %AWS_REGION%
echo.

echo 5. After Lambda is deployed, set up API Gateway:
echo    - Create REST API resource with proxy
echo    - Deploy to prod stage
echo    - Use the Invoke URL in frontend
echo.

echo Ready to deploy!
pause
