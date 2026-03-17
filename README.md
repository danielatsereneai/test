# SereneAI Website

**SereneAI Ltd** — Human-First AI for UK Contact Centres  
Company No. 16646814 · Blackpool, UK  
[sereneai.co.uk](https://www.sereneai.co.uk)

---

## Getting Started

### Install dependencies
```bash
npm install
```

### Run locally
```bash
npm start
```
Opens at [http://localhost:3000](http://localhost:3000)

### Build for production
```bash
npm run build
```
Output goes to the `/build` folder — this is what Vercel/Netlify deploys.

---

## Deploying

This project is deployed via **Vercel**. Any push to `main` triggers an automatic redeploy.

To deploy manually:
1. Push changes to GitHub
2. Vercel auto-detects and rebuilds within ~60 seconds

---

## Project Structure

```
sereneai-website/
├── public/
│   └── index.html          # HTML shell + SEO meta tags
├── src/
│   ├── App.js              # Full homepage component
│   └── index.js            # React entry point
├── .gitignore
├── package.json
└── README.md
```

---

## Making Changes

All site content lives in `src/App.js`. Key sections:

| Section | What to edit |
|---|---|
| Hero headline | Search for `hero-headline` |
| Services | Find the services array |
| Pain points | Find the pain-grid array |
| Founder bio | Find `founder-body` |
| Waitlist | Find `waitlist-section` |

After editing, commit and push:
```bash
git add .
git commit -m "your change description"
git push
```

---

## Contact

Daniel Turner · [daniel.turner@sereneai.co.uk](mailto:daniel.turner@sereneai.co.uk)
