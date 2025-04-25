import dotenv from 'dotenv';
dotenv.config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    LOCAL_URL: process.env.LOCAL_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    AGENT_ID: process.env.AGENT_ID,
  },images: {
    domains: ['images.unsplash.com'],
  },
};

export default nextConfig;
