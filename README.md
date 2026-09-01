# BackendZone — Enterprise REST API for BuildZone

Production-grade Node.js & Express backend architecture for BuildZone digital engineering platform and Admin CMS.

## Architecture
- **Framework**: Express.js with ES Modules
- **Database**: MongoDB & Mongoose
- **Media Engine**: Cloudinary & Multer
- **Auth**: JWT & BcryptJS password hashing
- **Validation**: Zod Schemas
- **Security**: Helmet, CORS, Rate Limiting

## API Endpoints (Base: `/api/v1`)
- `POST /auth/login` — Admin Login
- `GET /auth/me` — Current Authenticated Profile
- `GET /services` — List Services (Filter, Search)
- `GET /services/:slug` — Service Details
- `GET /industries` — List Industries
- `GET /industries/:slug` — Industry Details
- `GET /projects` — Portfolio Projects
- `GET /projects/:slug` — Project Details
- `GET /case-studies` — Case Studies
- `GET /case-studies/:slug` — Case Study Details
- `GET /blogs` — Technical Blog Posts
- `GET /blogs/:slug` — Blog Details
- `GET /careers` — Job Openings
- `POST /careers/:id/apply` — Submit Job Application
- `POST /leads` — Submit Inquiry / RFP (CRM)
- `GET /leads` — Admin Lead Management
- `GET /team` — Engineering Team Members
- `GET /faqs` — FAQs by Category
- `GET /testimonials` — Client Reviews
- `GET /technologies` — Tech Stack Catalog
- `GET /settings` — Company & SEO Settings
- `POST /media/upload` — Cloudinary Media Upload
- `GET /dashboard/stats` — Admin Real-time Analytics

## Commands
```bash
npm install     # Install dependencies
npm run seed    # Seed MongoDB with initial BuildZone datasets & Admin
npm run dev     # Start development server with live reload
npm start       # Start production server
```
