# DocuMind

Chat with your PDFs. Upload any document and instantly get summaries, key points, and answers to your questions — powered by Google Gemini AI.

A **MERN-stack** application:
- **MongoDB** — stores users, PDF metadata, and chat history
- **Express + Node** — REST API, JWT auth, file uploads, Gemini integration
- **React (Vite)** — single-page frontend with a dark, Framer-inspired design

## Project Structure

```
pdf-analyzer/
├── backend/          # Express API (auth, PDF upload, Gemini Q&A)
├── frontend/         # React + Vite + Tailwind v4 SPA
├── DESIGN.md         # Design system (colors, type, components)
└── package.json      # Convenience scripts to run both apps
```

## Prerequisites

- Node.js >= 22
- MongoDB running locally on `localhost:27017` (or set `MONGO_URI`)
- A Google Gemini API key

## Setup

1. Install dependencies for the root, backend, and frontend:

   ```sh
   npm run install:all
   ```

2. Create `backend/.env`:

   ```sh
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/pdf-analyzer
   JWT_SECRET=your_long_random_secret
   GEMINI_API_KEY=your_gemini_api_key
   ```

## Running

Run the backend and frontend together:

```sh
npm run dev
```

Or run them separately:

| Command            | What it runs    | URL                   |
| ------------------ | --------------- | --------------------- |
| `npm run backend`  | Express API     | http://localhost:5000 |
| `npm run frontend` | Vite dev server | http://localhost:5173 |

Then open **http://localhost:5173**.

## Build

```sh
npm run build      # builds the frontend into frontend/dist
```

## API Overview

| Method | Route                | Description                 |
| ------ | -------------------- | --------------------------- |
| POST   | `/api/auth/signup`   | Create an account           |
| POST   | `/api/auth/login`    | Log in, returns a JWT       |
| POST   | `/api/pdf/upload`    | Upload a PDF (max 20 MB)    |
| GET    | `/api/pdf`           | List the user's PDFs        |
| GET    | `/api/pdf/:id/chat`  | Get chat history for a PDF  |
| POST   | `/api/pdf/:id/ask`   | Ask a question about a PDF  |

All `/api/pdf` routes require an `Authorization: Bearer <token>` header.
