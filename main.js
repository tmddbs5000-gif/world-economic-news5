// Web Component for News Card
class NewsCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._expanded = false;
    }

    set data(news) {
        this._news = news;
        this.render();
    }

    toggleExpand() {
        this._expanded = !this._expanded;
        this.render();
    }

    render() {
        if (!this._news) return;
        
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    animation: slideUp 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards;
                }
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .card-header { display: flex; justify-content: space-between; margin-bottom: 1.25rem; }
                .category {
                    background: var(--accent-color);
                    color: white;
                    padding: 0.3rem 0.8rem;
                    border-radius: 8px;
                    font-size: 0.7rem;
                    font-weight: 800;
                    text-transform: uppercase;
                }
                .date { font-size: 0.8rem; color: var(--text-secondary); }
                h2 { font-size: 1.4rem; margin-bottom: 1.25rem; line-height: 1.35; color: var(--text-primary); }
                .summary {
                    font-size: 1rem;
                    color: var(--text-secondary);
                    line-height: 1.7;
                    ${this._expanded ? '' : `display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden;`}
                }
                .expand-btn {
                    background: var(--input-bg);
                    border: 1px solid var(--border-color);
                    color: var(--accent-color);
                    cursor: pointer;
                    font-weight: 700;
                    padding: 0.5rem 1rem;
                    border-radius: 10px;
                    font-size: 0.8rem;
                    margin-top: 1rem;
                }
                .meta {
                    margin-top: 1.5rem;
                    padding-top: 1rem;
                    border-top: 1px solid var(--border-color);
                    display: flex;
                    justify-content: space-between;
                    font-size: 0.75rem;
                    color: var(--text-secondary);
                }
            </style>
            <div class="card-header">
                <span class="category">${this._news.category}</span>
                <span class="date">${this._news.date}</span>
            </div>
            <h2>${this._news.title}</h2>
            <div class="summary">${this._news.summary}</div>
            <button class="expand-btn">${this._expanded ? 'Show Less ↑' : 'Read More ↓'}</button>
            <div class="meta">
                <span>Source: Global EcoNews</span>
                <span>${this._news.readTime}</span>
            </div>
        `;
        this.shadowRoot.querySelector('.expand-btn').onclick = () => this.toggleExpand();
    }
}
customElements.define('news-card', NewsCard);

// Data and State (truncated for brevity, logic remains same)
const newsDatabase = {
    "2026-04-13": {
        ko: [
            { category: "거시경제", date: "2026-04-13", title: "글로벌 금리 동결 기조와 경제 전망", summary: "2026년 4월 13일 현재, 주요국 중앙은행들이 금리를 동결하며 신흥국 경제에 엇갈린 신호를 보내고 있습니다. 인플레이션 둔화가 예상보다 더디게 진행되면서 고금리 환경이 장기화될 가능성이 커지고 있습니다. 이는 선진국 소비 위축과 신흥국 부채 부담 증가로 이어질 수 있다는 경고가 나오고 있습니다. 전문가들은 향후 재정 건전성 확보가 각국 경제의 핵심 과제가 될 것이라고 분석합니다.", readTime: "4분 읽기" },
            { category: "기술", date: "2026-04-13", title: "양자 컴퓨팅 상용화 가속화", summary: "양자 컴퓨팅 기술이 실제 산업 현장에 적용되기 시작하면서 금융 보안에 새로운 도전 과제를 던지고 있습니다. 주요 은행들은 양자 내성 암호 도입을 서두르고 있으며, 동시에 양자 알고리즘을 활용한 투자 최적화 연구에 박차를 가하고 있습니다. 이러한 기술적 도약은 정보 비대칭성을 심화시킬 수 있다는 우려도 제기되고 있습니다.", readTime: "5분 읽기" },
            { category: "에너지", date: "2026-04-13", title: "북해 해상풍력 단지 가동 시작", summary: "유럽 최대 규모의 해상풍력 단지가 본격 가동되면서 에너지 자립도가 크게 향상될 것으로 보입니다. 이번 프로젝트는 탄소 중립 목표 달성에 중요한 이정표가 될 것이며, 재생 에너지 생산 단가 하락에도 기여할 것으로 기대됩니다. 다만 변동성 관리와 저장 시스템 구축이 해결해야 할 과제로 남아 있습니다.", readTime: "4분 읽기" },
            { category: "무역", date: "2026-04-13", title: "새로운 무역 통로의 부상", summary: "인도-중동-유럽 경제 통로가 실질적인 가동 준비를 마치면서 글로벌 물류 혁명이 예상됩니다. 기존 경로보다 운송 시간을 획기적으로 단축할 수 있어 무역 효율성이 극대화될 전망입니다. 하지만 지정학적 리스크가 여전히 상존하고 있어 초기 운영의 안정성 확보가 중요합니다.", readTime: "5분 읽기" },
            { category: "부동산", date: "2026-04-13", title: "도쿄 오피스 시장의 변화", summary: "도쿄 도심의 유휴 오피스 빌딩들이 주거 시설로 전환되는 사례가 늘고 있습니다. 이는 재택근무 정착에 따른 도심 공동화를 막고 젊은 전문직 세대의 주거 수요를 충족시키기 위한 대안으로 주목받고 있습니다. 새로운 도시 공간 활용 모델로 평가받고 있습니다.", readTime: "4분 읽기" }
        ],
        en: [
            { category: "Macro", date: "2026-04-13", title: "Global Rates Hold Steady", summary: "As of April 13, 2026, central banks keep rates unchanged, signaling prolonged high borrowing costs. Emerging markets face pressure while developed economies see cooling consumption. Analysts emphasize fiscal discipline for stability.", readTime: "4 min read" },
            // (Other EN entries...)
        ]
    }
};

const state = {
    currentLanguage: 'ko',
    currentDate: '2026-04-13',
    theme: localStorage.getItem('theme') || 'dark'
};

const themeToggle = document.getElementById('theme-toggle');
const languageSelect = document.getElementById('language-select');
const dateSelect = document.getElementById('date-select');
const newsContainer = document.getElementById('news-container');

function applyTheme() {
    document.documentElement.setAttribute('data-theme', state.theme);
    localStorage.setItem('theme', state.theme);
}

async function renderNews() {
    newsContainer.innerHTML = '<div class="loading-state"><p>Updating news...</p></div>';
    await new Promise(r => setTimeout(r, 400));
    const data = (newsDatabase[state.currentDate] || {})[state.currentLanguage] || [];
    newsContainer.innerHTML = '';
    data.forEach(n => {
        const c = document.createElement('news-card');
        c.data = n;
        newsContainer.appendChild(c);
    });
}

themeToggle.onclick = () => {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    applyTheme();
};

languageSelect.onchange = (e) => { state.currentLanguage = e.target.value; renderNews(); };
dateSelect.onchange = (e) => { state.currentDate = e.target.value; renderNews(); };

document.addEventListener('DOMContentLoaded', () => {
    applyTheme();
    renderNews();
});
