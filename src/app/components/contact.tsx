import { useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="flex flex-col justify-center h-full max-w-2xl space-y-5">
      <div>
        <h2 className="text-3xl md:text-5xl font-bold text-white">
          05. <span className="text-lime-400">Contact Me</span>
        </h2>
        <p className="text-xs md:text-base text-zinc-400 mt-1">
          Need an animated landing page, Figma-to-Next.js build, or SaaS UI?
          Let&apos;s talk.
        </p>
        <div className="flex flex-wrap gap-4 text-xs font-mono text-zinc-300 mt-3">
          <a
            href="mailto:yash88147@gmail.com"
            className="hover:text-lime-400 transition-colors"
          >
            ✉ yash88147@gmail.com
          </a>
          <span>📞 +91 9893221960</span>
          <span>📍 Indore, MP, India</span>
        </div>
      </div>

      {submitted ? (
        <div className="p-6 rounded-xl bg-lime-500/10 border border-lime-500/40 text-lime-300 space-y-3">
          <h3 className="text-xl font-bold">Inquiry Received!</h3>
          <p className="text-sm text-zinc-300">
            Thanks for reaching out! I&apos;ll review your frontend requirements
            and reply within 24 hours.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="text-xs underline text-lime-400 cursor-pointer"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
          className="space-y-3.5"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <input
              type="text"
              required
              placeholder="Your Name / Company"
              className="w-full px-4 py-2.5 text-sm rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-lime-400"
            />
            <input
              type="email"
              required
              placeholder="you@company.com"
              className="w-full px-4 py-2.5 text-sm rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-lime-400"
            />
          </div>
          <textarea
            rows={3}
            required
            placeholder="Tell me about your Figma design, landing page, or React UI needs..."
            className="w-full px-4 py-2.5 text-sm rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-lime-400 resize-none"
          />
          <button
            type="submit"
            className="px-6 py-2.5 text-sm font-semibold text-black bg-lime-400 hover:bg-lime-300 rounded-lg transition-colors cursor-pointer"
          >
            Send Project Inquiry
          </button>
        </form>
      )}
    </div>
  );
}