import { ComprehensiveStrategy } from '@/types/strategy-v2'

export function getDemoStrategyV2(idea: string): ComprehensiveStrategy {
  return {
    projectName: `${idea} Platform`,
    tagline: `Revolutionizing ${idea} with AI-powered innovation`,
    
    vision: {
      strategy: {
        title: "Strategic Vision",
        vision: "Transform the industry through innovative AI solutions",
        visionDetail: "We envision a future where technology seamlessly integrates with daily operations. Our goal is to become the leading platform in this space. We aim to set new standards for innovation and user experience.",
        mission: "Empower users with cutting-edge AI technology",
        missionDetail: "Our mission is to make advanced AI accessible to everyone. We focus on solving real problems with practical solutions. We believe in creating value through innovation and excellence.",
        values: "Innovation, Excellence, User-Centric Design",
        valuesDetail: "We prioritize innovation in everything we do. Excellence is our standard, not our goal. User satisfaction drives our decisions and shapes our product development."
      },
      marketStudy: {
        title: "Market Analysis",
        marketSize: "Global market valued at $50B, growing 25% annually",
        marketSizeDetail: "The total addressable market is expanding rapidly. Current growth trends indicate strong demand. We target a serviceable market of $5B initially. Future expansion could reach $20B within 5 years.",
        competition: "Fragmented market with traditional players lacking innovation",
        competitionDetail: "Current competitors focus on legacy solutions. They lack modern AI integration and user experience. Market gaps exist in automation and personalization. We position ourselves as the innovative disruptor.",
        opportunity: "Emerging demand for AI-powered automation solutions",
        opportunityDetail: "Market timing is ideal with increasing AI adoption. Businesses seek efficiency and cost reduction. Regulatory changes favor digital transformation. Technology maturity enables our solution now.",
        targetSegment: "Tech-forward businesses and professionals",
        targetSegmentDetail: "Our primary segment includes SMBs and enterprises. They value innovation and ROI. Decision-makers are typically 30-50 years old. They have budget authority and seek competitive advantages."
      }
    },
    
    solution: {
      mvp: {
        title: "MVP Solution",
        concept: "AI-powered platform for intelligent automation",
        conceptDetail: "Our platform combines machine learning with intuitive design. Users can automate complex workflows without coding. The system learns from usage patterns to improve over time. Integration with existing tools ensures seamless adoption.",
        coreFeature1: "Intelligent automation engine",
        coreFeature1Detail: "The automation engine uses advanced AI to understand user intent. It processes natural language commands and executes complex tasks. Machine learning improves accuracy with each interaction. Success metrics include 90% task completion rate.",
        coreFeature2: "Real-time analytics dashboard",
        coreFeature2Detail: "Users get instant insights into their operations. The dashboard visualizes key metrics and trends. Predictive analytics help anticipate future needs. Custom reports can be generated on demand.",
        coreFeature3: "Seamless integrations",
        coreFeature3Detail: "Connect with 100+ popular business tools. API-first architecture enables custom integrations. Webhooks provide real-time data synchronization. Pre-built connectors reduce setup time to minutes.",
        userExperience: "Intuitive, mobile-first design with minimal learning curve",
        userExperienceDetail: "Our UX prioritizes simplicity without sacrificing power. Mobile-responsive design works on any device. Onboarding takes less than 5 minutes. Accessibility features ensure inclusive design for all users.",
        differentiation: "AI-first approach with superior automation capabilities",
        differentiationDetail: "Unlike competitors, we built AI into our core architecture. Our algorithms are 3x more accurate than alternatives. Network effects improve the platform as usage grows. Patent-pending technology creates defensible moats."
      }
    },
    
    model: {
      businessModel: {
        title: "Business Model",
        revenueStreams: "SaaS subscriptions, usage-based pricing, enterprise licenses",
        revenueStreamsDetail: "Primary revenue comes from monthly subscriptions. Usage-based pricing scales with customer growth. Enterprise licenses provide predictable annual revenue. Professional services add 15% additional revenue.",
        pricingStrategy: "Freemium model with tiered subscriptions",
        pricingStrategyDetail: "Free tier attracts users and drives viral growth. Pro tier at $49/month targets individuals. Business tier at $199/month serves small teams. Enterprise custom pricing for large organizations.",
        costStructure: "Cloud infrastructure, AI API costs, team salaries",
        costStructureDetail: "Infrastructure costs scale with usage (30% of revenue). AI API costs decrease as we build proprietary models. Team salaries are largest fixed cost. Marketing represents 25% of budget.",
        unitEconomics: "CAC $150, LTV $1,800, LTV:CAC ratio 12:1",
        unitEconomicsDetail: "Customer acquisition cost averages $150 across channels. Lifetime value reaches $1,800 with 18-month retention. LTV:CAC ratio of 12:1 indicates strong economics. Payback period is 3 months with 70% gross margins."
      },
      techStack: {
        title: "Technical Stack",
        frontend: "Next.js 14, React, TypeScript, Tailwind CSS",
        frontendDetail: "Next.js provides excellent performance and SEO. React ecosystem offers rich component libraries. TypeScript ensures code quality and maintainability. Tailwind enables rapid UI development with consistency.",
        backend: "Node.js, PostgreSQL, Redis, GraphQL",
        backendDetail: "Node.js enables full-stack JavaScript development. PostgreSQL provides reliable relational data storage. Redis handles caching and real-time features. GraphQL API offers flexible data fetching.",
        infrastructure: "Vercel, AWS, Docker, Kubernetes",
        infrastructureDetail: "Vercel hosts frontend with edge network. AWS provides scalable backend infrastructure. Docker containers ensure consistent deployments. Kubernetes orchestrates microservices at scale.",
        aiTools: "Mistral AI, Fal.ai, ElevenLabs, Qdrant",
        aiToolsDetail: "Mistral AI powers natural language understanding. Fal.ai generates visual content on demand. ElevenLabs creates voice interactions. Qdrant enables semantic search capabilities.",
        security: "SOC 2 compliance, end-to-end encryption, SSO",
        securityDetail: "SOC 2 Type II certification ensures enterprise readiness. All data encrypted at rest and in transit. SSO integration with major identity providers. Regular security audits and penetration testing."
      }
    },
    
    growth: {
      launchTimeline: {
        title: "Launch Timeline",
        phase1: "Foundation: MVP development and initial testing",
        phase1Detail: "Build core features with small team of 5. Conduct user interviews with 50 potential customers. Develop technical infrastructure and architecture. Recruit first 100 beta users for feedback.",
        phase1Duration: "8-12 weeks",
        phase2: "Validation: Beta launch and product-market fit",
        phase2Detail: "Launch beta to 1,000 early adopters. Iterate based on user feedback and metrics. Achieve product-market fit indicators. Build case studies and testimonials.",
        phase2Duration: "12-16 weeks",
        phase3: "Scale: Full launch and market penetration",
        phase3Detail: "Public launch with marketing campaign. Scale to 10,000 users in first quarter. Expand team to 15 people. Launch enterprise tier and partnerships.",
        phase3Duration: "16-24 weeks"
      },
      growthStrategy: {
        title: "Growth Strategy",
        acquisitionChannels: "Content marketing, SEO, partnerships, product-led growth",
        acquisitionChannelsDetail: "Content marketing establishes thought leadership. SEO drives organic traffic from search. Strategic partnerships provide distribution channels. Product-led growth creates viral loops through sharing.",
        retentionStrategy: "Onboarding excellence, engagement loops, customer success",
        retentionStrategyDetail: "Personalized onboarding increases activation by 40%. Weekly engagement emails drive feature adoption. Dedicated customer success for enterprise accounts. Community building fosters user loyalty and advocacy.",
        scalingPlan: "Geographic expansion and vertical specialization",
        scalingPlanDetail: "Start with English-speaking markets then expand globally. Develop vertical-specific solutions for key industries. Scale team across engineering, sales, and support. Build partner ecosystem for extended reach.",
        partnerships: "Integration partners, resellers, technology alliances",
        partnershipsDetail: "Partner with complementary SaaS platforms. Establish reseller network for enterprise sales. Form technology alliances with AI providers. Co-marketing initiatives amplify reach and credibility."
      }
    },
    
    unicorn: {
      kpis: {
        title: "Key Performance Indicators",
        northStarMetric: "Weekly Active Users completing automated tasks",
        northStarMetricDetail: "This metric reflects true product value delivery. Target 10,000 WAU by month 6. Measures both adoption and engagement. Tracked daily with weekly trend analysis.",
        acquisitionMetrics: "CAC, conversion rates, viral coefficient, growth rate",
        acquisitionMetricsDetail: "CAC target of $150 across all channels. Freemium to paid conversion rate of 5%. Viral coefficient of 1.3 drives organic growth. Month-over-month growth rate of 20%.",
        engagementMetrics: "DAU/MAU ratio, retention curves, feature adoption",
        engagementMetricsDetail: "Target DAU/MAU ratio of 40% indicates stickiness. 90-day retention curve above 30%. Core feature adoption within first week. Average session time of 15 minutes.",
        revenueMetrics: "MRR, ARPU, churn rate, expansion revenue",
        revenueMetricsDetail: "Monthly recurring revenue growing 25% monthly. ARPU of $75 across all tiers. Net revenue churn below 5% monthly. Expansion revenue from upgrades at 20%."
      },
      learnings: {
        title: "Learning Framework",
        assumptions: "Users want automation, pricing is acceptable, integrations matter",
        assumptionsDetail: "Key assumption: users will pay for time savings. Pricing hypothesis: $49/month is sweet spot. Integration assumption: 10 key tools cover 80% of needs. These require rapid validation through experiments.",
        experiments: "Landing page tests, pricing experiments, feature A/B tests",
        experimentsDetail: "Run landing page tests to validate messaging. Test pricing tiers with different cohorts. A/B test onboarding flows for activation. Conduct user interviews weekly for qualitative insights.",
        pivotStrategy: "Monitor metrics weekly, pivot triggers defined",
        pivotStrategyDetail: "Define clear pivot triggers: if CAC exceeds $300 or retention drops below 20%. Alternative paths include vertical focus or B2C pivot. Maintain flexibility in product roadmap. Regular strategy reviews every 6 weeks."
      },
      aiAgents: {
        title: "AI Agents Strategy",
        agent1: "Automation Assistant - Mistral-powered task executor",
        agent1Detail: "This agent understands natural language commands. It translates user intent into automated workflows. Mistral AI provides the language understanding layer. Integration with APIs enables action execution.",
        agent1Impact: "40% reduction in manual task time",
        agent2: "Content Generator - Fal.ai visual creation",
        agent2Detail: "Generates custom visuals and graphics on demand. Uses Fal.ai for fast image generation. Integrates with user brand guidelines. Produces marketing materials automatically.",
        agent2Impact: "60% faster content production",
        agent3: "Voice Interface - ElevenLabs conversational AI",
        agent3Detail: "Enables voice commands and audio responses. ElevenLabs provides natural-sounding speech. Supports multiple languages and accents. Improves accessibility for all users.",
        agent3Impact: "2x increase in user engagement"
      }
    }
  }
}
