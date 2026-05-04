const EXCHANGES = [
    { name: "NYSE", country: "🇺🇸 USA", mic: "XNYS", tz: "America/New_York", open: "09:30", close: "16:00", url: "https://www.nyse.com", lat: 40.7, lon: -74.0 },
    { name: "LSE", country: "🇬🇧 UK", mic: "XLON", tz: "Europe/London", open: "08:00", close: "16:30", url: "https://www.londonstockexchange.com", lat: 51.5, lon: -0.1 },
    { name: "TSE", country: "🇯🇵 Japan", mic: "XJPX", tz: "Asia/Tokyo", open: "09:00", close: "15:00", url: "https://www.jpx.co.jp", lat: 35.6, lon: 139.7 },
    // ... Add all 30 exchanges here following this pattern
];

// Simple Holiday Check (Example for 2026)
const HOLIDAYS = ["2026-01-01", "2026-12-25"];

async function init() {
    const userCoords = await getUserLocation();
    sortExchanges(userCoords);
    renderGrid();
    setInterval(updateClocks, 1000);
}

async function getUserLocation() {
    return new Promise(resolve => {
        navigator.geolocation.getCurrentPosition(
            p => resolve({ lat: p.coords.latitude, lon: p.coords.longitude }),
            () => resolve({ lat: 0, lon: 0 }) // Default to 0,0 if blocked
        );
    });
}

function sortExchanges(coords) {
    EXCHANGES.sort((a, b) => {
        const distA = Math.hypot(a.lat - coords.lat, a.lon - coords.lon);
        const distB = Math.hypot(b.lat - coords.lat, b.lon - coords.lon);
        return distA - distB;
    });
}

function getExchangeState(ex) {
    const now = new Date();
    const localTime = new Date(now.toLocaleString("en-US", { timeZone: ex.tz }));
    const day = localTime.getDay();
    const timeStr = localTime.getHours().toString().padStart(2, '0') + ":" + localTime.getMinutes().toString().padStart(2, '0');
    
    const isWeekend = day === 0 || day === 6;
    const isHoliday = HOLIDAYS.includes(localTime.toISOString().split('T')[0]);
    
    if (isWeekend || isHoliday) return "CLOSED";
    if (timeStr >= ex.open && timeStr < ex.close) return "OPEN";
    return "CLOSED"; // Simplified: Add Amber logic here for Pre-market if desired
}

function renderGrid() {
    const grid = document.getElementById('market-grid');
    grid.innerHTML = EXCHANGES.map(ex => `
        <a href="${ex.url}" target="_blank" rel="noopener noreferrer" class="exchange-card" id="card-${ex.mic}" aria-label="View ${ex.name} website">
            <div class="status-badge" id="badge-${ex.mic}">Checking...</div>
            <h3>${ex.name}</h3>
            <p>${ex.country} (${ex.mic})</p>
            <div class="local-time" id="time-${ex.mic}">--:--:--</div>
            <div class="countdown" id="count-${ex.mic}"></div>
        </a>
    `).join('');
}

function updateClocks() {
    EXCHANGES.forEach(ex => {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('en-GB', {
            timeZone: ex.tz, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
        });
        const state = getExchangeState(ex);
        
        document.getElementById(`time-${ex.mic}`).innerText = formatter.format(now);
        const card = document.getElementById(`card-${ex.mic}`);
        const badge = document.getElementById(`badge-${ex.mic}`);
        
        if (state === "OPEN") {
            card.className = "exchange-card card-open";
            badge.className = "status-badge badge-open";
            badge.innerText = "Market Open";
        } else {
            card.className = "exchange-card card-closed";
            badge.className = "status-badge badge-closed";
            badge.innerText = "Market Closed";
        }
    });
}

init();
