'use client';

import React, { useState } from 'react';
import { Link } from '@/i18n/navigation';
import { Reveal } from '@/components/Reveal';

type ColorInfo = { hex: string; name: string; usage: string };
type BrandKit = {
    colorPalette: { primary: ColorInfo; secondary: ColorInfo; accent: ColorInfo; dark: ColorInfo; light: ColorInfo; warning: ColorInfo };
    typography: { headingFont: string; bodyFont: string; headingStyle: string; bodyStyle: string };
    taglines: string[];
    brandVoice: { tone: string; doSay: string[]; dontSay: string[]; samplePost: string };
    logoGuidelines: { style: string; iconIdea: string; layoutTip: string };
    socialTemplates: { instagramBio: string; twitterBio: string; linkedinHeadline: string };
    businessName: string;
    industry: string;
    error?: string;
};

const personalities = [
    'Professional & Trustworthy', 'Fun & Playful', 'Luxury & Premium',
    'Bold & Energetic', 'Calm & Minimal', 'Warm & Friendly',
    'Innovative & Techy', 'Traditional & Classic',
];

export default function BrandKitPage() {
    const [businessName, setBusinessName] = useState('');
    const [industry, setIndustry] = useState('');
    const [targetAudience, setTargetAudience] = useState('');
    const [personality, setPersonality] = useState('Professional & Trustworthy');
    const [existingColors, setExistingColors] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [result, setResult] = useState<BrandKit | null>(null);
    const [copiedItem, setCopiedItem] = useState('');

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!businessName.trim() || !industry.trim()) return;
        setIsGenerating(true);
        setResult(null);
        try {
            const res = await fetch('/api/brand-kit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ businessName: businessName.trim(), industry: industry.trim(), targetAudience: targetAudience.trim(), personality, existingColors: existingColors.trim() }),
            });
            const data = await res.json();
            setResult(data);
        } catch {
            setResult({ error: 'Network error. Please try again.' } as BrandKit);
        }
        setIsGenerating(false);
    };

    const copyText = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        setCopiedItem(label);
        setTimeout(() => setCopiedItem(''), 2000);
    };

    // NOTE: color.hex below is the AI tool's actual generated output (a real brand
    // palette), not decorative theme color — it stays dynamic/inline intentionally.
    const ColorSwatch = ({ color, label }: { color: ColorInfo; label: string }) => (
        <button
            onClick={() => copyText(color.hex, label)}
            className="group flex items-center gap-3 p-3 bg-white/5 border border-white/5 hover:border-white/20 transition-all cursor-pointer"
            title="Click to copy hex"
        >
        <div className="w-12 h-12 shrink-0 shadow-lg border border-white/10" style={{ backgroundColor: color.hex }} />
            <div className="text-start min-w-0">
                <div className="text-sm font-semibold text-white/90 flex items-center gap-2">
                    {color.name}
                    <span className="text-[10px] text-white/30 font-mono">{copiedItem === label ? '✓ Copied' : color.hex}</span>
                </div>
                <p className="text-[11px] text-white/40 truncate">{color.usage}</p>
            </div>
        </button>
    );

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
                        AI Brand Kit
                        <span className="text-[#d8d9dc]"> Generator</span>
                    </h1>
                    <p className="text-[#9494a0] text-lg max-w-xl mx-auto mb-10">
                        Enter your business details and get an AI-generated brand identity — colors, typography, taglines, and brand voice.
                    </p>

