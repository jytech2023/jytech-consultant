export interface Industry {
  slug: string;
  name: string;
  nameZh: string;
  icon: string;
  description: string;
  descriptionZh?: string;
  color: string;
}

export interface ConsultingModule {
  slug: string;
  name: string;
  nameZh: string;
  icon: string;
  description: string;
  descriptionZh?: string;
  features: string[];
}

export const industries: Industry[] = [
  {
    slug: "restaurant",
    name: "Restaurant & Food Service",
    nameZh: "餐饮",
    icon: "🍽️",
    description:
      "Optimize operations, discover customer segments, analyze local competition, and streamline supply chains for food & beverage businesses.",
    descriptionZh:
      "优化运营、发现客户细分、分析本地竞争，并为餐饮企业精简供应链。",
    color: "#ef4444",
  },
  {
    slug: "cosmetic",
    name: "Cosmetic",
    nameZh: "美妆",
    icon: "💄",
    description:
      "Identify beauty trends, benchmark competitor products, build DTC strategies, and manage ingredient supply chains effectively.",
    descriptionZh:
      "识别美容趋势、对标竞品、构建DTC策略，并有效管理原料供应链。",
    color: "#ec4899",
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    nameZh: "制造",
    icon: "🏭",
    description:
      "Find B2B clients, analyze industrial competition, optimize production strategy, and build resilient supply chain networks.",
    descriptionZh:
      "寻找B2B客户、分析工业竞争、优化生产策略，并构建弹性供应链网络。",
    color: "#f59e0b",
  },
  {
    slug: "robotics",
    name: "Robotics",
    nameZh: "机器人",
    icon: "🤖",
    description:
      "Target enterprise buyers, track technology competitors, plan go-to-market strategies, and source components intelligently.",
    descriptionZh:
      "锁定企业买家、追踪技术竞争对手、规划上市策略，并智能化零部件采购。",
    color: "#6366f1",
  },
  {
    slug: "medical",
    name: "Medical",
    nameZh: "医疗",
    icon: "🏥",
    description:
      "Reach healthcare providers, benchmark medical devices, navigate regulatory strategies, and manage critical medical supply chains.",
    descriptionZh:
      "触达医疗服务提供商、对标医疗器械、规划监管策略，并管理关键医疗供应链。",
    color: "#10b981",
  },
  {
    slug: "education",
    name: "Education",
    nameZh: "教育",
    icon: "📚",
    description:
      "Attract students and institutions, compare edtech competitors, develop curriculum strategies, and manage content supply pipelines.",
    descriptionZh:
      "吸引学生和教育机构、比较教育科技竞品、制定课程策略，并管理内容供给。",
    color: "#8b5cf6",
  },
];

export const consultingModules: ConsultingModule[] = [
  {
    slug: "customers",
    name: "Customer Discovery",
    nameZh: "客户开发",
    icon: "🎯",
    description:
      "AI-powered customer identification, segmentation, and acquisition strategy. Find your ideal customers and understand their needs.",
    features: [
      "Ideal Customer Profile (ICP) Generation",
      "Market Segmentation Analysis",
      "Lead Scoring & Prioritization",
      "Customer Journey Mapping",
      "Acquisition Channel Recommendations",
      "Customer Lifetime Value Prediction",
    ],
  },
  {
    slug: "competitors",
    name: "Competitor Analysis",
    nameZh: "竞品分析",
    icon: "🔍",
    description:
      "Deep-dive competitor benchmarking with AI insights. Understand your competitive landscape and find your edge.",
    features: [
      "Competitor Landscape Mapping",
      "Product & Pricing Comparison",
      "SWOT Analysis Generation",
      "Market Share Estimation",
      "Competitive Positioning Matrix",
      "Threat & Opportunity Alerts",
    ],
  },
  {
    slug: "strategy",
    name: "Business Strategy",
    nameZh: "商业策略",
    icon: "♟️",
    description:
      "Comprehensive strategic planning powered by AI. From market entry to growth acceleration, get actionable strategic advice.",
    features: [
      "Market Entry Strategy",
      "Growth & Scaling Roadmap",
      "Pricing Strategy Optimization",
      "Partnership & Alliance Planning",
      "Risk Assessment & Mitigation",
      "Innovation Opportunity Identification",
    ],
  },
  {
    slug: "market",
    name: "Market Intelligence",
    nameZh: "市场洞察",
    icon: "📊",
    description:
      "Real-time market analysis and trend forecasting. Stay ahead with AI-driven market intelligence and actionable data.",
    features: [
      "Market Size & Growth Analysis",
      "Trend Detection & Forecasting",
      "Consumer Behavior Analytics",
      "Regulatory Environment Tracking",
      "Geographic Opportunity Mapping",
      "Industry Benchmark Reports",
    ],
  },
  {
    slug: "supply-chain",
    name: "Supply Chain",
    nameZh: "供应链",
    icon: "🔗",
    description:
      "Optimize your supply chain with AI-driven insights. From sourcing to logistics, build a resilient and efficient supply network.",
    features: [
      "Supplier Discovery & Evaluation",
      "Cost Optimization Analysis",
      "Risk & Disruption Monitoring",
      "Logistics Route Optimization",
      "Inventory Management Strategy",
      "Sustainability & Compliance Tracking",
    ],
  },
  {
    slug: "career",
    name: "Career Consulting",
    nameZh: "职业咨询",
    icon: "💼",
    description:
      "AI-powered career planning, resume optimization, interview preparation, and professional development strategies for individuals and organizations.",
    features: [
      "Career Path Planning & Analysis",
      "Resume & Portfolio Optimization",
      "Interview Strategy & Preparation",
      "Salary Benchmarking & Negotiation",
      "Skill Gap Analysis & Upskilling Plan",
      "Personal Branding Strategy",
    ],
  },
];

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}

export const careerPartners = [
  { name: "Deloitte", domain: "deloitte.com" },
  { name: "Apple", domain: "apple.com" },
  { name: "Google", domain: "google.com" },
  { name: "Meta", domain: "meta.com" },
  { name: "Microsoft", domain: "microsoft.com" },
  { name: "Infosys", domain: "infosys.com" },
  { name: "J.P. Morgan Chase", domain: "jpmorganchase.com" },
  { name: "Morgan Stanley", domain: "morganstanley.com" },
  { name: "Tesla", domain: "tesla.com" },
  { name: "McKinsey", domain: "mckinsey.com" },
  { name: "ByteDance", domain: "bytedance.com" },
  { name: "BlackRock", domain: "blackrock.com" },
  { name: "Cognizant", domain: "cognizant.com" },
  { name: "Accenture", domain: "accenture.com" },
  { name: "Intuit", domain: "intuit.com" },
  { name: "Wipro", domain: "wipro.com" },
  { name: "Adobe", domain: "adobe.com" },
  { name: "Walmart", domain: "walmart.com" },
  { name: "Wells Fargo", domain: "wellsfargo.com" },
  { name: "Cisco", domain: "cisco.com" },
  { name: "LinkedIn", domain: "linkedin.com" },
  { name: "Bain & Company", domain: "bain.com" },
  { name: "Visa", domain: "visa.com" },
  { name: "Uber", domain: "uber.com" },
  { name: "PayPal", domain: "paypal.com" },
  { name: "Nvidia", domain: "nvidia.com" },
  { name: "DoorDash", domain: "doordash.com" },
  { name: "HCL", domain: "hcltech.com" },
  { name: "Salesforce", domain: "salesforce.com" },
  { name: "Palo Alto Networks", domain: "paloaltonetworks.com" },
  { name: "Lucid Motors", domain: "lucidmotors.com" },
  { name: "eBay", domain: "ebay.com" },
];

export function getModule(slug: string): ConsultingModule | undefined {
  return consultingModules.find((m) => m.slug === slug);
}

/* ------------------------------------------------------------------ */
/*  Case Studies                                                       */
/* ------------------------------------------------------------------ */

export interface CaseStudy {
  slug: string;
  industrySlug: string;
  moduleSlug: string;
  title: string;
  titleZh: string;
  subtitle: string;
  subtitleZh?: string;
  date: string;
  readTime: string;
  heroColor: string;
  sections: CaseStudySection[];
}

