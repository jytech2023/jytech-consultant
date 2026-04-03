export interface ExpertSeed {
  slug: string;
  name: string;
  nameZh: string;
  industries: string[];
  title: string;
  titleZh: string;
  bio: string;
  bioZh: string;
  hourlyRate: number;
  city: string;
  profileUrl: string;
  avatarUrl?: string;
  externalAvatarUrl?: string;
}

export const experts: ExpertSeed[] = [
  {
    slug: "jay-lin",
    name: "Jay Lin",
    nameZh: "林维京",
    industries: ["technology"],
    title: "Founder, JYTech · Co-founder, BayAreaChinese.com & Yeoso",
    titleZh: "JYTech 创始人 · 湾区中文网 / Yeoso 联合创始人",
    bio: "Full-stack technology expert with 10+ years experience. Built AI platforms at Intuit/PayPal (RAG, MCP, A2A), robotics R&D at Huawei, IoT/ads at Meta. Created AutoClaw open-source AI agent framework.",
    bioZh: "拥有超过10年经验的全栈技术专家。在 Intuit/PayPal 构建 AI 平台（RAG、MCP、A2A），华为机器人研发，Meta IoT/广告系统。创建 AutoClaw 开源 AI Agent 框架。",
    hourlyRate: 500,
    city: "San Francisco, CA",
    profileUrl: "/industry/technology/experts/jay-lin",
    externalAvatarUrl: "https://lh3.googleusercontent.com/a/ACg8ocKhtGiDq8WyAJQ7ZH8D_Hsa2QPOQLW2a4ALXv9gwW45O2GivtuyUg=s96-c",
  },
  {
    slug: "lucas-hu",
    name: "Lucas Hu",
    nameZh: "Lucas Hu",
    industries: ["technology"],
    title: "AI Researcher · Ph.D. Candidate, Old Dominion University",
    titleZh: "AI 研究者 · Old Dominion University 博士候选人",
    bio: "Ph.D. candidate in CS at ODU specializing in LLMs with symbolic regression, AI security & adversarial robustness, semantic communication. Published at IEEE MILCOM 2025.",
    bioZh: "Old Dominion University 计算机科学博士候选人，专注大语言模型与符号回归、AI 安全与对抗鲁棒性、语义通信。IEEE MILCOM 2025 发表论文。",
    hourlyRate: 150,
    city: "Norfolk, VA",
    profileUrl: "/industry/technology/experts/lucas-hu",
  },
  {
    slug: "jeff-guan",
    name: "Jeff Guan",
    nameZh: "Jeff Guan",
    industries: ["media"],
    title: "Founder, BannerShop USA · Eastern New Media",
    titleZh: "BannerShop USA 创始人 · 东方新媒体",
    bio: "30+ years in media & print. Founded BannerShop USA, ShopDineGuide, FoodieGuide, FoodieCoupon. Eastern New Media channels with 1M+ audience reach across the SF Bay Area.",
    bioZh: "30+年传媒与印刷经验。创办 BannerShop USA、ShopDineGuide、FoodieGuide、FoodieCoupon。东方新媒体频道百万级覆盖。",
    hourlyRate: 500,
    city: "San Francisco Bay Area",
    profileUrl: "/industry/media/experts/jeff-guan",
    externalAvatarUrl: "https://shopdineguide.com/images/logo/store02.png",
  },
  {
    slug: "xianji-li",
    name: "Xianji Li",
    nameZh: "李先基",
    industries: ["retail"],
    title: "Regional Sales Director, Unincore & Coway · SF Bay Area",
    titleZh: "Unincore & Coway 旧金山湾区销售主管",
    bio: "$1M+ annual revenue managing sales for Unincore (premium beauty/skincare) and Coway (wellness appliances) in the SF Bay Area. Expert in regional sales, distribution, and cross-cultural market development.",
    bioZh: "年营业额超百万，负责 Unincore（高端美妆护肤）和 Coway（健康家电）在旧金山湾区的销售。精通区域销售管理、渠道建设和跨文化市场开发。",
    hourlyRate: 200,
    city: "San Francisco Bay Area",
    profileUrl: "/industry/retail/experts/xianji-li",
  },
  {
    slug: "helen-lan",
    name: "Helen Lan",
    nameZh: "蓝海伦",
    industries: ["manufacturing"],
    title: "Shenzhen Electronics Manufacturing · International Trade Expert",
    titleZh: "深圳电子制造 · 外贸出海专家",
    bio: "Managed 100+ person teams in Shenzhen electronics manufacturing. Expert in end-to-end production, international trade compliance, global distribution, and go-global strategies for Chinese manufacturers.",
    bioZh: "曾管理超百人团队，深耕深圳电子制造。精通全流程生产管理、国际贸易合规、全球分销渠道建设与中国制造企业出海战略。",
    hourlyRate: 200,
    city: "Shenzhen, China",
    profileUrl: "/industry/manufacturing/experts/helen-lan",
  },
  {
    slug: "tszho-mak",
    name: "Mak",
    nameZh: "麦梓浩",
    industries: ["media"],
    title: "Product Designer · UCSC M.S. Games & Playable Media",
    titleZh: "产品设计师 · UCSC 游戏与可玩媒体硕士",
    bio: "Product designer with expertise in UI/UX, game design, and interactive media. Led UI/UX redesigns improving mobile usability by 40%. Experience at Bitus Labs, 37 Interactive Entertainment, and fAIshion.AI. UCSC M.S. with 4.0 GPA.",
    bioZh: "专注 UI/UX、游戏设计与互动媒体的产品设计师。主导多项 UI/UX 重设计，移动端可用性提升 40%。曾任职 Bitus Labs、37互娱、fAIshion.AI。UCSC 硕士，GPA 4.0。",
    hourlyRate: 200,
    city: "San Francisco Bay Area",
    profileUrl: "/industry/media/experts/tszho-mak",
    avatarUrl: "/avatar/papi.jpg",
  },
  {
    slug: "rony-novianto",
    name: "Rony Novianto",
    nameZh: "Rony Novianto",
    industries: ["technology"],
    title: "AI & Robotics Specialist · PX Robotics (acquired by XPENG)",
    titleZh: "AI 与机器人专家 · PX Robotics（小鹏收购）",
    bio: "AI and robotics specialist with expertise in cognitive computing and autonomous systems. IBM PhD Fellowship recipient (sole Australian awardee, 2011). Endeavour Research Fellow at University of Lund. Valeo Innovation Challenge finalist for Attentive Autonomous Car system. PhD examiners from MIT, Stanford, and CMU.",
    bioZh: "AI 与机器人领域专家，专注认知计算和自主系统。2011年 IBM 博士奖学金唯一澳洲获得者，Endeavour 研究奖学金获得者，曾赴瑞典隆德大学合作研究。Valeo 创新挑战赛决赛入围者，设计注意力自动驾驶汽车管理系统。博士论文由 MIT、Stanford、CMU 教授评审。",
    hourlyRate: 300,
    city: "San Francisco Bay Area",
    profileUrl: "/industry/technology/experts/rony-novianto",
  },
  {
    slug: "grace-zhou",
    name: "Grace Zhou",
    nameZh: "Grace Zhou",
    industries: ["finance"],
    title: "President, SF Global Healthcare Lions Club · Insurance & Wealth Advisor",
    titleZh: "Lions Club 旧金山国际大健康狮子会会长 · 保险理财顾问",
    bio: "President of SF Global Healthcare Cyber Lions Club (District 4 C4). Specializing in overseas asset allocation, life insurance, retirement planning. Also a senior custom jewelry designer and health & beauty products entrepreneur.",
    bioZh: "旧金山国际大健康狮子会会长。深耕海外资产配置、人寿保险与退休投资理财。同时是高级珠宝定制设计师，涉足健康美容产品行业。",
    hourlyRate: 300,
    city: "San Mateo, CA",
    profileUrl: "/industry/finance/experts/grace-zhou",
    avatarUrl: "/avatar/grace-zhou.png",
  },
];
