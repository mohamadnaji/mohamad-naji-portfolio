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

## CI/CD Pipeline

This project uses **GitHub Actions** for automated deployment to a VPS running Nginx.

### How it works

Every push to `main` automatically:
1. Runs **ESLint** to check code quality
2. Runs **unit tests** — blocks deploy if they fail
3. SSHs into the server and:
   - Pulls latest code (`git pull origin main`)
   - Installs dependencies only if `package-lock.json` changed
   - Backs up the current `build/` folder
   - Runs `npm run build`
   - **Auto-rolls back** to the previous build if the new build fails
   - Runs a health check on the live site
4. Sends a **Telegram notification** with the result (✅ or ❌)

### Flow diagram

```
git push origin main
        ↓
ESLint + Tests
        ↓ (only if passing)
SSH into server
        ↓
git pull → smart npm ci → build
        ↓
Auto rollback if build fails
        ↓
Health check
        ↓
Telegram notification ✅ or ❌
```

### GitHub Secrets required

Go to `GitHub repo → Settings → Secrets and variables → Actions` and add:

| Secret | Description |
|---|---|
| `SERVER_HOST` | Server IP address |
| `SERVER_USER` | SSH username (e.g. `root`) |
| `SERVER_SSH_KEY` | Private SSH key (`cat ~/.ssh/github_deploy`) |
| `SERVER_PORT` | SSH port (usually `22`) |
| `TELEGRAM_BOT_TOKEN` | Bot token from @BotFather |
| `TELEGRAM_CHAT_ID` | Your Telegram chat ID |
| `REACT_APP_EMAILJS_SERVICE_ID` | EmailJS service ID |
| `REACT_APP_EMAILJS_TEMPLATE_ID` | EmailJS template ID |
| `REACT_APP_EMAILJS_PUBLIC_KEY` | EmailJS public key |

### Server setup

The server must have:
- **Node.js** installed
- **Nginx** pointing to `/var/www/mohamad-naji-portfolio/build`
- The repo cloned at `/var/www/mohamad-naji-portfolio`

```bash
# Initial server setup (run once)
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git /var/www/mohamad-naji-portfolio
cd /var/www/mohamad-naji-portfolio
npm ci
npm run build
```

### Nginx config

```nginx
server {
    listen 80;
    root /var/www/mohamad-naji-portfolio/build;
    index index.html;

    location / {
        try_files $uri /index.html;
    }
}
```

### SSH key setup (run on server)

```bash
# Generate key pair
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/github_deploy

# Authorize the public key
cat ~/.ssh/github_deploy.pub >> ~/.ssh/authorized_keys

# Copy private key → paste into SERVER_SSH_KEY secret
cat ~/.ssh/github_deploy
```

### Telegram notifications setup

1. Open Telegram → search **@BotFather** → send `/newbot`
2. Save the token → add as `TELEGRAM_BOT_TOKEN` secret
3. Send any message to your bot, then open:
   `https://api.telegram.org/bot<TOKEN>/getUpdates`
4. Copy the `chat.id` value → add as `TELEGRAM_CHAT_ID` secret

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
