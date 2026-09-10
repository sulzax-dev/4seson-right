import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, Award, Star, Clock, CheckCircle, ArrowRight, 
  Phone, Sparkles, Hammer, Layers, ChevronDown, ChevronUp 
} from 'lucide-react';
import { servicesData } from '../data/servicesData';
import { beforeAfterPairs } from '../data/galleryData';
import EstimateForm from '../components/EstimateForm';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import FAQAccordion from '../components/FAQAccordion';

export default function HomePage() {
  const [showAllServices, setShowAllServices] = useState(false);

  const coreServices = servicesData.filter((s) => s.isCore);
  const extraServices = servicesData.filter((s) => !s.isCore);

  const homeFaqs = [
    {
      question: "Are you licensed, bonded, and insured in Washington State?",
      answer: "Yes! 4 Seasons Right Services Inc. is fully licensed, bonded, and insured under Washington License #4SEASSR801OR. We strictly adhere to all city and state building codes and safety regulations."
    },
    {
      question: "How do I get an exact estimate for my remodeling or painting project?",
      answer: "You can fill out our estimate form right on this page or give us a call at (425) 466-5469. We will schedule a convenient, free on-site consultation to review your project scope and deliver an itemized quote."
    },
    {
      question: "What areas in Washington do you service?",
      answer: "We proudly serve homeowners and businesses across King County, Snohomish County, and Pierce County—including Kirkland, Bellevue, Seattle, Redmond, Bothell, Woodinville, Sammamish, Issaquah, and surrounding communities."
    },
    {
      question: "Do you offer warranties or workmanship guarantees on your projects?",
      answer: "Absolutely. We provide complete workmanship guarantees on all our contracting, remodeling, roofing, and painting work, alongside manufacturer warranties on materials."
    }
  ];

  return (
    <div className="space-y-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[640px] flex items-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white overflow-hidden py-16 sm:py-24">
        {/* Background Overlay Graphic */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#FD441B_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hero Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-brand-500/10 border border-brand-500/30 text-brand-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-brand-500" />
              <span>Kirkland & Greater Seattle's Premier General Contractor</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
              Crafting Exceptional Homes <span className="text-brand-500">For Every Season.</span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-light">
              From turnkey kitchen & bath remodels to seamless drywall repair, interior/exterior painting, and custom carpentry—we build enduring quality with licensed Washington craftsmanship.
            </p>

            {/* Badges & Trust Points */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                <CheckCircle className="w-4 h-4 text-brand-500 shrink-0" />
                <span>WA Lic# 4SEASSR801OR</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                <CheckCircle className="w-4 h-4 text-brand-500 shrink-0" />
                <span>Free On-Site Estimates</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                <CheckCircle className="w-4 h-4 text-brand-500 shrink-0" />
                <span>100% Insured & Bonded</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="#estimate-section"
                className="bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-sm uppercase tracking-wider px-8 py-4 rounded-full shadow-glow hover:shadow-xl transition-all text-center flex items-center justify-center gap-2"
              >
                <span>Get Free Estimate</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="tel:4254665469"
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm px-7 py-4 rounded-full transition text-center flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-brand-400" />
                <span>(425) 466-5469</span>
              </a>
            </div>
          </div>

          {/* Right Column: Hero Estimate Card */}
          <div className="lg:col-span-5" id="estimate-section">
            <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/60 rounded-3xl p-2 shadow-2xl">
              <div className="p-4 sm:p-6 text-center border-b border-slate-800">
                <span className="text-brand-400 text-xs font-black uppercase tracking-widest block mb-1">
                  Fast & No Obligation
                </span>
                <h3 className="text-xl font-extrabold text-white">
                  Schedule Your Free Estimate
                </h3>
              </div>
              <div className="p-2 sm:p-4">
                <EstimateForm defaultService="Kitchen & Bath Remodeling" source="Hero Form" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. STATS BAR */}
      <section className="max-w-7xl mx-auto px-6 -mt-10 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
          <div className="p-2">
            <div className="text-3xl sm:text-4xl font-black text-brand-500">10+</div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Years Experience</p>
          </div>
          <div className="p-2">
            <div className="text-3xl sm:text-4xl font-black text-brand-500">500+</div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Projects Completed</p>
          </div>
          <div className="p-2">
            <div className="text-3xl sm:text-4xl font-black text-brand-500">100%</div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Licensed & Bonded</p>
          </div>
          <div className="p-2">
            <div className="text-3xl sm:text-4xl font-black text-brand-500">5.0 ★</div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Client Satisfaction</p>
          </div>
        </div>
      </section>

      {/* 3. OUR CORE SPECIALIZATIONS (Exact layout and images matching user screenshot) */}
      <section className="max-w-7xl mx-auto px-6 py-12" id="services-section">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Our Core Specializations
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 max-w-2xl mx-auto leading-relaxed">
            Delivering perfection across home renovations, water damage restoration, painting, and flooring.
          </p>
        </div>

        {/* 6 Primary Cards in 3-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Kitchen & Bath Remodeling",
              slug: "kitchen-remodeling",
              image: "/images/gallery/WhatsApp Image 2026-07-10 at 2.00.51 PM.jpeg",
              icon: "fa-bath",
              description: "Luxury layout plans, premium cabinetry, quartz island installations, spa-grade walk-in showers, and elegant modern lighting solutions.",
              subcategories: ["Cabinetry & Countertops", "Showers & Bathtubs", "Tile & Backsplash", "Plumbing & Lighting"]
            },
            {
              title: "Water Damage Restoration",
              slug: "water-damage-restoration",
              image: "/images/gallery/WhatsApp Image 2026-07-10 at 2.01.06 PM.jpeg",
              icon: "fa-home",
              description: "Prompt and professional water extraction, drying, and structural repairs to restore your property after floods, leaks, or water intrusion.",
              subcategories: ["Water Extraction", "Structural Drying", "Mold Remediation", "Flood Rebuilding"]
            },
            {
              title: "Drywall Repair",
              slug: "drywall-painting",
              image: "/images/gallery/WhatsApp Image 2026-07-10 at 2.00.54 PM.jpeg",
              icon: "fa-hammer",
              description: "Seamless drywall repair, patching, hanging, and texturing. Whether fixing minor dents or water-damaged ceilings.",
              subcategories: ["Wall & Ceiling Patching", "Hanging & Taping", "Texture Matching", "Drywall Replacement"]
            },
            {
              title: "Interior & Exterior Painting",
              slug: "painting-interior",
              image: "/images/gallery/WhatsApp Image 2026-07-10 at 2.00.56 PM (1).jpeg",
              icon: "fa-paint-roller",
              description: "Premium residential and commercial painting with thorough surface preparation for vibrant, clean, and durable finishes.",
              subcategories: ["Walls & Ceilings", "Siding & Trim Painting", "Cabinet Refinishing", "Deck & Fence Staining"]
            },
            {
              title: "Flooring",
              slug: "flooring-carpentry",
              image: "/images/gallery/WhatsApp Image 2026-07-10 at 2.00.58 PM.jpeg",
              icon: "fa-tools",
              description: "Hardwood floor sanding, modern luxury vinyl plank (LVP) setups, custom trim moldings, and detailed porcelain tiling.",
              subcategories: ["Hardwood Flooring", "Luxury Vinyl Plank (LVP)", "Porcelain & Ceramic", "Subfloor Leveling"]
            },
            {
              title: "Home Renovation",
              slug: "general-remodeling",
              image: "/images/gallery/WhatsApp Image 2026-07-10 at 2.01.02 PM.jpeg",
              icon: "fa-home",
              description: "Complete home transformation services, including basement finishing, open-concept layouts, and room additions.",
              subcategories: ["Open-Concept Layouts", "Finished Basements", "Room Additions", "Structural Carpentry"]
            }
          ].map((service, index) => (
            <div 
              key={index}
              className="bg-white rounded-3xl border border-slate-200 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1.5"
            >
              <div>
                {/* Top Image Banner with Gradient & Floating Orange Icon */}
                <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Dark gradient overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent flex items-end p-6">
                    <h3 className="text-white font-extrabold text-xl tracking-tight leading-snug">
                      {service.title}
                    </h3>
                  </div>
                  {/* Floating Orange Icon on Top Right */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-brand-500 text-white rounded-2xl flex items-center justify-center text-base shadow-lg">
                    <i className={`fas ${service.icon}`}></i>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4">
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {service.description}
                  </p>

                  {/* Subcategories Badges */}
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                      SUB CATEGORIES
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {service.subcategories.map((sub, sIdx) => (
                        <span 
                          key={sIdx}
                          className="bg-slate-100 text-slate-700 text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-slate-200/60"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Action Link */}
              <div className="px-6 pb-6 pt-2">
                <Link 
                  to={`/services/${service.slug}`}
                  className="text-xs font-extrabold text-brand-500 hover:text-brand-600 inline-flex items-center gap-1.5 transition"
                >
                  <span>Explore Service</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Expandable Additional Services Grid */}
        {showAllServices && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 animate-fade-in">
            {extraServices.map((service) => (
              <div 
                key={service.id}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:border-brand-300 transition flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center text-lg mb-3">
                    <i className={`fas ${service.icon}`}></i>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-base mb-2">{service.title}</h4>
                  <p className="text-xs text-slate-600 mb-3">{service.description}</p>
                </div>
                <Link
                  to={`/services/${service.slug}`}
                  className="text-brand-600 font-bold text-xs hover:underline flex items-center gap-1 mt-2"
                >
                  <span>Learn more</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* View All / Show Less Toggle Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => setShowAllServices(!showAllServices)}
            className="inline-flex items-center gap-2.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider px-8 py-4 rounded-xl shadow-lg transition transform hover:-translate-y-0.5"
          >
            <span>{showAllServices ? 'Show Less Services' : 'View All Services'}</span>
            <i className="fas fa-th-large text-brand-500"></i>
          </button>
        </div>
      </section>

      {/* 4. BEFORE & AFTER TRANSFORMATION SHOWCASE */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-brand-400 font-extrabold uppercase tracking-widest text-xs">
              Real Transformations
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-2">
              Before & After Project Showcase
            </h2>
            <p className="text-slate-400 text-sm mt-3">
              Drag the interactive sliders to inspect the quality and precision of our kitchen, bathroom, and drywall restorations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {beforeAfterPairs.map((pair) => (
              <BeforeAfterSlider key={pair.id} {...pair} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/gallery"
              className="bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-xs uppercase tracking-wider px-8 py-4 rounded-full shadow-glow inline-flex items-center gap-2"
            >
              <span>View Full Photo Portfolio</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE US */}
      <section className="max-w-7xl mx-auto px-6 py-6">
        <div className="bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-14 shadow-xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-brand-500 font-black text-xs uppercase tracking-widest">
              Why Washington Homeowners Trust Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
              Uncompromising Quality, Transparent Estimates, Guaranteed Craftsmanship.
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              At 4 Seasons Right Services Inc., we take pride in doing the job right the first time. We eliminate the stress of home remodeling by providing clear communications, dust-contained job sites, and verified on-time completions.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-sm">
                  1
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">Washington Licensed & Fully Bonded</h4>
                  <p className="text-xs text-slate-500 mt-0.5">License #4SEASSR801OR with comprehensive liability and worker safety coverage.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-sm">
                  2
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">Master Trade Craftsmen</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Dedicated finish carpenters, certified drywall finishers, and master plumbers.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-sm">
                  3
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">Guaranteed Milestones & Fixed Pricing</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Transparent, itemized quotes with no hidden fees or unexpected delays.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src="/images/gallery/WhatsApp Image 2026-07-10 at 2.00.51 PM.jpeg"
              alt="General Contractor Kirkland WA"
              className="rounded-3xl shadow-2xl w-full h-[460px] object-cover"
            />
            <div className="absolute -bottom-6 -left-6 bg-slate-950 text-white p-6 rounded-2xl shadow-2xl border border-slate-800 max-w-xs hidden sm:block">
              <div className="flex items-center gap-2 text-brand-400 font-bold text-xs mb-1">
                <Star className="w-4 h-4 fill-brand-400" />
                <span>5.0 Star Rated Contractor</span>
              </div>
              <p className="text-xs text-slate-300">"Exceptional remodel! On time, meticulous attention to detail, and spotless clean-up every day."</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ ACCORDION SECTION */}
      <section className="max-w-4xl mx-auto px-6 py-6">
        <div className="text-center mb-10">
          <span className="text-brand-500 font-extrabold uppercase tracking-widest text-xs">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
            Frequently Asked Questions
          </h2>
        </div>

        <FAQAccordion items={homeFaqs} />
      </section>

    </div>
  );
}
