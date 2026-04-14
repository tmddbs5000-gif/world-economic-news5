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
    "2026-04-14": {
        ko: [
            {
                category: "통화정책",
                date: "2026-04-14",
                title: "중앙은행, 디지털 화폐(CBDC) 실거래 테스트 단계 진입",
                summary: "정부가 중앙은행 디지털 화폐(CBDC)의 실생활 결제 테스트를 시작한다고 발표했습니다. 이번 테스트에는 주요 시중 은행과 유통업체들이 참여하며, 기존 화폐 시스템과의 호환성 및 보안성을 집중 점검합니다. 전문가들은 이번 조치가 현금 없는 사회로의 전환을 가속화하고 통화 정책의 효율성을 높일 것으로 기대하고 있습니다.",
                readTime: "3분 읽기"
            },
            {
                category: "반도체",
                date: "2026-04-14",
                title: "차세대 초미세 공정 기술 돌파구, 글로벌 반도체 지형 변화 예고",
                summary: "국내 반도체 기업이 세계 최초로 1nm 이하 공정의 핵심 기술을 확보하는 데 성공했습니다. 이는 무어의 법칙 한계를 극복한 사례로 평가받으며, 향후 AI 반도체 시장에서의 주도권을 더욱 공고히 할 전망입니다. 글로벌 경쟁사들도 이에 맞서 대규모 투자를 예고하고 있어 기술 경쟁이 한층 치열해질 것으로 보입니다.",
                readTime: "5분 읽기"
            },
            {
                category: "지속가능성",
                date: "2026-04-14",
                title: "ESG 공시 의무화 확대, 기업들의 투명성 강화 노력",
                summary: "내년부터 상장사들의 ESG(환경·사회·지배구조) 공시 의무가 대폭 확대됩니다. 이에 따라 기업들은 탄소 배출량뿐만 아니라 공급망 내 인권 문제까지 상세히 보고해야 합니다. 투자자들은 이러한 비재무적 정보가 향후 기업 가치 평가의 핵심 요소가 될 것으로 보고 있습니다.",
                readTime: "4분 읽기"
            },
            {
                category: "벤처/스타트업",
                date: "2026-04-14",
                title: "K-스타트업, 실리콘밸리 투자 유치 성공 사례 급증",
                summary: "최근 국내 기술 기반 스타트업들이 실리콘밸리의 대형 벤처캐피탈로부터 잇따라 대규모 투자를 유치하고 있습니다. 특히 AI 의료 진단 및 자율주행 소프트웨어 분야에서의 성과가 두드러집니다. 이는 한국 스타트업의 기술력이 세계적인 수준에 도달했음을 보여주는 지표로 해석됩니다.",
                readTime: "4분 읽기"
            },
            {
                category: "원자재",
                date: "2026-04-14",
                title: "희토류 공급망 다변화, 자원 안보 강화 움직임",
                summary: "특정 국가에 의존하던 희토류 공급망을 다변화하려는 움직임이 전 세계적으로 확산되고 있습니다. 아프리카와 호주 등지의 신규 광산 개발 프로젝트에 글로벌 자금이 유입되고 있으며, 폐배터리 리사이클링을 통한 자원 확보 기술도 주목받고 있습니다.",
                readTime: "5분 읽기"
            }
        ],
        en: [
            {
                category: "Monetary",
                date: "2026-04-14",
                title: "Central Bank Enters Real-World CBDC Testing Phase",
                summary: "The government has announced the commencement of real-world payment tests for Central Bank Digital Currency (CBDC). This phase involves major commercial banks and retailers to verify compatibility and security. Experts anticipate this will accelerate the transition to a cashless society and enhance monetary policy efficiency.",
                readTime: "3 min read"
            },
            {
                category: "Semiconductors",
                date: "2026-04-14",
                title: "Breakthrough in Next-Gen Sub-1nm Process Technology",
                summary: "A domestic semiconductor giant has successfully secured key technology for sub-1nm processes. This is seen as overcoming the limits of Moore's Law and is expected to solidify dominance in the AI semiconductor market. Global competitors are responding with massive investment plans.",
                readTime: "5 min read"
            },
            {
                category: "Sustainability",
                date: "2026-04-14",
                title: "Mandatory ESG Disclosure Expands to More Listed Companies",
                summary: "Starting next year, ESG disclosure requirements for listed companies will significantly expand. Firms must now report not only carbon emissions but also human rights issues within their supply chains. Investors view this non-financial information as a critical factor in future valuations.",
                readTime: "4 min read"
            },
            {
                category: "Startups",
                date: "2026-04-14",
                title: "Rise in K-Startups Securing Silicon Valley Investments",
                summary: "Tech-based Korean startups are increasingly attracting large-scale investments from major Silicon Valley VCs. Successes are particularly notable in AI medical diagnostics and autonomous driving software, indicating that Korean tech prowess has reached global standards.",
                readTime: "4 min read"
            },
            {
                category: "Commodities",
                date: "2026-04-14",
                title: "Global Efforts to Diversify Rare Earth Supply Chains",
                summary: "A global movement to diversify rare earth supply chains is gaining momentum. New mining projects in Africa and Australia are attracting global capital, while resource recovery technologies through battery recycling are also gaining attention.",
                readTime: "5 min read"
            }
        ]
    },
    "2026-04-13": {
        ko: [
            {
                category: "거시경제",
                date: "2026-04-13",
                title: "글로벌 금리 동결 기조와 신흥국 경제의 선제적 대응",
                summary: "2026년 4월 13일 현재, 전 세계 주요 중앙은행들이 금리 동결 기조를 유지하면서 신흥국 경제에 엇갈린 신호가 나타나고 있습니다. 인플레이션 둔화 속도가 당초 예상보다 더디게 나타남에 따라, 금리 인하 시점은 2026년 말이나 되어야 가능할 것이라는 분석이 지배적입니다. 이러한 상황에서 베트남, 인도네시아 등 신흥국들은 자본 유출 방지를 위해 선제적인 긴축 재정 정책을 펼치며 통화 가치 방어에 총력을 기울이고 있습니다.",
                readTime: "4분 읽기"
            },
            {
                category: "기술/혁신",
                date: "2026-04-13",
                title: "양자 컴퓨팅 상용화 가속, 금융권 보안 패러다임 전환",
                summary: "양자 컴퓨팅 기술이 예상보다 빠르게 상용화 단계에 진입하면서 글로벌 금융권이 보안 강화에 비상이 걸렸습니다. 주요 투자은행들은 기존 암호화 체계가 무력화될 가능성에 대비해 '양자 내성 암호' 도입을 서두르고 있습니다. 한편, 골드만삭스와 JP모건은 양자 알고리즘을 활용한 초단타 매매 시스템 테스트에서 기존 대비 200% 이상의 효율 향상을 확인했다고 발표했습니다.",
                readTime: "5분 읽기"
            },
            {
                category: "에너지",
                date: "2026-04-13",
                title: "유럽 최대 해상풍력 단지 완공, 에너지 자립도 획기적 개선",
                summary: "유럽 최대 규모의 북해 해상풍력 단지가 오늘 공식 가동을 시작하며 유럽의 에너지 자립도가 획기적으로 개선될 전망입니다. 이번 프로젝트를 통해 독일과 네덜란드의 약 500만 가구가 탄소 배출 없는 깨끗한 전력을 공급받게 됩니다. 이는 러시아-우크라이나 분쟁 이후 추진된 에너지 안보 전략의 핵심 성과로 평가받습니다.",
                readTime: "4분 읽기"
            },
            {
                category: "글로벌 무역",
                date: "2026-04-13",
                title: "인도-중동-유럽 경제통로(IMEC) 실질 가동 준비 완료",
                summary: "G20 정상회의에서 합의된 인도-중동-유럽 경제통로(IMEC)가 주요 항만 및 철도 연결 작업을 마무리하고 실질적인 가동 준비에 들어갔습니다. 이 경로는 수에즈 운하를 거치는 기존 해상 경로보다 운송 시간을 40% 이상 단축할 수 있어 글로벌 물류 혁명을 예고하고 있습니다.",
                readTime: "5분 읽기"
            },
            {
                category: "부동산/도시",
                date: "2026-04-13",
                title: "도쿄 오피스 시장의 변화, 주거용 전환 리모델링 붐",
                summary: "재택근무의 정착과 도심 공동화 현상에 대응하여 도쿄 도심의 유휴 오피스 빌딩들이 고급 주거 시설로 전환되는 사례가 급증하고 있습니다. 도쿄도는 용도 변경에 대한 규제를 완화하고 세제 혜택을 제공하며 '직주근접' 환경 조성을 독려하고 있습니다.",
                readTime: "4분 읽기"
            }
        ],
        en: [
            {
                category: "Macro",
                date: "2026-04-13",
                title: "Global Interest Rates Hold Steady Amid Emerging Market Divergence",
                summary: "As of April 13, 2026, major central banks maintain their interest rate freeze, leading to mixed outcomes for emerging economies. Export-oriented Southeast Asian nations thrive thanks to steady growth in developed markets, while South American countries with heavy external debt remain under significant pressure.",
                readTime: "4 min read"
            },
            {
                category: "Technology",
                date: "2026-04-13",
                title: "Quantum Computing Commercialization Accelerates",
                summary: "Quantum technology enters the commercial phase faster than expected, prompting global financial institutions to heighten security. Major investment banks are rushing to implement 'Quantum-Resistant Cryptography' to protect against potential decryption threats.",
                readTime: "5 min read"
            },
            {
                category: "Energy",
                date: "2026-04-13",
                title: "Europe's Largest Offshore Wind Farm Begins Operation",
                summary: "A massive offshore wind farm in the North Sea officially launched today, significantly improving Europe's energy sovereignty. This project will provide clean, carbon-free power to approximately 5 million households in Germany and the Netherlands.",
                readTime: "4 min read"
            },
            {
                category: "Trade",
                date: "2026-04-13",
                title: "IMEC Logistics Corridor Ready for Real-World Operation",
                summary: "The India-Middle East-Europe Economic Corridor (IMEC) has completed its core infrastructure, promising a 40% reduction in transit time compared to traditional routes.",
                // ... rest of 2026-04-13 data
                readTime: "5 min read"
            },
            {
                category: "Real Estate",
                date: "2026-04-13",
                title: "Tokyo Office Market Adapts with Residential Conversions",
                summary: "Tokyo is seeing a surge in office-to-residential conversions as remote work becomes permanent. The metropolitan government is easing regulations to encourage 'live-work' environments, attracting young professionals back to the city center.",
                readTime: "4 min read"
            }
        ]
    },
    "2026-04-12": {
        ko: [
            {
                category: "금융시장",
                date: "2026-04-12",
                title: "글로벌 증시, 예상 밖 고용 지표 호조에 강세",
                summary: "예상치를 상회하는 고용 지표 발표에 힘입어 글로벌 주요 증시가 일제히 강세를 보였습니다. 특히 기술주 중심의 나스닥 지수는 역대 최고치를 경신했습니다. 고용 시장의 회복세가 견고하다는 판단이 투자 심리를 자극한 것으로 풀이됩니다.",
                readTime: "4분 읽기"
            },
            {
                category: "전기차/배터리",
                date: "2026-04-12",
                title: "고체 배터리 상용화 앞당겨질까, 업계 기대감 고조",
                summary: "꿈의 배터리로 불리는 전고체 배터리 기술의 대량 생산 가능성이 확인되면서 전기차 시장에 대변혁이 예고되고 있습니다. 기존 리튬 이온 배터리 대비 화재 위험은 낮고 주행 거리는 비약적으로 늘릴 수 있어 완성차 업체들의 선점 경쟁이 치열합니다.",
                readTime: "5분 읽기"
            },
            {
                category: "곡물/식량",
                date: "2026-04-12",
                title: "엘니뇨 현상 심화, 글로벌 식량 가격 불안정성 증대",
                summary: "강력한 엘니뇨 현상으로 인한 이상 기후가 전 세계 곡창 지대를 덮치면서 밀, 옥수수 등 주요 곡물 가격이 요동치고 있습니다. 특히 동남아시아와 남미 지역의 작황 부진이 심각해 식량 인플레이션에 대한 우려가 커지고 있습니다.",
                readTime: "4분 읽기"
            },
            {
                category: "메타버스",
                date: "2026-04-12",
                title: "가상 협업 플랫폼, 기업용 솔루션으로 진화",
                summary: "메타버스가 단순한 오락을 넘어 실질적인 비즈니스 도구로 자리 잡고 있습니다. 최근 출시된 기업용 가상 협업 플랫폼은 실제 사무실과 유사한 환경을 제공하며 원격 근무의 효율성을 극대화하고 있습니다. 글로벌 기업들은 이미 디지털 트윈 기술을 도입해 공정 관리에 활용 중입니다.",
                readTime: "4분 읽기"
            },
            {
                category: "정책",
                date: "2026-04-12",
                title: "탄소국경조정제도(CBAM) 본격 시행, 수출 기업 대응 비상",
                summary: "유럽연합(EU)의 탄소국경조정제도(CBAM)가 본격 시행됨에 따라 철강, 알루미늄 등 탄소 집약적 제품을 수출하는 국내 기업들의 비용 부담이 늘어날 전망입니다. 정부는 중소기업들을 대상으로 탄소 배출량 측정 및 보고를 위한 지원책을 마련하고 있습니다.",
                readTime: "5분 읽기"
            }
        ],
        en: [
            {
                category: "Financials",
                date: "2026-04-12",
                title: "Global Stock Markets Surge on Stronger-Than-Expected Jobs Data",
                summary: "Major global stock indices rallied following the release of robust employment figures. The tech-heavy Nasdaq reached a new record high, as investors interpret the resilient labor market as a sign of continued economic growth.",
                readTime: "4 min read"
            },
            {
                category: "EV/Batteries",
                date: "2026-04-12",
                title: "Solid-State Battery Commercialization Moves Closer",
                summary: "Hopes for the mass production of solid-state batteries are rising, promising a revolution in the EV market. These batteries offer lower fire risks and significantly longer ranges compared to current lithium-ion models, sparking fierce competition among automakers.",
                readTime: "5 min read"
            },
            {
                category: "Food/Agriculture",
                date: "2026-04-12",
                title: "Intensifying El Niño Causes Volatility in Global Food Prices",
                summary: "Extreme weather patterns linked to a strong El Niño are hitting major agricultural regions, causing prices of wheat and corn to fluctuate. Poor harvests in Southeast Asia and South America are raising fears of global food inflation.",
                readTime: "4 min read"
            },
            {
                category: "Metaverse",
                date: "2026-04-12",
                title: "Virtual Collaboration Platforms Evolve into Corporate Solutions",
                summary: "The metaverse is transitioning from entertainment to a practical business tool. New enterprise-grade virtual platforms provide realistic office environments, maximizing remote work efficiency. Global firms are already using digital twin technology for process management.",
                readTime: "4 min read"
            },
            {
                category: "Policy",
                date: "2026-04-12",
                title: "EU CBAM Enforcement Puts Exporting Firms on High Alert",
                summary: "The enforcement of the EU's Carbon Border Adjustment Mechanism (CBAM) is expected to increase costs for exporters of carbon-intensive products like steel. The government is providing support to help SMEs measure and report their carbon footprints.",
                readTime: "5 min read"
            }
        ]
    }
};

