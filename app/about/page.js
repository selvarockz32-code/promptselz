export const metadata = {
  title: "About | PromptSelz",
  description: "Learn how PromptSelz connects AI creators with premium prompts, templates, and marketplace tools.",
};

export default function AboutPage() {
  return (
    <section className="bg-slate-950 text-slate-100 px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="inline-flex rounded-full bg-cyan-500/20 px-3 py-1 text-sm font-semibold text-cyan-200">
            About PromptSelz
          </p>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            The AI prompt marketplace for creators, teams, and modern workflows.
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            PromptSelz is an AI prompt marketplace designed to help professionals discover, refine,
            and deploy high-quality prompts across design, content, productivity, social media, and more.
            We combine marketplace curation with smart browsing so every prompt can be used with confidence.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          <article className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl shadow-slate-950/40">
            <h2 className="text-xl font-semibold text-white">Curated prompt collections</h2>
            <p className="mt-4 text-slate-300 leading-7">
              Browse handpicked prompts for AI generation, marketing campaigns, productivity systems,
              and creative storytelling. Every entry is crafted for usability and results.
            </p>
          </article>
          <article className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl shadow-slate-950/40">
            <h2 className="text-xl font-semibold text-white">Built for modern usage</h2>
            <p className="mt-4 text-slate-300 leading-7">
              Use PromptSelz with ChatGPT, Midjourney, Bard, Claude, or any AI tool that accepts prompt input.
              Enjoy fast search, helpful categories, and prompt previews before you copy.
            </p>
          </article>
          <article className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl shadow-slate-950/40">
            <h2 className="text-xl font-semibold text-white">Community-driven growth</h2>
            <p className="mt-4 text-slate-300 leading-7">
              PromptSelz is designed to grow with creators. Whether you want to discover fresh ideas or launch
              your own prompt collection, our marketplace helps you reach the right audience.
            </p>
          </article>
        </div>

        <div className="mt-16 rounded-3xl border border-slate-800 bg-slate-900/80 p-8 lg:p-12">
          <h2 className="text-3xl font-semibold text-white">How PromptSelz works</h2>
          <div className="mt-8 space-y-8 text-slate-300">
            <div>
              <h3 className="text-xl font-semibold text-white">Search and discover</h3>
              <p className="mt-3 leading-7">
                Start by exploring our marketplace categories, optional filters, and trending prompts. Each prompt
                includes context, usage guidance, and a preview optimized for AI workflows.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">Preview before you use</h3>
              <p className="mt-3 leading-7">
                Preview prompt structure, recommended formatting, and suggested applications so you can use prompts
                immediately in your favorite AI models.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">Use with confidence</h3>
              <p className="mt-3 leading-7">
                PromptSelz helps you move faster with AI by providing ready-to-use prompts, templates, and a consistent
                marketplace experience across every prompt type.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
