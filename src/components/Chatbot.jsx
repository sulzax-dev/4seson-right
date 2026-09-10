import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Phone, Bot, User, Sparkles, Loader2 } from 'lucide-react';

function ChatGPTLogo({ className = "w-7 h-7" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.259 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7466-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1683a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4947zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1683a.0757.0757 0 0 1-.071 0l-4.8303-2.7866A4.504 4.504 0 0 1 2.3408 7.8956zm16.0993 3.8558L12.5973 8.3829 14.6174 7.2146a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.4022-.6815zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1636a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6814v6.7226zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/>
    </svg>
  );
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: "👋 Hi! Welcome to **4 Seasons Right Services**! I'm your AI Contracting Assistant.\n\nLooking to book a **Free Estimate** for Kitchen/Bath Remodeling, Painting, Drywall, Flooring, or Exterior services in Kirkland & Greater Seattle?",
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const userText = inputValue.trim();
    const newMessages = [...messages, { role: 'user', text: userText }];
    setMessages(newMessages);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await response.json();
      if (response.ok && data.text) {
        setMessages([...newMessages, { role: 'assistant', text: data.text }]);
      } else {
        setMessages([
          ...newMessages,
          {
            role: 'assistant',
            text: "Thank you for reaching out! Please give our contracting supervisor a quick call directly at **(425) 466-5469** or submit your inquiry through our contact form!",
          },
        ]);
      }
    } catch (err) {
      console.error('Chat error:', err);
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          text: "I'd love to help! Please call our Kirkland office directly at **(425) 466-5469** for immediate estimate scheduling!",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Action Buttons: Call button + ChatGPT icon button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3.5">
        
        {/* Floating Call Button */}
        <a
          href="tel:4254665469"
          className="w-13 h-13 sm:w-14 sm:h-14 bg-gradient-to-tr from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 text-white rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-110 border-2 border-white/80"
          aria-label="Direct Phone Call (425) 466-5469"
          title="Call (425) 466-5469"
        >
          <Phone className="w-6 h-6 text-white" />
        </a>

        {/* Floating ChatGPT Chatbot Button */}
        <div className="flex flex-col items-end">
          {!isOpen && (
            <div className="bg-slate-900 text-white text-xs font-bold py-1 px-3 rounded-full shadow-2xl mb-1.5 flex items-center gap-1.5 border border-slate-700 animate-bounce">
              <Sparkles className="w-3 h-3 text-[#10a37f]" />
              <span>Chat with AI</span>
            </div>
          )}
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-14 h-14 bg-[#10a37f] hover:bg-[#0da678] text-white rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-110 border-2 border-white/80"
            aria-label="Open ChatGPT AI Assistant"
            title="Chat with AI Assistant"
          >
            {isOpen ? <X className="w-6 h-6" /> : <ChatGPTLogo className="w-8 h-8 text-white" />}
          </button>
        </div>

      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 w-[92vw] sm:w-[380px] h-[520px] bg-white rounded-3xl shadow-2xl border border-slate-200 z-50 flex flex-col overflow-hidden animate-fade-in">
          
          {/* Header */}
          <div className="bg-[#10a37f] text-white p-4 flex items-center justify-between border-b border-[#0d8a6a]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white text-[#10a37f] flex items-center justify-center shadow-md">
                <ChatGPTLogo className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm flex items-center gap-1.5">
                  <span>4 Seasons AI Assistant</span>
                  <span className="w-2 h-2 bg-emerald-200 rounded-full animate-pulse"></span>
                </h4>
                <p className="text-[11px] text-emerald-100">Powered by AI • Instant Estimates</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50 text-xs leading-relaxed">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-full bg-[#10a37f]/15 text-[#10a37f] flex items-center justify-center shrink-0 mt-0.5 border border-[#10a37f]/30">
                    <ChatGPTLogo className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl max-w-[80%] ${
                    msg.role === 'user'
                      ? 'bg-brand-500 text-white font-medium rounded-br-none shadow-sm'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-sm whitespace-pre-line'
                  }`}
                >
                  {msg.text}
                </div>
                {msg.role === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 items-center text-slate-400 text-xs italic">
                <ChatGPTLogo className="w-4 h-4 text-[#10a37f] animate-spin" />
                <span>AI assistant is typing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Direct Call Helper */}
          <div className="px-4 py-2 bg-slate-100 border-t border-slate-200 flex justify-between items-center text-[11px] text-slate-600">
            <span>Direct Phone:</span>
            <a href="tel:4254665469" className="text-brand-600 font-bold hover:underline flex items-center gap-1">
              <Phone className="w-3 h-3" />
              <span>(425) 466-5469</span>
            </a>
          </div>

          {/* Input Footer */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask a question or book estimate..."
              className="flex-1 px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#10a37f]/20 focus:border-[#10a37f] transition"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="bg-[#10a37f] hover:bg-[#0da678] text-white p-2.5 rounded-xl shadow-md transition disabled:opacity-50"
            >
              {isTyping ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </button>
          </form>
        </div>
      )}
    </>
  );
}
