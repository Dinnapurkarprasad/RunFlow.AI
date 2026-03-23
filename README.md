# FutureBlink Task Flow AI 🚀

**Live Demo:** [https://run-flow-ai-g6s7.vercel.app/](https://run-flow-ai-g6s7.vercel.app/)

A highly interactive, full-stack MERN web application featuring a stunning dark-blue node-based interface (powered by React Flow). Users can input completely custom prompts into a visual flow, instantly execute them against an advanced OpenRouter AI Model (Llama 3.1), and seamlessly persist the entire generated chat history directly into a MongoDB database!

## ✨ Features
- **Visual Node Editor:** Drag, drop, lock, and zoom around the customized canvas using `React Flow`!
- **AI Integration:** Leverages the OpenRouter API to fetch state-of-the-art responses directly inside the nodes.
- **Persistent Memory:** Save any prompt-response interaction effortlessly to MongoDB Atlas.
- **Premium Dark UI:** Designed with pure, utility-first `Tailwind CSS` gradients, glassmorphism, and responsive control toolbars.
- **Modular Monorepo:** Separated `Frontend` (Vite) and `Server` (Express) completely structured for individual scalable deployments (Vercel & Render).

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 18 using Vite (for lightning-fast HMR)
- **UI & Styling:** Tailwind CSS v3 
- **Icons:** `react-icons` (Feather Icons)
- **Node Engine:** `@xyflow/react` (React Flow)
- **HTTP Client:** `axios`

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database ORM:** Mongoose / MongoDB Atlas
- **AI Provider:** OpenRouter API (`meta-llama/llama-3.1-8b-instruct:free`)
- **Utilities:** `cors`, `dotenv`

---

## 🚀 Local Setup Instructions

### Prerequisites
Before running the application, make sure you have:
1. **Node.js** (v18+ recommended) installed.
2. A free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) Account & URI.
3. A free [OpenRouter API](https://openrouter.ai/) Key.

### 1. Backend Setup (`/Server`)
Navigate into the `Server` directory and set up your environment:

```bash
# Move into server directory
cd Server

# Install all backend dependencies
npm install

# Create a clean environment file
touch .env
```

Open the `.env` file you just created in the `Server` folder and securely add your keys:
```env
PORT=5000
MONGODB_URI=mongodb+srv://<your_username>:<your_password>@cluster...
OPENROUTER_API_KEY=sk-or-v1-...
```

Start the Backend Server:
```bash
# Runs the server using nodemon for automatic reloads
npm run dev
# Or run normally
npm start
```
*The server will successfully start on `http://localhost:5000`.*

### 2. Frontend Setup (`/Frontend`)
Open a **new terminal window**, navigate to the `Frontend` directory, and start Vite:

```bash
# Move to frontend directory
cd Frontend

# Install React dependencies
npm install

# Start the Vite development build
npm run dev
```
*The frontend will launch directly at `http://localhost:5173`.*

---

## 🌐 Production Deployment

If you are looking to host this live, the codebase is natively prepared for a **Split Deployment**:
1. Host the `Server` folder as a standard Web Service on **Render.com** (Add `MONGODB_URI` and `OPENROUTER_API_KEY` to the Render Dashboard environment settings).
2. Host the `Frontend` folder on **Vercel** as a Vite Project!
