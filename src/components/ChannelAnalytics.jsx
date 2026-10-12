import React, { useState, useEffect } from 'react';
import {
  Search, TrendingUp, DollarSign, Eye, Users, Video,
  Tag, Award, Sparkles, ExternalLink, Sliders, CheckCircle2,
  ThumbsUp, MessageCircle, Radio, Image as ImageIcon, AlertCircle
} from 'lucide-react';
import { fetchRealChannelData, fetchChannelLiveCounters } from '../services/youtubeService';

const QUICK_CHANNELS = [
  { label: 'Mittivine', query: 'mittivine' },
  { label: 'SUBYEKTIV', query: 'subyektiv' },
  { label: 'ISOMTV', query: 'isomtv' },
  { label: "Najot Ta'lim", query: 'najottalim' },
  { label: 'Texnoplov', query: 'texnoplov' },
  { label: 'MrBeast', query: 'mrbeast' }
];

export default function ChannelAnalytics({ onAnalyzeThumbnail }) {
  const [query, setQuery] = useState('mittivine');
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [cpm, setCpm] = useState(1.8);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLiveUpdating, setIsLiveUpdating] = useState(true);

  const loadChannel = async (searchTarget, specificItem = null) => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      const realData = await fetchRealChannelData(searchTarget, specificItem);
      setSelectedChannel(realData);
    } catch (err) {
      setErrorMsg(err.message || "Kanal ma'lumotlarini olishda xatolik yuz berdi");
    } finally {
      setIsLoading(false);
    }
  };

  // Load initial real channel (Mittivine) on mount
  useEffect(() => {
    loadChannel('mittivine');
  }, []);

  // Real-time live subscriber & view counter polling every 5 seconds
  useEffect(() => {
    if (!selectedChannel?.id || !isLiveUpdating) return;
    const interval = setInterval(async () => {
      try {
        const live = await fetchChannelLiveCounters(selectedChannel.id);
        if (live.subscriberCount > 0 || live.viewCount > 0) {
          setSelectedChannel((prev) => {
            if (!prev || prev.id !== selectedChannel.id) return prev;
            const newSubs = live.subscriberCount || prev.subscribersCount;
            const newViews = live.viewCount || prev.viewsCount;
            const newVids = live.videoCount || prev.videoCount;
            return {
              ...prev,
              subscribersCount: newSubs,
              subscribers: newSubs.toLocaleString('en-US'),
              viewsCount: newViews,
              totalViews: newViews.toLocaleString('en-US'),
              videoCount: newVids
            };
          });
        }
      } catch {
        // silent background poll error
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [selectedChannel?.id, isLiveUpdating]);

  const handleSearch = (e) => {
    e?.preventDefault();
    if (!query.trim()) return;
    loadChannel(query);
  };

  const calculateCustomRevenue = () => {
    const monthlyViews = selectedChannel?.monthlyViewsCount || 0;
    const est = (monthlyViews / 1000) * cpm;
    return Math.round(est).toLocaleString('en-US');
  };

  const calculateTotalLifetimeRevenue = () => {
    const totalViews = selectedChannel?.viewsCount || 0;
    const est = (totalViews / 1000) * cpm;
    return Math.round(est).toLocaleString('en-US');
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Search Header Banner */}
      <div className="relative rounded-3xl overflow-hidden glass-panel-glow p-6 sm:p-10 border border-white/10">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF385C]/10 via-[#8B5CF6]/10 to-[#00F0FF]/10 pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-300">
            <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>100% Real-Time Ochiq YouTube Maʼlumotlar Bazasi</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Istalgan YouTube Blogerni <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF385C] via-[#c084fc] to-[#00F0FF]">
              Haqiqiy Statistikasini Koʻring
            </span>
          </h1>

          <p className="text-sm sm:text-base text-gray-400 max-w-xl mx-auto">
            Jonli obunachilar soni, jami prasmotrlar, real videolar, layk va izohlar hamda taxminiy daromadni ochiq YouTube maʼlumotlari asosida tahlil qiling.
          </p>

          {/* Search Box */}
          <form onSubmit={handleSearch} className="pt-2 flex flex-col sm:flex-row gap-2 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Kanal nomi yoki linki (masalan: mittivine, subyektiv, isomtv, konsta)..."
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-[#080b11]/90 border border-white/15 text-white placeholder-gray-500 focus:outline-none focus:border-[#FF385C] focus:ring-2 focus:ring-[#FF385C]/20 text-sm transition-all shadow-inner"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#FF385C] to-[#8B5CF6] hover:brightness-110 active:scale-95 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#FF385C]/30 transition-all shrink-0 cursor-pointer"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Haqiqiy Tahlil</span>
                </>
              )}
            </button>
          </form>

          {/* Quick preset chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <span className="text-xs text-gray-400 font-medium">Tezkor tekshirish:</span>
            {QUICK_CHANNELS.map((item) => (
              <button
                key={item.query}
                onClick={() => {
                  setQuery(item.query);
                  loadChannel(item.query);
                }}
                className={`text-xs px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                  query.toLowerCase() === item.query
                    ? 'bg-[#FF385C]/20 border border-[#FF385C] text-white font-bold'
                    : 'bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Error State */}
      {errorMsg && (
        <div className="glass-panel p-6 rounded-2xl border border-red-500/30 bg-red-500/10 flex items-center gap-3 text-red-300 text-sm">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="glass-panel rounded-3xl p-12 text-center space-y-4">
          <div className="w-12 h-12 border-4 border-[#FF385C] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm font-bold text-white">
            YouTube ochiq maʼlumotlar bazasidan haqiqiy kanal statistikasi yuklanmoqda...
          </p>
        </div>
      )}

      {/* Other Matching Channels Bar (if user wants to switch between similar channels) */}
      {!isLoading && selectedChannel?.candidates?.length > 1 && (
        <div className="glass-panel px-5 py-3.5 rounded-2xl flex items-center gap-3 overflow-x-auto no-scrollbar">
          <span className="text-xs font-bold text-gray-400 shrink-0">Mos kelgan kanallar:</span>
          {selectedChannel.candidates.map((cand) => {
            const isCurrent = cand.id === selectedChannel.id;
            return (
              <button
                key={cand.id}
                onClick={() => loadChannel(query, cand)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs transition-all shrink-0 cursor-pointer ${
                  isCurrent
                    ? 'bg-gradient-to-r from-[#FF385C] to-[#8B5CF6] text-white font-bold shadow-md'
                    : 'bg-white/5 hover:bg-white/10 text-gray-300 border border-white/5'
                }`}
              >
                {cand.pfp && (
                  <img
                    src={cand.pfp}
                    alt={cand.title}
                    referrerPolicy="no-referrer"
                    className="w-5 h-5 rounded-full object-cover"
                  />
                )}
                <span>{cand.title}</span>
                {cand.handle && <span className="text-[10px] opacity-75">({cand.handle})</span>}
              </button>
            );
          })}
        </div>
      )}

      {/* Selected Channel Real Dashboard */}
      {!isLoading && selectedChannel && (
        <div className="space-y-6">
          {/* Channel Identity Card with Real Banner */}
          <div className="glass-panel rounded-3xl overflow-hidden border border-white/10">
            {selectedChannel.banner && (
              <div className="h-28 sm:h-40 w-full relative overflow-hidden bg-[#0c121e]">
                <img
                  src={selectedChannel.banner}
                  alt={selectedChannel.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080b11] via-transparent to-transparent"></div>
              </div>
            )}

            <div className="p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-4 sm:gap-6">
                <img
                  src={selectedChannel.avatar}
                  alt={selectedChannel.name}
                  referrerPolicy="no-referrer"
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-[#FF385C] shadow-2xl bg-[#0c121e]"
                />
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-2xl sm:text-3xl font-black text-white">{selectedChannel.name}</h2>
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-bold text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                      JONLI (LIVE)
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm font-medium mt-0.5">
                    {selectedChannel.handle} • ID: <span className="font-mono text-xs text-gray-500">{selectedChannel.id}</span>
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2.5">
                    <span className="text-xs px-2.5 py-1 rounded-lg bg-white/5 text-gray-300 border border-white/10">
                      📹 Jami: <strong className="text-white">{selectedChannel.videoCount}</strong> ta video
                    </span>
                    <span className="text-xs px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/20">
                      👁️ Oʻrtacha 1 video: <strong className="text-white">{selectedChannel.avgViewPerVideo}</strong> koʻrish
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <button
                  onClick={() => setIsLiveUpdating(!isLiveUpdating)}
                  className={`px-3.5 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    isLiveUpdating
                      ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                      : 'bg-white/5 border-white/10 text-gray-400'
                  }`}
                >
                  {isLiveUpdating ? '🔴 Live: Yoqilgan' : '⏸ Live: Toʻxtatilgan'}
                </button>
                <a
                  href={`https://www.youtube.com/channel/${selectedChannel.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-[#FF385C] hover:brightness-110 text-xs font-bold text-white transition-all shadow-lg shadow-red-600/20"
                >
                  <span>YouTube Kanalga Oʻtish</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* 4 Main Real Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-panel p-5 rounded-2xl space-y-2 border-l-4 border-l-[#FF385C]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-400">Aniq Obunachilar (Live)</span>
                <Users className="w-4 h-4 text-[#FF385C]" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
                {selectedChannel.subscribers}
              </div>
              <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> Har 5 soniyada yangilanadi
              </p>
            </div>

            <div className="glass-panel p-5 rounded-2xl space-y-2 border-l-4 border-l-[#8B5CF6]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-400">Jami Koʻrishlar (Prasmotr)</span>
                <Eye className="w-4 h-4 text-[#8B5CF6]" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
                {selectedChannel.totalViews}
              </div>
              <p className="text-[11px] text-gray-400">
                Taxminiy oylik: <strong className="text-gray-200">{selectedChannel.monthlyViews}</strong> koʻrish
              </p>
            </div>

            <div className="glass-panel p-5 rounded-2xl space-y-2 border-l-4 border-l-emerald-500">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-400">Auditoriya Faolligi (ER)</span>
                <Award className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                {selectedChannel.engagementRate}
              </div>
              <p className="text-[11px] text-emerald-400">
                Real layk va izohlar nisbati
              </p>
            </div>

            <div className="glass-panel p-5 rounded-2xl space-y-2 border-l-4 border-l-[#00F0FF]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-400">Kanal SEO & Aktivlik</span>
                <Sparkles className="w-4 h-4 text-[#00F0FF]" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                {selectedChannel.seoScore} / 100
              </div>
              <p className="text-[11px] text-[#00F0FF]">
                {selectedChannel.videoCount} ta yuklangan video asosida
              </p>
            </div>
          </div>

          {/* Real Revenue Calculator Widget */}
          <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    Haqiqiy Koʻrishlar Asosida Daromad Kalkulyatori
                  </h3>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Kanalning real koʻrishlar soni ({selectedChannel.totalViews}) va oylik oqim ({selectedChannel.monthlyViews}) asosida hisoblangan:
                </p>
              </div>

              <div className="flex flex-wrap gap-6 md:text-right">
                <div>
                  <span className="text-xs text-gray-400 block">Oylik taxminiy daromad:</span>
                  <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
                    ~${calculateCustomRevenue()} / oy
                  </span>
                  <span className="text-[11px] text-gray-500 block">
                    (Oraliq: ${selectedChannel.monthlyRevenueMin.toLocaleString()} — ${selectedChannel.monthlyRevenueMax.toLocaleString()})
                  </span>
                </div>

                <div className="border-l border-white/10 pl-6">
                  <span className="text-xs text-gray-400 block">Jami (Umumiy) ishlagan daromadi:</span>
                  <span className="text-2xl sm:text-3xl font-black text-[#00F0FF] font-mono">
                    ~${calculateTotalLifetimeRevenue()}
                  </span>
                  <span className="text-[11px] text-gray-500 block">
                    Kanal ochilganidan beri ({selectedChannel.totalViews} prasmotr)
                  </span>
                </div>
              </div>
            </div>

            {/* CPM Interactive Slider */}
            <div className="bg-[#080b11]/80 p-5 rounded-2xl border border-white/5 space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-gray-300 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-[#FF385C]" />
                  CPM Stavkasini Sozlash (Har 1,000 ta koʻrish uchun YouTube toʻlovi):
                </span>
                <span className="text-white px-2.5 py-1 rounded-lg bg-[#FF385C]/20 border border-[#FF385C]/40 font-mono">
                  ${cpm.toFixed(2)} CPM
                </span>
              </div>
              <input
                type="range"
                min="0.4"
                max="8.0"
                step="0.1"
                value={cpm}
                onChange={(e) => setCpm(parseFloat(e.target.value))}
                className="w-full accent-[#FF385C] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-500">
                <span>$0.50 (Oʻzbekiston koʻngilochar)</span>
                <span>$1.80 (Oʻzbekiston taʼlim/biznes)</span>
                <span>$4.00 (Rossiya / Yevropa)</span>
                <span>$8.00 (AQSH / Global)</span>
              </div>
            </div>
          </div>

          {/* Real Videos & Real Keywords Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 8 cols: Real Videos from the Channel */}
            <div className="lg:col-span-8 glass-panel p-6 rounded-3xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Video className="w-5 h-5 text-[#FF385C]" />
                  <h4 className="font-bold text-white text-base">
                    {selectedChannel.name} — Haqiqiy Videolari va Statistikasi
                  </h4>
                </div>
                <span className="text-xs text-gray-400">Ochiq YouTube maʼlumoti</span>
              </div>

              {selectedChannel.recentVideos.length === 0 ? (
                <p className="text-xs text-gray-400 py-6 text-center">
                  Videolar roʻyxati topilmadi.
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedChannel.recentVideos.map((video) => (
                    <div
                      key={video.id}
                      className="bg-[#080b11]/80 rounded-2xl overflow-hidden border border-white/10 hover:border-[#FF385C]/40 transition-all flex flex-col justify-between group"
                    >
                      <div>
                        <div className="relative aspect-video overflow-hidden bg-black">
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-black/80 text-[10px] font-mono text-emerald-400 border border-white/10">
                            ER: {video.engagement}
                          </div>
                        </div>

                        <div className="p-3.5 space-y-2">
                          <a
                            href={video.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs font-bold text-white line-clamp-2 hover:text-[#FF385C] transition-colors"
                          >
                            {video.title}
                          </a>

                          <div className="flex flex-wrap items-center gap-3 text-[11px] text-gray-400">
                            <span className="flex items-center gap-1 text-white font-semibold">
                              <Eye className="w-3.5 h-3.5 text-[#00F0FF]" />
                              {video.views}
                            </span>
                            <span className="flex items-center gap-1">
                              <ThumbsUp className="w-3 h-3 text-emerald-400" />
                              {video.likes}
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageCircle className="w-3 h-3 text-purple-400" />
                              {video.comments}
                            </span>
                            <span className="text-gray-500 ml-auto">{video.date}</span>
                          </div>
                        </div>
                      </div>

                      <div className="px-3.5 pb-3.5 pt-1 flex items-center gap-2">
                        {onAnalyzeThumbnail && (
                          <button
                            onClick={() => onAnalyzeThumbnail(video)}
                            className="flex-1 py-2 px-3 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30 text-[11px] font-bold text-purple-200 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                          >
                            <ImageIcon className="w-3.5 h-3.5 text-[#8B5CF6]" />
                            <span>Abloshkani AI Tahlil Qilish</span>
                          </button>
                        )}
                        <a
                          href={video.url}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition-all"
                          title="YouTube da ko'rish"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right 4 cols: Real Extracted Keywords & Channel Summary */}
            <div className="lg:col-span-4 space-y-6">
              <div className="glass-panel p-6 rounded-3xl space-y-4">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-[#FF385C]" />
                  <h4 className="font-bold text-white text-sm">
                    Videolardan Olingan Haqiqiy Teglar & Mavzular
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedChannel.topTags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200 flex items-center gap-1.5"
                    >
                      <span>#{tag}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="glass-panel p-6 rounded-3xl space-y-3 border-l-4 border-l-emerald-500">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>AI Kanal Xulosasi</span>
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed">
                  <strong>{selectedChannel.name}</strong> kanali hozirda{' '}
                  <strong>{selectedChannel.subscribers}</strong> obunachiga va jami{' '}
                  <strong>{selectedChannel.totalViews}</strong> koʻrishga ega. Har bir yuklangan videoga oʻrtacha{' '}
                  <strong>{selectedChannel.avgViewPerVideo}</strong> ta koʻrish toʻgʻri kelmoqda.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
