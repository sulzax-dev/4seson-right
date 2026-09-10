import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { servicesData } from '../data/servicesData';

export default function EstimateForm({ defaultService = '', source = 'Website Form' }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: defaultService || 'Kitchen & Bath Remodeling',
    details: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, source }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess(true);
        setFormData({
          name: '',
          phone: '',
          email: '',
          service: 'Kitchen & Bath Remodeling',
          details: '',
        });
      } else {
        throw new Error(data.message || 'Failed to submit estimate request.');
      }
    } catch (err) {
      console.error('Booking form error:', err);
      setError(err.message || 'There was an issue sending your request. Please call (425) 466-5469 directly.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-8 text-center animate-fade-in shadow-lg">
        <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
          <CheckCircle className="w-8 h-8" />
        </div>
        <h4 className="text-2xl font-black text-emerald-950 mb-2">Estimate Request Received!</h4>
        <p className="text-emerald-800 text-sm max-w-md mx-auto leading-relaxed mb-6">
          Thank you for reaching out to 4 Seasons Right Services. Our contracting supervisor has received your project details via email and will contact you promptly at your phone number.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full transition"
        >
          Send Another Request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100">
      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-2xl flex items-start gap-3 text-xs leading-relaxed">
          <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Submission Notice</p>
            <p>{error}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Full Name <span className="text-brand-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Phone Number <span className="text-brand-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            placeholder="(425) 000-0000"
            className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Service Required <span className="text-brand-500">*</span>
          </label>
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition"
          >
            {servicesData.map((s) => (
              <option key={s.id} value={s.title}>
                {s.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
          Project Details & Requirements
        </label>
        <textarea
          name="details"
          rows="3"
          value={formData.details}
          onChange={handleChange}
          placeholder="Describe your project, timeline, location, or any specific requests..."
          className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition resize-none"
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 text-white font-extrabold text-sm uppercase tracking-wider py-4 rounded-xl shadow-glow hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Sending Request...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>Request Free In-Home Estimate</span>
          </>
        )}
      </button>

      <p className="text-[11px] text-center text-slate-400">
        🔒 We value your privacy. No spam. A licensed project supervisor will contact you directly.
      </p>
    </form>
  );
}
