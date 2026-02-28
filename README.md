# Bawani Al Jazera

Website for Bawani Al Jazera construction company.

## Development

```bash
cd web
npm install
npm run dev
```

Runs at [http://localhost:3001](http://localhost:3001).

## Deploy on Vercel

The Next.js app lives in the **`web`** folder.

1. Open your project on [Vercel](https://vercel.com).
2. Go to **Settings** → **General**.
3. Set **Root Directory** to **`web`** (fixes 404 NOT_FOUND).
4. Under **Build & Development Settings**, set **Framework Preset** to **Next.js** (fixes `__dirname is not defined` in middleware on Edge).
5. Redeploy from **Deployments** if you changed settings.

After redeploying, the site should load correctly.
