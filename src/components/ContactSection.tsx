import React, { useState } from "react";
import { motion } from "motion/react";
import { usePortfolioContent } from "../content";
import { Sparkles, ArrowRight } from "lucide-react";

export default function ContactSection() {
  const { personalBio: PERSONAL_BIO } = usePortfolioContent();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !email || !message) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      // Reset
      setFirstName("");
      setLastName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setTimeout(() => setSubmitted(false), 5000);
    }, 1200);
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="max-w-5xl mx-auto px-6 py-10 border-t border-white/5 relative z-10 select-text">
      
      {/* Commentary Marker */}
      <div className="font-mono text-[11px] text-neutral-600 mb-6 flex items-center gap-1 select-none">
        <span>&lt;!--</span>
        <span className="text-neutral-500 font-medium">Get in Touch</span>
        <span>--&gt;</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Column: Stacked monumental header */}
        <div className="md:col-span-5 space-y-4">
          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tighter leading-[0.95] select-none">
            Let's Work <br />
            Together
          </h2>
          <p className="font-sans text-neutral-450 text-xs sm:text-sm font-light leading-relaxed max-w-xs pt-2">
            Got an idea, a project, or want to discuss full-stack systems? Let's connect.
          </p>
        </div>

        {/* Right Column: Dynamic Form fields */}
        <form onSubmit={handleSubmit} className="md:col-span-7 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5 text-left">
              <label className="block font-mono text-[10px] text-neutral-500 uppercase tracking-widest font-semibold select-none">
                First Name*
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Mazakine"
                className="w-full bg-[#0d0e10]/40 border border-white/5 hover:border-white/10 focus:border-white/20 rounded-lg py-2.5 px-3.5 font-sans text-xs text-white focus:outline-none transition-colors"
                required
              />
            </div>
            <div className="space-y-1.5 text-left">
              <label className="block font-mono text-[10px] text-neutral-500 uppercase tracking-widest font-semibold select-none">
                Last Name*
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Reed"
                className="w-full bg-[#0d0e10]/40 border border-white/5 hover:border-white/10 focus:border-white/20 rounded-lg py-2.5 px-3.5 font-sans text-xs text-white focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5 text-left">
            <label className="block font-mono text-[10px] text-neutral-500 uppercase tracking-widest font-semibold select-none">
              Email Address*
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              className="w-full bg-[#0d0e10]/40 border border-white/5 hover:border-white/10 focus:border-white/20 rounded-lg py-2.5 px-3.5 font-sans text-xs text-white focus:outline-none transition-colors"
              required
            />
          </div>

          <div className="space-y-1.5 text-left">
            <label className="block font-mono text-[10px] text-neutral-500 uppercase tracking-widest font-semibold select-none">
              Subject*
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Tell us the purpose"
              className="w-full bg-[#0d0e10]/40 border border-white/5 hover:border-white/10 focus:border-white/20 rounded-lg py-2.5 px-3.5 font-sans text-xs text-white focus:outline-none transition-colors"
            />
          </div>

          <div className="space-y-1.5 text-left">
            <label className="block font-mono text-[10px] text-neutral-500 uppercase tracking-widest font-semibold select-none">
              Message*
            </label>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message here"
              className="w-full bg-[#0d0e10]/40 border border-[#ffffff08] hover:border-white/10 focus:border-white/20 rounded-lg py-2.5 px-3.5 font-sans text-xs text-white focus:outline-none resize-none transition-colors"
              required
            />
          </div>

          {/* Form Feedbacks */}
          {submitted && (
            <div className="p-3 bg-emerald-500/5 border border-emerald-500/10 text-emerald-400 font-mono text-[10px] rounded-lg text-left select-none">
              Payload transmitted safely. Sidheshwar will be in touch shortly!
            </div>
          )}

          <div className="flex justify-start pt-2">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-[#090a0c] border border-white/10 text-white font-mono text-[10px] rounded hover:bg-amber-450 hover:text-black hover:border-amber-450 active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 select-none"
            >
              <span>{loading ? "TRANSMITTING..." : "Send message"}</span>
              <ArrowRight size={11} />
            </button>
          </div>
        </form>
      </div>

      {/* FOOTER FOOTNOTE */}
      <div className="border-t border-white/5 mt-10 pt-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500 font-mono text-[9px] select-none uppercase tracking-wider" id="contact-footnote">
        <p className="tracking-tight text-center sm:text-left">
          (c) {currentYear} {PERSONAL_BIO.name.toUpperCase()} - BUILT FROM IIT ROORKEE.
        </p>
        <div className="flex gap-4">
          <a href="https://github.com/mrsidverse/mrsid.in" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
            OPEN SOURCE CODE
          </a>
          <span>-</span>
          <span className="text-amber-400 flex items-center gap-1 font-bold">
            <Sparkles size={10} /> STAY PERSISTENT
          </span>
        </div>
      </div>

    </footer>
  );
}
