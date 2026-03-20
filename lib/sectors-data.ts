export interface SectorChallenge {
  title: string
  description: string
}

export interface Sector {
  slug: string
  title: string
  subtitle: string
  description: string
  challenges: SectorChallenge[]
  relatedServiceSlugs: string[]
}

export const SECTORS: Sector[] = [
  {
    slug: "financial-services",
    title: "Financial Services",
    subtitle: "Governance, regulatory risk and operational resilience for financial institutions operating in complex market environments.",
    description: "We advise financial institutions, banks and asset managers on governance, regulatory risk and operational resilience in complex and evolving market environments. Our team brings deep expertise across retail and wholesale banking, asset management, insurance and capital markets, supporting clients in navigating regulatory change, strengthening governance structures and managing the operational and reputational risks inherent in today's financial services landscape.",
    challenges: [
      { title: "Regulatory Compliance", description: "Navigating evolving regulatory frameworks across multiple jurisdictions, including prudential requirements, conduct obligations and AML/CFT regimes." },
      { title: "Governance Strengthening", description: "Assessing and improving board structures, risk governance frameworks and management accountability in line with regulatory expectations." },
      { title: "Third-Party & Counterparty Risk", description: "Managing risk exposure through robust due diligence on counterparties, service providers and investment targets." },
      { title: "Operational Resilience", description: "Designing and testing resilience frameworks to ensure continuity of critical financial services under adverse conditions." },
    ],
    relatedServiceSlugs: ["corporate-risk", "governance", "cyber-security"],
  },
  {
    slug: "private-equity",
    title: "Private Equity",
    subtitle: "Due diligence, governance and strategic risk advisory across the investment lifecycle.",
    description: "We support private equity firms and their portfolio companies in navigating governance, due diligence and strategic risk across the investment lifecycle. From pre-acquisition integrity reviews to post-close governance improvements and exit readiness assessments, our advisors provide independent, objective analysis that enables investors to make informed decisions and protect value throughout the ownership period.",
    challenges: [
      { title: "Investment Due Diligence", description: "Independent assessment of governance, integrity and regulatory risks associated with potential acquisitions and investments across multiple jurisdictions." },
      { title: "Portfolio Governance", description: "Strengthening governance frameworks, board effectiveness and risk oversight across portfolio companies at key stages of the investment cycle." },
      { title: "Exit Readiness", description: "Identifying and remediating governance and compliance risks that could affect valuations, transaction timelines or buyer confidence." },
      { title: "Management Assessment", description: "Discreet background and integrity screening of senior leadership and key personnel within target companies." },
    ],
    relatedServiceSlugs: ["corporate-risk", "governance"],
  },
  {
    slug: "energy-and-resources",
    title: "Energy and Resources",
    subtitle: "Risk strategy, regulatory compliance and operational security across energy and resource operations.",
    description: "We advise energy and resource companies on risk strategy, regulatory compliance and operational security across upstream, midstream and downstream activities. Operating in high-stakes and often politically sensitive environments, our clients benefit from advisors who combine sector knowledge with practical experience in geopolitical risk, security management and regulatory engagement across major producing regions and international markets.",
    challenges: [
      { title: "Political & Country Risk", description: "Assessment of political, regulatory and operational risks in jurisdictions where clients operate or are considering investment." },
      { title: "Security & Resilience", description: "Protecting people, assets and operations from physical and cyber threats in remote, complex and politically sensitive environments." },
      { title: "Regulatory Navigation", description: "Strategic support in navigating regulatory requirements, licence obligations and stakeholder expectations across domestic and international markets." },
      { title: "Joint Venture Integrity", description: "Due diligence and governance advisory on joint ventures, partnerships and co-investment structures in high-risk jurisdictions." },
    ],
    relatedServiceSlugs: ["corporate-risk", "security", "cyber-security"],
  },
  {
    slug: "infrastructure-and-real-assets",
    title: "Infrastructure and Real Assets",
    subtitle: "Governance, security and resilience advisory for infrastructure owners and operators.",
    description: "We provide advisory services to infrastructure owners and operators managing governance, security and resilience challenges across critical asset portfolios. Our advisors support clients across transport, utilities, telecommunications and social infrastructure, helping them protect assets, manage stakeholder expectations and maintain continuity of essential services in an environment of heightened regulatory scrutiny and evolving threat landscapes.",
    challenges: [
      { title: "Critical Asset Protection", description: "Identifying and mitigating physical and cyber security risks to critical infrastructure and essential services." },
      { title: "Crisis & Continuity Planning", description: "Developing and testing crisis management and business continuity frameworks for infrastructure operators." },
      { title: "Procurement & Supply Chain Risk", description: "Due diligence and risk assessment across complex procurement and supply chain arrangements for major infrastructure programmes." },
      { title: "Regulatory & Stakeholder Management", description: "Advisory support in managing regulatory relationships, public scrutiny and stakeholder obligations for critical infrastructure assets." },
    ],
    relatedServiceSlugs: ["security", "corporate-risk", "governance"],
  },
  {
    slug: "technology-and-digital-economy",
    title: "Technology and Digital Economy",
    subtitle: "Cyber risk, regulatory compliance and governance for technology companies scaling across markets.",
    description: "We support technology companies in managing cyber risk, regulatory compliance and governance as they scale across domestic and international markets. From early-stage platforms to established digital businesses, our advisors help clients build robust security governance, navigate complex regulatory obligations and demonstrate the integrity and resilience that investors, partners and regulators increasingly expect.",
    challenges: [
      { title: "Cyber Risk Management", description: "Independent assessment of cyber risk posture, threat exposure and security governance for technology platforms and digital businesses." },
      { title: "Data Governance & Privacy", description: "Review and development of data protection frameworks aligned to GDPR, regional privacy regulations and sector-specific requirements." },
      { title: "Regulatory Compliance", description: "Navigating evolving digital regulation including AI governance, platform obligations, financial services licensing and cybersecurity requirements." },
      { title: "Digital Resilience", description: "Designing resilience frameworks to maintain platform availability and data integrity under adverse operational and cyber conditions." },
    ],
    relatedServiceSlugs: ["cyber-security", "governance", "corporate-risk"],
  },
  {
    slug: "industrial-and-manufacturing",
    title: "Industrial and Manufacturing",
    subtitle: "Operational risk, supply chain security and corporate governance in complex operating environments.",
    description: "We advise industrial and manufacturing organisations on operational risk, supply chain security and corporate governance in complex operating environments. Our advisors bring direct experience across heavy industry, precision manufacturing and global supply chains, supporting clients in identifying vulnerabilities, strengthening oversight frameworks and maintaining operational continuity under demanding and rapidly changing conditions across multiple jurisdictions.",
    challenges: [
      { title: "Supply Chain Risk", description: "Assessment of third-party risk, supplier integrity and supply chain vulnerabilities affecting operational continuity and compliance." },
      { title: "Operational Security", description: "Protecting facilities, personnel and critical processes from physical and insider threats in complex industrial environments." },
      { title: "Compliance & Sanctions Risk", description: "Managing exposure to trade controls, sanctions regimes and regulatory obligations across global manufacturing and distribution networks." },
      { title: "Governance & Accountability", description: "Strengthening corporate governance structures and accountability frameworks within large and complex industrial organisations." },
    ],
    relatedServiceSlugs: ["corporate-risk", "security", "governance"],
  },
  {
    slug: "media-and-communications",
    title: "Media and Communications",
    subtitle: "Risk and governance advisory for media and communications organisations facing reputational and regulatory challenges.",
    description: "We provide risk and governance advisory to media, broadcast and communications organisations navigating reputational, regulatory and operational challenges. Our advisors work with publishers, broadcasters, digital platforms and communications groups to identify and manage the governance, compliance and security risks that can affect editorial credibility, regulatory standing and long-term organisational sustainability.",
    challenges: [
      { title: "Reputational Risk Management", description: "Identifying and managing reputational risks arising from editorial decisions, partnerships, regulatory scrutiny and stakeholder expectations." },
      { title: "Regulatory & Licensing Compliance", description: "Navigating broadcast licensing, content regulation and communications regulatory obligations across multiple jurisdictions." },
      { title: "Cyber & Data Security", description: "Protecting broadcast infrastructure, editorial systems and sensitive source data from cyber threats and information security risks." },
      { title: "Crisis Preparedness", description: "Developing crisis management plans and communication protocols for significant reputational, legal or operational incidents." },
    ],
    relatedServiceSlugs: ["governance", "cyber-security", "security"],
  },
  {
    slug: "life-sciences",
    title: "Life Sciences",
    subtitle: "Corporate governance, regulatory risk and operational resilience for life sciences organisations.",
    description: "We advise life sciences organisations on corporate governance, regulatory risk and operational resilience across research, development and commercialisation. Operating in one of the most heavily regulated sectors globally, our clients rely on advisors who understand the governance expectations of regulators, investors and partners, and can provide practical support in managing risk at every stage of the product and organisational lifecycle.",
    challenges: [
      { title: "Regulatory Risk & Compliance", description: "Managing complex regulatory obligations across research, clinical development, manufacturing and commercialisation in multiple markets." },
      { title: "Clinical & Research Integrity", description: "Governance advisory on research integrity, ethics frameworks and accountability structures within clinical and scientific programmes." },
      { title: "Partner & Distributor Due Diligence", description: "Due diligence on licensing partners, distributors and commercial partners across complex international markets." },
      { title: "Operational Resilience", description: "Protecting critical research infrastructure, supply chains and manufacturing operations from disruption and security threats." },
    ],
    relatedServiceSlugs: ["corporate-risk", "governance", "security"],
  },
  {
    slug: "consumer-markets",
    title: "Consumer Markets",
    subtitle: "Brand risk, governance and operational security for consumer-facing businesses expanding across competitive markets.",
    description: "We support consumer-facing businesses in managing brand risk, governance and operational security as they expand across diverse and competitive markets. Whether entering new geographies, managing complex supply chains or responding to regulatory change, our advisors help consumer organisations protect their reputation, maintain compliance and build the governance foundations needed to sustain growth and stakeholder trust.",
    challenges: [
      { title: "Brand & Reputational Risk", description: "Identifying and mitigating risks to brand integrity arising from third-party relationships, supply chain issues and regulatory developments." },
      { title: "Market Entry & Expansion", description: "Assessment of regulatory, political and operational risks associated with entering new markets and establishing local operations." },
      { title: "Supply Chain Integrity", description: "Due diligence and ongoing monitoring of supplier integrity, ethical sourcing practices and third-party compliance obligations." },
      { title: "Governance & Compliance", description: "Strengthening corporate governance frameworks and compliance programmes as organisations scale across international markets." },
    ],
    relatedServiceSlugs: ["corporate-risk", "governance", "security"],
  },
  {
    slug: "legal-and-professional-services",
    title: "Legal and Professional Services",
    subtitle: "Governance, risk management and operational resilience for professional services firms.",
    description: "We advise professional services firms on governance, risk management and operational resilience as they manage complex client and regulatory obligations. Law firms, consultancies, accountancy practices and other professional services organisations face distinctive governance and integrity challenges. Our advisors provide discreet, experienced support in managing partner risk, conflicts of interest, regulatory compliance and the protection of sensitive client information.",
    challenges: [
      { title: "Conflict & Integrity Risk", description: "Managing conflicts of interest, client integrity risks and professional standards obligations across complex engagements and partnerships." },
      { title: "Information Security & Confidentiality", description: "Protecting sensitive client data, privileged information and firm intellectual property from cyber threats and insider risk." },
      { title: "Regulatory & Professional Compliance", description: "Navigating professional regulatory obligations, bar requirements and sector-specific compliance frameworks across multiple jurisdictions." },
      { title: "Partner & Leadership Due Diligence", description: "Discreet background and integrity assessment of senior appointments, lateral hires and prospective partners." },
    ],
    relatedServiceSlugs: ["governance", "corporate-risk", "cyber-security"],
  },
]

export function getSector(slug: string): Sector | undefined {
  return SECTORS.find((s) => s.slug === slug)
}
