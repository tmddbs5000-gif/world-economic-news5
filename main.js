// Web Component for News Card
class NewsCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    set data(news) {
        this._news = news;
        this.render();
    }

    render() {
        if (!this._news) return;
        
        const glossaryHtml = this._news.glossary ? `
            <div class="glossary">
                <div class="glossary-title">💡 Key Terms Glossary</div>
                ${Object.entries(this._news.glossary).map(([term, def]) => `
                    <div class="glossary-item"><strong>${term}</strong>: ${def}</div>
                `).join('')}
            </div>
        ` : '';

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    animation: slideIn 0.5s cubic-bezier(0.25, 1, 0.5, 1) forwards;
                }
                @keyframes slideIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .card {
                    background: var(--card-bg);
                    border: 1px solid var(--border-color);
                    border-radius: 24px;
                    padding: 2rem;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                }
                .card-header { display: flex; justify-content: space-between; margin-bottom: 1.2rem; }
                .category {
                    background: var(--accent-color);
                    color: white;
                    padding: 0.35rem 0.8rem;
                    border-radius: 8px;
                    font-size: 0.75rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }
                .date { font-size: 0.8rem; color: var(--text-secondary); font-weight: 500; }
                h2 { font-size: 1.45rem; margin-bottom: 1.5rem; line-height: 1.35; color: var(--text-primary); font-weight: 800; }
                .summary {
                    font-size: 1.05rem;
                    color: var(--text-secondary);
                    line-height: 1.8;
                    margin-bottom: 2rem;
                    white-space: pre-line;
                }
                .glossary {
                    background: var(--input-bg);
                    border: 1px solid var(--border-color);
                    padding: 1.2rem;
                    border-radius: 16px;
                    margin-top: auto;
                    font-size: 0.85rem;
                }
                .glossary-title {
                    font-weight: 700;
                    color: var(--accent-color);
                    margin-bottom: 0.8rem;
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                .glossary-item {
                    color: var(--text-secondary);
                    margin-bottom: 0.5rem;
                    line-height: 1.5;
                }
                .glossary-item:last-child { margin-bottom: 0; }
                .glossary-item strong {
                    color: var(--text-primary);
                }
                .meta {
                    margin-top: 2rem;
                    padding-top: 1.2rem;
                    border-top: 1px solid var(--border-color);
                    display: flex;
                    justify-content: space-between;
                    font-size: 0.75rem;
                    color: var(--text-secondary);
                    font-weight: 500;
                }
            </style>
            <div class="card">
                <div class="card-header">
                    <span class="category">${this._news.category}</span>
                    <span class="date">${this._news.date}</span>
                </div>
                <h2>${this._news.title}</h2>
                <div class="summary">${this._news.summary}</div>
                ${glossaryHtml}
                <div class="meta">
                    <span>Source: Global EcoNews Research</span>
                    <span>${this._news.readTime}</span>
                </div>
            </div>
        `;
    }
}
customElements.define('news-card', NewsCard);

// Global database reference
let newsDatabaseCache = null;

// Category Mapping (Internal Standard to Display)
const categoryMap = {
    ko: {
        "Macro": "거시경제",
        "Tech": "기술/산업",
        "Energy": "에너지/ESG",
        "Finance": "금융시장",
        "Trade": "글로벌 무역",
        "Calendar": "경제 일정",
        "Monetary": "통화정책"
    },
    en: {
        "거시경제": "Macro",
        "기술/산업": "Tech",
        "기술/혁신": "Tech",
        "에너지": "Energy",
        "에너지/ESG": "Energy",
        "금융시장": "Finance",
        "글로벌 무역": "Trade",
        "경제 일정": "Calendar",
        "통화정책": "Monetary"
    }
};

// Generate placeholder news for other dates
function generatePlaceholderNews(date, lang) {
    const categories = lang === 'ko' ? ["거시경제", "기술/혁신", "에너지", "금융시장", "글로벌 무역"] : ["Macro", "Tech", "Energy", "Finance", "Trade"];
    const titles_ko = [
        `[분석] ${date} 글로벌 시장 변동성 확대와 대응 전략`,
        `[기술] AI 인프라 투자 가속화, 핵심 수혜 분야는?`,
        `[에너지] 신재생 에너지 전환 가속화와 공급망 리스크`,
        `[금융] 주요국 금리 결정의 향방과 신흥국 시장 영향`,
        `[무역] 글로벌 공급망 재편 속 새로운 통상 질서의 출현`
    ];
    const titles_en = [
        `[Analysis] ${date} Global Market Volatility and Strategies`,
        `[Tech] AI Infrastructure Investment Acceleration`,
        `[Energy] Renewable Transition and Supply Chain Risks`,
        `[Finance] Interest Rate Directions and Emerging Markets`,
        `[Trade] New Trade Order in Global Supply Chain Shift`
    ];

    const summaries_ko = [
        `${date} 일자 거시경제 분석입니다. 현재 글로벌 시장은 주요국들의 통화 정책 변화와 지정학적 리스크에 민감하게 반응하고 있습니다. 단기적인 변동성 대응이 필요한 시점입니다.`,
        `인공지능(AI) 기술이 산업 전반에 미치는 영향력을 분석합니다. 특히 인프라 투자 확대가 관련 섹터의 성장을 견인하고 있으며, 이는 장기적인 생산성 향상으로 이어질 전망입니다.`,
        `에너지 전환과 관련된 공급망 이슈를 점검합니다. 재생 에너지 비중 확대에 따른 원자재 확보 경쟁이 치열해지고 있으며, 자원 안보가 국가 경쟁력의 핵심으로 떠오르고 있습니다.`,
        `글로벌 금융 시장의 유동성 변화와 금리 추이를 분석합니다. 신흥국 시장으로의 자금 유입 여부와 자산 배분 전략에 대한 심층적인 통찰을 제공합니다.`,
        `국제 통상 질서의 재편과 공급망 다변화 전략을 다룹니다. 새로운 무역 협정 체결과 관세 정책 변화가 기업들의 글로벌 비즈니스에 미치는 영향을 분석합니다.`
    ];

    const summaries_en = [
        `Macroeconomic analysis for ${date}. The global market is reacting to shifts in monetary policies and geopolitical risks. Strategic response to short-term volatility is recommended.`,
        `Analyzing the impact of AI technology across industries. Expansion in infrastructure investment is driving sector growth, promising long-term productivity gains.`,
        `Reviewing supply chain issues in the energy transition. Competition for raw materials is intensifying as renewable energy shares grow, making resource security a top priority.`,
        `Analyzing liquidity changes and interest rate trends in global financial markets. Providing insights into capital flows to emerging markets and asset allocation.`,
        `Examining the realignment of international trade orders and supply chain diversification. Analyzing how new trade agreements and tariff changes impact global business.`
    ];

    const glossaries_ko = [
        { "변동성": "가격이나 수치가 오르내리는 폭", "통화 정책": "중앙은행이 돈의 양을 조절하는 정책" },
        { "인프라": "산업 활동의 기반이 되는 시설", "수혜 분야": "어떤 현상으로 인해 이익을 보는 분야" },
        { "공급망": "제품이 만들어져 소비자에게 전달되는 경로", "자원 안보": "필요한 자원을 안정적으로 확보하는 것" },
        { "유동성": "자산을 현금으로 바꿀 수 있는 정도나 시장의 돈의 양", "자산 배분": "여러 자산에 투자금을 나누는 것" },
        { "통상": "나라들 사이에 물건을 사고파는 일", "다변화": "한곳에 치우치지 않고 여러 갈래로 늘리는 것" }
    ];

    const glossaries_en = [
        { "Volatility": "Liability to change rapidly and unpredictably", "Monetary Policy": "Central bank actions to manage money supply" },
        { "Infrastructure": "Basic physical and organizational structures", "Beneficiary": "A person or thing that derives advantage from something" },
        { "Supply Chain": "Sequence of processes involved in production", "Resource Security": "Ensuring stable access to essential resources" },
        { "Liquidity": "The availability of liquid assets to a market or company", "Asset Allocation": "Investment strategy that aims to balance risk" },
        { "Trade": "Action of buying and selling goods and services", "Diversification": "The process of a business enlarging or varying its range of products" }
    ];

    return Array.from({ length: 5 }, (_, i) => ({
        category: categories[i],
        date: date,
        title: lang === 'ko' ? titles_ko[i] : titles_en[i],
        summary: lang === 'ko' ? summaries_ko[i] : summaries_en[i],
        readTime: "4분 읽기",
        glossary: lang === 'ko' ? glossaries_ko[i] : glossaries_en[i]
    }));
}

function getKSTDate() {
    const now = new Date();
    const kstOffset = 9 * 60;
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const kstDate = new Date(utc + (kstOffset * 60000));
    const hours = kstDate.getHours();
    if (hours < 10) kstDate.setDate(kstDate.getDate() - 1);
    const year = kstDate.getFullYear();
    const month = String(kstDate.getMonth() + 1).padStart(2, '0');
    const day = String(kstDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

const initialDate = getKSTDate();

const state = {
    currentLanguage: 'ko',
    currentDate: initialDate,
    currentCategory: 'all',
    theme: localStorage.getItem('theme') || 'dark',
    cookiesAccepted: localStorage.getItem('cookiesAccepted') === 'true'
};

const themeToggle = document.getElementById('theme-toggle');
const languageSelect = document.getElementById('language-select');
const dateSelect = document.getElementById('date-select');
const newsContainer = document.getElementById('news-container');
const cookieBanner = document.getElementById('cookie-banner');
const acceptCookiesBtn = document.getElementById('accept-cookies');
const viewPrivacyBtn = document.getElementById('view-privacy');
const filterBtns = document.querySelectorAll('.filter-btn');

function applyTheme() {
    document.documentElement.setAttribute('data-theme', state.theme);
    localStorage.setItem('theme', state.theme);
}

async function fetchNewsData() {
    if (newsDatabaseCache) return newsDatabaseCache;
    try {
        const response = await fetch(`news-data.json?v=${new Date().getTime()}`);
        newsDatabaseCache = await response.json();
        return newsDatabaseCache;
    } catch (error) {
        console.error('Error fetching news data:', error);
        return {};
    }
}

async function renderNews() {
    if (!newsContainer) return;
    newsContainer.innerHTML = '<div class="loading-state"><p>Accessing premium intelligence database...</p></div>';
    
    const db = await fetchNewsData();
    await new Promise(r => setTimeout(r, 400));
    
    let dayData = db[state.currentDate];
    let data = dayData ? (dayData[state.currentLanguage] || dayData['en'] || []) : [];
    
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const realKST = new Date(utc + (9 * 3600000));
    const realKSTString = realKST.toISOString().split('T')[0];

    if (state.currentDate <= realKSTString && data.length < 5) {
        const placeholders = generatePlaceholderNews(state.currentDate, state.currentLanguage);
        data = [...data, ...placeholders].slice(0, 5);
    } else if (data.length === 0) {
        data = generatePlaceholderNews(state.currentDate, state.currentLanguage);
    }

    if (state.currentCategory !== 'all') {
        data = data.filter(item => {
            const cat = item.category;
            const target = state.currentCategory;
            if (cat === target) return true;
            if (categoryMap[state.currentLanguage] && categoryMap[state.currentLanguage][target] === cat) return true;
            if (categoryMap['en'] && categoryMap['en'][cat] === target) return true;
            return false;
        });
    }

    if (data.length === 0) {
        newsContainer.innerHTML = '<div class="loading-state"><p>No data available for the selected filters.</p></div>';
        return;
    }

    newsContainer.innerHTML = '';
    data.forEach(news => {
        const card = document.createElement('news-card');
        card.data = news;
        newsContainer.appendChild(card);
    });
}

function setupModal(btnId, modalId, closeId) {
    const btn = document.getElementById(btnId);
    const modal = document.getElementById(modalId);
    const close = document.getElementById(closeId);
    if (btn && modal && close) {
        btn.onclick = () => { modal.classList.add('active'); document.body.style.overflow = 'hidden'; };
        close.onclick = () => { modal.classList.remove('active'); document.body.style.overflow = 'auto'; };
        window.addEventListener('click', (e) => { if (e.target === modal) { modal.classList.remove('active'); document.body.style.overflow = 'auto'; } });
    }
}

if (themeToggle) themeToggle.onclick = () => { state.theme = state.theme === 'dark' ? 'light' : 'dark'; applyTheme(); };
if (languageSelect) languageSelect.onchange = (e) => { state.currentLanguage = e.target.value; renderNews(); };
if (dateSelect) dateSelect.onchange = (e) => { state.currentDate = e.target.value; renderNews(); };

filterBtns.forEach(btn => {
    btn.onclick = () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.currentCategory = btn.dataset.category;
        renderNews();
    };
});

if (!state.cookiesAccepted && cookieBanner) {
    setTimeout(() => cookieBanner.classList.add('active'), 1000);
}
if (acceptCookiesBtn) acceptCookiesBtn.onclick = () => {
    state.cookiesAccepted = true;
    localStorage.setItem('cookiesAccepted', 'true');
    cookieBanner.classList.remove('active');
};
if (viewPrivacyBtn) viewPrivacyBtn.onclick = () => {
    const privacyModal = document.getElementById('privacy-modal');
    if (privacyModal) privacyModal.classList.add('active');
};

setupModal('partnership-btn', 'partnership-modal', 'close-modal');
setupModal('footer-about-btn', 'about-modal', 'close-about');
setupModal('footer-privacy-btn', 'privacy-modal', 'close-privacy');
setupModal('footer-disclaimer-btn', 'disclaimer-modal', 'close-disclaimer');

document.addEventListener('DOMContentLoaded', () => {
    state.currentDate = getKSTDate();
    if (dateSelect) {
        dateSelect.value = state.currentDate;
        const maxDate = new Date();
        maxDate.setDate(maxDate.getDate() + 7);
        dateSelect.max = maxDate.toISOString().split('T')[0];
    }
    applyTheme();
    renderNews();
});
