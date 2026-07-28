// LangChain RAG & Knowledge Indexing System for Arrento AI Engine
import { sorted as caseStudies } from "@/content/work";
import { services } from "@/content/services";

export interface KnowledgeChunk {
  id: string;
  source: string;
  category: "case-study" | "service" | "compliance" | "tool" | "general";
  title: string;
  content: string;
  metadata: Record<string, string>;
}

// Global Knowledge Store initialized from Arrento content & compliance docs
const KNOWLEDGE_BASE: KnowledgeChunk[] = [
  ...caseStudies.map((cs) => ({
    id: `case-study-${cs.slug}`,
    source: `/work/${cs.slug}`,
    category: "case-study" as const,
    title: cs.title,
    content: `${cs.title}: ${cs.body.en} Stack: ${cs.stack.join(", ")}. Status: ${cs.status}. Outcome: ${cs.outcome.en}. ${cs.faq.map((f) => `Q: ${f.q.en} A: ${f.a.en}`).join(" ")}`,
    metadata: { slug: cs.slug, status: cs.status },
  })),
  ...services.map((svc) => ({
    id: `service-${svc.slug}`,
    source: `/services/${svc.slug}`,
    category: "service" as const,
    title: svc.title.en,
    content: `Service: ${svc.title.en}. ${svc.subtitle.en}. ${svc.features.en.map((f) => `${f.title}: ${f.desc}`).join(" ")}`,
    metadata: { slug: svc.slug },
  })),
  {
    id: "compliance-zatca-phase-2",
    source: "/work/fatoora-lite",
    category: "compliance",
    title: "Saudi ZATCA Phase 2 E-Invoicing Standard",
    content: "ZATCA Phase 2 mandate in Saudi Arabia requires XML UBL 2.1 formatting, ECDSA secp256k1 cryptographic stamps, CCSID onboarding certificates, and real-time invoice clearance via official ZATCA REST APIs.",
    metadata: { region: "SA", standard: "ZATCA Phase 2" },
  },
  {
    id: "compliance-pdpl-privacy",
    source: "/legal/privacy",
    category: "compliance",
    title: "Saudi PDPL & GCC Data Privacy Regulation",
    content: "Personal Data Protection Law (PDPL) in Saudi Arabia and GCC data localization requirements govern secure data storage, client consent, encryption at rest (AES-256), and audited access controls for regional enterprise software.",
    metadata: { region: "GCC", standard: "PDPL" },
  },
];

/**
 * Term frequency / Cosine Similarity RAG Retriever (LangChain RAG pattern)
 */
export function queryKnowledgeBase(query: string, topK: number = 3): KnowledgeChunk[] {
  const queryTerms = query.toLowerCase().split(/\W+/).filter((t) => t.length > 2);
  if (queryTerms.length === 0) return KNOWLEDGE_BASE.slice(0, topK);

  const scored = KNOWLEDGE_BASE.map((chunk) => {
    const text = `${chunk.title} ${chunk.content}`.toLowerCase();
    let matches = 0;
    for (const term of queryTerms) {
      if (text.includes(term)) matches += 1;
    }
    const score = matches / Math.sqrt(text.length || 1);
    return { chunk, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map((s) => s.chunk);
}
