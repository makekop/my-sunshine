# 🌤 My Sunshine — Helsinki Sunshine Tracker

A tiny web app that shows **how much sunshine Helsinki has received** over a selected number of past days.

You can choose preset ranges (5, 10, 15, 30 days) or use a slider to pick any number of days and the app calculates the total sunshine automatically.

---

## Features

* Fetches sunshine data on the **server side**
* Converts raw seconds into readable time (hours + minutes)
* Interactive slider + preset buttons
* Tailwind UI

---

## Live Demo
https://my-sunshine-rho.vercel.app/

## Tech Stack

* **Next.js (App Router)**
* **React**
* **Tailwind CSS**

---

## Getting Started

### 1️⃣ Clone the repo

```bash
git clone https://github.com/makekop/my-sunshine.git
cd my-sunshine
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Start the development server

```bash
npm run dev
```

Open in your browser:

```
http://localhost:3000
```

The page fetches sunshine data automatically.

---

## 🔍 How It Works

1️⃣ The app calls a sunshine API on the **server**.
2️⃣ It stores the daily sunshine values in memory.
3️⃣ When the user selects a timeframe, the app:

* slices the last N days
* sums the total seconds
* converts them to *hours + minutes*

Then it displays:

> *Over the past X days, Helsinki has had Y hours Z minutes of sunshine.*

---

## Roadmap (maybe later)

* Add other cities
* Add forecast for sunshine
* Compare cities

---

## Contributing

All Suggestions & PRs are welcome!

---

## Licence
MIT