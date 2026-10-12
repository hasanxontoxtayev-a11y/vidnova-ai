import React from 'react';
import { Sparkles, Flame, Image, Clock, MessageSquare, Zap, ShieldCheck } from 'lucide-react';
import YoutubeIcon from './icons/YoutubeIcon';

export default function Navbar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'analytics', label: 'Kanal Tahlili', icon: Flame },
    { id: 'thumbnail', label: 'AI Abloshka', icon: Image },
    { id: 'timing', label: 'Optimal Vaqt', icon: Clock },
    { id: 'comments', label: 'AI Izoh Agenti', icon: MessageSquare },
    { id: 'connect', label: 'Kanalni Bog\'lash', icon: YoutubeIcon },
  ];

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-white/10 px-4 lg:px-8 py-3 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div 
          onClick={() => setActiveTab('analytics')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative w-10 h-10 rounded-xl overflow-hidden p-[2px] bg-gradient-to-tr from-[#FF385C] via-[#8B5CF6] to-[#00F0FF] shadow-lg shadow-[#FF385C]/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#080b11] rounded-[10px] flex items-center justify-center">
              <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF385C] to-[#00F0FF] text-xl tracking-tighter">
                VN
              </span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#FF385C] transition-all">
                VidNova<span className="text-[#FF385C]">.AI</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                100% Bepul
              </span>
            </div>
            <p className="text-[11px] text-gray-400 hidden sm:block">YouTube Uchun Aqlli AI Agent</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-[#0c121e]/80 p-1 rounded-xl border border-white/5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#FF385C] to-[#8B5CF6] text-white shadow-md shadow-[#FF385C]/25'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-2.5">
          <button 
            onClick={() => setActiveTab('connect')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-red-600 to-[#FF385C] hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-red-500/20"
          >
            <YoutubeIcon className="w-4 h-4 fill-white" />
            <span className="hidden sm:inline">Kanalni Ulash</span>
            <span className="sm:hidden">Ulash</span>
          </button>
        </div>
      </div>

      {/* Mobile nav scrollbar */}
      <div className="flex md:hidden overflow-x-auto gap-2 pt-3 pb-1 -mx-2 px-2 no-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 ${
                isActive
                  ? 'bg-[#FF385C] text-white font-semibold'
                  : 'bg-white/5 text-gray-300'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}
