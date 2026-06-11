export const metadata = {
  title: "Contact | PromptSelz",
  description: "Contact PromptSelz to ask questions, request support, or share feedback about the AI prompt marketplace.",
};

export default function ContactPage() {
  return (
    <section className="bg-slate-950 text-slate-100 px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div>
            <p className="inline-flex rounded-full bg-cyan-500/20 px-3 py-1 text-sm font-semibold text-cyan-200">
              Contact PromptSelz
            </p>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Get in touch with our support and marketplace team.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              We’re here to help with prompt discovery, account questions, advertising, and developer feedback.
              Reach out anytime and we’ll reply as quickly as possible.
            </p>

            <div className="mt-10 rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl shadow-slate-950/30">
              <h2 className="text-xl font-semibold text-white">Email support</h2>
              <p className="mt-3 text-slate-300 leading-7">
                For general inquiries and support, email us at{' '}
                <a href="mailto:support@promptselz.ai" className="font-medium text-cyan-300 hover:text-cyan-200">
                  support@promptselz.ai
                </a>
                .
              </p>
              <p className="mt-4 text-slate-400">We typically respond within 24–48 business hours.</p>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl shadow-slate-950/30">
            <h2 className="text-2xl font-semibold text-white">Send a message</h2>
            <form className="mt-8 space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-300">
                  Full name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  className="mt-3 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="mt-3 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-300">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  placeholder="How can we help you today?"
                  className="mt-3 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
                />
              </div>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-2xl bg-cyan-500 px-6 py-3 text-base font-semibold text-slate-950 transition hover:bg-cyan-400 sm:w-auto"
              >
                Send message
              </button>
            </form>
            <p className="mt-6 text-sm text-slate-500">
              This form is a UI example. For actual message delivery, connect the form to your preferred email or backend service.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
