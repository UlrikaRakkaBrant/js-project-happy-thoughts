```markdown
# 💖 Happy Thoughts

> _“Sharing happiness, one thought at a time.”_

A joyful mini social feed built with **React**, **Vite**, and **styled-components**.  
Happy Thoughts lets you post short positive messages, like others’ posts, and spread a bit of joy.

🌐 **Live demo:** [https://thinkhappy.netlify.app](https://thinkhappy.netlify.app)

---

## 🖼️ Preview

![Happy Thoughts app screenshot](./assets/screenshot.jpg)

---

## ✨ Features

- 💬 Post short thoughts (5–140 characters)  
- ❤️ Like any thought with a heart button  
- 🕒 See how long ago each thought was posted  
- 🔄 Auto-refresh after posting new thoughts  
- 🧭 Mock mode for offline development  
- 💡 Clean, responsive, and accessible design  
- 🚀 Deployed on Netlify with working API proxy  

---

## 🧠 Tech Stack

| Technology | Purpose |
|-------------|----------|
| ⚛️ React (Vite) | Core UI framework |
| 💅 styled-components | Scoped styling and theming |
| 🧭 Fetch API | Communicating with backend |
| ☁️ Netlify | Hosting and build |
| 🧩 Render | Public Happy Thoughts API |
| 🧪 ESLint + Vite | Developer experience and linting |

---

## 🗂️ Folder Structure

src/
  components/
    Loader/
    MockBanner/
    ThoughtCard/
    ThoughtForm/
  services/
    api.js
    apiBase.js
    mock.js
  styles/
  App.jsx
  main.jsx
public/
index.html

---

## 🪄 Getting Started

1️⃣ Install dependencies  
→ `npm install`

2️⃣ Start the app locally  
→ `npm run dev`  
App runs at **http://localhost:5173**

3️⃣ Build for production  
→ `npm run build`

4️⃣ Preview the build  
→ `npm run preview`

---

## 🔗 API

Base URL:  
https://happy-thoughts-api-4ful.onrender.com

Method | Endpoint | Description
-------|-----------|-------------
GET | /thoughts | Fetch latest 20 thoughts
POST | /thoughts | Post a new thought
POST | /thoughts/:id/like | Like a thought

🪄 All requests use the local `/api` proxy during development (see vite.config.js).

---

## ⚙️ Dev Proxy (for CORS)

server: {
  proxy: {
    '/api': {
      target: 'https://happy-thoughts-api-4ful.onrender.com',
      changeOrigin: true,
      secure: true,
      rewrite: (path) => path.replace(/^\/api/, ''),
    },
  },
},

---

## 🧠 Mock Mode (Offline Dev)

When the API is down, you can still work with local fake data.

src/services/apiBase.js
export const USE_MOCK = true; // switch ON mock mode
export const API_BASE = '/api';

---

## 🚀 Deployment (Netlify)

Build command: npm run build  
Publish directory: dist  
Base directory: *(leave empty)*

_redirects file (in project root)
```
/api/*  https://happy-thoughts-api-4ful.onrender.com/:splat  200
```

This ensures your deployed app connects to the real API seamlessly.

---

## 📱 Responsiveness

| Device | Width | Behavior |
|---------|--------|-----------|
| 📱 Mobile | up to 480px | Stacked layout with large tap targets |
| 💻 Tablet | ≥ 768px | Balanced grid and spacing |
| 🖥️ Desktop | ≥ 1024px | Centered container and max-width |
| 🖥️ XL screens | ≥ 1440px | Fluid layout for readability |

---

## ♿ Accessibility

✔ Visible focus outlines  
✔ `aria-label` for icons (heart button ❤️)  
✔ High color contrast and readable fonts  
✔ Semantic HTML (headings, buttons, forms)  
✔ Keyboard accessible navigation  

---

## 🪴 Stretch Goals

🌟 Track how many **unique posts** the user has liked (using localStorage)  
🌟 Add animations for posting or liking  
🌟 Show “No thoughts yet” state  
🌟 Add dark mode toggle  

---

## 👩‍💻 Author

Built with 💖, ☕, and a lot of happy thoughts by **Ulrika Einerbrant**  
Frontend developer passionate about accessible, joyful user experiences.  

> _“Sharing happiness, one thought at a time.”_

---

## 🪶 License

This project is open source and available under the **MIT License**.

---

## 💫 Connect

🔗 **Live app:** [thinkhappy.netlify.app](https://thinkhappy.netlify.app)  
💻 **GitHub repo:** [github.com/ulrikaeinerbrant/happy-thoughts](https://github.com/ulrikaeinerbrant/happy-thoughts)  
🧭 **Portfolio:** [ulrikasportfolio.netlify.app](https://ulrikasportfolio.netlify.app/)  
💼 **LinkedIn:** [ulrika-einebrant](https://www.linkedin.com/in/ulrika-einebrant/)
```