export interface CaseStudySection {
  id: string;
  title: string;
  titleZh: string;
  content: string; // HTML-safe markdown-ish content rendered via dangerouslySetInnerHTML
  contentZh?: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "us-proglove-market-report",
    industrySlug: "medical",
    moduleSlug: "supply-chain",
    title: "US ProGlove Market Report for Medical Supply Chain",
    titleZh: "美国医用手套市场分析报告",
    subtitle:
      "A comprehensive market analysis of the US nitrile examination glove industry — covering market sizing, tariff impacts, competitive pricing, buyer channels, and go-to-market strategy for medical supply chain entry.",
    subtitleZh:
      "美国丁腈检查手套行业的全面市场分析——涵盖市场规模、关税影响、竞争定价、采购渠道和医疗供应链进入的市场策略。",
    date: "March 25, 2026",
    readTime: "25 min read",
    heroColor: "#10b981",
    sections: [
      {
        id: "executive-summary",
        title: "Executive Summary",
        titleZh: "摘要",
        content: `<p>This report analyzes the US nitrile examination glove market through the lens of <strong>Ultra Stretch Professional Inc.</strong>, a Georgia-based nitrile glove brand/importer. The study covers market sizing, competitive positioning, regulatory landscape, tariff impacts, and a verified buyer directory — providing a blueprint for medical supply chain market entry.</p>
<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-6">
  <div class="rounded-lg border border-card-border bg-background p-4 text-center">
    <div class="text-2xl font-bold text-emerald-400">$1.8B–$2.6B</div>
    <div class="text-xs text-muted mt-1">US Medical Nitrile Glove<br/>Addressable Market (2025)</div>
  </div>
  <div class="rounded-lg border border-card-border bg-background p-4 text-center">
    <div class="text-2xl font-bold text-emerald-400">100–124B</div>
    <div class="text-xs text-muted mt-1">Annual US Healthcare<br/>Glove Consumption</div>
  </div>
  <div class="rounded-lg border border-card-border bg-background p-4 text-center">
    <div class="text-2xl font-bold text-emerald-400">30 Buyers</div>
    <div class="text-xs text-muted mt-1">Verified Potential<br/>Buyer Directory</div>
  </div>
  <div class="rounded-lg border border-card-border bg-background p-4 text-center">
    <div class="text-2xl font-bold text-emerald-400">~80%</div>
    <div class="text-xs text-muted mt-1">China Medical Glove<br/>Tariff (May 2025)</div>
  </div>
</div>`,
        contentZh: `<p>本报告从<strong>Ultra Stretch Professional Inc.</strong>（一家位于佐治亚州的丁腈手套品牌/进口商）的角度分析了美国丁腈检查手套市场。研究涵盖市场规模、竞争定位、监管环境、关税影响和经验证的采购商名录——为医疗供应链市场进入提供蓝图。</p>
<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-6">
  <div class="rounded-lg border border-card-border bg-background p-4 text-center">
    <div class="text-2xl font-bold text-emerald-400">$18亿–$26亿</div>
    <div class="text-xs text-muted mt-1">美国医用丁腈手套<br/>可触达市场（2025）</div>
  </div>
  <div class="rounded-lg border border-card-border bg-background p-4 text-center">
    <div class="text-2xl font-bold text-emerald-400">1000–1240亿</div>
    <div class="text-xs text-muted mt-1">美国医疗年度<br/>手套消耗量</div>
  </div>
  <div class="rounded-lg border border-card-border bg-background p-4 text-center">
    <div class="text-2xl font-bold text-emerald-400">30家</div>
    <div class="text-xs text-muted mt-1">经验证的潜在<br/>采购商名录</div>
  </div>
  <div class="rounded-lg border border-card-border bg-background p-4 text-center">
    <div class="text-2xl font-bold text-emerald-400">~80%</div>
    <div class="text-xs text-muted mt-1">中国医用手套<br/>关税（2025年5月）</div>
  </div>
</div>`,
      },
      {
        id: "company-profile",
        title: "Company Profile: Ultra Stretch Professional",
        titleZh: "公司概况",
        content: `<div class="rounded-lg border border-card-border bg-background p-5">
  <div class="grid gap-3 text-sm">
    <div class="flex justify-between border-b border-card-border pb-2"><span class="text-muted">Legal Name</span><span>Ultra Stretch Professional Inc.</span></div>
    <div class="flex justify-between border-b border-card-border pb-2"><span class="text-muted">Location</span><span>Chamblee, GA 30341</span></div>
    <div class="flex justify-between border-b border-card-border pb-2"><span class="text-muted">Business Model</span><span>Nitrile glove brand/importer</span></div>
    <div class="flex justify-between border-b border-card-border pb-2"><span class="text-muted">Sales Channels</span><span>Website (WooCommerce), Amazon (7 ASINs), Walmart (3+ listings)</span></div>
    <div class="flex justify-between"><span class="text-muted">Product Range</span><span>11 SKUs — Exam (3.0–3.5 mil), Heavy-Duty (5.0–6.0 mil), Extended Cuff (12")</span></div>
  </div>
</div>
<h4 class="mt-6 font-semibold text-sm uppercase tracking-wider text-muted">Regulatory Compliance Status</h4>
<div class="mt-3 space-y-2 text-sm">
  <div class="flex items-start gap-2"><span class="text-yellow-400">⚠</span><span><strong>FDA 510(k)</strong> — Claimed but not found under company name in FDA database. Clearance likely held by OEM manufacturer.</span></div>
  <div class="flex items-start gap-2"><span class="text-emerald-400">✓</span><span><strong>ASTM D6319</strong> — Verified. Standard Specification for Nitrile Examination Gloves for Medical Application.</span></div>
  <div class="flex items-start gap-2"><span class="text-emerald-400">✓</span><span><strong>ASTM D6978</strong> — Verified. Chemotherapy drug permeation resistance standard.</span></div>
  <div class="flex items-start gap-2"><span class="text-red-400">✗</span><span><strong>ASTM D6878</strong> — Listed on 7 of 11 products, but this is a roofing membrane standard. Likely a typo for D6978.</span></div>
</div>`,
        contentZh: `<div class="rounded-lg border border-card-border bg-background p-5">
  <div class="grid gap-3 text-sm">
    <div class="flex justify-between border-b border-card-border pb-2"><span class="text-muted">法定名称</span><span>Ultra Stretch Professional Inc.</span></div>
    <div class="flex justify-between border-b border-card-border pb-2"><span class="text-muted">所在地</span><span>Chamblee, GA 30341</span></div>
    <div class="flex justify-between border-b border-card-border pb-2"><span class="text-muted">商业模式</span><span>丁腈手套品牌/进口商</span></div>
    <div class="flex justify-between border-b border-card-border pb-2"><span class="text-muted">销售渠道</span><span>官网（WooCommerce）、亚马逊（7个ASIN）、沃尔玛（3+个listing）</span></div>
    <div class="flex justify-between"><span class="text-muted">产品线</span><span>11个SKU — 检查级（3.0–3.5 mil）、重型（5.0–6.0 mil）、加长袖口（12"）</span></div>
  </div>
</div>
<h4 class="mt-6 font-semibold text-sm uppercase tracking-wider text-muted">法规合规状态</h4>
<div class="mt-3 space-y-2 text-sm">
  <div class="flex items-start gap-2"><span class="text-yellow-400">⚠</span><span><strong>FDA 510(k)</strong> — 声称拥有但在FDA数据库中未以公司名称找到。许可可能由OEM制造商持有。</span></div>
  <div class="flex items-start gap-2"><span class="text-emerald-400">✓</span><span><strong>ASTM D6319</strong> — 已验证。医用丁腈检查手套标准规范。</span></div>
  <div class="flex items-start gap-2"><span class="text-emerald-400">✓</span><span><strong>ASTM D6978</strong> — 已验证。化疗药物渗透抗性标准。</span></div>
  <div class="flex items-start gap-2"><span class="text-red-400">✗</span><span><strong>ASTM D6878</strong> — 在11个产品中的7个上标注，但这是屋顶膜标准。可能是D6978的打字错误。</span></div>
</div>`,
      },
      {
        id: "product-catalog",
        title: "Product Catalog & Pricing",
        titleZh: "产品目录与定价",
        content: `<h4 class="font-semibold text-sm uppercase tracking-wider text-muted">Examination Gloves (3.0–3.5 mil)</h4>
<div class="mt-3 overflow-x-auto">
  <table class="w-full text-sm">
    <thead><tr class="border-b border-card-border text-left text-muted"><th class="pb-2 pr-4">Product</th><th class="pb-2 pr-4">Pack</th><th class="pb-2 pr-4">Price</th><th class="pb-2 pr-4">Per Glove</th><th class="pb-2">Stock</th></tr></thead>
    <tbody class="divide-y divide-card-border">
      <tr><td class="py-2 pr-4">PRO 3.0 Cobalt Blue</td><td class="py-2 pr-4">2,000/case</td><td class="py-2 pr-4">$167.92</td><td class="py-2 pr-4 text-emerald-400">$0.084</td><td class="py-2">✓ In Stock</td></tr>
      <tr><td class="py-2 pr-4">PRO 3.5 Ice Blue</td><td class="py-2 pr-4">2,000/case</td><td class="py-2 pr-4">$175.92</td><td class="py-2 pr-4 text-emerald-400">$0.088</td><td class="py-2">✓ In Stock</td></tr>
      <tr><td class="py-2 pr-4">PRO 3.5 Coal Black</td><td class="py-2 pr-4">1,000/case</td><td class="py-2 pr-4">$95.92</td><td class="py-2 pr-4 text-emerald-400">$0.096</td><td class="py-2 text-red-400">Out of Stock</td></tr>
    </tbody>
  </table>
</div>
<h4 class="mt-6 font-semibold text-sm uppercase tracking-wider text-muted">Heavy-Duty / Fentanyl-Resistant (5.0–6.0 mil)</h4>
<div class="mt-3 overflow-x-auto">
  <table class="w-full text-sm">
    <thead><tr class="border-b border-card-border text-left text-muted"><th class="pb-2 pr-4">Product</th><th class="pb-2 pr-4">Pack</th><th class="pb-2 pr-4">Price</th><th class="pb-2 pr-4">Per Glove</th><th class="pb-2">Stock</th></tr></thead>
    <tbody class="divide-y divide-card-border">
      <tr><td class="py-2 pr-4">PRO 5.0 Coal Black</td><td class="py-2 pr-4">1,000/case</td><td class="py-2 pr-4">$114.32</td><td class="py-2 pr-4 text-emerald-400">$0.114</td><td class="py-2">✓ In Stock</td></tr>
      <tr><td class="py-2 pr-4">PRO 6.0 Coal Black</td><td class="py-2 pr-4">1,000/case</td><td class="py-2 pr-4">$159.92</td><td class="py-2 pr-4 text-emerald-400">$0.160</td><td class="py-2">✓ In Stock</td></tr>
    </tbody>
  </table>
</div>
<h4 class="mt-6 font-semibold text-sm uppercase tracking-wider text-muted">Extended Cuff (12 inch)</h4>
<div class="mt-3 overflow-x-auto">
  <table class="w-full text-sm">
    <thead><tr class="border-b border-card-border text-left text-muted"><th class="pb-2 pr-4">Product</th><th class="pb-2 pr-4">Pack</th><th class="pb-2 pr-4">Price</th><th class="pb-2 pr-4">Per Glove</th><th class="pb-2">Stock</th></tr></thead>
    <tbody class="divide-y divide-card-border">
      <tr><td class="py-2 pr-4">12" Milky White</td><td class="py-2 pr-4">1,000/case</td><td class="py-2 pr-4">$208.00</td><td class="py-2 pr-4 text-emerald-400">$0.208</td><td class="py-2">✓ In Stock</td></tr>
      <tr><td class="py-2 pr-4">12" Hot Pink</td><td class="py-2 pr-4">1,000/case</td><td class="py-2 pr-4">$119.92</td><td class="py-2 pr-4 text-emerald-400">$0.120</td><td class="py-2 text-red-400">Out of Stock</td></tr>
    </tbody>
  </table>
</div>`,
        contentZh: `<h4 class="font-semibold text-sm uppercase tracking-wider text-muted">检查手套（3.0–3.5 mil）</h4>
<div class="mt-3 overflow-x-auto">
  <table class="w-full text-sm">
    <thead><tr class="border-b border-card-border text-left text-muted"><th class="pb-2 pr-4">产品</th><th class="pb-2 pr-4">包装</th><th class="pb-2 pr-4">价格</th><th class="pb-2 pr-4">单只价</th><th class="pb-2">库存</th></tr></thead>
    <tbody class="divide-y divide-card-border">
      <tr><td class="py-2 pr-4">PRO 3.0 钴蓝</td><td class="py-2 pr-4">2,000只/箱</td><td class="py-2 pr-4">$167.92</td><td class="py-2 pr-4 text-emerald-400">$0.084</td><td class="py-2">✓ 有货</td></tr>
      <tr><td class="py-2 pr-4">PRO 3.5 冰蓝</td><td class="py-2 pr-4">2,000只/箱</td><td class="py-2 pr-4">$175.92</td><td class="py-2 pr-4 text-emerald-400">$0.088</td><td class="py-2">✓ 有货</td></tr>
      <tr><td class="py-2 pr-4">PRO 3.5 煤黑</td><td class="py-2 pr-4">1,000只/箱</td><td class="py-2 pr-4">$95.92</td><td class="py-2 pr-4 text-emerald-400">$0.096</td><td class="py-2 text-red-400">缺货</td></tr>
    </tbody>
  </table>
</div>
<h4 class="mt-6 font-semibold text-sm uppercase tracking-wider text-muted">重型/抗芬太尼（5.0–6.0 mil）</h4>
<div class="mt-3 overflow-x-auto">
  <table class="w-full text-sm">
    <thead><tr class="border-b border-card-border text-left text-muted"><th class="pb-2 pr-4">产品</th><th class="pb-2 pr-4">包装</th><th class="pb-2 pr-4">价格</th><th class="pb-2 pr-4">单只价</th><th class="pb-2">库存</th></tr></thead>
    <tbody class="divide-y divide-card-border">
      <tr><td class="py-2 pr-4">PRO 5.0 煤黑</td><td class="py-2 pr-4">1,000只/箱</td><td class="py-2 pr-4">$114.32</td><td class="py-2 pr-4 text-emerald-400">$0.114</td><td class="py-2">✓ 有货</td></tr>
      <tr><td class="py-2 pr-4">PRO 6.0 煤黑</td><td class="py-2 pr-4">1,000只/箱</td><td class="py-2 pr-4">$159.92</td><td class="py-2 pr-4 text-emerald-400">$0.160</td><td class="py-2">✓ 有货</td></tr>
    </tbody>
  </table>
</div>
<h4 class="mt-6 font-semibold text-sm uppercase tracking-wider text-muted">加长袖口（12英寸）</h4>
<div class="mt-3 overflow-x-auto">
  <table class="w-full text-sm">
    <thead><tr class="border-b border-card-border text-left text-muted"><th class="pb-2 pr-4">产品</th><th class="pb-2 pr-4">包装</th><th class="pb-2 pr-4">价格</th><th class="pb-2 pr-4">单只价</th><th class="pb-2">库存</th></tr></thead>
    <tbody class="divide-y divide-card-border">
      <tr><td class="py-2 pr-4">12" 乳白</td><td class="py-2 pr-4">1,000只/箱</td><td class="py-2 pr-4">$208.00</td><td class="py-2 pr-4 text-emerald-400">$0.208</td><td class="py-2">✓ 有货</td></tr>
      <tr><td class="py-2 pr-4">12" 亮粉</td><td class="py-2 pr-4">1,000只/箱</td><td class="py-2 pr-4">$119.92</td><td class="py-2 pr-4 text-emerald-400">$0.120</td><td class="py-2 text-red-400">缺货</td></tr>
    </tbody>
  </table>
</div>`,
      },
      {
        id: "market-size",
        title: "US Market Size & Landscape",
        titleZh: "美国市场规模",
        content: `<p>Multiple research firms provide overlapping but divergent estimates. The medical/exam glove addressable market is most reliably estimated at <strong class="text-emerald-400">$1.8B–$2.6B</strong>.</p>
<div class="mt-4 overflow-x-auto">
  <table class="w-full text-sm">
    <thead><tr class="border-b border-card-border text-left text-muted"><th class="pb-2 pr-4">Source</th><th class="pb-2 pr-4">Base Year</th><th class="pb-2 pr-4">Forecast</th><th class="pb-2 pr-4">CAGR</th><th class="pb-2">Scope</th></tr></thead>
    <tbody class="divide-y divide-card-border">
      <tr><td class="py-2 pr-4">Grand View Research</td><td class="py-2 pr-4">$2,105.6M (2025)</td><td class="py-2 pr-4">$4,409.2M (2033)</td><td class="py-2 pr-4">9.7%</td><td class="py-2">All end-use</td></tr>
      <tr><td class="py-2 pr-4">Grand View Research</td><td class="py-2 pr-4">$1,800M (2022)</td><td class="py-2 pr-4">$2,600M (2030)</td><td class="py-2 pr-4">4.7%</td><td class="py-2">Healthcare 81.8%</td></tr>
      <tr><td class="py-2 pr-4">Emergen Research</td><td class="py-2 pr-4">$5,200M (2024)</td><td class="py-2 pr-4">$10,100M (2034)</td><td class="py-2 pr-4">6.8%</td><td class="py-2">Healthcare 60%</td></tr>
      <tr><td class="py-2 pr-4">Precedence Research</td><td class="py-2 pr-4">$6,460M (2025)</td><td class="py-2 pr-4">$13,330M (2035)</td><td class="py-2 pr-4">7.51%</td><td class="py-2">Broad scope</td></tr>
    </tbody>
  </table>
</div>
<h4 class="mt-6 font-semibold text-sm uppercase tracking-wider text-muted">Key Market Characteristics</h4>
<ul class="mt-3 space-y-2 text-sm">
  <li class="flex items-start gap-2"><span class="text-emerald-400 mt-0.5">●</span><strong>Healthcare dominates:</strong> 60–82% of US nitrile demand</li>
  <li class="flex items-start gap-2"><span class="text-emerald-400 mt-0.5">●</span><strong>Disposable gloves:</strong> ~85% of US consumption</li>
  <li class="flex items-start gap-2"><span class="text-emerald-400 mt-0.5">●</span><strong>Growth drivers:</strong> Infection control mandates, fentanyl exposure concerns, vinyl-to-nitrile conversion, domestic manufacturing policy</li>
  <li class="flex items-start gap-2"><span class="text-emerald-400 mt-0.5">●</span><strong>Consumption intensity:</strong> 30–50 gloves per occupied bed per day in acute care</li>
</ul>`,
        contentZh: `<p>多家研究机构提供了重叠但有差异的估算。医用/检查手套可触达市场最可靠的估算为<strong class="text-emerald-400">$18亿–$26亿</strong>。</p>
<div class="mt-4 overflow-x-auto">
  <table class="w-full text-sm">
    <thead><tr class="border-b border-card-border text-left text-muted"><th class="pb-2 pr-4">来源</th><th class="pb-2 pr-4">基准年</th><th class="pb-2 pr-4">预测</th><th class="pb-2 pr-4">复合增长率</th><th class="pb-2">范围</th></tr></thead>
    <tbody class="divide-y divide-card-border">
      <tr><td class="py-2 pr-4">Grand View Research</td><td class="py-2 pr-4">$21.06亿（2025）</td><td class="py-2 pr-4">$44.09亿（2033）</td><td class="py-2 pr-4">9.7%</td><td class="py-2">全部终端</td></tr>
      <tr><td class="py-2 pr-4">Grand View Research</td><td class="py-2 pr-4">$18亿（2022）</td><td class="py-2 pr-4">$26亿（2030）</td><td class="py-2 pr-4">4.7%</td><td class="py-2">医疗占81.8%</td></tr>
      <tr><td class="py-2 pr-4">Emergen Research</td><td class="py-2 pr-4">$52亿（2024）</td><td class="py-2 pr-4">$101亿（2034）</td><td class="py-2 pr-4">6.8%</td><td class="py-2">医疗占60%</td></tr>
      <tr><td class="py-2 pr-4">Precedence Research</td><td class="py-2 pr-4">$64.6亿（2025）</td><td class="py-2 pr-4">$133.3亿（2035）</td><td class="py-2 pr-4">7.51%</td><td class="py-2">广泛范围</td></tr>
    </tbody>
  </table>
</div>
<h4 class="mt-6 font-semibold text-sm uppercase tracking-wider text-muted">市场关键特征</h4>
<ul class="mt-3 space-y-2 text-sm">
  <li class="flex items-start gap-2"><span class="text-emerald-400 mt-0.5">●</span><strong>医疗主导：</strong>占美国丁腈需求的60–82%</li>
  <li class="flex items-start gap-2"><span class="text-emerald-400 mt-0.5">●</span><strong>一次性手套：</strong>约占美国消费量的85%</li>
  <li class="flex items-start gap-2"><span class="text-emerald-400 mt-0.5">●</span><strong>增长驱动：</strong>感染控制规定、芬太尼暴露担忧、PVC转丁腈趋势、国内制造政策</li>
  <li class="flex items-start gap-2"><span class="text-emerald-400 mt-0.5">●</span><strong>消耗强度：</strong>急症护理中每张占用病床每天30-50只手套</li>
</ul>`,
      },
      {
        id: "tariff-environment",
        title: "Tariff & Trade Environment",
        titleZh: "关税与贸易环境",
        content: `<h4 class="font-semibold text-sm uppercase tracking-wider text-muted">China Tariff Escalation</h4>
<div class="mt-3 overflow-x-auto">
  <table class="w-full text-sm">
    <thead><tr class="border-b border-card-border text-left text-muted"><th class="pb-2 pr-4">Effective Date</th><th class="pb-2 pr-4">Medical Gloves</th><th class="pb-2">Industrial Gloves</th></tr></thead>
    <tbody class="divide-y divide-card-border">
      <tr><td class="py-2 pr-4">Pre-2025</td><td class="py-2 pr-4">7.5%</td><td class="py-2">7.5%</td></tr>
      <tr><td class="py-2 pr-4">January 2025</td><td class="py-2 pr-4">50%</td><td class="py-2">~30%</td></tr>
      <tr><td class="py-2 pr-4">May 2025</td><td class="py-2 pr-4 text-yellow-400 font-semibold">~80%</td><td class="py-2">~55%</td></tr>
      <tr><td class="py-2 pr-4">January 2026</td><td class="py-2 pr-4 text-red-400 font-semibold">~130%</td><td class="py-2">~75%+</td></tr>
    </tbody>
  </table>
</div>
<h4 class="mt-6 font-semibold text-sm uppercase tracking-wider text-muted">SE Asia Reciprocal Tariffs (May 2025)</h4>
<div class="mt-3 overflow-x-auto">
  <table class="w-full text-sm">
    <thead><tr class="border-b border-card-border text-left text-muted"><th class="pb-2 pr-4">Country</th><th class="pb-2 pr-4">Tariff</th><th class="pb-2">Medical Import Share</th></tr></thead>
    <tbody class="divide-y divide-card-border">
      <tr><td class="py-2 pr-4">Malaysia</td><td class="py-2 pr-4">24%</td><td class="py-2 font-semibold">67.5%</td></tr>
      <tr><td class="py-2 pr-4">Thailand</td><td class="py-2 pr-4">36%</td><td class="py-2">16.9%</td></tr>
      <tr><td class="py-2 pr-4">Vietnam</td><td class="py-2 pr-4">46%</td><td class="py-2">9.8%</td></tr>
      <tr><td class="py-2 pr-4">Indonesia</td><td class="py-2 pr-4">32%</td><td class="py-2">7.3%</td></tr>
    </tbody>
  </table>
</div>
<div class="mt-4 rounded-lg border border-yellow-400/30 bg-yellow-400/5 p-4 text-sm">
  <strong class="text-yellow-400">Import Shift:</strong> China's medical glove share collapsed from 38.9% to 2.8%. Malaysia now dominates at 67.5%. US prices are rising +15–25% while European prices are falling –28%, creating a divergent global pricing environment.
</div>`,
        contentZh: `<h4 class="font-semibold text-sm uppercase tracking-wider text-muted">中国关税升级</h4>
<div class="mt-3 overflow-x-auto">
  <table class="w-full text-sm">
    <thead><tr class="border-b border-card-border text-left text-muted"><th class="pb-2 pr-4">生效日期</th><th class="pb-2 pr-4">医用手套</th><th class="pb-2">工业手套</th></tr></thead>
    <tbody class="divide-y divide-card-border">
      <tr><td class="py-2 pr-4">2025年前</td><td class="py-2 pr-4">7.5%</td><td class="py-2">7.5%</td></tr>
      <tr><td class="py-2 pr-4">2025年1月</td><td class="py-2 pr-4">50%</td><td class="py-2">~30%</td></tr>
      <tr><td class="py-2 pr-4">2025年5月</td><td class="py-2 pr-4 text-yellow-400 font-semibold">~80%</td><td class="py-2">~55%</td></tr>
      <tr><td class="py-2 pr-4">2026年1月</td><td class="py-2 pr-4 text-red-400 font-semibold">~130%</td><td class="py-2">~75%+</td></tr>
    </tbody>
  </table>
</div>
<h4 class="mt-6 font-semibold text-sm uppercase tracking-wider text-muted">东南亚对等关税（2025年5月）</h4>
<div class="mt-3 overflow-x-auto">
  <table class="w-full text-sm">
    <thead><tr class="border-b border-card-border text-left text-muted"><th class="pb-2 pr-4">国家</th><th class="pb-2 pr-4">关税</th><th class="pb-2">医用进口份额</th></tr></thead>
    <tbody class="divide-y divide-card-border">
      <tr><td class="py-2 pr-4">马来西亚</td><td class="py-2 pr-4">24%</td><td class="py-2 font-semibold">67.5%</td></tr>
      <tr><td class="py-2 pr-4">泰国</td><td class="py-2 pr-4">36%</td><td class="py-2">16.9%</td></tr>
      <tr><td class="py-2 pr-4">越南</td><td class="py-2 pr-4">46%</td><td class="py-2">9.8%</td></tr>
      <tr><td class="py-2 pr-4">印度尼西亚</td><td class="py-2 pr-4">32%</td><td class="py-2">7.3%</td></tr>
    </tbody>
  </table>
</div>
<div class="mt-4 rounded-lg border border-yellow-400/30 bg-yellow-400/5 p-4 text-sm">
  <strong class="text-yellow-400">进口转移：</strong>中国医用手套份额从38.9%暴跌至2.8%。马来西亚现以67.5%占据主导地位。美国价格上涨15–25%，而欧洲价格下降28%，形成全球价格分化环境。
</div>`,
      },
      {
        id: "competitive-pricing",
        title: "Competitive Pricing Analysis",
        titleZh: "竞争定价分析",
        content: `<div class="overflow-x-auto">
  <table class="w-full text-sm">
    <thead><tr class="border-b border-card-border text-left text-muted"><th class="pb-2 pr-4">Tier</th><th class="pb-2 pr-4">Example</th><th class="pb-2 pr-4">Thickness</th><th class="pb-2">Per Glove</th></tr></thead>
    <tbody class="divide-y divide-card-border">
      <tr><td class="py-2 pr-4 text-blue-400">Budget</td><td class="py-2 pr-4">Gloves.com house brand</td><td class="py-2 pr-4">3 mil</td><td class="py-2">$0.040</td></tr>
      <tr><td class="py-2 pr-4 text-blue-400">Budget</td><td class="py-2 pr-4">Safety Supply America 5mil fentanyl</td><td class="py-2 pr-4">5 mil</td><td class="py-2">$0.049</td></tr>
      <tr><td class="py-2 pr-4 text-emerald-400">Mid-Range</td><td class="py-2 pr-4">McKesson Confiderm 3.5C</td><td class="py-2 pr-4">3.5 mil</td><td class="py-2">$0.089</td></tr>
      <tr><td class="py-2 pr-4 text-emerald-400">Mid-Range</td><td class="py-2 pr-4">Atlantic Safety InTouch</td><td class="py-2 pr-4">5 mil</td><td class="py-2">$0.109</td></tr>
      <tr><td class="py-2 pr-4 text-amber-400">Premium</td><td class="py-2 pr-4">Medline FitGuard Touch</td><td class="py-2 pr-4">3.1 mil</td><td class="py-2">$0.140</td></tr>
      <tr><td class="py-2 pr-4 text-amber-400">Premium</td><td class="py-2 pr-4">Kimberly-Clark Purple Nitrile</td><td class="py-2 pr-4">—</td><td class="py-2">$0.246</td></tr>
      <tr><td class="py-2 pr-4 text-purple-400">Extended Cuff</td><td class="py-2 pr-4">GloveSaver 12"</td><td class="py-2 pr-4">12"</td><td class="py-2">$0.270</td></tr>
      <tr><td class="py-2 pr-4 text-red-400">Heavy-Duty</td><td class="py-2 pr-4">SW MegaMan 8.5mil</td><td class="py-2 pr-4">8.5 mil</td><td class="py-2">$0.57–0.64</td></tr>
    </tbody>
  </table>
</div>
<h4 class="mt-6 font-semibold text-sm uppercase tracking-wider text-muted">USP Competitive Position</h4>
<div class="mt-3 space-y-2 text-sm">
  <div class="flex items-start gap-2"><span class="text-emerald-400">✓</span><span><strong>Exam gloves (3.0–3.5 mil):</strong> Price-competitive in mid-range at $0.084–$0.096</span></div>
  <div class="flex items-start gap-2"><span class="text-yellow-400">⚠</span><span><strong>Fentanyl 5.0 mil:</strong> $0.114 vs budget $0.049 — 2.3x premium needs justification</span></div>
  <div class="flex items-start gap-2"><span class="text-emerald-400">✓</span><span><strong>Extended cuff 12":</strong> $0.120–$0.208 significantly below market ($0.270–$0.378) — strong value</span></div>
</div>`,
        contentZh: `<div class="overflow-x-auto">
  <table class="w-full text-sm">
    <thead><tr class="border-b border-card-border text-left text-muted"><th class="pb-2 pr-4">价格层级</th><th class="pb-2 pr-4">示例</th><th class="pb-2 pr-4">厚度</th><th class="pb-2">单只价</th></tr></thead>
    <tbody class="divide-y divide-card-border">
      <tr><td class="py-2 pr-4 text-blue-400">经济型</td><td class="py-2 pr-4">Gloves.com 自有品牌</td><td class="py-2 pr-4">3 mil</td><td class="py-2">$0.040</td></tr>
      <tr><td class="py-2 pr-4 text-blue-400">经济型</td><td class="py-2 pr-4">Safety Supply America 5mil 抗芬太尼</td><td class="py-2 pr-4">5 mil</td><td class="py-2">$0.049</td></tr>
      <tr><td class="py-2 pr-4 text-emerald-400">中端</td><td class="py-2 pr-4">McKesson Confiderm 3.5C</td><td class="py-2 pr-4">3.5 mil</td><td class="py-2">$0.089</td></tr>
      <tr><td class="py-2 pr-4 text-emerald-400">中端</td><td class="py-2 pr-4">Atlantic Safety InTouch</td><td class="py-2 pr-4">5 mil</td><td class="py-2">$0.109</td></tr>
      <tr><td class="py-2 pr-4 text-amber-400">高端</td><td class="py-2 pr-4">Medline FitGuard Touch</td><td class="py-2 pr-4">3.1 mil</td><td class="py-2">$0.140</td></tr>
      <tr><td class="py-2 pr-4 text-amber-400">高端</td><td class="py-2 pr-4">Kimberly-Clark Purple Nitrile</td><td class="py-2 pr-4">—</td><td class="py-2">$0.246</td></tr>
      <tr><td class="py-2 pr-4 text-purple-400">加长袖口</td><td class="py-2 pr-4">GloveSaver 12"</td><td class="py-2 pr-4">12"</td><td class="py-2">$0.270</td></tr>
      <tr><td class="py-2 pr-4 text-red-400">重型</td><td class="py-2 pr-4">SW MegaMan 8.5mil</td><td class="py-2 pr-4">8.5 mil</td><td class="py-2">$0.57–0.64</td></tr>
    </tbody>
  </table>
</div>
<h4 class="mt-6 font-semibold text-sm uppercase tracking-wider text-muted">USP竞争定位</h4>
<div class="mt-3 space-y-2 text-sm">
  <div class="flex items-start gap-2"><span class="text-emerald-400">✓</span><span><strong>检查手套（3.0–3.5 mil）：</strong>中端价位有竞争力，$0.084–$0.096</span></div>
  <div class="flex items-start gap-2"><span class="text-yellow-400">⚠</span><span><strong>抗芬太尼 5.0 mil：</strong>$0.114 对比经济型$0.049——2.3倍溢价需要合理化</span></div>
  <div class="flex items-start gap-2"><span class="text-emerald-400">✓</span><span><strong>加长袖口 12"：</strong>$0.120–$0.208 显著低于市场价（$0.270–$0.378）——强性价比</span></div>
</div>`,
      },
      {
        id: "market-segments",
        title: "Market Segments & Demand Evidence",
        titleZh: "市场细分与需求验证",
        content: `<div class="overflow-x-auto">
  <table class="w-full text-sm">
    <thead><tr class="border-b border-card-border text-left text-muted"><th class="pb-2 pr-4">Segment</th><th class="pb-2 pr-4">Demand</th><th class="pb-2">Key Driver</th></tr></thead>
    <tbody class="divide-y divide-card-border">
      <tr><td class="py-2 pr-4 font-medium">Healthcare</td><td class="py-2 pr-4"><span class="rounded bg-emerald-400/10 px-2 py-0.5 text-xs text-emerald-400">STRONG</span></td><td class="py-2">OSHA mandates; 30–50 gloves/bed/day; 60–82% of US nitrile</td></tr>
      <tr><td class="py-2 pr-4 font-medium">Dental</td><td class="py-2 pr-4"><span class="rounded bg-emerald-400/10 px-2 py-0.5 text-xs text-emerald-400">STRONG</span></td><td class="py-2">Triple mandate (OSHA + CDC + ADA); 177,559 practices; 18.3% of US nitrile</td></tr>
      <tr><td class="py-2 pr-4 font-medium">Food Service</td><td class="py-2 pr-4"><span class="rounded bg-emerald-400/10 px-2 py-0.5 text-xs text-emerald-400">STRONG</span></td><td class="py-2">FDA bare-hand prohibition; 78% fast-food chains use nitrile</td></tr>
      <tr><td class="py-2 pr-4 font-medium">Tattoo</td><td class="py-2 pr-4"><span class="rounded bg-emerald-400/10 px-2 py-0.5 text-xs text-emerald-400">STRONG</span></td><td class="py-2">OSHA Bloodborne Pathogens; 23,000+ shops; black nitrile standard</td></tr>
      <tr><td class="py-2 pr-4 font-medium">Law Enforcement</td><td class="py-2 pr-4"><span class="rounded bg-yellow-400/10 px-2 py-0.5 text-xs text-yellow-400">MODERATE</span></td><td class="py-2">NIOSH/CDC/DEA fentanyl guidance; H.R.621 grants</td></tr>
      <tr><td class="py-2 pr-4 font-medium">Nail/Salon</td><td class="py-2 pr-4"><span class="rounded bg-yellow-400/10 px-2 py-0.5 text-xs text-yellow-400">MODERATE</span></td><td class="py-2">NY state mandates nitrile; 65,000–118,000 salons</td></tr>
      <tr><td class="py-2 pr-4 font-medium">Cannabis</td><td class="py-2 pr-4"><span class="rounded bg-gray-400/10 px-2 py-0.5 text-xs text-gray-400">WEAK–MOD</span></td><td class="py-2">~15,000 dispensaries; no federal mandate</td></tr>
    </tbody>
  </table>
</div>
<div class="mt-4 rounded-lg border border-emerald-400/30 bg-emerald-400/5 p-4 text-sm">
  <strong class="text-emerald-400">Volume Insight:</strong> A single 3-hospital system consumed 41 million gloves in 2023, spending $2.2M. GPO contracts are active — Vizient with Sri Trang + SafeSource Direct, Premier with Honeywell for 750M gloves.
</div>`,
        contentZh: `<div class="overflow-x-auto">
  <table class="w-full text-sm">
    <thead><tr class="border-b border-card-border text-left text-muted"><th class="pb-2 pr-4">细分市场</th><th class="pb-2 pr-4">需求</th><th class="pb-2">关键驱动因素</th></tr></thead>
    <tbody class="divide-y divide-card-border">
      <tr><td class="py-2 pr-4 font-medium">医疗保健</td><td class="py-2 pr-4"><span class="rounded bg-emerald-400/10 px-2 py-0.5 text-xs text-emerald-400">强劲</span></td><td class="py-2">OSHA规定；每张病床每天30-50只；占美国丁腈的60–82%</td></tr>
      <tr><td class="py-2 pr-4 font-medium">牙科</td><td class="py-2 pr-4"><span class="rounded bg-emerald-400/10 px-2 py-0.5 text-xs text-emerald-400">强劲</span></td><td class="py-2">三重规定（OSHA + CDC + ADA）；177,559家诊所；占美国丁腈的18.3%</td></tr>
      <tr><td class="py-2 pr-4 font-medium">餐饮服务</td><td class="py-2 pr-4"><span class="rounded bg-emerald-400/10 px-2 py-0.5 text-xs text-emerald-400">强劲</span></td><td class="py-2">FDA禁止徒手接触食物；78%快餐连锁使用丁腈</td></tr>
      <tr><td class="py-2 pr-4 font-medium">纹身</td><td class="py-2 pr-4"><span class="rounded bg-emerald-400/10 px-2 py-0.5 text-xs text-emerald-400">强劲</span></td><td class="py-2">OSHA血源性病原体标准；23,000+家店；黑色丁腈为行业标准</td></tr>
      <tr><td class="py-2 pr-4 font-medium">执法</td><td class="py-2 pr-4"><span class="rounded bg-yellow-400/10 px-2 py-0.5 text-xs text-yellow-400">中等</span></td><td class="py-2">NIOSH/CDC/DEA芬太尼指南；H.R.621拨款</td></tr>
      <tr><td class="py-2 pr-4 font-medium">美甲/沙龙</td><td class="py-2 pr-4"><span class="rounded bg-yellow-400/10 px-2 py-0.5 text-xs text-yellow-400">中等</span></td><td class="py-2">纽约州强制使用丁腈；65,000–118,000家沙龙</td></tr>
      <tr><td class="py-2 pr-4 font-medium">大麻</td><td class="py-2 pr-4"><span class="rounded bg-gray-400/10 px-2 py-0.5 text-xs text-gray-400">弱–中</span></td><td class="py-2">~15,000家药房；无联邦强制要求</td></tr>
    </tbody>
  </table>
</div>
<div class="mt-4 rounded-lg border border-emerald-400/30 bg-emerald-400/5 p-4 text-sm">
  <strong class="text-emerald-400">用量洞察：</strong>单个3家医院系统在2023年消耗了4100万只手套，花费$220万。GPO合同活跃——Vizient与Sri Trang + SafeSource Direct合作，Premier与Honeywell签订7.5亿只手套合同。
</div>`,
      },
      {
        id: "swot-analysis",
        title: "SWOT Analysis",
        titleZh: "SWOT分析",
        content: `<div class="grid gap-4 sm:grid-cols-2">
  <div class="rounded-lg border border-emerald-400/30 bg-emerald-400/5 p-4">
    <h4 class="font-semibold text-emerald-400 text-sm mb-3">Strengths</h4>
    <ul class="space-y-2 text-sm">
      <li>Full product range: 11 SKUs (3.0–6.0 mil + 12" extended cuff)</li>
      <li>Competitive mid-range exam glove pricing ($0.084)</li>
      <li>Strong extended-cuff value proposition</li>
      <li>Multi-channel: Website + Amazon + Walmart</li>
      <li>ASTM D6978 chemo & fentanyl positioning</li>
      <li>Color variety for medical, tattoo, salon segments</li>
    </ul>
  </div>
  <div class="rounded-lg border border-red-400/30 bg-red-400/5 p-4">
    <h4 class="font-semibold text-red-400 text-sm mb-3">Weaknesses</h4>
    <ul class="space-y-2 text-sm">
      <li>No verifiable corporate history (no BBB, Trustpilot, LinkedIn)</li>
      <li>ASTM D6878 certification error (roofing standard on 7 products)</li>
      <li>FDA 510(k) not traceable to company</li>
      <li>27% product stock-out rate</li>
      <li>"Nitrite" typo on product pages</li>
      <li>About Us page returns 404 error</li>
    </ul>
  </div>
  <div class="rounded-lg border border-blue-400/30 bg-blue-400/5 p-4">
    <h4 class="font-semibold text-blue-400 text-sm mb-3">Opportunities</h4>
    <ul class="space-y-2 text-sm">
      <li>Tariff-driven supply disruption (China 38.9% → 2.8%)</li>
      <li>CMS domestic PPE Medicare payment premium</li>
      <li>Vinyl-to-nitrile conversion in food service</li>
      <li>Fentanyl protection demand (H.R.621 grants)</li>
      <li>SHOWA Alabama closure reduces competitors</li>
      <li>GPO contract pipeline (Vizient, Premier, HealthTrust)</li>
    </ul>
  </div>
  <div class="rounded-lg border border-amber-400/30 bg-amber-400/5 p-4">
    <h4 class="font-semibold text-amber-400 text-sm mb-3">Threats</h4>
    <ul class="space-y-2 text-sm">
      <li>Tariff uncertainty — reciprocal tariffs subject to change</li>
      <li>Intense budget-tier competition ($0.040–$0.049/glove)</li>
      <li>Established distributor relationships (McKesson, Cardinal, O&M)</li>
      <li>Scientific pushback on fentanyl skin absorption claims</li>
      <li>Credibility gap for institutional buyers</li>
      <li>CMS rule may favor true domestic manufacturers</li>
    </ul>
  </div>
</div>`,
        contentZh: `<div class="grid gap-4 sm:grid-cols-2">
  <div class="rounded-lg border border-emerald-400/30 bg-emerald-400/5 p-4">
    <h4 class="font-semibold text-emerald-400 text-sm mb-3">优势</h4>
    <ul class="space-y-2 text-sm">
      <li>全产品线：11个SKU（3.0–6.0 mil + 12"加长袖口）</li>
      <li>中端检查手套定价有竞争力（$0.084）</li>
      <li>加长袖口产品性价比突出</li>
      <li>多渠道：官网 + 亚马逊 + 沃尔玛</li>
      <li>ASTM D6978化疗&芬太尼定位</li>
      <li>多色可选，覆盖医疗、纹身、沙龙细分</li>
    </ul>
  </div>
  <div class="rounded-lg border border-red-400/30 bg-red-400/5 p-4">
    <h4 class="font-semibold text-red-400 text-sm mb-3">劣势</h4>
    <ul class="space-y-2 text-sm">
      <li>无可验证的企业历史（无BBB、Trustpilot、LinkedIn）</li>
      <li>ASTM D6878认证错误（7个产品标注了屋顶膜标准）</li>
      <li>FDA 510(k)无法追溯至公司</li>
      <li>27%的产品缺货率</li>
      <li>产品页面"Nitrite"拼写错误</li>
      <li>关于我们页面返回404错误</li>
    </ul>
  </div>
  <div class="rounded-lg border border-blue-400/30 bg-blue-400/5 p-4">
    <h4 class="font-semibold text-blue-400 text-sm mb-3">机会</h4>
    <ul class="space-y-2 text-sm">
      <li>关税驱动的供应中断（中国从38.9%降至2.8%）</li>
      <li>CMS国内PPE Medicare支付溢价</li>
      <li>餐饮服务中PVC转丁腈趋势</li>
      <li>芬太尼防护需求（H.R.621拨款）</li>
      <li>SHOWA阿拉巴马工厂关闭减少竞争者</li>
      <li>GPO合同管线（Vizient、Premier、HealthTrust）</li>
    </ul>
  </div>
  <div class="rounded-lg border border-amber-400/30 bg-amber-400/5 p-4">
    <h4 class="font-semibold text-amber-400 text-sm mb-3">威胁</h4>
    <ul class="space-y-2 text-sm">
      <li>关税不确定性——对等关税可能变化</li>
      <li>经济型竞争激烈（$0.040–$0.049/只）</li>
      <li>成熟的分销商关系（McKesson、Cardinal、O&M）</li>
      <li>芬太尼皮肤吸收说法面临科学质疑</li>
      <li>机构买家的信誉差距</li>
      <li>CMS规则可能偏向真正的国内制造商</li>
    </ul>
  </div>
</div>`,
      },
      {
        id: "buyer-directory",
        title: "Verified Buyer Directory (30 Buyers)",
        titleZh: "采购商名录",
        content: `<p class="text-sm text-muted mb-4">All buyers verified via direct website inspection. Organized by category with Gold/Silver/Bronze verification tiers.</p>
<div class="space-y-6">
  <div>
    <h4 class="font-semibold text-sm uppercase tracking-wider text-muted mb-3">Medical Distributors</h4>
    <div class="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      <div class="rounded-lg border border-card-border bg-background p-3"><div class="flex items-center gap-2"><span class="rounded bg-amber-400/20 px-1.5 py-0.5 text-xs text-amber-400">Gold</span><span class="text-sm font-medium">McKesson</span></div><div class="mt-1 text-xs text-muted">#1 US healthcare distributor. Own-brand gloves.</div></div>
      <div class="rounded-lg border border-card-border bg-background p-3"><div class="flex items-center gap-2"><span class="rounded bg-amber-400/20 px-1.5 py-0.5 text-xs text-amber-400">Gold</span><span class="text-sm font-medium">Cardinal Health</span></div><div class="mt-1 text-xs text-muted">Top-3 distributor. ESTEEM, FLEXAL brands.</div></div>
      <div class="rounded-lg border border-card-border bg-background p-3"><div class="flex items-center gap-2"><span class="rounded bg-amber-400/20 px-1.5 py-0.5 text-xs text-amber-400">Gold</span><span class="text-sm font-medium">Owens & Minor</span></div><div class="mt-1 text-xs text-muted">Major distributor with Halyard portfolio.</div></div>
      <div class="rounded-lg border border-card-border bg-background p-3"><div class="flex items-center gap-2"><span class="rounded bg-gray-400/20 px-1.5 py-0.5 text-xs text-gray-400">Silver</span><span class="text-sm font-medium">NDC Inc.</span></div><div class="mt-1 text-xs text-muted">Mid-size national; vendor portal operational.</div></div>
      <div class="rounded-lg border border-card-border bg-background p-3"><div class="flex items-center gap-2"><span class="rounded bg-gray-400/20 px-1.5 py-0.5 text-xs text-gray-400">Silver</span><span class="text-sm font-medium">Concordance Healthcare</span></div><div class="mt-1 text-xs text-muted">Active nitrile glove program.</div></div>
    </div>
  </div>
  <div>
    <h4 class="font-semibold text-sm uppercase tracking-wider text-muted mb-3">Dental Distributors</h4>
    <div class="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      <div class="rounded-lg border border-card-border bg-background p-3"><div class="flex items-center gap-2"><span class="rounded bg-amber-400/20 px-1.5 py-0.5 text-xs text-amber-400">Gold</span><span class="text-sm font-medium">Henry Schein</span></div><div class="mt-1 text-xs text-muted">#1 dental distributor globally.</div></div>
      <div class="rounded-lg border border-card-border bg-background p-3"><div class="flex items-center gap-2"><span class="rounded bg-amber-400/20 px-1.5 py-0.5 text-xs text-amber-400">Gold</span><span class="text-sm font-medium">Patterson Dental</span></div><div class="mt-1 text-xs text-muted">#2 dental distributor.</div></div>
      <div class="rounded-lg border border-card-border bg-background p-3"><div class="flex items-center gap-2"><span class="rounded bg-amber-400/20 px-1.5 py-0.5 text-xs text-amber-400">Gold</span><span class="text-sm font-medium">Benco Dental</span></div><div class="mt-1 text-xs text-muted">#3 dental distributor, family-owned.</div></div>
    </div>
  </div>
  <div>
    <h4 class="font-semibold text-sm uppercase tracking-wider text-muted mb-3">Industrial Distributors</h4>
    <div class="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      <div class="rounded-lg border border-card-border bg-background p-3"><div class="flex items-center gap-2"><span class="rounded bg-amber-400/20 px-1.5 py-0.5 text-xs text-amber-400">Gold</span><span class="text-sm font-medium">Grainger</span></div><div class="mt-1 text-xs text-muted">Largest US industrial distributor, $16B+ revenue.</div></div>
      <div class="rounded-lg border border-card-border bg-background p-3"><div class="flex items-center gap-2"><span class="rounded bg-amber-400/20 px-1.5 py-0.5 text-xs text-amber-400">Gold</span><span class="text-sm font-medium">Fastenal</span></div><div class="mt-1 text-xs text-muted">3,300+ locations.</div></div>
      <div class="rounded-lg border border-card-border bg-background p-3"><div class="flex items-center gap-2"><span class="rounded bg-amber-400/20 px-1.5 py-0.5 text-xs text-amber-400">Gold</span><span class="text-sm font-medium">Uline</span></div><div class="mt-1 text-xs text-muted">Major catalog distributor, same-day ship.</div></div>
      <div class="rounded-lg border border-card-border bg-background p-3"><div class="flex items-center gap-2"><span class="rounded bg-amber-400/20 px-1.5 py-0.5 text-xs text-amber-400">Gold</span><span class="text-sm font-medium">MSC Industrial</span></div><div class="mt-1 text-xs text-muted">$3.5B+ distributor.</div></div>
    </div>
  </div>
  <div>
    <h4 class="font-semibold text-sm uppercase tracking-wider text-muted mb-3">GPOs & Government</h4>
    <div class="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      <div class="rounded-lg border border-card-border bg-background p-3"><div class="flex items-center gap-2"><span class="rounded bg-amber-400/20 px-1.5 py-0.5 text-xs text-amber-400">Gold</span><span class="text-sm font-medium">Vizient</span></div><div class="mt-1 text-xs text-muted">~50% of US hospital purchasing.</div></div>
      <div class="rounded-lg border border-card-border bg-background p-3"><div class="flex items-center gap-2"><span class="rounded bg-amber-400/20 px-1.5 py-0.5 text-xs text-amber-400">Gold</span><span class="text-sm font-medium">Premier Inc.</span></div><div class="mt-1 text-xs text-muted">~4,400 hospitals. Now private ($2.6B acquisition).</div></div>
      <div class="rounded-lg border border-card-border bg-background p-3"><div class="flex items-center gap-2"><span class="rounded bg-amber-400/20 px-1.5 py-0.5 text-xs text-amber-400">Gold</span><span class="text-sm font-medium">HealthTrust</span></div><div class="mt-1 text-xs text-muted">HCA's GPO; 1,800 hospitals + 55,000 sites.</div></div>
      <div class="rounded-lg border border-card-border bg-background p-3"><div class="flex items-center gap-2"><span class="rounded bg-amber-400/20 px-1.5 py-0.5 text-xs text-amber-400">Gold</span><span class="text-sm font-medium">SAM.gov</span></div><div class="mt-1 text-xs text-muted">Federal procurement platform. Required for federal contracts.</div></div>
      <div class="rounded-lg border border-card-border bg-background p-3"><div class="flex items-center gap-2"><span class="rounded bg-amber-400/20 px-1.5 py-0.5 text-xs text-amber-400">Gold</span><span class="text-sm font-medium">NASPO ValuePoint</span></div><div class="mt-1 text-xs text-muted">Single contract covers all 50 states.</div></div>
    </div>
  </div>
  <div class="rounded-lg border border-card-border bg-background p-4 text-sm">
    <strong>Tier Summary:</strong> 20 Gold (fully verified) · 7 Silver (partially verified) · 3 Bronze (needs manual verification)
  </div>
</div>`,
        contentZh: `<p class="text-sm text-muted mb-4">所有采购商均通过直接网站核查验证。按类别组织，分为金牌/银牌/铜牌验证级别。</p>
<div class="space-y-6">
  <div>
    <h4 class="font-semibold text-sm uppercase tracking-wider text-muted mb-3">医疗分销商</h4>
    <div class="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      <div class="rounded-lg border border-card-border bg-background p-3"><div class="flex items-center gap-2"><span class="rounded bg-amber-400/20 px-1.5 py-0.5 text-xs text-amber-400">金牌</span><span class="text-sm font-medium">McKesson</span></div><div class="mt-1 text-xs text-muted">美国第一大医疗分销商。拥有自有品牌手套。</div></div>
      <div class="rounded-lg border border-card-border bg-background p-3"><div class="flex items-center gap-2"><span class="rounded bg-amber-400/20 px-1.5 py-0.5 text-xs text-amber-400">金牌</span><span class="text-sm font-medium">Cardinal Health</span></div><div class="mt-1 text-xs text-muted">前三大分销商。ESTEEM、FLEXAL品牌。</div></div>
      <div class="rounded-lg border border-card-border bg-background p-3"><div class="flex items-center gap-2"><span class="rounded bg-amber-400/20 px-1.5 py-0.5 text-xs text-amber-400">金牌</span><span class="text-sm font-medium">Owens & Minor</span></div><div class="mt-1 text-xs text-muted">主要分销商，拥有Halyard产品组合。</div></div>
      <div class="rounded-lg border border-card-border bg-background p-3"><div class="flex items-center gap-2"><span class="rounded bg-gray-400/20 px-1.5 py-0.5 text-xs text-gray-400">银牌</span><span class="text-sm font-medium">NDC Inc.</span></div><div class="mt-1 text-xs text-muted">中型全国分销商；供应商门户可用。</div></div>
      <div class="rounded-lg border border-card-border bg-background p-3"><div class="flex items-center gap-2"><span class="rounded bg-gray-400/20 px-1.5 py-0.5 text-xs text-gray-400">银牌</span><span class="text-sm font-medium">Concordance Healthcare</span></div><div class="mt-1 text-xs text-muted">活跃的丁腈手套项目。</div></div>
    </div>
  </div>
  <div>
    <h4 class="font-semibold text-sm uppercase tracking-wider text-muted mb-3">牙科分销商</h4>
    <div class="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      <div class="rounded-lg border border-card-border bg-background p-3"><div class="flex items-center gap-2"><span class="rounded bg-amber-400/20 px-1.5 py-0.5 text-xs text-amber-400">金牌</span><span class="text-sm font-medium">Henry Schein</span></div><div class="mt-1 text-xs text-muted">全球第一大牙科分销商。</div></div>
      <div class="rounded-lg border border-card-border bg-background p-3"><div class="flex items-center gap-2"><span class="rounded bg-amber-400/20 px-1.5 py-0.5 text-xs text-amber-400">金牌</span><span class="text-sm font-medium">Patterson Dental</span></div><div class="mt-1 text-xs text-muted">第二大牙科分销商。</div></div>
      <div class="rounded-lg border border-card-border bg-background p-3"><div class="flex items-center gap-2"><span class="rounded bg-amber-400/20 px-1.5 py-0.5 text-xs text-amber-400">金牌</span><span class="text-sm font-medium">Benco Dental</span></div><div class="mt-1 text-xs text-muted">第三大牙科分销商，家族企业。</div></div>
    </div>
  </div>
  <div>
    <h4 class="font-semibold text-sm uppercase tracking-wider text-muted mb-3">工业分销商</h4>
    <div class="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      <div class="rounded-lg border border-card-border bg-background p-3"><div class="flex items-center gap-2"><span class="rounded bg-amber-400/20 px-1.5 py-0.5 text-xs text-amber-400">金牌</span><span class="text-sm font-medium">Grainger</span></div><div class="mt-1 text-xs text-muted">美国最大工业分销商，$160亿+营收。</div></div>
      <div class="rounded-lg border border-card-border bg-background p-3"><div class="flex items-center gap-2"><span class="rounded bg-amber-400/20 px-1.5 py-0.5 text-xs text-amber-400">金牌</span><span class="text-sm font-medium">Fastenal</span></div><div class="mt-1 text-xs text-muted">3,300+个网点。</div></div>
      <div class="rounded-lg border border-card-border bg-background p-3"><div class="flex items-center gap-2"><span class="rounded bg-amber-400/20 px-1.5 py-0.5 text-xs text-amber-400">金牌</span><span class="text-sm font-medium">Uline</span></div><div class="mt-1 text-xs text-muted">主要目录分销商，当日发货。</div></div>
      <div class="rounded-lg border border-card-border bg-background p-3"><div class="flex items-center gap-2"><span class="rounded bg-amber-400/20 px-1.5 py-0.5 text-xs text-amber-400">金牌</span><span class="text-sm font-medium">MSC Industrial</span></div><div class="mt-1 text-xs text-muted">$35亿+分销商。</div></div>
    </div>
  </div>
  <div>
    <h4 class="font-semibold text-sm uppercase tracking-wider text-muted mb-3">GPO和政府</h4>
    <div class="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      <div class="rounded-lg border border-card-border bg-background p-3"><div class="flex items-center gap-2"><span class="rounded bg-amber-400/20 px-1.5 py-0.5 text-xs text-amber-400">金牌</span><span class="text-sm font-medium">Vizient</span></div><div class="mt-1 text-xs text-muted">约占美国医院采购的50%。</div></div>
      <div class="rounded-lg border border-card-border bg-background p-3"><div class="flex items-center gap-2"><span class="rounded bg-amber-400/20 px-1.5 py-0.5 text-xs text-amber-400">金牌</span><span class="text-sm font-medium">Premier Inc.</span></div><div class="mt-1 text-xs text-muted">约4,400家医院。现已私有化（$26亿收购）。</div></div>
      <div class="rounded-lg border border-card-border bg-background p-3"><div class="flex items-center gap-2"><span class="rounded bg-amber-400/20 px-1.5 py-0.5 text-xs text-amber-400">金牌</span><span class="text-sm font-medium">HealthTrust</span></div><div class="mt-1 text-xs text-muted">HCA旗下GPO；1,800家医院 + 55,000个站点。</div></div>
      <div class="rounded-lg border border-card-border bg-background p-3"><div class="flex items-center gap-2"><span class="rounded bg-amber-400/20 px-1.5 py-0.5 text-xs text-amber-400">金牌</span><span class="text-sm font-medium">SAM.gov</span></div><div class="mt-1 text-xs text-muted">联邦采购平台。联邦合同必需注册。</div></div>
      <div class="rounded-lg border border-card-border bg-background p-3"><div class="flex items-center gap-2"><span class="rounded bg-amber-400/20 px-1.5 py-0.5 text-xs text-amber-400">金牌</span><span class="text-sm font-medium">NASPO ValuePoint</span></div><div class="mt-1 text-xs text-muted">单一合同覆盖全部50个州。</div></div>
    </div>
  </div>
  <div class="rounded-lg border border-card-border bg-background p-4 text-sm">
    <strong>级别汇总：</strong>20个金牌（完全验证）· 7个银牌（部分验证）· 3个铜牌（需人工验证）
  </div>
</div>`,
      },
      {
        id: "action-plan",
        title: "Go-to-Market Action Plan",
        titleZh: "行动计划",
        content: `<div class="space-y-6">
  <div>
    <h4 class="font-semibold text-sm uppercase tracking-wider text-red-400 mb-3">Immediate (0–30 Days)</h4>
    <div class="space-y-2">
      <div class="flex items-start gap-3 rounded-lg border border-card-border bg-background p-3 text-sm"><span class="rounded bg-red-400/20 px-1.5 py-0.5 text-xs text-red-400 shrink-0">CRITICAL</span><span>Correct ASTM D6878 → D6978 on all 7 affected product pages</span></div>
      <div class="flex items-start gap-3 rounded-lg border border-card-border bg-background p-3 text-sm"><span class="rounded bg-red-400/20 px-1.5 py-0.5 text-xs text-red-400 shrink-0">CRITICAL</span><span>Fix "Nitrite" typo to "Nitrile" on 2 product pages</span></div>
      <div class="flex items-start gap-3 rounded-lg border border-card-border bg-background p-3 text-sm"><span class="rounded bg-red-400/20 px-1.5 py-0.5 text-xs text-red-400 shrink-0">CRITICAL</span><span>Restore or create About Us page (currently 404)</span></div>
      <div class="flex items-start gap-3 rounded-lg border border-card-border bg-background p-3 text-sm"><span class="rounded bg-amber-400/20 px-1.5 py-0.5 text-xs text-amber-400 shrink-0">HIGH</span><span>Submit CMS ANPRM comment by March 30, 2026</span></div>
      <div class="flex items-start gap-3 rounded-lg border border-card-border bg-background p-3 text-sm"><span class="rounded bg-amber-400/20 px-1.5 py-0.5 text-xs text-amber-400 shrink-0">HIGH</span><span>Register on SAM.gov for federal contracting</span></div>
    </div>
  </div>
  <div>
    <h4 class="font-semibold text-sm uppercase tracking-wider text-amber-400 mb-3">Short-Term (30–90 Days)</h4>
    <div class="space-y-2">
      <div class="flex items-start gap-3 rounded-lg border border-card-border bg-background p-3 text-sm"><span class="rounded bg-amber-400/20 px-1.5 py-0.5 text-xs text-amber-400 shrink-0">HIGH</span><span>Apply to industrial supplier portals: Uline, Grainger, MSC, Fastenal</span></div>
      <div class="flex items-start gap-3 rounded-lg border border-card-border bg-background p-3 text-sm"><span class="rounded bg-amber-400/20 px-1.5 py-0.5 text-xs text-amber-400 shrink-0">HIGH</span><span>Contact Concordance Healthcare re: Nitrile Glove Program</span></div>
      <div class="flex items-start gap-3 rounded-lg border border-card-border bg-background p-3 text-sm"><span class="rounded bg-amber-400/20 px-1.5 py-0.5 text-xs text-amber-400 shrink-0">HIGH</span><span>Submit vendor applications to dental Big 3: Henry Schein, Patterson, Benco</span></div>
      <div class="flex items-start gap-3 rounded-lg border border-card-border bg-background p-3 text-sm"><span class="rounded bg-blue-400/20 px-1.5 py-0.5 text-xs text-blue-400 shrink-0">MEDIUM</span><span>Establish BBB profile and Trustpilot presence</span></div>
    </div>
  </div>
  <div>
    <h4 class="font-semibold text-sm uppercase tracking-wider text-blue-400 mb-3">Medium-Term (90–180 Days)</h4>
    <div class="space-y-2">
      <div class="flex items-start gap-3 rounded-lg border border-card-border bg-background p-3 text-sm"><span class="rounded bg-amber-400/20 px-1.5 py-0.5 text-xs text-amber-400 shrink-0">HIGH</span><span>Apply to Georgia DOAS Team Georgia Marketplace (home-state advantage)</span></div>
      <div class="flex items-start gap-3 rounded-lg border border-card-border bg-background p-3 text-sm"><span class="rounded bg-amber-400/20 px-1.5 py-0.5 text-xs text-amber-400 shrink-0">HIGH</span><span>Pursue NASPO ValuePoint or Sourcewell cooperative contract</span></div>
      <div class="flex items-start gap-3 rounded-lg border border-card-border bg-background p-3 text-sm"><span class="rounded bg-amber-400/20 px-1.5 py-0.5 text-xs text-amber-400 shrink-0">HIGH</span><span>Engage Vizient bidmanagement platform</span></div>
      <div class="flex items-start gap-3 rounded-lg border border-card-border bg-background p-3 text-sm"><span class="rounded bg-blue-400/20 px-1.5 py-0.5 text-xs text-blue-400 shrink-0">MEDIUM</span><span>Develop law enforcement fentanyl sales materials (NIOSH/CDC/DEA citations)</span></div>
    </div>
  </div>
  <div>
    <h4 class="font-semibold text-sm uppercase tracking-wider text-purple-400 mb-3">Long-Term (180–365 Days)</h4>
    <div class="space-y-2">
      <div class="flex items-start gap-3 rounded-lg border border-card-border bg-background p-3 text-sm"><span class="rounded bg-amber-400/20 px-1.5 py-0.5 text-xs text-amber-400 shrink-0">HIGH</span><span>Approach Big 3 medical distributors: McKesson, Cardinal Health, Owens & Minor</span></div>
      <div class="flex items-start gap-3 rounded-lg border border-card-border bg-background p-3 text-sm"><span class="rounded bg-blue-400/20 px-1.5 py-0.5 text-xs text-blue-400 shrink-0">MEDIUM</span><span>Evaluate domestic manufacturing or assembly model for CMS/Berry compliance</span></div>
    </div>
  </div>
</div>
<h4 class="mt-6 font-semibold text-sm uppercase tracking-wider text-muted">Pricing Strategy Recommendations</h4>
<div class="mt-3 overflow-x-auto">
  <table class="w-full text-sm">
    <thead><tr class="border-b border-card-border text-left text-muted"><th class="pb-2 pr-4">Segment</th><th class="pb-2">Recommendation</th></tr></thead>
    <tbody class="divide-y divide-card-border">
      <tr><td class="py-2 pr-4 font-medium">Exam (3.0–3.5 mil)</td><td class="py-2">$0.084–$0.096 is competitive. Maintain.</td></tr>
      <tr><td class="py-2 pr-4 font-medium">Fentanyl (5.0 mil)</td><td class="py-2">$0.114 vs budget $0.049. Justify premium with ASTM D6978 data or offer volume discounts.</td></tr>
      <tr><td class="py-2 pr-4 font-medium">Heavy-Duty (6.0 mil)</td><td class="py-2">$0.160 within premium norms. Competitive.</td></tr>
      <tr><td class="py-2 pr-4 font-medium text-emerald-400">Extended Cuff (12")</td><td class="py-2">$0.120–$0.208 well below market. Lead with this in marketing.</td></tr>
    </tbody>
  </table>
</div>`,
        contentZh: `<div class="space-y-6">
  <div>
    <h4 class="font-semibold text-sm uppercase tracking-wider text-red-400 mb-3">立即行动（0-30天）</h4>
    <div class="space-y-2">
      <div class="flex items-start gap-3 rounded-lg border border-card-border bg-background p-3 text-sm"><span class="rounded bg-red-400/20 px-1.5 py-0.5 text-xs text-red-400 shrink-0">紧急</span><span>更正全部7个受影响产品页面上的ASTM D6878 → D6978</span></div>
      <div class="flex items-start gap-3 rounded-lg border border-card-border bg-background p-3 text-sm"><span class="rounded bg-red-400/20 px-1.5 py-0.5 text-xs text-red-400 shrink-0">紧急</span><span>修复2个产品页面上的"Nitrite"拼写错误为"Nitrile"</span></div>
      <div class="flex items-start gap-3 rounded-lg border border-card-border bg-background p-3 text-sm"><span class="rounded bg-red-400/20 px-1.5 py-0.5 text-xs text-red-400 shrink-0">紧急</span><span>恢复或创建关于我们页面（当前404）</span></div>
      <div class="flex items-start gap-3 rounded-lg border border-card-border bg-background p-3 text-sm"><span class="rounded bg-amber-400/20 px-1.5 py-0.5 text-xs text-amber-400 shrink-0">高优</span><span>在2026年3月30日前提交CMS ANPRM评论</span></div>
      <div class="flex items-start gap-3 rounded-lg border border-card-border bg-background p-3 text-sm"><span class="rounded bg-amber-400/20 px-1.5 py-0.5 text-xs text-amber-400 shrink-0">高优</span><span>在SAM.gov注册以参与联邦合同</span></div>
    </div>
  </div>
  <div>
    <h4 class="font-semibold text-sm uppercase tracking-wider text-amber-400 mb-3">短期（30-90天）</h4>
    <div class="space-y-2">
      <div class="flex items-start gap-3 rounded-lg border border-card-border bg-background p-3 text-sm"><span class="rounded bg-amber-400/20 px-1.5 py-0.5 text-xs text-amber-400 shrink-0">高优</span><span>申请工业供应商门户：Uline、Grainger、MSC、Fastenal</span></div>
      <div class="flex items-start gap-3 rounded-lg border border-card-border bg-background p-3 text-sm"><span class="rounded bg-amber-400/20 px-1.5 py-0.5 text-xs text-amber-400 shrink-0">高优</span><span>联系Concordance Healthcare关于丁腈手套项目</span></div>
      <div class="flex items-start gap-3 rounded-lg border border-card-border bg-background p-3 text-sm"><span class="rounded bg-amber-400/20 px-1.5 py-0.5 text-xs text-amber-400 shrink-0">高优</span><span>向牙科三巨头提交供应商申请：Henry Schein、Patterson、Benco</span></div>
      <div class="flex items-start gap-3 rounded-lg border border-card-border bg-background p-3 text-sm"><span class="rounded bg-blue-400/20 px-1.5 py-0.5 text-xs text-blue-400 shrink-0">中优</span><span>建立BBB档案和Trustpilot形象</span></div>
    </div>
  </div>
  <div>
    <h4 class="font-semibold text-sm uppercase tracking-wider text-blue-400 mb-3">中期（90-180天）</h4>
    <div class="space-y-2">
      <div class="flex items-start gap-3 rounded-lg border border-card-border bg-background p-3 text-sm"><span class="rounded bg-amber-400/20 px-1.5 py-0.5 text-xs text-amber-400 shrink-0">高优</span><span>申请佐治亚州DOAS Team Georgia Marketplace（本州优势）</span></div>
      <div class="flex items-start gap-3 rounded-lg border border-card-border bg-background p-3 text-sm"><span class="rounded bg-amber-400/20 px-1.5 py-0.5 text-xs text-amber-400 shrink-0">高优</span><span>争取NASPO ValuePoint或Sourcewell合作合同</span></div>
      <div class="flex items-start gap-3 rounded-lg border border-card-border bg-background p-3 text-sm"><span class="rounded bg-amber-400/20 px-1.5 py-0.5 text-xs text-amber-400 shrink-0">高优</span><span>接入Vizient投标管理平台</span></div>
      <div class="flex items-start gap-3 rounded-lg border border-card-border bg-background p-3 text-sm"><span class="rounded bg-blue-400/20 px-1.5 py-0.5 text-xs text-blue-400 shrink-0">中优</span><span>开发执法机构芬太尼销售材料（引用NIOSH/CDC/DEA）</span></div>
    </div>
  </div>
  <div>
    <h4 class="font-semibold text-sm uppercase tracking-wider text-purple-400 mb-3">长期（180-365天）</h4>
    <div class="space-y-2">
      <div class="flex items-start gap-3 rounded-lg border border-card-border bg-background p-3 text-sm"><span class="rounded bg-amber-400/20 px-1.5 py-0.5 text-xs text-amber-400 shrink-0">高优</span><span>接洽三大医疗分销商：McKesson、Cardinal Health、Owens & Minor</span></div>
      <div class="flex items-start gap-3 rounded-lg border border-card-border bg-background p-3 text-sm"><span class="rounded bg-blue-400/20 px-1.5 py-0.5 text-xs text-blue-400 shrink-0">中优</span><span>评估国内制造或组装模式以符合CMS/Berry合规要求</span></div>
    </div>
  </div>
</div>
<h4 class="mt-6 font-semibold text-sm uppercase tracking-wider text-muted">定价策略建议</h4>
<div class="mt-3 overflow-x-auto">
  <table class="w-full text-sm">
    <thead><tr class="border-b border-card-border text-left text-muted"><th class="pb-2 pr-4">细分</th><th class="pb-2">建议</th></tr></thead>
    <tbody class="divide-y divide-card-border">
      <tr><td class="py-2 pr-4 font-medium">检查级（3.0–3.5 mil）</td><td class="py-2">$0.084–$0.096有竞争力。维持现价。</td></tr>
      <tr><td class="py-2 pr-4 font-medium">抗芬太尼（5.0 mil）</td><td class="py-2">$0.114对比经济型$0.049。需用ASTM D6978数据证明溢价合理性或提供批量折扣。</td></tr>
      <tr><td class="py-2 pr-4 font-medium">重型（6.0 mil）</td><td class="py-2">$0.160在高端区间内。有竞争力。</td></tr>
      <tr><td class="py-2 pr-4 font-medium text-emerald-400">加长袖口（12"）</td><td class="py-2">$0.120–$0.208远低于市场价。在营销中主推此产品。</td></tr>
    </tbody>
  </table>
</div>`,
      },
    ],
  },
  {
    slug: "88baobao-market-expansion",
    industrySlug: "restaurant",
    moduleSlug: "strategy",
    title: "88 BaoBao: Dim Sum Chain Market Expansion Study",
    titleZh: "88包包：点心连锁市场扩张研究",
    subtitle:
      "A market analysis of 88 BaoBao, a family-owned dim sum chain expanding from the San Francisco Bay Area across California, Texas, and Oklahoma — covering brand positioning, menu strategy, competitive landscape, and multi-state growth playbook.",
    subtitleZh:
      "对88包包的市场分析——一家从旧金山湾区扩展到加州、德州和俄克拉荷马州的家族式点心连锁品牌，涵盖品牌定位、菜单策略、竞争格局和跨州增长战略。",
    date: "March 28, 2026",
    readTime: "18 min read",
    heroColor: "#ef4444",
    sections: [
      {
        id: "executive-summary",
        title: "Executive Summary",
        titleZh: "摘要",
        content: `<p>88 BaoBao is a fast-growing, family-owned dim sum restaurant chain founded in 2018 by <strong>Kevin Chen</strong> in Dublin, California. Specializing in hand-made Xiao Long Bao (soup dumplings), bao buns, and fresh dim sum, the brand has grown from a single Bay Area location to <strong>10+ locations across 3 states</strong> — California, Texas, and Oklahoma — in under 8 years.</p>
<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-6">
  <div class="rounded-lg border border-card-border bg-background p-4 text-center">
    <div class="text-2xl font-bold text-red-400">10+</div>
    <div class="text-xs text-muted mt-1">Restaurant<br/>Locations</div>
  </div>
  <div class="rounded-lg border border-card-border bg-background p-4 text-center">
    <div class="text-2xl font-bold text-red-400">3 States</div>
    <div class="text-xs text-muted mt-1">CA · TX · OK<br/>Multi-State Footprint</div>
  </div>
  <div class="rounded-lg border border-card-border bg-background p-4 text-center">
    <div class="text-2xl font-bold text-red-400">$10–$15</div>
    <div class="text-xs text-muted mt-1">Average Price<br/>Per Person</div>
  </div>
  <div class="rounded-lg border border-card-border bg-background p-4 text-center">
    <div class="text-2xl font-bold text-red-400">4,000+</div>
    <div class="text-xs text-muted mt-1">Combined<br/>Online Reviews</div>
  </div>
</div>`,
        contentZh: `<p>88包包是一家快速增长的家族式点心连锁餐厅，由<strong>Kevin Chen</strong>于2018年在加州Dublin创立。专注于手工制作小笼包、包子和新鲜点心，品牌已从湾区单一门店发展到<strong>横跨3个州的10余家门店</strong>——加州、德州和俄克拉荷马州——用时不到8年。</p>
<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-6">
  <div class="rounded-lg border border-card-border bg-background p-4 text-center">
    <div class="text-2xl font-bold text-red-400">10+</div>
    <div class="text-xs text-muted mt-1">餐厅<br/>门店</div>
  </div>
  <div class="rounded-lg border border-card-border bg-background p-4 text-center">
    <div class="text-2xl font-bold text-red-400">3个州</div>
    <div class="text-xs text-muted mt-1">加州 · 德州 · 俄克拉荷马<br/>跨州布局</div>
  </div>
  <div class="rounded-lg border border-card-border bg-background p-4 text-center">
    <div class="text-2xl font-bold text-red-400">$10–$15</div>
    <div class="text-xs text-muted mt-1">人均<br/>消费</div>
  </div>
  <div class="rounded-lg border border-card-border bg-background p-4 text-center">
    <div class="text-2xl font-bold text-red-400">4,000+</div>
    <div class="text-xs text-muted mt-1">综合<br/>在线评价</div>
  </div>
</div>`,
      },
      {
        id: "company-profile",
        title: "Company Profile",
        titleZh: "公司概况",
        content: `<div class="rounded-lg border border-card-border bg-background p-5">
  <div class="grid gap-3 text-sm">
    <div class="flex justify-between border-b border-card-border pb-2"><span class="text-muted">Brand Name</span><span>88 BaoBao (八八包包)</span></div>
    <div class="flex justify-between border-b border-card-border pb-2"><span class="text-muted">Founded</span><span>2018, Dublin, California</span></div>
    <div class="flex justify-between border-b border-card-border pb-2"><span class="text-muted">Founder</span><span>Kevin Chen</span></div>
    <div class="flex justify-between border-b border-card-border pb-2"><span class="text-muted">Business Model</span><span>Family-operated fast-casual dim sum chain</span></div>
    <div class="flex justify-between border-b border-card-border pb-2"><span class="text-muted">Cuisine</span><span>Authentic Chinese dim sum, Xiao Long Bao, hand-pulled noodles</span></div>
    <div class="flex justify-between border-b border-card-border pb-2"><span class="text-muted">Website</span><span>88baobaous.com (Wix platform)</span></div>
    <div class="flex justify-between"><span class="text-muted">Online Ordering</span><span>DoorDash, menu11.com, direct website</span></div>
  </div>
</div>
<h4 class="mt-6 font-semibold text-sm uppercase tracking-wider text-muted">Brand Story</h4>
<div class="mt-3 space-y-2 text-sm">
  <p>The name "88 BaoBao" carries dual meaning: <strong>"88"</strong> symbolizes prosperity and longevity in Chinese culture (八八 = bā bā), while also referencing the original Dublin location near 88th Street. <strong>"BaoBao"</strong> (包包) means "buns" or "dumplings," directly reflecting the menu focus.</p>
  <p>The restaurant is a true family operation — founder Kevin Chen's parents, <strong>Tom and Lisa Chen</strong>, came out of retirement to hand-roll, pull, and shape dough at new locations. This artisanal, visible-kitchen approach has become a core brand differentiator.</p>
  <p>Texas expansion was led by Kevin's cousin <strong>Johnny Wong</strong> and his wife <strong>JoJo He</strong>, who brought the concept to their hometown of Frisco, TX — demonstrating a family-network expansion model rather than traditional franchising.</p>
</div>`,
        contentZh: `<div class="rounded-lg border border-card-border bg-background p-5">
  <div class="grid gap-3 text-sm">
    <div class="flex justify-between border-b border-card-border pb-2"><span class="text-muted">品牌名称</span><span>88包包 (八八包包)</span></div>
    <div class="flex justify-between border-b border-card-border pb-2"><span class="text-muted">成立时间</span><span>2018年，加州Dublin</span></div>
    <div class="flex justify-between border-b border-card-border pb-2"><span class="text-muted">创始人</span><span>Kevin Chen</span></div>
    <div class="flex justify-between border-b border-card-border pb-2"><span class="text-muted">商业模式</span><span>家族经营的快休闲点心连锁</span></div>
    <div class="flex justify-between border-b border-card-border pb-2"><span class="text-muted">菜系</span><span>正宗中式点心、小笼包、手工拉面</span></div>
    <div class="flex justify-between border-b border-card-border pb-2"><span class="text-muted">网站</span><span>88baobaous.com (Wix平台)</span></div>
    <div class="flex justify-between"><span class="text-muted">在线订餐</span><span>DoorDash、menu11.com、官网</span></div>
  </div>
</div>
<h4 class="mt-6 font-semibold text-sm uppercase tracking-wider text-muted">品牌故事</h4>
<div class="mt-3 space-y-2 text-sm">
  <p>"88包包"这个名字有双重含义：<strong>"88"</strong>在中华文化中象征繁荣和长寿（八八 = bā bā），同时也是对Dublin原址88街附近的致敬。<strong>"包包"</strong>（BaoBao）直接指代菜单主打的包子和饺子。</p>
  <p>这家餐厅是真正的家族经营——创始人Kevin Chen的父母<strong>Tom和Lisa Chen</strong>退休后重返岗位，在新门店亲手擀面、拉面、做造型。这种手工艺、开放式厨房的方式已成为品牌核心差异化优势。</p>
  <p>德州扩张由Kevin的表弟<strong>Johnny Wong</strong>和他的妻子<strong>JoJo He</strong>主导，他们将这个概念带回了家乡Frisco, TX——展示了一种基于家族网络而非传统加盟的扩张模式。</p>
</div>`,
      },
      {
        id: "locations",
        title: "Location Network & Expansion Timeline",
        titleZh: "门店网络与扩张时间线",
        content: `<h4 class="font-semibold text-sm uppercase tracking-wider text-muted">California (9+ Locations)</h4>
<div class="mt-3 overflow-x-auto">
  <table class="w-full text-sm">
    <thead><tr class="border-b border-card-border text-left text-muted"><th class="pb-2 pr-4">Location</th><th class="pb-2 pr-4">Address</th><th class="pb-2 pr-4">Yelp Reviews</th><th class="pb-2">Status</th></tr></thead>
    <tbody class="divide-y divide-card-border">
      <tr><td class="py-2 pr-4 font-medium">Dublin (Flagship)</td><td class="py-2 pr-4">3880 Fallon Rd</td><td class="py-2 pr-4 text-red-400 font-semibold">1,070 reviews</td><td class="py-2">Established</td></tr>
      <tr><td class="py-2 pr-4 font-medium">Castro Valley</td><td class="py-2 pr-4">3330 Village Dr</td><td class="py-2 pr-4">396 reviews</td><td class="py-2">Established</td></tr>
      <tr><td class="py-2 pr-4 font-medium">Brentwood</td><td class="py-2 pr-4">5421 Lone Tree Way #103</td><td class="py-2 pr-4">176 reviews</td><td class="py-2">Established</td></tr>
      <tr><td class="py-2 pr-4 font-medium">Concord</td><td class="py-2 pr-4">785 Oak Grove Rd</td><td class="py-2 pr-4">204 reviews</td><td class="py-2">Established</td></tr>
      <tr><td class="py-2 pr-4 font-medium">Vallejo</td><td class="py-2 pr-4">145 Plaza Dr</td><td class="py-2 pr-4">158 reviews</td><td class="py-2">Established</td></tr>
      <tr><td class="py-2 pr-4 font-medium">Vacaville</td><td class="py-2 pr-4">1639 E Monte Vista Ave</td><td class="py-2 pr-4">340 reviews</td><td class="py-2">Established</td></tr>
      <tr><td class="py-2 pr-4 font-medium">Stockton</td><td class="py-2 pr-4">10710 Trinity Pkwy</td><td class="py-2 pr-4">147 reviews</td><td class="py-2">Established</td></tr>
      <tr><td class="py-2 pr-4 font-medium">Roseville</td><td class="py-2 pr-4">4181 Thrive Dr</td><td class="py-2 pr-4">153 reviews</td><td class="py-2">Established</td></tr>
      <tr><td class="py-2 pr-4 font-medium">Merced</td><td class="py-2 pr-4">3564 G St</td><td class="py-2 pr-4">127 reviews</td><td class="py-2">Established</td></tr>
      <tr><td class="py-2 pr-4 font-medium">Manteca</td><td class="py-2 pr-4">TBD</td><td class="py-2 pr-4">—</td><td class="py-2">Established</td></tr>
      <tr><td class="py-2 pr-4 font-medium">Davis</td><td class="py-2 pr-4">TBD</td><td class="py-2 pr-4">—</td><td class="py-2">Established</td></tr>
      <tr><td class="py-2 pr-4 font-medium">Riverbank</td><td class="py-2 pr-4">TBD</td><td class="py-2 pr-4">—</td><td class="py-2 text-amber-400">Coming Soon</td></tr>
    </tbody>
  </table>
</div>
<h4 class="mt-6 font-semibold text-sm uppercase tracking-wider text-muted">Out-of-State Expansion</h4>
<div class="mt-3 overflow-x-auto">
  <table class="w-full text-sm">
    <thead><tr class="border-b border-card-border text-left text-muted"><th class="pb-2 pr-4">Location</th><th class="pb-2 pr-4">Address</th><th class="pb-2 pr-4">Yelp Reviews</th><th class="pb-2">Notes</th></tr></thead>
    <tbody class="divide-y divide-card-border">
      <tr><td class="py-2 pr-4 font-medium">Frisco, TX</td><td class="py-2 pr-4">4800 Eldorado Pkwy</td><td class="py-2 pr-4">266 reviews</td><td class="py-2">First out-of-state; operated by cousin Johnny Wong</td></tr>
      <tr><td class="py-2 pr-4 font-medium">Tulsa, OK</td><td class="py-2 pr-4">7037 S Memorial Dr</td><td class="py-2 pr-4">48 reviews</td><td class="py-2">Newest market entry</td></tr>
    </tbody>
  </table>
</div>
<div class="mt-4 rounded-lg border border-red-400/30 bg-red-400/5 p-4 text-sm">
  <strong class="text-red-400">Expansion Pattern:</strong> Concentrated Bay Area cluster → Northern California fill → Out-of-state via family network. This "hub-and-spoke with family franchise" model enables rapid expansion without traditional franchise overhead.
</div>`,
        contentZh: `<h4 class="font-semibold text-sm uppercase tracking-wider text-muted">加州（12+门店）</h4>
<div class="mt-3 overflow-x-auto">
  <table class="w-full text-sm">
    <thead><tr class="border-b border-card-border text-left text-muted"><th class="pb-2 pr-4">门店</th><th class="pb-2 pr-4">地址</th><th class="pb-2 pr-4">Yelp评价</th><th class="pb-2">状态</th></tr></thead>
    <tbody class="divide-y divide-card-border">
      <tr><td class="py-2 pr-4 font-medium">Dublin（旗舰店）</td><td class="py-2 pr-4">3880 Fallon Rd</td><td class="py-2 pr-4 text-red-400 font-semibold">1,070条评价</td><td class="py-2">已开业</td></tr>
      <tr><td class="py-2 pr-4 font-medium">Castro Valley</td><td class="py-2 pr-4">3330 Village Dr</td><td class="py-2 pr-4">396条评价</td><td class="py-2">已开业</td></tr>
      <tr><td class="py-2 pr-4 font-medium">Brentwood</td><td class="py-2 pr-4">5421 Lone Tree Way #103</td><td class="py-2 pr-4">176条评价</td><td class="py-2">已开业</td></tr>
      <tr><td class="py-2 pr-4 font-medium">Concord</td><td class="py-2 pr-4">785 Oak Grove Rd</td><td class="py-2 pr-4">204条评价</td><td class="py-2">已开业</td></tr>
      <tr><td class="py-2 pr-4 font-medium">Vallejo</td><td class="py-2 pr-4">145 Plaza Dr</td><td class="py-2 pr-4">158条评价</td><td class="py-2">已开业</td></tr>
      <tr><td class="py-2 pr-4 font-medium">Vacaville</td><td class="py-2 pr-4">1639 E Monte Vista Ave</td><td class="py-2 pr-4">340条评价</td><td class="py-2">已开业</td></tr>
      <tr><td class="py-2 pr-4 font-medium">Stockton</td><td class="py-2 pr-4">10710 Trinity Pkwy</td><td class="py-2 pr-4">147条评价</td><td class="py-2">已开业</td></tr>
      <tr><td class="py-2 pr-4 font-medium">Roseville</td><td class="py-2 pr-4">4181 Thrive Dr</td><td class="py-2 pr-4">153条评价</td><td class="py-2">已开业</td></tr>
      <tr><td class="py-2 pr-4 font-medium">Merced</td><td class="py-2 pr-4">3564 G St</td><td class="py-2 pr-4">127条评价</td><td class="py-2">已开业</td></tr>
      <tr><td class="py-2 pr-4 font-medium">Manteca</td><td class="py-2 pr-4">待定</td><td class="py-2 pr-4">—</td><td class="py-2">已开业</td></tr>
      <tr><td class="py-2 pr-4 font-medium">Davis</td><td class="py-2 pr-4">待定</td><td class="py-2 pr-4">—</td><td class="py-2">已开业</td></tr>
      <tr><td class="py-2 pr-4 font-medium">Riverbank</td><td class="py-2 pr-4">待定</td><td class="py-2 pr-4">—</td><td class="py-2 text-amber-400">即将开业</td></tr>
    </tbody>
  </table>
</div>
<h4 class="mt-6 font-semibold text-sm uppercase tracking-wider text-muted">跨州扩张</h4>
<div class="mt-3 overflow-x-auto">
  <table class="w-full text-sm">
    <thead><tr class="border-b border-card-border text-left text-muted"><th class="pb-2 pr-4">门店</th><th class="pb-2 pr-4">地址</th><th class="pb-2 pr-4">Yelp评价</th><th class="pb-2">备注</th></tr></thead>
    <tbody class="divide-y divide-card-border">
      <tr><td class="py-2 pr-4 font-medium">Frisco, TX</td><td class="py-2 pr-4">4800 Eldorado Pkwy</td><td class="py-2 pr-4">266条评价</td><td class="py-2">首家跨州门店；由表弟Johnny Wong运营</td></tr>
      <tr><td class="py-2 pr-4 font-medium">Tulsa, OK</td><td class="py-2 pr-4">7037 S Memorial Dr</td><td class="py-2 pr-4">48条评价</td><td class="py-2">最新进入的市场</td></tr>
    </tbody>
  </table>
</div>
<div class="mt-4 rounded-lg border border-red-400/30 bg-red-400/5 p-4 text-sm">
  <strong class="text-red-400">扩张模式：</strong>湾区集中布点 → 北加州填充 → 通过家族网络跨州扩张。这种"中心辐射+家族加盟"模式实现了快速扩张，同时避免了传统加盟的高额开销。
</div>`,
      },
      {
        id: "menu-pricing",
        title: "Menu Strategy & Pricing",
        titleZh: "菜单策略与定价",
        content: `<p class="text-sm">88 BaoBao maintains a focused, affordable menu with <strong>no item exceeding $15</strong> — a deliberate strategy positioning the brand in the fast-casual sweet spot between fine-dining dim sum houses and generic Chinese takeout.</p>
<h4 class="mt-6 font-semibold text-sm uppercase tracking-wider text-muted">Core Menu Categories</h4>
<div class="mt-3 overflow-x-auto">
  <table class="w-full text-sm">
    <thead><tr class="border-b border-card-border text-left text-muted"><th class="pb-2 pr-4">Category</th><th class="pb-2 pr-4">Signature Items</th><th class="pb-2 pr-4">Price Range</th><th class="pb-2">Portion</th></tr></thead>
    <tbody class="divide-y divide-card-border">
      <tr><td class="py-2 pr-4 font-medium">Xiao Long Bao</td><td class="py-2 pr-4">Pork Soup Dumplings (signature)</td><td class="py-2 pr-4 text-red-400">$14.95</td><td class="py-2">8 pieces</td></tr>
      <tr><td class="py-2 pr-4 font-medium">Steamed Dumplings</td><td class="py-2 pr-4">Veggie & Pork, Chicken, Crab & Pork</td><td class="py-2 pr-4 text-red-400">$8.95–$11.95</td><td class="py-2">8 pieces</td></tr>
      <tr><td class="py-2 pr-4 font-medium">Pan-Fried</td><td class="py-2 pr-4">Beef Roll, Pan-Fried Dumplings</td><td class="py-2 pr-4 text-red-400">$13.50</td><td class="py-2">Varies</td></tr>
      <tr><td class="py-2 pr-4 font-medium">Bao Buns</td><td class="py-2 pr-4">8 varieties including Red Bean, Cha Shu</td><td class="py-2 pr-4 text-red-400">$5–$8</td><td class="py-2">2 pieces</td></tr>
      <tr><td class="py-2 pr-4 font-medium">Appetizers</td><td class="py-2 pr-4">Chili Oil Wontons, Spring Rolls, Cucumber Salad</td><td class="py-2 pr-4 text-red-400">$5–$12.50</td><td class="py-2">Shareable</td></tr>
      <tr><td class="py-2 pr-4 font-medium">Noodles & Rice</td><td class="py-2 pr-4">Hand-pulled Noodles, Egg Fried Rice</td><td class="py-2 pr-4 text-red-400">$13.00</td><td class="py-2">Individual</td></tr>
    </tbody>
  </table>
</div>
<h4 class="mt-6 font-semibold text-sm uppercase tracking-wider text-muted">Pricing Strategy Analysis</h4>
<div class="mt-3 space-y-2 text-sm">
  <div class="flex items-start gap-2"><span class="text-red-400 mt-0.5">●</span><strong>Value positioning:</strong> $10–15 per person lands in the "affordable treat" zone — accessible enough for repeat visits, premium enough for perceived quality</div>
  <div class="flex items-start gap-2"><span class="text-red-400 mt-0.5">●</span><strong>Shareable format:</strong> Dim sum portions (8-piece dumplings, 2-piece bao) encourage group dining and higher per-table spend</div>
  <div class="flex items-start gap-2"><span class="text-red-400 mt-0.5">●</span><strong>No $15+ ceiling:</strong> Psychological pricing barrier removal eliminates sticker shock and speeds ordering decisions</div>
  <div class="flex items-start gap-2"><span class="text-red-400 mt-0.5">●</span><strong>Focused menu:</strong> Limited SKUs reduce kitchen complexity, minimize food waste, and maintain consistency across 10+ locations</div>
</div>`,
        contentZh: `<p class="text-sm">88包包保持精简、实惠的菜单，<strong>没有任何单品超过$15</strong>——这是一项刻意策略，将品牌精准定位于高端点心酒楼与普通中餐外卖之间的快休闲甜蜜点。</p>
<h4 class="mt-6 font-semibold text-sm uppercase tracking-wider text-muted">核心菜单分类</h4>
<div class="mt-3 overflow-x-auto">
  <table class="w-full text-sm">
    <thead><tr class="border-b border-card-border text-left text-muted"><th class="pb-2 pr-4">分类</th><th class="pb-2 pr-4">招牌产品</th><th class="pb-2 pr-4">价格区间</th><th class="pb-2">份量</th></tr></thead>
    <tbody class="divide-y divide-card-border">
      <tr><td class="py-2 pr-4 font-medium">小笼包</td><td class="py-2 pr-4">鲜肉小笼包（招牌）</td><td class="py-2 pr-4 text-red-400">$14.95</td><td class="py-2">8个</td></tr>
      <tr><td class="py-2 pr-4 font-medium">蒸饺</td><td class="py-2 pr-4">素菜猪肉、鸡肉、蟹肉猪肉</td><td class="py-2 pr-4 text-red-400">$8.95–$11.95</td><td class="py-2">8个</td></tr>
      <tr><td class="py-2 pr-4 font-medium">煎制</td><td class="py-2 pr-4">牛肉卷、煎饺</td><td class="py-2 pr-4 text-red-400">$13.50</td><td class="py-2">不等</td></tr>
      <tr><td class="py-2 pr-4 font-medium">包子</td><td class="py-2 pr-4">8种口味，包括红豆、叉烧</td><td class="py-2 pr-4 text-red-400">$5–$8</td><td class="py-2">2个</td></tr>
      <tr><td class="py-2 pr-4 font-medium">开胃菜</td><td class="py-2 pr-4">红油抄手、春卷、凉拌黄瓜</td><td class="py-2 pr-4 text-red-400">$5–$12.50</td><td class="py-2">分享装</td></tr>
      <tr><td class="py-2 pr-4 font-medium">面条和米饭</td><td class="py-2 pr-4">手工拉面、蛋炒饭</td><td class="py-2 pr-4 text-red-400">$13.00</td><td class="py-2">单人份</td></tr>
    </tbody>
  </table>
</div>
<h4 class="mt-6 font-semibold text-sm uppercase tracking-wider text-muted">定价策略分析</h4>
<div class="mt-3 space-y-2 text-sm">
  <div class="flex items-start gap-2"><span class="text-red-400 mt-0.5">●</span><strong>性价比定位：</strong>人均$10-15落在"实惠享受"区间——足够亲民以促进回头客，又足够有品质感</div>
  <div class="flex items-start gap-2"><span class="text-red-400 mt-0.5">●</span><strong>分享式用餐：</strong>点心份量（8个饺子、2个包子）鼓励聚餐，提升每桌消费</div>
  <div class="flex items-start gap-2"><span class="text-red-400 mt-0.5">●</span><strong>不超$15天花板：</strong>心理定价策略消除价格冲击，加速点单决策</div>
  <div class="flex items-start gap-2"><span class="text-red-400 mt-0.5">●</span><strong>精简菜单：</strong>有限SKU降低厨房复杂度，减少食材浪费，保持10+门店的一致性</div>
</div>`,
      },
      {
        id: "competitive-landscape",
        title: "Competitive Landscape",
        titleZh: "竞争格局",
        content: `<h4 class="font-semibold text-sm uppercase tracking-wider text-muted">Market Position</h4>
<p class="mt-3 text-sm">88 BaoBao occupies a unique niche: <strong>fast-casual authentic dim sum</strong>. Most dim sum restaurants in the US fall into two categories — upscale cart-service restaurants ($30–50/person) or generic Chinese takeout with dim sum as a side offering. 88 BaoBao created a third lane.</p>
<div class="mt-4 overflow-x-auto">
  <table class="w-full text-sm">
    <thead><tr class="border-b border-card-border text-left text-muted"><th class="pb-2 pr-4">Segment</th><th class="pb-2 pr-4">Price/Person</th><th class="pb-2 pr-4">Experience</th><th class="pb-2">Examples</th></tr></thead>
    <tbody class="divide-y divide-card-border">
      <tr><td class="py-2 pr-4 font-medium text-amber-400">Upscale Dim Sum</td><td class="py-2 pr-4">$30–50</td><td class="py-2 pr-4">Cart service, banquet halls</td><td class="py-2">Koi Palace, Yank Sing</td></tr>
      <tr class="bg-red-400/5"><td class="py-2 pr-4 font-medium text-red-400">88 BaoBao (Fast-Casual)</td><td class="py-2 pr-4">$10–15</td><td class="py-2 pr-4">Counter-order, visible kitchen, dine-in/takeout</td><td class="py-2">88 BaoBao</td></tr>
      <tr><td class="py-2 pr-4 font-medium text-blue-400">Generic Chinese Takeout</td><td class="py-2 pr-4">$8–12</td><td class="py-2 pr-4">Takeout-focused, broad menu</td><td class="py-2">Various local shops</td></tr>
    </tbody>
  </table>
</div>
<h4 class="mt-6 font-semibold text-sm uppercase tracking-wider text-muted">Competitive Advantages</h4>
<div class="mt-3 space-y-2 text-sm">
  <div class="flex items-start gap-2"><span class="text-red-400">✦</span><strong>Visible kitchen:</strong> Customers watch dough being hand-rolled and shaped — builds trust in freshness and authenticity</div>
  <div class="flex items-start gap-2"><span class="text-red-400">✦</span><strong>Xiao Long Bao specialization:</strong> Soup dumplings are technically difficult and rarely done well at scale — this creates a natural moat</div>
  <div class="flex items-start gap-2"><span class="text-red-400">✦</span><strong>Family-network expansion:</strong> No franchise fees, aligned incentives, brand consistency maintained through family values</div>
  <div class="flex items-start gap-2"><span class="text-red-400">✦</span><strong>Cultural authenticity:</strong> Real family members making food, Chinese cultural branding (88 = prosperity)</div>
  <div class="flex items-start gap-2"><span class="text-red-400">✦</span><strong>Multi-channel ordering:</strong> DoorDash (4.7 stars, 3,000+ reviews at Dublin alone), menu11.com, and direct ordering</div>
</div>`,
        contentZh: `<h4 class="font-semibold text-sm uppercase tracking-wider text-muted">市场定位</h4>
<p class="mt-3 text-sm">88包包占据了一个独特的细分市场：<strong>快休闲正宗点心</strong>。美国大多数点心餐厅分为两类——高端推车式餐厅（人均$30-50）或把点心作为附属的普通中餐外卖。88包包开辟了第三条赛道。</p>
<div class="mt-4 overflow-x-auto">
  <table class="w-full text-sm">
    <thead><tr class="border-b border-card-border text-left text-muted"><th class="pb-2 pr-4">细分市场</th><th class="pb-2 pr-4">人均消费</th><th class="pb-2 pr-4">用餐体验</th><th class="pb-2">代表品牌</th></tr></thead>
    <tbody class="divide-y divide-card-border">
      <tr><td class="py-2 pr-4 font-medium text-amber-400">高端点心</td><td class="py-2 pr-4">$30–50</td><td class="py-2 pr-4">推车服务、宴会厅</td><td class="py-2">Koi Palace, Yank Sing</td></tr>
      <tr class="bg-red-400/5"><td class="py-2 pr-4 font-medium text-red-400">88包包（快休闲）</td><td class="py-2 pr-4">$10–15</td><td class="py-2 pr-4">柜台点餐、透明厨房、堂食/外卖</td><td class="py-2">88包包</td></tr>
      <tr><td class="py-2 pr-4 font-medium text-blue-400">普通中餐外卖</td><td class="py-2 pr-4">$8–12</td><td class="py-2 pr-4">以外卖为主、菜单广泛</td><td class="py-2">各种本地小店</td></tr>
    </tbody>
  </table>
</div>
<h4 class="mt-6 font-semibold text-sm uppercase tracking-wider text-muted">竞争优势</h4>
<div class="mt-3 space-y-2 text-sm">
  <div class="flex items-start gap-2"><span class="text-red-400">✦</span><strong>透明厨房：</strong>顾客可以看到面团被手工擀制和塑形——建立对新鲜度和正宗性的信任</div>
  <div class="flex items-start gap-2"><span class="text-red-400">✦</span><strong>小笼包专精：</strong>汤包技术难度大，很少有品牌能规模化做好——形成天然护城河</div>
  <div class="flex items-start gap-2"><span class="text-red-400">✦</span><strong>家族网络扩张：</strong>无加盟费、利益一致、通过家族价值观维持品牌一致性</div>
  <div class="flex items-start gap-2"><span class="text-red-400">✦</span><strong>文化正宗性：</strong>真正的家族成员做食物，中华文化品牌（88 = 发发）</div>
  <div class="flex items-start gap-2"><span class="text-red-400">✦</span><strong>多渠道订餐：</strong>DoorDash（4.7星，仅Dublin一店3,000+评价）、menu11.com和直接订餐</div>
</div>`,
      },
      {
        id: "customer-analysis",
        title: "Customer Sentiment & Review Analysis",
        titleZh: "客户评价分析",
        content: `<h4 class="font-semibold text-sm uppercase tracking-wider text-muted">Review Volume by Location</h4>
<div class="mt-3 overflow-x-auto">
  <table class="w-full text-sm">
    <thead><tr class="border-b border-card-border text-left text-muted"><th class="pb-2 pr-4">Location</th><th class="pb-2 pr-4">Yelp Reviews</th><th class="pb-2">Sentiment</th></tr></thead>
    <tbody class="divide-y divide-card-border">
      <tr><td class="py-2 pr-4 font-medium">Dublin (Flagship)</td><td class="py-2 pr-4 text-red-400 font-semibold">1,070</td><td class="py-2"><span class="rounded bg-emerald-400/10 px-2 py-0.5 text-xs text-emerald-400">Very Positive</span></td></tr>
      <tr><td class="py-2 pr-4">Castro Valley</td><td class="py-2 pr-4">396</td><td class="py-2"><span class="rounded bg-emerald-400/10 px-2 py-0.5 text-xs text-emerald-400">Positive</span></td></tr>
      <tr><td class="py-2 pr-4">Vacaville</td><td class="py-2 pr-4">340</td><td class="py-2"><span class="rounded bg-emerald-400/10 px-2 py-0.5 text-xs text-emerald-400">Positive</span></td></tr>
      <tr><td class="py-2 pr-4">Frisco, TX</td><td class="py-2 pr-4">266</td><td class="py-2"><span class="rounded bg-emerald-400/10 px-2 py-0.5 text-xs text-emerald-400">Positive</span></td></tr>
      <tr><td class="py-2 pr-4">Concord</td><td class="py-2 pr-4">204</td><td class="py-2"><span class="rounded bg-emerald-400/10 px-2 py-0.5 text-xs text-emerald-400">Positive</span></td></tr>
      <tr><td class="py-2 pr-4">Brentwood</td><td class="py-2 pr-4">176</td><td class="py-2"><span class="rounded bg-emerald-400/10 px-2 py-0.5 text-xs text-emerald-400">Positive</span></td></tr>
      <tr><td class="py-2 pr-4">Vallejo</td><td class="py-2 pr-4">158</td><td class="py-2"><span class="rounded bg-emerald-400/10 px-2 py-0.5 text-xs text-emerald-400">Positive</span></td></tr>
      <tr><td class="py-2 pr-4">Roseville</td><td class="py-2 pr-4">153</td><td class="py-2"><span class="rounded bg-emerald-400/10 px-2 py-0.5 text-xs text-emerald-400">Positive</span></td></tr>
      <tr><td class="py-2 pr-4">Stockton</td><td class="py-2 pr-4">147</td><td class="py-2"><span class="rounded bg-emerald-400/10 px-2 py-0.5 text-xs text-emerald-400">Positive</span></td></tr>
      <tr><td class="py-2 pr-4">Merced</td><td class="py-2 pr-4">127</td><td class="py-2"><span class="rounded bg-yellow-400/10 px-2 py-0.5 text-xs text-yellow-400">Mixed</span></td></tr>
      <tr><td class="py-2 pr-4">Tulsa, OK</td><td class="py-2 pr-4">48</td><td class="py-2"><span class="rounded bg-yellow-400/10 px-2 py-0.5 text-xs text-yellow-400">Early Stage</span></td></tr>
    </tbody>
  </table>
</div>
<div class="mt-4 rounded-lg border border-red-400/30 bg-red-400/5 p-4 text-sm">
  <strong class="text-red-400">Key Insight:</strong> Dublin flagship has 1,070 Yelp reviews — an exceptionally high count for a fast-casual restaurant, indicating strong organic word-of-mouth. DoorDash rating of 4.7 stars with 3,000+ reviews confirms consistent food quality and delivery experience. Customers frequently praise "consistent quality," "reasonable prices," and "friendly, quick service."
</div>
<h4 class="mt-6 font-semibold text-sm uppercase tracking-wider text-muted">Customer Profile</h4>
<div class="mt-3 grid gap-3 sm:grid-cols-3">
  <div class="rounded-lg border border-card-border bg-background p-3 text-center"><div class="text-xl">👨‍👩‍👧‍👦</div><div class="mt-1 text-xs text-muted">Asian-American families seeking authentic dim sum at accessible prices</div></div>
  <div class="rounded-lg border border-card-border bg-background p-3 text-center"><div class="text-xl">👥</div><div class="mt-1 text-xs text-muted">Friend groups ordering shareable dim sum platters</div></div>
  <div class="rounded-lg border border-card-border bg-background p-3 text-center"><div class="text-xl">📱</div><div class="mt-1 text-xs text-muted">DoorDash/delivery customers for convenient home dim sum</div></div>
</div>`,
        contentZh: `<h4 class="font-semibold text-sm uppercase tracking-wider text-muted">各门店评价量</h4>
<div class="mt-3 overflow-x-auto">
  <table class="w-full text-sm">
    <thead><tr class="border-b border-card-border text-left text-muted"><th class="pb-2 pr-4">门店</th><th class="pb-2 pr-4">Yelp评价</th><th class="pb-2">口碑</th></tr></thead>
    <tbody class="divide-y divide-card-border">
      <tr><td class="py-2 pr-4 font-medium">Dublin（旗舰店）</td><td class="py-2 pr-4 text-red-400 font-semibold">1,070</td><td class="py-2"><span class="rounded bg-emerald-400/10 px-2 py-0.5 text-xs text-emerald-400">非常正面</span></td></tr>
      <tr><td class="py-2 pr-4">Castro Valley</td><td class="py-2 pr-4">396</td><td class="py-2"><span class="rounded bg-emerald-400/10 px-2 py-0.5 text-xs text-emerald-400">正面</span></td></tr>
      <tr><td class="py-2 pr-4">Vacaville</td><td class="py-2 pr-4">340</td><td class="py-2"><span class="rounded bg-emerald-400/10 px-2 py-0.5 text-xs text-emerald-400">正面</span></td></tr>
      <tr><td class="py-2 pr-4">Frisco, TX</td><td class="py-2 pr-4">266</td><td class="py-2"><span class="rounded bg-emerald-400/10 px-2 py-0.5 text-xs text-emerald-400">正面</span></td></tr>
      <tr><td class="py-2 pr-4">Concord</td><td class="py-2 pr-4">204</td><td class="py-2"><span class="rounded bg-emerald-400/10 px-2 py-0.5 text-xs text-emerald-400">正面</span></td></tr>
      <tr><td class="py-2 pr-4">Brentwood</td><td class="py-2 pr-4">176</td><td class="py-2"><span class="rounded bg-emerald-400/10 px-2 py-0.5 text-xs text-emerald-400">正面</span></td></tr>
      <tr><td class="py-2 pr-4">Vallejo</td><td class="py-2 pr-4">158</td><td class="py-2"><span class="rounded bg-emerald-400/10 px-2 py-0.5 text-xs text-emerald-400">正面</span></td></tr>
      <tr><td class="py-2 pr-4">Roseville</td><td class="py-2 pr-4">153</td><td class="py-2"><span class="rounded bg-emerald-400/10 px-2 py-0.5 text-xs text-emerald-400">正面</span></td></tr>
      <tr><td class="py-2 pr-4">Stockton</td><td class="py-2 pr-4">147</td><td class="py-2"><span class="rounded bg-emerald-400/10 px-2 py-0.5 text-xs text-emerald-400">正面</span></td></tr>
      <tr><td class="py-2 pr-4">Merced</td><td class="py-2 pr-4">127</td><td class="py-2"><span class="rounded bg-yellow-400/10 px-2 py-0.5 text-xs text-yellow-400">褒贬不一</span></td></tr>
      <tr><td class="py-2 pr-4">Tulsa, OK</td><td class="py-2 pr-4">48</td><td class="py-2"><span class="rounded bg-yellow-400/10 px-2 py-0.5 text-xs text-yellow-400">初期阶段</span></td></tr>
    </tbody>
  </table>
</div>
<div class="mt-4 rounded-lg border border-red-400/30 bg-red-400/5 p-4 text-sm">
  <strong class="text-red-400">核心洞察：</strong>Dublin旗舰店拥有1,070条Yelp评价——对于快休闲餐厅来说这是一个极高的数字，表明强大的自然口碑传播。DoorDash 4.7星评分和3,000+评价确认了稳定的食品质量和配送体验。顾客频繁称赞"品质稳定""价格合理"和"服务友好快捷"。
</div>
<h4 class="mt-6 font-semibold text-sm uppercase tracking-wider text-muted">客户画像</h4>
<div class="mt-3 grid gap-3 sm:grid-cols-3">
  <div class="rounded-lg border border-card-border bg-background p-3 text-center"><div class="text-xl">👨‍👩‍👧‍👦</div><div class="mt-1 text-xs text-muted">寻求价格亲民的正宗点心的亚裔美国家庭</div></div>
  <div class="rounded-lg border border-card-border bg-background p-3 text-center"><div class="text-xl">👥</div><div class="mt-1 text-xs text-muted">点分享装点心拼盘的朋友聚餐</div></div>
  <div class="rounded-lg border border-card-border bg-background p-3 text-center"><div class="text-xl">📱</div><div class="mt-1 text-xs text-muted">通过DoorDash等平台在家享受点心的外卖客户</div></div>
</div>`,
      },
      {
        id: "swot-analysis",
        title: "SWOT Analysis",
        titleZh: "SWOT分析",
        content: `<div class="grid gap-4 sm:grid-cols-2">
  <div class="rounded-lg border border-emerald-400/30 bg-emerald-400/5 p-4">
    <h4 class="font-semibold text-emerald-400 text-sm mb-3">Strengths</h4>
    <ul class="space-y-2 text-sm">
      <li>Proven 10+ location model with consistent quality</li>
      <li>Strong brand recognition — 4,000+ combined online reviews</li>
      <li>Affordable pricing ($10–15) with no menu item over $15</li>
      <li>Authentic, visible-kitchen experience builds trust</li>
      <li>Family-network expansion lowers overhead vs. franchising</li>
      <li>Xiao Long Bao specialization creates competitive moat</li>
    </ul>
  </div>
  <div class="rounded-lg border border-red-400/30 bg-red-400/5 p-4">
    <h4 class="font-semibold text-red-400 text-sm mb-3">Weaknesses</h4>
    <ul class="space-y-2 text-sm">
      <li>Wix-based website limits SEO and digital sophistication</li>
      <li>Family-network model may cap scalability beyond family</li>
      <li>No centralized supply chain or commissary kitchen (assumed)</li>
      <li>Hand-made food is labor-intensive and hard to standardize</li>
      <li>Limited brand awareness outside California/Texas</li>
      <li>No mobile app for loyalty or direct ordering</li>
    </ul>
  </div>
  <div class="rounded-lg border border-blue-400/30 bg-blue-400/5 p-4">
    <h4 class="font-semibold text-blue-400 text-sm mb-3">Opportunities</h4>
    <ul class="space-y-2 text-sm">
      <li>US dim sum market growing with Asian cuisine popularity</li>
      <li>Fast-casual format proven scalable (Chipotle, Sweetgreen model)</li>
      <li>Suburban strip-mall locations are cost-effective and accessible</li>
      <li>Delivery platforms drive incremental revenue (4.7★ DoorDash)</li>
      <li>Frozen dumpling retail line could extend brand into grocery</li>
      <li>Texas & Sun Belt markets underserved for authentic dim sum</li>
    </ul>
  </div>
  <div class="rounded-lg border border-amber-400/30 bg-amber-400/5 p-4">
    <h4 class="font-semibold text-amber-400 text-sm mb-3">Threats</h4>
    <ul class="space-y-2 text-sm">
      <li>Rising labor costs impact hand-made food model</li>
      <li>Copycats can replicate the fast-casual dim sum concept</li>
      <li>Food delivery commission fees (DoorDash ~30%) erode margins</li>
      <li>Quality control challenges as location count grows</li>
      <li>Ingredient cost volatility (pork, flour, specialty items)</li>
      <li>Economic downturn risk for discretionary dining spend</li>
    </ul>
  </div>
</div>`,
        contentZh: `<div class="grid gap-4 sm:grid-cols-2">
  <div class="rounded-lg border border-emerald-400/30 bg-emerald-400/5 p-4">
    <h4 class="font-semibold text-emerald-400 text-sm mb-3">优势</h4>
    <ul class="space-y-2 text-sm">
      <li>经验证的10+门店模式，品质稳定</li>
      <li>强大的品牌认知——4,000+综合在线评价</li>
      <li>亲民定价（$10-15），无单品超过$15</li>
      <li>正宗透明厨房体验建立信任</li>
      <li>家族网络扩张降低开销（相比传统加盟）</li>
      <li>小笼包专精形成竞争护城河</li>
    </ul>
  </div>
  <div class="rounded-lg border border-red-400/30 bg-red-400/5 p-4">
    <h4 class="font-semibold text-red-400 text-sm mb-3">劣势</h4>
    <ul class="space-y-2 text-sm">
      <li>基于Wix的网站限制了SEO和数字化能力</li>
      <li>家族网络模式可能限制超出家族范围的扩展性</li>
      <li>缺少集中化供应链或中央厨房（推测）</li>
      <li>手工食品劳动密集且难以标准化</li>
      <li>加州/德州以外品牌知名度有限</li>
      <li>没有会员忠诚度或直接订餐的移动应用</li>
    </ul>
  </div>
  <div class="rounded-lg border border-blue-400/30 bg-blue-400/5 p-4">
    <h4 class="font-semibold text-blue-400 text-sm mb-3">机会</h4>
    <ul class="space-y-2 text-sm">
      <li>随亚洲美食受欢迎，美国点心市场持续增长</li>
      <li>快休闲模式已被证明可规模化（Chipotle、Sweetgreen模式）</li>
      <li>郊区商业街门店成本效益高且便于到达</li>
      <li>外卖平台驱动增量收入（DoorDash 4.7★）</li>
      <li>冷冻饺子零售线可将品牌延伸至超市</li>
      <li>德州和阳光地带市场正宗点心供不应求</li>
    </ul>
  </div>
  <div class="rounded-lg border border-amber-400/30 bg-amber-400/5 p-4">
    <h4 class="font-semibold text-amber-400 text-sm mb-3">威胁</h4>
    <ul class="space-y-2 text-sm">
      <li>劳动力成本上升影响手工食品模式</li>
      <li>模仿者可以复制快休闲点心概念</li>
      <li>外卖平台佣金（DoorDash约30%）侵蚀利润</li>
      <li>门店数量增长带来品控挑战</li>
      <li>原料成本波动（猪肉、面粉、特殊食材）</li>
      <li>经济下行风险影响非必需餐饮消费</li>
    </ul>
  </div>
</div>`,
      },
      {
        id: "growth-strategy",
        title: "Growth Strategy & Recommendations",
        titleZh: "增长策略与建议",
        content: `<div class="space-y-6">
  <div>
    <h4 class="font-semibold text-sm uppercase tracking-wider text-red-400 mb-3">Immediate (0–90 Days)</h4>
    <div class="space-y-2">
      <div class="flex items-start gap-3 rounded-lg border border-card-border bg-background p-3 text-sm"><span class="rounded bg-red-400/20 px-1.5 py-0.5 text-xs text-red-400 shrink-0">HIGH</span><span>Upgrade from Wix to a custom or Shopify-based website with proper SEO, location pages, and online ordering integration</span></div>
      <div class="flex items-start gap-3 rounded-lg border border-card-border bg-background p-3 text-sm"><span class="rounded bg-red-400/20 px-1.5 py-0.5 text-xs text-red-400 shrink-0">HIGH</span><span>Implement a unified loyalty/rewards program across all locations to drive repeat visits</span></div>
      <div class="flex items-start gap-3 rounded-lg border border-card-border bg-background p-3 text-sm"><span class="rounded bg-amber-400/20 px-1.5 py-0.5 text-xs text-amber-400 shrink-0">MEDIUM</span><span>Standardize brand assets (photography, social media presence) across all location Yelp/Google profiles</span></div>
    </div>
  </div>
  <div>
    <h4 class="font-semibold text-sm uppercase tracking-wider text-amber-400 mb-3">Short-Term (3–6 Months)</h4>
    <div class="space-y-2">
      <div class="flex items-start gap-3 rounded-lg border border-card-border bg-background p-3 text-sm"><span class="rounded bg-red-400/20 px-1.5 py-0.5 text-xs text-red-400 shrink-0">HIGH</span><span>Establish a central commissary kitchen in the Bay Area for dough prep, sauce production, and ingredient portioning to ensure consistency</span></div>
      <div class="flex items-start gap-3 rounded-lg border border-card-border bg-background p-3 text-sm"><span class="rounded bg-red-400/20 px-1.5 py-0.5 text-xs text-red-400 shrink-0">HIGH</span><span>Identify 3–5 new Sun Belt markets (Phoenix, Las Vegas, Houston, Atlanta) where Asian cuisine demand outpaces supply</span></div>
      <div class="flex items-start gap-3 rounded-lg border border-card-border bg-background p-3 text-sm"><span class="rounded bg-amber-400/20 px-1.5 py-0.5 text-xs text-amber-400 shrink-0">MEDIUM</span><span>Develop kitchen training program to reduce dependency on family members for hand-made items</span></div>
    </div>
  </div>
  <div>
    <h4 class="font-semibold text-sm uppercase tracking-wider text-blue-400 mb-3">Medium-Term (6–18 Months)</h4>
    <div class="space-y-2">
      <div class="flex items-start gap-3 rounded-lg border border-card-border bg-background p-3 text-sm"><span class="rounded bg-red-400/20 px-1.5 py-0.5 text-xs text-red-400 shrink-0">HIGH</span><span>Launch frozen dumpling retail product line for grocery distribution (Costco, H Mart, 99 Ranch Market)</span></div>
      <div class="flex items-start gap-3 rounded-lg border border-card-border bg-background p-3 text-sm"><span class="rounded bg-amber-400/20 px-1.5 py-0.5 text-xs text-amber-400 shrink-0">MEDIUM</span><span>Formalize expansion model: document the family-franchise playbook for non-family operators while maintaining quality standards</span></div>
      <div class="flex items-start gap-3 rounded-lg border border-card-border bg-background p-3 text-sm"><span class="rounded bg-amber-400/20 px-1.5 py-0.5 text-xs text-amber-400 shrink-0">MEDIUM</span><span>Negotiate direct delivery ordering to reduce DoorDash commission dependency</span></div>
    </div>
  </div>
  <div>
    <h4 class="font-semibold text-sm uppercase tracking-wider text-purple-400 mb-3">Long-Term (18+ Months)</h4>
    <div class="space-y-2">
      <div class="flex items-start gap-3 rounded-lg border border-card-border bg-background p-3 text-sm"><span class="rounded bg-amber-400/20 px-1.5 py-0.5 text-xs text-amber-400 shrink-0">MEDIUM</span><span>Target 25+ locations nationwide by 2028, focusing on suburban strip-mall locations near Asian community hubs</span></div>
      <div class="flex items-start gap-3 rounded-lg border border-card-border bg-background p-3 text-sm"><span class="rounded bg-blue-400/20 px-1.5 py-0.5 text-xs text-blue-400 shrink-0">EXPLORE</span><span>Evaluate catering and corporate event service as a high-margin revenue stream</span></div>
    </div>
  </div>
</div>`,
        contentZh: `<div class="space-y-6">
  <div>
    <h4 class="font-semibold text-sm uppercase tracking-wider text-red-400 mb-3">立即行动（0-90天）</h4>
    <div class="space-y-2">
      <div class="flex items-start gap-3 rounded-lg border border-card-border bg-background p-3 text-sm"><span class="rounded bg-red-400/20 px-1.5 py-0.5 text-xs text-red-400 shrink-0">高优</span><span>从Wix升级到自定义或Shopify网站，具备完善的SEO、门店页面和在线订餐集成</span></div>
      <div class="flex items-start gap-3 rounded-lg border border-card-border bg-background p-3 text-sm"><span class="rounded bg-red-400/20 px-1.5 py-0.5 text-xs text-red-400 shrink-0">高优</span><span>在所有门店实施统一的会员忠诚度/积分计划，促进回头客</span></div>
      <div class="flex items-start gap-3 rounded-lg border border-card-border bg-background p-3 text-sm"><span class="rounded bg-amber-400/20 px-1.5 py-0.5 text-xs text-amber-400 shrink-0">中优</span><span>统一品牌素材（摄影、社交媒体形象），覆盖所有门店的Yelp/Google资料</span></div>
    </div>
  </div>
  <div>
    <h4 class="font-semibold text-sm uppercase tracking-wider text-amber-400 mb-3">短期（3-6个月）</h4>
    <div class="space-y-2">
      <div class="flex items-start gap-3 rounded-lg border border-card-border bg-background p-3 text-sm"><span class="rounded bg-red-400/20 px-1.5 py-0.5 text-xs text-red-400 shrink-0">高优</span><span>在湾区建立中央厨房，用于面团准备、酱料生产和食材分装，确保一致性</span></div>
      <div class="flex items-start gap-3 rounded-lg border border-card-border bg-background p-3 text-sm"><span class="rounded bg-red-400/20 px-1.5 py-0.5 text-xs text-red-400 shrink-0">高优</span><span>识别3-5个新的阳光地带市场（凤凰城、拉斯维加斯、休斯顿、亚特兰大），亚洲美食需求超过供给</span></div>
      <div class="flex items-start gap-3 rounded-lg border border-card-border bg-background p-3 text-sm"><span class="rounded bg-amber-400/20 px-1.5 py-0.5 text-xs text-amber-400 shrink-0">中优</span><span>开发厨房培训计划，减少对家族成员手工制作的依赖</span></div>
    </div>
  </div>
  <div>
    <h4 class="font-semibold text-sm uppercase tracking-wider text-blue-400 mb-3">中期（6-18个月）</h4>
    <div class="space-y-2">
      <div class="flex items-start gap-3 rounded-lg border border-card-border bg-background p-3 text-sm"><span class="rounded bg-red-400/20 px-1.5 py-0.5 text-xs text-red-400 shrink-0">高优</span><span>推出冷冻饺子零售产品线，进入超市分销渠道（Costco、H Mart、大华超市）</span></div>
      <div class="flex items-start gap-3 rounded-lg border border-card-border bg-background p-3 text-sm"><span class="rounded bg-amber-400/20 px-1.5 py-0.5 text-xs text-amber-400 shrink-0">中优</span><span>规范化扩张模式：为非家族运营者编写家族加盟手册，同时维持品质标准</span></div>
      <div class="flex items-start gap-3 rounded-lg border border-card-border bg-background p-3 text-sm"><span class="rounded bg-amber-400/20 px-1.5 py-0.5 text-xs text-amber-400 shrink-0">中优</span><span>协商直接配送订餐，降低对DoorDash佣金的依赖</span></div>
    </div>
  </div>
  <div>
    <h4 class="font-semibold text-sm uppercase tracking-wider text-purple-400 mb-3">长期（18个月以上）</h4>
    <div class="space-y-2">
      <div class="flex items-start gap-3 rounded-lg border border-card-border bg-background p-3 text-sm"><span class="rounded bg-amber-400/20 px-1.5 py-0.5 text-xs text-amber-400 shrink-0">中优</span><span>目标2028年达到全国25+门店，聚焦亚裔社区中心附近的郊区商业街</span></div>
      <div class="flex items-start gap-3 rounded-lg border border-card-border bg-background p-3 text-sm"><span class="rounded bg-blue-400/20 px-1.5 py-0.5 text-xs text-blue-400 shrink-0">探索</span><span>评估团餐和企业活动服务作为高利润收入来源</span></div>
    </div>
  </div>
</div>`,
      },
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((s) => s.slug === slug);
}

export function getCaseStudiesForIndustry(industrySlug: string): CaseStudy[] {
  return caseStudies.filter((s) => s.industrySlug === industrySlug);
}
