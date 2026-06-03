# 🚀 LinkToDev — Frontend

The official React frontend for **LinkToDev**, a professional networking platform for developers.
Swipe-based developer discovery, connection management, and real-time chat.

![Frontend Deploy](https://github.com/v1v4k/LinkToDevWeb/actions/workflows/deploy.yml/badge.svg)
![React](https://img.shields.io/badge/react-18-blue)
![Docker](https://img.shields.io/badge/docker-containerized-blue)
![Vite](https://img.shields.io/badge/build-vite-purple)

🌍 **Live:** https://www.linktodev.com

---

## ✨ Features

| Feature                | Description                                                |
| :--------------------- | :--------------------------------------------------------- |
| 🔍 Developer Discovery | Tinder-style swipe feed — right to connect, left to ignore |
| 🔎 Search              | Search developers by name in real time                     |
| 🤝 Connections         | View, accept, reject connection requests                   |
| 💬 Real-time Chat      | One-to-one messaging via Socket.io                         |
| 🔐 Auth                | Email/password + GitHub OAuth                              |
| 👤 Profile             | Edit profile, skills, bio, photo with live preview         |
| 💳 Premium             | Stripe-powered membership upgrades                         |
| 🌗 Theme               | Dark/light mode toggle                                     |
| 📱 Mobile              | Fully responsive — WhatsApp-style chat on mobile           |

---

## 🛠️ Tech Stack

| Layer            | Technology                   |
| :--------------- | :--------------------------- |
| Framework        | React 18 (Vite)              |
| State            | Redux Toolkit                |
| Routing          | React Router DOM v6          |
| Styling          | Tailwind CSS + DaisyUI       |
| Forms            | React Hook Form + Zod        |
| HTTP             | Axios (custom instance)      |
| Real-time        | Socket.io Client             |
| Animations       | Framer Motion                |
| Containerization | Docker (multi-stage + Nginx) |

---

## 📸 Screenshots

### Sign In / Sign Up

<img width="1911" height="SignIn Page" alt="Image" src="https://github.com/user-attachments/assets/f958e2fe-f508-4eca-ab62-530376d60889" />

### Profile

<img width="1913" height="904" alt="Profile" src="https://github.com/user-attachments/assets/bcbd0dc7-65c5-419a-a4a6-27b09a5ada7e" />

### Feed

<img width="1920" height="892" alt="Feed Search" src="https://github.com/user-attachments/assets/2f9a5f54-6c12-4b46-830e-ee8f0fb7f5c1" />

### Messages

<img width="1909" height="903" alt="Messages" src="https://github.com/user-attachments/assets/05b1cb62-92ce-4ba1-a8ec-3ed82643468d" />

### Connections

<img width="1916" height="897" alt="Connections" src="https://github.com/user-attachments/assets/c2f16366-0a2d-49c2-9ace-e643868cf963" />

### Requests

<img width="1907" height="899" alt="Requests" src="https://github.com/user-attachments/assets/12097da4-ff6a-42e1-a3a4-c59d20962ff4" />

### Premium

<img width="1923" height="905" alt="Premium" src="https://github.com/user-attachments/assets/03a4d2ec-2710-4f2c-8c44-687cb18eb0aa" />

---

## 📂 Project Structure

```plaintext
src/
├── components/      → feature-based UI components
├── hooks/           → custom hooks (useAuth, useChat, useFeed...)
├── services/        → API layer (axiosInstance, userApi, chatApi...)
├── redux/           → store, slices
├── schemas/         → Zod validation schemas
├── utils/           → constants, socket, helpers
└── App.jsx          → routes
```

---

## 🚀 Running Locally

### With Docker (recommended)

```bash
docker build -t linktodev-frontend .
docker run -p 3000:3000 linktodev-frontend
```

### Without Docker

```bash
npm install
npm run dev
```

Open at: http://localhost:5173

> Backend must be running. See [LinkToDev Backend](https://github.com/v1v4k/LinkToDev)

---

## 🚢 Deployment & CI/CD

Full deployment architecture, CI/CD pipeline, branch strategy, and rollback procedures are documented in the infrastructure repository.

👉 [LinkToDev Infrastructure](https://github.com/v1v4k/linktodev-infra)

---

## 📈 Future Improvements

- TypeScript migration
- Unit tests (Vitest + React Testing Library)
- Redis-backed feed caching
- GitHub profile integration
- Posts/blogs feature
- Notifications system
- PWA support

---

## 🔗 Related Repositories

| Repo                                                                 | Description                  |
| :------------------------------------------------------------------- | :--------------------------- |
| [LinkToDev Backend](https://github.com/v1v4k/LinkToDev)              | Node.js backend API          |
| [LinkToDev Infrastructure](https://github.com/v1v4k/linktodev-infra) | Docker, Nginx, CI/CD configs |
