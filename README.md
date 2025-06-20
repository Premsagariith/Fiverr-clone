# Freelance Bidding Platform (Mini Fiverr Clone)

## 📖 Overview  
This project is a service‑based freelance job bidding site built with the MERN stack. From initial concept to deployment‑ready code, I implemented full user‑role support, project posting & bidding, real‑time messaging, and contract management.

---

## 🚀 Features & Timeline  

1. **Project Initialization**  
   - Created separate `client/` and `server/` directories  
   - Initialized React app with Vite and Node/Express backend  
   - Installed core dependencies:  
     - Frontend: `react`, `react‑router-dom`, `axios`, `tailwindcss`  
     - Backend: `express`, `mongoose`, `bcrypt`, `jsonwebtoken`

2. **Authentication & Authorization**  
   - Designed **User** schema with roles (`client` / `freelancer`)  
   - Implemented **Register** and **Login** endpoints  
   - Secured protected routes with JWT middleware  
   - On successful register, redirected to login; on login, stored token & user info in `localStorage`

3. **Job Posting & Bidding**  
   - Built **Job** model and CRUD REST endpoints  
   - Created “Post a Job” form on the frontend; client users can submit new jobs  
   - Designed “Bid” model and endpoints; freelancers can view jobs and submit bids  
   - Displayed bids under each job; clients can accept or reject bids

4. **Messaging System**  
   - Created **Message** model and endpoints for fetch, send, edit, delete  
   - Frontend “Messages” page that:  
     - Fetches all messages on load  
     - Lets you send new messages to a specific receiver  
     - On clicking your own message, shows **Edit** & **Delete** options  
     - Persists edits and deletions via `PUT /api/messages/:id` and `DELETE /api/messages/:id`

5. **UI/UX & Styling**  
   - Integrated Tailwind CSS for responsive layouts  
   - Organized components under `src/components` and pages under `src/pages`  
   - Added contextual buttons, form validations, and toast alerts

6. **Code Organization & Quality**  
   - Refactored into logical folders:  
     ```
     client/
       ├ assets/  
       ├ components/  
       ├ pages/  
       ├ services/  
       └ utils/
     server/
       ├ controllers/  
       ├ middleware/  
       ├ models/  
       └ routes/
     ```  
   - Extracted API calls into `services/api.js`  
   - Used custom hooks (`useAuth`, etc.) for shared logic  

7. **Version Control & Deployment Prep**  
   - Initialized Git repository, created `.gitignore` to exclude `node_modules`, `.env`, build artifacts  
   - Created feature branches (`feature/auth`, `feature/messaging`) and used semantic commit messages  
   - Prepared for deployment:  
     - Added `environment variables` in `.env.example`  
     - Configured Vite proxy for `/api`  
     - Built production bundles  

---

## 💾 Installation & Running Locally

1. **Clone & Install**  
   ```bash
   git clone https://github.com/<YOUR_USERNAME>/freelance-bidding-platform.git
   cd freelance-bidding-platform



cd server
npm install
cp .env.example .env          # fill in MONGO_URI, JWT_SECRET, etc.
npm run dev                   # starts Express on port 5000

cd server
npm install
cp .env.example .env          # fill in MONGO_URI, JWT_SECRET, etc.
npm run dev                   # starts Express on port 5000

cd ../client
npm install
npm run dev                   # starts Vite on port 3000
