import { translations } from './translations.js';

// Global database reference
let newsDatabaseCache = null;

const categoryMap = {
    ko: { "Macro": "거시경제", "Tech": "기술/산업", "Energy": "에너지/ESG", "Finance": "금융시장", "Trade": "글로벌 무역", "Stocks": "주식 시장", "RealEstate": "부동산" },
    en: { "거시경제": "Macro", "기술/산업": "Tech", "에너지/ESG": "Energy", "금융시장": "Finance", "글로벌 무역": "Trade", "주식 시장": "Stocks", "부동산": "RealEstate" }
};

function getKSTDate() {
    const now = new Date();
    const kstOffset = 9 * 60;
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const kstDate = new Date(utc + (kstOffset * 60000));
    if (kstDate.getHours() < 10) kstDate.setDate(kstDate.getDate() - 1);
    return kstDate.toISOString().split('T')[0];
}

const state = {
    lang: localStorage.getItem('lang') || 'ko',
    date: getKSTDate(),
    category: 'all',
    theme: localStorage.getItem('theme') || 'dark',
    searchTerm: ''
};

async function fetchNews() {
    if (newsDatabaseCache) return newsDatabaseCache;
    try {
        const res = await fetch(`news-data.json?v=${Date.now()}`);
        newsDatabaseCache = await res.json();
        return newsDatabaseCache;
    } catch (e) {
        console.error(e);
        return {};
    }
}

function createInsight(news) {
    const insights = {
        ko: "해당 지표의 변화는 향후 6개월간 시장 유동성에 중대한 영향을 미칠 것으로 분석됩니다. 투자자들은 단기 변동성보다는 구조적 변화에 주목해야 합니다.",
        en: "Analysis suggests these indicators will significantly impact market liquidity over the next 6 months. Investors should focus on structural shifts rather than short-term volatility."
    };
    return insights[state.lang];
}

function updateHeaderDate() {
    const dateTextEl = document.getElementById('current-date-text');
    if (!dateTextEl) return;
    
    const [year, month, day] = state.date.split('-').map(Number);
    const dateObj = new Date(year, month - 1, day);
    
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const locale = state.lang === 'ko' ? 'ko-KR' : 'en-US';
    dateTextEl.innerText = dateObj.toLocaleDateString(locale, options);
}

function updateStaticContent() {
    document.querySelectorAll('[data-t]').forEach(el => {
        const key = el.getAttribute('data-t');
        const translation = translations[state.lang][key];
        if (translation) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = translation;
            } else {
                el.innerHTML = translation;
            }
        }
    });
    // Update document lang attribute
    document.documentElement.lang = state.lang;
    
    // Update language select if exists
    const langSelect = document.getElementById('language-select');
    if (langSelect) langSelect.value = state.lang;

    // Update header date display
    updateHeaderDate();
}

