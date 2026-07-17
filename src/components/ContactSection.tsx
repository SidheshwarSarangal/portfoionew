import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { usePortfolioContent } from "../content";
import { Sparkles, ArrowRight, Code2, Download, Mail, Github } from "lucide-react";
import { trackEvent } from "../lib/analytics";
import SocialLinks from "./SocialLinks";

type SubmissionState = "idle" | "compiling" | "success" | "error";

const delay = (milliseconds: number) => new Promise<void>((resolve) => {
  window.setTimeout(resolve, milliseconds);
});

export default function ContactSection() {
  const { personalBio: PERSONAL_BIO, socialLinks } = usePortfolioContent();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");
  const [compilerLines, setCompilerLines] = useState<string[]>([]);
  const mountedRef = useRef(true);
  const loading = submissionState === "compiling";

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !email.trim() || !message.trim() || loading) return;

    const actionUrl = import.meta.env.VITE_GOOGLE_FORM_ACTION_URL?.trim() ?? "";
    const fieldEntries = {
      firstName: import.meta.env.VITE_GOOGLE_FORM_FIRST_NAME_ENTRY?.trim() ?? "",
      lastName: import.meta.env.VITE_GOOGLE_FORM_LAST_NAME_ENTRY?.trim() ?? "",
      email: import.meta.env.VITE_GOOGLE_FORM_EMAIL_ENTRY?.trim() ?? "",
      subject: import.meta.env.VITE_GOOGLE_FORM_SUBJECT_ENTRY?.trim() ?? "",
      message: import.meta.env.VITE_GOOGLE_FORM_MESSAGE_ENTRY?.trim() ?? "",
    };
    const validActionUrl = /^https:\/\/docs\.google\.com\/forms\/d\/e\/[A-Za-z0-9_-]+\/formResponse$/.test(actionUrl);
    const validEntries = Object.values(fieldEntries).every((entry) => /^entry\.\d+$/.test(entry));

    setSubmissionState("compiling");
    setCompilerLines(["$ g++ contact.cpp -std=c++17 -o send_message"]);

    await delay(260);
    if (!mountedRef.current) return;
    setCompilerLines((lines) => [...lines, "[1/3] validating required fields ........ ok"]);

    await delay(280);
    if (!mountedRef.current) return;
    setCompilerLines((lines) => [...lines, "[2/3] linking Google Forms transport ..."]);

    try {
      if (!validActionUrl || !validEntries) {
        throw new Error("Google Forms environment variables are incomplete.");
      }

      const body = new URLSearchParams({
        [fieldEntries.firstName]: firstName.trim(),
        [fieldEntries.lastName]: lastName.trim(),
        [fieldEntries.email]: email.trim(),
        [fieldEntries.subject]: subject.trim(),
        [fieldEntries.message]: message.trim(),
      });

      await fetch(actionUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });

      await delay(320);
      if (!mountedRef.current) return;
      setCompilerLines((lines) => [
        ...lines,
        "[3/3] submitting message .............. ok",
        "✓ build finished successfully",
        "process exited with code 0 · message submitted",
      ]);
      setSubmissionState("success");
      setFirstName("");
      setLastName("");
      setEmail("");
      setSubject("");
      setMessage("");
      trackEvent("contact_submit", { method: "google_forms" });
    } catch (error) {
      if (!mountedRef.current) return;
      const reason = error instanceof Error ? error.message : "Submission failed.";
      setCompilerLines((lines) => [
        ...lines,
        "✗ build failed",
        `error: ${reason}`,
        "process exited with code 1 · message not submitted",
      ]);
      setSubmissionState("error");
      trackEvent("contact_error", { method: "google_forms" });
    }
  };

  const currentYear = new Date().getFullYear();
  const resumeUrl = PERSONAL_BIO.resumeUrl?.startsWith("/")
    ? `${import.meta.env.BASE_URL}${PERSONAL_BIO.resumeUrl.slice(1)}`
    : PERSONAL_BIO.resumeUrl;
  const actionTileClass = "group relative flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-white/[0.035] text-neutral-300 shadow-sm shadow-black/30 transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-400/40 hover:bg-amber-400/10 hover:text-amber-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/60";
  const actionTooltipClass = "pointer-events-none absolute left-1/2 top-full z-30 mt-2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-full border border-white/15 bg-neutral-950/95 px-2.5 py-1 font-mono text-[10px] font-semibold tracking-wide text-white opacity-0 shadow-xl backdrop-blur-xl transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100";

  return (
    <footer id="contact" className="relative z-10 mx-auto w-full max-w-5xl border-t border-white/5 px-3 py-9 select-text sm:px-6 sm:py-12">
      
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.76fr)_minmax(0,1.24fr)] lg:gap-10 xl:gap-12">
        {/* Left Column: Stacked monumental header */}
        <div className="min-w-0 space-y-6">
          <h2 className="font-display text-[clamp(3.25rem,15vw,5.8rem)] font-extrabold leading-[0.9] tracking-[-0.055em] text-white select-none">
            Let's Work <br />
            Together
          </h2>
          <p className="max-w-sm pt-2 font-mono text-base font-light leading-7 text-neutral-400 sm:text-lg sm:leading-8">
            Got an idea, a project, or want to discuss full-stack systems? Let's connect.
          </p>

          <div className="flex flex-wrap gap-3 pt-4" aria-label="Contact and profile links">
            <SocialLinks
              links={socialLinks}
              size={25}
              tileSize="xlarge"
              includeLinkedIn
              showTooltip
              className="contents"
            />

            {resumeUrl && (
              <a
                href={resumeUrl}
                download="SIDHESHWAR SARANGAL RESUME 18.06.2026.pdf"
                className={actionTileClass}
                aria-label="Download resume"
              >
                <Download size={25} strokeWidth={1.8} />
                <span className={actionTooltipClass}>Resume</span>
              </a>
            )}

            <a
              href={`mailto:${PERSONAL_BIO.email}`}
              className={`${actionTileClass} hover:border-[#4285f4]/50 hover:bg-[#4285f4]/10 hover:text-[#7aa7ff]`}
              aria-label="Contact by email"
            >
              <Mail size={25} strokeWidth={1.8} />
              <span className={actionTooltipClass}>Contact</span>
            </a>
          </div>
        </div>

        {/* Right Column: compiler-style contact editor */}
        <form onSubmit={handleSubmit} className="min-w-0 overflow-hidden rounded-2xl border border-white/[0.12] bg-[#07080a]/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_28px_70px_rgba(0,0,0,0.3)] backdrop-blur-xl">
          <div className="flex h-14 items-center justify-between border-b border-white/[0.08] bg-white/[0.025] px-4 font-mono text-xs select-none sm:px-5 sm:text-sm">
            <div className="flex items-center gap-3">
              <span className="flex gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              </span>
              <span className="h-5 w-px bg-white/10" />
              <span className="flex items-center gap-2 font-medium text-neutral-200"><Code2 size={16} className="text-[#4285f4]" /> contact.cpp</span>
            </div>
            <span className="hidden text-neutral-600 min-[380px]:inline">C++17</span>
          </div>

          <div className="space-y-5 p-4 sm:p-6">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="space-y-2 text-left">
                <label className="flex gap-2 font-mono text-sm select-none">
                  <span className="text-neutral-500">01</span><span className="text-[#d8a0d2]">string</span><span className="text-neutral-300">first_name*</span>
                </label>
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder='"Your first name"' className="w-full rounded-lg border border-white/[0.08] bg-black/25 px-4 py-3.5 font-mono text-base text-white outline-none transition-colors placeholder:text-neutral-600 hover:border-white/15 focus:border-[#4285f4]/55 disabled:cursor-wait disabled:opacity-60" disabled={loading} required />
              </div>
              <div className="space-y-2 text-left">
                <label className="flex gap-2 font-mono text-sm select-none">
                  <span className="text-neutral-500">02</span><span className="text-[#d8a0d2]">string</span><span className="text-neutral-300">last_name</span>
                </label>
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder='"Your last name"' className="w-full rounded-lg border border-white/[0.08] bg-black/25 px-4 py-3.5 font-mono text-base text-white outline-none transition-colors placeholder:text-neutral-600 hover:border-white/15 focus:border-[#4285f4]/55 disabled:cursor-wait disabled:opacity-60" disabled={loading} />
              </div>
            </div>

            <div className="space-y-2 text-left">
              <label className="flex gap-2 font-mono text-sm select-none">
                <span className="text-neutral-500">03</span><span className="text-[#6edbc3]">const char*</span><span className="text-neutral-300">email*</span>
              </label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='"you@example.com"' className="w-full rounded-lg border border-white/[0.08] bg-black/25 px-4 py-3.5 font-mono text-base text-white outline-none transition-colors placeholder:text-neutral-600 hover:border-white/15 focus:border-[#4285f4]/55 disabled:cursor-wait disabled:opacity-60" disabled={loading} required />
            </div>

            <div className="space-y-2 text-left">
              <label className="flex gap-2 font-mono text-sm select-none">
                <span className="text-neutral-500">04</span><span className="text-[#d8a0d2]">string</span><span className="text-neutral-300">subject</span>
              </label>
              <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder='"Project idea"' className="w-full rounded-lg border border-white/[0.08] bg-black/25 px-4 py-3.5 font-mono text-base text-white outline-none transition-colors placeholder:text-neutral-600 hover:border-white/15 focus:border-[#4285f4]/55 disabled:cursor-wait disabled:opacity-60" disabled={loading} />
            </div>

            <div className="space-y-2 text-left">
              <label className="flex gap-2 font-mono text-sm select-none">
                <span className="text-neutral-500">05</span><span className="text-[#6edbc3]">message</span><span className="text-neutral-300">body*</span>
              </label>
              <textarea rows={5} value={message} onChange={(e) => setMessage(e.target.value)} placeholder='// Write your message here...' className="w-full resize-none rounded-lg border border-white/[0.08] bg-black/25 px-4 py-3.5 font-mono text-base leading-7 text-white outline-none transition-colors placeholder:text-neutral-600 hover:border-white/15 focus:border-[#4285f4]/55 disabled:cursor-wait disabled:opacity-60" disabled={loading} required />
            </div>

            {submissionState !== "idle" && (
              <div
                className={`relative overflow-hidden rounded-lg border bg-black/70 p-4 text-left font-mono text-xs leading-6 shadow-inner select-none sm:text-sm ${
                  submissionState === "success"
                    ? "border-emerald-500/25 text-emerald-300"
                    : submissionState === "error"
                      ? "border-red-500/25 text-red-300"
                      : "border-[#4285f4]/25 text-neutral-300"
                }`}
                role="status"
                aria-live="polite"
              >
                {loading && <span className="absolute right-3 top-3 h-2 w-2 animate-pulse rounded-full bg-[#4285f4] shadow-[0_0_12px_#4285f4]" />}
                {compilerLines.map((line, index) => (
                  <div key={`${index}-${line}`} className={index === compilerLines.length - 1 && loading ? "animate-pulse" : ""}>
                    {line}
                  </div>
                ))}
              </div>
            )}

            <button type="submit" disabled={loading} className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#4285f4]/30 bg-[#4285f4]/10 px-5 py-3.5 font-mono text-sm font-semibold text-[#7aa7ff] transition-all hover:border-[#4285f4]/60 hover:bg-[#4285f4]/20 hover:text-white active:scale-[0.98] disabled:opacity-50 select-none sm:w-auto sm:justify-start sm:px-6">
              <span>{loading ? "COMPILING & SUBMITTING..." : "RUN ./send_message"}</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="flex flex-col items-start gap-1 border-t border-white/[0.07] bg-black/30 px-4 py-2.5 font-mono text-[10px] uppercase tracking-wider text-neutral-500 select-none min-[420px]:flex-row min-[420px]:items-center min-[420px]:justify-between min-[420px]:text-xs sm:px-5">
            <span>Problems: {submissionState === "error" ? 1 : 0} &nbsp; Warnings: 0</span>
            <span>{submissionState === "success" ? "Build succeeded · Exit 0" : submissionState === "error" ? "Build failed · Exit 1" : "Ln 05, Col 01 · UTF-8"}</span>
          </div>
        </form>
      </div>

      {/* Integrated footer */}
      <div className="mt-14 border-t border-white/[0.08] pt-6 font-mono select-none" id="contact-footnote">
        <div className="flex flex-col items-center justify-between gap-4 text-xs font-medium uppercase tracking-[0.08em] text-neutral-400 sm:flex-row">
          <p className="text-center tracking-tight sm:text-left">
            © {currentYear} {PERSONAL_BIO.name.toUpperCase()}.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://github.com/SidheshwarSarangal/portfoionew"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 transition-colors hover:text-white"
            >
              <Github size={13} /> OPEN SOURCE CODE
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
