<<<<<<< HEAD
import dotenv from 'dotenv';
dotenv.config();

const nextConfig = {
  env: {
    LOCAL_URL: process.env.LOCAL_URL,
    JWT_SECRET: process.env.JWT_SECRET,
  },
};

export default nextConfig;
=======
/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      AGENT_ID: process.env.AGENT_ID,
    },
  };
  
  export default nextConfig;
  
>>>>>>> ad71e9fb9358202de220c3bd2e2dbb33c9a937b3
