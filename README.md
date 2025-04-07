This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


SETTLESMART/
├── .next/                         # Next.js build output directory (auto-generated)
├── app/                           # App Router directory
│   ├── api/                       # API routes
│   ├── connectDB/                 # Database connection related files
│   │   ├── route.js               # Route handler
│   │   ├── Login/                 # Login component/files
│   │   │   └── route.js           # Login route handler
│   │   ├── LoginNew/              # New login component/files
│   │   │   └── route.js           # New login route handler
│   │   ├── favicon.ico            # Favicon
│   │   ├── globals.css            # Global CSS styles
│   │   ├── layout.js              # Layout component
│   │   ├── login.js               # Login page component
│   │   └── page.js                # Main page component
│   ├── model/                     # Data models
│   │   └── UserLogin/             # User login model
│   │       └── page.js            # User login page
│   └── page.js                    # Main app page
├── node_modules/                  # Installed dependencies
├── public/                        # Static assets
│   ├── file.svg                   # SVG icon
│   ├── globe.svg                  # SVG icon
│   ├── next.svg                   # Next.js logo
│   ├── vercel.svg                 # Vercel logo
│   ├── window.svg                 # SVG icon
│   └── testConnect/               # Test connection files
│       ├── page.js                # Test connection page
│       ├── .gitignore             # Git ignore rules
│       ├── eslint.config.mjs       # ESLint config
│       ├── jsconfig.json          # JS config
│       ├── next.config.mjs        # Next.js config
│       ├── package-lock.json      # Dependency lock file
│       ├── package.json           # Project manifest
│       └── postcss.config.mjs     # PostCSS config