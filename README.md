# Samplecloud

A modern web platform for managing, playing, and organizing audio samples with authentication and cloud storage capabilities.

## About

Samplecloud Web is a full-stack audio sample management application built with Next.js. It provides users with features to browse, play, organize, and store audio samples in a personal library with cloud synchronization support.

## Tech Stack

**Frontend:**
- Next.js 16 (App Router)
- React 19
- TypeScript 5
- TailwindCSS 4
- Framer Motion (animations)
- Zustand (state management)
- Lucide React & React Icons (UI components)

**Backend:**
- Node.js with Next.js API Routes
- PostgreSQL (database)
- Prisma ORM 7 (database client)
- BetterAuth 1.4 (authentication)

**Development:**
- ESLint 9
- TypeScript
- Git

## Features

- **Authentication & User Accounts** - Secure sign-up/login with OAuth 2.0 support (Google)
- **Audio Player** - Interactive audio player with progress tracking, volume control, and favorite management
- **Sample Browser** - Browse and search audio samples organized by collections and tags
- **Cloud Storage** - Access personal library and synchronized samples across devices
- **Collections** - Organize samples into custom collections
- **Favorites** - Mark and manage favorite samples
- **Recent Tracks** - Quick access to recently played audio
- **Settings** - User profile and preferences management

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
