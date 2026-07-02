# DocuMind

I got tired of reading through 80-page PDFs just to find one answer, so I built this — upload a document, ask questions in plain English, get answers back instantly.

Under the hood it's a MERN stack app that passes your PDF to Google Gemini and returns answers through a chat interface. PDFs are stored on Cloudinary so the app works on serverless/ephemeral hosts too.

![stack](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white)
![stack](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![stack](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![stack](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)

## What it does

- Upload a PDF (up to 20 MB)
- Ask it anything — summaries, specific facts, comparisons, whatever
- Chat history is saved per document so you can pick up where you left off
- Accounts are protected with JWT auth + email verification on signup
- Forgot your password? There's a reset flow for that too

## Project layout

```
pdf-analyzer/
├── backend/        # Express API
│   ├── controllers/
│   ├── models/     # Mongoose schemas (User, Pdf, Chat)
│   ├── routes/
│   ├── middleware/
│   └── utils/      # Email (nodemailer) + Cloudinary upload helpers
└── frontend/       # React + Vite + Tailwind v4
    └── src/
        ├── pages/
        ├── components/
        ├── context/  # Auth context (JWT in localStorage)
        └── lib/      # Axios instance
```

## Running locally

**You'll need:** Node >= 22, a MongoDB instance (local or Atlas), a Gemini API key, a Gmail account, and a free Cloudinary account.

### 1. Clone and install

```bash
git clone https://github.com/pank4jj/pdf-analyzer.git
cd pdf-analyzer
npm run install:all
```

### 2. Configure environment

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

Fill in `backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/pdf-analyzer

JWT_SECRET=make_this_something_long_and_random

GEMINI_API_KEY=your_key_here

# Gmail App Password — generate at https://myaccount.google.com/apppasswords
EMAIL_USER=you@gmail.com
EMAIL_PASS=xxxx_xxxx_xxxx_xxxx

# Cloudinary — free account at https://cloudinary.com (dashboard shows these)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

FRONTEND_URL=http://localhost:5173
```

`frontend/.env` just needs one line:

```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Run

```bash
npm run dev
```

Starts the API on `localhost:5000` and the Vite dev server on `localhost:5173` in parallel. Open **http://localhost:5173**.

```bash
npm run backend    # API only
npm run frontend   # React only
```

## API routes

Auth (no token required):

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/auth/signup` | Register — sends a verification email |
| POST | `/api/auth/login` | Login — returns a JWT |
| GET | `/api/auth/verify-email/:token` | Confirms email from the link |
| POST | `/api/auth/forgot-password` | Sends a password reset email |
| POST | `/api/auth/reset-password/:token` | Sets a new password |

PDF routes (require `Authorization: Bearer <token>`):

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/pdf/upload` | Upload a PDF |
| GET | `/api/pdf` | Get all your uploaded PDFs |
| GET | `/api/pdf/:id/chat` | Fetch chat history for a PDF |
| POST | `/api/pdf/:id/ask` | Ask a question about a PDF |
