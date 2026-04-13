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
                    animation: slideIn 0.5s cubic-bezier(0.25, 1, 0.5, 1) forwards;
                }
                @keyframes slideIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .card-header { display: flex; justify-content: space-between; margin-bottom: 1rem; }
                .category {
                    background: var(--accent-color);
                    color: white;
                    padding: 0.3rem 0.7rem;
                    border-radius: 6px;
                    font-size: 0.7rem;
                    font-weight: 800;
                    text-transform: uppercase;
                }
                .date { font-size: 0.8rem; color: var(--text-secondary); }
                h2 { font-size: 1.35rem; margin-bottom: 1rem; line-height: 1.3; color: var(--text-primary); }
                .summary {
                    font-size: 1rem;
                    color: var(--text-secondary);
                    line-height: 1.7;
                    ${this._expanded ? '' : `display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden;`}
                }
                .expand-btn {
                    background: none;
                    border: 1px solid var(--border-color);
                    color: var(--accent-color);
                    padding: 0.4rem 0.8rem;
                    border-radius: 8px;
                    font-size: 0.8rem;
                    font-weight: 700;
                    cursor: pointer;
                    margin-top: 1rem;
                    transition: all 0.2s;
                }
                .expand-btn:hover { background: var(--input-bg); }
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
                <span>Source: Global EcoNews Daily</span>
                <span>${this._news.readTime}</span>
            </div>
        `;
        this.shadowRoot.querySelector('.expand-btn').onclick = () => this.toggleExpand();
    }
}
customElements.define('news-card', NewsCard);

// Full News Database
const newsDatabase = {
    "2026-04-13": {
        ko: [
            {
                category: "거시경제",
                date: "2026-04-13",
                title: "글로벌 금리 동결 기조와 신흥국 경제의 선제적 대응",
                summary: "2026년 4월 13일 현재, 전 세계 주요 중앙은행들이 금리 동결 기조를 유지하면서 신흥국 경제에 엇갈린 신호가 나타나고 있습니다. 인플레이션 둔화 속도가 당초 예상보다 더디게 나타남에 따라, 금리 인하 시점은 2026년 말이나 되어야 가능할 것이라는 분석이 지배적입니다. 이러한 상황에서 베트남, 인도네시아 등 신흥국들은 자본 유출 방지를 위해 선제적인 긴축 재정 정책을 펼치며 통화 가치 방어에 총력을 기울이고 있습니다. 특히 브라질과 아르헨티나의 인플레이션 수치가 예상보다 높게 나타나며 통화 가치 하락에 대한 우려가 커지고 있습니다. 국제통화기금(IMF)은 이번 동결 기조가 예상보다 길어질 수 있다며 각국 정부에 재정 건전성 확보를 강력히 권고하고 있습니다.",
                readTime: "4분 읽기"
            },
            {
                category: "기술/혁신",
                date: "2026-04-13",
                title: "양자 컴퓨팅 상용화 가속, 금융권 보안 패러다임 전환",
                summary: "양자 컴퓨팅 기술이 예상보다 빠르게 상용화 단계에 진입하면서 글로벌 금융권이 보안 강화에 비상이 걸렸습니다. 주요 투자은행들은 기존 암호화 체계가 무력화될 가능성에 대비해 '양자 내성 암호' 도입을 서두르고 있습니다. 한편, 골드만삭스와 JP모건은 양자 알고리즘을 활용한 초단타 매매 시스템 테스트에서 기존 대비 200% 이상의 효율 향상을 확인했다고 발표했습니다. 이러한 기술 격차는 금융 시장의 정보 비대칭성을 더욱 심화시킬 것이라는 비판도 제기되고 있습니다. 실리콘밸리의 양자 스타트업들에 대한 벤처 캐피탈 자금이 올 1분기에만 50억 달러를 넘어선 것으로 집계되었습니다.",
                readTime: "5분 읽기"
            },
            {
                category: "에너지",
                date: "2026-04-13",
                title: "유럽 최대 해상풍력 단지 완공, 에너지 자립도 획기적 개선",
                summary: "유럽 최대 규모의 북해 해상풍력 단지가 오늘 공식 가동을 시작하며 유럽의 에너지 자립도가 획기적으로 개선될 전망입니다. 이번 프로젝트를 통해 독일과 네덜란드의 약 500만 가구가 탄소 배출 없는 깨끗한 전력을 공급받게 됩니다. 이는 러시아-우크라이나 분쟁 이후 추진된 에너지 안보 전략의 핵심 성과로 평가받습니다. 전문가들은 이번 성공이 수소 에너지 생산 단가 하락으로 이어져 철강, 화학 등 탄소 배출이 많은 산업의 탈탄소화를 가속화할 것으로 기대하고 있습니다. 다만, 변동성이 큰 풍력 에너지의 저장 시스템(ESS) 구축이 다음 과제로 남아 있습니다.",
                readTime: "4분 읽기"
            },
            {
                category: "글로벌 무역",
                date: "2026-04-13",
                title: "인도-중동-유럽 경제통로(IMEC) 실질 가동 준비 완료",
                summary: "G20 정상회의에서 합의된 인도-중동-유럽 경제통로(IMEC)가 주요 항만 및 철도 연결 작업을 마무리하고 실질적인 가동 준비에 들어갔습니다. 이 경로는 수에즈 운하를 거치는 기존 해상 경로보다 운송 시간을 40% 이상 단축할 수 있어 글로벌 물류 혁명을 예고하고 있습니다. 특히 사우디아라비아와 아랍에미리트(UAE)는 이 통로를 통해 비석유 부문 수출을 확대하겠다는 전략입니다. 그러나 홍해 주변의 지정학적 리스크가 완전히 해소되지 않아 초기 보험료 부담이 높게 형성되어 있다는 점이 해결해야 할 숙제입니다.",
                readTime: "5분 읽기"
            },
            {
                category: "부동산/도시",
                date: "2026-04-13",
                title: "도쿄 오피스 시장의 변화, 주거용 전환 리모델링 붐",
                summary: "재택근무의 정착과 도심 공동화 현상에 대응하여 도쿄 도심의 유휴 오피스 빌딩들이 고급 주거 시설로 전환되는 사례가 급증하고 있습니다. 도쿄도는 용도 변경에 대한 규제를 완화하고 세제 혜택을 제공하며 '직주근접' 환경 조성을 독려하고 있습니다. 이러한 트렌드는 최근 임대료 상승으로 어려움을 겪던 젊은 전문직 종사자들에게 환영받고 있으며, 도심 공동화를 막는 대안으로 주목받고 있습니다. 일본 부동산 개발업체들은 공유 오피스와 커뮤니티 시설이 결합된 하이브리드 형태의 건물을 선보이고 있습니다.",
                readTime: "4분 읽기"
            }
        ],
        en: [
            {
                category: "Macro",
                date: "2026-04-13",
                title: "Global Interest Rates Hold Steady Amid Emerging Market Divergence",
                summary: "As of April 13, 2026, major central banks maintain their interest rate freeze, leading to mixed outcomes for emerging economies. Export-oriented Southeast Asian nations thrive thanks to steady growth in developed markets, while South American countries with heavy external debt remain under significant pressure. The IMF recommends fiscal discipline, warning that the current high-rate environment may persist longer than anticipated.",
                readTime: "4 min read"
            },
            {
                category: "Technology",
                date: "2026-04-13",
                title: "Quantum Computing Commercialization Accelerates",
                summary: "Quantum technology enters the commercial phase faster than expected, prompting global financial institutions to heighten security. Major investment banks are rushing to implement 'Quantum-Resistant Cryptography' to protect against potential decryption threats. Meanwhile, high-frequency trading systems using quantum algorithms have shown efficiency gains of over 200%.",
                readTime: "5 min read"
            },
            {
                category: "Energy",
                date: "2026-04-13",
                title: "Europe's Largest Offshore Wind Farm Begins Operation",
                summary: "A massive offshore wind farm in the North Sea officially launched today, significantly improving Europe's energy sovereignty. This project will provide clean, carbon-free power to approximately 5 million households in Germany and the Netherlands. Experts expect this success to accelerate the decarbonization of energy-intensive industries.",
                readTime: "4 min read"
            },
            {
                category: "Trade",
                date: "2026-04-13",
                title: "IMEC Logistics Corridor Ready for Real-World Operation",
                summary: "The India-Middle East-Europe Economic Corridor (IMEC) has completed its core infrastructure, promising a 40% reduction in transit time compared to traditional routes. This corridor marks a new era in global logistics, though geopolitical risks in the Red Sea remain a challenge for initial insurance and stability.",
                readTime: "5 min read"
            },
            {
                category: "Real Estate",
                date: "2026-04-13",
                title: "Tokyo Office Market Adapts with Residential Conversions",
                summary: "Tokyo is seeing a surge in office-to-residential conversions as remote work becomes permanent. The metropolitan government is easing regulations to encourage 'live-work' environments, attracting young professionals back to the city center. Developers are now focusing on hybrid buildings that combine living spaces with co-working facilities.",
                readTime: "4 min read"
            }
        ]
    }
};

// Application State
const state = {
    currentLanguage: 'ko',
    currentDate: '2026-04-13',
    theme: localStorage.getItem('theme') || 'dark'
};

// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const languageSelect = document.getElementById('language-select');
const dateSelect = document.getElementById('date-select');
const newsContainer = document.getElementById('news-container');
const partnershipBtn = document.getElementById('partnership-btn');
const partnershipModal = document.getElementById('partnership-modal');
const closeModal = document.getElementById('close-modal');

// Core Functions
function applyTheme() {
    document.documentElement.setAttribute('data-theme', state.theme);
    localStorage.setItem('theme', state.theme);
}

async function renderNews() {
    newsContainer.innerHTML = '<div class="loading-state"><p>Updating economic insights...</p></div>';
    
    // Smooth transition
    await new Promise(r => setTimeout(r, 400));
    
    const dayData = newsDatabase[state.currentDate] || {};
    const data = dayData[state.currentLanguage] || dayData['en'] || [];

    if (data.length === 0) {
        newsContainer.innerHTML = '<div class="loading-state"><p>No news insights found for this date.</p></div>';
        return;
    }

    newsContainer.innerHTML = '';
    data.forEach((news, index) => {
        const card = document.createElement('news-card');
        card.data = news;
        newsContainer.appendChild(card);
    });
}

// Modal Logic
function toggleModal(show) {
    if (show) {
        partnershipModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    } else {
        partnershipModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Event Listeners
themeToggle.onclick = () => {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    applyTheme();
};

languageSelect.onchange = (e) => {
    state.currentLanguage = e.target.value;
    renderNews();
};

dateSelect.onchange = (e) => {
    state.currentDate = e.target.value;
    renderNews();
};

partnershipBtn.onclick = () => toggleModal(true);
closeModal.onclick = () => toggleModal(false);
window.onclick = (e) => { if (e.target === partnershipModal) toggleModal(false); };

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    applyTheme();
    renderNews(); // Render news immediately on entry
});
