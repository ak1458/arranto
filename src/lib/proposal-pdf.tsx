// Branded proposal PDF (design §6). Server-only — imported by /api/proposal/pdf.
// Monochrome, Fraunces headings / Inter body (Tajawal for Arabic), sharp corners.
// Contains NO price figures — D11: investment is discussed with the founder.
import path from "path";
import { Document, Page, Text, View, Font, StyleSheet } from "@react-pdf/renderer";
import type { ProposalData } from "@/lib/proposal";

const fontDir = path.join(process.cwd(), "src", "assets", "fonts");

Font.register({ family: "Fraunces", src: path.join(fontDir, "fraunces-600.woff") });
Font.register({
  family: "Inter",
  fonts: [
    { src: path.join(fontDir, "inter-400.woff") },
    { src: path.join(fontDir, "inter-500.woff"), fontWeight: 500 },
  ],
});
Font.register({
  family: "Tajawal",
  fonts: [
    { src: path.join(fontDir, "Tajawal-Regular.ttf") },
    { src: path.join(fontDir, "Tajawal-Bold.ttf"), fontWeight: 700 },
  ],
});
// Bullet glyph "—" is fine in all three fonts; disable hyphenation for Arabic.
Font.registerHyphenationCallback((word) => [word]);

const L = {
  en: {
    title: "Project Proposal",
    preparedFor: "Prepared for",
    overview: "Overview",
    goals: "Goals",
    scope: "Proposed scope",
    timeline: "Indicative timeline",
    budget: "Your stated budget range",
    next: "Next steps",
    nextItems: [
      "The founder reviews this proposal and contacts you directly.",
      "A short call to confirm scope, constraints, and priorities.",
      "You receive a concrete plan with milestones before any commitment.",
    ],
    investment: "This document outlines scope and approach. Investment is discussed directly with the founder — no automated pricing.",
    types: { "ai-automation": "AI Automation", "ai-product": "AI Product Development", saas: "SaaS Development" },
    overviewBody: (t: string, who: string) =>
      `${who} is exploring an engagement with Arranto — a founder-led software studio (est. 2017, 10+ delivered projects, 118 verified Google reviews) — for ${t}. This proposal summarizes what was discussed with the studio assistant.`,
    footer: "Arranto — founder-led software studio · est. 2017 · arranto.com · help@arranto.com",
  },
  // Arabic PDF strings are deliberately Latin-free (except the LTR-only footer
  // line): react-pdf has no bidi algorithm, so mixed-direction lines scramble.
  // Pure-RTL runs render correctly. Trailing periods omitted for the same reason
  // (neutral punctuation jumps to the wrong side of the line).
  ar: {
    title: "عرض مشروع",
    preparedFor: "أُعدّ لـ",
    overview: "نظرة عامة",
    goals: "الأهداف",
    scope: "النطاق المقترح",
    timeline: "الجدول الزمني التقريبي",
    budget: "النطاق المالي الذي حددته",
    next: "الخطوات التالية",
    nextItems: [
      "يراجع المؤسس هذا العرض ويتواصل معك مباشرة",
      "مكالمة قصيرة لتأكيد النطاق والأولويات",
      "تستلم خطة عمل واضحة بمراحل محددة قبل أي التزام",
    ],
    investment: "يوضح هذا المستند النطاق والمنهجية — تُناقش التكلفة مباشرة مع المؤسس، لا تسعير آلي",
    types: { "ai-automation": "أتمتة الذكاء الاصطناعي", "ai-product": "تطوير منتجات الذكاء الاصطناعي", saas: "تطوير المنصات السحابية" },
    overviewBody: (t: string, who: string) =>
      `يستكشف ${who} مشروع ${t} مع أرانتو، استوديو برمجيات يقوده مؤسسه — تأسس 2017، أكثر من 10 مشاريع مُسلّمة، 118 تقييمًا موثّقًا على جوجل. يلخص هذا العرض ما نوقش مع مساعد الاستوديو`,
    footer: "أرانتو · استوديو برمجيات يقوده مؤسسه · تأسس 2017",
  },
} as const;

// LTR-only second footer line for Arabic PDFs (kept out of the RTL run).
const FOOTER_CONTACT = "arranto.com · help@arranto.com";

type PdfStyles = ReturnType<typeof StyleSheet.create>;

