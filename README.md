# LinkToDev - Frontend Client

The official React frontend for **LinkToDev**, a professional networking platform for developers.  
It provides a swipe-based discovery experience, connection management, and real-time chat.

![Frontend Deploy](https://github.com/v1v4k/LinkToDevWeb/actions/workflows/deploy.yml/badge.svg)
🌍 **Live Application:** https://www.linktodev.com

## ✨ Overview
LinkToDev allows developers to:
- Discover other developers using a swipe-based feed
- Search developers by first name using the global search bar
- Send and review connection requests
- Maintain a professional network
- Chat with connected users in real time
- Manage authentication and profile data

## 📸 Screenshots
### Login
<img width="955" alt="Login Page" src="https://github.com/user-attachments/assets/8363e781-e202-4188-9e6c-1bca2310daed" />

### Feed (Swipe-based Discovery)
<img width="1920" alt="Feed Page" src="https://github.com/user-attachments/assets/cbb47486-5f71-4032-980d-87e201ed5d06" />

### Search
<img width="1920" alt="Search Bar" src="https://github.com/user-attachments/assets/aed58592-1211-4e91-a70d-16492f059337" />

### Connections
<img width="953" alt="Connections Page" src="https://github.com/user-attachments/assets/82f39919-dd38-4c03-bdb1-e667df318d77" />

### Chat
<img width="959" alt="Chat Interface" src="https://github.com/user-attachments/assets/68217701-10b2-47e4-9a28-ff22c5bdf2ab" />

### Requests
<img width="957" alt="Requests Page" src="https://github.com/user-attachments/assets/fc385866-bd0c-4a6d-8d96-882e4daf64ee" />

## 🧩 Core Features
### 🔍 Developer Discovery
- Tinder-style swipe interface
- Swipe right to show interest
- Swipe left to ignore profiles
- Instant UI updates
### 🔎 Developer Search
- Global search bar available in the navigation bar
- Search developers by first name in real time
- Results update dynamically as the user types
### 🔗 Connections & Requests
- View incoming connection requests
- Accept or reject requests
- Manage accepted connections
### 💬 Real-time Chat
- One-to-one messaging between connected users
- Powered by Socket.io
### 🔐 Authentication & Profile
- Secure login and logout
- Profile viewing and editing
- Auth state managed with Redux Toolkit


## 🛠 Tech Stack
- **Frontend:** React (Vite)
- **State Management:** Redux Toolkit
- **Styling:** Tailwind CSS + DaisyUI
- **Routing:** React Router DOM
- **HTTP Client:** Axios
- **Real-time:** Socket.io Client

## 🚀 Running Locally
### Prerequisites
- Node.js ≥ 18
- Backend API running
### 1️⃣ Backend Setup (Required)
Clone and start the backend:
    git clone https://github.com/v1v4k/LinkToDev.git
    cd LinkToDev
    npm install
    npm run dev
Backend runs on:
    http://localhost:4444
### 2️⃣ Frontend Setup
    git clone https://github.com/v1v4k/LinkToDevWeb.git
    cd LinkToDevWeb
    npm install
    npm run dev
Open the app at:
    http://localhost:5173

## 🌍 Environment & API Handling
This frontend follows an **environment-agnostic API strategy**.
### Local Development
- API requests are sent to:  
    http://localhost:4444
### Production
- API requests use relative paths (e.g. `/api/login`)
- Requests are proxied by **Nginx**
No `.env` file is required for API configuration.

## 🚢 Deployment Architecture
The frontend is deployed on a **Google Cloud Platform (GCP) Virtual Machine**.
### Infrastructure Overview
- **Web Server:** Nginx  
  - Serves static `dist/` assets  
  - Proxies API requests to the backend
- **Process Management:** PM2 (backend)
- **Security & SSL:** Cloudflare
- **CI/CD:** GitHub Actions

## 🔁 CI/CD Pipeline
Automated deployments are handled via **GitHub Actions**.
| Branch | Environment | Trigger |       Deployment Type         |
|--------|-------------|---------|-------------------------------|
| `dev`  | Staging     |  Push   |        **Automatic**          |
| `main` | Production  |  Push   |  **Manual Approval Required** |
### Workflow
1.  **Build:** React app is compiled on every push.
2.  **Deploy (Dev):** Automatically transfers assets to the VM.
3.  **Deploy (Prod):** Waits for manual approval in GitHub, then transfers assets.
4.  **Serve:** Nginx serves the updated `dist/` folder.

