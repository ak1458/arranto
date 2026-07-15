import { NextRequest, NextResponse } from "next/server";
import { chat } from "@/lib/openrouter";
import { rateLimit, clientKey, tooMany, LIMITS } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  try {
    const key = clientKey(request, "documents");
    const limit = rateLimit(key, LIMITS.chat);
    if (!limit.ok) return tooMany(limit.retryAfterSec);

    const body = await request.json();
    const { text, documentType = "general", language = "English", analysisType = "all" } = body;

    if (!text) {
      return NextResponse.json({ error: "Document text is required" }, { status: 400 });
    }

    const truncatedText = text.slice(0, 4000);

    let summary = "";
    let keyFields: Record<string, string> = {};
    let actionItems: string[] = [];

    // Generate summary
    if (analysisType === "summary" || analysisType === "all") {
      const summaryPrompt = `Summarize the following ${documentType} document in 2-3 sentences in ${language}:
      
${truncatedText}

Provide a concise summary that captures the main points.`;

      try {
        summary = await chat([
          { role: "user", content: summaryPrompt }
        ], { maxTokens: 200, timeoutMs: 30000 });
      } catch {
        summary = "Unable to generate summary. Please check the document content.";
      }
    }

    // Extract key fields
    if (analysisType === "extraction" || analysisType === "all") {
      let extractionPrompt = "";
      if (documentType === "invoice") {
        extractionPrompt = `Extract the following from this invoice and return as JSON-like key:value pairs:
- Invoice Number
- Date
- Vendor/Company Name
- Total Amount
- Due Date
- Payment Terms

Document: ${truncatedText}`;
      } else if (documentType === "prescription") {
        extractionPrompt = `Extract the following from this prescription and return as JSON-like key:value pairs:
- Patient Name
- Doctor Name
- Medications
- Dosage Instructions
- Date

Document: ${truncatedText}`;
      } else if (documentType === "contract") {
        extractionPrompt = `Extract the following from this contract and return as JSON-like key:value pairs:
- Parties Involved
- Contract Date
- Key Terms
- Expiration/End Date
- Payment Terms

Document: ${truncatedText}`;
      } else {
        extractionPrompt = `Extract the following key information from this document and return as JSON-like key:value pairs:
- Main Subject/Topic
- Key Dates
- Important Names
- Key Numbers/Amounts
- Main Purpose

Document: ${truncatedText}`;
      }

      try {
        const extractionResult = await chat([
          { role: "user", content: extractionPrompt }
        ], { maxTokens: 300, timeoutMs: 30000 });

        const lines = extractionResult.split("\n");
        for (const line of lines) {
          const match = line.match(/^[-\s]*([^:]+):\s*(.+)$/);
          if (match) {
            const k = match[1].trim();
            const v = match[2].trim();
            if (k && v && v !== "N/A" && v !== "Not found") {
              keyFields[k] = v;
            }
          }
        }
      } catch {
        keyFields = { note: "Field extraction failed. Please review document manually." };
      }
    }

    // Generate action items
    if (analysisType === "all") {
      const actionPrompt = `Based on this ${documentType} document, list 3-5 specific action items or next steps. Return as a numbered list.

Document: ${truncatedText}`;

      try {
        const actionResult = await chat([
          { role: "user", content: actionPrompt }
        ], { maxTokens: 250, timeoutMs: 30000 });

        actionItems = actionResult
          .split("\n")
          .map(line => line.replace(/^\d+\.\s*/, "").trim())
          .filter(line => line.length > 0 && line.length < 200)
          .slice(0, 5);
      } catch {
        actionItems = ["Review the document carefully", "Identify key stakeholders"];
      }
    }

    if (Object.keys(keyFields).length === 0) {
      keyFields = { note: "No specific fields detected." };
    }
    if (actionItems.length === 0) {
      actionItems = ["Review document for important details"];
    }

    return NextResponse.json({
      summary,
      keyFields,
      actionItems,
      documentType,
      language,
      textLength: truncatedText.length,
      success: true,
    });
  } catch (error: unknown) {
    console.error("Document intelligence error:", error);
    return NextResponse.json({ error: "Document analysis failed" }, { status: 500 });
  }
}
