import React from 'react';
import { Phone, Mail, MapPin, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import EstimateForm from '../components/EstimateForm';

export default function ContactPage() {
  return (
    <div className="space-y-16 py-12">
      {/* Header */}
      <section className="bg-slate-900 text-white py-16 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="bg-brand-500/20 text-brand-400 text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full border border-brand-500/30 inline-block mb-3">
            Contact & Estimates
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
            Schedule Your Free On-Site Consultation
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto mt-4 leading-relaxed font-light">
            We are ready to assist you with your remodeling, painting, flooring, or restoration project in Kirkland, Bellevue, Seattle, and Greater Washington.
          </p>
        </div>
      </section>

      {/* Main Grid: Contact Info + Form */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-brand-500 font-extrabold text-xs uppercase tracking-widest">
                Direct Contact
              </span>
              <h2 className="text-3xl font-black text-slate-900 mt-1">
                Get In Touch With Our Team
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
                Whether you have architectural blueprints ready or are just starting to plan your budget, our contracting supervisors are here to guide you.
              </p>
            </div>

            {/* Info Cards */}
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4 hover:border-brand-300 transition">
                <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-500 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">Direct Phone</h4>
                  <a href="tel:4254665469" className="text-brand-600 font-black text-base hover:underline block mt-0.5">
                    (425) 466-5469
                  </a>
                  <p className="text-[11px] text-slate-400">Call or text for immediate scheduling</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4 hover:border-brand-300 transition">
                <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-500 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">Email Inquiries</h4>
                  <a href="mailto:4srsinc@gmail.com" className="text-brand-600 font-bold text-sm hover:underline block mt-0.5">
                    4srsinc@gmail.com
                  </a>
                  <p className="text-[11px] text-slate-400">Send project plans, scopes, or photos</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4 hover:border-brand-300 transition">
                <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-500 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">Primary Office</h4>
                  <p className="text-xs text-slate-700 font-semibold mt-0.5">Kirkland, WA 98034</p>
                  <p className="text-[11px] text-slate-400">Serving King, Snohomish & Pierce Counties</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4 hover:border-brand-300 transition">
                <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-500 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">Operating Hours</h4>
                  <p className="text-xs text-slate-700 font-semibold mt-0.5">Monday – Saturday: 8:00 AM – 7:00 PM</p>
                  <p className="text-[11px] text-slate-400">Sunday: Closed / Emergency Response Only</p>
                </div>
              </div>
            </div>

            {/* License verification badge */}
            <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-brand-400 shrink-0" />
              <div className="text-xs">
                <p className="font-bold text-white">Washington State Certified Contractor</p>
                <p className="text-slate-400">License #4SEASSR801OR • Bonded & Fully Insured</p>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-200">
              <div className="mb-6">
                <span className="text-brand-500 text-xs font-black uppercase tracking-widest block mb-1">
                  Online Booking Form
                </span>
                <h3 className="text-2xl font-black text-slate-900">
                  Send Project Request
                </h3>
                <p className="text-slate-500 text-xs mt-1">
                  Fill out the details below and an estimate specialist will reach out to confirm your consultation.
                </p>
              </div>

              <EstimateForm defaultService="Kitchen & Bath Remodeling" source="Contact Page" />
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
