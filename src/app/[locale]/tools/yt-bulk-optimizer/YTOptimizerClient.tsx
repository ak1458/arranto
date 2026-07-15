'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Link } from '@/i18n/navigation';
import { Reveal } from '@/components/Reveal';

type Video = {
  id: string;
  title: string;
  description: string;
  type: 'Long' | 'Short';
  seoScore: number;
  newTitle?: string;
  newDescription?: string;
  status: 'pending' | 'optimizing' | 'synced' | 'failed';
};

type ChannelInfo = {
  title: string;
  subs: string;
  logo: string;
  videosCount: number;
};

const MOCK_CHANNEL: ChannelInfo = {
  title: "Ashraf Gaming Hub",
  subs: "14.2K",
  logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=60",
  videosCount: 154,
};

const MOCK_VIDEOS: Video[] = [
  { id: "v1", title: "GTA 5 gameplay part 1", description: "", type: "Long", seoScore: 12, status: "pending" },
  { id: "v2", title: "RDR2 cinematic ride shorts #shorts", description: "", type: "Short", seoScore: 25, status: "pending" },
  { id: "v3", title: "Forza Horizon 5 race highway speed run", description: "", type: "Long", seoScore: 18, status: "pending" },
  { id: "v4", title: "Valorant ace clutch live", description: "valorant gameplay clutch highlight", type: "Long", seoScore: 40, status: "pending" },
  { id: "v5", title: "Minecraft building modern mansion tutorial", description: "", type: "Long", seoScore: 15, status: "pending" },
  { id: "v6", title: "GTA 5 epic jumps #shorts", description: "funny moments", type: "Short", seoScore: 30, status: "pending" },
];

// Non-hue SEO score tiers: filled dot + bold text for scores that need attention,
// hollow dot + muted text for scores that are already fine (nothing to alarm about).
const seoScoreMeta = (score: number) => {
  if (score < 30) return { dot: 'bg-white', cls: 'text-white font-bold' };
  if (score < 70) return { dot: 'bg-white/50', cls: 'text-[#d8d9dc]' };
  return { dot: 'border border-white/40 bg-transparent', cls: 'text-[#9494a0]' };
};

