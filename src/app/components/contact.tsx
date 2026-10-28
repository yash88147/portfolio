import { useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="flex flex-col justify-center h-full max-w-xl space-y-6">
      <div>
        <h2 className="text-3xl md:text-5xl font-bold text-white">
          05. <span className="text-lime-400">Get In Touch</span>
        </h2>
        <p className="text-sm md:text-base text-zinc-400 mt-1">
          Have a project in mind? Send a direct message below.
        </p>
      </div>

      {submitted ? (
        <div className="p-6 rounded-xl bg-lime-500/10 border border-lime-500/40 text-lime-300 space-y-3">
          <h3 className="text-xl font-bold">Message Sent!</h3>
          <p className="text-sm text-zinc-300">
            Thanks for reaching out. I&apos;ll get back to you within 24 hours.
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
          className="space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              required
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-lime-400"
            />
            <input
              type="email"
              required
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-lime-400"
            />
          </div>
          <textarea
            rows={3}
            required
            placeholder="Tell me about your project or timeline..."
            className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-lime-400 resize-none"
          />
          <button
            type="submit"
            className="px-6 py-3 font-semibold text-black bg-lime-400 hover:bg-lime-300 rounded-lg transition-colors cursor-pointer"
          >
            Send Message
          </button>
        </form>
      )}
    </div>
  );
}
