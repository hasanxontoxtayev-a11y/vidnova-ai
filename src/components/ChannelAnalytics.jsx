import React, { useState } from 'react';
import { 
  Search, TrendingUp, DollarSign, Eye, Users, Video, 
  Tag, Award, Sparkles, ExternalLink, Sliders, ArrowUpRight, CheckCircle2 
} from 'lucide-react';
import { POPULAR_CHANNELS } from '../data/mockData';

export default function ChannelAnalytics({ onAnalyzeThumbnail }) {
  const [query, setQuery] = useState('@najottalim');
  const [selectedChannel, setSelectedChannel] = useState(POPULAR_CHANNELS['@najottalim']);
  const [cpm, setCpm] = useState(1.8); // $1.8 CPM default for regional/CIS
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (e) => {
    e?.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setTimeout(() => {
      const normalized = query.toLowerCase().trim();
      const matchKey = Object.keys(POPULAR_CHANNELS).find(k => 
        k.toLowerCase().includes(normalized) || 
        POPULAR_CHANNELS[k].name.toLowerCase().includes(normalized)
      );

      if (matchKey) {
        setSelectedChannel(POPULAR_CHANNELS[matchKey]);
      } else {
        // Generate dynamic realistic stats for any custom channel!
        const randomSubs = Math.floor(Math.random() * 800000) + 15000;
        const randomViews = randomSubs * (Math.floor(Math.random() * 40) + 15);
        const monthlyViews = Math.floor(randomViews * 0.08);

        setSelectedChannel({
          name: query.replace('@', '').replace('https://youtube.com/', '').toUpperCase() || "Kanal Tahlili",
          handle: query.startsWith('@') ? query : `@${query}`,
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
          subscribers: (randomSubs).toLocaleString(),
          subscribersCount: randomSubs,
          totalViews: (randomViews).toLocaleString(),
          viewsCount: randomViews,
          videoCount: Math.floor(Math.random() * 250) + 40,
          monthlyViews: (monthlyViews).toLocaleString(),
          monthlyViewsCount: monthlyViews,
          niche: "Media & Kontent",
          country: "O'zbekiston / Global",
          monthlyRevenueMin: Math.floor((monthlyViews / 1000) * 0.8),
          monthlyRevenueMax: Math.floor((monthlyViews / 1000) * 2.5),
          growthRate: `+${(Math.random() * 12 + 2).toFixed(1)}%`,
          avgViewPerVideo: Math.floor(monthlyViews / 12).toLocaleString(),
          engagementRate: `${(Math.random() * 4 + 4).toFixed(1)}%`,
          seoScore: Math.floor(Math.random() * 20) + 80,
          topTags: ["YouTube", "Trend", "Video", "AI Tahlil", "Vlog", "Bloger"],
          recentVideos: [
            {
              title: `${query} yangi video tahlili`,
              views: Math.floor(monthlyViews * 0.25).toLocaleString(),
              date: "2 kun oldin",
              thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=80",
              ctr: "10.4%",
              duration: "14:20"
            }
          ]
        });
      }
      setIsLoading(false);
    }, 400);
  };

  const calculateCustomRevenue = () => {
    const monthlyViews = selectedChannel.monthlyViewsCount || 1000000;
    const est = (monthlyViews / 1000) * cpm;
    return Math.round(est).toLocaleString();
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Search Header Banner */}
      <div className="relative rounded-3xl overflow-hidden glass-panel-glow p-6 sm:p-10 border border-white/10">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF385C]/10 via-[#8B5CF6]/10 to-[#00F0FF]/10 pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-gray-300">
            <Sparkles className="w-4 h-4 text-[#FF385C] animate-pulse" />
            <span>VidIQ Pro darajasidagi 100% bepul tahlilchi</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Istalgan YouTube Kanalni <br className="hidden sm:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF385C] via-[#c084fc] to-[#00F0FF]">
              1-Klikda Tahlil Qiling
            </span>
          </h1>

          <p className="text-sm sm:text-base text-gray-400 max-w-xl mx-auto">
            Oylik daromad, obunachilar dinamikasi, abloshka sifati va auditoriya faolligini hech qanday cheklovlarsiz koʻring.
          </p>

          {/* Search Box */}
          <form onSubmit={handleSearch} className="pt-2 flex flex-col sm:flex-row gap-2 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Masalan: @najottalim, @subyektiv, @mrbeast yoki havola..."
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
                  <span>Tahlil Qilish</span>
                </>
              )}
            </button>
          </form>

          {/* Quick preset chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <span className="text-xs text-gray-500 font-medium">Ommabop namunalar:</span>
            {Object.keys(POPULAR_CHANNELS).map((handle) => (
              <button
                key={handle}
                onClick={() => {
                  setQuery(handle);
                  setSelectedChannel(POPULAR_CHANNELS[handle]);
                }}
                className={`text-xs px-3 py-1 rounded-xl transition-all ${
                  selectedChannel?.handle === handle
                    ? 'bg-[#FF385C]/20 border border-[#FF385C] text-white font-semibold'
                    : 'bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {POPULAR_CHANNELS[handle].name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Channel Dashboard */}
      {selectedChannel && (
        <div className="space-y-6">
          {/* Channel Identity Card */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4 sm:gap-6">
              <img
                src={selectedChannel.avatar}
                alt={selectedChannel.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-[#FF385C]/40 shadow-xl"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl sm:text-3xl font-black text-white">{selectedChannel.name}</h2>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </div>
                <p className="text-gray-400 text-sm font-medium">{selectedChannel.handle}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="text-xs px-2.5 py-1 rounded-lg bg-white/5 text-gray-300 border border-white/10">
                    📍 {selectedChannel.country}
                  </span>
                  <span className="text-xs px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/20">
                    🎯 {selectedChannel.niche}
                  </span>
                  <span className="text-xs px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                    🚀 {selectedChannel.growthRate} oylik o'sish
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <a
                href={`https://youtube.com/${selectedChannel.handle}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white transition-all"
              >
                <span>YouTube da ochish</span>
                <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
              </a>
            </div>
          </div>

          {/* Metric Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-panel p-5 rounded-2xl space-y-2 border-l-4 border-l-[#FF385C]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-400">Jami Obunachilar</span>
                <Users className="w-4 h-4 text-[#FF385C]" />
              </div>
              <div className="text-2xl font-black text-white">{selectedChannel.subscribers}</div>
              <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> {selectedChannel.growthRate} oylik dinamika
              </p>
            </div>

            <div className="glass-panel p-5 rounded-2xl space-y-2 border-l-4 border-l-[#8B5CF6]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-400">Oylik Ko'rishlar</span>
                <Eye className="w-4 h-4 text-[#8B5CF6]" />
              </div>
              <div className="text-2xl font-black text-white">{selectedChannel.monthlyViews}</div>
              <p className="text-[11px] text-gray-400">
                Jami: {selectedChannel.totalViews} ko'rish
              </p>
            </div>

            <div className="glass-panel p-5 rounded-2xl space-y-2 border-l-4 border-l-emerald-500">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-400">Auditoriya Faolligi</span>
                <Award className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-black text-white">{selectedChannel.engagementRate}</div>
              <p className="text-[11px] text-emerald-400">Yuqori faollik (Layk & Izohlar)</p>
            </div>

            <div className="glass-panel p-5 rounded-2xl space-y-2 border-l-4 border-l-[#00F0FF]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-400">SEO & Optimallashuv</span>
                <Sparkles className="w-4 h-4 text-[#00F0FF]" />
              </div>
              <div className="text-2xl font-black text-white">{selectedChannel.seoScore} / 100</div>
              <p className="text-[11px] text-[#00F0FF]">Teglar va tavsif a'lo darajada</p>
            </div>
          </div>

          {/* Revenue Calculator Widget */}
          <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    Oylik Taxminiy Daromad Kalkulyatori
                  </h3>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  YouTube AdSense qoidalariga koʻra oylik koʻrishlar soni va mintaqaviy CPM asosida hisoblangan
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs text-gray-400 block">Kutilayotgan oylik daromad:</span>
                <span className="text-2xl sm:text-3xl font-black text-emerald-400 tracking-tight">
                  ~${calculateCustomRevenue()} / oy
                </span>
                <span className="text-[11px] text-gray-500 block">
                  (Minimal: ${selectedChannel.monthlyRevenueMin.toLocaleString()} — Maksimal: ${selectedChannel.monthlyRevenueMax.toLocaleString()})
                </span>
              </div>
            </div>

            {/* CPM Interactive Slider */}
            <div className="bg-[#080b11]/80 p-5 rounded-2xl border border-white/5 space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-gray-300 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-[#FF385C]" />
                  CPM Stavkasini Sozlash (Har 1,000 ta ko'rish uchun daromad):
                </span>
                <span className="text-white px-2 py-0.5 rounded bg-white/10 font-mono">
                  ${cpm.toFixed(2)} CPM
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="8.0"
                step="0.1"
                value={cpm}
                onChange={(e) => setCpm(parseFloat(e.target.value))}
                className="w-full accent-[#FF385C] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-500">
                <span>$0.50 (O'zbekiston / MDH pastki)</span>
                <span>$1.80 (O'rtacha o'zbek bozori)</span>
                <span>$4.50 (Yevropa/Rossiya)</span>
                <span>$8.00+ (AQSH / Kripto / IT)</span>
              </div>
            </div>
          </div>

          {/* Top Tags & Keywords */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-panel p-6 rounded-3xl space-y-4">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-[#FF385C]" />
                <h4 className="font-bold text-white text-sm">Kanalning Eng Ommabop Teglari</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedChannel.topTags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-gray-300 flex items-center gap-1 transition-colors"
                  >
                    <span>#{tag}</span>
                    <span className="text-[10px] text-emerald-400 font-mono font-bold">
                      {95 - i * 3}%
                    </span>
                  </span>
                ))}
              </div>
            </div>

            {/* Video List with CTR analysis trigger */}
            <div className="glass-panel p-6 rounded-3xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Video className="w-4 h-4 text-[#8B5CF6]" />
                  <h4 className="font-bold text-white text-sm">So'nggi Videolar & CTR</h4>
                </div>
                <span className="text-[11px] text-gray-400">Kliklash ehtimoli</span>
              </div>

              <div className="space-y-3">
                {selectedChannel.recentVideos.map((video, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-all group"
                  >
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-20 h-12 rounded-lg object-cover border border-white/10"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-white truncate group-hover:text-[#FF385C] transition-colors">
                        {video.title}
                      </p>
                      <div className="flex items-center gap-3 text-[11px] text-gray-400 mt-0.5">
                        <span>{video.views} ko'rish</span>
                        <span>•</span>
                        <span>{video.date}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-emerald-400 block font-mono">
                        {video.ctr}
                      </span>
                      <span className="text-[9px] text-gray-500 uppercase">CTR</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
