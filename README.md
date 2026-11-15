# 🛒 বাজার দর (BazarDor)

> প্রয়োজনীয় পণ্যের দাম এক নজরে।

**BazarDor** is a Bangla grocery price tracker. It shows today's price, daily
price change, and market-wise price breakdown for rice, pulses, oil,
vegetables, fish, meat, eggs/dairy and spices — all in one place.

- **Live Link:** _add your deployed link here_
- **GitHub Repository:** _add your repository link here_

---

## ✨ Key Features

1. **Live price ticker** – an infinite scrolling strip under the navbar showing
   emoji, name, price per unit and ▲/▼ percentage change.
2. **Today's movers** – top 6 price risers and top 6 price fallers on the home
   page, plus a full responsive grid of all products (Bengali digits everywhere).
3. **Category pages with sorting** – sort by default, price low → high or price
   high → low. Sorting is numeric, so Bengali-digit prices sort correctly.
4. **Market-wise product details** – protected page with minimum, maximum and
   average price plus a table of prices from different bazars.
5. **Authentication with BetterAuth** – email/password, Google and GitHub
   login, toast notifications, and protected-route redirects.
6. **Update profile** – edit your name from the profile page (BetterAuth
   `updateUser`).
7. **Skeleton loaders & 404 pages** – skeletons while data loads, friendly 404
   for invalid category / product routes with a “হোম পেজে ফিরে যান” button.
8. **Fully responsive** – mobile, tablet and desktop.

## 🛠️ Technologies Used

| Purpose            | Technology                              |
| ------------------ | --------------------------------------- |
| Framework          | Next.js (App Router), React, TypeScript |
| Styling            | Tailwind CSS, HeroUI                    |
| Authentication     | BetterAuth + MongoDB adapter            |
| Notifications      | react-hot-toast                         |
| Ticker             | react-fast-marquee                      |
| Icons              | lucide-react, react-icons               |
| Deployment         | Vercel                                  |

## 📁 Project Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── signin/            # sign in page
│   │   ├── signup/            # sign up page
│   │   └── profile/
│   │       ├── page.tsx       # my profile
│   │       └── update-profile/page.tsx
│   ├── api/auth/[...all]/     # BetterAuth route handler
│   ├── category/[slug]/       # category page (+ loading, not-found)
│   ├── product/[slug]/        # product details (+ loading, not-found)
│   ├── layout.tsx
│   ├── loading.tsx
│   ├── not-found.tsx
│   └── page.tsx               # home
├── components/                # Navbar, Marque, Hero, ProductCard, sections, Footer…
├── lib/                       # auth, auth-client, api, format helpers
├── types/type.ts
└── proxy.ts                   # protects /product/* and /profile/*
```

## 🔌 API

Base URL: `https://openapi.programming-hero.com/api/bazardor`

| Endpoint                    | Description        |
| --------------------------- | ------------------ |
| `/products`                 | All products       |
| `/products?category=chal`   | Filter by category |
| `/products/:id`             | Single product     |
| `/categories`               | All categories     |
| `/categories/:slug`         | Single category    |

## 🚀 Getting Started

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables


- `NEXT_PUBLIC_API_URL`
- `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `NEXT_PUBLIC_BETTER_AUTH_URL`
- `MONGO_URI`
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`
- `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`

OAuth callback URLs: `<BETTER_AUTH_URL>/api/auth/callback/google` and
`<BETTER_AUTH_URL>/api/auth/callback/github`.

## ☁️ Deployment (Vercel)

Add all environment variables in the Vercel project settings, set
`BETTER_AUTH_URL` / `NEXT_PUBLIC_BETTER_AUTH_URL` to the deployed URL, and add
the deployed callback URLs to your Google and GitHub OAuth apps. Dynamic
`[slug]` routes are server-rendered, so refreshing any page works.

---

_সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।_
