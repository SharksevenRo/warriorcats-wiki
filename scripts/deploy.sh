#!/bin/sh
# One-command production deploy: builds with the real origin, GA4 ID and
# deploy marker, then publishes to Cloudflare Pages.
# Usage: sh scripts/deploy.sh   (requires CF_API_TOKEN + CF_ACCOUNT_ID env)
set -e

SITE_URL="${SITE_URL:-https://warriorcats.anydaykit.com}"
PROJECT="${PROJECT:-warriorcats-wiki}"

SITE_URL="$SITE_URL" \
PUBLIC_GA_ID="G-RKNEKYMM9D" \
CF_PAGES_COMMIT_SHA="$(git rev-parse HEAD)" \
  npx -y pnpm@11.1.1 build

npx -y wrangler@4 pages deploy dist --project-name="$PROJECT" --branch=main
