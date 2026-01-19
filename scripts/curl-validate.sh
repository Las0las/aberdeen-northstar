#!/bin/bash
# curl-based validation script for Northstar

SUPABASE_URL="${NEXT_PUBLIC_SUPABASE_URL:-https://hjzzwovbvdwvfzrmvcis.supabase.co}"
SUPABASE_KEY="${NEXT_PUBLIC_SUPABASE_ANON_KEY}"
ORG_ID="${NEXT_PUBLIC_DEV_ORGANIZATION_ID:-00000000-0000-0000-0000-000000000001}"

if [ -z "$SUPABASE_KEY" ]; then
  echo "❌ NEXT_PUBLIC_SUPABASE_ANON_KEY not set"
  exit 1
fi

echo ""
echo "🔍 Aberdeen Northstar - curl Validation"
echo ""
echo "📍 Supabase: ${SUPABASE_URL}"
echo "🏢 Organization: ${ORG_ID}"
echo ""
echo "─────────────────────────────────────────────────────"

TABLES="organizations candidates jobs submissions interviews offers placements companies clients contacts users roles teams applications tasks reports"

for table in $TABLES; do
  if [ "$table" = "organizations" ]; then
    FILTER=""
  else
    FILTER="&organization_id=eq.${ORG_ID}"
  fi
  
  RESULT=$(curl -s "${SUPABASE_URL}/rest/v1/${table}?select=id&limit=5${FILTER}" \
    -H "apikey: ${SUPABASE_KEY}" \
    -H "Authorization: Bearer ${SUPABASE_KEY}" \
    -H "Content-Type: application/json")
  
  if echo "$RESULT" | grep -q '"id"'; then
    COUNT=$(echo "$RESULT" | grep -o '"id"' | wc -l)
    FIRST_ID=$(echo "$RESULT" | grep -o '"id":"[^"]*"' | head -1 | sed 's/"id":"//;s/"//')
    echo "✅ ${table}: ${COUNT} records (first: ${FIRST_ID:0:8}...)"
  elif echo "$RESULT" | grep -q '\[\]'; then
    echo "⚠️  ${table}: 0 records (empty)"
  else
    ERROR=$(echo "$RESULT" | grep -o '"message":"[^"]*"' | head -1)
    echo "❌ ${table}: FAIL - ${ERROR:-$RESULT}"
  fi
done

echo "─────────────────────────────────────────────────────"