// Generate placeholder news for other dates
function generatePlaceholderNews(date, lang) {
    const categories = lang === 'ko' ? ["거시경제", "기술/혁신", "에너지", "금융시장", "글로벌 무역"] : ["Macro", "Tech", "Energy", "Finance", "Trade"];
    const titles = lang === 'ko' ? 
        ["글로벌 시장의 새로운 흐름", "신기술 도입에 따른 산업 변화", "에너지 가격 변동과 전망", "통화 정책의 향방 분석", "국제 무역 질서의 재편"] :
        ["New Trends in Global Markets", "Industrial Shifts Driven by Tech", "Energy Price Volatility & Outlook", "Monetary Policy Analysis", "Reshaping of International Trade"];
    
    return Array.from({ length: 5 }, (_, i) => ({
        category: categories[i],
        date: date,
        title: `${titles[i]} (${date})`,
        summary: lang === 'ko' ? 
            `${date} 일자 경제 요약입니다. 현재 시장은 다양한 지정학적 변수와 경제 지표에 반응하며 변동성을 보이고 있습니다. 투자자들은 중앙은행의 다음 행보에 주목하고 있으며, 원자재 가격 추이가 향후 인플레이션 향방을 결정할 것으로 보입니다.` :
            `Economic summary for ${date}. The market is currently showing volatility in response to various geopolitical variables and economic indicators. Investors are focusing on the central bank's next moves, and commodity price trends are expected to determine the direction of future inflation.`,
        readTime: "3분 읽기"
    }));
}

// Application State
const state = {
    currentLanguage: 'ko',
    currentDate: '2026-04-14',
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
    
    let dayData = newsDatabase[state.currentDate];
    let data;
    
    if (dayData) {
        data = dayData[state.currentLanguage] || dayData['en'] || [];
    } else {
        // Mocking behavior for dates not in the DB
        data = generatePlaceholderNews(state.currentDate, state.currentLanguage);
    }

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
function setupModal(btnId, modalId, closeId) {
    const btn = document.getElementById(btnId);
    const modal = document.getElementById(modalId);
    const close = document.getElementById(closeId);

    if (btn && modal && close) {
        btn.onclick = () => {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        };
        close.onclick = () => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        };
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
}

// Initialize Modals
setupModal('partnership-btn', 'partnership-modal', 'close-modal');
setupModal('about-btn', 'about-modal', 'close-about');
setupModal('privacy-btn', 'privacy-modal', 'close-privacy');
setupModal('disclaimer-btn', 'disclaimer-modal', 'close-disclaimer');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    applyTheme();
    renderNews(); // Render news immediately on entry
});