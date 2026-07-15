import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { usePortfolioContent } from "../content";
import { Sparkles, ArrowRight, Code2 } from "lucide-react";
import { trackEvent } from "../lib/analytics";

export default function ContactSection() {
  const { personalBio: PERSONAL_BIO, socialLinks } = usePortfolioContent();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const submitTimerRef = useRef<number | null>(null);
  const submittedTimerRef = useRef<number | null>(null);

  useEffect(() => () => {
    if (submitTimerRef.current !== null) window.clearTimeout(submitTimerRef.current);
    if (submittedTimerRef.current !== null) window.clearTimeout(submittedTimerRef.current);
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!firstName || !email || !message) return;

    setLoading(true);
    const mailSubject = subject || `Portfolio enquiry from ${firstName} ${lastName}`.trim();
    const mailBody = `${message}\n\nFrom: ${firstName} ${lastName}\nEmail: ${email}`;
    window.location.href = `mailto:${PERSONAL_BIO.email}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;
    trackEvent("contact_submit", { method: "mailto" });
    submitTimerRef.current = window.setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      // Reset
      setFirstName("");
      setLastName("");
      setEmail("");
      setSubject("");
      setMessage("");
      submitTimerRef.current = null;
      submittedTimerRef.current = window.setTimeout(() => {
        setSubmitted(false);
        submittedTimerRef.current = null;
      }, 5000);
    }, 300);
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="relative z-10 mx-auto w-full max-w-5xl border-t border-white/5 px-4 py-10 select-text sm:px-6 sm:py-12">
      
      <div
        className="grid items-start gap-10 xl:gap-12"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))" }}
      >
        {/* Left Column: Stacked monumental header */}
        <div className="min-w-0 space-y-6">
          <h2 className="font-display text-[clamp(4rem,7vw,5.8rem)] font-extrabold leading-[0.88] tracking-[-0.055em] text-white select-none">
            Let's Work <br />
            Together
          </h2>
          <p className="max-w-sm pt-2 font-mono text-base font-light leading-7 text-neutral-400 sm:text-lg sm:leading-8">
            Got an idea, a project, or want to discuss full-stack systems? Let's connect.
          </p>
        </div>

        {/* Right Column: compiler-style contact editor */}
        <form onSubmit={handleSubmit} className="min-w-0 overflow-hidden rounded-2xl border border-white/[0.12] bg-[#07080a]/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_28px_70px_rgba(0,0,0,0.3)] backdrop-blur-xl">
          <div className="flex h-14 items-center justify-between border-b border-white/[0.08] bg-white/[0.025] px-5 font-mono text-sm select-none">
            <div className="flex items-center gap-3">
              <span className="flex gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              </span>
              <span className="h-5 w-px bg-white/10" />
              <span className="flex items-center gap-2 font-medium text-neutral-200"><Code2 size={16} className="text-[#4285f4]" /> contact.cpp</span>
            </div>
            <span className="text-neutral-600">C++17</span>
          </div>

          <div className="space-y-5 p-5 sm:p-6">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="space-y-2 text-left">
                <label className="flex gap-2 font-mono text-sm select-none">
                  <span className="text-neutral-500">01</span><span className="text-[#d8a0d2]">string</span><span className="text-neutral-300">first_name*</span>
                </label>
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder='"Your first name"' className="w-full rounded-lg border border-white/[0.08] bg-black/25 px-4 py-3.5 font-mono text-base text-white outline-none transition-colors placeholder:text-neutral-600 hover:border-white/15 focus:border-[#4285f4]/55" required />
              </div>
              <div className="space-y-2 text-left">
                <label className="flex gap-2 font-mono text-sm select-none">
                  <span className="text-neutral-500">02</span><span className="text-[#d8a0d2]">string</span><span className="text-neutral-300">last_name</span>
                </label>
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder='"Your last name"' className="w-full rounded-lg border border-white/[0.08] bg-black/25 px-4 py-3.5 font-mono text-base text-white outline-none transition-colors placeholder:text-neutral-600 hover:border-white/15 focus:border-[#4285f4]/55" />
              </div>
            </div>

            <div className="space-y-2 text-left">
              <label className="flex gap-2 font-mono text-sm select-none">
                <span className="text-neutral-500">03</span><span className="text-[#6edbc3]">const char*</span><span className="text-neutral-300">email*</span>
              </label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='"you@example.com"' className="w-full rounded-lg border border-white/[0.08] bg-black/25 px-4 py-3.5 font-mono text-base text-white outline-none transition-colors placeholder:text-neutral-600 hover:border-white/15 focus:border-[#4285f4]/55" required />
            </div>

            <div className="space-y-2 text-left">
              <label className="flex gap-2 font-mono text-sm select-none">
                <span className="text-neutral-500">04</span><span className="text-[#d8a0d2]">string</span><span className="text-neutral-300">subject</span>
              </label>
              <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder='"Project idea"' className="w-full rounded-lg border border-white/[0.08] bg-black/25 px-4 py-3.5 font-mono text-base text-white outline-none transition-colors placeholder:text-neutral-600 hover:border-white/15 focus:border-[#4285f4]/55" />
            </div>

            <div className="space-y-2 text-left">
              <label className="flex gap-2 font-mono text-sm select-none">
                <span className="text-neutral-500">05</span><span className="text-[#6edbc3]">message</span><span className="text-neutral-300">body*</span>
              </label>
              <textarea rows={5} value={message} onChange={(e) => setMessage(e.target.value)} placeholder='// Write your message here...' className="w-full resize-none rounded-lg border border-white/[0.08] bg-black/25 px-4 py-3.5 font-mono text-base leading-7 text-white outline-none transition-colors placeholder:text-neutral-600 hover:border-white/15 focus:border-[#4285f4]/55" required />
            </div>

            {submitted && (
              <div className="rounded-lg border border-emerald-500/15 bg-emerald-500/5 p-3.5 text-left font-mono text-sm text-emerald-400 select-none">
                ✓ Email draft opened. Send it from your mail app to complete your message.
              </div>
            )}

            <button type="submit" disabled={loading} className="flex cursor-pointer items-center gap-2 rounded-lg border border-[#4285f4]/30 bg-[#4285f4]/10 px-6 py-3.5 font-mono text-sm font-semibold text-[#7aa7ff] transition-all hover:border-[#4285f4]/60 hover:bg-[#4285f4]/20 hover:text-white active:scale-[0.98] disabled:opacity-50 select-none">
              <span>{loading ? "COMPILING..." : "RUN ./send_message"}</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.07] bg-black/30 px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-neutral-500 select-none">
            <span>Problems: 0 &nbsp; Warnings: 0</span>
            <span>Ln 05, Col 01 · UTF-8</span>
          </div>
        </form>
      </div>

      {/* Integrated connect footer */}
      <div className="mt-14 border-t border-white/[0.08] pt-8 font-mono select-none" id="contact-footnote">
        <div className="flex flex-col gap-5 border-b border-white/[0.06] pb-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-base font-semibold uppercase tracking-[0.18em] text-amber-400">Connect</p>
            <p className="mt-2 text-base leading-7 text-neutral-400">Find me across the web.</p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-3" aria-label="Social links">
            {socialLinks.filter((link) => link.url).map((link) => {
              const isExternal = !link.url.startsWith("mailto:");
              return (
                <a
                  key={link.platform}
                  href={link.url}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="text-sm font-medium uppercase tracking-[0.1em] text-neutral-300 transition-colors hover:text-white"
                >
                  {link.platform}
                </a>
              );
            })}
          </nav>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pt-6 text-xs font-medium uppercase tracking-[0.08em] text-neutral-400 sm:flex-row">
          <p className="text-center tracking-tight sm:text-left">
            © {currentYear} {PERSONAL_BIO.name.toUpperCase()} · BUILT FROM IIT ROORKEE.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="https://github.com/mrsidverse/mrsid.in" target="_blank" rel="noreferrer" className="transition-colors hover:text-white">
              OPEN SOURCE CODE
            </a>
            <span className="flex items-center gap-1 font-bold text-amber-400">
              <Sparkles size={13} /> STAY PERSISTENT
            </span>
          </div>
        </div>
      </div>

    </footer>
  );
}
