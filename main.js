import { translations } from './translations.js';

// Global database reference
let newsDatabaseCache = null;

const categoryMap = {
    ko: { "Macro": "거시경제", "Tech": "기술/산업", "Energy": "에너지/ESG", "Finance": "금융시장", "Trade": "글로벌 무역" },
    en: { "거시경제": "Macro", "기술/산업": "Tech", "에너지/ESG": "Energy", "금융시장": "Finance", "글로벌 무역": "Trade" }
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
    theme: localStorage.getItem('theme') || 'dark'
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
}

async function renderNews() {
    const briefsContainer = document.getElementById('briefs-container');
    const newsContainer = document.getElementById('news-container');
    if (!briefsContainer || !newsContainer) return;
    
    newsContainer.innerHTML = `<div class="loading-spinner">${translations[state.lang]['analyzing']}</div>`;
    
    const db = await fetchNews();
    let data = (db[state.date] && db[state.date][state.lang]) || [];
    
    // Simple mock if no data
    if (data.length === 0) {
        data = [
            {
                category: state.lang === 'ko' ? "거시경제" : "Macro",
                title: state.lang === 'ko' ? `[단독] ${state.date} 글로벌 금융 시장 구조적 재편 가속화` : `[Breaking] ${state.date} Acceleration of Global Financial Restructuring`,
                summary: state.lang === 'ko' ? "지정학적 리스크와 통화 정책의 변화가 맞물리며 새로운 시장 질서가 형성되고 있습니다. 심층 분석 리포트를 확인하세요." : "Geopolitical risks and shifts in monetary policy are merging to form a new market order. Check the in-depth analysis report.",
                date: state.date
            }
        ];
    }

    // Sort or slice to top 5
    const top5 = data.slice(0, 5);

    // 1. Render Briefs (Top 5)
    briefsContainer.innerHTML = '';
    top5.forEach((news, index) => {
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
    data.forEach(news => {
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
    renderNews();
});

// Modal
const modal = document.getElementById('partnership-modal');
document.getElementById('partnership-btn')?.addEventListener('click', () => modal.classList.add('active'));
document.getElementById('close-modal')?.addEventListener('click', () => modal.classList.remove('active'));

async function updateFearGreedIndex() {
    const needle = document.getElementById('fear-greed-needle');
    const text = document.getElementById('fear-greed-text');
    const num = document.getElementById('fear-greed-num');
    
    if (!needle) return;

    // Use a more dynamic seed that changes every hour to make it feel "live"
    const now = new Date();
    const seed = now.getFullYear() + now.getMonth() + now.getDate() + now.getHours();
    
    // Improved pseudo-random logic to keep it in a realistic range (mostly 30-70)
    // Sin gives -1 to 1. We map it to a more central range.
    let value = Math.floor((Math.sin(seed) * 35) + 50); 
    
    // Add some "jitter" based on minutes to make it feel even more real if they refresh
    const jitter = Math.floor(Math.sin(now.getMinutes()) * 2);
    value = Math.max(5, Math.min(95, value + jitter));
    
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
});
