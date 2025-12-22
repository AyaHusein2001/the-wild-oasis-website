# Wild Oasis 🏝️

**Wild Oasis** is a hotel client website built with **Next.js** app router that allows users to browse available cabins, manage reservations, and update their profiles.  
The app leverages **modern React hooks** and Next.js features to create a smooth, interactive, and responsive user experience.

---

## ✨ Features

### 🏠 Cabin Management
- View all available cabins
- Cabin detail pages (static & dynamic routes)
- Filter cabins by capacity

### 📅 Reservation Management
- Create, edit, and delete reservations
- Optimistic UI updates using `useOptimistic`
- Server actions for reservations (mutations)
- Real-time form status handling with `useFormStatus`

### 👤 User Management & Authentication
- Login with **Google** via NextAuth
- Update and manage user profile information

### 🌙 UX & UI
- Error boundaries for runtime safety
- Not Found routes handling
- Loading indicators for route transitions
- Responsive and accessible UI

---

## 🛠️ Tech Stack

- **Next.js 13+**
- **React** (modern hooks: `useOptimistic`, `useFormStatus`, Context API)
- **NextAuth.js** (Google authentication)
- **Server Actions** for mutations
- **React + Next.js Routing** (dynamic & nested routes)
- **JavaScript**

---

## 🧠 Architecture Highlights

- **ReservationContext** for centralized state management
- Optimistic UI updates to enhance UX
- Form status tracking for responsive feedback
- Client and server components
- Modular and reusable components
- Efficient **Next.js caching techniques** for performance

---

## 🚀 Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/AyaHusein2001/the-wild-oasis-website.git
   ````

2. Install dependencies:

   ```bash
   npm install
   ```

3. Add environment variables for **NextAuth / Google**:

   ```bash
   NEXTAUTH_URL=http://localhost:3000
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

4. Run the app:

   ```bash
   npm run dev
   ```

---

## 📌 Project Purpose

This project was built to:

* Practice **Next.js features** (app router, server actions, caching)
* Implement **full client workflows** for hotel reservations
* Learn and use **modern React hooks** for better UX
* Integrate **third-party authentication** (Google via NextAuth)
* Build a professional, portfolio-ready **hotel client website**

---

## 🔮 Future Improvements

* Add **payment integration** for reservations
* Reservation history for users
* Offline support and notifications
* Dark mode

---

## 👩‍💻 Author

**Aya Husein**
GitHub: [AyaHusein2001](https://github.com/AyaHusein2001)
