📚 Study Notes Sharing Platform

A full-stack web app that lets students upload, browse, and share study notes by subject and semester — with authenticated ownership so only the uploader (or an admin) can delete their content.

🔗 Live Demo: notes-sharing-app-pi.vercel.app

✨ Features
🔐 Full authentication from scratch — signup with bcrypt password hashing, login issuing signed JWTs, and protected API routes that verify tokens server-side
🗂️ Relational data model in MongoDB — notes reference users via ObjectId instead of embedding, avoiding unbounded document growth
🛡️ Ownership-based authorization — only a note's uploader or an admin can delete it, with proper 401 (unauthenticated) vs 403 (forbidden) distinction
🔎 Subject/semester filtering — query-parameter–driven API filtering wired to a live-updating frontend
🌐 Production-ready deployment — fixed a production-only CORS bug caused by hardcoded localhost URLs and configured environment variables for a working live deployment
📱 Fully responsive UI — styled with Tailwind CSS, with conditional navigation based on auth state
🛠️ Tech Stack
Layer Technology
Framework Next.js (App Router), React, TypeScript
Styling Tailwind CSS
Database MongoDB + Mongoose
Auth JWT, bcrypt
Deployment Vercel
🚀 Getting Started
Prerequisites
Node.js (v18+)
A MongoDB connection string (local or Atlas)
Installation
bash
git clone https://github.com/Kulkant/<repo-name>.git
cd <repo-name>
npm install
Environment Variables

Create a .env.local file in the project root:

env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Run Locally
bash
npm run dev

The app will be available at http://localhost:3000.

📁 Project Structure
├── app/ # Next.js App Router pages & API routes
│ ├── api/
│ │ ├── auth/ # Signup / login routes
│ │ └── notes/ # CRUD routes for notes
│ └── ... # Frontend pages
├── models/ # Mongoose schemas (User, Note)
├── lib/ # DB connection, JWT helpers
└── components/ # Reusable React components
🔑 Authentication Flow
User signs up → password hashed with bcrypt → user saved in MongoDB
User logs in → credentials verified → server issues a signed JWT
Protected routes verify the JWT server-side before granting access
Ownership checks ensure only a note's uploader (or an admin) can delete it
📌 API Overview
Method Endpoint Description Auth Required
POST /api/auth/signup Register a new user ❌
POST /api/auth/login Log in and receive a JWT ❌
GET /api/notes Fetch notes (filterable by subject/semester) ❌
POST /api/notes Upload a new note ✅
DELETE /api/notes/:id Delete a note (owner or admin only) ✅
🧠 Key Learnings
Designing a normalized MongoDB schema (referencing over embedding) to keep documents bounded as data grows
Implementing stateless JWT auth end-to-end, including server-side token verification on protected routes
Debugging a CORS issue that only appeared in production, tracing it back to hardcoded localhost URLs
Managing environment-specific configuration for a smooth local-to-production deployment on Vercel
📄 License

This project is open source and available under the MIT License.

👤 Author

Kulkant Sharma

GitHub: @Kulkant
Email: kulkantsharma9883@gmail.com
