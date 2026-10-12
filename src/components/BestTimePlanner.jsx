import React, { useState } from 'react';
import { Clock, Calendar, Globe, Sparkles, Flame, CheckCircle, Info, Zap } from 'lucide-react';
import { NICHE_TIMING } from '../data/mockData';

export default function BestTimePlanner() {
  const [selectedNicheKey, setSelectedNicheKey] = useState('talim');
  const [timezone, setTimezone] = useState('Toshkent (GMT+5)');

  const currentNiche = NICHE_TIMING[selectedNicheKey];

  const days = ["Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba", "Yakshanba"];
  const hourSlots = [8, 10, 12, 14, 16, 18, 20, 22];

  // Helper to determine heat intensity
  const getHeatLevel = (day, hour) => {
    const isBestDay = currentNiche.bestDays.some(d => d.toLowerCase().includes(day.slice(0, 3).toLowerCase()));
    const isPeakHour = currentNiche.peakHours.includes(hour) || currentNiche.peakHours.includes(hour + 1);

    if (isBestDay && isPeakHour) return 'high'; // 🔥🔥🔥
    if (isBestDay || isPeakHour) return 'medium'; // 🔥
    return 'low';
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="glass-panel-glow rounded-3xl p-6 sm:p-10 border border-white/10 text-center max-w-4xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-300">
          <Clock className="w-4 h-4 text-[#00F0FF] animate-pulse" />
          <span>AI Algoritmik Vaqt Maslahatchisi</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white">
          Videoni Soat Nechida Qo'ygan Afzal?
        </h2>
        <p className="text-sm text-gray-400 max-w-2xl mx-auto">
          YouTube videongizni yuklagan zahoti dastlabki 2 soat ichidagi ko'rishlar uning 1 oylik taqdirini hal qiladi. Kanalingiz yo'nalishiga qarab eng faol vaqtni tanlang.
        </p>
      </div>

      {/* Selectors Bar */}
      <div className="max-w-4xl mx-auto glass-panel p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Niche Pills */}
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          {Object.keys(NICHE_TIMING).map((key) => {
            const item = NICHE_TIMING[key];
            const isActive = selectedNicheKey === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedNicheKey(key)}
                className={`text-xs px-3.5 py-2 rounded-xl font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-[#FF385C] to-[#8B5CF6] text-white shadow-md shadow-[#FF385C]/25'
                    : 'bg-white/5 border border-white/5 text-gray-400 hover:text-white'
                }`}
              >
                {item.name}
              </button>
            );
          })}
        </div>

        {/* Region / Timezone */}
        <div className="flex items-center gap-2 text-xs text-gray-400 shrink-0">
          <Globe className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold text-white">{timezone}</span>
        </div>
      </div>

      {/* Main Result Card & Heatmap */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: AI Recommendation Card */}
        <div className="lg:col-span-5 glass-panel rounded-3xl p-6 sm:p-8 space-y-6 border-l-4 border-l-[#00F0FF]">
          <div>
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">
              Tavsiya Etilgan Natija:
            </span>
            <h3 className="text-2xl font-black text-white mt-1">
              {currentNiche.name} Uchun
            </h3>
          </div>

          <div className="bg-[#080b11]/80 rounded-2xl p-5 border border-white/5 space-y-3">
            <div>
              <span className="text-[11px] text-gray-400 block">Eng Zo'r Kunlar:</span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {currentNiche.bestDays.map((d, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 font-bold border border-emerald-500/20">
                    {d}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <span className="text-[11px] text-gray-400 block">Eng Optimal Soat:</span>
              <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF385C] to-[#00F0FF] font-mono">
                {currentNiche.bestHours}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-gray-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#FF385C]" />
              AI Algoritm Asosi:
            </span>
            <p className="text-xs text-gray-400 leading-relaxed">
              {currentNiche.explanation}
            </p>
          </div>

          {/* Golden Rule Tip */}
          <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-200 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-purple-300">
              <Zap className="w-3.5 h-3.5 text-yellow-400" />
              <span>Oltin Qoida (YouTube Sir):</span>
            </div>
            <p className="text-[11px] text-gray-300">
              Videoni rejalashtirilgan vaqtdan <strong>1-2 soat oldin</strong> "Unlisted" yoki yuklangan holatda qo'ying. YouTube tizimi 1080p/4K sifatni qayta ishlashi va algoritmlar teglarni indekslashi uchun vaqt kerak bo'ladi!
            </p>
          </div>
        </div>

        {/* Right: Interactive 24h Activity Heatmap */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 space-y-5">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#8B5CF6]" />
              Haftalik Tomoshabinlar Faollik Xaritasi (Heatmap)
            </h4>
            <div className="flex items-center gap-3 text-[10px] text-gray-400">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-emerald-500"></span> Eng yuqori
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-[#8B5CF6]"></span> O'rtacha
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-white/5"></span> Tinch
              </span>
            </div>
          </div>

          {/* Grid */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-gray-500 border-b border-white/5">
                  <th className="py-2 pr-3 font-medium">Kun</th>
                  {hourSlots.map(h => (
                    <th key={h} className="py-2 px-1 text-center font-mono text-[11px]">
                      {h}:00
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {days.map((day) => (
                  <tr key={day} className="hover:bg-white/[0.02]">
                    <td className="py-2.5 pr-3 font-semibold text-gray-300 whitespace-nowrap">
                      {day}
                    </td>
                    {hourSlots.map(hour => {
                      const heat = getHeatLevel(day, hour);
                      let bgClass = "bg-white/5 text-gray-600";
                      if (heat === 'high') bgClass = "bg-gradient-to-r from-[#FF385C] to-emerald-500 text-white font-bold shadow-sm shadow-emerald-500/20";
                      else if (heat === 'medium') bgClass = "bg-[#8B5CF6]/30 text-purple-200 font-medium";

                      return (
                        <td key={hour} className="py-2 px-1 text-center">
                          <div className={`h-8 rounded-lg flex items-center justify-center text-[10px] transition-all cursor-default ${bgClass}`}>
                            {heat === 'high' ? '🔥' : heat === 'medium' ? '⚡' : ''}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-[11px] text-gray-500 text-center pt-2">
            🔥 Belgisi eng ko'p tomoshabinlar YouTube ilovasida onlayn bo'lgan soatlarni bildiradi.
          </p>
        </div>
      </div>
    </div>
  );
}
