'use client';

import React, { useState } from 'react';
import { Link } from '@/i18n/navigation';
import { Reveal } from '@/components/Reveal';

type AuditResult = {
    url: string;
    score: number;
    grade: string;
    summary: string;
    categories?: { name: string; score: number; icon: string }[];
    metrics?: { ttfbMs: number; htmlKB: number; perfSource: 'psi' | 'heuristic'; lcp: string | null; cls: string | null };
    issues: { category: string; severity: 'critical' | 'warning' | 'info'; message: string }[];
    recommendations: string[];
};

// Non-hue severity system: fill vs outline, solid vs dashed border, bold vs regular text.
const severityMeta: Record<AuditResult['issues'][number]['severity'], { label: string; badge: string; dot: string }> = {
    critical: { label: 'Critical', badge: 'bg-white/10 border border-white/30 text-white font-semibold', dot: 'bg-white' },
    warning: { label: 'Warning', badge: 'bg-white/[0.04] border border-dashed border-white/25 text-[#d8d9dc]', dot: 'bg-white/50' },
    info: { label: 'Info', badge: 'bg-transparent border border-white/10 text-[#9494a0]', dot: 'border border-white/40' },
};

// Category score bars: brightness for strong/average, diagonal hazard stripe for scores needing attention.
const barStyle = (s: number) => {
    if (s >= 80) return { className: 'bg-[#d8d9dc]' };
    if (s >= 55) return { className: 'bg-white/40' };
    return {
        className: '',
        style: { backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.45) 0px, rgba(255,255,255,0.45) 3px, transparent 3px, transparent 7px)' },
    };
};

// Grade tiers: fill (strong pass) vs solid outline (average) vs dashed outline (needs work) — no hue.
const gradeTier = (grade: string): { label: string; cls: string } => {
    if (grade === 'A' || grade === 'B') return { label: 'Strong', cls: 'bg-[#d8d9dc] text-black border border-[#d8d9dc]' };
    if (grade === 'C') return { label: 'Average', cls: 'bg-transparent text-white border border-white/50' };
    if (grade === 'D' || grade === 'F') return { label: 'Needs work', cls: 'bg-transparent text-[#9494a0] border border-dashed border-white/30' };
    return { label: 'Unscored', cls: 'bg-transparent text-[#6a6a70] border border-white/10' };
};

