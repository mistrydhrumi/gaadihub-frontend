# GaadiHub 🚗

Modern car marketplace platform built with Next.js, React, Supabase, and
TailwindCSS — featuring a dynamic car listing experience, detailed car pages,
an EMI calculator, and a fully responsive UI.

Live demo: [gaadihub-frontend.vercel.app](https://gaadihub-frontend.vercel.app)

## Features

- 🚗 Modern car marketplace platform
- 🖼️ Dynamic car detail pages with image carousel
- 💰 Built-in EMI calculator with adjustable loan tenure
- 📋 Detailed overview, specifications & feature highlights per car
- ⚡ Fast and optimized UI
- 📱 Fully responsive design across mobile, tablet & desktop
- 🧩 Reusable React components
- 🌐 Supabase integration for car data
- 💀 Skeleton loading states
- 🎨 Modern UI/UX with shadcn/ui

## Tech Stack

| Feature             | Technology |
|---------------------|------------|
| Frontend Framework  | Next.js 16 / React 19 |
| Styling             | TailwindCSS v4 |
| UI Components       | shadcn/ui |
| Backend / Data      | Supabase |
| State Management    | React Hooks |
| Carousel            | Embla Carousel |
| Icons               | lucide-react |
| Deployment          | Vercel |

## Project Structure

```
├── app/
│   ├── about-us/
│   ├── cars/
│   │   ├── [slug]/
│   │   │   ├── page.tsx
│
├── components/
│   ├── common/
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   ├── cars-details/
│   │   ├── CarImageCarousel.tsx
│   │   ├── CarOverview.jsx
│   │   ├── CarFeatures.tsx
│   │   ├── CarSpecifications.tsx
│   │   ├── CarPriceCard.tsx
│   │   ├── EmiCalculator.tsx
│   ├── ui/
│
├── services/
│   ├── car.service.ts
│
├── types/
│   ├── car.ts
│
├── lib/
├── public/
├── app.tsx
├── next.config.ts
├── package.json
```

## Installation

**Clone Repository**
```bash
git clone https://github.com/mistrydhrumi/gaadihub-frontend.git
```

**Move Into Project Directory**
```bash
cd gaadihub-frontend
```

**Install Dependencies**
```bash
pnpm install
```

**Run Development Server**
```bash
pnpm dev
```

Runs locally on: `http://localhost:3000`

## Production Build

**Build Project**
```bash
pnpm build
```

**Start Production Server**
```bash
pnpm start
```

## Core Features

### Car Listings & Details

Displays detailed information for each vehicle, including:

- Brand & Model
- Variant
- Price (original & discounted)
- KM Driven
- Fuel Type
- Transmission
- Ownership
- Registration Year
- Seats
- Registration Location

### Car Detail Page Sections

- **Image Carousel** – swipeable gallery with photo count
- **Overview** – key details with icon-based cards
- **Features** – highlight badges pulled from car data
- **Specifications** – engine, power, mileage, seats & fuel type
- **Price Card** – pricing, discount percentage & contact actions
- **EMI Calculator** – interactive loan tenure slider with monthly EMI, total payable & total interest

### Performance Optimizations

- Lazy rendering of images
- Skeleton loaders while data is fetched
- Responsive image handling
- Reusable component structure
- Optimized Supabase data fetching

## Development Guidelines

- Create a new branch from `main` for each feature/fix
- Pull the latest changes before starting work
- Maintain a reusable, modular component structure
- Follow clean and scalable coding practices
- Keep the UI responsive across all devices
- Run `pnpm lint` before committing changes
