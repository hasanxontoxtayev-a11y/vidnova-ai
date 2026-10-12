import React, { useState } from 'react';
import { 
  MessageSquare, Sparkles, Send, Copy, Check, Bot, Globe, 
  Smile, Zap, Award, CheckCircle2, Shield, RefreshCw 
} from 'lucide-react';
import { SAMPLE_COMMENTS } from '../data/mockData';

export default function CommentAgent() {
  const [commentsList, setCommentsList] = useState(SAMPLE_COMMENTS);
  const [selectedComment, setSelectedComment] = useState(SAMPLE_COMMENTS[0]);
  const [customInput, setCustomInput] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('friendly'); // 'friendly' | 'concise' | 'expert'
  const [copiedId, setCopiedId] = useState(null);
  const [sentToast, setSentToast] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [autoPilotEnabled, setAutoPilotEnabled] = useState(true);

  // Detect language and generate replies
  const handleGenerateCustom = (e) => {
    e?.preventDefault();
    if (!customInput.trim()) return;

    setIsGenerating(true);
    setTimeout(() => {
      const text = customInput.trim();
      let detectedLang = 'uz';
      let langName = "O'zbekcha";
      let flag = '🇺🇿';

      // Simple heuristic for language detection
      if (/[а-яА-ЯёЁ]/.test(text)) {
        if (/o'|g'|sh|ch|q|g|x/i.test(text)) {
          detectedLang = 'uz-cyr';
          langName = "O'zbekcha (Kirill)";
          flag = '🇺🇿';
        } else {
          detectedLang = 'ru';
          langName = "Русский";
          flag = '🇷🇺';
        }
      } else if (/\b(the|is|great|video|how|what|thanks|love|good|sub)\b/i.test(text)) {
        detectedLang = 'en';
        langName = "English";
        flag = '🇺🇸';
      } else if (/\b(merhaba|cok|guzel|tesekkur|harika)\b/i.test(text)) {
        detectedLang = 'tr';
        langName = "Türkçe";
        flag = '🇹🇷';
      }

      // Contextual replies in the same language!
      let friendlyReply = "";
      let conciseReply = "";
      let expertReply = "";

      if (detectedLang === 'ru') {
        friendlyReply = "Спасибо огромное за комментарий! Очень ценю вашу поддержку, дальше будет ещё больше крутого контента! 🚀";
        conciseReply = "Большое спасибо! Рад, что материал полезен. 👍";
        expertReply = "Благодарю за обратную связь. Мы тщательно прорабатываем темы каждого выпуска, оставайтесь на связи!";
      } else if (detectedLang === 'en') {
        friendlyReply = "Thank you so much for watching and for your awesome feedback! More exciting videos are coming soon! 🚀✨";
        conciseReply = "Thanks a lot! Appreciate the support! 🙌";
        expertReply = "Thank you for engaging. We aim to bring high quality insights with every video. Stay tuned for the next upload!";
      } else if (detectedLang === 'tr') {
        friendlyReply = "Yorumunuz için çok teşekkür ederim! Desteğiniz bizim için çok değerli, takipte kalın! 🔥";
        conciseReply = "Çok teşekkürler! Beğenmenize sevindim. 👍";
        expertReply = "Geri bildiriminiz için teşekkürler. Kaliteli içerikler üretmeye devam edeceğiz.";
      } else {
        friendlyReply = `Fikringiz uchun samimiy minnatdorchilik bildiramiz! Sizning qo'llab-quvvatlashingiz biz uchun juda muhim, yangi videolarni kutib qoling! 🚀`;
        conciseReply = `Katta rahmat! Foydali bo'lganidan xursandmiz. 👍`;
        expertReply = `Fikringiz uchun tashakkur. Kanalimizda aynan shu kabi amaliy va sifatli tahlillarni muntazam taqdim etib boramiz.`;
      }

      const newCommentObj = {
        id: Date.now(),
        author: "Sizning Tomoshabiningiz",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
        text: text,
        lang: detectedLang,
        langName: `${flag} ${langName}`,
        sentiment: "Fikr-mulohaza",
        time: "Hozirgina",
        aiReplies: {
          friendly: friendlyReply,
          concise: conciseReply,
          expert: expertReply
        }
      };

      setCommentsList([newCommentObj, ...commentsList]);
      setSelectedComment(newCommentObj);
      setCustomInput('');
      setIsGenerating(false);
    }, 400);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(text);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSendToYoutube = () => {
    setSentToast(true);
    setTimeout(() => setSentToast(false), 3000);
  };

  const currentReplyText = selectedComment?.aiReplies?.[selectedStyle] || "";

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="glass-panel-glow rounded-3xl p-6 sm:p-10 border border-white/10 text-center max-w-4xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-xs font-semibold text-pink-300">
          <Bot className="w-4 h-4 text-[#FF385C] animate-pulse" />
          <span>AI Ko'p Tilli Kommentariya Avtopiloti</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white">
          Har Qanday Tildagi Izohga <br className="sm:hidden" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF385C] via-[#c084fc] to-[#00F0FF]">
            Aynan O'sha Tilda Avto-Javob
          </span>
        </h2>
        <p className="text-sm text-gray-400 max-w-2xl mx-auto">
          O'zbekcha, Ruscha, Inglizcha yoki boshqa tildagi izohlar kelganda, AI tilni o'zi aniqlaydi va kanalingiz ohangida tabiiy javob tayyorlaydi.
        </p>
      </div>

      {/* Auto-Pilot Controller Bar */}
      <div className="max-w-4xl mx-auto glass-panel p-4 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FF385C] to-[#8B5CF6] flex items-center justify-center shadow-lg shadow-[#FF385C]/20">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-xs font-bold text-white block">AI Auto-Reply Rejimi (Avtopilot)</span>
            <span className="text-[11px] text-gray-400">
              {autoPilotEnabled ? "Faol: Yangi izohlarga avtomat tarzda javob tayyorlanadi" : "O'chirilgan: Faqat qo'lda tasdiqlanganda jo'natiladi"}
            </span>
          </div>
        </div>

        <button
          onClick={() => setAutoPilotEnabled(!autoPilotEnabled)}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            autoPilotEnabled
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              : 'bg-white/5 text-gray-400 border border-white/10'
          }`}
        >
          {autoPilotEnabled ? '✅ Yoqilgan' : '⏸ O\'chirilgan'}
        </button>
      </div>

      {/* Main Comment Testing Panel */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Comment Stream & Custom Input */}
        <div className="lg:col-span-5 space-y-4">
          {/* Custom Comment Input Form */}
          <form onSubmit={handleGenerateCustom} className="glass-panel p-4 rounded-2xl space-y-2">
            <label className="text-xs font-bold text-gray-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#FF385C]" />
              <span>O'zingiz istalgan tilda izoh yozib sinab ko'ring:</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="Masalan: Video darslik zo'r chiqibdi, davomini kutyapmiz..."
                className="flex-1 px-3 py-2 rounded-xl bg-[#080b11] border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#FF385C]"
              />
              <button
                type="submit"
                disabled={!customInput.trim() || isGenerating}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF385C] to-[#8B5CF6] text-white font-bold text-xs hover:brightness-110 disabled:opacity-50 shrink-0 flex items-center gap-1"
              >
                {isGenerating ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
              </button>
            </div>
          </form>

          {/* List of Incoming Comments */}
          <div className="space-y-2.5">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block px-1">
              Kelgan Izohlar Ro'yxati:
            </span>

            {commentsList.map((c) => {
              const isSelected = selectedComment?.id === c.id;
              return (
                <div
                  key={c.id}
                  onClick={() => setSelectedComment(c)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                    isSelected
                      ? 'glass-panel-glow border-[#FF385C]/40 bg-[#0c121e]'
                      : 'glass-panel border-white/5 hover:border-white/15'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={c.avatar}
                        alt={c.author}
                        className="w-7 h-7 rounded-full object-cover border border-white/10"
                      />
                      <span className="text-xs font-bold text-white">{c.author}</span>
                    </div>
                    <span className="text-[10px] text-gray-400 font-medium">{c.time}</span>
                  </div>

                  <p className="text-xs text-gray-300 line-clamp-2 italic">
                    "{c.text}"
                  </p>

                  <div className="flex items-center gap-2 mt-3 pt-2 border-t border-white/5 text-[10px]">
                    <span className="px-2 py-0.5 rounded-full bg-white/5 text-gray-300 font-medium">
                      🌐 {c.langName}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 font-medium">
                      {c.sentiment}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: AI Reply Generator & Tone Selector */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 space-y-6">
          {/* Active Comment Info Header */}
          <div className="border-b border-white/10 pb-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-400">Tanlangan Izoh:</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 font-bold">
                {selectedComment?.langName}
              </span>
            </div>
            <p className="text-sm font-medium text-white italic bg-[#080b11]/80 p-3.5 rounded-xl border border-white/5">
              "{selectedComment?.text}"
            </p>
          </div>

          {/* Tone Selector */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-gray-300">Javob Uslubi (Tone):</span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setSelectedStyle('friendly')}
                className={`py-2 px-3 rounded-xl text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                  selectedStyle === 'friendly'
                    ? 'bg-gradient-to-r from-[#FF385C] to-[#8B5CF6] text-white shadow-md'
                    : 'bg-white/5 border border-white/5 text-gray-400 hover:text-white'
                }`}
              >
                <Smile className="w-4 h-4" />
                <span>Samimiy & Iliq</span>
              </button>

              <button
                onClick={() => setSelectedStyle('concise')}
                className={`py-2 px-3 rounded-xl text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                  selectedStyle === 'concise'
                    ? 'bg-gradient-to-r from-[#FF385C] to-[#8B5CF6] text-white shadow-md'
                    : 'bg-white/5 border border-white/5 text-gray-400 hover:text-white'
                }`}
              >
                <Zap className="w-4 h-4" />
                <span>Tez & Qisqa</span>
              </button>

              <button
                onClick={() => setSelectedStyle('expert')}
                className={`py-2 px-3 rounded-xl text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                  selectedStyle === 'expert'
                    ? 'bg-gradient-to-r from-[#FF385C] to-[#8B5CF6] text-white shadow-md'
                    : 'bg-white/5 border border-white/5 text-gray-400 hover:text-white'
                }`}
              >
                <Award className="w-4 h-4" />
                <span>Professional</span>
              </button>
            </div>
          </div>

          {/* Generated Reply Box */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#FF385C] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                AI Generatsiya Qilgan Javob:
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">100% O'sha Tilda</span>
            </div>

            <div className="bg-[#080b11] p-5 rounded-2xl border border-white/10 relative text-sm text-gray-200 leading-relaxed font-sans shadow-inner">
              {currentReplyText}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              onClick={() => handleCopy(currentReplyText)}
              className="w-full sm:flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-white flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {copiedId === currentReplyText ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Nusxalandi!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-gray-400" />
                  <span>Javobdan Nusxa Olish</span>
                </>
              )}
            </button>

            <button
              onClick={handleSendToYoutube}
              className="w-full sm:flex-1 py-3 rounded-xl bg-gradient-to-r from-red-600 to-[#FF385C] hover:brightness-110 active:scale-95 text-xs font-bold text-white flex items-center justify-center gap-2 shadow-lg shadow-red-500/25 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>YouTube Izohlarga Joylash</span>
            </button>
          </div>

          {/* Success Toast */}
          {sentToast && (
            <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-bounce">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Javob muvaffaqiyatli YouTube kommentariyasiga yuborildi!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
