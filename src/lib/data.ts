export interface Industry {
  slug: string;
  name: string;
  nameZh: string;
  icon: string;
  description: string;
  color: string;
}

export interface ConsultingModule {
  slug: string;
  name: string;
  nameZh: string;
  icon: string;
  description: string;
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
    color: "#ef4444",
  },
  {
    slug: "cosmetic",
    name: "Cosmetic",
    nameZh: "美妆",
    icon: "💄",
    description:
      "Identify beauty trends, benchmark competitor products, build DTC strategies, and manage ingredient supply chains effectively.",
    color: "#ec4899",
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    nameZh: "制造",
    icon: "🏭",
    description:
      "Find B2B clients, analyze industrial competition, optimize production strategy, and build resilient supply chain networks.",
    color: "#f59e0b",
  },
  {
    slug: "robotics",
    name: "Robotics",
    nameZh: "机器人",
    icon: "🤖",
    description:
      "Target enterprise buyers, track technology competitors, plan go-to-market strategies, and source components intelligently.",
    color: "#6366f1",
  },
  {
    slug: "medical",
    name: "Medical",
    nameZh: "医疗",
    icon: "🏥",
    description:
      "Reach healthcare providers, benchmark medical devices, navigate regulatory strategies, and manage critical medical supply chains.",
    color: "#10b981",
  },
  {
    slug: "education",
    name: "Education",
    nameZh: "教育",
    icon: "📚",
    description:
      "Attract students and institutions, compare edtech competitors, develop curriculum strategies, and manage content supply pipelines.",
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
