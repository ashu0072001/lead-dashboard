# Lead Management Dashboard

A full-stack Mini CRM built with Next.js 14 (App Router), Tailwind CSS, and MongoDB.

## Features
- **Frontend**: Responsive Dashboard, Leads Table, Analytics Cards, Detail View.
- **Backend**: Next.js API Routes for CRUD operations and Seeding.
- **Database**: MongoDB (Mongoose) with Search, Sort, Filter, and Pagination.

## Tech Stack
- Next.js 14
- Tailwind CSS
- MongoDB + Mongoose
- Faker.js (for seeding)

## Setup Instructions

1. **Clone & Install**
   ```bash
   cd lead-dashboard
   npm install
   ```

2. **Environment Variables**
   - Copy `env.example` to `.env.local`
   - Update `MONGODB_URI` with your connection string.
   
   ```bash
   cp env.example .env.local
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000).

4. **Seeding Data**
   - You can seed the database with 300+ dummy leads by making a POST request to:
     `POST http://localhost:3000/api/seed`
   - Or use a tool like Postman / cURL.

## API Endpoints

- `GET /api/leads`: Fetch leads (Query params: `page`, `limit`, `search`, `status`, `sort`)
- `POST /api/leads`: Create a new lead
- `GET /api/leads/:id`: Get lead details
- `PUT /api/leads/:id`: Update lead
- `DELETE /api/leads/:id`: Delete lead
- `POST /api/seed`: Populate database

## Deployment
This project is ready for deployment on **Vercel**.
1. Push to GitHub.
2. Import project in Vercel.
3. Add `MONGODB_URI` in Vercel Environment Variables.
4. Deploy!
