export interface Service {
  slug: string
  title: string
  subtitle: string
  overview: string[]
  capabilities: { title: string; description: string }[]
  approach: { step: string; title: string; description: string }[]
}

export const SERVICES: Service[] = [
  {
    slug: "corporate-risk",
    title: "Corporate Risk & Due Diligence",
    subtitle: "Independent assessment of governance frameworks, compliance structures and risk exposure to support sound decision-making.",
    overview: [
      "Stern Advisory Global provides comprehensive corporate risk and due diligence advisory to organisations navigating complex regulatory, financial and operational environments. Our approach combines deep sector expertise with independent, objective analysis.",
      "We work with boards, executive leadership and investors to identify, assess and mitigate risks that may affect organisational performance, reputation or compliance. Whether supporting a transaction, regulatory review or internal governance reform, our advisory is tailored to the specific circumstances and objectives of each client.",
    ],
    capabilities: [
      {
        title: "Corporate Governance Review",
        description: "Assessment of board structures, governance frameworks and decision-making processes against international best practice.",
      },
      {
        title: "Regulatory Compliance",
        description: "Review of compliance posture across applicable regulatory regimes, identifying gaps and supporting remediation.",
      },
      {
        title: "Transaction Due Diligence",
        description: "Independent risk assessment in support of M&A, investment and partnership transactions across multiple jurisdictions.",
      },
      {
        title: "Risk Framework Design",
        description: "Development and implementation of enterprise risk management frameworks aligned to organisational strategy.",
      },
      {
        title: "Board & Executive Advisory",
        description: "Confidential advisory to senior leadership and board members on governance, risk and strategic matters.",
      },
      {
        title: "Regulatory Affairs Support",
        description: "Strategic support in navigating regulatory interactions, enforcement proceedings and compliance obligations.",
      },
    ],
    approach: [
      {
        step: "01",
        title: "Scoping & Engagement",
        description: "We establish the scope, objectives and parameters of the engagement through a confidential dialogue with senior stakeholders.",
      },
      {
        step: "02",
        title: "Independent Assessment",
        description: "Our advisors conduct a structured assessment of governance, risk and compliance, drawing on documentary review, interviews and comparative benchmarking.",
      },
      {
        step: "03",
        title: "Analysis & Findings",
        description: "We synthesise findings into a clear, actionable report with prioritised recommendations appropriate to the organisation's context.",
      },
      {
        step: "04",
        title: "Advisory Support",
        description: "Where required, we provide ongoing advisory support to assist with the implementation of recommendations and management of emerging risks.",
      },
    ],
  },
  {
    slug: "governance",
    title: "Governance & Integrity Advisory",
    subtitle: "Strengthening board governance, integrity frameworks and institutional accountability across complex organisations.",
    overview: [
      "Effective governance is fundamental to organisational resilience and long-term performance. Stern Advisory Global works with organisations to assess, design and strengthen governance frameworks that reflect international standards and meet the expectations of regulators, investors and stakeholders.",
      "Our integrity advisory services address the full spectrum of governance risk — from board effectiveness and conflicts of interest to anti-corruption compliance and ethics programme design. We bring independence, discretion and practical expertise to sensitive governance matters.",
    ],
    capabilities: [
      {
        title: "Board Effectiveness Review",
        description: "Assessment of board composition, dynamics and effectiveness, with recommendations for structural and process improvement.",
      },
      {
        title: "Integrity Framework Design",
        description: "Development of integrity policies, codes of conduct and control frameworks tailored to the organisation's risk profile.",
      },
      {
        title: "Anti-Corruption Compliance",
        description: "Assessment and strengthening of anti-bribery and corruption controls in line with applicable legislation and international standards.",
      },
      {
        title: "Conflict of Interest Management",
        description: "Design and review of conflict of interest policies, disclosure frameworks and management processes.",
      },
      {
        title: "Whistleblower & Ethics Systems",
        description: "Implementation and review of confidential reporting mechanisms, investigation procedures and whistleblower protection frameworks.",
      },
      {
        title: "Governance Training & Awareness",
        description: "Tailored training programmes for boards, executives and staff on governance obligations, ethical standards and accountability.",
      },
    ],
    approach: [
      {
        step: "01",
        title: "Governance Diagnostic",
        description: "A structured review of existing governance arrangements, policies and controls to establish a baseline and identify priority areas.",
      },
      {
        step: "02",
        title: "Stakeholder Engagement",
        description: "Confidential engagement with board members, executives and key stakeholders to understand governance culture and identify concerns.",
      },
      {
        step: "03",
        title: "Framework Development",
        description: "Design of governance and integrity frameworks aligned to the organisation's strategy, risk appetite and regulatory obligations.",
      },
      {
        step: "04",
        title: "Implementation & Monitoring",
        description: "Support with embedding governance improvements and establishing mechanisms for ongoing monitoring and accountability.",
      },
    ],
  },
  {
    slug: "security",
    title: "Security & Operational Resilience",
    subtitle: "Advising on physical security, crisis preparedness and the continuity of critical operations in complex environments.",
    overview: [
      "Organisations operating in complex, high-risk or politically sensitive environments require robust security and resilience strategies. Stern Advisory Global provides expert advisory to help clients protect their people, assets and operations against a broad range of physical and operational threats.",
      "Drawing on decades of experience across government, intelligence, defence and private sector environments, our advisors offer practical, risk-based guidance on security strategy, crisis preparedness and business continuity. We work with organisations across multiple sectors and jurisdictions to build enduring operational resilience.",
    ],
    capabilities: [
      {
        title: "Security Risk Assessment",
        description: "Comprehensive assessment of physical and operational security risks across facilities, personnel and supply chains.",
      },
      {
        title: "Crisis Management Planning",
        description: "Development and testing of crisis management plans, response protocols and communication frameworks.",
      },
      {
        title: "Business Continuity Advisory",
        description: "Design and review of business continuity management frameworks to maintain critical operations under adverse conditions.",
      },
      {
        title: "Threat & Country Risk Analysis",
        description: "Assessment of political, security and operational risks in jurisdictions where clients operate or are considering investment.",
      },
      {
        title: "Executive & Personnel Security",
        description: "Advisory on protective security arrangements for senior executives, board members and key personnel in high-risk environments.",
      },
      {
        title: "Incident Response Support",
        description: "Expert advisory and operational support during security incidents, crisis events and sensitive investigations.",
      },
    ],
    approach: [
      {
        step: "01",
        title: "Risk Identification",
        description: "Structured identification of security and resilience risks across the organisation's operating environment, people and critical assets.",
      },
      {
        step: "02",
        title: "Vulnerability Assessment",
        description: "Detailed assessment of existing security arrangements and resilience capabilities against identified risk scenarios.",
      },
      {
        step: "03",
        title: "Strategy & Planning",
        description: "Development of a security and resilience strategy with prioritised recommendations and implementation roadmap.",
      },
      {
        step: "04",
        title: "Exercising & Assurance",
        description: "Facilitation of crisis exercises, tabletop simulations and ongoing assurance activities to test and validate resilience capability.",
      },
    ],
  },
  {
    slug: "cyber-security",
    title: "Cyber Security Advisory",
    subtitle: "Strategic guidance on cyber risk, threat intelligence and digital security governance for organisations operating in complex environments.",
    overview: [
      "Cyber threats represent one of the most significant and rapidly evolving risks facing organisations today. Stern Advisory Global provides independent, strategic cyber security advisory to help organisations understand their cyber risk exposure, strengthen their security governance and build digital resilience.",
      "Our advisors bring deep expertise in cyber risk strategy, threat intelligence, regulatory compliance and incident response. We work with boards, CISOs and executive teams to translate complex technical risks into clear business decisions and actionable governance frameworks.",
    ],
    capabilities: [
      {
        title: "Cyber Risk Assessment",
        description: "Independent assessment of cyber risk posture, including threat landscape analysis, control gaps and exposure to key risk scenarios.",
      },
      {
        title: "Threat Intelligence",
        description: "Strategic threat intelligence services informing risk decisions, investment priorities and security governance at board and executive level.",
      },
      {
        title: "Security Governance & Strategy",
        description: "Development of cyber security governance frameworks, policies and strategies aligned to business objectives and regulatory requirements.",
      },
      {
        title: "Regulatory & Compliance Advisory",
        description: "Advisory on cyber security regulatory obligations including NIS2, DORA, GDPR and sector-specific requirements across multiple jurisdictions.",
      },
      {
        title: "Digital Resilience Planning",
        description: "Design of digital resilience frameworks addressing prevention, detection, response and recovery from cyber incidents.",
      },
      {
        title: "Board & Executive Advisory",
        description: "Confidential advisory to boards and senior executives on cyber risk, security investment and incident response decision-making.",
      },
    ],
    approach: [
      {
        step: "01",
        title: "Risk Baseline",
        description: "Establishment of a clear baseline of the organisation's cyber risk exposure, threat landscape and current security maturity.",
      },
      {
        step: "02",
        title: "Strategic Assessment",
        description: "Assessment of security governance, strategy and controls against regulatory requirements and industry best practice.",
      },
      {
        step: "03",
        title: "Roadmap & Recommendations",
        description: "Development of a prioritised cyber security roadmap with actionable recommendations aligned to risk appetite and resource constraints.",
      },
      {
        step: "04",
        title: "Ongoing Advisory",
        description: "Retained advisory support providing strategic guidance on emerging threats, regulatory developments and security programme delivery.",
      },
    ],
  },
]

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug)
}