export default function YTOptimizerClient() {
  const [isSandbox, setIsSandbox] = useState(true);
  const [clientId, setClientId] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [channel, setChannel] = useState<ChannelInfo>(MOCK_CHANNEL);
  const [videos, setVideos] = useState<Video[]>(MOCK_VIDEOS);
  const [activeTab, setActiveTab] = useState<'overview' | 'playlist' | 'seo'>('overview');
  const [quota, setQuota] = useState(9850); // out of 10000
  const [logs, setLogs] = useState<string[]>([
    "[SYSTEM] YT Bulk SEO Optimizer initialized.",
    "[SYSTEM] Running in sandbox mode with mock data.",
    "[OAUTH] Paste Google OAuth Client ID to connect real channel."
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  // Playlist sync inputs
  const [batchLimit, setBatchLimit] = useState(50);
  const [syncShorts, setSyncShorts] = useState(true);
  const [publicPlaylists, setPublicPlaylists] = useState(true);
  const [playlistId, setPlaylistId] = useState('');

  // SEO prompt configs
  const [extraTags, setExtraTags] = useState('rtx 4090, 4k 60fps, gameplay walkthough');
  const [socialLinks, setSocialLinks] = useState('https://twitter.com/arranto_studio');

  const logsEndRef = useRef<HTMLDivElement>(null);

  const addLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, `[${timestamp}] ${msg}`]);
  };

  const handleOAuthConnect = () => {
    if (!clientId.trim()) {
      alert("Please enter a valid Google OAuth Client ID");
      return;
    }
    const redirectUri = window.location.origin + window.location.pathname;
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(clientId)}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=token&scope=https://www.googleapis.com/auth/youtube.force-ssl`;
    addLog(`[OAUTH] Redirecting to Google authorization page...`);
    window.location.href = authUrl;
  };

  const fetchRealChannel = async (token: string) => {
    addLog(`[API] Fetching authenticated channel details...`);
    try {
      const res = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&mine=true`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.items && data.items.length > 0) {
        const item = data.items[0];
        const info: ChannelInfo = {
          title: item.snippet.title,
          subs: parseInt(item.statistics.subscriberCount).toLocaleString(),
          logo: item.snippet.thumbnails.default.url,
          videosCount: parseInt(item.statistics.videoCount),
        };
        setChannel(info);
        addLog(`[API] Successfully authenticated: "${info.title}" (${info.subs} subscribers)`);
        fetchRealVideos(token);
      } else {
        addLog(`[API] Error: No channel associated with this account.`);
      }
    } catch (e) {
      addLog(`[API] Connection failed: ${e}`);
    }
  };

  const fetchRealVideos = async (token: string) => {
    addLog(`[API] Loading recent upload videos...`);
    try {
      const res = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&type=video&forMine=true`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.items) {
        const mappedVideos: Video[] = (data.items as Array<{ id: { videoId: string }; snippet: { title: string; description: string } }>).map((item) => ({
          id: item.id.videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          type: item.snippet.title.toLowerCase().includes('#shorts') || item.snippet.title.toLowerCase().includes('shorts') ? 'Short' : 'Long',
          seoScore: item.snippet.description ? 60 : 10,
          status: 'pending'
        }));
        setVideos(mappedVideos);
        addLog(`[API] Loaded ${mappedVideos.length} videos from your channel.`);
      }
    } catch (e) {
      addLog(`[API] Error loading videos: ${e}`);
    }
  };

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  // Google OAuth redirect parser
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      const token = params.get('access_token');
      if (token) {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time OAuth token parsed from the URL fragment on mount
        setAccessToken(token);
        setIsSandbox(false);
        addLog(`[OAUTH] Received Access Token from Google.`);
        fetchRealChannel(token);
        window.location.hash = ''; // clear hash
      }
    }
  }, []);

  const handlePlaylistSync = async () => {
    if (isProcessing) return;
    if (!accessToken) {
      alert("Connect your YouTube channel first (Live API mode).");
      return;
    }
    if (!playlistId.trim()) {
      addLog(`[SYNC] No playlist ID entered — nothing to add to. Paste a playlist ID below.`);
      return;
    }
    setIsProcessing(true);
    setProgress(10);
    addLog(`[SYNC] Adding up to ${batchLimit} videos to playlist ${playlistId}...`);
    const targets = videos.slice(0, batchLimit);
    let done = 0;
    for (const v of targets) {
      try {
        const res = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            snippet: {
              playlistId: playlistId.trim(),
              resourceId: { kind: "youtube#video", videoId: v.id },
            },
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error?.message || `HTTP ${res.status}`);
        done++;
        setQuota((q) => Math.max(0, q - 1));
        addLog(`[SYNC] Added "${v.title}" → playlist (${done}/${targets.length}).`);
      } catch (e: unknown) {
        addLog(`[SYNC] Failed for "${v.title}": ${e instanceof Error ? e.message : String(e)}`);
      }
      setProgress(Math.round(((done + 0.5) / targets.length) * 100));
    }
    setProgress(100);
    setIsProcessing(false);
    addLog(`[SYNC] Playlist sync complete — ${done} video(s) added. Quota consumed: ${done} unit(s).`);
  };

  const handleSEOOptimizeSingle = async (video: Video) => {
    addLog(`[SEO] Analyzing metadata for: "${video.title}"`);
    setVideos(prev => prev.map(v => v.id === video.id ? { ...v, status: 'optimizing' } : v));

    try {
      // Call our SEO content engine API route
      const res = await fetch('/api/seo-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          business: video.title,
          industry: "gaming",
          location: "global"
        })
      });
      const data = await res.json();

      if (data.blogTitles && data.blogTitles.length > 0) {
        const optimizedTitle = data.blogTitles[0] + " | Walkthrough Part 1";
        const optimizedDesc = `${optimizedTitle}\n\nJoin this epic gameplay run! Make sure to like and subscribe.\n\nPC SPECS:\n- GPU: Nvidia RTX 4090\n- CPU: Intel Core i9\n- RAM: 64GB DDR5\n\nTAGS:\n${extraTags}\n\nSOCIALS:\n${socialLinks}`;

        setVideos(prev => prev.map(v => v.id === video.id ? {
          ...v,
          newTitle: optimizedTitle,
          newDescription: optimizedDesc,
          seoScore: 92,
          status: 'pending'
        } : v));
        addLog(`[SEO] AI optimization drafts compiled for "${video.title}".`);
      } else {
        throw new Error("No titles returned");
      }
    } catch (e) {
      setVideos(prev => prev.map(v => v.id === video.id ? { ...v, status: 'failed' } : v));
      addLog(`[SEO] Failed generating AI metadata for "${video.title}": ${e}`);
    }
  };

  const handlePublishSEOAll = async () => {
    if (isProcessing) return;
    const targets = videos.filter(v => v.newTitle || v.newDescription);
    if (targets.length === 0) {
      alert("No optimized metadata drafts found. Run AI Optimization on videos first!");
      return;
    }
    if (!accessToken) {
      alert("Connect your YouTube channel first (Live API mode).");
      return;
    }

    setIsProcessing(true);
    setProgress(5);
    addLog(`[PUBLISHER] Writing live metadata updates for ${targets.length} videos...`);

    let done = 0;
    for (const v of targets) {
      try {
        // Fetch current snippet so we don't clobber other fields.
        const getRes = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${v.id}`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        const getData = await getRes.json();
        const snippet = getData?.items?.[0]?.snippet;
        if (!snippet) throw new Error("Video not found / no access");

        const res = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: v.id,
            snippet: {
              ...snippet,
              title: v.newTitle || snippet.title,
              description: v.newDescription || snippet.description,
            },
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error?.message || `HTTP ${res.status}`);
        done++;
        setQuota((q) => Math.max(0, q - 50));

        setVideos(prev => prev.map(item => item.id === v.id ? {
          ...item,
          title: v.newTitle || item.title,
          description: v.newDescription || item.description,
          newTitle: undefined,
          newDescription: undefined,
          status: 'synced'
        } : item));
        addLog(`[PUBLISHER] Live update applied for "${v.title}".`);
      } catch (e: unknown) {
        addLog(`[PUBLISHER] Failed "${v.title}": ${e instanceof Error ? e.message : String(e)}`);
      }
      setProgress(Math.round(((done + 0.5) / targets.length) * 100));
    }
    setProgress(100);
    setIsProcessing(false);
    addLog(`[PUBLISHER] ${done}/${targets.length} videos updated live on YouTube.`);
  };

  const handleClearLogs = () => {
    setLogs([]);
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-paper font-sans">
      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-36 md:px-12">
        {/* Header */}
        <Reveal>
          <div className="mb-10 flex flex-col justify-between gap-6 border-b border-paper/10 pb-8 md:flex-row md:items-end">
            <div>
              <div className="flex items-center gap-2">
                <Link href="/tools" className="font-mono text-xs text-paper/50 hover:text-paper">← ALL TOOLS</Link>
                <span className="h-3 w-px bg-paper/20" />
                <span className="font-mono text-xs text-[#d8d9dc] uppercase tracking-wider">YT BULK OPTIMIZER</span>
              </div>
              <h1 className="mt-4 font-display text-3xl font-light tracking-tight md:text-5xl">
                YouTube Bulk <em className="font-display italic text-[#d8d9dc]">SEO Organizer</em>
              </h1>
              <p className="mt-3 text-sm text-paper/60 font-light">
                Manage playlists, automate title and description delta overrides, and track API quota budgets.
              </p>
            </div>

            {/* Quick channel info widget */}
            <div className="card-hover flex items-center gap-4 border border-paper/10 bg-[#121218] p-4 min-w-[280px] shadow-xl">
            <img src={channel.logo} alt={channel.title} className="h-12 w-12 border border-paper/10 object-cover"/>
              <div>
                <h3 className="text-sm font-bold text-paper leading-tight">{channel.title}</h3>
                <p className="text-xs text-paper/50 font-mono mt-1">{channel.subs} Subscribers</p>
                <div
                className={`mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                    isSandbox
                      ? 'border border-dashed border-white/25 text-[#9494a0]'
                      : 'border border-white/40 bg-white/10 text-white'
                  }`}
                >
                  {isSandbox ? "SANDBOX MODE" : "LIVE YOUTUBE CONNECT"}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Layout Grid */}
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Sidebar controls */}
          <Reveal className="lg:col-span-4 flex flex-col gap-6">
            <div className="flex flex-col gap-6">
              {/* Credentials / Sandbox toggle */}
              <div className="border border-paper/10 bg-[#0c0d10] p-6 shadow-xl">
                <h2 className="font-mono text-xs uppercase tracking-widest text-[#d8d9dc] mb-4">CHANNEL CONNECTION</h2>

<div className="flex bg-paper/[0.04] p-1 border border-paper/5 mb-6">
                  <button
                    onClick={() => setIsSandbox(true)}
                    className={`flex-1 py-1.5 text-xs font-semibold transition-all ${isSandbox ? 'bg-[#d8d9dc] text-black' : 'text-paper/60 hover:text-paper'}`}
                  >
                    Sandbox Demo
                  </button>
                  <button
                    onClick={() => setIsSandbox(false)}
                    className={`flex-1 py-1.5 text-xs font-semibold transition-all ${!isSandbox ? 'bg-[#d8d9dc] text-black' : 'text-paper/60 hover:text-paper'}`}
                  >
                    Live API
                  </button>
                </div>

                {!isSandbox && !accessToken ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-mono text-paper/40 uppercase mb-1.5">Google OAuth Client ID</label>
                      <input
                        type="text"
                        placeholder="Paste your client_secret Client ID"
                        value={clientId}
                        onChange={(e) => setClientId(e.target.value)}
                        className="w-full bg-paper/[0.03] border border-paper/10 px-3.5 py-2 text-sm text-paper focus:outline-none focus:border-[#d8d9dc]/50 transition-colors"
                      />
                    </div>
                    <button
                      onClick={handleOAuthConnect}
                      className="w-full bg-[#d8d9dc] hover:bg-white py-2.5 text-xs font-bold uppercase tracking-wider text-black transition-colors"
                    >
                      Authenticate with Google
                    </button>
                    <p className="text-[10px] text-paper/40 leading-relaxed font-light">
                      Follow the checklist to configure your Desktop Client ID. We handle the SSL auth redirect securely.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex justify-between border-b border-paper/5 pb-2">
                      <span className="text-xs text-paper/50">Connection State:</span>
                      <span className="text-xs font-bold text-white">AUTHENTICATED</span>
                    </div>
                    <div className="flex justify-between border-b border-paper/5 pb-2">
                      <span className="text-xs text-paper/50">Quota Allocation:</span>
                      <span className="text-xs font-mono">10,000 units</span>
                    </div>
                    {accessToken && (
                      <button
                        onClick={() => {
                          setAccessToken('');
                          setIsSandbox(true);
                          setChannel(MOCK_CHANNEL);
                          setVideos(MOCK_VIDEOS);
                          addLog("[SYSTEM] Disconnected from Google. Reverted to Sandbox.");
                        }}
                        className="w-full mt-4 border border-paper/10 hover:bg-white/[0.04] text-paper py-2 text-xs"
                      >
                        Disconnect Channel
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Quota Gauge */}
              <div className="border border-paper/10 bg-[#0c0d10] p-6 shadow-xl">
                <h2 className="font-mono text-xs uppercase tracking-widest text-[#d8d9dc] mb-4">DAILY QUOTA TRACKER</h2>

                <div className="flex items-center gap-6">
                  {/* Circular Progress Gauge */}
                  <div className="relative flex items-center justify-center size-24">
                    <svg className="size-full -rotate-90">
                      <circle cx="48" cy="48" r="42" stroke="rgba(255,255,255,0.03)" strokeWidth="6" fill="transparent" />
                      <circle
                        cx="48"
                        cy="48"
                        r="42"
                        stroke="#d8d9dc"
                        strokeWidth="6"
                        fill="transparent"
                        strokeDasharray={263.8}
                        strokeDashoffset={263.8 - (263.8 * quota) / 10000}
                        className="transition-all duration-1000"
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                      <span className="text-sm font-bold">{quota.toLocaleString()}</span>
                      <span className="text-[8px] text-paper/40 font-mono">UNITS LEFT</span>
                    </div>
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="text-[10px] text-paper/40 font-mono leading-relaxed">
                      YouTube limits developer credentials to 10,000 units/day. Resets daily at 8:00 AM UTC.
                    </div>
                    <div className="h-1.5 w-full bg-paper/5 overflow-hidden">
                      <div className="h-full bg-[#d8d9dc]" style={{ width: `${(quota / 10000) * 100}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Main Workspace panels */}
          <Reveal className="lg:col-span-8 flex flex-col gap-6" delay={0.05}>
            <div className="flex flex-col gap-6">
              {/* Tabs Selector */}
              <div className="flex border-b border-paper/10">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-6 py-3.5 text-sm font-semibold tracking-wide border-b-2 transition-all ${activeTab === 'overview' ? 'border-[#d8d9dc] text-paper' : 'border-transparent text-paper/50 hover:text-paper'}`}
                >
                  1. Diagnostics
                </button>
                <button
                  onClick={() => setActiveTab('playlist')}
                  className={`px-6 py-3.5 text-sm font-semibold tracking-wide border-b-2 transition-all ${activeTab === 'playlist' ? 'border-[#d8d9dc] text-paper' : 'border-transparent text-paper/50 hover:text-paper'}`}
                >
                  2. Playlist Sync
                </button>
                <button
                  onClick={() => setActiveTab('seo')}
                  className={`px-6 py-3.5 text-sm font-semibold tracking-wide border-b-2 transition-all ${activeTab === 'seo' ? 'border-[#d8d9dc] text-paper' : 'border-transparent text-paper/50 hover:text-paper'}`}
                >
                  3. Bulk SEO Publisher
                </button>
              </div>

              {/* Tab content area */}
              <div className="min-h-[380px] border border-paper/10 bg-white/[0.01] p-8">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-light text-paper">Live Channel Diagnostics</h2>
                      <p className="text-xs text-paper/50 mt-1 leading-relaxed">
                        Scan your uploaded videos to locate tags, descriptions, and identify zero-SEO targets.
                      </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                    <div className="border border-paper/5 bg-[#0e1014] p-4">
                        <span className="text-[10px] font-mono text-paper/40 block mb-1">TOTAL VIDEOS</span>
                        <span className="text-2xl font-semibold">{videos.length}</span>
                      </div>
                      <div className="border border-paper/5 bg-[#0e1014] p-4">
                        <span className="text-[10px] font-mono text-paper/40 block mb-1">LOW SEO (CRITICAL)</span>
                        <span className="text-2xl font-bold text-white">
                          {videos.filter(v => v.seoScore < 30).length}
                        </span>
                      </div>
                      <div className="border border-paper/5 bg-[#0e1014] p-4">
                        <span className="text-[10px] font-mono text-paper/40 block mb-1">STABLE PLAYLISTS</span>
                        <span className="text-2xl font-semibold text-paper/50">4</span>
                      </div>
                    </div>

<div className="border border-paper/10 bg-black/45 p-6">
                      <h3 className="text-sm font-bold text-paper mb-3">Diagnostic Analysis Overview</h3>
                      <ul className="space-y-2.5 text-xs text-paper/70 font-light">
                        <li className="flex items-center gap-2">
                        <span className="size-1.5 bg-white"/>
                          {videos.filter(v => v.description === '').length} videos have empty descriptions (0-SEO targets).
                        </li>
                        <li className="flex items-center gap-2">
                        <span className="size-1.5 bg-white/50"/>
                          Cinematic keywords found in titles, but missing structured description blocks.
                        </li>
                        <li className="flex items-center gap-2">
                        <span className="size-1.5 border border-white/40"/>
                          Shorts category playlists Visibility settings conform to standard Public parameters.
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === 'playlist' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-light text-paper">Playlist Auto-Organizer</h2>
                      <p className="text-xs text-paper/50 mt-1 leading-relaxed">
                        Group gaming walkthroughs or clips automatically into game playlists based on text matching.
                      </p>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label className="block text-[10px] font-mono text-paper/40 uppercase mb-2">Max Sync Batch Size</label>
                        <input
                          type="number"
                          value={batchLimit}
                          onChange={(e) => setBatchLimit(parseInt(e.target.value))}
                          className="w-full bg-paper/[0.03] border border-paper/10 px-4 py-2.5 text-sm text-paper focus:outline-none focus:border-[#d8d9dc]/50 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono text-paper/40 uppercase mb-2">Target Playlist ID</label>
                        <input
                          type="text"
                          value={playlistId}
                          onChange={(e) => setPlaylistId(e.target.value)}
                          placeholder="PLxxxxxxxxxxxxxxxx"
                          className="w-full bg-paper/[0.03] border border-paper/10 px-4 py-2.5 text-sm text-paper focus:outline-none focus:border-[#d8d9dc]/50 transition-colors"
                        />
                      </div>
                      <div className="flex flex-col justify-end space-y-4">
                        <label className="flex items-center gap-3 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={syncShorts}
                            onChange={(e) => setSyncShorts(e.target.checked)}
                            className="accent-[#d8d9dc]"
                          />
                          <span className="text-xs text-paper/80">Separate Shorts into dedicated playlist</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={publicPlaylists}
                            onChange={(e) => setPublicPlaylists(e.target.checked)}
                            className="accent-[#d8d9dc]"
                          />
                          <span className="text-xs text-paper/80">Make created playlists Public (recommended)</span>
                        </label>
                      </div>
                    </div>

                    {isProcessing && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-mono text-paper/50">
                          <span>Sync in progress...</span>
                          <span>{progress}%</span>
                        </div>
                        <div className="h-2 w-full bg-paper/5 overflow-hidden">
                          <div className="h-full bg-[#d8d9dc] transition-all duration-300" style={{ width: `${progress}%` }} />
                        </div>
                      </div>
                    )}

                    <button
                      onClick={handlePlaylistSync}
                      disabled={isProcessing}
                      className="bg-[#d8d9dc] hover:bg-white text-black font-bold px-6 py-3.5 text-xs uppercase tracking-wider disabled:opacity-40 transition-colors"
                    >
                      {isProcessing ? "Processing Batch..." : "Synchronize Playlists"}
                    </button>
                  </div>
                )}

                {activeTab === 'seo' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-end">
                      <div>
                        <h2 className="text-xl font-light text-paper">Selective SEO Publisher</h2>
                        <p className="text-xs text-paper/50 mt-1 leading-relaxed">
                          Bulk optimize empty metadata fields with cinematic titles and template snippets.
                        </p>
                      </div>
                      <button
                        onClick={handlePublishSEOAll}
                        disabled={isProcessing || videos.filter(v => v.newTitle).length === 0}
                        className="bg-[#d8d9dc] hover:bg-white text-black font-bold px-4 py-2 text-xs uppercase disabled:opacity-30 transition-colors"
                      >
                        Publish Drafts Live
                      </button>
                    </div>

                    {/* Video Grid Table */}
                    <div className="border border-paper/10 overflow-hidden bg-black/30 max-h-[300px] overflow-y-auto">
                      <table className="w-full border-collapse text-start text-xs">
                        <thead>
                          <tr className="border-b border-paper/10 bg-paper/[0.04]">
                            <th className="p-3 font-mono text-[9px] uppercase tracking-wider text-paper/40">VIDEO NAME</th>
                            <th className="p-3 font-mono text-[9px] uppercase tracking-wider text-paper/40">TYPE</th>
                            <th className="p-3 font-mono text-[9px] uppercase tracking-wider text-paper/40">SEO SCORE</th>
                            <th className="p-3 font-mono text-[9px] uppercase tracking-wider text-paper/40">ACTIONS</th>
                          </tr>
                        </thead>
                        <tbody>
                          {videos.map(v => {
                            const scoreMeta = seoScoreMeta(v.seoScore);
                            return (
                              <tr key={v.id} className="border-b border-paper/5 hover:bg-white/[0.01] transition-all">
                                <td className="p-3">
                                  <div className="font-semibold text-paper truncate max-w-[200px]">{v.title}</div>
                                  {v.newTitle && (
                                    <div className="text-[10px] text-[#d8d9dc] mt-1 truncate max-w-[200px]">Draft: {v.newTitle}</div>
                                  )}
                                </td>
                                <td className="p-3">
                                <span className="px-2 py-0.5 text-[9px] font-bold bg-white/5 border border-white/10 text-[#9494a0]">
                                    {v.type}
                                  </span>
                                </td>
                                <td className="p-3">
                                  <span className={`inline-flex items-center gap-1.5 font-mono font-bold ${scoreMeta.cls}`}>
                                  <span className={`size-1.5 ${scoreMeta.dot}`} />
                                    {v.seoScore}/100
                                  </span>
                                </td>
                                <td className="p-3">
                                  {v.status === 'optimizing' ? (
                                    <span className="text-paper/40 font-mono text-[10px]">Optimizing...</span>
                                  ) : v.status === 'synced' ? (
                                    <span className="text-white font-bold">✓ Uploaded</span>
                                  ) : (
                                    <button
                                      onClick={() => handleSEOOptimizeSingle(v)}
                                      className="text-[#d8d9dc] hover:text-white font-mono underline text-[10px]"
                                    >
                                      AI SEO Optimize
                                    </button>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    {/* SEO Configuration templates */}
                    <div className="grid gap-4 sm:grid-cols-2 border-t border-paper/10 pt-4">
                      <div>
                        <label className="block text-[10px] font-mono text-paper/40 uppercase mb-1.5">Social/Affiliate Links</label>
                        <input
                          type="text"
                          value={socialLinks}
                          onChange={(e) => setSocialLinks(e.target.value)}
                          className="w-full bg-paper/[0.03] border border-paper/10 px-3 py-2 text-xs text-paper focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono text-paper/40 uppercase mb-1.5">Extra Tags</label>
                        <input
                          type="text"
                          value={extraTags}
                          onChange={(e) => setExtraTags(e.target.value)}
                          className="w-full bg-paper/[0.03] border border-paper/10 px-3 py-2 text-xs text-paper focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Console Terminal Log */}
        <Reveal delay={0.1}>
        <div className="mt-10 border border-paper/15 bg-[#0a0a0c] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-paper/10 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-paper/60">arranto@cli ~ /youtube-optimizer-console</span>
              </div>
              <button
                onClick={handleClearLogs}
                className="text-[10px] font-mono text-paper/40 hover:text-paper"
              >
                Clear Console
              </button>
            </div>
            <div className="h-48 overflow-y-auto font-mono text-xs text-paper/70 space-y-1.5 p-2 bg-black/30 border border-paper/5 scrollbar-thin">
              {logs.map((log, idx) => (
                <div key={idx} className={log.includes('[PUBLISHER]') ? 'text-white font-bold' : 'text-paper/70'}>
                  {log}
                </div>
              ))}
              <div ref={logsEndRef} />
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
