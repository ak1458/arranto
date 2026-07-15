'use client';

import { useState } from 'react';
import { Link } from '@/i18n/navigation';
import { Reveal } from '@/components/Reveal';

type AnalysisResult = {
  summary: string;
  keyFields: Record<string, string>;
  actionItems: string[];
  documentType: string;
  success: boolean;
  error?: string;
};

export default function DocumentIntelligencePage() {
  const [text, setText] = useState('');
  const [documentType, setDocumentType] = useState('general');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!text.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, documentType, analysisType: 'all' }),
      });

      const data = await response.json();
      setResult(data);
    } catch {
      setResult({
        error: 'Failed to analyze document. Please try again.',
        summary: '',
        keyFields: {},
        actionItems: [],
        documentType,
        success: false,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#050505] pt-36 pb-20 text-white">
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        <Link href="/tools" className="font-mono text-xs uppercase tracking-wider text-[#9494a0] hover:text-white transition-colors">
          ← All Tools
        </Link>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 pt-8 pb-8">
        <Reveal>
          <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 text-[#d8d9dc] text-xs font-mono uppercase tracking-wider mb-6">
          <span className="w-2 h-2 bg-[#d8d9dc] animate-pulse"/>
              FREE AI-POWERED TOOL
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Document
              <span className="text-[#d8d9dc]"> Intelligence</span>
            </h1>
            <p className="text-[#9494a0] text-lg max-w-xl mx-auto">
              Upload or paste any document text and get instant AI analysis — summaries, key data extraction, and actionable insights.
            </p>
          </div>
        </Reveal>

<form onSubmit={onSubmit} className="card-hover space-y-4 bg-[#121218] p-6 border border-white/10 shadow-xl">
            {/* Document Type Selector */}
            <div className="flex flex-wrap gap-2">
              {[
                { value: 'general', label: 'General' },
                { value: 'invoice', label: 'Invoice' },
                { value: 'prescription', label: 'Prescription' },
                { value: 'contract', label: 'Contract' },
              ].map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setDocumentType(type.value)}
                  className={`px-4 py-2 text-sm font-medium transition-all ${
                    documentType === type.value
                      ? 'bg-[#d8d9dc] text-black'
                      : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>

            {/* Text Input */}
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={10}
              placeholder={`Paste your ${documentType} text here...`}
              className="w-full bg-white/5 border border-white/10 p-4 text-white placeholder-white/30 outline-none focus:border-[#d8d9dc]/50 transition-colors text-sm resize-none"
              required
            />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !text.trim()}
              className="w-full py-3.5 bg-[#d8d9dc] text-black font-semibold text-sm hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Analyzing Document...
                </span>
              ) : 'Analyze Document'}
            </button>
          </form>

          {/* Results */}
          {result && (
            <div className="mt-8 space-y-6">
              {result.error && (
                <Reveal>
                <div className="bg-white/5 border border-dashed border-white/25 p-4 text-white text-sm">
                    {result.error}
                  </div>
                </Reveal>
              )}

              {/* Summary */}
              <Reveal>
              <div className="bg-white/5 border border-white/10 p-6">
                  <h3 className="text-lg font-bold mb-3">Summary</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{result.summary}</p>
                </div>
              </Reveal>

              {/* Key Fields */}
              {Object.keys(result.keyFields).length > 0 && (
                <Reveal>
                <div className="bg-white/5 border border-white/10 p-6">
                    <h3 className="text-lg font-bold mb-4">Key Information</h3>
                    <div className="grid gap-3">
                      {Object.entries(result.keyFields).map(([key, value]) => (
                      <div key={key} className="flex items-start gap-3 p-3 bg-white/5 border border-white/5">
                          <span className="text-white/40 text-sm font-medium w-32 shrink-0">{key}</span>
                          <span className="text-white/80 text-sm">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              )}

              {/* Action Items */}
              {result.actionItems.length > 0 && (
                <Reveal>
                <div className="bg-white/5 border border-white/10 p-6">
                    <h3 className="text-lg font-bold mb-4">Action Items</h3>
                    <div className="space-y-2">
                      {result.actionItems.map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                        <span className="w-6 h-6 border border-white/15 bg-white/5 text-[#d8d9dc] text-xs flex items-center justify-center font-bold shrink-0">
                            {i + 1}
                          </span>
                          <span className="text-white/70 text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              )}

              {/* CTA */}
              <Reveal>
              <div className="bg-[#121218] border border-white/10 p-6 text-center">
                  <h3 className="text-lg font-bold mb-2">Need Document Processing Automation?</h3>
                  <p className="text-[#9494a0] text-sm mb-4">
                    We can build custom AI workflows to process your documents automatically.
                  </p>
                  <Link
                    href="/#contact"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#d8d9dc] text-black font-semibold text-sm hover:bg-white transition-colors"
                  >
                    Talk to Our Team →
                  </Link>
                </div>
              </Reveal>
            </div>
          )}
      </div>
    </div>
  );
}
