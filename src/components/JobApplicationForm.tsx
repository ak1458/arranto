'use client';

import React, { useState } from 'react';
import { useLocale } from 'next-intl';
import { trackJobApplication } from '@/lib/track';

export type JobRole = 'aiml-engineer' | 'bde';

interface JobApplicationFormProps {
  initialRole?: JobRole;
}

export function JobApplicationForm({ initialRole = 'aiml-engineer' }: JobApplicationFormProps) {
  const locale = useLocale();
  const [selectedRole, setSelectedRole] = useState<JobRole>(initialRole);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    experience: '0–1 years (Fresher / Projects)',
    screeningQ1: 'Yes — Fluent & confident',
    screeningQ2: 'Yes — Fully equipped and comfortable with remote work',
    customPitchQuestion: '',
    githubUrl: '',
    portfolioUrl: '',
    resumeUrl: '',
    coverNote: '',
    botcheck: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'screened_out' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const isAiml = selectedRole === 'aiml-engineer';
  const roleTitle = isAiml
    ? 'AI/ML Engineer – Machine Learning, Deep Learning & AI Applications'
    : 'Business Development Executive (BDE)';

  const handleRoleChange = (role: JobRole) => {
    setSelectedRole(role);
    setStatus('idle');
    setErrorMessage('');
    if (role === 'aiml-engineer') {
      setFormData((prev) => ({
        ...prev,
        experience: '0–1 years (Fresher / Projects)',
        screeningQ1: 'Yes — Strong Python & ML/DL fundamentals',
        screeningQ2: 'Yes — Fully equipped and comfortable with remote work',
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        experience: '0–1 years (Fresher welcome)',
        screeningQ1: 'Yes — Fluent & confident in professional English',
        screeningQ2: 'Yes — Fully equipped and comfortable with remote work',
      }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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

    // Essential criteria check
    const passedEssential =
      formData.screeningQ1.startsWith('Yes') &&
      formData.screeningQ2.startsWith('Yes');

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
          roleApplied: roleTitle,
          locale,
        }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || 'Failed to submit application. Please try again.');
      }

      trackJobApplication(roleTitle);
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
          Thank you for applying for the <span className="text-white font-medium">{roleTitle}</span> position at Arranto. Our engineering and hiring team reviews every technical submission thoroughly and will reach out within 1–2 business days.
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
          Thank you for your interest in Arranto. For the <span className="text-white font-medium">{roleTitle}</span> role, meeting the core requirements (technical / communication foundations and full-time remote readiness) is essential.
        </p>
        <p className="mx-auto mt-3 max-w-lg text-xs text-[#8e8f94] font-light">
          We keep all developer and candidate profiles on file for future opportunities.
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

      {/* Role Selection Tabs */}
      <div className="mb-8 border-b border-white/10 pb-6">
        <span className="font-mono text-[11px] uppercase tracking-wider text-[#8e8f94] block mb-3">
          Select Target Position:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleRoleChange('aiml-engineer')}
            className={`p-4 text-start border transition-all cursor-pointer ${
              isAiml
                ? 'border-white bg-white/10 text-white shadow-lg'
                : 'border-white/10 bg-[#121212] text-[#9494a0] hover:border-white/30'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-sm font-bold block text-white">AI/ML Engineer</span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#d8d9dc] bg-white/5 px-2 py-0.5 border border-white/10">
                Engineering
              </span>
            </div>
            <span className="text-xs text-[#8e8f94] font-light block mt-1">
              Machine Learning, Deep Learning, LLMs & AI Agents · Remote (0–3+ Yrs)
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleRoleChange('bde')}
            className={`p-4 text-start border transition-all cursor-pointer ${
              !isAiml
                ? 'border-white bg-white/10 text-white shadow-lg'
                : 'border-white/10 bg-[#121212] text-[#9494a0] hover:border-white/30'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-sm font-bold block text-white">Business Development</span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#d8d9dc] bg-white/5 px-2 py-0.5 border border-white/10">
                Sales & Growth
              </span>
            </div>
            <span className="text-xs text-[#8e8f94] font-light block mt-1">
              B2B Client Acquisition & Strategic Outreach · Remote (0–1+ Yrs)
            </span>
          </button>
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
              placeholder="e.g. London, UK / Bengaluru, India"
              className="w-full bg-[#121212] border border-white/10 px-4 py-3 text-sm text-white placeholder-white/20 focus:border-white/40 focus:outline-none transition-colors"
            />
          </div>
        </div>
      </div>

      {/* ── SECTION 2: SCREENING QUESTIONS ── */}
      <div className="mb-8 border-t border-white/10 pt-8">
        <span className="font-mono text-[11px] uppercase tracking-wider text-[#8e8f94] block mb-4">
          02 // Screening Questions ({isAiml ? 'Engineering' : 'Business Development'})
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Work Experience */}
          <div>
            <label className="block font-mono text-xs uppercase tracking-wider text-[#d8d9dc] mb-2">
              Experience Level
            </label>
            <select
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full bg-[#121212] border border-white/10 px-4 py-3 text-sm text-white focus:border-white/40 focus:outline-none transition-colors cursor-pointer"
            >
              {isAiml ? (
                <>
                  <option value="0–1 years (Fresher / Projects)" className="bg-[#121212] text-white">0–1 years (Freshers & Self-Taught with Projects — Welcome)</option>
                  <option value="1–2 years" className="bg-[#121212] text-white">1–2 years practical experience</option>
                  <option value="3+ years" className="bg-[#121212] text-white">3+ years engineering experience</option>
                </>
              ) : (
                <>
                  <option value="0–1 years (Fresher welcome)" className="bg-[#121212] text-white">0–1 years (Fresher / Entry level — Welcome)</option>
                  <option value="1–2 years" className="bg-[#121212] text-white">1–2 years</option>
                  <option value="2+ years" className="bg-[#121212] text-white">2+ years</option>
                </>
              )}
            </select>
            <p className="mt-1.5 font-mono text-[11px] text-[#8e8f94]">
              * Essential: No. A strong project portfolio is valued over formal tenure.
            </p>
          </div>

          {/* Screening Q1: Domain Specific */}
          <div>
            <label className="block font-mono text-xs uppercase tracking-wider text-[#d8d9dc] mb-2">
              {isAiml ? 'Python & ML/DL Foundations' : 'English Communication Skills'} <span className="text-red-400">*</span>
            </label>
            <select
              name="screeningQ1"
              value={formData.screeningQ1}
              onChange={handleChange}
              className="w-full bg-[#121212] border border-white/10 px-4 py-3 text-sm text-white focus:border-white/40 focus:outline-none transition-colors cursor-pointer"
            >
              {isAiml ? (
                <>
                  <option value="Yes — Strong Python & ML/DL fundamentals" className="bg-[#121212] text-white">
                    Yes — Strong Python, ML/DL concepts, and hands-on coding ability
                  </option>
                  <option value="No — Only basic API calling / No ML background" className="bg-[#121212] text-white">
                    No — Only basic API calling / No ML background
                  </option>
                </>
              ) : (
                <>
                  <option value="Yes — Fluent & confident in professional English" className="bg-[#121212] text-white">
                    Yes — Fluent & confident in professional English
                  </option>
                  <option value="No — Basic / Not comfortable speaking with founders" className="bg-[#121212] text-white">
                    No — Basic / Not comfortable speaking with founders
                  </option>
                </>
              )}
            </select>
            <p className="mt-1.5 font-mono text-[11px] text-[#8e8f94]">
              * Essential: Yes. Required for day-to-day execution.
            </p>
          </div>

          {/* Screening Q2: Remote Work Readiness */}
          <div className="sm:col-span-2">
            <label className="block font-mono text-xs uppercase tracking-wider text-[#d8d9dc] mb-2">
              Remote Work Setup & Readiness <span className="text-red-400">*</span>
            </label>
            <select
              name="screeningQ2"
              value={formData.screeningQ2}
              onChange={handleChange}
              className="w-full bg-[#121212] border border-white/10 px-4 py-3 text-sm text-white focus:border-white/40 focus:outline-none transition-colors cursor-pointer"
            >
              <option value="Yes — Fully equipped and comfortable with remote work" className="bg-[#121212] text-white">
                Yes — Fully equipped with laptop/stable internet & comfortable working remotely
              </option>
              <option value="No — Prefer in-office setup only" className="bg-[#121212] text-white">
                No — Prefer in-office setup only
              </option>
            </select>
            <p className="mt-1.5 font-mono text-[11px] text-[#8e8f94]">
              * Essential: Yes. This is a 100% full-time remote position.
            </p>
          </div>
        </div>

        {/* 🔥 Role-Specific Custom Scenario / Technical Question */}
        <div className="mt-6 border border-white/15 bg-[#0e0e0e] p-5 sm:p-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-base">🔥</span>
            <label className="block font-mono text-xs uppercase tracking-wider text-white font-semibold">
              {isAiml ? 'Technical Project Deep Dive' : 'Outreach Scenario Question'} <span className="text-red-400">* (Essential)</span>
            </label>
          </div>

          {isAiml ? (
            <>
              <p className="text-xs sm:text-sm text-[#d8d9dc] font-medium leading-relaxed mb-3">
                Describe your strongest AI/ML, Deep Learning, or Agentic AI project. What was the architecture, what models/techniques did you use (e.g. PyTorch, RAG, custom embeddings, fine-tuning), what challenge did you solve, and what was the outcome?
              </p>
              <textarea
                name="customPitchQuestion"
                required
                rows={5}
                value={formData.customPitchQuestion}
                onChange={handleChange}
                placeholder="Details of your strongest project: architecture, tech stack (PyTorch/TensorFlow, LLMs, Vector DBs, RAG, etc.), challenges overcome, and GitHub/demo link if available."
                className="w-full bg-[#161616] border border-white/10 px-4 py-3 text-sm text-white placeholder-white/20 focus:border-white/40 focus:outline-none transition-colors resize-y font-light leading-relaxed"
              />
            </>
          ) : (
            <>
              <p className="text-xs sm:text-sm text-[#d8d9dc] font-medium leading-relaxed mb-3">
                Imagine you have identified a business that could benefit from Arranto&apos;s services. How would you approach the business owner for the first time and try to turn them into a client?
              </p>
              <textarea
                name="customPitchQuestion"
                required
                rows={5}
                value={formData.customPitchQuestion}
                onChange={handleChange}
                placeholder="Walk us through your initial research, the message angle or cold call opening you would use, what value you would highlight, and how you would guide the discussion toward a meeting."
                className="w-full bg-[#161616] border border-white/10 px-4 py-3 text-sm text-white placeholder-white/20 focus:border-white/40 focus:outline-none transition-colors resize-y font-light leading-relaxed"
              />
            </>
          )}

          <p className="mt-2 font-mono text-[11px] text-[#8e8f94]">
            * Written answer required. We evaluate practical engineering depth / strategic thinking over simple buzzwords.
          </p>
        </div>
      </div>

      {/* ── SECTION 3: REPOSITORIES & LINKS ── */}
      <div className="mb-8 border-t border-white/10 pt-8">
        <span className="font-mono text-[11px] uppercase tracking-wider text-[#8e8f94] block mb-4">
          03 // Technical Links & Resume
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* GitHub Profile */}
          <div>
            <label className="block font-mono text-xs uppercase tracking-wider text-[#d8d9dc] mb-2">
              GitHub Profile URL {isAiml && <span className="text-emerald-400">(Highly Recommended)</span>}
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

          {/* Portfolio / LinkedIn / Project Demo */}
          <div>
            <label className="block font-mono text-xs uppercase tracking-wider text-[#d8d9dc] mb-2">
              Portfolio / Live Project / LinkedIn URL
            </label>
            <input
              type="url"
              name="portfolioUrl"
              value={formData.portfolioUrl}
              onChange={handleChange}
              placeholder="https://yourportfolio.com or LinkedIn link"
              className="w-full bg-[#121212] border border-white/10 px-4 py-3 text-sm text-white placeholder-white/20 focus:border-white/40 focus:outline-none transition-colors"
            />
          </div>

          {/* Resume Link */}
          <div className="sm:col-span-2">
            <label className="block font-mono text-xs uppercase tracking-wider text-[#d8d9dc] mb-2">
              Resume / CV Link (Google Drive / Dropbox / Notion / Cloud Link) <span className="text-red-400">*</span>
            </label>
            <input
              type="url"
              name="resumeUrl"
              required
              value={formData.resumeUrl}
              onChange={handleChange}
              placeholder="https://drive.google.com/file/d/..."
              className="w-full bg-[#121212] border border-white/10 px-4 py-3 text-sm text-white placeholder-white/20 focus:border-white/40 focus:outline-none transition-colors"
            />
            <p className="mt-1.5 font-mono text-[11px] text-[#8e8f94]">
              * Ensure link permission is set to &ldquo;Anyone with link can view&rdquo;.
            </p>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6">
        <div className="text-start">
          <p className="font-mono text-xs text-[#8e8f94]">
            Applying for: <span className="text-white">{isAiml ? 'AI/ML Engineer' : 'BDE'}</span> (Remote)
          </p>
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white text-black px-8 py-3.5 font-mono text-xs font-semibold uppercase tracking-wider hover:bg-[#d8d9dc] transition-colors disabled:opacity-50 cursor-pointer"
        >
          {status === 'loading' ? (
            <>
              <span className="h-4 w-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              Reviewing & Submitting...
            </>
          ) : (
            <>
              Submit Application →
            </>
          )}
        </button>
      </div>
    </form>
  );
}
