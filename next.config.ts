import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Allow the local-network address so phones on the same Wi-Fi can load
  // dev resources (HMR, chunks) during testing - without this, Next blocks
  // cross-origin dev requests by default and the page loads but never
  // fully hydrates on that device (no animations, no interactivity).
  allowedDevOrigins: ["192.168.7.34"],
};

export default nextConfig;
