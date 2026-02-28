# Bawani Al Jazera

Website for Bawani Al Jazera construction company.

## Development

```bash
cd web
npm install
npm run dev
```

Runs at [http://localhost:3001](http://localhost:3001).

## Deploy on Vercel (fix 404)

The Next.js app lives in the **`web`** folder. To fix **404 NOT_FOUND** on Vercel:

1. Open your project on [Vercel](https://vercel.com).
2. Go to **Settings** → **General**.
3. Under **Root Directory**, click **Edit**, set it to **`web`**, and Save.
4. Go to **Deployments**, open the **⋯** menu on the latest deployment, and click **Redeploy**.

After redeploying, https://bawani-al-jazera.vercel.app should load correctly.
