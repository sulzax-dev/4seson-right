import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, Phone, ArrowRight, ArrowLeft, MapPin, Sparkles, Award, Star } from 'lucide-react';
import { servicesData } from '../data/servicesData';
import EstimateForm from '../components/EstimateForm';
import FAQAccordion from '../components/FAQAccordion';
import seoData from '../data/seoContentData.json';

export default function ServiceDetailPage() {
  const { slug } = useParams();

  // Find matching service
  const service = servicesData.find((s) => s.slug === slug || s.id === slug);
  const serviceSEO = seoData.services.find((s) => s.slug === slug || s.id === slug) || {};

  useEffect(() => {
    if (serviceSEO.metaTitle) {
      document.title = serviceSEO.metaTitle;
    }
  }, [serviceSEO]);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const defaultFaqs = [
    {
      question: `How long does a typical ${service.shortTitle || service.title} project take in Bellevue, WA?`,
      answer: "Project duration typically ranges from 2 to 6 weeks depending on square footage, custom material fabrications, and City of Bellevue building permit requirements. We establish clear milestone schedules upfront."
    },
    {
      question: "Do you handle all required City of Bellevue and King County permits?",
      answer: "Yes! 4 Seasons Right Services Inc. manages the entire architectural plan review, city permit submissions, and on-site building code inspections in Bellevue, Kirkland, Redmond, and Seattle."
    },
    {
      question: "What warranties and guarantees are provided on your workmanship?",
      answer: "We back all of our general contracting, remodeling, painting, and exterior installations with comprehensive craftsmanship warranties alongside full manufacturer warranties on all materials."
    },
    {
      question: "How do you protect my home during construction?",
      answer: "We use a rigorous Clean Air Protocol, including heavy-duty Ram Board floor shielding, sealed zip-wall containment barriers, and continuous negative air HEPA filtration to keep living spaces immaculate."
    }
  ];

  const faqsToDisplay = service.faqs && service.faqs.length > 0 ? service.faqs : defaultFaqs;

  return (
    <div className="space-y-16 py-10">
      
      {/* Service Hero Banner */}
      <section className="bg-slate-900 text-white py-16 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          <div className="lg:col-span-7 space-y-6">
            <Link 
              to="/services"
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-brand-400 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Services</span>
            </Link>

            <div className="flex flex-wrap gap-2">
              <span className="bg-brand-500/20 text-brand-400 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider border border-brand-500/30">
                Bellevue, WA • Licensed Contractor #4SEASSR801OR
              </span>
              {serviceSEO.focusKeyword && (
                <span className="bg-slate-800 text-slate-300 px-3 py-1 rounded-full text-xs font-semibold">
                  Target: {serviceSEO.focusKeyword}
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              {service.title} in Bellevue, WA
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-light">
              {service.description}
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              {serviceSEO.top5Keywords?.map((kw, idx) => (
                <span key={idx} className="bg-white/10 text-slate-200 text-xs px-3 py-1 rounded-lg border border-white/10">
                  ✓ {kw}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a
                href="#service-estimate"
                className="bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-xs uppercase tracking-wider px-8 py-4 rounded-full shadow-glow inline-flex items-center justify-center gap-2"
              >
                <span>Request Free Bellevue Estimate</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="tel:4254665469"
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs uppercase tracking-wider px-6 py-4 rounded-full inline-flex items-center justify-center gap-2 transition"
              >
                <Phone className="w-4 h-4 text-brand-400" />
                <span>(425) 466-5469</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 text-slate-900" id="service-estimate">
              <div className="text-center mb-6">
                <span className="text-brand-500 text-xs font-black uppercase tracking-widest block mb-1">
                  Bellevue In-Home Consultation
                </span>
                <h3 className="text-xl font-extrabold">Schedule Free On-Site Quote</h3>
              </div>
              <EstimateForm defaultService={service.title} source={`Service Page: ${service.title} (Bellevue)`} />
            </div>
          </div>

        </div>
      </section>

      {/* Main Editorial Content Section (Clean Paragraphs, No Fragmented Boxes) */}
      <section className="max-w-5xl mx-auto px-6 space-y-12">
        
        {/* Paragraph 1: Service Overview */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-200 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-brand-500 font-extrabold uppercase tracking-widest text-xs">
              Overview & Process
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Professional {service.title} in Bellevue, WA
            </h2>
          </div>

          <div className="text-slate-700 text-sm sm:text-base leading-relaxed space-y-4 font-normal">
            <p>
              At <strong>4 Seasons Right Services Inc.</strong> (WA Lic# 4SEASSR801OR), we take pride in delivering premier {service.title.toLowerCase()} across Bellevue, Kirkland, Redmond, Seattle, and King County. Our licensed general contracting team handles every stage of your project with precision, from initial on-site inspections and design consultations to master craftsmanship and final code compliance.
            </p>
            <p>
              We believe great construction starts with clear communication, dust-contained work sites, and uncompromising material standards. Whether you are renovating an existing home, repairing moisture intrusion, or upgrading key architectural features, our experienced tradespeople ensure lasting structural durability and exceptional aesthetic results.
            </p>
          </div>
        </div>

        {/* Paragraph 2: Detailed Capabilities List */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-200 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-brand-500 font-extrabold uppercase tracking-widest text-xs">
              What We Deliver
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Specialized Scope of Work
            </h2>
          </div>

          <div className="space-y-6 divide-y divide-slate-100">
            {service.subcategories.map((sub, index) => {
              const title = typeof sub === 'object' ? sub.title : sub;
              const desc = typeof sub === 'object' ? sub.desc : '';
              return (
                <div key={index} className="pt-5 first:pt-0 flex items-start gap-4">
                  <div className="w-7 h-7 rounded-full bg-brand-50 text-brand-500 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base mb-1">
                      {title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {desc || "Engineered and installed by licensed Washington craftsmen using premium architectural grade materials."}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Paragraph 3: Standards & Quality Assurance */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-8 sm:p-12 shadow-xl space-y-4">
          <span className="text-brand-400 font-extrabold uppercase tracking-widest text-xs">
            Our Quality Assurance
          </span>
          <h3 className="text-2xl font-black text-white">
            Built Right For Every Season
          </h3>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Every project completed by 4 Seasons Right Services Inc. includes a dedicated on-site project supervisor, daily progress tracking, transparent milestone billing, and complete clean-air dust containment. We back all of our general contracting, remodeling, and exterior work with full craftsmanship warranties alongside manufacturer guarantees on all installed materials.
          </p>
        </div>

      </section>

      {/* Service FAQs */}
      <section className="max-w-4xl mx-auto px-6 py-6">
        <div className="text-center mb-10">
          <span className="text-brand-500 font-extrabold uppercase tracking-widest text-xs">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl font-black text-slate-900 mt-2">
            Bellevue {service.shortTitle || service.title} FAQs
          </h2>
        </div>

        <FAQAccordion items={faqsToDisplay} />
      </section>

    </div>
  );
}
