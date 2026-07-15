import { z } from "zod";

// Contract from docs/arranto-schema.md §1. Validated at module load, which for the
// SSG /work routes means build time: a missing field or a bogus `status` fails the
// build loudly instead of shipping a dishonest status label.
const localized = z.object({ en: z.string().min(1), ar: z.string().min(1) });

export const caseStudySchema = z.object({
  slug: z
    .string()
    .regex(/^[a-z0-9-]+$/, "slug must be kebab-case"),
  title: z.string().min(1),
  outcome: localized,
  status: z.enum(["proven", "in-pilot", "held"]),
  stack: z.array(z.string().min(1)).min(1),
  order: z.number().int().positive(),
  body: localized,
  faq: z.array(z.object({ q: localized, a: localized })),
  repo: z.string().min(1).optional(),
});

export const caseStudiesSchema = z
  .array(caseStudySchema)
  .superRefine((studies, ctx) => {
    const dupes = (key: "slug" | "order") =>
      studies.map((s) => s[key]).filter((v, i, all) => all.indexOf(v) !== i);
    for (const key of ["slug", "order"] as const) {
      for (const value of dupes(key)) {
        ctx.addIssue({ code: "custom", message: `duplicate ${key}: ${value}` });
      }
    }
  });

export type CaseStudy = z.infer<typeof caseStudySchema>;