<form onSubmit={handleGenerate} className="card-hover max-w-2xl mx-auto space-y-4 text-start bg-[#121218] p-6 border border-white/10 shadow-xl">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">Business Name *</label>
                                <input type="text" value={businessName} onChange={e => setBusinessName(e.target.value)} placeholder="e.g., Bloom Cafe" className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/25 outline-none focus:border-[#d8d9dc]/50 transition-colors text-sm" disabled={isGenerating} />
                            </div>
                            <div>
                                <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">Industry *</label>
                                <input type="text" value={industry} onChange={e => setIndustry(e.target.value)} placeholder="e.g., Coffee Shop & Bakery" className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/25 outline-none focus:border-[#d8d9dc]/50 transition-colors text-sm" disabled={isGenerating} />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">Target Audience</label>
                                <input type="text" value={targetAudience} onChange={e => setTargetAudience(e.target.value)} placeholder="e.g., Young professionals, 25-35" className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/25 outline-none focus:border-[#d8d9dc]/50 transition-colors text-sm" disabled={isGenerating} />
                            </div>
                            <div>
                                <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">Brand Personality</label>
                                <select value={personality} onChange={e => setPersonality(e.target.value)} className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-[#d8d9dc]/50 transition-colors text-sm appearance-none" disabled={isGenerating}>
                                    {personalities.map(p => <option key={p} value={p} className="bg-[#121218]">{p}</option>)}
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">Existing Brand Colors (optional)</label>
                            <input type="text" value={existingColors} onChange={e => setExistingColors(e.target.value)} placeholder="e.g., #FF6B35, deep navy blue" className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/25 outline-none focus:border-[#d8d9dc]/50 transition-colors text-sm" disabled={isGenerating} />
                        </div>
                        <button type="submit" disabled={isGenerating || !businessName.trim() || !industry.trim()} className="w-full py-3.5 bg-[#d8d9dc] text-black font-semibold text-sm hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                            {isGenerating ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                                    Creating your brand kit...
                                </span>
                            ) : 'Generate Brand Kit'}
                        </button>
                    </form>
                </div>
            </Reveal>

            {/* Results */}
            {result && !result.error && (
                <div className="relative z-10 max-w-4xl mx-auto px-6 pb-20 space-y-6">

                    {/* Color Palette */}
                    {result.colorPalette && (
                        <Reveal>
                        <div className="bg-white/5 border border-white/10 p-6">
                                <h3 className="text-lg font-bold mb-4">Color Palette</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {Object.entries(result.colorPalette).map(([key, color]) => (
                                        <ColorSwatch key={key} color={color} label={key} />
                                    ))}
                                </div>
                                {/* Color bar preview — real generated palette, left dynamic */}
                                <div className="mt-4 flex overflow-hidden h-12 border border-white/10">
                                    {Object.values(result.colorPalette).map((color, i) => (
                                        <div key={i} className="flex-1" style={{ backgroundColor: color.hex }} />
                                    ))}
                                </div>
                            </div>
                        </Reveal>
                    )}

                    {/* Typography */}
                    {result.typography && (
                        <Reveal>
                        <div className="bg-white/5 border border-white/10 p-6">
                                <h3 className="text-lg font-bold mb-4">Typography</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="p-4 bg-white/5 border border-white/5">
                                        <div className="text-xs text-white/30 uppercase tracking-wider mb-2">Heading Font</div>
                                        <div className="text-2xl font-bold text-white/90">{result.typography.headingFont}</div>
                                        <div className="text-xs text-white/40 mt-1">{result.typography.headingStyle}</div>
                                    </div>
                                    <div className="p-4 bg-white/5 border border-white/5">
                                        <div className="text-xs text-white/30 uppercase tracking-wider mb-2">Body Font</div>
                                        <div className="text-lg text-white/90">{result.typography.bodyFont}</div>
                                        <div className="text-xs text-white/40 mt-1">{result.typography.bodyStyle}</div>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    )}

                    {/* Taglines */}
                    {result.taglines?.length > 0 && (
                        <Reveal>
                        <div className="bg-white/5 border border-white/10 p-6">
                                <h3 className="text-lg font-bold mb-4">Taglines</h3>
                                <div className="space-y-2">
                                    {result.taglines.map((tagline, i) => (
                                    <button key={i} onClick={() => copyText(tagline,`tag-${i}`)} className="w-full text-start flex items-center gap-3 px-4 py-3 bg-white/5 border border-white/5 hover:border-white/20 transition-all group">
                                    <span className="w-6 h-6 border border-white/15 bg-white/5 text-[#d8d9dc] text-xs flex items-center justify-center font-bold shrink-0">{i + 1}</span>
                                            <span className="flex-1 text-sm text-white/80 italic">&ldquo;{tagline}&rdquo;</span>
                                            <span className="text-xs text-white/30 opacity-0 group-hover:opacity-100 transition-opacity">
                                                {copiedItem === `tag-${i}` ? '✓ Copied' : 'Copy'}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </Reveal>
                    )}

                    {/* Brand Voice */}
                    {result.brandVoice && (
                        <Reveal>
                        <div className="bg-white/5 border border-white/10 p-6">
                                <h3 className="text-lg font-bold mb-4">Brand Voice</h3>
                                <div className="mb-4">
                                <span className="px-3 py-1 bg-white/5 border border-white/10 text-[#d8d9dc] text-xs font-medium">
                                        Tone: {result.brandVoice.tone}
                                    </span>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                <div className="p-4 bg-white/[0.04] border border-white/15">
                                        <div className="text-xs text-white font-bold uppercase tracking-wider mb-2">Do Say</div>
                                        {result.brandVoice.doSay?.map((phrase, i) => (
                                            <p key={i} className="text-sm text-white/60 mb-1">&ldquo;{phrase}&rdquo;</p>
                                        ))}
                                    </div>
                                    <div className="p-4 bg-white/[0.02] border border-dashed border-white/15">
                                        <div className="text-xs text-[#9494a0] font-bold uppercase tracking-wider mb-2">Don&apos;t Say</div>
                                        {result.brandVoice.dontSay?.map((phrase, i) => (
                                            <p key={i} className="text-sm text-white/60 mb-1">&ldquo;{phrase}&rdquo;</p>
                                        ))}
                                    </div>
                                </div>
                                {result.brandVoice.samplePost && (
                                <div className="p-4 bg-white/5 border border-white/5">
                                        <div className="text-xs text-white/30 uppercase tracking-wider mb-2">Sample Social Post</div>
                                        <p className="text-sm text-white/70 italic">{result.brandVoice.samplePost}</p>
                                    </div>
                                )}
                            </div>
                        </Reveal>
                    )}

                    {/* Logo Guidelines */}
                    {result.logoGuidelines && (
                        <Reveal>
                        <div className="bg-white/5 border border-white/10 p-6">
                                <h3 className="text-lg font-bold mb-4">Logo Guidelines</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div className="p-3 bg-white/5 border border-white/5">
                                        <div className="text-xs text-white/30 uppercase tracking-wider mb-1">Style</div>
                                        <p className="text-sm text-white/70">{result.logoGuidelines.style}</p>
                                    </div>
                                    <div className="p-3 bg-white/5 border border-white/5">
                                        <div className="text-xs text-white/30 uppercase tracking-wider mb-1">Icon Concept</div>
                                        <p className="text-sm text-white/70">{result.logoGuidelines.iconIdea}</p>
                                    </div>
                                    <div className="p-3 bg-white/5 border border-white/5">
                                        <div className="text-xs text-white/30 uppercase tracking-wider mb-1">Layout</div>
                                        <p className="text-sm text-white/70">{result.logoGuidelines.layoutTip}</p>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    )}

                    {/* Social Templates */}
                    {result.socialTemplates && (
                        <Reveal>
                        <div className="bg-white/5 border border-white/10 p-6">
                                <h3 className="text-lg font-bold mb-4">Social Media Bios</h3>
                                <div className="space-y-3">
                                    {[
                                        { label: 'Instagram Bio', text: result.socialTemplates.instagramBio },
                                        { label: 'Twitter Bio', text: result.socialTemplates.twitterBio },
                                        { label: 'LinkedIn Headline', text: result.socialTemplates.linkedinHeadline },
                                    ].map(({ label, text }) => (
                                    <button key={label} onClick={() => copyText(text, label)} className="w-full text-start flex items-center gap-3 px-4 py-3 bg-white/5 border border-white/5 hover:border-white/20 transition-all group">
                                            <div className="flex-1 min-w-0">
                                                <span className="text-xs text-white/30 uppercase">{label}</span>
                                                <p className="text-sm text-white/70 truncate">{text}</p>
                                            </div>
                                            <span className="text-xs text-white/30 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                                                {copiedItem === label ? '✓ Copied' : 'Copy'}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </Reveal>
                    )}

                    {/* CTA */}
                    <Reveal>
                    <div className="bg-[#121218] border border-white/10 p-8 text-center">
                            <h3 className="text-xl font-bold mb-2">Want a Professional Brand Identity?</h3>
                            <p className="text-[#9494a0] text-sm mb-6 max-w-md mx-auto">
                                Our designers turn this AI-generated kit into a polished, pixel-perfect brand identity — logo, stationery, social media kit, and more.
                            </p>
                            <Link href="/#contact" className="inline-flex px-6 py-3 bg-[#d8d9dc] text-black font-semibold text-sm hover:bg-white transition-colors">
                                Get Professional Branding →
                            </Link>
                        </div>
                    </Reveal>
                    <p className="text-center text-white/20 text-xs">Powered by Arranto AI</p>
                </div>
            )}

            {/* Error state */}
            {result?.error && (
                <div className="relative z-10 max-w-2xl mx-auto px-6 pb-20">
                <div className="bg-white/5 border border-dashed border-white/25 p-4 text-white text-sm text-center">
                        {result.error}
                    </div>
                </div>
            )}
        </div>
    );
}
