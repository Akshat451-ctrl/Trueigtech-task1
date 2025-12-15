# Instagram Clone – Full Stack Project

Hey

This is a ***full‑stack Instagram‑style social media project** that I built to practice and demonstrate my skills in **React, Redux, Node.js, Express, MySQL, and Tailwind CSS**.
The goal of this project was not just to copy Instagram’s UI, but to understand **how real social media features work end‑to‑end**.

## What this project can do

###  Authentication

* User **Signup & Login**
* JWT‑based authentication
* User session handled using **cookies**
* Protected dashboard route (only logged‑in users can access)

### Create Posts

* Users can create posts with:

  * Text
  * Images
  * Videos
* Media preview before posting
* Files are uploaded using **Multer**

### 📰 FEED SYSTEM

* Posts are fetched from the backend
* User name is shown with every post (JOIN query)
* Images and videos are rendered automatically
* Clean Instagram‑style feed layout

### ❤️ Like System (Demo)

* Like / Unlike functionality
* Handled locally using React state (demo purpose)
* Instant UI update without backend call

### 👤 Follow System (Demo)

* Follow / Unfollow users from the feed
* Followed users appear in the **Following sidebar**
* Managed locally on frontend for simplicity

### 📱 Responsive Design

* Built using **Tailwind CSS**
* Works well on desktop and mobile
* 8‑column feed + 4‑column sidebar layout

---

## 🛠 Tech Stack

### Frontend

* React (Vite)
* Redux Toolkit
* React Router DOM
* Tailwind CSS
* Lucide Icons
* React Toastify

### Backend

* Node.js
* Express.js
* MySQL (mysql2)
* Multer (file uploads)
* JWT Authentication

---

## 📂 Project Structure

```text
TrueIgtech_task1/
│
├── Frontend/
│   ├── src/
│   │   ├── Pages/        # Login, Signup, Dashboard
│   │   ├── Components/   # UI components
│   │   ├── APIS/         # API & Redux logic
│   │   ├── Routes/       # Protected routes
│   │   └── App.jsx
│
├── Backend/
│   ├── Controllers/
│   ├── Models/
│   ├── Routes/
│   ├── uploads/          # Uploaded images & videos
│   └── index.js
│
└── README.md
```

---

## How THE app works (Flow)

1. User signs up or logs in
2. Backend returns JWT token and userId
3. Cookies store authentication data
4. Dashboard route checks login status
5. User creates a post (text + image/video)
6. Backend stores post and media
7. Feed fetches posts with user names
8. Likes and follows update instantly on UI

---

## ⚙️ How to run the project locally

### Backend

```bash
cd Backend
npm install
npm run dev
```

Make sure MySQL is running and database credentials are correct.

### Frontend

```bash
cd Frontend
npm install
npm run dev
```

---

## ⚠️ Important Notes

* Likes and follow features are Full Functional**
* node_modules are ignored using `.gitignore`
* Uploaded files are served from `/uploads`

---

## 🚀 Future Improvements

* Comment system
* User profile pages
* Cloud storage (Cloudinary / S3)
* Stories & reels

---

## 🙋 About Me

**Akshat Ghatiya**
B.Tech CSE Student
akshatghatiya96@gmail.com
7999388296
Full‑Stack Developer (MERN)

I built this project to strengthen my real‑world development skills and to better understand how scalable web applications are designed.
** If I have Do my Best Inside The Project Please Check Full Project Its is Full Functional **
---