export default function WebsiteAuditPage() {
    const [url, setUrl] = useState('');
    const [isAuditing, setIsAuditing] = useState(false);
    const [result, setResult] = useState<AuditResult | null>(null);
    const [email, setEmail] = useState('');
    const [emailCaptured, setEmailCaptured] = useState(false);

    const handleAudit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!url.trim()) return;
        setIsAuditing(true);
        setResult(null);
        try {
            const res = await fetch('/api/audit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: url.trim() }),
            });
            const data = await res.json();
            setResult(data);
        } catch {
            setResult({
                url,
                score: 0,
                grade: 'N/A',
                summary: 'Network error. Please check your connection and try again.',
                issues: [],
                recommendations: [],
            });
        }
        setIsAuditing(false);
    };

    const handleEmailCapture = (e: React.FormEvent) => {
        e.preventDefault();
        if (email.trim()) {
            setEmailCaptured(true);
            fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: 'Website Audit Lead',
                    email: email,
                    message: `Website Audit Lead: ${url}\nScore: ${result?.score}/100 (${result?.grade})\nIssues: ${result?.issues.length}\n${result?.issues.map(i => `- [${i.severity}] ${i.message}`).join('\n')}`,
                    locale: 'en',
                }),
            }).catch(console.error);
        }
    };

    const tier = result ? gradeTier(result.grade) : null;

    return (
        <div className="min-h-screen bg-[#050505] pt-36 text-white">
            {/* Hero */}
            <div className="relative overflow-hidden">
                <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
                    <Link href="/tools" className="font-mono text-xs uppercase tracking-wider text-[#9494a0] hover:text-white transition-colors">
                        ← All Tools
                    </Link>
                </div>

                <Reveal>
                    <div className="relative z-10 max-w-3xl mx-auto text-center px-6 pt-8 pb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 text-[#d8d9dc] text-xs font-mono uppercase tracking-wider mb-6">
                    <span className="w-2 h-2 bg-[#d8d9dc] animate-pulse"/>
                            FREE WEBSITE AUDIT
                        </div>
                        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 leading-tight">
                            Free Website
                            <span className="text-[#d8d9dc]"> Audit</span>
                        </h1>
                        <p className="text-[#9494a0] text-lg max-w-xl mx-auto mb-10">
                            Enter any URL for real SEO, performance, mobile, and security checks — scored by category, with fixes ranked by priority.
                        </p>

                        {/* Search Bar */}
                        <form onSubmit={handleAudit} className="relative max-w-2xl mx-auto">
                        <div className="flex items-center bg-white/5 border border-white/10 p-2 focus-within:border-[#d8d9dc]/50 transition-colors shadow-2xl shadow-black/40">
                                <div className="ps-4 text-white/30">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    placeholder="Enter website URL (e.g. arranto.com)"
                                    className="flex-1 bg-transparent px-4 py-3 text-white placeholder-white/30 outline-none text-lg"
                                    disabled={isAuditing}
                                />
                                <button
                                    type="submit"
                                    disabled={isAuditing || !url.trim()}
                                    className="px-6 py-3 bg-[#d8d9dc] text-black font-semibold text-sm hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                                >
                                    {isAuditing ? (
                                        <span className="flex items-center gap-2">
                                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                                            Auditing...
                                        </span>
                                    ) : 'Run Audit'}
                                </button>
                            </div>
                        </form>
                    </div>
                </Reveal>
            </div>

            {/* Results */}
            {result && (
                <div className="max-w-4xl mx-auto px-6 pb-20 space-y-8">

                    {/* Score Card */}
                    <Reveal>
                    <div className="bg-white/5 border border-white/10 p-8">
                            <div className="flex flex-col md:flex-row items-center gap-8">
                                {/* Grade Circle */}
                                <div className="relative w-36 h-36 shrink-0">
                                    <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                                        <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                                        <circle
                                            cx="60" cy="60" r="54"
                                            fill="none"
                                            stroke="#d8d9dc"
                                            strokeWidth="8"
                                            strokeLinecap="round"
                                            strokeDasharray={`${(result.score / 100) * 339.3} 339.3`}
                                            className="transition-all duration-1000"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-4xl font-black text-white">
                                            {result.grade}
                                        </span>
                                        <span className="text-white/40 text-sm">{result.score}/100</span>
                                    </div>
                                </div>

                                {/* Summary */}
                                <div className="flex-1 text-center md:text-start">
                                    {tier && (
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-mono uppercase tracking-wider mb-3 ${tier.cls}`}>
                                            {tier.label}
                                        </span>
                                    )}
                                    <h2 className="text-xl font-bold mb-1 truncate">{result.url}</h2>
                                    <p className="text-[#9494a0] text-sm mb-4">{result.summary}</p>
                                    <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs ${severityMeta.critical.badge}`}>
                                    <span className={`size-1.5 ${severityMeta.critical.dot}`} />
                                            {result.issues.filter(i => i.severity === 'critical').length} Critical
                                        </span>
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs ${severityMeta.warning.badge}`}>
                                        <span className={`size-1.5 ${severityMeta.warning.dot}`} />
                                            {result.issues.filter(i => i.severity === 'warning').length} Warnings
                                        </span>
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs ${severityMeta.info.badge}`}>
                                        <span className={`size-1.5 ${severityMeta.info.dot}`} />
                                            {result.issues.filter(i => i.severity === 'info').length} Info
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Reveal>

                    {/* Category Scores */}
                    {result.categories && result.categories.length > 0 && (
                        <Reveal>
                        <div className="bg-white/5 border border-white/10 p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-bold">Category Scores</h3>
                                    {result.metrics && (
                                        <span className="text-xs text-white/40">
                                            {result.metrics.ttfbMs}ms response · {result.metrics.htmlKB}KB
                                            {result.metrics.perfSource === 'psi' ? ' · Lighthouse' : ''}
                                            {result.metrics.lcp ? ` · LCP ${result.metrics.lcp}` : ''}
                                        </span>
                                    )}
                                </div>
                                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
                                    {result.categories.map((c) => {
                                        const bar = barStyle(c.score);
                                        return (
                                            <div key={c.name}>
                                                <div className="flex items-center justify-between text-sm mb-1.5">
                                                    <span className="text-white/80">{c.icon} {c.name}</span>
                                                    <span className="font-semibold text-white/90">{c.score}/100</span>
                                                </div>
                                                <div className="h-2 bg-white/10 overflow-hidden">
                                                    <div
                                                    className={`h-full transition-all duration-700 ${bar.className}`}
                                                        style={{ width: `${c.score}%`, ...(bar.style ?? {}) }}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </Reveal>
                    )}

                    {/* Issues List */}
                    {result.issues.length > 0 && (
                        <Reveal>
                        <div className="bg-white/5 border border-white/10 p-6">
                                <h3 className="text-lg font-bold mb-4">Issues Found</h3>
                                <div className="space-y-2">
                                    {result.issues.map((issue, i) => (
                                        <div
                                            key={i}
                                            className={`flex items-start gap-3 px-4 py-3 border ${severityMeta[issue.severity].badge}`}
                                        >
                                        <span className={`shrink-0 mt-1.5 size-1.5 ${severityMeta[issue.severity].dot}`} />
                                            <div className="flex-1 min-w-0">
                                                <span className="text-sm">{issue.message}</span>
                                            </div>
                                            <span className="text-xs opacity-50 shrink-0 uppercase font-mono">{severityMeta[issue.severity].label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Reveal>
                    )}

                    {/* Recommendations */}
                    {result.recommendations.length > 0 && (
                        <Reveal>
                        <div className="bg-white/5 border border-white/10 p-6">
                                <h3 className="text-lg font-bold mb-4">Recommendations</h3>
                                <div className="space-y-3">
                                    {result.recommendations.map((rec, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                        <span className="w-6 h-6 border border-white/15 bg-white/5 text-[#d8d9dc] text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">
                                                {i + 1}
                                            </span>
                                            <p className="text-white/70 text-sm">{rec}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Reveal>
                    )}

                    {/* Email Capture CTA */}
                    <Reveal>
                    <div className="bg-[#121218] border border-white/10 p-8 text-center">
                            {!emailCaptured ? (
                                <>
                                    <h3 className="text-xl font-bold mb-2">Want us to fix these?</h3>
                                    <p className="text-[#9494a0] text-sm mb-6 max-w-md mx-auto">
                                        Get the full report with prioritized fixes plus a free 15-min call on how to action them — straight to your inbox.
                                    </p>
                                    <form onSubmit={handleEmailCapture} className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="your@email.com"
                                            required
                                            className="flex-1 w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/30 outline-none focus:border-[#d8d9dc]/50 transition-colors text-sm"
                                        />
                                        <button
                                            type="submit"
                                            className="w-full sm:w-auto px-6 py-3 bg-[#d8d9dc] text-black font-semibold text-sm hover:bg-white transition-colors whitespace-nowrap"
                                        >
                                            Get Full Report
                                        </button>
                                    </form>
                                </>
                            ) : (
                                <div className="py-4">
                                <span className="mb-3 inline-flex size-10 items-center justify-center border border-white/20 bg-white/5 text-lg text-white">✓</span>
                                    <h3 className="text-xl font-bold mb-2">Report Requested!</h3>
                                    <p className="text-[#9494a0] text-sm">Our team will send a detailed audit to <strong className="text-white">{email}</strong> within 24 hours.</p>
                                </div>
                            )}
                        </div>
                    </Reveal>

                    {/* CTA */}
                    <Reveal>
                        <div className="text-center">
                            <p className="text-white/30 text-xs mb-4">Real checks, no fluff — by Arranto</p>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-[#9494a0] hover:text-white hover:border-white/20 transition-all text-sm"
                            >
                                Talk to the studio →
                            </Link>
                        </div>
                    </Reveal>
                </div>
            )}
        </div>
    );
}
