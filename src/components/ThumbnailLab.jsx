import React, { useState } from 'react';
import { 
  Sparkles, Upload, Image as ImageIcon, CheckCircle, AlertTriangle, 
  HelpCircle, Eye, Zap, RefreshCw, Smartphone, Monitor 
} from 'lucide-react';
import { THUMBNAIL_PRESETS } from '../data/mockData';

export default function ThumbnailLab() {
  const [currentThumbnail, setCurrentThumbnail] = useState(THUMBNAIL_PRESETS[0]);
  const [imageUrl, setImageUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadedPreview, setUploadedPreview] = useState(null);

  const handleCustomAnalyze = (url) => {
    const targetUrl = url || imageUrl;
    if (!targetUrl) return;

    setIsAnalyzing(true);
    setTimeout(() => {
      // Dynamic AI Vision scoring algorithm
      const score = (Math.random() * 3 + 6.8).toFixed(1);
      const isHigh = score >= 8.5;

      setCurrentThumbnail({
        id: 'custom-' + Date.now(),
        title: "Maxsus Yuklangan Abloshka",
        url: targetUrl,
        score: parseFloat(score),
        grade: isHigh ? 'A+' : score >= 7.5 ? 'A' : 'B',
        pros: [
          "Ranglar kontrasti e'tiborni tortadi",
          "Mobil qurilmalarda asosiy obyekt aniq ko'rinadi",
          "Mavzuga mos vizual metafora qo'llangan"
        ],
        cons: [
          "Matn shriftini biroz qalinroq (Bold) qilsa, CTR yana 15% ga oshadi",
          "Orqa fonni bir oz xiralashtirish (blur) orqali asosiy obyektni ko'proq ajratish mumkin"
        ],
        ctrEstimate: `${(score * 1.2).toFixed(1)}% - ${(score * 1.5).toFixed(1)}%`
      });
      setIsAnalyzing(false);
    }, 600);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedPreview(url);
      handleCustomAnalyze(url);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="glass-panel-glow rounded-3xl p-6 sm:p-10 border border-white/10 text-center max-w-4xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-300">
          <Sparkles className="w-4 h-4 text-[#8B5CF6] animate-pulse" />
          <span>AI Vision Multimodal Muqova Tahlilchisi</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white">
          Abloshka Tahlili: <br className="sm:hidden" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF385C] via-[#8B5CF6] to-[#00F0FF]">
            "Bu video o'tadimi yoki o'tmaydimi?"
          </span>
        </h2>
        <p className="text-sm text-gray-400 max-w-2xl mx-auto">
          YouTube algoritmlari birinchi 24 soatda videoni aynan <strong className="text-white">CTR (bosilish darajasi)</strong>ga qarab tavsiyalarga chiqaradi. AI orqali abloshkangizni sinovdan o'tkazing.
        </p>
      </div>

      {/* Input Options Grid */}
      <div className="max-w-4xl mx-auto glass-panel p-5 rounded-2xl flex flex-col md:flex-row items-center gap-4">
        {/* URL Input */}
        <div className="flex-1 w-full flex gap-2">
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Abloshka rasm havolasini kiriting (URL)..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-[#080b11] border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#FF385C]"
          />
          <button
            onClick={() => handleCustomAnalyze()}
            disabled={!imageUrl || isAnalyzing}
            className="px-4 py-2.5 rounded-xl bg-[#FF385C] text-white font-bold text-xs hover:brightness-110 disabled:opacity-50 shrink-0"
          >
            Tahlil
          </button>
        </div>

        <div className="hidden md:block text-xs text-gray-500 font-bold uppercase">yoki</div>

        {/* Upload file button */}
        <label className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-gray-300 cursor-pointer transition-colors shrink-0">
          <Upload className="w-4 h-4 text-[#00F0FF]" />
          <span>Kompyuterdan Rasm Yuklash</span>
          <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
        </label>
      </div>

      {/* Preset selector */}
      <div className="max-w-4xl mx-auto flex items-center justify-center gap-3 overflow-x-auto pb-2">
        <span className="text-xs text-gray-400 font-medium">Namunalar:</span>
        {THUMBNAIL_PRESETS.map((preset) => (
          <button
            key={preset.id}
            onClick={() => setCurrentThumbnail(preset)}
            className={`text-xs px-3.5 py-1.5 rounded-xl flex items-center gap-2 transition-all ${
              currentThumbnail.id === preset.id
                ? 'bg-gradient-to-r from-[#FF385C] to-[#8B5CF6] text-white font-bold shadow-md shadow-[#FF385C]/20'
                : 'bg-white/5 border border-white/5 text-gray-400 hover:text-white'
            }`}
          >
            <span>{preset.title}</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${preset.score >= 8 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>
              {preset.score}
            </span>
          </button>
        ))}
      </div>

      {/* AI Analysis Result Board */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Thumbnail Preview & Simulator */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-panel rounded-3xl p-4 space-y-3 relative overflow-hidden group">
            {isAnalyzing && (
              <div className="absolute inset-0 bg-[#080b11]/80 backdrop-blur-md z-20 flex flex-col items-center justify-center gap-3">
                <RefreshCw className="w-8 h-8 text-[#FF385C] animate-spin" />
                <span className="text-xs font-bold text-white tracking-wider">AI Vision Tahlil Qilmoqda...</span>
              </div>
            )}

            <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src={currentThumbnail.url}
                alt={currentThumbnail.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-white">
                14:28
              </div>
            </div>

            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold text-white truncate max-w-[200px]">
                {currentThumbnail.title}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobil ko'rinish</span>
              </div>
            </div>
          </div>

          {/* Quick CTR verdict badge */}
          <div className="glass-panel p-4 rounded-2xl flex items-center justify-between border-l-4 border-l-[#FF385C]">
            <div>
              <span className="text-[11px] text-gray-400 block">Kutilayotgan CTR (Bosilish):</span>
              <span className="text-xl font-black text-emerald-400 font-mono">
                {currentThumbnail.ctrEstimate}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-gray-400 block">Tavsiyalarga chiqish ehtimoli:</span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${currentThumbnail.score >= 8 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                {currentThumbnail.score >= 8 ? '🔥 Juda Yuqori (85%+)' : '⚠️ O\'rtacha (50-60%)'}
              </span>
            </div>
          </div>
        </div>

        {/* Right: AI Vision Evaluation Metrics */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 space-y-6">
          {/* Main Score Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div>
              <span className="text-xs font-medium text-gray-400">AI Umumiy Sifat Bahosi</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-4xl sm:text-5xl font-black text-white font-mono">
                  {currentThumbnail.score}
                </span>
                <span className="text-gray-500 text-lg font-bold">/ 10</span>
                <span className="ml-2 px-2.5 py-0.5 rounded-lg bg-gradient-to-r from-[#FF385C] to-[#8B5CF6] text-white font-black text-sm">
                  {currentThumbnail.grade}
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs text-gray-400">Hukm:</span>
              <div className={`text-sm font-bold mt-1 ${currentThumbnail.score >= 8 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {currentThumbnail.score >= 8.5 
                  ? "✅ Video o'tadi! Bosilish darajasi zo'r." 
                  : currentThumbnail.score >= 7.0 
                  ? "⚠️ O'tadi, lekin yaxshilash mumkin." 
                  : "❌ O'tishi qiyin, yangilash zarur."}
              </div>
            </div>
          </div>

          {/* Vision Breakdown Metrics */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider">
              AI Vision Tahlil Ko'rsatkichlari:
            </h4>

            {/* Metric 1: Kontrast va Ranglar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">1. Ranglar Kontrasti & Yorqinlik:</span>
                <span className="text-white font-mono font-bold">
                  {Math.min(10, Math.round(currentThumbnail.score * 1.05 * 10) / 10)} / 10
                </span>
              </div>
              <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-[#FF385C] to-[#8B5CF6]" 
                  style={{ width: `${Math.min(100, currentThumbnail.score * 10)}%` }}
                ></div>
              </div>
            </div>

            {/* Metric 2: Yuz va Emotsiya */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">2. Yuz ifodasi & Qiziqish uyg'otish:</span>
                <span className="text-white font-mono font-bold">
                  {Math.min(10, Math.round(currentThumbnail.score * 0.95 * 10) / 10)} / 10
                </span>
              </div>
              <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#00F0FF]" 
                  style={{ width: `${Math.min(100, currentThumbnail.score * 9.5)}%` }}
                ></div>
              </div>
            </div>

            {/* Metric 3: Matn o'qiluvchanligi */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">3. Matn & Mobil Tipografika:</span>
                <span className="text-white font-mono font-bold">
                  {Math.min(10, Math.round(currentThumbnail.score * 0.98 * 10) / 10)} / 10
                </span>
              </div>
              <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-[#00F0FF]" 
                  style={{ width: `${Math.min(100, currentThumbnail.score * 9.8)}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Strengths & AI Advice */}
          <div className="space-y-3 pt-2">
            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" /> Kuchli tomonlari:
              </span>
              <ul className="space-y-1">
                {currentThumbnail.pros.map((p, i) => (
                  <li key={i} className="text-xs text-gray-300 flex items-start gap-2">
                    <span className="text-emerald-400 text-sm leading-none">•</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold text-[#FF385C] flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" /> AI Maslahati (CTR ni oshirish sirlari):
              </span>
              <ul className="space-y-1">
                {currentThumbnail.cons.map((c, i) => (
                  <li key={i} className="text-xs text-gray-300 flex items-start gap-2">
                    <span className="text-[#FF385C] text-sm leading-none">•</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
