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
