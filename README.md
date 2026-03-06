# DataMinder

> Simplified multi-table data management for non-technical users.

**Status:** 🚧 In Development

## Problem
Managing complex data relationships in databases can be overwhelming. DataMinder empowers small businesses and freelancers to visualize and edit their data without the technical hassles of traditional tools.

## MVP Features
- Intuitive multi-table data visualizer that allows users to see relationships at a glance.
- Drag-and-drop interface for easy data editing and rearrangement.
- Dynamic linking of records across tables with one-click functionality.
- Basic reporting tools to summarize data and visualize trends.
- User-friendly onboarding tutorial to get started quickly.

## Tech Stack
- **Frontend:** Next.js 14 (App Router)
- **Backend:** Next.js API Routes
- **Database:** Firebase Firestore
- **Auth:** Firebase Authentication
- **Payments:** Stripe
- **Hosting:** Vercel

## Architecture Notes
Utilizing Next.js allows for server-side rendering and static site generation, enhancing performance. Firebase handles the database and authentication seamlessly, reducing implementation overhead. Vercel provides an excellent hosting solution optimized for Next.js applications.

## User Stories
- View data relationships
- Edit data using drag-and-drop
- Link records across tables
- Generate basic reports
- Complete onboarding tutorial
- User authentication
- Track subscription status

## Launch Checklist
- [ ] Create landing page and integrate sign-up forms
- [ ] Implement user authentication with Firebase
- [ ] Develop the multi-table data visualizer
- [ ] Set up basic reporting tools
- [ ] Conduct user testing for onboarding tutorial

## Setup
```bash
cp .env.example .env.local
# Fill in your environment variables
npm install
npm run dev
```