import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ChannelAnalytics from './components/ChannelAnalytics';
import ThumbnailLab from './components/ThumbnailLab';
import BestTimePlanner from './components/BestTimePlanner';
import CommentAgent from './components/CommentAgent';
import ConnectChannel from './components/ConnectChannel';
import MobileAgentMode from './components/MobileAgentMode';
import { 
  Sparkles, Flame, Image, Clock, MessageSquare, Shield, 
  CheckCircle, Smartphone, Download, ExternalLink, X, Bot, Play 
} from 'lucide-react';
import YoutubeIcon from './components/icons/YoutubeIcon';

export default function App() {
  const [activeTab, setActiveTab] = useState('analytics');
  const [viewMode, setViewMode] = useState('dashboard'); // 'dashboard' | 'mobile-agent'
  const [showInstallModal, setShowInstallModal] = useState(false);

  return (
    <div className="min-h-screen bg-[#080b11] text-gray-100 flex flex-col selection:bg-[#FF385C] selection:text-white">
      {/* Top ambient glowing mesh lights */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-[#FF385C]/15 rounded-full blur-[140px] pointer-events-none -z-10"></div>
      <div className="fixed top-20 right-1/4 w-96 h-96 bg-[#8B5CF6]/15 rounded-full blur-[140px] pointer-events-none -z-10"></div>
      <div className="fixed bottom-0 left-1/3 w-96 h-96 bg-[#00F0FF]/10 rounded-full blur-[140px] pointer-events-none -z-10"></div>

      {/* Top Mobile Mode & App Store Announcement Bar */}
      <div className="bg-gradient-to-r from-[#FF385C]/20 via-[#8B5CF6]/20 to-[#00F0FF]/20 border-b border-white/10 px-4 py-2 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-gray-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>
              <strong>Yangi:</strong> Telefonda faqat <strong className="text-white">AI Agent (Copilot)</strong> sifatida ishlaydi!
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setViewMode(viewMode === 'dashboard' ? 'mobile-agent' : 'dashboard')}
              className="px-3 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-[11px] flex items-center gap-1.5 transition-all"
            >
              <Smartphone className="w-3.5 h-3.5 text-[#00F0FF]" />
              <span>{viewMode === 'dashboard' ? "Mobil Agent Rejimini Ko'rish" : "To'liq Dashboardga Qaytish"}</span>
            </button>

            <button
              onClick={() => setShowInstallModal(true)}
              className="px-3 py-1 rounded-xl bg-gradient-to-r from-[#FF385C] to-[#8B5CF6] text-white font-bold text-[11px] flex items-center gap-1.5 shadow-md shadow-[#FF385C]/20 hover:brightness-110 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Telefonga O'rnatish</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={(tab) => { setActiveTab(tab); setViewMode('dashboard'); }} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
        {viewMode === 'mobile-agent' ? (
          /* Mobile AI Agent Pure Mode */
          <div className="space-y-4">
            <div className="max-w-md mx-auto text-center space-y-1">
              <span className="text-xs text-gray-400">Telefon ekrani uchun moslashtirilgan rejim:</span>
              <p className="text-sm font-bold text-[#FF385C]">Faqat AI Agent & Copilot vazifasini bajaradi</p>
            </div>
            <MobileAgentMode onSwitchToDashboard={() => setViewMode('dashboard')} />
          </div>
        ) : (
          /* Desktop / Full Dashboard Mode */
          <>
            {activeTab === 'analytics' && <ChannelAnalytics />}
            {activeTab === 'thumbnail' && <ThumbnailLab />}
            {activeTab === 'timing' && <BestTimePlanner />}
            {activeTab === 'comments' && <CommentAgent />}
            {activeTab === 'connect' && <ConnectChannel />}

            {/* Feature Highlights Grid at Bottom */}
            <section className="pt-12 border-t border-white/5 space-y-6">
              <div className="text-center space-y-2">
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Nima Uchun Aynan <span className="text-[#FF385C]">VidNova AI</span>?
                </h3>
                <p className="text-xs sm:text-sm text-gray-400">
                  Oddiy statistika saytlaridan farqli ravishda, VidNova sizning o'rningizga ishlovchi to'liq AI agentdir.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div 
                  onClick={() => setActiveTab('analytics')}
                  className="glass-panel p-5 rounded-2xl cursor-pointer hover:border-[#FF385C]/30 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#FF385C]/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Flame className="w-5 h-5 text-[#FF385C]" />
                  </div>
                  <h4 className="text-sm font-bold text-white">VidIQ Analogi + Daromad</h4>
                  <p className="text-xs text-gray-400 mt-1">
                    Istalgan kanalning oylik obunachilari va taxminiy daromadini real CPM bilan hisoblang.
                  </p>
                </div>

                <div 
                  onClick={() => setActiveTab('thumbnail')}
                  className="glass-panel p-5 rounded-2xl cursor-pointer hover:border-[#8B5CF6]/30 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Image className="w-5 h-5 text-[#8B5CF6]" />
                  </div>
                  <h4 className="text-sm font-bold text-white">AI Vision Abloshka</h4>
                  <p className="text-xs text-gray-400 mt-1">
                    Muqova rasmini yuklang va AI videoning o'tish ehtimoli (CTR)ni 10 balldan baholab beradi.
                  </p>
                </div>

                <div 
                  onClick={() => setActiveTab('timing')}
                  className="glass-panel p-5 rounded-2xl cursor-pointer hover:border-[#00F0FF]/30 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#00F0FF]/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Clock className="w-5 h-5 text-[#00F0FF]" />
                  </div>
                  <h4 className="text-sm font-bold text-white">Optimal Joylash Vaqti</h4>
                  <p className="text-xs text-gray-400 mt-1">
                    Yo'nalish va auditoriya xatti-harakatlariga qarab videoni qaysi soatda qo'yishni biling.
                  </p>
                </div>

                <div 
                  onClick={() => setActiveTab('comments')}
                  className="glass-panel p-5 rounded-2xl cursor-pointer hover:border-emerald-500/30 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <MessageSquare className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h4 className="text-sm font-bold text-white">Ko'p Tilli Komment Agenti</h4>
                  <p className="text-xs text-gray-400 mt-1">
                    O'zbek, rus yoki ingliz tilidagi har qanday izohga o'sha tilda avtomatik aqlli javob.
                  </p>
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      {/* Install to Phone / Play Market Guide Modal */}
      {showInstallModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-lg w-full glass-panel-glow rounded-3xl p-6 sm:p-8 space-y-6 relative border border-white/10 animate-fadeIn">
            <button
              onClick={() => setShowInstallModal(false)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#FF385C] via-[#8B5CF6] to-[#00F0FF] p-[2px] mx-auto">
                <div className="w-full h-full bg-[#080b11] rounded-[14px] flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-[#FF385C]" />
                </div>
              </div>
              <h3 className="text-xl font-black text-white">Telefonga O'rnatish & Play Market</h3>
              <p className="text-xs text-gray-400">
                Ilovani mobil qurilmangizga to'g'ridan-to'g'ri o'rnatish va Play Market/App Store integratsiyasi
              </p>
            </div>

            <div className="space-y-4 text-xs">
              {/* Method 1: Instant PWA installation */}
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <CheckCircle className="w-4 h-4" />
                  <span>1. Play Marketga kirmasdan 1-klikda o'rnatish (PWA):</span>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  Telefonda Chrome yoki Safari brauzerida saytni oching va <strong>"Bosh ekranga qo'shish" (Add to Home Screen / Установить приложение)</strong> tugmasini bosing. Ilova telefonga xuddi Play Marketdan o'rnatilgandek alohida belgi (icon) bo'lib tushadi va to'liq <strong>Mobil AI Agent</strong> sifatida ochiladi!
                </p>
              </div>

              {/* Method 2: Google Play Console & App Store status */}
              <div className="p-4 rounded-2xl bg-[#080b11] border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-[#00F0FF] font-bold">
                  <ExternalLink className="w-4 h-4" />
                  <span>2. Google Play Store & Apple App Store rasmiy joylashtirish:</span>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  Ilovaning <strong>`manifest.json`</strong> va mobil yadrosi to'liq tayyorlangan. Rasmiy do'konga chiqarish uchun Google Play Console ($25 bir martalik) yoki Apple Developer ($99/yil) hisobi ulanadi va <strong>TWA (Trusted Web Activity)</strong> yoki <strong>Capacitor (.apk / .aab)</strong> fayli yuklanadi.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setShowInstallModal(false);
                setViewMode('mobile-agent');
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF385C] to-[#8B5CF6] text-white font-bold text-xs shadow-lg shadow-[#FF385C]/25 hover:brightness-110 transition-all cursor-pointer"
            >
              Mobil Agent Ko'rinishini Sinab Ko'rish
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#05070b] py-8 px-4 sm:px-6 lg:px-8 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-white text-base tracking-tight">
              VidNova<span className="text-[#FF385C]">.AI</span>
            </span>
            <span className="text-gray-500 text-xs">— YouTube Uchun Aqlli AI Agent</span>
          </div>

          <div className="flex items-center gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              Barcha foydalanuvchilar uchun 100% Bepul
            </span>
            <span>•</span>
            <span>PWA & Mobil Agent Faol</span>
          </div>

          <p className="text-xs text-gray-500">
            © 2026 VidNova AI. Empowering Video Creators.
          </p>
        </div>
      </footer>
    </div>
  );
}
