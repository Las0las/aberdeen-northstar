/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },
  env: {
    // Placeholder fallbacks are tolerated for local/CI builds only.
    // The runtime clients in src/lib/supabase.ts and src/db/supabaseAdmin.ts
    // hard-fail when these placeholders are still in place under NODE_ENV=production.
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key',
  },
  async headers() {
    // CSP: Next 14 inlines styles and uses eval in dev — tighten in prod only.
    // Supabase websockets need wss:// to *.supabase.co; auth + storage use https.
    const isProd = process.env.NODE_ENV === 'production';
    const csp = [
      "default-src 'self'",
      // 'unsafe-inline' for styles is required by Tailwind injected styles + Radix.
      "style-src 'self' 'unsafe-inline'",
      // Next runtime + React DevTools require 'unsafe-eval' in dev only.
      isProd
        ? "script-src 'self' 'unsafe-inline'"
        : "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "img-src 'self' data: blob: https://*.supabase.co",
      "font-src 'self' data:",
      "connect-src 'self' https://*.supabase.co wss://*.supabase.co",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
    ].join('; ');

    const securityHeaders = [
      { key: 'Content-Security-Policy', value: csp },
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
      // HSTS only meaningful over real HTTPS; gate on prod to avoid biting local dev.
      ...(isProd
        ? [{ key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' }]
        : []),
    ];

    return [{ source: '/:path*', headers: securityHeaders }];
  },
};

module.exports = nextConfig;
