'use client';

import React, { useState } from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { trackJobApplication } from '@/lib/track';

export interface JobApplicationFormProps {
  jobSlug?: string;
  jobTitle?: string;
  isClosed?: boolean;
  experienceOptions?: string[];
  q1Label?: string;
  q1Options?: string[];
  q2Label?: string;
  q2Options?: string[];
  scenarioTitle?: string;
  scenarioQuestion?: string;
  scenarioPlaceholder?: string;
}

export function JobApplicationForm({
  jobSlug = 'full-stack-engineer',
  jobTitle = 'Senior Full-Stack Engineer – Modern Web Systems, Next.js & Cloud Architecture',
  isClosed = false,
  experienceOptions = [
    '3–4 Years Professional Experience',
    '4–6 Years Professional Experience',
    '6+ Years Senior / Lead Level',
  ],
  q1Label = 'Core Domain & Technical Production Experience',
  q1Options = [
    'Yes — 3+ years of production experience in this domain',
    'No — Less than 3 years or junior level',
  ],
  q2Label = 'Autonomous Remote Readiness & Tooling',
  q2Options = [
    'Yes — Fully equipped and proven track record working asynchronously',
    'No — Require close daily office supervision',
  ],
  scenarioTitle = 'Practical Challenge / Scenario',
  scenarioQuestion = 'Describe a complex problem you solved in production, the architecture or strategy you chose, and the verifiable outcome.',
  scenarioPlaceholder = 'Detail your methodology, tech stack or marketing channels, trade-offs, and measurable outcomes...',
}: JobApplicationFormProps) {
  const locale = useLocale();

  // ── Pre-application checklist state (Mandatory 4 items) ──
  const [checklist, setChecklist] = useState({
    visitedWebsite: false,
    followedCompanyLinkedIn: false,
    connectedFounderLinkedIn: false,
    confirmedMinExperience: false,
  });

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    experience: experienceOptions[0] || '3–4 Years Professional Experience',
    screeningQ1: q1Options[0] || 'Yes',
    screeningQ2: q2Options[0] || 'Yes',
    customPitchQuestion: '',
    githubUrl: '',
    portfolioUrl: '',
    resumeUrl: '',
    coverNote: '',
    botcheck: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'screened_out' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // If role is closed, display closed notice
  if (isClosed) {
    return (
      <div className="border border-white/10 bg-[#0a0a0a] p-8 sm:p-12 text-center text-white">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-white/5 text-xl text-[#8e8f94] border border-white/10">
          🔒
        </div>
        <div className="inline-block px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-xs uppercase tracking-wider mb-4">
          Applications Closed
        </div>
        <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
          Position Currently Closed
        </h3>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[#9494a0] font-light">
          We are no longer accepting new applications for <span className="text-white font-medium">{jobTitle}</span>. Browse our Job Dashboard to see current active openings.
        </p>
        <div className="mt-8">
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 font-mono text-xs font-semibold uppercase tracking-wider hover:bg-[#d8d9dc] transition-colors"
          >
            Browse Active Openings →
          </Link>
        </div>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChecklistToggle = (key: keyof typeof checklist) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const allChecklistCompleted =
    checklist.visitedWebsite &&
    checklist.followedCompanyLinkedIn &&
    checklist.connectedFounderLinkedIn &&
    checklist.confirmedMinExperience;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Mandatory Checklist Check
    if (!allChecklistCompleted) {
      setStatus('error');
      setErrorMessage(
        'Please complete and check all 4 mandatory pre-application verification steps (visit Arranto, follow LinkedIn pages, and confirm 3+ years experience) before submitting.'
      );
      return;
    }

    // 2. Required Fields Check
    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.location.trim() ||
      !formData.resumeUrl.trim() ||
      !formData.customPitchQuestion.trim()
    ) {
      setStatus('error');
      setErrorMessage('Please fill in all required fields and complete the screening question.');
      return;
    }

    // 3. Essential Screening Check
    const passedEssential =
      formData.screeningQ1.startsWith('Yes') &&
      formData.screeningQ2.startsWith('Yes') &&
      checklist.confirmedMinExperience;

    if (!passedEssential) {
      setStatus('screened_out');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/careers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          ...checklist,
          roleApplied: jobTitle,
          locale,
        }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || 'Failed to submit application. Please try again.');
      }

      trackJobApplication(jobTitle);
      setStatus('success');
    } catch (err: unknown) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'An error occurred while submitting your application.');
    }
  };

  if (status === 'success') {
    return (
      <div className="border border-white/20 bg-[#0a0a0a] p-8 sm:p-12 text-center text-white">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-2xl text-emerald-400 border border-emerald-500/20">
          ✓
        </div>
        <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
          Application Received
        </h3>
        <p className="mx-auto mt-4 max-w-lg text-sm sm:text-base leading-relaxed text-[#9494a0] font-light">
          Thank you for applying for <span className="text-white font-medium">{jobTitle}</span> at Arranto. Our hiring team reviews every technical submission thoroughly and will reach out within 1–2 business days.
        </p>
        <div className="mt-8 border-t border-white/10 pt-6">
          <p className="font-mono text-xs text-[#8e8f94] uppercase tracking-wider">
            Confirmation sent to <span className="text-white">{formData.email}</span>
          </p>
        </div>
      </div>
    );
  }

  if (status === 'screened_out') {
    return (
      <div className="border border-white/15 bg-[#0a0a0a] p-8 sm:p-12 text-center text-white">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-2xl text-[#d8d9dc]">
          ℹ
        </div>
        <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
          Application Status
        </h3>
        <p className="mx-auto mt-4 max-w-lg text-sm sm:text-base leading-relaxed text-[#9494a0] font-light">
          Thank you for your interest in Arranto. For the <span className="text-white font-medium">{jobTitle}</span> position, possessing at least 3+ years of professional hands-on experience and meeting the essential domain criteria is mandatory.
        </p>
        <p className="mx-auto mt-3 max-w-lg text-xs text-[#8e8f94] font-light">
          We retain candidate profiles on file for relevant future opportunities.
        </p>
        <div className="mt-8 border-t border-white/10 pt-6">
          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="font-mono text-xs text-white underline underline-offset-4 hover:text-[#d8d9dc] cursor-pointer"
          >
            ← Modify your answers and try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border border-white/10 bg-[#080808] p-6 sm:p-10 shadow-2xl">
      {/* Honeypot */}
      <input
        type="text"
        name="botcheck"
        value={formData.botcheck}
        onChange={handleChange}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
      />

      {/* Target Position Info Banner */}
      <div className="mb-8 border-b border-white/10 pb-6">
        <span className="font-mono text-[11px] uppercase tracking-wider text-[#8e8f94] block mb-2">
          Target Opening:
        </span>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/5 border border-white/10 p-4">
          <div>
            <h3 className="font-display text-base sm:text-lg font-bold text-white">
              {jobTitle}
            </h3>
            <span className="font-mono text-xs text-emerald-400 mt-0.5 block">
              100% Remote · Full-Time · 3+ Years Experience Required
            </span>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-wider text-[#d8d9dc] bg-white/10 px-3 py-1 border border-white/20 self-start sm:self-auto shrink-0">
            Open Role
          </span>
        </div>
      </div>

      {/* ── STEP 0: MANDATORY PRE-APPLICATION CHECKLIST ── */}
      <div className="mb-10 border border-emerald-500/30 bg-emerald-950/20 p-5 sm:p-6">
        <div className="flex items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-wider text-emerald-300 font-semibold">
              Mandatory Pre-Application Verification
            </span>
          </div>
          <span className="font-mono text-[11px] text-emerald-400/80">
            {[checklist.visitedWebsite, checklist.followedCompanyLinkedIn, checklist.connectedFounderLinkedIn, checklist.confirmedMinExperience].filter(Boolean).length}/4 Verified
          </span>
        </div>

        <p className="text-xs text-[#9494a0] font-light leading-relaxed mb-5">
          To ensure alignment and serious engagement, candidates must complete and confirm the following 4 steps before submitting:
        </p>

        <div className="space-y-3">
          {/* Step 1: Visit Arranto Website */}
          <div
            onClick={() => handleChecklistToggle('visitedWebsite')}
            className={`flex items-start justify-between gap-3 p-3.5 border transition-all cursor-pointer ${
              checklist.visitedWebsite
                ? 'border-emerald-500/40 bg-emerald-500/10'
                : 'border-white/10 bg-[#121212] hover:border-white/20'
            }`}
          >
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="check-website"
                checked={checklist.visitedWebsite}
                onChange={() => {}}
                className="mt-0.5 h-4 w-4 rounded border-white/20 bg-black text-emerald-400 focus:ring-emerald-400/40 cursor-pointer pointer-events-none"
              />
              <div className="text-xs">
                <label htmlFor="check-website" className="font-medium text-white cursor-pointer block">
                  1. Visit & Explore Arranto Homepage
                </label>
                <span className="text-[#8e8f94] block mt-0.5">
                  I have visited arranto.com and reviewed Arranto&apos;s digital services, solutions, and engineering portfolio.
                </span>
              </div>
            </div>
            <a
              href="https://arranto.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="shrink-0 inline-flex items-center gap-1 font-mono text-[11px] text-[#d8d9dc] hover:text-white underline underline-offset-2"
            >
              arranto.com ↗
            </a>
          </div>

          {/* Step 2: Follow Arranto Company LinkedIn */}
          <div
            onClick={() => handleChecklistToggle('followedCompanyLinkedIn')}
            className={`flex items-start justify-between gap-3 p-3.5 border transition-all cursor-pointer ${
              checklist.followedCompanyLinkedIn
                ? 'border-emerald-500/40 bg-emerald-500/10'
                : 'border-white/10 bg-[#121212] hover:border-white/20'
            }`}
          >
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="check-company-linkedin"
                checked={checklist.followedCompanyLinkedIn}
                onChange={() => {}}
                className="mt-0.5 h-4 w-4 rounded border-white/20 bg-black text-emerald-400 focus:ring-emerald-400/40 cursor-pointer pointer-events-none"
              />
              <div className="text-xs">
                <label htmlFor="check-company-linkedin" className="font-medium text-white cursor-pointer block">
                  2. Follow Arranto on LinkedIn
                </label>
                <span className="text-[#8e8f94] block mt-0.5">
                  I have followed the official Arranto Company page on LinkedIn.
                </span>
              </div>
            </div>
            <a
              href="https://www.linkedin.com/company/arranto"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="shrink-0 inline-flex items-center gap-1 font-mono text-[11px] text-[#d8d9dc] hover:text-white underline underline-offset-2"
            >
              Follow Arranto ↗
            </a>
          </div>

          {/* Step 3: Connect with / Follow Ashraf Kamal on LinkedIn */}
          <div
            onClick={() => handleChecklistToggle('connectedFounderLinkedIn')}
            className={`flex items-start justify-between gap-3 p-3.5 border transition-all cursor-pointer ${
              checklist.connectedFounderLinkedIn
                ? 'border-emerald-500/40 bg-emerald-500/10'
                : 'border-white/10 bg-[#121212] hover:border-white/20'
            }`}
          >
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="check-founder-linkedin"
                checked={checklist.connectedFounderLinkedIn}
                onChange={() => {}}
                className="mt-0.5 h-4 w-4 rounded border-white/20 bg-black text-emerald-400 focus:ring-emerald-400/40 cursor-pointer pointer-events-none"
              />
              <div className="text-xs">
                <label htmlFor="check-founder-linkedin" className="font-medium text-white cursor-pointer block">
                  3. Follow / Connect with Ashraf Kamal on LinkedIn
                </label>
                <span className="text-[#8e8f94] block mt-0.5">
                  I have connected with or followed Founder Ashraf Kamal on LinkedIn.
                </span>
              </div>
            </div>
            <a
              href="https://www.linkedin.com/in/ashrafkamal14/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="shrink-0 inline-flex items-center gap-1 font-mono text-[11px] text-[#d8d9dc] hover:text-white underline underline-offset-2"
            >
              Ashraf Kamal ↗
            </a>
          </div>

          {/* Step 4: 3+ Years Work Experience Confirmation */}
          <div
            onClick={() => handleChecklistToggle('confirmedMinExperience')}
            className={`flex items-start justify-between gap-3 p-3.5 border transition-all cursor-pointer ${
              checklist.confirmedMinExperience
                ? 'border-emerald-500/40 bg-emerald-500/10'
                : 'border-white/10 bg-[#121212] hover:border-white/20'
            }`}
          >
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="check-min-exp"
                checked={checklist.confirmedMinExperience}
                onChange={() => {}}
                className="mt-0.5 h-4 w-4 rounded border-white/20 bg-black text-emerald-400 focus:ring-emerald-400/40 cursor-pointer pointer-events-none"
              />
              <div className="text-xs">
                <label htmlFor="check-min-exp" className="font-medium text-white cursor-pointer block">
                  4. Confirm 3+ Years Professional Experience
                </label>
                <span className="text-[#8e8f94] block mt-0.5">
                  I confirm that I possess at least 3+ years of verifiable professional hands-on experience in this field.
                </span>
              </div>
            </div>
            <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-amber-300 bg-amber-500/10 px-2 py-0.5 border border-amber-500/20">
              3+ Yrs Req
            </span>
          </div>
        </div>
      </div>

      {status === 'error' && (
        <div className="mb-6 border border-red-500/30 bg-red-950/30 p-4 text-xs sm:text-sm text-red-200">
          <p className="font-medium">{errorMessage}</p>
          <p className="mt-1 text-[11px] text-red-300/80">
            You can also email your application directly to{' '}
            <a href="mailto:help@arranto.com" className="underline font-semibold">
              help@arranto.com
            </a>
          </p>
        </div>
      )}

      {/* ── SECTION 1: CANDIDATE INFO ── */}
      <div className="mb-8">
        <span className="font-mono text-[11px] uppercase tracking-wider text-[#8e8f94] block mb-4">
          01 // Personal & Contact Information
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label className="block font-mono text-xs uppercase tracking-wider text-[#d8d9dc] mb-2">
              Full Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              placeholder="e.g. Alex Rivera"
              className="w-full bg-[#121212] border border-white/10 px-4 py-3 text-sm text-white placeholder-white/20 focus:border-white/40 focus:outline-none transition-colors"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-mono text-xs uppercase tracking-wider text-[#d8d9dc] mb-2">
              Email Address <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. alex@example.com"
              className="w-full bg-[#121212] border border-white/10 px-4 py-3 text-sm text-white placeholder-white/20 focus:border-white/40 focus:outline-none transition-colors"
            />
          </div>

          {/* Phone / WhatsApp */}
          <div>
            <label className="block font-mono text-xs uppercase tracking-wider text-[#d8d9dc] mb-2">
              Phone / WhatsApp (with Country Code) <span className="text-red-400">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. +1 555 123 4567 or +91 98765 43210"
              className="w-full bg-[#121212] border border-white/10 px-4 py-3 text-sm text-white placeholder-white/20 focus:border-white/40 focus:outline-none transition-colors"
            />
          </div>

          {/* Current Location */}
          <div>
            <label className="block font-mono text-xs uppercase tracking-wider text-[#d8d9dc] mb-2">
              Current Location (City, Country) <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="location"
              required
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Riyadh, Saudi Arabia / Austin, USA"
              className="w-full bg-[#121212] border border-white/10 px-4 py-3 text-sm text-white placeholder-white/20 focus:border-white/40 focus:outline-none transition-colors"
            />
          </div>
        </div>
      </div>

      {/* ── SECTION 2: EXPERIENCE & SCREENING CRITERIA ── */}
      <div className="mb-8 border-t border-white/10 pt-8">
        <span className="font-mono text-[11px] uppercase tracking-wider text-[#8e8f94] block mb-4">
          02 // Qualifications & Screening
        </span>

        <div className="space-y-6">
          {/* Experience Dropdown */}
          <div>
            <label className="block font-mono text-xs uppercase tracking-wider text-[#d8d9dc] mb-2">
              Verifiable Professional Experience (3+ Years Required) <span className="text-red-400">*</span>
            </label>
            <select
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full bg-[#121212] border border-white/10 px-4 py-3 text-sm text-white focus:border-white/40 focus:outline-none transition-colors"
            >
              {experienceOptions.map((opt) => (
                <option key={opt} value={opt} className="bg-[#121212] text-white">
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Screening Question 1 */}
          <div>
            <label className="block font-mono text-xs uppercase tracking-wider text-[#d8d9dc] mb-2">
              {q1Label} <span className="text-red-400">*</span>
            </label>
            <select
              name="screeningQ1"
              value={formData.screeningQ1}
              onChange={handleChange}
              className="w-full bg-[#121212] border border-white/10 px-4 py-3 text-sm text-white focus:border-white/40 focus:outline-none transition-colors"
            >
              {q1Options.map((opt) => (
                <option key={opt} value={opt} className="bg-[#121212] text-white">
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Screening Question 2 */}
          <div>
            <label className="block font-mono text-xs uppercase tracking-wider text-[#d8d9dc] mb-2">
              {q2Label} <span className="text-red-400">*</span>
            </label>
            <select
              name="screeningQ2"
              value={formData.screeningQ2}
              onChange={handleChange}
              className="w-full bg-[#121212] border border-white/10 px-4 py-3 text-sm text-white focus:border-white/40 focus:outline-none transition-colors"
            >
              {q2Options.map((opt) => (
                <option key={opt} value={opt} className="bg-[#121212] text-white">
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ── SECTION 3: TECHNICAL / SCENARIO QUESTION ── */}
      <div className="mb-8 border-t border-white/10 pt-8">
        <span className="font-mono text-[11px] uppercase tracking-wider text-[#8e8f94] block mb-2">
          03 // Practical Challenge & Technical Scenario
        </span>
        <label className="block font-display text-sm font-semibold text-white mb-2">
          {scenarioTitle} <span className="text-red-400">*</span>
        </label>
        <p className="text-xs text-[#9494a0] font-light leading-relaxed mb-4">
          {scenarioQuestion}
        </p>
        <textarea
          name="customPitchQuestion"
          required
          rows={5}
          value={formData.customPitchQuestion}
          onChange={handleChange}
          placeholder={scenarioPlaceholder}
          className="w-full bg-[#121212] border border-white/10 px-4 py-3 text-sm text-white placeholder-white/20 focus:border-white/40 focus:outline-none transition-colors leading-relaxed"
        />
      </div>

      {/* ── SECTION 4: RESUME, PORTFOLIO & REPOSITORIES ── */}
      <div className="mb-8 border-t border-white/10 pt-8">
        <span className="font-mono text-[11px] uppercase tracking-wider text-[#8e8f94] block mb-4">
          04 // Portfolio, Code & Resume Links
        </span>

        <div className="space-y-6">
          {/* Resume Link */}
          <div>
            <label className="block font-mono text-xs uppercase tracking-wider text-[#d8d9dc] mb-2">
              Resume Link (Google Drive, Dropbox, Notion, or PDF URL) <span className="text-red-400">*</span>
            </label>
            <input
              type="url"
              name="resumeUrl"
              required
              value={formData.resumeUrl}
              onChange={handleChange}
              placeholder="https://drive.google.com/... (ensure link sharing is set to 'Anyone with link')"
              className="w-full bg-[#121212] border border-white/10 px-4 py-3 text-sm text-white placeholder-white/20 focus:border-white/40 focus:outline-none transition-colors"
            />
            <p className="mt-1 text-[11px] text-[#8e8f94]">
              Make sure view permissions are public so our technical team can review.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* GitHub Profile */}
            <div>
              <label className="block font-mono text-xs uppercase tracking-wider text-[#d8d9dc] mb-2">
                GitHub Profile URL
              </label>
              <input
                type="url"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleChange}
                placeholder="https://github.com/yourusername"
                className="w-full bg-[#121212] border border-white/10 px-4 py-3 text-sm text-white placeholder-white/20 focus:border-white/40 focus:outline-none transition-colors"
              />
            </div>

            {/* Portfolio / Live Projects */}
            <div>
              <label className="block font-mono text-xs uppercase tracking-wider text-[#d8d9dc] mb-2">
                Live Portfolio / Case Studies / Figma URL
              </label>
              <input
                type="url"
                name="portfolioUrl"
                value={formData.portfolioUrl}
                onChange={handleChange}
                placeholder="https://yourportfolio.com or Behance/Dribbble link"
                className="w-full bg-[#121212] border border-white/10 px-4 py-3 text-sm text-white placeholder-white/20 focus:border-white/40 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Cover Note */}
          <div>
            <label className="block font-mono text-xs uppercase tracking-wider text-[#d8d9dc] mb-2">
              Brief Pitch or Notes (Optional)
            </label>
            <textarea
              name="coverNote"
              rows={3}
              value={formData.coverNote}
              onChange={handleChange}
              placeholder="Highlight any standout achievements, availability, or context you would like our team to know."
              className="w-full bg-[#121212] border border-white/10 px-4 py-3 text-sm text-white placeholder-white/20 focus:border-white/40 focus:outline-none transition-colors leading-relaxed"
            />
          </div>
        </div>
      </div>

      {/* ── SUBMIT BUTTON ── */}
      <div className="border-t border-white/10 pt-6">
        <button
          type="submit"
          disabled={status === 'loading'}
          className={`w-full py-4 px-8 font-mono text-sm font-semibold uppercase tracking-wider transition-all cursor-pointer ${
            allChecklistCompleted
              ? 'bg-white text-black hover:bg-[#d8d9dc] shadow-xl'
              : 'bg-white/20 text-white/60 hover:bg-white/30'
          }`}
        >
          {status === 'loading'
            ? 'Transmitting Application...'
            : allChecklistCompleted
            ? 'Submit Application →'
            : 'Complete All 4 Verification Steps to Submit'}
        </button>

        <p className="mt-3 text-center font-mono text-[11px] text-[#8e8f94]">
          By submitting, you confirm all details provided are accurate and that you meet the 3+ years experience requirement.
        </p>
      </div>
    </form>
  );
}
