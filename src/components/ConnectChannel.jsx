import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, Lock, Sparkles, Key, Zap, ArrowRight } from 'lucide-react';
import YoutubeIcon from './icons/YoutubeIcon';

export default function ConnectChannel() {
  const [isConnected, setIsConnected] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleConnectGoogle = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsConnected(true);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto">
      {/* Header */}
      <div className="glass-panel-glow rounded-3xl p-6 sm:p-10 border border-white/10 text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-semibold text-red-300">
          <YoutubeIcon className="w-4 h-4 text-red-500 fill-red-500" />
          <span>Rasmiy Google & YouTube Data API v3</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white">
          O'z YouTube Kanalingizni Bog'lang
        </h2>
        <p className="text-sm text-gray-400 max-w-xl mx-auto">
          Kanalingizni bog'lash orqali real vaqtda auditingizni o'tkazing, yangi yuklangan videolarga avtomatik maslahatlar oling va kelgan izohlarga bir zumda javob bering.
        </p>
      </div>

      {/* Main Connection Box */}
      <div className="glass-panel rounded-3xl p-6 sm:p-10 space-y-6">
        {isConnected ? (
          <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Kanalingiz Muvaffaqiyatli Bog'landi!</h3>
              <p className="text-xs text-gray-400 mt-1">
                Kanal: <strong className="text-emerald-400">Najot Ta'lim Official</strong> • Status: <span className="text-emerald-400 font-bold">Faol Avtopilot</span>
              </p>
            </div>
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => setIsConnected(false)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-400 hover:text-white transition-colors"
              >
                Bog'lanishni Uzish
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Quick 1-click Google OAuth Button */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-red-950/40 to-purple-950/40 border border-red-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-red-600 flex items-center justify-center shadow-lg shadow-red-600/30 shrink-0">
                  <YoutubeIcon className="w-7 h-7 text-white fill-white" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">Google Hisobi Orqali Kirish (Tavsiya etiladi)</h4>
                  <p className="text-xs text-gray-400">1-klikda rasmiy ruxsat berish va kanal boshqaruvini yoqish</p>
                </div>
              </div>

              <button
                onClick={handleConnectGoogle}
                disabled={isLoading}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-[#FF385C] hover:brightness-110 active:scale-95 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-red-500/25 transition-all shrink-0 cursor-pointer"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Google Bilan Bog'lash</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            {/* Privacy & Security highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/5">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <h5 className="text-xs font-bold text-white">100% Xavfsiz</h5>
                  <p className="text-[11px] text-gray-400">Parolingiz hech qayerda saqlanmaydi, faqat rasmiy Google OAuth orqali ulanadi.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Lock className="w-5 h-5 text-[#8B5CF6] shrink-0" />
                <div>
                  <h5 className="text-xs font-bold text-white">Maxfiylik Kafolati</h5>
                  <p className="text-[11px] text-gray-400">Kanal ma'lumotlaringiz begonalarga oshkor qilinmaydi va sotilmaydi.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-[#00F0FF] shrink-0" />
                <div>
                  <h5 className="text-xs font-bold text-white">Istalgan Payt Uzish</h5>
                  <p className="text-[11px] text-gray-400">Bir tugma bilan ulanishni butunlay to'xtatishingiz mumkin.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
