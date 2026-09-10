import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-4">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className="border border-slate-200 rounded-2xl overflow-hidden transition hover:border-brand-300 bg-white"
          >
            <button
              onClick={() => toggle(idx)}
              className="w-full px-6 py-5 text-left font-bold text-base sm:text-lg text-slate-900 flex justify-between items-center focus:outline-none bg-slate-50/50 hover:bg-slate-50 transition"
            >
              <span className="pr-4">{item.question}</span>
              <ChevronDown
                className={`w-5 h-5 text-brand-500 shrink-0 transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-6 py-5 bg-white border-t border-slate-100 text-slate-600 text-sm leading-relaxed animate-fade-in">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
