# AI Tool Life — YouTube Script Generator
**Site:** aitoollife.com  
**Stack:** Next.js 14, Tailwind CSS, Claude AI (Anthropic)

---

## 🚀 Quick Start (Local)

```bash
# 1. Install dependencies
npm install

# 2. Set up environment
cp .env.local.example .env.local
# Edit .env.local and add your ANTHROPIC_API_KEY

# 3. Run locally
npm run dev
# Open http://localhost:3000
```

---

## 🌐 Deploy to Hostinger VPS

### Step 1 — Set up your VPS
Log into your Hostinger VPS via SSH:
```bash
ssh root@YOUR_VPS_IP
```

### Step 2 — Install Node.js
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
node --version   # Should show v20+
```

### Step 3 — Install PM2 (process manager)
```bash
npm install -g pm2
```

### Step 4 — Upload your project
From your LOCAL machine:
```bash
# Zip the project (excluding node_modules and .next)
zip -r aitoollife.zip . -x "node_modules/*" -x ".next/*"

# Upload to VPS
scp aitoollife.zip root@YOUR_VPS_IP:/var/www/
```

On your VPS:
```bash
cd /var/www
unzip aitoollife.zip -d aitoollife
cd aitoollife
```

### Step 5 — Configure environment
```bash
cp .env.local.example .env.local
nano .env.local
# Add your ANTHROPIC_API_KEY
```

### Step 6 — Build and start
```bash
npm install
npm run build
pm2 start npm --name "aitoollife" -- start
pm2 save
pm2 startup   # Follow the command it outputs
```

### Step 7 — Configure Nginx reverse proxy
```bash
sudo apt install nginx -y
sudo nano /etc/nginx/sites-available/aitoollife
```

Paste this config:
```nginx
server {
    listen 80;
    server_name aitoollife.com www.aitoollife.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 120s;
    }
}
```

Enable and start:
```bash
sudo ln -s /etc/nginx/sites-available/aitoollife /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 8 — Add SSL (HTTPS)
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d aitoollife.com -d www.aitoollife.com
```

### Step 9 — Point domain DNS
In Hostinger domain panel:
- A Record → @ → YOUR_VPS_IP
- A Record → www → YOUR_VPS_IP

---

## 🔑 Get Your Anthropic API Key

1. Go to https://console.anthropic.com
2. Sign up / Log in
3. Click "API Keys" → "Create Key"
4. Copy and paste into your `.env.local`

**Cost:** ~$0.015 per 1,000 tokens. A 10-min script = ~2,000 tokens = ~$0.03 per script.

---

## 📂 Project Structure

```
aitoollife/
├── app/
│   ├── layout.js          ← Root layout, fonts, metadata
│   ├── page.js            ← Landing page (/)
│   ├── globals.css        ← Global styles
│   ├── generate/
│   │   └── page.js        ← Script generator (/generate)
│   └── api/
│       └── generate-script/
│           └── route.js   ← Claude API endpoint
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── ScriptForm.jsx     ← Input form
│   └── ScriptOutput.jsx   ← Script display + actions
├── .env.local             ← Your API keys (DO NOT commit)
├── next.config.js
├── tailwind.config.js
└── package.json
```

---

## 🛠 Updating the Site

After making changes locally:
```bash
# Build new version
npm run build

# Re-upload to VPS and restart
pm2 restart aitoollife
```

---

## ❓ Troubleshooting

**Script generation is slow:** Normal — Claude takes 20–45 seconds for long scripts.

**"API key not configured" error:** Make sure `.env.local` exists on your VPS with `ANTHROPIC_API_KEY` set.

**502 Bad Gateway:** Run `pm2 restart aitoollife` and check `pm2 logs aitoollife`.

**Domain not pointing:** DNS changes take 1–24 hours to propagate.
