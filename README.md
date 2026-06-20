# Smart-Chat-Sentiment-bot
This repository contains a full‑stack, AI‑powered chat application that leverages the MERN (React, Express, MongoDB, Node.js) stack, real‑time WebSocket communication, and optional OpenAI integration for generative responses.
It’s designed for quick deployment to a single HTTPS link, suitable for internship demos and small‑scale production (< 50 concurrent users).

#Project Overview

An AI chatbot that accepts user queries, generates responses via GPT‑4o‑mini or a fine‑tuned local model, and performs sentiment analysis on each reply. The UI displays the conversation in real time and visualizes sentiment scores on a live chart. All data is stored in MongoDB Atlas, and the app is deployed with a single click on Vercel (frontend) and Render (backend).

#Tech Stack

Layer	              Technology	                                                      Purpose
Frontend	          React + Material‑UI	                                 Interactivechat UI, sentiment chart (Chart.js)
Backend	            Express + Socket.io	                                 REST/GraphQL API, WebSocket server
AI	                OpenAI GPT‑4o‑mini (or HuggingFace DistilBERT)	     Natural language generation
Sentiment	          sentiment npm package	                               Quick positive/negative scoring
Database	          MongoDB Atlas	                                       Persist chat logs, sentiment metrics
Deployment	        Vercel (frontend), Render (backend)	                 One‑click, scalable hosting
CI/CD	             GitHub Actions	                                       Automated tests & build



//Intialoilze npms

npx create-react-app chatapp          # or ng new chatapp
cd chatapp
npm install socket.io-client


//Backednd 

mkdir server && cd server
npm init -y
npm install express mongoose socket.io cors dotenv




 

---


> **Project Overview**  
> An AI chatbot that accepts user queries, generates responses via GPT‑4o‑mini or a fine‑tuned local model, and performs sentiment analysis on each reply. The UI displays the conversation in real time and visualizes sentiment scores on a live chart. All data is stored in MongoDB Atlas, and the app is deployed with a single click on Vercel (frontend) and Render (backend).

---

**Tech Stack**  

| Layer | Technology | Purpose |
|-------|------------|---------|
| Frontend | React + Material‑UI | Interactive chat UI, sentiment chart (Chart.js) |
| Backend | Express + Socket.io | REST/GraphQL API, WebSocket server |
| AI | OpenAI GPT‑4o‑mini (or HuggingFace DistilBERT) | Natural language generation |
| Sentiment | `sentiment` npm package | Quick positive/negative scoring |
| Database | MongoDB Atlas | Persist chat logs, sentiment metrics |
| Deployment | Vercel (frontend), Render (backend) | One‑click, scalable hosting |
| CI/CD | GitHub Actions | Automated tests & build |

---

**Getting Started**

```bash
git clone https://github.com/your-username/ai-chat-demo.git
cd ai-chat-demo
```

### 1️⃣ Frontend Setup (React)

```bash
cd client
npm install
npm run dev   # runs on http://localhost:5173
```

### 2️⃣ Backend Setup (Express)

```bash
cd server
npm install
cp .env.example .env  # fill in MONGO_URI, OPENAI_KEY, PORT
npm run dev           # runs on http://localhost:3001
```

> **Tip:** Use `npm run dev` for both sides concurrently in VS Code tasks.

---

**Environment Variables**

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster0.mongodb.net/db?retryWrites=true&w=majority` |
| `OPENAI_KEY` | OpenAI API key (optional if using local model) | `sk-xxxx` |
| `PORT` | Backend port (default 3001) | `3001` |

---

**Running the Application Locally**

1. Start the backend (`npm run dev` in `server`).
2. Start the frontend (`npm run dev` in `client`).
3. Open `http://localhost:5173` in a browser.
4. Type a question → AI reply appears instantly; sentiment bar updates.

---

## Docker

Build and run the full app with Docker:

```bash
docker build -t smart-chat-sentiment-bot .
docker run -p 3001:3001 -e MONGO_URI='mongodb://mongo:27017/chatapp' smart-chat-sentiment-bot
```

Or with Docker Compose:

```bash
docker compose up --build
```

The app will be available at `http://localhost:3001` and MongoDB at `mongodb://localhost:27017`.

If you want the frontend served from the backend container, keep `PORT=3001` and point browser traffic to `http://localhost:3001`.

---

**API Endpoints**

| Method | Route | Body | Response |
|--------|-------|------|----------|
| `POST` | `/chat` | `{ "text": "Your question" }` | `{ "aiResponse": "...", "sentiment": 0.5 }` |
| `GET` | `/history` | – | Array of past messages |

> All endpoints are CORS‑enabled for local development and Vercel/Render URLs.

---

**Deployment**

1. **Frontend (Vercel)**  
   - Connect the repo to Vercel.  
   - Set environment variables (`MONGO_URI`, `OPENAI_KEY`).  
   - Vercel will build `client` automatically.

2. **Backend (Render)**  
   - Create a new Render service (Node.js).  
   - Point to the `server` directory.  
   - Add the same environment variables.  
   - Ensure the Render service is reachable at `https://backend.render.com`.

3. **MongoDB Atlas**  
   - Whitelist Render’s outbound IP ranges.  
   - Use the connection string in the backend’s `.env`.

4. **Result**  
   - Frontend URL: `https://ai-chat-demo.vercel.app/`  
   - Backend URL: `https://ai-chat-demo-backend.onrender.com/`  

> The frontend automatically proxies API calls to the backend during development. In production, set the `REACT_APP_API_URL` env var in Vercel to point to the Render URL.

---

**Architecture Snapshot**

```
Client (React) --WebSocket--> Backend (Express + Socket.io)
                                
             ---- REST API -----------
                     |
                 MongoDB Atlas
                     |
             AI Service (OpenAI or local)


---

**Features**

- Real‑time chat via WebSockets  
- Live sentiment bar chart  
- Persistent chat history in MongoDB  
- Optional OpenAI integration (configurable via env var)  
- Easy deployment with a single click on Vercel/Render  
- Dockerfile ready for custom hosting  

---

**Testing**

```bash
npm test   # runs Jest unit tests (frontend)
```

> Add more tests under `client/__tests__` and `server/__tests__` as needed.

---

**Contributing**

1. Fork the repository.  
2. Create a feature branch (`git checkout -b feature/xyz`).  
3. Commit with a clear message.  
4. Open a pull request.  