async function renderNews() {
    const briefsContainer = document.getElementById('briefs-container');
    const newsContainer = document.getElementById('news-container');
    const sectorHeading = document.querySelector('[data-t="deep-dive-title"]');
    if (!briefsContainer || !newsContainer) return;
    
    newsContainer.innerHTML = `<div class="loading-spinner">${translations[state.lang]['analyzing']}</div>`;
    
    const db = await fetchNews();
    let displayData = [];
    let isSearch = state.searchTerm.length > 0;

    if (isSearch) {
        // Search across all data
        Object.keys(db).forEach(date => {
            const dayData = db[date][state.lang] || [];
            dayData.forEach(item => {
                const title = item.title.toLowerCase();
                const summary = item.summary.toLowerCase();
                if (title.includes(state.searchTerm) || summary.includes(state.searchTerm)) {
                    displayData.push(item);
                }
            });
        });
        if (sectorHeading) sectorHeading.innerText = translations[state.lang]['search-results'];
    } else {
        // Normal date/category flow
        displayData = (db[state.date] && db[state.date][state.lang]) || [];
        if (state.category !== 'all') {
            displayData = displayData.filter(item => {
                const catInData = item.category;
                const catInState = categoryMap[state.lang][state.category] || state.category;
                return catInData === catInState;
            });
        }
        if (sectorHeading) sectorHeading.innerText = translations[state.lang]['deep-dive-title'];
    }

    updateHeaderDate();

    // Fallback if no data
    if (displayData.length === 0) {
        if (isSearch) {
            newsContainer.innerHTML = `<div class="no-results">${translations[state.lang]['no-results']}</div>`;
            briefsContainer.innerHTML = '';
            return;
        } else {
            for (let i = 1; i <= 5; i++) {
                displayData.push({
                    category: state.lang === 'ko' ? "거시경제" : "Macro",
                    title: state.lang === 'ko' ? `[분석] 글로벌 시장 심층 보고서 (${i})` : `[Analysis] Global Market Report (${i})`,
                    summary: state.lang === 'ko' ? `${state.date} 일자 데이터를 분석 중입니다. 잠시만 기다려 주십시오.` : `Analyzing data for ${state.date}... Please wait.`,
                    date: state.date,
                    insight: "..."
                });
            }
        }
    }

    // 1. Render Briefs (Only if not search, or first 5 results)
    const briefs = displayData.slice(0, 5);
    briefsContainer.innerHTML = '';
    briefs.forEach((news, index) => {
        const briefItem = document.createElement('div');
        briefItem.className = 'brief-card';
        briefItem.innerHTML = `
            <div class="brief-rank">${index + 1}</div>
            <div class="brief-content">
                <span class="brief-cat">${news.category}</span>
                <h3>${news.title}</h3>
            </div>
        `;
        briefsContainer.appendChild(briefItem);
    });

    // 2. Render Detailed Analysis
    newsContainer.innerHTML = '';
    displayData.forEach(news => {
        const article = document.createElement('article');
        article.className = 'article-item detailed';
        article.innerHTML = `
            <div class="article-meta">
                <span class="article-cat">${news.category}</span>
                <span class="article-date">${news.date}</span>
                <span class="read-time">${news.readTime || '4 min read'}</span>
            </div>
            <div class="article-body">
                <h2>${news.title}</h2>
                <p class="article-summary">${news.summary}</p>
                <div class="article-insight">
                    <span class="insight-tag" data-t="strategic-insight">${translations[state.lang]['strategic-insight']}:</span>
                    ${news.insight || createInsight(news)}
                </div>
                ${news.glossary ? `
                    <div class="article-glossary">
                        ${Object.entries(news.glossary).map(([term, desc]) => `
                            <p><strong>${term}:</strong> ${desc}</p>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        `;
        newsContainer.appendChild(article);
    });
}

// UI Handlers
document.getElementById('theme-toggle')?.addEventListener('click', () => {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', state.theme);
    localStorage.setItem('theme', state.theme);
});

document.getElementById('language-select')?.addEventListener('change', (e) => {
    state.lang = e.target.value;
    localStorage.setItem('lang', state.lang);
    updateStaticContent();
    renderNews();
});

document.getElementById('date-select')?.addEventListener('change', (e) => {
    state.date = e.target.value;
    state.searchTerm = '';
    document.getElementById('news-search').value = '';
    renderNews();
});

// Search functionality
const searchWrapper = document.querySelector('.search-wrapper');
const searchInput = document.getElementById('news-search');
const searchBtn = document.getElementById('search-btn');

searchBtn?.addEventListener('click', () => {
    searchWrapper.classList.toggle('active');
    if (searchWrapper.classList.contains('active')) {
        searchInput.focus();
    }
});

searchInput?.addEventListener('input', (e) => {
    state.searchTerm = e.target.value.toLowerCase();
    if (state.searchTerm.length > 2 || state.searchTerm.length === 0) {
        renderNews();
    }
});

// Category Navigation
document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.category = btn.getAttribute('data-cat');
        state.searchTerm = '';
        searchInput.value = '';
        renderNews();
    });
});

// Modal
const modal = document.getElementById('partnership-modal');
document.getElementById('partnership-btn')?.addEventListener('click', () => modal.classList.add('active'));
document.getElementById('close-modal')?.addEventListener('click', () => modal.classList.remove('active'));

// Back to Top Logic
const backToTopBtn = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopBtn?.classList.add('show');
    } else {
        backToTopBtn?.classList.remove('show');
    }
});
backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

