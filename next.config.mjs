import dotenv from 'dotenv';
dotenv.config();

const nextConfig = {
  env: {
    LOCAL_URL: process.env.LOCAL_URL,
    JWT_SECRET: process.env.JWT_SECRET,
  },
};

export default nextConfig;
