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

// News Database
const newsDatabase = {
    "2026-04-21": {
        ko: [
            { category: "예상/전망", date: "2026-04-21", title: "[미래] 글로벌 무역 전쟁 재점화 가능성과 원자재 시장의 대이동", summary: "4월 21일경에는 주요국 간의 새로운 관세 정책 발표가 예상됩니다. 특히 희토류를 포함한 핵심 전략 자원의 수출 제한 조치가 논의될 것으로 보이며, 이는 글로벌 공급망에 다시 한 번 큰 충격을 줄 수 있습니다. 투자자들은 원자재 자립도가 높은 기업들에 주목할 필요가 있습니다.", readTime: "5분 읽기", glossary: { "관세": "수입품에 부과하는 세금", "희토류": "첨단 산업의 필수 비철금속 원소", "공급망 충격": "생산 요소의 공급이 갑자기 차단되는 현상" } },
            { category: "미래 기술", date: "2026-04-21", title: "[미래] 뇌-컴퓨터 인터페이스(BCI) 상용화 가이드라인 발표 예정", summary: "인간의 뇌와 컴퓨터를 연결하는 BCI 기술의 윤리적 가이드라인이 21일 공식 발표될 예정입니다. 이는 단순 의료 기기를 넘어 일상생활에서의 활용 가능성을 여는 법적 토대가 될 것입니다. 빅테크 기업들의 관련 스타트업 인수가 가속화될 전망입니다.", readTime: "4분 읽기", glossary: { "BCI": "뇌파를 통해 기기를 제어하는 기술", "윤리적 가이드라인": "기술 활용 시 지켜야 할 도덕적 기준", "상용화": "제품이 시장에서 일반 대중에게 판매되는 것" } }
        ],
        en: [
            { category: "Outlook", date: "2026-04-21", title: "[Future] Potential Trade War Re-ignition and Commodity Shifts", summary: "Expected announcements on new tariff policies on April 21 may impact global markets. Restrictions on strategic resources like rare earths are likely to be discussed, causing shifts in global supply chains. Investors are advised to watch resource-independent firms.", readTime: "5 min read", glossary: { "Tariff": "Tax imposed on imported goods", "Rare Earths": "Strategic minerals vital for high-tech industries", "Supply Chain Shock": "Sudden disruption in the production process" } }
        ]
    },
    "2026-04-20": {
        ko: [
            { category: "예상/전망", date: "2026-04-20", title: "[미래] 디지털 달러(Stablecoin) 법정 통화 지위 확보 논의 가속", summary: "내일(20일)은 중앙은행들이 스테이블코인의 법적 지위에 대해 공동 성명을 발표할 것으로 예상됩니다. 이는 전통 금융 시스템과 가상자산 시장이 본격적으로 통합되는 역사적 전환점이 될 것입니다. 은행권의 디지털 자산 수탁 서비스가 표준화될 가능성이 높습니다.", readTime: "4분 읽기", glossary: { "스테이블코인": "가치가 법정 화폐에 고정된 가상자산", "법정 통화": "국가가 발행하여 강제 통용력을 갖는 돈", "디지털 자산 수탁": "디지털 자산을 대신 보관하고 관리하는 서비스" } }
        ],
        en: [
            { category: "Outlook", date: "2026-04-20", title: "[Future] Digital Dollar and Stablecoin Legal Status Discussion", summary: "Expect a joint statement from central banks on the legal status of stablecoins on April 20. This could mark the historic integration of traditional finance and digital assets.", readTime: "4 min read", glossary: { "Stablecoin": "Cryptocurrency pegged to a fiat currency", "Fiat Currency": "Government-issued legal tender", "Custody Service": "Professional management and storage of assets" } }
        ]
    },
    "2026-04-19": {
        ko: [
            { category: "거시경제", date: "2026-04-19", title: "글로벌 물가상승률 목표치 근접, 주요국 금리 인하 사이클 진입 가시화", summary: "최근 발표된 주요국 경제 지표에 따르면 글로벌 인플레이션이 각국 중앙은행의 목표치에 근접하고 있습니다. 이에 따라 연준(Fed)을 비롯한 주요 중앙은행들이 하반기부터 본격적인 금리 인하 사이클에 진입할 가능성이 높아졌습니다. 전문가들은 고금리 시대의 종료가 가계 부채 부담 완화와 기업 투자 활성화로 이어질 것으로 분석하고 있습니다.", readTime: "4분 읽기", glossary: { "인플레이션": "물가가 지속적으로 오르는 현상", "연준(Fed)": "미국의 중앙은행 제도", "금리 인하 사이클": "중앙은행이 일정 기간에 걸쳐 금리를 계속 낮추는 과정" } },
            { category: "기술/혁신", date: "2026-04-19", title: "AI 반도체 전력 효율 50% 향상 기술 개발... 데이터센터 에너지난 해결사", summary: "국내 연구팀이 기존 대비 전력 소비량을 절반으로 줄이면서도 연산 속도는 높인 차세대 AI 가속기 설계를 공개했습니다. 이는 최근 생성형 AI 확산으로 인한 데이터센터의 막대한 에너지 소모 문제를 해결할 핵심 기술로 주목받고 있습니다. 상용화가 완료되면 AI 인프라 유지비용을 획기적으로 낮출 수 있을 것으로 기대됩니다.", readTime: "5분 읽기", glossary: { "AI 가속기": "인공지능 연산을 빠르게 처리하기 위해 설계된 특수 반도체", "생성형 AI": "데이터를 학습해 새로운 콘텐츠를 만들어내는 인공지능", "데이터센터": "수많은 서버와 데이터를 보관하고 관리하는 시설" } },
            { category: "에너지", date: "2026-04-19", title: "그린 수소 생산 단가, 화석 연료 수준 도달... 에너지 전환 '변곡점'", summary: "수전해 기술의 비약적인 발전으로 그린 수소 생산 단가가 천연가스 추출 방식과 경쟁 가능한 수준까지 하락했습니다. 이는 탄소 중립 달성을 위한 수소 경제 이행의 중대한 이정표로 평가됩니다. 특히 대규모 수전해 설비 투자가 확대되고 있어 재생 에너지 기반의 수소 공급망이 더욱 공고해질 전망입니다.", readTime: "4분 읽기", glossary: { "그린 수소": "탄소 배출 없이 재생 에너지로 만든 수소", "수전해 기술": "전기로 물을 분해해 수소를 얻는 기술", "탄소 중립": "이산화탄소 배출량과 흡수량을 같게 하여 실질적 배출을 0으로 만드는 것" } },
            { category: "금융시장", date: "2026-04-19", title: "가상자산 통합 규제 프레임워크 합의... 시장 투명성 제고 기대", summary: "G20 재무장관 회의에서 글로벌 가상자산 규제 표준에 대한 최종 합의안이 도출되었습니다. 이번 규제안은 투자자 보호와 자금세탁 방지를 골자로 하며, 가상자산 시장의 제도권 편입을 공식화하는 조치입니다. 이를 통해 기관 투자자들의 시장 진입 장벽이 낮아지고 전반적인 시장 투명성이 크게 개선될 것으로 보입니다.", readTime: "5분 읽기", glossary: { "가상자산": "블록체인 기술을 이용한 전자적 가치 증표(코인 등)", "제도권 편입": "법과 규제 안에서 정식으로 인정받는 것", "자금세탁 방지": "불법 자금을 정당한 돈으로 바꾸는 것을 막는 활동" } },
            { category: "글로벌 무역", date: "2026-04-19", title: "포괄적·점진적 환태평양경제동반자협정(CPTPP) 가입국 확대, 새로운 무역 질서", summary: "최근 주요 신흥국들이 CPTPP에 추가 가입하면서 아시아-태평양 지역의 경제 통합이 가속화되고 있습니다. 관세 철폐와 비관세 장벽 완화를 통해 역내 교역량이 연간 15% 이상 증가할 것으로 예측됩니다. 이는 글로벌 공급망 재편 속에서 회원국 간의 경제적 유대를 강화하고 새로운 통상 기회를 창출할 것으로 기대됩니다.", readTime: "4분 읽기", glossary: { "CPTPP": "아시아-태평양 11개국이 참여하는 자유무역협정", "관세": "수입품에 부과하는 세금", "공급망 재편": "생산 및 유통 경로를 효율성이나 안보를 위해 다시 짜는 것" } }
        ],
        en: [
            { category: "Macro", date: "2026-04-19", title: "Global Inflation Nears Targets, Paving Way for Interest Rate Cuts", summary: "Recent economic data indicate that global inflation is converging towards central bank targets. This shift increases the likelihood of a coordinated rate-cutting cycle starting in the second half of the year. Experts suggest this will ease household debt burdens and stimulate corporate investment after years of high rates.", readTime: "4 min read", glossary: { "Inflation": "A general increase in prices and fall in the purchasing value of money", "Fed": "The Federal Reserve, the central bank of the United States", "Rate Cut Cycle": "A period where a central bank repeatedly lowers interest rates" } },
            { category: "Tech", date: "2026-04-19", title: "Breakthrough in AI Chip Efficiency Cuts Power Consumption by 50%", summary: "A research team has unveiled a next-generation AI accelerator design that halves energy usage while maintaining high processing speeds. This technology addresses the critical energy shortage facing data centers due to the generative AI boom, potentially slashing infrastructure maintenance costs significantly.", readTime: "5 min read", glossary: { "AI Accelerator": "A specialized hardware designed to accelerate AI applications", "Generative AI": "AI that can create new content like text, images, or audio", "Data Center": "A large group of networked computer servers used for the storage of data" } },
            { category: "Energy", date: "2026-04-19", title: "Green Hydrogen Production Costs Reach Parity with Fossil Fuels", summary: "Advances in electrolysis technology have brought the cost of green hydrogen down to levels competitive with natural gas-derived methods. This marks a major turning point for the transition to a hydrogen economy. Increased investment in large-scale facilities is expected to solidify renewable-based supply chains.", readTime: "4 min read", glossary: { "Green Hydrogen": "Hydrogen produced by using renewable energy to split water", "Electrolysis": "The process of using electricity to split water into hydrogen and oxygen", "Net Zero": "Achieving a balance between the greenhouse gases put into the atmosphere and those taken out" } },
            { category: "Finance", date: "2026-04-19", title: "G20 Agrees on Global Digital Asset Regulatory Framework", summary: "Finance ministers have reached a final agreement on standardizing global crypto regulations. Focused on investor protection and anti-money laundering, this framework formalizes the entry of digital assets into the mainstream financial system, likely lowering barriers for institutional investors.", readTime: "5 min read", glossary: { "Digital Asset": "An asset that exists only in digital form, such as cryptocurrency", "Mainstream": "Integration into the dominant or established financial system", "Anti-money laundering": "Laws or regulations designed to stop the practice of generating income through illegal actions" } },
            { category: "Trade", date: "2026-04-19", title: "CPTPP Expansion Accelerates Regional Economic Integration", summary: "The addition of major emerging economies to the CPTPP is set to boost regional trade volumes by an estimated 15% annually. By removing tariffs and non-tariff barriers, the expansion strengthens economic ties among members and creates new opportunities amid global supply chain realignments.", readTime: "4 min read", glossary: { "CPTPP": "Comprehensive and Progressive Agreement for Trans-Pacific Partnership", "Tariff": "A tax on imported or exported goods", "Supply Chain": "The sequence of processes involved in the production and distribution of a commodity" } }
        ]
    },
    "2026-04-17": {
        ko: [
            { category: "거시경제", date: "2026-04-17", title: "글로벌 공급망 회복세 뚜렷, 인플레이션 압력 완화 신호", summary: "최근 발표된 글로벌 물류 지수에 따르면 주요 항만의 적체 현상이 해소되며 공급망이 정상 궤도에 진입하고 있습니다. 이는 원자재 가격 안정화로 이어져 각국 중앙은행의 금리 인하 기대감을 높이고 있습니다. 전문가들은 하반기 글로벌 경기 회복 속도가 예상보다 빠를 것으로 전망하고 있습니다.", readTime: "4분 읽기", glossary: { "글로벌 물류 지수": "전 세계 물동량과 운송 비용을 나타내는 지표", "원자재": "제품 생산의 기본이 되는 천연 자원", "금리 인하": "돈을 빌릴 때 내는 이자율을 낮추는 것" } },
            { category: "금융시장", date: "2026-04-17", title: "뉴욕 증시, AI 기술주 강세에 사상 최고치 경신", summary: "실적 발표 시즌을 맞아 주요 빅테크 기업들이 시장 기대치를 상회하는 AI 부문 성과를 내놓으며 증시를 견인하고 있습니다. 특히 엔비디아와 MS 등 AI 인프라 관련주들이 급등하며 나스닥 지수가 사상 최고치를 돌파했습니다.", readTime: "5분 읽기", glossary: { "빅테크": "거대 정보 기술 기업", "나스닥": "미국의 대표적인 기술주 중심 증시", "수익화": "사업을 통해 실제로 돈을 벌어들이는 것" } }
        ],
        en: [
            { category: "Macro", date: "2026-04-17", title: "Global Supply Chain Recovery Signals Easing Inflation", summary: "Global logistics indices show clearing port congestion and a return to normalcy in supply chains. Stabilization in raw material prices boosts hopes for rate cuts.", readTime: "4 min read", glossary: { "Logistics Index": "Measurement of global shipping efficiency", "Raw Materials": "Basic materials used to produce goods", "Rate Cut": "Reduction in interest rates by a central bank" } }
        ]
    },
    "2026-04-14": {
        ko: [
            { category: "통화정책", date: "2026-04-14", title: "중앙은행, 디지털 화폐(CBDC) 실거래 테스트 단계 진입", summary: "정부가 중앙은행 디지털 화폐(CBDC)의 실생활 결제 테스트를 시작한다고 발표했습니다. 이번 테스트에는 주요 시중 은행과 유통업체들이 참여하며, 기존 화폐 시스템과의 호환성 및 보안성을 집중 점검합니다.", readTime: "3분 읽기", glossary: { "CBDC": "중앙은행이 발행하는 디지털 형태의 화폐", "호환성": "서로 다른 시스템이 함께 잘 작동하는 성질", "보안성": "데이터나 자산을 외부의 침입으로부터 보호하는 정도" } }
        ],
        en: [
            { category: "Monetary", date: "2026-04-14", title: "Central Bank Enters Real-World CBDC Testing Phase", summary: "The government has started real-world payment tests for Central Bank Digital Currency (CBDC), involving major banks and retailers.", readTime: "3 min read", glossary: { "CBDC": "Central Bank Digital Currency", "Compatibility": "The ability of different systems to work together", "Security": "Protection against unauthorized access or theft" } }
        ]
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

// Function to get current date in KST (UTC+9) with 10 AM update rule
function getKSTDate() {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const kst = new Date(utc + (9 * 3600000));
    
    if (kst.getHours() < 10) {
        kst.setDate(kst.getDate() - 1);
    }
    return kst.toISOString().split('T')[0];
}

const initialDate = getKSTDate();

// Application State
const state = {
    currentLanguage: 'ko',
    currentDate: initialDate,
    theme: localStorage.getItem('theme') || 'dark',
    cookiesAccepted: localStorage.getItem('cookiesAccepted') === 'true'
};

// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const languageSelect = document.getElementById('language-select');
const dateSelect = document.getElementById('date-select');
const newsContainer = document.getElementById('news-container');
const cookieBanner = document.getElementById('cookie-banner');
const acceptCookiesBtn = document.getElementById('accept-cookies');
const viewPrivacyBtn = document.getElementById('view-privacy');

// Core Functions
function applyTheme() {
    document.documentElement.setAttribute('data-theme', state.theme);
    localStorage.setItem('theme', state.theme);
}

async function renderNews() {
    newsContainer.innerHTML = '<div class="loading-state"><p>Accessing premium intelligence database...</p></div>';
    await new Promise(r => setTimeout(r, 600));
    
    let dayData = newsDatabase[state.currentDate];
    let data = dayData ? (dayData[state.currentLanguage] || dayData['en'] || []) : generatePlaceholderNews(state.currentDate, state.currentLanguage);

    if (data.length === 0) {
        newsContainer.innerHTML = '<div class="loading-state"><p>No data available for the selected date.</p></div>';
        return;
    }

    newsContainer.innerHTML = '';
    data.forEach(news => {
        const card = document.createElement('news-card');
        card.data = news;
        newsContainer.appendChild(card);
    });
}

// Modal Setup Utility
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

// Event Listeners
themeToggle.onclick = () => { state.theme = state.theme === 'dark' ? 'light' : 'dark'; applyTheme(); };
languageSelect.onchange = (e) => { state.currentLanguage = e.target.value; renderNews(); };
dateSelect.onchange = (e) => { state.currentDate = e.target.value; renderNews(); };

// Cookie Banner Logic
if (!state.cookiesAccepted) {
    setTimeout(() => cookieBanner.classList.add('active'), 1000);
}
acceptCookiesBtn.onclick = () => {
    state.cookiesAccepted = true;
    localStorage.setItem('cookiesAccepted', 'true');
    cookieBanner.classList.remove('active');
};
viewPrivacyBtn.onclick = () => {
    document.getElementById('privacy-modal').classList.add('active');
};

// Initialize All Modals
setupModal('partnership-btn', 'partnership-modal', 'close-modal');
setupModal('footer-about-btn', 'about-modal', 'close-about');
setupModal('footer-privacy-btn', 'privacy-modal', 'close-privacy');
setupModal('footer-disclaimer-btn', 'disclaimer-modal', 'close-disclaimer');

// Start
document.addEventListener('DOMContentLoaded', () => {
    // Set initial date picker values
    if (dateSelect) {
        dateSelect.value = state.currentDate;
        // Allowed selecting future dates to see outlook
        const maxDate = new Date();
        maxDate.setDate(maxDate.getDate() + 7);
        dateSelect.max = maxDate.toISOString().split('T')[0];
    }
    applyTheme();
    renderNews();
});