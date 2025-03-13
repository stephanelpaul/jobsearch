# Job Titles Explorer

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![tRPC](https://img.shields.io/badge/tRPC-10.43-blue)
![Clerk](https://img.shields.io/badge/Clerk-Auth-purple)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-blue)
![Drizzle ORM](https://img.shields.io/badge/Drizzle-0.29-orange)

A modern web application for exploring job titles, discovering related career paths, and understanding professional opportunities. Built with a focus on performance, type safety, and developer experience.

![Job Titles Explorer Screenshot](/placeholder.svg?height=400&width=800)

## 🚀 Features

- **Job Title Search**: Find job titles with advanced filtering and sorting
- **Related Titles**: Discover related career paths for any job title
- **Popular Titles**: Explore trending job titles with real-world popularity metrics
- **User Authentication**: Secure login and registration with Clerk
- **Responsive Design**: Optimized for all device sizes
- **Dark Mode**: Toggle between light and dark themes
- **Pagination**: Navigate through large result sets efficiently

## 🛠️ Tech Stack

### Core Technologies

- **[Next.js 14](https://nextjs.org/)**: React framework with App Router for server components, API routes, and optimized rendering
  - *Why*: Provides an excellent developer experience with built-in performance optimizations and server-side rendering capabilities

- **[TypeScript](https://www.typescriptlang.org/)**: Strongly typed programming language
  - *Why*: Enhances code quality, provides better IDE support, and catches errors during development

- **[tRPC](https://trpc.io/)**: End-to-end typesafe API layer
  - *Why*: Creates a seamless type-safe API without schemas or code generation, improving developer experience and reducing bugs

### Database & ORM

- **[Neon Postgres](https://neon.tech/)**: Serverless Postgres database
  - *Why*: Provides a scalable, serverless SQL database with branching capabilities for development

- **[Drizzle ORM](https://orm.drizzle.team/)**: Lightweight TypeScript ORM
  - *Why*: Offers type-safe database queries with minimal overhead and excellent developer experience

### Authentication

- **[Clerk](https://clerk.dev/)**: Complete authentication and user management
  - *Why*: Simplifies auth implementation with pre-built components and comprehensive features like social login and MFA

### UI & Styling

- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework
  - *Why*: Enables rapid UI development with consistent design tokens and minimal CSS overhead

- **[shadcn/ui](https://ui.shadcn.com/)**: Reusable UI components
  - *Why*: Provides accessible, customizable components built with Radix UI and styled with Tailwind

- **[Geist Font](https://vercel.com/font)**: Modern, optimized font by Vercel
  - *Why*: Offers excellent readability and a clean, professional appearance

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (or Neon account)

### Environment Variables

Create a `.env` file in the root directory with the following variables: