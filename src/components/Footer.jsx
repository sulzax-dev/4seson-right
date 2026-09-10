import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { servicesData } from '../data/servicesData';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 text-sm border-t border-slate-800">
      {/* Top CTA Banner */}
      <div className="bg-gradient-to-r from-brand-600 to-brand-500 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <span className="bg-white/20 text-white text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded-full mb-3 inline-block">
              Get Started Today
            </span>
            <h3 className="text-2xl md:text-3xl font-black tracking-tight">
              Ready to Transform Your Home in Washington?
            </h3>
            <p className="text-brand-100 text-sm mt-1 max-w-xl">
              Schedule your free, on-site consultation with our master general contracting team today.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a 
              href="tel:4254665469"
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3.5 rounded-full text-sm flex items-center justify-center gap-2 shadow-lg transition"
            >
              <Phone className="w-4 h-4 text-brand-400" />
              <span>(425) 466-5469</span>
            </a>
            <Link 
              to="/contact"
              className="bg-white hover:bg-slate-100 text-brand-600 font-extrabold px-7 py-3.5 rounded-full text-sm shadow-xl transition text-center"
            >
              Request Free Estimate
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Col 1: Brand Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img 
              src="/images/logo.jpg" 
              alt="4 Seasons Right Services Logo" 
              className="h-12 w-auto object-contain bg-white/10 p-1.5 rounded-xl border border-white/10"
            />
          </div>
          <p className="text-xs leading-relaxed text-slate-400">
            4 Seasons Right Services Inc. is Kirkland and Seattle's premier licensed, bonded, and insured general contractor. We deliver superior craftsmanship for residential remodeling, painting, flooring, and exterior restoration.
          </p>
          <div className="flex items-center gap-2 text-xs font-semibold text-brand-400 bg-brand-500/10 border border-brand-500/20 px-3 py-1.5 rounded-lg w-fit">
            <ShieldCheck className="w-4 h-4" />
            <span>WA Lic# 4SEASSR801OR</span>
          </div>
        </div>

        {/* Col 2: Core Services */}
        <div>
          <h4 className="text-white font-bold text-base mb-4 border-b border-slate-800 pb-2">
            Our Core Services
          </h4>
          <ul className="space-y-2 text-xs">
            {servicesData.slice(0, 7).map((service) => (
              <li key={service.id}>
                <Link 
                  to={`/services/${service.slug}`}
                  className="hover:text-brand-400 transition flex items-center gap-1.5"
                >
                  <span className="text-brand-500">&rsaquo;</span>
                  <span>{service.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Service Areas */}
        <div>
          <h4 className="text-white font-bold text-base mb-4 border-b border-slate-800 pb-2">
            Service Areas
          </h4>
          <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-xs">
            {[
              "Kirkland, WA", "Bellevue, WA", "Seattle, WA", "Redmond, WA",
              "Bothell, WA", "Woodinville, WA", "Sammamish, WA", "Issaquah, WA",
              "Kenmore, WA", "Lynnwood, WA", "Mercer Island, WA", "Renton, WA"
            ].map((area, idx) => (
              <span key={idx} className="flex items-center gap-1.5 text-slate-400">
                <CheckCircle2 className="w-3 h-3 text-brand-500 shrink-0" />
                <span>{area}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Col 4: Contact & Business Hours */}
        <div className="space-y-3">
          <h4 className="text-white font-bold text-base mb-4 border-b border-slate-800 pb-2">
            Contact Information
          </h4>
          <ul className="space-y-3 text-xs">
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
              <span>Kirkland, WA 98034 & Greater Eastside</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-brand-500 shrink-0" />
              <a href="tel:4254665469" className="hover:text-brand-400 transition font-bold text-slate-200">
                (425) 466-5469
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-brand-500 shrink-0" />
              <a href="mailto:4srsinc@gmail.com" className="hover:text-brand-400 transition text-slate-200">
                4srsinc@gmail.com
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-300">Mon - Sat: 8:00 AM – 7:00 PM</p>
                <p className="text-slate-500">Sunday: Closed / Emergency Only</p>
              </div>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Sub-footer */}
      <div className="bg-slate-900/60 border-t border-slate-900 py-6 px-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p>
            &copy; {new Date().getFullYear()} 4 Seasons Right Services Inc. All Rights Reserved. Fully Licensed, Bonded & Insured.
          </p>
          <div className="flex space-x-6">
            <Link to="/about" className="hover:text-slate-400 transition">About Us</Link>
            <Link to="/services" className="hover:text-slate-400 transition">Services</Link>
            <Link to="/gallery" className="hover:text-slate-400 transition">Gallery</Link>
            <Link to="/contact" className="hover:text-slate-400 transition">Contact Us</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
