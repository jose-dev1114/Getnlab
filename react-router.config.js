/**
 * React Router 7.9.x Configuration for Static Build
 *
 * This configuration builds a static SPA for Netlify deployment.
 * For production Shopify deployment, use the hydrogenPreset.
 */
export default {
  ssr: false,
  buildDirectory: 'build',
};

/** @typedef {import('@react-router/dev/config').Config} Config */
