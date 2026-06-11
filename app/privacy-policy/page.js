export const metadata = {
  title: "Privacy Policy | PromptSelz",
  description: "Read the PromptSelz privacy policy covering cookies, analytics, Firebase usage, and AdSense advertising.",
};

export default function PrivacyPolicyPage() {
  return (
    <section className="bg-slate-950 text-slate-100 px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-10">
        <div>
          <p className="inline-flex rounded-full bg-cyan-500/20 px-3 py-1 text-sm font-semibold text-cyan-200">
            Privacy Policy
          </p>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Privacy and data transparency for PromptSelz users.
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            We value your privacy and strive to explain how PromptSelz collects, stores, and uses information while offering a safe marketplace experience.
          </p>
        </div>

        <div className="space-y-10 rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl shadow-slate-950/30">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">Cookies</h2>
            <p className="text-slate-300 leading-7">
              PromptSelz may use cookies and similar technologies to improve your experience, remember preferences, and analyze traffic.
              Cookies help us keep the site secure, personalize content, and provide consistent service across sessions.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">Analytics</h2>
            <p className="text-slate-300 leading-7">
              We use analytics tools to understand usage patterns, measure performance, and improve the marketplace.
              This includes aggregated data about page views, click behavior, and search activity, without exposing personal details.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">Firebase</h2>
            <p className="text-slate-300 leading-7">
              PromptSelz uses Firebase services to power authentication, database storage, and real-time product updates.
              Firebase may collect technical usage data and store application metadata as part of its standard operation.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">Google AdSense</h2>
            <p className="text-slate-300 leading-7">
              We display Google AdSense ads on our site to support ongoing development.
              AdSense may use cookies and device identifiers to serve relevant advertising and measure ad performance.
            </p>
            <p className="text-slate-300 leading-7">
              To learn more about AdSense data usage, visit Google’s AdSense privacy resources and advertising policies.
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
