# DealFinder

**The investor-first real estate analyzer.** Built for cash flow, not curb appeal.

DealFinder helps real estate investors analyze properties instantly — with deal scoring, cash flow analysis, BRRRR modeling, fix & flip calculators, and more. All in a single fast web app.

---

## Features

- **Deal scoring** — Every property gets an A–D grade based on cash flow, cap rate, and cash-on-cash return
- **5 built-in calculators** — Cash flow, fix & flip, cap rate & NOI, BRRRR, and buy vs rent
- **Add your own deals** — Analyze any property: MLS, off-market, wholesaler, or your own portfolio
- **Watchlist** — Save and compare properties across sessions
- **Filter & sort** — By property type, deal score, cap rate, cash flow, or price
- **No backend required** — Runs entirely in the browser, data saved locally

---

## Getting Started

### Run locally

Just open `index.html` in any browser. No installation, no dependencies, no build step.

```bash
# Clone the repo
git clone https://github.com/yourusername/dealfinder.git

# Open in browser
open index.html
```

### Deploy to Vercel

1. Fork or clone this repo
2. Go to [vercel.com](https://vercel.com) → Add New Project
3. Import this GitHub repository
4. Click Deploy

Your app will be live at a `*.vercel.app` URL in under a minute.

---

## Roadmap

- [ ] Rentcast API integration — real rent estimates by address
- [ ] Supabase user accounts — cloud-synced watchlist and saved deals
- [ ] Market data dashboard — rent trends by zip code
- [ ] Mobile responsive layout
- [ ] PDF deal report export
- [ ] Stripe billing for Pro tier

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Vanilla HTML, CSS, JavaScript |
| Fonts | DM Sans + DM Mono (Google Fonts) |
| Storage | Browser localStorage |
| Hosting | Vercel (free tier) |
| Data (planned) | Rentcast API, Attom Data |

---

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

---

## License

MIT License — see [LICENSE](LICENSE) for details.

---

Built with [Claude](https://claude.ai) · Hosted on [Vercel](https://vercel.com)
