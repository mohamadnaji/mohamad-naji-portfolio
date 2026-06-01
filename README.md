# Mohamad NAJI — Portfolio v2

A modern, performant single-page portfolio built with React 19 and Framer Motion. Features glassmorphism design, 3D tilt cards, parallax scroll, staggered entrance animations, and a fully functional contact form powered by EmailJS.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Animations | Framer Motion 12 |
| Icons | React Icons 5 |
| Typing effect | React Type Animation |
| Contact form | EmailJS |
| Styling | Plain CSS with CSS custom properties |
| Build tool | Create React App (react-scripts 5) |

---

## Features

- Dark / Light theme toggle
- Framer Motion `whileInView` stagger animations across all sections
- 3D tilt cards with GPU-composited spotlight (TiltCard component)
- Aurora background mesh with drifting orbs
- Hero: word-by-word name reveal, parallax layers, scroll indicator, status badge
- About: floating profile photo, stats row
- Skills: skill item stagger, glassmorphism groups, display-mode pill toggle
- Projects & Services: glassmorphism cards with shimmer hover sweep
- Experience: vertical timeline with dot markers
- Contact: floating-label form, EmailJS integration
- Fully responsive (mobile / tablet / desktop)
- `prefers-reduced-motion` support

---

## Local Development

### 1. Clone and install

```bash
git clone https://github.com/mohamadnaji/mohamad-naji-portfolio.git
cd mohamad-naji-portfolio
npm install
```

### 2. Configure environment variables

Copy the example file and fill in your EmailJS credentials:

```bash
cp .env.example .env
```

Open `.env` and set the three variables (see [Environment Variables](#environment-variables) below).

### 3. Run

```bash
npm start
```

Opens at [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

The contact form uses [EmailJS](https://www.emailjs.com/) to send emails directly from the browser — no backend required.

### Required variables

| Variable | Description |
|---|---|
| `REACT_APP_EMAILJS_SERVICE_ID` | Your EmailJS **Service ID** (e.g. `service_xxxxxxx`) |
| `REACT_APP_EMAILJS_TEMPLATE_ID` | Your EmailJS **Template ID** (e.g. `template_xxxxxxx`) |
| `REACT_APP_EMAILJS_PUBLIC_KEY` | Your EmailJS **Public Key** (found in Account → API Keys) |

### How to get them

1. Sign up at [https://www.emailjs.com](https://www.emailjs.com)
2. **Service ID** — go to *Email Services* → add a service (Gmail, Outlook, etc.) → copy the Service ID
3. **Template ID** — go to *Email Templates* → create a template → copy the Template ID
4. **Public Key** — go to *Account* → *API Keys* → copy the Public Key

### Local `.env` file

Create a `.env` file at the project root (never commit this file):

```env
REACT_APP_EMAILJS_SERVICE_ID=service_xxxxxxx
REACT_APP_EMAILJS_TEMPLATE_ID=template_xxxxxxx
REACT_APP_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxx
```

> **Note:** All `REACT_APP_` variables are baked into the static build at compile time by Create React App. They are **not** secret — they will be visible in the browser bundle. EmailJS Public Keys are designed to be used client-side; restrict which domains can use your key inside the EmailJS dashboard under *Account → Security*.

---

## Build for Production

```bash
npm run build
```

Outputs an optimised static bundle to the `build/` folder. The JS bundle is ~170 kB gzipped.

---

## Deployment

This is a static site — no server needed. Deploy the `build/` folder to any static host.

### Vercel (recommended)

1. Push to GitHub
2. Import the repo at [vercel.com/new](https://vercel.com/new)
3. Framework preset: **Create React App**
4. Add the three environment variables in *Project Settings → Environment Variables*
5. Deploy — Vercel rebuilds on every push to `main`

### Netlify

1. Connect the repo in the Netlify dashboard
2. Build command: `npm run build`
3. Publish directory: `build`
4. Add the three environment variables in *Site Settings → Environment Variables*
5. Deploy

### Shared hosting / VPS (Apache or Nginx)

```bash
npm run build
# Upload the contents of build/ to your web root (e.g. public_html/)
```

Because this is a client-side SPA, configure your server to serve `index.html` for all routes:

**Nginx**
```nginx
location / {
  try_files $uri /index.html;
}
```

**Apache** (add a `.htaccess` in `build/`)
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QSA,L]
```

> **Environment variables on a VPS:** Since CRA bakes env vars at build time, set them in your shell *before* running `npm run build`:
> ```bash
> export REACT_APP_EMAILJS_SERVICE_ID=service_xxxxxxx
> export REACT_APP_EMAILJS_TEMPLATE_ID=template_xxxxxxx
> export REACT_APP_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxx
> npm run build
> ```

---

## Project Structure

```
src/
├── assets/             # Images (hero, about, projects)
├── components/
│   └── common/
│       ├── Navbar/
│       ├── MobileNavbar/
│       ├── ThemeToggle/
│       ├── Section/        # SectionTitle component
│       └── TiltCard.js     # Reusable 3D tilt card
├── hooks/
│   ├── useIntersectionObserver.js
│   └── useIsMobile.js
├── sections/
│   ├── Hero/
│   ├── About/
│   ├── Skills/
│   ├── Services/
│   ├── Experiences/
│   ├── Projects/
│   ├── Educations/
│   └── Contact/
├── utils/
│   └── motionVariants.js   # Shared Framer Motion variants
├── App.js
└── App.css
```

---

## Changelog

### v2.0.0 — 2025
- Full visual modernisation: glassmorphism, aurora background, 3D tilt cards
- Framer Motion migration (removed CSS `animate-in` pattern)
- Performance: compositor-only spotlight, CSS float animation, scale-free aurora
- EmailJS credentials moved to environment variables
- Custom hooks: `useIntersectionObserver`, `useIsMobile`
- Services section added with 4 service cards

### v1.0.0 — 2025-01-09
- Initial release