function Bullets({ items, s }: { items: readonly string[]; s: PdfStyles }) {
  return (
    <View>
      {items.map((it, i) => (
        <View key={i} style={s.bulletRow} wrap={false}>
          <Text style={s.bulletGlyph}>—</Text>
          <Text style={s.bulletText}>{it}</Text>
        </View>
      ))}
    </View>
  );
}

export function ProposalPdf({ data }: { data: ProposalData }) {
  const ar = data.locale === "ar";
  const t = L[data.locale];
  const body = ar ? "Tajawal" : "Inter";
  const display = ar ? "Tajawal" : "Fraunces";
  const align = ar ? ("right" as const) : ("left" as const);
  const row = ar ? ("row-reverse" as const) : ("row" as const);

  const s = StyleSheet.create({
    page: { backgroundColor: "#ffffff", color: "#0a0a0a", fontFamily: body, fontSize: 10.5, paddingTop: 52, paddingBottom: 64, paddingHorizontal: 52, lineHeight: 1.5 },
    brandRow: { flexDirection: row, justifyContent: "space-between", alignItems: "center", marginBottom: 6 },
    wordmark: { fontFamily: "Inter", fontWeight: 500, fontSize: 12, letterSpacing: 5 },
    date: { fontSize: 9, color: "#8e8f94" },
    rule: { borderBottomWidth: 1, borderBottomColor: "#0a0a0a", marginBottom: 28 },
    title: { fontFamily: display, fontWeight: ar ? 700 : undefined, fontSize: 26, marginBottom: 22, textAlign: align },
    // Letterspacing breaks Arabic letter joining — Latin-only treatment.
    label: { fontSize: 8, letterSpacing: ar ? 0 : 2, color: "#8e8f94", textTransform: "uppercase", marginBottom: 5, textAlign: align },
    section: { marginBottom: 18 },
    text: { textAlign: align },
    strong: { fontWeight: ar ? 700 : 500, textAlign: align },
    bulletRow: { flexDirection: row, marginBottom: 3 },
    bulletGlyph: { width: 14, color: "#8e8f94", textAlign: ar ? ("left" as const) : ("left" as const) },
    bulletText: { flex: 1, textAlign: align },
    note: { marginTop: 6, paddingTop: 10, borderTopWidth: 1, borderTopColor: "#d8d9dc", fontSize: 9, color: "#55565a", textAlign: align },
    footer: { position: "absolute", bottom: 28, left: 52, right: 52, fontSize: 8, color: "#8e8f94", textAlign: "center", borderTopWidth: 1, borderTopColor: "#d8d9dc", paddingTop: 8 },
  });

  const who = data.company ? `${data.name} (${data.company})` : data.name;

  return (
    <Document title={`Arranto — ${t.title}`} author="Arranto">
      <Page size="A4" style={s.page}>
        <View style={s.brandRow}>
          <Text style={s.wordmark}>ARRANTO</Text>
          <Text style={s.date}>{data.date}</Text>
        </View>
        <View style={s.rule} />

        <Text style={s.title}>{t.title}</Text>

        <View style={s.section}>
          <Text style={s.label}>{t.preparedFor}</Text>
          <Text style={s.strong}>{who}</Text>
          <Text style={s.text}>{data.email}</Text>
        </View>

        <View style={s.section}>
          <Text style={s.label}>{t.overview}</Text>
          <Text style={s.text}>{t.overviewBody(t.types[data.projectType], who)}</Text>
        </View>

        <View style={s.section}>
          <Text style={s.label}>{t.goals}</Text>
          <Bullets items={data.goals} s={s} />
        </View>

        <View style={s.section}>
          <Text style={s.label}>{t.scope}</Text>
          <Bullets items={data.scope} s={s} />
        </View>

        {data.timeline && (
          <View style={s.section}>
            <Text style={s.label}>{t.timeline}</Text>
            <Text style={s.text}>{data.timeline}</Text>
          </View>
        )}

        {data.budgetBand && (
          <View style={s.section}>
            <Text style={s.label}>{t.budget}</Text>
            <Text style={s.text}>{data.budgetBand}</Text>
          </View>
        )}

        <View style={s.section}>
          <Text style={s.label}>{t.next}</Text>
          <Bullets items={t.nextItems} s={s} />
        </View>

        <Text style={s.note}>{t.investment}</Text>
        <View style={s.footer} fixed>
          <Text>{t.footer}</Text>
          {ar && <Text>{FOOTER_CONTACT}</Text>}
        </View>
      </Page>
    </Document>
  );
}
