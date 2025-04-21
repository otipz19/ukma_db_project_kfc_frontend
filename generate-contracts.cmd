@echo off
setlocal enabledelayedexpansion

REM Set the input and output directories
set "CONTRACTS_DIR=src\contracts"
set "OUTPUT_DIR=src\app\api"

REM Loop through each file in the contracts directory
for %%F in (%CONTRACTS_DIR%\*) do (
    echo Generating TypeScript Angular client for %%F...
    openapi-generator-cli generate -g typescript-angular -c openapi-generator-config.json -i "%%F" -o "%OUTPUT_DIR%"
)

echo All APIs generated.
