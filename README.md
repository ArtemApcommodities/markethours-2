# 📊 Stock Market Hours - Live Global Countdown & Trading Clock

A real-time, responsive web application tracking live trading hours for 30+ major world stock exchanges with dynamic countdown timers, regional ordering, and accessibility-first design. Deployed to GitHub Pages with zero server-side dependencies.

---

## ✨ Features

- 🌍 **Live Local Time Updates** - Each exchange card shows real-time local time updating every second via client-side JavaScript
- 🎨 **Color-Coded Status Indicators:**
  - ✅ **Green**: Market Open (trading active)
  - ❌ **Red**: Market Closed (after hours)
  - 💛 **Amber**: Pre-market / After-hours session
- ⏱️ **Next-Open Countdown** - Displays time until market reopens for closed sessions with Dd HH:MM:SS format
- 🗺️ **Geographic Ordering** - Cards order from closest to farthest based on visitor location
- ♿ **Accessibility First:**
  - Full keyboard navigation support
  - Screen reader compatible with proper ARIA labels
  - Focus-visible states for all interactive elements
- 📱 **Responsive Design** - Works on mobile, tablet, and desktop
- 🔗 **SEO Optimized** - JSON-LD Schema markup for rich search results

---

## 🛠️ Tech Stack

- HTML5 (ES6+)
- CSS3 with Grid/Flexbox
- Vanilla JavaScript (No frameworks required)
- GitHub Pages hosting
- Zero backend dependencies

---

## 📁 Project Structure

stock-market-hours/
├── index.html              # Main entry point
├── css/
│   └── styles.css         # Responsive styling
├── js/
│   ├── main.js           # Core application logic
│   ├── time-utils.js     # Timezone calculations & countdown
│   └── data/exchanges.json# Exchange configurations (30+ markets)
└── legal/                # Privacy policy, terms, contact pages


---

## 🚀 Deployment to GitHub Pages

### Quick Start:
1. Push this repository to GitHub
2. Go to Settings → Pages
3. Select "Deploy from branch" on `main` or `master`
4. Enable custom domain if desired

### Automatic Build (Optional):
For dynamic features, use Netlify/Vercel CI builds that deploy automatically on every push.

---

## 🌐 Supported Markets

- **North America**: NYSE, NASDAQ, TSX (Toronto)
- **Europe**: LSE, Euronext Paris/Amsterdam, Frankfurt, SIX Swiss, Borsa Italiana, Bolsa de Madrid, Oslo Børs, Copenhagen, Helsinki
- **Asia-Pacific**: TSE, SSE, SZSE, HKEX, NSE, ASX, SGX, TWSE, JPY
- **Middle East & Others**: B3 (Brazil), JSE (South Africa), Warsaw Stock Exchange, Tadawul (Saudi Arabia)

---

## ♿ Accessibility Compliance

The site meets WCAG 2.1 AA standards:
- Color contrast ratios of 4.5:1 minimum for text
- Focus indicators visible on all interactive elements
- Alt text for images and screen reader support
- Keyboard-only navigation functional throughout
- ARIA labels properly applied to dynamic content

---

## 🔒 Privacy & Security

- **No server-side data collection** - All logic runs client-side
- **Optional geolocation** with clear consent prompts
- **HTTPS enforced** by GitHub Pages
- **GDPR/CCPA compliant** legal pages included

---

## 📝 Maintenance

### Updating Exchange Data:
1. Edit `js/data/exchanges.json`
2. Add new markets following the schema
3. Push changes - site updates instantly via CDN cache

### Adding Markets:
```javascript
{
  "name": "Exchange Name",
  "country": "Country Code",
  "micCode": "MIC",
  "timezone": "IANA Timezone String",
  "hours": { 
    "open": 9, 
    "close": 16 
  },
  "officialUrl": "https://official-exchange-site.com"
}
📞 Contact & Support
For questions or issues:

Email: artem.apcommodities@gmail.com
Repository Issues: Create a GitHub issue with reproduction steps
📜 License
MIT License - Feel free to use, modify, and redistribute.

🌟 Contributing
Contributions welcome! Please submit issues or pull requests through the repository.
