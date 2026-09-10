import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, ShieldCheck } from 'lucide-react';
import { servicesData } from '../data/servicesData';

export default function ServicesPage() {
  return (
    <div className="space-y-16 py-12">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-16 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="bg-brand-500/20 text-brand-400 text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full border border-brand-500/30 inline-block mb-3">
            Contracting Services
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
            Professional Remodeling & Construction Services
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto mt-4 leading-relaxed font-light">
            Licensed and insured general contracting solutions for residential and commercial properties throughout Kirkland, Bellevue, Seattle, and King County.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1"
            >
              <div className="p-8 space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-brand-50 border border-brand-100 text-brand-500 flex items-center justify-center text-2xl group-hover:bg-brand-500 group-hover:text-white transition-colors duration-300 shadow-sm">
                  <i className={`fas ${service.icon}`}></i>
                </div>

                <h3 className="font-extrabold text-xl text-slate-900 group-hover:text-brand-500 transition-colors">
                  {service.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {service.description}
                </p>

                {/* Subcategories list */}
                <div className="pt-2 border-t border-slate-100">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    Key Specialties:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {service.subcategories.slice(0, 4).map((sub, sIdx) => {
                      const title = typeof sub === 'object' ? sub.title : sub;
                      return (
                        <span
                          key={sIdx}
                          className="bg-slate-100 text-slate-700 text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-slate-200/60"
                        >
                          {title}
                        </span>
                      );
                    })}
                    {service.subcategories.length > 4 && (
                      <span className="text-[11px] text-brand-500 font-bold px-1.5 py-1">
                        +{service.subcategories.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <Link
                  to={`/services/${service.slug}`}
                  className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1.5"
                >
                  <span>View Full Service Page</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  to="/contact"
                  className="text-slate-500 hover:text-slate-800 text-xs font-semibold"
                >
                  Get Estimate &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Banner */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-brand-400 text-xs font-bold uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4" />
              <span>Licensed • Bonded • Insured</span>
            </div>
            <h3 className="text-2xl font-black">Need a Custom Contracting Scope?</h3>
            <p className="text-slate-300 text-xs max-w-xl">
              We specialize in custom architectural woodwork, whole-home modifications, structural beam additions, and historic restorations across Washington.
            </p>
          </div>
          <Link
            to="/contact"
            className="bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-xs uppercase tracking-wider px-8 py-4 rounded-full shadow-glow shrink-0 transition"
          >
            Consult With Our Team
          </Link>
        </div>
      </section>
    </div>
  );
}
