import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

const DOT_PATTERN = {
  backgroundImage:
    "radial-gradient(rgba(0,0,0,0.1) 1.5px, transparent 1.5px)",
  backgroundSize: "32px 32px",
};

const NAV_LINKS = [
  { href: "/plan", label: "Plan" },
  { href: "/training", label: "Training" },
  { href: "/tracker", label: "Tracker" },
];

const PILLARS = [
  {
    title: "Diet",
    body: "A 7-day meal plan matched to your targets — no guesswork, no fad macros.",
    color: "bg-yellow",
  },
  {
    title: "Training",
    body: "A split chosen for your experience level, with progressive overload built in week by week.",
    color: "bg-sage",
  },
  {
    title: "Tracking",
    body: "Log weight, waist, steps, sleep — the plan adjusts as your data comes in.",
    color: "bg-foreground",
  },
];

const SERVICES = [
  {
    title: "The Diet Engine",
    body: "Meals matched to your calorie target and macros, computed from your own numbers.",
    href: "/plan",
  },
  {
    title: "The Training Split",
    body: "A weekly split scaled to your experience level, with a built-in progression curve.",
    href: "/training",
  },
  {
    title: "The Daily Tracker",
    body: "Weight, waist, steps, sleep — logged in seconds, feeding straight back into your plan.",
    href: "/tracker",
  },
];

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}

// Layered "echo" effect: 4 offset background copies fading out behind the
// solid foreground word, like the original design - recolored from grays
// (which assumed a white background) to fading black, since this sits on
// the fixed yellow hero.
function EchoText({ text }: { text: string }) {
  const echoes = [
    { offset: 0.04, opacity: 0.22 },
    { offset: 0.08, opacity: 0.15 },
    { offset: 0.12, opacity: 0.1 },
    { offset: 0.16, opacity: 0.06 },
  ];
  return (
    <span className="relative inline-block">
      {echoes
        .slice()
        .reverse()
        .map(({ offset, opacity }) => (
          <span
            key={offset}
            aria-hidden
            className="pointer-events-none absolute inset-0 text-black"
            style={{
              transform: `translate(-${offset}em, -${offset}em)`,
              opacity,
            }}
          >
            {text}
          </span>
        ))}
      <span className="relative text-black">{text}</span>
    </span>
  );
}

export default function Home() {
  return (
    <div className="bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b-2 border-black bg-yellow">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 md:px-8">
          <span className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-md border-2 border-black bg-black text-sm font-extrabold text-yellow">
              P
            </span>
            <span className="font-display text-lg font-extrabold tracking-tight text-black">
              PACE
            </span>
          </span>
          <nav className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-xs font-bold uppercase tracking-widest text-black/70 transition-colors hover:text-black"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/signup"
              className="rounded-lg border-2 border-black bg-black px-4 py-2 text-xs font-bold uppercase tracking-widest text-yellow shadow-[3px_3px_0_0_#000] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
            >
              Get started
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section
          className="relative flex flex-col items-center gap-7 overflow-hidden border-b-2 border-black bg-yellow px-6 py-20 text-center"
          style={DOT_PATTERN}
        >
          <span className="rounded-full border-2 border-black bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-black">
            Built from the book, not guesswork
          </span>
          <h1 className="font-display text-6xl font-extrabold tracking-tighter sm:text-7xl">
            <EchoText text="PACE" />
          </h1>
          <p className="max-w-sm text-base font-medium leading-relaxed text-black/70">
            A fat-loss plan computed from your actual biometrics — diet,
            training, and a daily tracker that adapts as you go.
          </p>
          <div className="flex w-full max-w-xs flex-col gap-3 sm:w-auto sm:flex-row">
            <Link
              href="/signup"
              className="rounded-xl border-2 border-black bg-black px-8 py-4 text-sm font-bold uppercase tracking-widest text-white shadow-[6px_6px_0_0_#000] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
            >
              Get started
            </Link>
            <Link
              href="/login"
              className="rounded-xl border-2 border-black bg-white px-8 py-4 text-sm font-bold uppercase tracking-widest text-black shadow-[4px_4px_0_0_#000] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
            >
              Log in
            </Link>
          </div>
        </section>

        {/* Statement */}
        <section className="mx-auto max-w-3xl px-6 py-20 text-center">
          <p className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
            Fat loss isn&rsquo;t a mystery. It&rsquo;s arithmetic — done
            consistently, every day.
          </p>
        </section>

        {/* Pillars */}
        <section className="border-y-2 border-border bg-background px-6 py-16">
          <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-3">
            {PILLARS.map((p) => (
              <div key={p.title} className="card">
                <div
                  className={`mb-4 h-10 w-10 rounded-lg border-2 border-border ${p.color}`}
                />
                <h3 className="font-display text-xl font-bold tracking-tight">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm font-medium leading-relaxed text-muted">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Services */}
        <section className="mx-auto max-w-5xl px-6 py-20">
          <h2 className="font-display mb-10 text-center text-3xl font-bold tracking-tight">
            One system, three parts
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {SERVICES.map((s) => (
              <Link
                key={s.title}
                href={s.href}
                className="card group flex flex-col gap-4 transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--shadow-color)]"
              >
                <h3 className="font-display text-lg font-bold tracking-tight">
                  {s.title}
                </h3>
                <p className="text-sm font-medium leading-relaxed text-muted">
                  {s.body}
                </p>
                <span className="mt-auto inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                  Explore
                  <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section
          className="border-y-2 border-black bg-yellow px-6 py-20 text-center"
          style={DOT_PATTERN}
        >
          <h2 className="font-display mx-auto max-w-lg text-4xl font-extrabold tracking-tight text-black">
            Your numbers. Your plan. No guesswork.
          </h2>
          <Link
            href="/signup"
            className="mt-8 inline-flex rounded-xl border-2 border-black bg-black px-8 py-4 text-sm font-bold uppercase tracking-widest text-white shadow-[6px_6px_0_0_#000] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
          >
            Get started free
          </Link>
        </section>
      </main>

      <footer className="bg-charcoal px-6 py-12 text-white/60">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
          <span className="font-display text-base font-extrabold tracking-tight text-white">
            PACE
          </span>
          <nav className="flex gap-6">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-xs font-bold uppercase tracking-widest transition-colors hover:text-white"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <p className="text-xs">A fat-loss plan computed from your biometrics.</p>
        </div>
      </footer>
    </div>
  );
}
