import React, { useState } from 'react';

export default function BeforeAfterSlider({ beforeImage, afterImage, title, category, location, description }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200 transition hover:shadow-2xl flex flex-col">
      <div 
        className="relative h-72 sm:h-80 w-full select-none cursor-ew-resize overflow-hidden bg-slate-900"
        onMouseMove={(e) => isDragging && handleMove(e)}
        onTouchMove={(e) => isDragging && handleMove(e)}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
        onClick={handleMove}
      >
        {/* After Image (Background) */}
        <img
          src={afterImage}
          alt={`After: ${title}`}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md text-white text-xs font-black uppercase px-3 py-1 rounded-full pointer-events-none z-10">
          After
        </div>

        {/* Before Image (Clipped Overlay) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={beforeImage}
            alt={`Before: ${title}`}
            className="absolute inset-0 w-full h-full object-cover max-w-none"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div className="absolute top-4 left-4 bg-brand-600/90 backdrop-blur-md text-white text-xs font-black uppercase px-3 py-1 rounded-full pointer-events-none z-10">
            Before
          </div>
        </div>

        {/* Slider Handle Divider */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl z-20 pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-brand-500 text-white rounded-full flex items-center justify-center shadow-glow border-2 border-white text-xs">
            &harr;
          </div>
        </div>
      </div>

      {/* Caption & Details */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            <span className="text-brand-500">{category}</span>
            <span>{location}</span>
          </div>
          <h4 className="text-lg font-extrabold text-slate-900 mb-2">{title}</h4>
          <p className="text-xs text-slate-600 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}
