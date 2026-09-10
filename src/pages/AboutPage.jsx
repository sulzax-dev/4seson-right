import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Award, Users, CheckCircle2, Phone, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="space-y-16 py-12">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-16 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="bg-brand-500/20 text-brand-400 text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full border border-brand-500/30 inline-block mb-3">
            About 4 Seasons Right Services
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
            Washington's Trusted General Contracting Partner
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto mt-4 leading-relaxed font-light">
            Founded on the values of master craftsmanship, unwavering integrity, and enduring build quality for every season of the Pacific Northwest.
          </p>
        </div>
      </section>

      {/* Company Story & Mission */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-brand-500 font-extrabold text-xs uppercase tracking-widest">
              Our Heritage & Standard
            </span>
            <h2 className="text-3xl font-black text-slate-900 leading-tight">
              Building Enduring Value in Kirkland, Bellevue & Beyond
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              At 4 Seasons Right Services Inc. (WA Lic# 4SEASSR801OR), we understand that your home is your most valuable asset. Whether renovating an outdated kitchen, restoring water damage, or executing high-precision drywall and exterior painting, we treat every project with the care and dedication it deserves.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              Our team consists of licensed tradespeople, master finish carpenters, and certified paint specialists. We manage permits, materials, and on-site build phases with complete transparency.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50">
                <ShieldCheck className="w-6 h-6 text-brand-500 mb-2" />
                <h4 className="font-extrabold text-slate-900 text-sm">Fully Licensed & Bonded</h4>
                <p className="text-xs text-slate-500 mt-1">WA Contractor Lic# 4SEASSR801OR</p>
              </div>
              <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50">
                <Award className="w-6 h-6 text-brand-500 mb-2" />
                <h4 className="font-extrabold text-slate-900 text-sm">Guaranteed Workmanship</h4>
                <p className="text-xs text-slate-500 mt-1">Quality backed by structured warranties</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src="/images/gallery/WhatsApp Image 2026-07-10 at 2.00.54 PM.jpeg"
              alt="4 Seasons Right Services Team Craftsmanship"
              className="rounded-3xl shadow-2xl w-full h-[450px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-slate-100 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-brand-500 font-extrabold text-xs uppercase tracking-widest">
              How We Work
            </span>
            <h3 className="text-3xl font-black text-slate-900 mt-2">
              Our Core Contracting Principles
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-md border border-slate-200 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-500 flex items-center justify-center font-bold text-lg">
                01
              </div>
              <h4 className="font-extrabold text-slate-900 text-lg">Meticulous Site Preparation</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                We protect floors, furniture, and living areas with heavy-duty plastic containment, negative air filters, and dust-barrier zipper doors.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-md border border-slate-200 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-500 flex items-center justify-center font-bold text-lg">
                02
              </div>
              <h4 className="font-extrabold text-slate-900 text-lg">Premium Architectural Materials</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                We partner with leading suppliers including Sherwin-Williams, James Hardie, Trex, Schluter-Systems, and GAF Roofing.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-md border border-slate-200 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-500 flex items-center justify-center font-bold text-lg">
                03
              </div>
              <h4 className="font-extrabold text-slate-900 text-lg">Clear Milestone Communication</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Direct phone and email contact with your supervisor ensures you are always informed of daily milestones and schedule progress.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-7xl mx-auto px-6 text-center py-6">
        <div className="bg-slate-950 text-white rounded-3xl p-10 sm:p-14 shadow-2xl space-y-6">
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
            Let's Discuss Your Upcoming Contracting Project
          </h3>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Contact us today to schedule your complimentary on-site inspection and personalized estimate in Kirkland, Bellevue, Seattle, or surrounding areas.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            <Link
              to="/contact"
              className="bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-xs uppercase tracking-wider px-8 py-4 rounded-full shadow-glow inline-flex items-center justify-center gap-2"
            >
              <span>Schedule Estimate</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:4254665469"
              className="bg-white/10 hover:bg-white/20 text-white font-bold text-sm px-8 py-4 rounded-full border border-white/20 inline-flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-brand-400" />
              <span>(425) 466-5469</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
