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

// News Database (Condensed for sample)
const newsDatabase = {
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
            { category: "거시경제", date: "2026-04-17", title: "글로벌 공급망 회복세 뚜렷, 인플레이션 압력 완화 신호", summary: "최근 발표된 글로벌 물류 지수에 따르면 주요 항만의 적체 현상이 해소되며 공급망이 정상 궤도에 진입하고 있습니다. 이는 원자재 가격 안정화로 이어져 각국 중앙은행의 금리 인하 기대감을 높이고 있습니다. 전문가들은 하반기 글로벌 경기 회복 속도가 예상보다 빠를 것으로 전망하고 있습니다.", readTime: "4분 읽기" },
            { category: "금융시장", date: "2026-04-17", title: "뉴욕 증시, AI 기술주 강세에 사상 최고치 경신", summary: "실적 발표 시즌을 맞아 주요 빅테크 기업들이 시장 기대치를 상회하는 AI 부문 성과를 내놓으며 증시를 견인하고 있습니다. 특히 엔비디아와 MS 등 AI 인프라 관련주들이 급등하며 나스닥 지수가 사상 최고치를 돌파했습니다. 투자자들은 이제 AI 수익화 단계가 본격화된 것으로 평가하고 있습니다.", readTime: "5분 읽기" },
            { category: "기술/혁신", date: "2026-04-17", title: "양자 컴퓨터 상용화 임박, 보안 생태계 대전환 예고", summary: "구글과 IBM이 양자 오류 보정 기술에서 획기적인 성과를 거두었다고 발표했습니다. 이는 상용 양자 컴퓨터 등장을 2~3년 앞당길 것으로 보이며, 이에 따라 기존 암호화 체계를 대체할 양자 내성 암호(PQC) 도입이 시급한 과제로 떠오르고 있습니다.", readTime: "5분 읽기" },
            { category: "에너지", date: "2026-04-17", title: "유럽, 재생 에너지 비중 50% 돌파... 에너지 자립 가속화", summary: "유럽 연합 내 재생 에너지 발전 비중이 사상 처음으로 50%를 넘어섰습니다. 특히 풍력과 태양광의 비중이 급격히 늘어나며 화석 연료 의존도가 빠르게 낮아지고 있습니다. 이는 지정학적 리스크에 따른 에너지 안보 강화 전략이 성과를 거두고 있는 것으로 풀이됩니다.", readTime: "4분 읽기" },
            { category: "고용/노동", date: "2026-04-17", title: "하이브리드 근무 정착, 도심 오피스 시장의 재편", summary: "팬데믹 이후 하이브리드 근무가 표준으로 자리 잡으면서 도심 대형 오피스 빌딩의 용도 변경이 활발해지고 있습니다. 사무 공간 대신 복합 문화 시설이나 주거 시설로의 전환이 늘어나고 있으며, 이는 도시 구조 자체를 변화시키는 동인이 되고 있습니다.", readTime: "3분 읽기" }
        ],
        en: [
            { category: "Macro", date: "2026-04-17", title: "Global Supply Chain Recovery Signals Easing Inflation", summary: "Global logistics indices show clearing port congestion and a return to normalcy in supply chains. This stabilization is expected to ease raw material prices and fuel hopes for interest rate cuts. Analysts project a faster-than-expected recovery in the second half of the year.", readTime: "4 min read" },
            { category: "Finance", date: "2026-04-17", title: "Wall Street Hits Record Highs on AI Tech Surge", summary: "Major tech firms are beating earnings expectations with strong AI segment results. NVIDIA and Microsoft have led the Nasdaq to record highs as investors believe the AI monetization phase is now in full swing.", readTime: "5 min read" },
            { category: "Tech", date: "2026-04-17", title: "Quantum Computing Commercialization Nears Breakthrough", summary: "Google and IBM have reported significant progress in quantum error correction, potentially accelerating commercialization by 2-3 years. This shift highlights the urgent need for Post-Quantum Cryptography (PQC) to replace existing security systems.", readTime: "5 min read" },
            { category: "Energy", date: "2026-04-17", title: "Europe Surpasses 50% Renewable Energy Share", summary: "Renewable energy has exceeded 50% of the EU's power generation for the first time. Wind and solar growth are rapidly reducing reliance on fossil fuels, marking a major milestone in energy security and independence.", readTime: "4 min read" },
            { category: "Labor", date: "2026-04-17", title: "Hybrid Work Norms Reshaping Urban Office Markets", summary: "As hybrid work becomes standard, large urban office buildings are being repurposed into mixed-use or residential spaces. This trend is fundamentally altering city structures and the commercial real estate landscape.", readTime: "3 min read" }
        ]
    },
    "2026-04-14": {
        ko: [
            { category: "통화정책", date: "2026-04-14", title: "중앙은행, 디지털 화폐(CBDC) 실거래 테스트 단계 진입", summary: "정부가 중앙은행 디지털 화폐(CBDC)의 실생활 결제 테스트를 시작한다고 발표했습니다. 이번 테스트에는 주요 시중 은행과 유통업체들이 참여하며, 기존 화폐 시스템과의 호환성 및 보안성을 집중 점검합니다. 전문가들은 이번 조치가 현금 없는 사회로의 전환을 가속화하고 통화 정책의 효율성을 높일 것으로 기대하고 있습니다.", readTime: "3분 읽기" },
            { category: "반도체", date: "2026-04-14", title: "차세대 초미세 공정 기술 돌파구, 글로벌 반도체 지형 변화 예고", summary: "국내 반도체 기업이 세계 최초로 1nm 이하 공정의 핵심 기술을 확보하는 데 성공했습니다. 이는 무어의 법칙 한계를 극복한 사례로 평가받으며, 향후 AI 반도체 시장에서의 주도권을 더욱 공고히 할 전망입니다. 글로벌 경쟁사들도 이에 맞서 대규모 투자를 예고하고 있어 기술 경쟁이 한층 치열해질 것으로 보입니다.", readTime: "5분 읽기" },
            { category: "지속가능성", date: "2026-04-14", title: "ESG 공시 의무화 확대, 기업들의 투명성 강화 노력", summary: "내년부터 상장사들의 ESG(환경·사회·지배구조) 공시 의무가 대폭 확대됩니다. 이에 따라 기업들은 탄소 배출량뿐만 아니라 공급망 내 인권 문제까지 상세히 보고해야 합니다. 투자자들은 이러한 비재무적 정보가 향후 기업 가치 평가의 핵심 요소가 될 것으로 보고 있습니다.", readTime: "4분 읽기" },
            { category: "벤처/스타트업", date: "2026-04-14", title: "K-스타트업, 실리콘밸리 투자 유치 성공 사례 급증", summary: "최근 국내 기술 기반 스타트업들이 실리콘밸리의 대형 벤처캐피탈로부터 잇따라 대규모 투자를 유치하고 있습니다. 특히 AI 의료 진단 및 자율주행 소프트웨어 분야에서의 성과가 두드러집니다. 이는 한국 스타트업의 기술력이 세계적인 수준에 도달했음을 보여주는 지표로 해석됩니다.", readTime: "4분 읽기" },
            { category: "원자재", date: "2026-04-14", title: "희토류 공급망 다변화, 자원 안보 강화 움직임", summary: "특정 국가에 의존하던 희토류 공급망을 다변화하려는 움직임이 전 세계적으로 확산되고 있습니다. 아프리카와 호주 등지의 신규 광산 개발 프로젝트에 글로벌 자금이 유입되고 있으며, 폐배터리 리사이클링을 통한 자원 확보 기술도 주목받고 있습니다.", readTime: "5분 읽기" }
        ],
        en: [
            { category: "Monetary", date: "2026-04-14", title: "Central Bank Enters Real-World CBDC Testing Phase", summary: "The government has announced the commencement of real-world payment tests for Central Bank Digital Currency (CBDC). This phase involves major commercial banks and retailers to verify compatibility and security. Experts anticipate this will accelerate the transition to a cashless society and enhance monetary policy efficiency.", readTime: "3 min read" },
            { category: "Semiconductors", date: "2026-04-14", title: "Breakthrough in Next-Gen Sub-1nm Process Technology", summary: "A domestic semiconductor giant has successfully secured key technology for sub-1nm processes. This is seen as overcoming the limits of Moore's Law and is expected to solidify dominance in the AI semiconductor market. Global competitors are responding with massive investment plans.", readTime: "5 min read" },
            { category: "Sustainability", date: "2026-04-14", title: "Mandatory ESG Disclosure Expands to More Listed Companies", summary: "Starting next year, ESG disclosure requirements for listed companies will significantly expand. Firms must now report not only carbon emissions but also human rights issues within their supply chains. Investors view this non-financial information as a critical factor in future valuations.", readTime: "4 min read" },
            { category: "Startups", date: "2026-04-14", title: "Rise in K-Startups Securing Silicon Valley Investments", summary: "Tech-based Korean startups are increasingly attracting large-scale investments from major Silicon Valley VCs. Successes are particularly notable in AI medical diagnostics and autonomous driving software, indicating that Korean tech prowess has reached global standards.", readTime: "4 min read" },
            { category: "Commodities", date: "2026-04-14", title: "Global Efforts to Diversify Rare Earth Supply Chains", summary: "A global movement to diversify rare earth supply chains is gaining momentum. New mining projects in Africa and Australia are attracting global capital, while resource recovery technologies through battery recycling are also gaining attention.", readTime: "5 min read" }
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

    return Array.from({ length: 5 }, (_, i) => ({
        category: categories[i],
        date: date,
        title: lang === 'ko' ? titles_ko[i] : titles_en[i],
        summary: lang === 'ko' ? summaries_ko[i] : summaries_en[i],
        readTime: "4분 읽기"
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
        dateSelect.max = state.currentDate;
    }
    applyTheme();
    renderNews();
});