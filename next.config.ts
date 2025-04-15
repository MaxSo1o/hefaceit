import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    distDir: "out",
    allowedDevOrigins: ['hefaceit.ru', '*.hefaceit.ru'],
};

export default nextConfig;
