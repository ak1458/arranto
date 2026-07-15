'use client';

import React, { useState } from 'react';
import { Link } from '@/i18n/navigation';
import { Reveal } from '@/components/Reveal';

type SEOResult = {
    blogTitles: string[];
    metaDescriptions: string[];
    contentOutline: string;
    keywords: string[];
    linkingStrategy?: string;
    business: string;
    location: string;
    industry: string;
    error?: string;
};

const industries = [
    'Dental Clinic', 'Hospital', 'Restaurant', 'Cafe',
    'Salon & Spa', 'Gym & Fitness', 'Real Estate', 'Law Firm',
    'Education / Coaching', 'Retail / E-commerce', 'Photography',
    'IT / Software', 'Wedding Planner', 'Travel Agency', 'Other',
];

export default function SEOContentPage() {
    const [business, setBusiness] = useState('');
    const [location, setLocation] = useState('');
    const [industry, setIndustry] = useState('');
    const [language, setLanguage] = useState('English');
    const [isGenerating, setIsGenerating] = useState(false);
    const [result, setResult] = useState<SEOResult | null>(null);
    const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!business.trim() || !industry) return;
        setIsGenerating(true);
        setResult(null);
        try {
            const res = await fetch('/api/seo-content', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ business: business.trim(), location: location.trim(), industry, language }),
            });
            const data = await res.json();
            setResult(data);
        } catch {
            setResult({
                blogTitles: [], metaDescriptions: [], contentOutline: '', keywords: [],
                business, location, industry, error: 'Network error. Please try again.',
            });
        }
        setIsGenerating(false);
    };

    const copyToClipboard = (text: string, idx: number) => {
        navigator.clipboard.writeText(text);
        setCopiedIdx(idx);
        setTimeout(() => setCopiedIdx(null), 2000);
    };

    return (
        <div className="min-h-screen bg-[#050505] pt-36 pb-20 text-white">
            <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
                <Link href="/tools" className="font-mono text-xs uppercase tracking-wider text-[#9494a0] hover:text-white transition-colors">
                    ← All Tools
                </Link>
            </div>

            <Reveal>
                <div className="relative z-10 max-w-3xl mx-auto text-center px-6 pt-8 pb-8">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 text-[#d8d9dc] text-xs font-mono uppercase tracking-wider mb-6">
                <span className="w-2 h-2 bg-[#d8d9dc] animate-pulse"/>
                        FREE AI-POWERED TOOL
                    </div>
                    <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 leading-tight">
                        AI SEO Content
                        <span className="text-[#d8d9dc]"> Engine</span>
                    </h1>
                    <p className="text-[#9494a0] text-lg max-w-xl mx-auto mb-10">
                        Enter your business details and get AI-generated blog titles, meta descriptions, keywords & content outlines — optimized for local SEO.
                    </p>

                    {/* Input Form */}
                    <form onSubmit={handleGenerate} className="card-hover max-w-2xl mx-auto space-y-4 text-start bg-[#121218] p-6 border border-white/10 shadow-xl">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">Business Name *</label>
                                <input
                                    type="text" value={business} onChange={e => setBusiness(e.target.value)}
                                    placeholder="e.g., Sharma Dental Clinic"
                                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/25 outline-none focus:border-[#d8d9dc]/50 transition-colors text-sm"
                                    disabled={isGenerating}
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">Location</label>
                                <input
                                    type="text" value={location} onChange={e => setLocation(e.target.value)}
                                    placeholder="e.g., your city"
                                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/25 outline-none focus:border-[#d8d9dc]/50 transition-colors text-sm"
                                    disabled={isGenerating}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">Industry *</label>
                                <select
                                    value={industry} onChange={e => setIndustry(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-[#d8d9dc]/50 transition-colors text-sm appearance-none"
                                    disabled={isGenerating}
                                >
                                    <option value="" className="bg-[#121218]">Select industry...</option>
                                    {industries.map(i => <option key={i} value={i} className="bg-[#121218]">{i}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">Language</label>
                                <select
                                    value={language} onChange={e => setLanguage(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-[#d8d9dc]/50 transition-colors text-sm appearance-none"
                                    disabled={isGenerating}
                                >
                                    {['English', 'Hinglish', 'Hindi', 'Bengali', 'Tamil', 'Telugu'].map(l =>
                                        <option key={l} value={l} className="bg-[#121218]">{l}</option>
                                    )}
                                </select>
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={isGenerating || !business.trim() || !industry}
                            className="w-full py-3.5 bg-[#d8d9dc] text-black font-semibold text-sm hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isGenerating ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                                    Generating content strategy...
                                </span>
                            ) : 'Generate SEO Content Strategy'}
                        </button>
                    </form>
                </div>
            </Reveal>

            {/* Results */}
            {result && (
                <div className="relative z-10 max-w-4xl mx-auto px-6 pb-20 space-y-6">

                    {result.error && (
                        <Reveal>
                        <div className="bg-white/5 border border-dashed border-white/25 p-4 text-white text-sm text-center">
                                {result.error}
                            </div>
                        </Reveal>
                    )}

                    {/* Blog Titles */}
                    {result.blogTitles.length > 0 && (
                        <Reveal>
                        <div className="bg-white/5 border border-white/10 p-6">
                                <h3 className="text-lg font-bold mb-4">Blog Titles</h3>
                                <div className="space-y-2">
                                    {result.blogTitles.map((title, i) => (
                                    <div key={i} className="flex items-center gap-3 px-4 py-3 bg-white/5 border border-white/5 group hover:border-white/20 transition-colors">
                                    <span className="w-6 h-6 border border-white/15 bg-white/5 text-[#d8d9dc] text-xs flex items-center justify-center font-bold shrink-0">{i + 1}</span>
                                            <span className="flex-1 text-sm text-white/80 min-w-0 overflow-hidden text-ellipsis">{title}</span>
                                            <button
                                                onClick={() => copyToClipboard(title, i)}
                                                className="text-xs text-white/40 hover:text-[#d8d9dc] transition-colors sm:opacity-0 sm:group-hover:opacity-100 shrink-0 p-2 -me-2"
                                                aria-label="Copy to clipboard"
                                            >
                                                {copiedIdx === i ? '✓ Copied' : 'Copy'}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Reveal>
                    )}

                    {/* Meta Descriptions */}
                    {result.metaDescriptions.length > 0 && (
                        <Reveal>
                        <div className="bg-white/5 border border-white/10 p-6">
                                <h3 className="text-lg font-bold mb-4">Meta Descriptions</h3>
                                <div className="space-y-2">
                                    {result.metaDescriptions.map((meta, i) => (
                                    <div key={i} className="flex items-start gap-3 px-4 py-3 bg-white/5 border border-white/5 group hover:border-white/20 transition-colors">
                                    <span className="w-6 h-6 border border-white/15 bg-white/5 text-[#d8d9dc] text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">{i + 1}</span>
                                            <span className="flex-1 text-sm text-white/70 min-w-0 overflow-hidden text-ellipsis">{meta}</span>
                                            <button
                                                onClick={() => copyToClipboard(meta, 100 + i)}
                                                className="text-xs text-white/40 hover:text-[#d8d9dc] transition-colors sm:opacity-0 sm:group-hover:opacity-100 shrink-0 p-2 -me-2"
                                                aria-label="Copy to clipboard"
                                            >
                                                {copiedIdx === 100 + i ? '✓ Copied' : 'Copy'}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Reveal>
                    )}

                    {/* Keywords */}
                    {result.keywords.length > 0 && (
                        <Reveal>
                        <div className="bg-white/5 border border-white/10 p-6">
                                <h3 className="text-lg font-bold mb-4">Target Keywords</h3>
                                <div className="flex flex-wrap gap-2">
                                    {result.keywords.map((kw, i) => (
                                        <button
                                            key={i}
                                            onClick={() => copyToClipboard(kw.split('—')[0].trim(), 200 + i)}
                                            className="px-3 py-1.5 bg-white/5 border border-white/10 text-xs text-white/60 hover:text-[#d8d9dc] hover:border-[#d8d9dc]/30 transition-colors cursor-pointer"
                                            title="Click to copy"
                                        >
                                            {copiedIdx === 200 + i ? '✓ Copied' : kw}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </Reveal>
                    )}

                    {/* Content Outline */}
                    {result.contentOutline && (
                        <Reveal>
                        <div className="bg-white/5 border border-white/10 p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-bold">Content Outline</h3>
                                    <button
                                        onClick={() => copyToClipboard(result.contentOutline, 999)}
                                        className="text-xs px-3 py-1 bg-white/5 border border-white/10 text-white/40 hover:text-[#d8d9dc] hover:border-[#d8d9dc]/30 transition-colors"
                                    >
                                        {copiedIdx === 999 ? '✓ Copied!' : 'Copy Outline'}
                                    </button>
                                </div>
                                <div className="prose prose-invert prose-sm max-w-none">
                                <pre className="whitespace-pre-wrap text-sm text-white/60 bg-white/5 p-4 border border-white/5 overflow-x-auto">
                                        {result.contentOutline}
                                    </pre>
                                </div>
                            </div>
                        </Reveal>
                    )}

                    {/* CTA */}
                    <Reveal>
                    <div className="bg-[#121218] border border-white/10 p-8 text-center">
                            <h3 className="text-xl font-bold mb-2">Want Us to Write the Full Content?</h3>
                            <p className="text-[#9494a0] text-sm mb-6 max-w-md mx-auto">
                                Our team writes SEO-optimized, industry-specific blog posts that rank on Google and drive leads to your business.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <Link
                                    href="/#contact"
                                    className="px-6 py-3 bg-[#d8d9dc] text-black font-semibold text-sm hover:bg-white transition-colors"
                                >
                                    Get Content Written →
                                </Link>
                                <Link
                                    href="/tools/website-audit"
                                    className="px-6 py-3 bg-white/5 border border-white/10 text-[#9494a0] font-medium text-sm hover:text-white hover:border-white/20 transition-all"
                                >
                                    Audit Your Website
                                </Link>
                            </div>
                        </div>
                    </Reveal>

                    <p className="text-center text-white/20 text-xs">Powered by Arranto AI</p>
                </div>
            )}
        </div>
    );
}