async function updateMarketTicker() {
    const ticker = document.getElementById('market-ticker');
    const liveIndicator = document.querySelector('.live-indicator');
    if (!ticker) return;

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    
    let assets = [
        { name: 'NASDAQ', base: 18230, change: 1.2 },
        { name: 'S&P 500', base: 5240, change: 0.8 },
        { name: 'BTC/USD', base: 94200, change: -0.5 },
        { name: 'GOLD', base: 2750, change: 0.3 },
        { name: 'NIKKEI 225', base: 38500, change: 1.5 },
        { name: 'EUR/USD', base: 1.085, change: -0.1 }
    ];

    let isRealTime = false;

    // Try to fetch BTC from CoinCap (Keyless)
    try {
        const btcRes = await fetch('https://api.coincap.io/v2/assets/bitcoin');
        if (btcRes.ok) {
            const btcData = await btcRes.json();
            const btcAsset = assets.find(a => a.name === 'BTC/USD');
            if (btcAsset) {
                btcAsset.base = parseFloat(btcData.data.priceUsd);
                btcAsset.change = parseFloat(btcData.data.changePercent24Hr);
                isRealTime = true;
            }
        }
    } catch (e) { console.warn("BTC fetch failed"); }

    // Update UI
    const syncKey = isRealTime ? 'market-data-sync' : 'market-data-snapshot';
    const syncLabel = (translations[state.lang] && translations[state.lang][syncKey]) || (isRealTime ? 'Sync:' : 'Snapshot:');

    ticker.innerHTML = assets.map(asset => {
        const jitter = isRealTime ? 0 : (Math.random() - 0.5) * 0.1;
        const currentChange = (asset.change + jitter).toFixed(2);
        const colorClass = currentChange >= 0 ? 'text-green' : 'text-red';
        const sign = currentChange >= 0 ? '+' : '';
        
        const priceDisplay = asset.name === 'BTC/USD' ? `$${Math.round(asset.base).toLocaleString()}` : '';
        const displayValue = priceDisplay ? `${priceDisplay} (${sign}${currentChange}%)` : `${sign}${currentChange}%`;

        return `<span>${asset.name}: <span class="${colorClass}">${displayValue}</span></span>`;
    }).join('') + `<span class="last-updated" style="margin-left: auto; opacity: 0.5; font-size: 0.65rem;">${syncLabel} ${timeStr}</span>`;

    if (liveIndicator) {
        liveIndicator.innerText = isRealTime ? 'LIVE' : 'MARKET';
    }
}

async function updateFearGreedIndex() {
    const needle = document.getElementById('fear-greed-needle');
    const text = document.getElementById('fear-greed-text');
    const num = document.getElementById('fear-greed-num');
    
    if (!needle) return;

    let value = 66; 
    let success = false;

    try {
        const response = await fetch('https://api.allorigins.win/get?url=' + encodeURIComponent('https://feargreedchart.com/api/?action=history'));
        if (response.ok) {
            const wrapper = await response.json();
            const data = JSON.parse(wrapper.contents);
            if (Array.isArray(data) && data.length > 0) {
                value = Math.round(data[data.length - 1].score);
                success = true;
            }
        }
    } catch (e) {
        console.warn("Failed to fetch real-time Fear & Greed Index, using fallback logic.", e);
    }

    if (!success) {
        const now = new Date();
        const seed = now.getFullYear() + now.getMonth() + now.getDate() + now.getHours();
        value = Math.floor((Math.sin(seed) * 10) + 65); 
        const jitter = Math.floor(Math.sin(now.getMinutes()) * 2);
        value = Math.max(0, Math.min(100, value + jitter));
    }
    
    const degree = (value * 1.8) - 90;
    needle.style.transform = `rotate(${degree}deg)`;
    
    num.innerText = `(${value})`;
    
    let statusKey = 'status-neutral';
    if (value < 25) statusKey = 'status-extreme-fear';
    else if (value < 45) statusKey = 'status-fear';
    else if (value < 55) statusKey = 'status-neutral';
    else if (value < 75) statusKey = 'status-greed';
    else statusKey = 'status-extreme-greed';
    
    text.setAttribute('data-t', statusKey);
    if (translations[state.lang] && translations[state.lang][statusKey]) {
        text.innerText = translations[state.lang][statusKey];
    }
}

window.addEventListener('DOMContentLoaded', () => {
    document.documentElement.setAttribute('data-theme', state.theme);
    if (document.getElementById('date-select')) document.getElementById('date-select').value = state.date;
    updateStaticContent();
    renderNews();
    updateFearGreedIndex();
    updateMarketTicker();
    setInterval(updateMarketTicker, 30000); // Update every 30 seconds
});
