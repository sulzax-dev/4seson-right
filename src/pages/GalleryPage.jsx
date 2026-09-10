import React, { useState } from 'react';
import { galleryItems, beforeAfterPairs } from '../data/galleryData';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import { Sparkles, Eye, X } from 'lucide-react';

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredItems = activeFilter === 'all'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeFilter);

  return (
    <div className="space-y-16 py-12">
      {/* Header */}
      <section className="bg-slate-900 text-white py-16 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="bg-brand-500/20 text-brand-400 text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full border border-brand-500/30 inline-block mb-3">
            Our Work Portfolio
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
            Craftsmanship in Every Detail
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto mt-4 leading-relaxed font-light">
            Browse our completed residential and commercial projects across Kirkland, Bellevue, Seattle, Redmond, and surrounding areas.
          </p>
        </div>
      </section>

      {/* Before & After Interactive Showcase */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-brand-500 font-extrabold uppercase tracking-widest text-xs">
            Interactive Transformations
          </span>
          <h2 className="text-3xl font-black text-slate-900 mt-2">
            Before & After Showcase
          </h2>
          <p className="text-slate-600 text-xs mt-2">
            Drag the slider handles horizontally to see the true difference our team delivers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {beforeAfterPairs.map((pair) => (
            <BeforeAfterSlider key={pair.id} {...pair} />
          ))}
        </div>
      </section>

      {/* Filterable Gallery Grid */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-brand-500 font-extrabold uppercase tracking-widest text-xs">
            Project Showcase
          </span>
          <h2 className="text-3xl font-black text-slate-900 mt-2">
            Completed Contracting Works
          </h2>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {[
            { key: 'all', label: 'All Projects' },
            { key: 'remodeling', label: 'Kitchen & Bath Remodeling' },
            { key: 'painting', label: 'Drywall & Painting' },
            { key: 'exterior', label: 'Exterior, Decks & Roofing' }
          ].map((btn) => (
            <button
              key={btn.key}
              onClick={() => setActiveFilter(btn.key)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition uppercase tracking-wider ${
                activeFilter === btn.key
                  ? 'bg-brand-500 text-white shadow-glow'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-brand-300'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Gallery Cards - Pure Clean Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="group relative h-72 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl border border-slate-200 cursor-pointer bg-slate-900 transition-all duration-300 hover:-translate-y-1"
            >
              <img
                src={item.image}
                alt={item.title || "4 Seasons Project"}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              
              {/* Hover overlay with zoom icon */}
              <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-brand-500 text-white flex items-center justify-center shadow-2xl transform scale-75 group-hover:scale-100 transition-transform duration-300">
                  <Eye className="w-6 h-6" />
                </div>
              </div>

              {/* Subtle Category Pill Badge */}
              <div className="absolute top-4 left-4 bg-slate-950/70 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full border border-white/10 opacity-90 group-hover:opacity-100 transition">
                {item.categoryLabel}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-700"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-slate-950/80 text-white flex items-center justify-center hover:bg-brand-500 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              className="w-full max-h-[70vh] object-contain bg-slate-950"
            />

            <div className="p-6 text-white bg-slate-900 border-t border-slate-800">
              <span className="text-brand-400 text-xs font-bold uppercase tracking-wider block mb-1">
                {selectedImage.categoryLabel} • {selectedImage.location}
              </span>
              <h3 className="text-xl font-bold">{selectedImage.title}</h3>
              <p className="text-slate-300 text-xs mt-2">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
