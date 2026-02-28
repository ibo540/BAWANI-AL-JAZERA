# Project images

- **مزرعة الريان** (Mazraat Al Rayan): `mazraat-al-rayan.png` — already added.
- **مجمعين مدارس** (Two Schools Complex): 8 images `madaris-1.png` … `madaris-8.png`.

## Adding and enhancing مجمعين مدارس images

1. Copy your 8 project photos into this folder and name them:
   - `madaris-1.png`, `madaris-2.png`, … `madaris-8.png`
2. From the `web` folder run:
   ```bash
   npm run enhance:madaris
   ```
   This uses Sharp to improve contrast, saturation, and sharpness so the photos look more professional on the site.

If Sharp is not installed yet, run:
```bash
npm install sharp --save-dev --legacy-peer-deps
```
then run `npm run enhance:madaris` again.
