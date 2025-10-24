#!/bin/bash

# Keep Backend Alive Script
# This script pings the backend to prevent it from going to sleep on Render
# Usage: ./ping-backend.sh [backend_url]
# Or set RENDER_BACKEND_URL environment variable

# Default backend URL (replace with your actual Render URL)
DEFAULT_URL="https://your-promptsmith-backend.onrender.com"

# Get backend URL from argument or environment variable
BACKEND_URL="${1:-${RENDER_BACKEND_URL:-$DEFAULT_URL}}"

echo "$(date): Pinging backend at $BACKEND_URL"

# Make a simple GET request to a lightweight endpoint
# Using /api/auth/me which should return 401 for unauthenticated requests
response=$(curl -s -o /dev/null -w "%{http_code}" "$BACKEND_URL/api/auth/me" \
  -H "Content-Type: application/json" \
  --max-time 10)

if [ "$response" -eq 200 ] || [ "$response" -eq 401 ]; then
    echo "✅ Backend ping successful (HTTP $response)"
    exit 0
else
    echo "❌ Backend ping failed (HTTP $response)"
    exit 1
fi