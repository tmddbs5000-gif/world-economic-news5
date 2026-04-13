// Web Component for News Card
class NewsCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    set data(news) {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    animation: fadeIn 0.5s ease forwards;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .card-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1rem;
                    font-size: 0.8rem;
                    color: oklch(0.75 0.02 240);
                }
                .category {
                    background: oklch(0.7 0.15 150 / 0.2);
                    color: oklch(0.7 0.15 150);
                    padding: 0.2rem 0.6rem;
                    border-radius: 4px;
                    font-weight: bold;
                }
                h2 {
                    font-size: 1.25rem;
                    margin-bottom: 1rem;
                    line-height: 1.3;
                    color: oklch(0.95 0.01 240);
                }
                .summary {
                    font-size: 0.95rem;
                    color: oklch(0.85 0.02 240);
                    line-height: 1.6;
                    display: -webkit-box;
                    -webkit-line-clamp: 8;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                .meta {
                    margin-top: 1.5rem;
                    padding-top: 1rem;
                    border-top: 1px solid oklch(1 0 0 / 0.1);
                    display: flex;
                    justify-content: space-between;
                    font-size: 0.8rem;
                    color: oklch(0.6 0.02 240);
                }
            </style>
            <div class="card-header">
                <span class="category">${news.category}</span>
                <span class="date">${news.date}</span>
            </div>
            <h2>${news.title}</h2>
            <div class="summary">${news.summary}</div>
            <div class="meta">
                <span>Source: Global Finance Insight</span>
                <span>${news.readTime}</span>
            </div>
        `;
    }
}

customElements.define('news-card', NewsCard);

// News Data in Multiple Languages
const newsData = {
    en: [
        {
            category: "Macroeconomy",
            date: "2024-05-20",
            title: "Global Inflation Trends and Central Bank Strategies",
            summary: "Recent economic data suggests that global inflation is cooling at a slower pace than previously anticipated. The Federal Reserve and the European Central Bank are maintaining a cautious stance, signaling that interest rate cuts might be delayed until the latter half of the year. This persistent high-interest environment is putting pressure on emerging markets while keeping consumer spending in check in developed nations. Analysts warn that structural factors, such as labor shortages and geopolitical tensions, continue to drive production costs higher, complicating the path to target inflation levels.",
            readTime: "3 min read"
        },
        {
            category: "Technology",
            date: "2024-05-20",
            title: "AI Infrastructure Investment Reaches Record Highs",
            summary: "The global tech industry is witnessing an unprecedented surge in capital expenditure dedicated to Artificial Intelligence infrastructure. Major players are investing billions in specialized data centers and custom silicon to secure a competitive edge. This massive investment cycle is reshaping the semiconductor supply chain and driving demand for renewable energy to power the energy-intensive AI workloads. However, some economists question the short-term ROI of these expenditures, sparking debates about a potential tech bubble similar to the dot-com era, while others argue that the productivity gains will justify the costs.",
            readTime: "4 min read"
        },
        {
            category: "Energy",
            date: "2024-05-20",
            title: "Energy Transition Faces Supply Chain Bottlenecks",
            summary: "The transition to sustainable energy sources is hitting significant hurdles as critical mineral supply chains struggle to keep up with demand. Shortages in lithium, cobalt, and copper are driving up the costs of electric vehicle batteries and renewable energy installations. Geopolitical competition over these resources is leading to new trade alliances and protectionist policies, further complicating the global landscape. Experts emphasize the need for massive investment in mining and recycling technologies to ensure that the climate goals set in international agreements remain achievable within the planned timeframes.",
            readTime: "4 min read"
        },
        {
            category: "Trade",
            date: "2024-05-20",
            title: "New Global Trade Corridors Emerging Amid Tensions",
            summary: "In response to shifting geopolitical dynamics, global trade routes are undergoing a significant transformation. Countries are increasingly seeking to diversify their supply chains through 'friend-shoring' and regional trade agreements. New corridors connecting Southeast Asia, India, and the Middle East are gaining prominence, challenging traditional shipping routes. This fragmentation of global trade presents both opportunities for developing nations to integrate into value chains and risks of increased costs due to reduced economies of scale. The World Trade Organization expresses concern over the long-term impact on global economic growth.",
            readTime: "3 min read"
        },
        {
            category: "Real Estate",
            date: "2024-05-20",
            title: "Commercial Real Estate Market Adjusts to New Normals",
            summary: "The global commercial real estate sector is navigating a period of intense adjustment as remote work patterns become more permanent. Vacancy rates in major financial hubs remain elevated, leading to a decline in property valuations and concerns about the stability of regional banks with high exposure to the sector. Developers are exploring innovative conversion projects, turning office spaces into residential or mixed-use facilities. Meanwhile, the industrial real estate market remains robust, driven by the continued growth of e-commerce and the need for strategically located logistics centers near major urban populations.",
            readTime: "3 min read"
        }
    ],
    ko: [
        {
            category: "거시경제",
            date: "2024-05-20",
            title: "글로벌 인플레이션 추세와 중앙은행의 전략",
            summary: "최근 경제 데이터에 따르면 글로벌 인플레이션이 예상보다 느린 속도로 둔화되고 있습니다. 미국 연준과 유럽중앙은행은 신중한 입장을 유지하며 금리 인하가 하반기까지 지연될 수 있음을 시사했습니다. 이러한 고금리 환경의 지속은 신흥 시장에 압박을 가하는 동시에 선진국의 소비 지출을 억제하고 있습니다. 분석가들은 노동력 부족과 지정학적 긴장과 같은 구조적 요인들이 계속해서 생산 비용을 높이고 있으며, 목표 인플레이션 수준으로 가는 길을 복잡하게 만들고 있다고 경고합니다.",
            readTime: "3분 읽기"
        },
        {
            category: "기술",
            date: "2024-05-20",
            title: "AI 인프라 투자, 사상 최고치 경신",
            summary: "글로벌 기술 산업은 인공지능 인프라에 할당된 자본 지출이 전례 없는 급증세를 보이고 있습니다. 주요 기업들은 경쟁 우위를 확보하기 위해 특화된 데이터 센터와 맞춤형 실리콘에 수십억 달러를 투자하고 있습니다. 이러한 대규모 투자 사이클은 반도체 공급망을 재편하고 있으며, 에너지 집약적인 AI 작업에 전력을 공급하기 위한 재생 에너지 수요를 창출하고 있습니다. 그러나 일부 경제학자들은 이러한 지출의 단기 수익률(ROI)에 의문을 제기하며 닷컴 시대와 유사한 기술 버블 가능성에 대해 논쟁하고 있는 반면, 생산성 향상이 비용을 정당화할 것이라는 주장도 있습니다.",
            readTime: "4분 읽기"
        },
        {
            category: "에너지",
            date: "2024-05-20",
            title: "에너지 전환, 공급망 병목 현상에 직면",
            summary: "지속 가능한 에너지원으로의 전환은 핵심 광물 공급망이 수요를 따라잡지 못하면서 상당한 장애물에 부딪히고 있습니다. 리튬, 코발트, 구리의 부족은 전기차 배터리와 재생 에너지 설비의 비용을 상승시키고 있습니다. 이러한 자원을 둘러싼 지정학적 경쟁은 새로운 무역 동맹과 보호무역주의 정책으로 이어져 글로벌 지형을 더욱 복잡하게 만들고 있습니다. 전문가들은 국제 협약에서 설정된 기후 목표가 계획된 기간 내에 달성 가능하도록 보장하기 위해 채굴 및 재활용 기술에 대한 대규모 투자가 필요하다고 강조합니다.",
            readTime: "4분 읽기"
        },
        {
            category: "무역",
            date: "2024-05-20",
            title: "긴장 속에서 부상하는 새로운 글로벌 무역 통로",
            summary: "변화하는 지정학적 역학에 대응하여 글로벌 무역 경로가 상당한 변모를 겪고 있습니다. 국가들은 '프렌드쇼어링'과 지역 무역 협정을 통해 공급망을 다변화하려는 노력을 강화하고 있습니다. 동남아시아, 인도, 중동을 연결하는 새로운 통로들이 부상하며 전통적인 해상 경로에 도전하고 있습니다. 이러한 글로벌 무역의 파편화는 개발도상국들에게 가치 사슬에 통합될 기회를 제공하는 동시에, 규모의 경제 감소로 인한 비용 상승의 위험도 안겨줍니다. 세계무역기구(WTO)는 글로벌 경제 성장에 미칠 장기적 영향에 대해 우려를 표명하고 있습니다.",
            readTime: "3분 읽기"
        },
        {
            category: "부동산",
            date: "2024-05-20",
            title: "상업용 부동산 시장, 새로운 표준에 적응 중",
            summary: "글로벌 상업용 부동산 부문은 원격 근무 패턴이 영구화됨에 따라 강도 높은 조정기를 거치고 있습니다. 주요 금융 허브의 공실률은 여전히 높은 수준을 유지하고 있으며, 이는 부동산 가치 하락과 해당 부문에 대한 노출도가 높은 지역 은행의 안정성에 대한 우려로 이어지고 있습니다. 개발자들은 오피스 공간을 주거용이나 복합 용도 시설로 전환하는 혁신적인 리모델링 프로젝트를 모색하고 있습니다. 한편, 산업용 부동산 시장은 이커머스의 지속적인 성장과 주요 도시 인근의 전략적 물류 센터 수요에 힘입어 견조한 상태를 유지하고 있습니다.",
            readTime: "3분 읽기"
        }
    ]
    // Other languages (ja, zh, es, fr) can be added similarly
};

// Application State
const state = {
    currentLanguage: 'en',
    isLoading: false
};

// DOM Elements
const languageSelect = document.getElementById('language-select');
const newsContainer = document.getElementById('news-container');

// Core Functions
async function renderNews(lang) {
    state.isLoading = true;
    newsContainer.innerHTML = '<div class="loading-state"><p>Updating news insights...</p></div>';
    
    // Simulate API fetch delay
    await new Promise(resolve => setTimeout(resolve, 600));

    const data = newsData[lang] || newsData['en'];
    newsContainer.innerHTML = '';
    
    data.forEach((news, index) => {
        const card = document.createElement('news-card');
        card.data = news;
        // Staggered animation effect
        card.style.animationDelay = `${index * 0.1}s`;
        newsContainer.appendChild(card);
    });
    
    state.isLoading = false;
}

// Initializing event listeners
languageSelect.addEventListener('change', (e) => {
    state.currentLanguage = e.target.value;
    renderNews(state.currentLanguage);
});

// Initial Render
document.addEventListener('DOMContentLoaded', () => {
    renderNews(state.currentLanguage);
});
