import {
  ArrowRight,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  ClipboardList,
  Eye,
  LineChart,
  RefreshCcw,
  ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { brand } from "@/lib/brand";

const diagnosticAreas = [
  {
    icon: Eye,
    title: "Visibility",
    description:
      "See whether the business is getting enough of the right attention from local prospects."
  },
  {
    icon: LineChart,
    title: "Conversion",
    description:
      "Understand whether leads are turning into consultations, quotes, or paying customers."
  },
  {
    icon: RefreshCcw,
    title: "Retention",
    description:
      "Identify whether repeat business, reviews, and follow-up systems are being underused."
  },
  {
    icon: ShieldCheck,
    title: "Tracking",
    description:
      "Find out whether important numbers are clear enough to support confident decisions."
  }
];

const process = [
  {
    icon: ClipboardList,
    title: "1. Complete the assessment",
    description:
      "Answer a short set of questions about lead flow, operations, customer retention, and reporting."
  },
  {
    icon: ChartNoAxesCombined,
    title: "2. Review the diagnosis",
    description:
      "See which business area appears most likely to be slowing growth and why it matters."
  },
  {
    icon: BriefcaseBusiness,
    title: "3. Use the report",
    description:
      "Turn the findings into a polished summary that feels ready for planning, follow-up, or client review."
  }
];

export function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
      <section className="grid gap-10 rounded-[36px] border border-white/70 bg-hero-glow px-6 py-12 shadow-soft sm:px-8 md:px-12 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
        <div className="max-w-3xl">
          <span className="eyebrow">{brand.firmName}</span>
          <p className="mt-4 brand-copy">{brand.tagline}</p>
          <h1 className="mt-6 max-w-4xl font-[family-name:var(--font-display)] text-4xl leading-tight text-ink sm:text-5xl md:text-6xl">
            Find Out What&apos;s Really Slowing Your Business Growth
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            A simple, professional audit that helps identify whether your biggest issue is visibility, conversion, retention, or tracking.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button className="gap-2" href="/intake" variant="primary">
              Start the assessment <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="/report" variant="secondary">
              View sample report
            </Button>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              "Built for local service businesses",
              "Clear, non-technical findings",
              "Professional report-ready output"
            ].map((item) => (
              <div
                className="rounded-3xl border border-white/80 bg-white/80 px-5 py-4 shadow-card"
                key={item}
              >
                <p className="text-sm font-semibold text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="panel p-6 sm:p-8">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">
                {brand.productName}
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-ink">
                A polished diagnosis you can actually use.
              </h2>
            </div>
            <div className="rounded-full bg-navy-50 px-3 py-2 text-sm font-semibold text-navy-700">
              10 min intake
            </div>
          </div>

          <div className="mt-8 space-y-4">
            {[
              "Clear diagnosis of the likely growth issue",
              "Simple explanation in owner-friendly language",
              "Practical next-step recommendations",
              "A polished report layout for review or sharing"
            ].map((item) => (
              <div
                className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-4"
                key={item}
              >
                <div className="h-2.5 w-2.5 rounded-full bg-navy-700" />
                <p className="text-sm font-medium text-slate-700">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-[28px] bg-navy-900 p-6 text-white">
            <p className="text-sm uppercase tracking-[0.18em] text-white/65">Best suited for</p>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-white/85">
              <li>Local service businesses</li>
              <li>Advisors running discovery conversations</li>
              <li>Owners who want a clearer growth plan</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-24">
        <SectionHeading
          eyebrow="What it helps diagnose"
          title="The audit helps identify the business issue that deserves attention first."
          description="Instead of vague advice, the audit points to the area most likely holding back consistent growth."
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {diagnosticAreas.map((item) => {
            const Icon = item.icon;
            return (
              <article className="panel h-full p-6" key={item.title}>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-50 text-navy-700">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-500">{item.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mt-24 grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <SectionHeading
          eyebrow="How it works"
          title="A straightforward process designed to feel premium, simple, and trustworthy."
          description="The experience is structured like a real advisory tool, with a clean intake flow and a polished output that feels ready to share."
        />

        <div className="space-y-4">
          {process.map((item) => {
            const Icon = item.icon;
            return (
              <div className="panel p-6" key={item.title}>
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-navy-50 p-3 text-navy-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500">{item.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-24 rounded-[36px] bg-navy-900 px-8 py-12 text-white shadow-soft md:px-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/60">
              {brand.firmName}
            </p>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl leading-tight md:text-4xl">
              Get a clearer picture of what your business should fix first.
            </h2>
            <p className="mt-4 text-base leading-7 text-white/80">
              Start the assessment and move from guesswork to a more focused growth plan.
            </p>
          </div>
          <Button
            className="gap-2 self-start bg-white text-navy-900 hover:bg-slate-100"
            href="/intake"
          >
            Start the assessment <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  );
}

