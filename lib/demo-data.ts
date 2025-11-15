/**
 * Demo data to use when Mistral API is unavailable
 */

export const getDemoStrategy = (idea: string) => ({
  persona: {
    title: "Target Persona",
    description: `Professional seeking ${idea}`,
    details: [
      "Tech-savvy early adopters",
      "Values efficiency and innovation",
      "Active on digital platforms"
    ]
  },
  product: {
    title: "Product Vision",
    description: `AI-powered solution for ${idea}`,
    features: [
      "Intuitive user interface",
      "Real-time processing",
      "Scalable architecture",
      "Mobile-first design"
    ]
  },
  stack: {
    title: "Tech Stack",
    frontend: ["Next.js 14", "React", "TypeScript", "Tailwind CSS"],
    backend: ["Node.js", "PostgreSQL", "Redis"],
    ai: ["Mistral AI", "LangChain"],
    infrastructure: ["Vercel", "AWS", "Docker"]
  },
  planning: {
    title: "Development Roadmap",
    phases: [
      {
        name: "Phase 1: MVP",
        duration: "4 weeks",
        tasks: ["Core features", "Basic UI", "API integration"]
      },
      {
        name: "Phase 2: Beta",
        duration: "6 weeks",
        tasks: ["User testing", "Performance optimization", "Bug fixes"]
      },
      {
        name: "Phase 3: Launch",
        duration: "4 weeks",
        tasks: ["Marketing campaign", "Production deployment", "Monitoring"]
      }
    ]
  },
  aiAgents: {
    title: "AI Agents",
    agents: [
      {
        name: "Content Generator",
        role: "Creates personalized content",
        capabilities: ["Natural language processing", "Context awareness"]
      },
      {
        name: "Analytics Agent",
        role: "Provides insights and recommendations",
        capabilities: ["Data analysis", "Predictive modeling"]
      }
    ]
  }
})
