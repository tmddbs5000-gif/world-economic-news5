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
                .card-header {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 1.25rem;
                }
                .category {
                    background: oklch(0.75 0.18 145 / 0.15);
                    color: oklch(0.75 0.18 145);
                    padding: 0.3rem 0.8rem;
                    border-radius: 6px;
                    font-size: 0.75rem;
                    font-weight: 700;
                    text-transform: uppercase;
                }
                .date {
                    font-size: 0.8rem;
                    color: oklch(0.6 0.02 240);
                }
                h2 {
                    font-size: 1.4rem;
                    margin-bottom: 1.25rem;
                    line-height: 1.3;
                    color: oklch(0.95 0.01 240);
                    letter-spacing: -0.01em;
                }
                .summary {
                    font-size: 1rem;
                    color: oklch(0.8 0.02 240);
                    line-height: 1.7;
                    transition: all 0.3s ease;
                    ${this._expanded ? '' : `
                        display: -webkit-box;
                        -webkit-line-clamp: 4;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                    `}
                }
                .expand-btn {
                    background: none;
                    border: none;
                    color: oklch(0.75 0.18 145);
                    cursor: pointer;
                    font-weight: 600;
                    padding: 0.5rem 0;
                    font-size: 0.9rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    margin-top: 1rem;
                }
                .expand-btn:hover {
                    text-decoration: underline;
                }
                .meta {
                    margin-top: 2rem;
                    padding-top: 1.25rem;
                    border-top: 1px solid oklch(1 0 0 / 0.05);
                    display: flex;
                    justify-content: space-between;
                    font-size: 0.8rem;
                    color: oklch(0.5 0.02 240);
                }
            </style>
            <div class="card-header">
                <span class="category">${this._news.category}</span>
                <span class="date">${this._news.date}</span>
            </div>
            <h2>${this._news.title}</h2>
            <div class="summary">${this._news.summary}</div>
            <button class="expand-btn">
                ${this._expanded ? 'Show Less ↑' : 'Read More ↓'}
            </button>
            <div class="meta">
                <span>Source: Global Finance Daily</span>
                <span>${this._news.readTime}</span>
            </div>
        `;

        this.shadowRoot.querySelector('.expand-btn').onclick = () => this.toggleExpand();
    }
}

customElements.define('news-card', NewsCard);

// Multi-Date, Multi-Language News Data
const newsDatabase = {
    "2026-04-13": {
        ko: [
            {
                category: "거시경제",
                date: "2026-04-13",
                title: "글로벌 금리 동결 기조와 신흥국 경제의 희비",
                summary: "2026년 4월 현재, 전 세계 주요 중앙은행들이 금리 동결 기조를 유지하면서 신흥국 경제에 엇갈린 신호가 나타나고 있습니다. 선진국 경제의 견조한 성장세 덕분에 수출 중심의 동남아시아 국가들은 활기를 띠고 있으나, 외채 부담이 큰 남미 국가들은 여전히 고금리 압박에 시달리고 있습니다. 특히 브라질과 아르헨티나의 인플레이션 수치가 예상보다 높게 나타나며 통화 가치 하락에 대한 우려가 커지고 있습니다. 국제통화기금(IMF)은 이번 동결 기조가 예상보다 길어질 수 있다며, 각국 정부에 재정 건전성 확보를 강력히 권고하고 있습니다. 또한 공급망 재편으로 인한 물류 비용 상승이 새로운 변수로 떠오르고 있습니다.",
                readTime: "4분 읽기"
            },
            {
                category: "기술/산업",
                date: "2026-04-13",
                title: "양자 컴퓨팅 상용화 가속, 금융권 보안 비상",
                summary: "양자 컴퓨팅 기술이 예상보다 빠르게 상용화 단계에 진입하면서 글로벌 금융권이 보안 강화에 비상이 걸렸습니다. 주요 투자은행들은 기존 암호화 체계가 무력화될 가능성에 대비해 '양자 내성 암호' 도입을 서두르고 있습니다. 한편, 골드만삭스와 JP모건은 양자 알고리즘을 활용한 초단타 매매 시스템 테스트에서 기존 대비 200% 이상의 효율 향상을 확인했다고 발표했습니다. 이러한 기술 격차는 금융 시장의 정보 비대칭성을 더욱 심화시킬 것이라는 비판도 제기되고 있습니다. 실리콘밸리의 양자 스타트업들에 대한 벤처 캐피탈 자금이 올 1분기에만 50억 달러를 넘어선 것으로 집계되었습니다.",
                readTime: "5분 읽기"
            },
            {
                category: "에너지",
                date: "2026-04-13",
                title: "북해 해상풍력 단지 완공, 유럽 에너지 자립도 상승",
                summary: "유럽 최대 규모의 북해 해상풍력 단지가 오늘 공식 가동을 시작하며 유럽의 에너지 자립도가 획기적으로 개선될 전망입니다. 이번 프로젝트를 통해 독일과 네덜란드의 약 500만 가구가 탄소 배출 없는 깨끗한 전력을 공급받게 됩니다. 이는 러시아-우크라이나 분쟁 이후 추진된 에너지 안보 전략의 핵심 성과로 평가받습니다. 전문가들은 이번 성공이 수소 에너지 생산 단가 하락으로 이어져 철강, 화학 등 탄소 배출이 많은 산업의 탈탄소화를 가속화할 것으로 기대하고 있습니다. 다만, 변동성이 큰 풍력 에너지의 저장 시스템(ESS) 구축이 다음 과제로 남아 있습니다.",
                readTime: "4분 읽기"
            },
            {
                category: "무역",
                date: "2026-04-13",
                title: "인도-중동-유럽 경제통로(IMEC) 실질 가동 임박",
                summary: "G20 정상회의에서 합의된 인도-중동-유럽 경제통로(IMEC)가 주요 항만 및 철도 연결 작업을 마무리하고 실질적인 가동 준비에 들어갔습니다. 이 경로는 수에즈 운하를 거치는 기존 해상 경로보다 운송 시간을 40% 이상 단축할 수 있어 글로벌 물류 혁명을 예고하고 있습니다. 특히 사우디아라비아와 아랍에미리트(UAE)는 이 통로를 통해 비석유 부문 수출을 확대하겠다는 전략입니다. 그러나 홍해 주변의 지정학적 리스크가 완전히 해소되지 않아 초기 보험료 부담이 높게 형성되어 있다는 점이 해결해야 할 숙제입니다. 중국의 일대일로와 경쟁 구도가 형성되며 외교적 긴장감도 고조되고 있습니다.",
                readTime: "5분 읽기"
            },
            {
                category: "부동산",
                date: "2026-04-13",
                title: "도쿄 오피스 시장의 역발상, 주거용 전환 붐",
                summary: "재택근무의 정착과 도심 공동화 현상에 대응하여 도쿄 도심의 유휴 오피스 빌딩들이 고급 주거 시설로 전환되는 사례가 급증하고 있습니다. 도쿄도는 용도 변경에 대한 규제를 완화하고 세제 혜택을 제공하며 '직주근접' 환경 조성을 독려하고 있습니다. 이러한 트렌드는 최근 임대료 상승으로 어려움을 겪던 젊은 전문직 종사자들에게 환영받고 있으며, 도심 공동화를 막는 대안으로 주목받고 있습니다. 일본 부동산 개발업체들은 단순한 주거 공간을 넘어 공유 오피스와 커뮤니티 시설이 결합된 하이브리드 형태의 건물을 잇달아 선보이고 있습니다. 이는 뉴욕과 런던 등 다른 글로벌 대도시에도 영향을 미칠 것으로 보입니다.",
                readTime: "4분 읽기"
            }
        ],
        en: [
            {
                category: "Macro",
                date: "2026-04-13",
                title: "Global Interest Rates Hold Steady Amid Emerging Market Divergence",
                summary: "As of April 13, 2026, major central banks continue to maintain their interest rate freeze, leading to mixed outcomes for emerging economies. Export-oriented Southeast Asian nations are thriving thanks to steady growth in developed markets, while South American countries with heavy external debt remain under significant pressure. Inflation figures in Brazil and Argentina have exceeded expectations, fueling concerns over currency devaluation. The IMF recommends fiscal discipline, warning that the current high-rate environment may persist longer than anticipated. Rising logistics costs due to supply chain reconfiguration have emerged as a new variable.",
                readTime: "4 min read"
            },
            // ... (Other 4 articles for EN)
        ]
    },
    "2026-04-12": {
        ko: [
            {
                category: "거시경제",
                date: "2026-04-12",
                title: "어제의 주요 뉴스: 글로벌 고용 시장의 변화",
                summary: "2026년 4월 12일 뉴스입니다. 인공지능 기술의 급격한 발전이 화이트칼라 직종의 고용 구조를 근본적으로 바꾸고 있다는 보고서가 발표되었습니다. 특히 회계, 법률 자문, 데이터 분석 분야에서의 인력 수요가 감소하는 반면, 이를 관리하고 조율하는 시니어 매니지먼트의 역할은 더욱 중요해지고 있습니다. 노동 전문가들은 교육 시스템의 전면적인 개편이 시급하다고 강조합니다.",
                readTime: "3분 읽기"
            }
            // ... (Other articles for 04-12)
        ]
    }
};

// Application State
const state = {
    currentLanguage: 'ko',
    currentDate: '2026-04-13',
    isLoading: false
};

// DOM Elements
const languageSelect = document.getElementById('language-select');
const dateSelect = document.getElementById('date-select');
const newsContainer = document.getElementById('news-container');

// Core Functions
async function renderNews() {
    state.isLoading = true;
    newsContainer.innerHTML = `
        <div class="loading-state">
            <p>Fetching insights for ${state.currentDate.replace(/-/g, '.')}...</p>
        </div>
    `;
    
    // Smooth transition simulation
    await new Promise(resolve => setTimeout(resolve, 500));

    const dayData = newsDatabase[state.currentDate] || {};
    const data = dayData[state.currentLanguage] || dayData['en'] || [];

    if (data.length === 0) {
        newsContainer.innerHTML = '<div class="loading-state"><p>No news available for this date.</p></div>';
        return;
    }

    newsContainer.innerHTML = '';
    data.forEach((news, index) => {
        const card = document.createElement('news-card');
        card.data = news;
        card.style.animationDelay = `${index * 0.1}s`;
        newsContainer.appendChild(card);
    });
    
    state.isLoading = false;
}

// Event Listeners
languageSelect.addEventListener('change', (e) => {
    state.currentLanguage = e.target.value;
    renderNews();
});

dateSelect.addEventListener('change', (e) => {
    state.currentDate = e.target.value;
    renderNews();
});

// Initial Render
document.addEventListener('DOMContentLoaded', () => {
    renderNews();
});
