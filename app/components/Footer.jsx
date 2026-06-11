import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">PromptSelz</p>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">
            The AI prompt marketplace for creative professionals, agencies, and teams who want better prompt workflows.
          </p>
        </div>

        <nav>
          <ul className="flex flex-wrap gap-4 text-sm font-medium text-slate-300">
            <li>
              <Link href="/about" className="transition hover:text-white">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="transition hover:text-white">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="transition hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="transition hover:text-white">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-slate-800 bg-slate-950/95 px-4 py-4 text-center text-xs text-slate-500 sm:px-6 lg:px-8">
        © {new Date().getFullYear()} PromptSelz. All rights reserved.
      </div>
    </footer>
  );
}
