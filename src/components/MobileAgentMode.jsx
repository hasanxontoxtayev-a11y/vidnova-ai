import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, Send, Sparkles, Mic, Image, Clock, MessageSquare, 
  Flame, ArrowLeft, CheckCircle2, RefreshCw, Smartphone, Lightbulb, Zap 
} from 'lucide-react';

export default function MobileAgentMode({ onSwitchToDashboard }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'agent',
      text: "Salom! Men sizning shaxsiy VidNova YouTube AI agentingizman. 📱 Bugun kanalingiz bo'yicha qanday vazifani bajaramiz?",
      time: "Hozir",
      actions: ["Bugungi video g'oyasi", "Abloshkani tekshirish", "Bugungi optimal vaqt", "Kommentlarga javob"]
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = "";
      const lower = text.toLowerCase();

      if (lower.includes("g'oya") || lower.includes("tema") || lower.includes("mavzu")) {
        reply = "💡 Bugun tomoshabinlar orasida yuqori talabga ega 3 ta g'oya:\n1. '2026-yilda eng daromadli YouTube mavzulari (O'zbekistonda)'\n2. 'Sun'iy intellekt orqali videolarni 10x tezroq montaj qilish sirlari'\n3. 'Abloshka tufayli prasmotrni 3 barobar oshirish bo'yicha amaliy keys'.\nQaysi biri bo'yicha ssenariy yozib beray?";
      } else if (lower.includes("abloshka") || lower.includes("rasm") || lower.includes("muqova")) {
        reply = "🖼️ Abloshkani tekshirish bo'yicha tezkor maslahat: \n- Yuz ifodasi qanchalik yaqin va hissiyotli bo'lsa, CTR 25% yuqori bo'ladi.\n- Matn 3 ta so'zdan oshmasin.\n- Orqa fon va obyekt o'rtasida kuchli kontrast bo'lsin (masalan: sariq + qora, yoki qizil + to'q binafsha).";
      } else if (lower.includes("vaqt") || lower.includes("soat")) {
        reply = "⏰ Bugun videoni joylash uchun eng yaxshi vaqt:\n- O'zbekiston auditoriyasi uchun: Soat 19:30 - 20:30 oralig'i!\n- Maslahat: Videoni soat 18:00 da 'Unlisted' qilib yuklab qo'ying, tizim 1080p sifatni qayta ishlasin.";
      } else if (lower.includes("komment") || lower.includes("izoh")) {
        reply = "💬 Kanalingizdagi barcha yangi izohlar kuzatilmoqda. Rus, o'zbek va ingliz tilidagi 14 ta izohga muvaffaqiyatli avtomatik do'stona javoblar tayyorlab qo'yildi. Ularni bir klikda tasdiqlashni xohlaysizmi?";
      } else {
        reply = `Kanal tahlili bo'yicha vazifangiz qabul qilindi: "${text}". Men videongizning CTR, SEO teglari va tomoshabinlar reaktsiyasini optimallashtirishga yordam berishga tayyorman!`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'agent',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 700);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        handleSendMessage("Bugun qanday video chiqarsam prasmotr ko'p bo'ladi?");
      }, 2000);
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-[85vh] flex flex-col bg-[#080b11] rounded-3xl border border-white/10 shadow-2xl overflow-hidden animate-fadeIn">
      {/* Mobile App Bar */}
      <div className="glass-panel px-4 py-3 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#FF385C] via-[#8B5CF6] to-[#00F0FF] flex items-center justify-center p-[2px]">
              <div className="w-full h-full bg-[#080b11] rounded-[14px] flex items-center justify-center">
                <Bot className="w-5 h-5 text-[#FF385C]" />
              </div>
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#080b11]"></span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-sm font-bold text-white">VidNova Copilot</h2>
              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-400 font-bold">
                Mobil Agent
              </span>
            </div>
            <p className="text-[10px] text-gray-400">Cho'ntakdagi YouTube Maslahatchisi</p>
          </div>
        </div>

        {onSwitchToDashboard && (
          <button
            onClick={onSwitchToDashboard}
            className="text-[11px] px-2.5 py-1 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 transition-colors"
          >
            Dashboard 🖥️
          </button>
        )}
      </div>

      {/* Chat Messages Viewport */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 no-scrollbar">
        {messages.map((msg) => {
          const isAgent = msg.sender === 'agent';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isAgent ? 'items-start' : 'items-end'} space-y-1`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed whitespace-pre-line ${
                  isAgent
                    ? 'glass-panel text-gray-200 rounded-tl-sm border-white/10'
                    : 'bg-gradient-to-r from-[#FF385C] to-[#8B5CF6] text-white font-medium rounded-tr-sm shadow-md shadow-[#FF385C]/20'
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[9px] text-gray-500 px-1">{msg.time}</span>

              {/* Action Suggestion Pills */}
              {msg.actions && (
                <div className="flex flex-wrap gap-1.5 pt-1 max-w-[95%]">
                  {msg.actions.map((act, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendMessage(act)}
                      className="text-[10px] px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[#00F0FF] transition-all text-left"
                    >
                      {act}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-1.5 text-xs text-gray-400 glass-panel px-3 py-2 rounded-2xl w-fit">
            <Sparkles className="w-3.5 h-3.5 text-[#FF385C] animate-pulse" />
            <span className="text-[11px]">VidNova javob yozmoqda...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Tool Icons Bar */}
      <div className="px-3 py-1.5 bg-[#05070b]/80 border-t border-white/5 flex items-center justify-around text-[10px] text-gray-400">
        <button
          onClick={() => handleSendMessage("Bugungi trend mavzular qanday?")}
          className="flex flex-col items-center gap-0.5 hover:text-white"
        >
          <Lightbulb className="w-4 h-4 text-amber-400" />
          <span>G'oyalar</span>
        </button>

        <button
          onClick={() => handleSendMessage("Muqova (abloshka)ni qanday zo'r qilsa bo'ladi?")}
          className="flex flex-col items-center gap-0.5 hover:text-white"
        >
          <Image className="w-4 h-4 text-[#8B5CF6]" />
          <span>Abloshka</span>
        </button>

        <button
          onClick={() => handleSendMessage("Bugun soat nechida yuklay?")}
          className="flex flex-col items-center gap-0.5 hover:text-white"
        >
          <Clock className="w-4 h-4 text-[#00F0FF]" />
          <span>Vaqt</span>
        </button>

        <button
          onClick={() => handleSendMessage("Yangi izohlarga javob tayyorla")}
          className="flex flex-col items-center gap-0.5 hover:text-white"
        >
          <MessageSquare className="w-4 h-4 text-emerald-400" />
          <span>Izohlar</span>
        </button>
      </div>

      {/* Input bar */}
      <div className="p-3 bg-[#080b11] border-t border-white/10 flex items-center gap-2">
        <button
          onClick={toggleRecording}
          className={`p-2.5 rounded-xl border transition-all ${
            isRecording
              ? 'bg-red-500/20 text-red-400 border-red-500 animate-pulse'
              : 'bg-white/5 text-gray-400 border-white/10 hover:text-white'
          }`}
          title="Ovozli so'rov"
        >
          <Mic className="w-4 h-4" />
        </button>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder={isRecording ? "Eshitilmoqda..." : "Savol yoki vazifa bering..."}
          className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#0c121e] border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#FF385C]"
        />

        <button
          onClick={() => handleSendMessage()}
          disabled={!inputText.trim()}
          className="p-2.5 rounded-xl bg-gradient-to-r from-[#FF385C] to-[#8B5CF6] text-white disabled:opacity-40 hover:brightness-110 shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
