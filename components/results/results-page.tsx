"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CircleAlert, Download, LineChart, RotateCcw, Sparkles } from "lucide-react";
import { brand } from "@/lib/brand";
import { buildRecommendations } from "@/lib/recommendations";
import { downloadAuditReport } from "@/lib/pdfReport";
import { clearAuditResult, loadAuditResult, saveLeadSubmission } from "@/lib/storage";
import type { PersistedAuditResult, RecommendationArea } from "@/lib/types";
import { Button } from "@/components/ui/button";

const contactInputClassName =
  "mt-2 w-full rounded-2xl border border-[#dfd3c6] bg-white/95 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-tan-500 focus:ring-2 focus:ring-tan-100";

const serviceOptions = [
  {
    title: "Audit Review Call",
    meta: "30-45 minutes",
    description:
      "We walk through your results together and clarify exactly what to focus on first."
  },
  {
    title: "Growth Plan Buildout",
    meta: "Strategy + execution roadmap",
    description:
      "We turn this audit into a step-by-step implementation plan tailored to your business."
  },
  {
    title: "Ongoing Growth Support",
    meta: "Accountability + execution",
    description:
      "We help implement and track your marketing and growth systems over time."
  }
] as const;

export function ResultsPage() {
  const [result, setResult] = useState<PersistedAuditResult | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isLeadSubmitted, setIsLeadSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    helpRequest: ""
  });
  const router = useRouter();

  useEffect(() => {
    const loaded = loadAuditResult();
    if (!loaded) {
      return;
    }

    setResult(loaded);
    setContactForm((current) => ({
      ...current,
      businessName: loaded.businessName
    }));
  }, []);

  const recommendations = useMemo(() => {
    if (!result) {
      return null;
    }

    return buildRecommendations(result);
  }, [result]);

  async function handleDownloadPdf() {
    if (!result) {
      return;
    }

    try {
      setIsExporting(true);
      downloadAuditReport(result);
    } finally {
      setIsExporting(false);
    }
  }

  function handleStartNewAudit() {
    clearAuditResult();
    router.push("/intake");
  }

  function openContactForm(helpRequest?: string) {
    setIsLeadSubmitted(false);
    setContactForm((current) => ({
      ...current,
      businessName: result?.businessName ?? current.businessName,
      helpRequest: helpRequest ?? current.helpRequest
    }));
    setIsContactOpen(true);
  }

  function closeContactForm() {
    setIsContactOpen(false);
  }

  function updateContactField(field: keyof typeof contactForm, value: string) {
    setContactForm((current) => ({
      ...current,
      [field]: value
    }));
  }

  function handleLeadSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!contactForm.name.trim() || !contactForm.email.trim() || !contactForm.businessName.trim()) {
      return;
    }

    saveLeadSubmission({
      name: contactForm.name.trim(),
      email: contactForm.email.trim(),
      phone: contactForm.phone.trim(),
      businessName: contactForm.businessName.trim(),
      helpRequest: contactForm.helpRequest.trim()
    });

    setIsLeadSubmitted(true);
    setContactForm({
      name: "",
      email: "",
      phone: "",
      businessName: result?.businessName ?? "",
      helpRequest: ""
    });
  }

  if (!result || !recommendations) {
    return (
      <div className="mx-auto max-w-5xl px-6 pb-24 lg:px-10">
        <section className="panel px-8 py-12 text-center md:px-12">
          <span className="eyebrow">{brand.firmName}</span>
          <h1 className="mt-5 font-[family-name:var(--font-display)] text-4xl leading-tight text-ink md:text-5xl">
            No audit results are open right now
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-600">
            Start a new audit or reopen a saved one to view recommendations, download the PDF report, and continue the workflow.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="/intake">Start New Audit</Button>
            <Button href="/saved-audits" variant="secondary">
              Open Saved Audits
            </Button>
          </div>
        </section>
      </div>
    );
  }

  const generatedDate = new Date(result.generatedAt).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
      <section className="panel px-8 py-10 md:px-10">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-4xl">
            <span className="eyebrow">{brand.firmName}</span>
            <p className="mt-4 brand-copy">{brand.tagline}</p>
            <h1 className="mt-5 font-[family-name:var(--font-display)] text-4xl leading-tight text-ink md:text-5xl">
              {result.businessName}: Growth Diagnostic
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
              {recommendations.executiveSummary}
            </p>
          </div>
          <div className="rounded-[28px] bg-tan-500 px-6 py-5 text-white xl:max-w-sm">
            <p className="text-sm uppercase tracking-[0.2em] text-white/75">Top line view</p>
            <p className="mt-3 text-xl font-semibold">
              Primary focus: {result.diagnosis.primaryIssue.category}
            </p>
            <p className="mt-2 text-sm leading-6 text-white/80">
              Secondary pressure is coming from {result.diagnosis.secondaryIssue.category.toLowerCase()} and {result.diagnosis.tertiaryIssue.category.toLowerCase()}.
            </p>
            <p className="mt-3 text-sm text-white/80">Generated {generatedDate}</p>
          </div>
        </div>
      </section>

      <div className="mt-8 grid gap-6 xl:grid-cols-[0.72fr_1.28fr]">
        <div className="space-y-6">
          <section className="panel p-7">
            <div className="flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-tan-700" />
              <h2 className="text-lg font-semibold text-ink">Executive Summary</h2>
            </div>
            <p className="mt-5 text-sm leading-7 text-slate-600">
              {recommendations.executiveSummary}
            </p>
          </section>

          <section className="panel p-7">
            <div className="flex items-center gap-3">
              <CircleAlert className="h-5 w-5 text-tan-700" />
              <h2 className="text-lg font-semibold text-ink">Top Issues</h2>
            </div>
            <div className="mt-6 space-y-4">
              <RankCard label="Primary Issue" item={result.diagnosis.primaryIssue} />
              <RankCard label="Secondary Issue" item={result.diagnosis.secondaryIssue} />
              <RankCard label="Tertiary Issue" item={result.diagnosis.tertiaryIssue} />
            </div>
          </section>

          <section className="panel p-7">
            <h2 className="text-lg font-semibold text-ink">Business Snapshot</h2>
            <dl className="mt-6 space-y-4 text-sm">
              <SummaryRow label="Business" value={result.intake.businessName} />
              <SummaryRow label="Contact" value={result.intake.contactName} />
              <SummaryRow label="Business type" value={result.intake.businessType} />
              <SummaryRow label="Locations" value={result.intake.locationCount} />
              <SummaryRow label="Main goal" value={result.intake.mainGoal} />
            </dl>
          </section>
        </div>

        <div className="space-y-6">
          <section className="panel p-7">
            <div className="flex items-center gap-3">
              <LineChart className="h-5 w-5 text-tan-700" />
              <h2 className="text-xl font-semibold text-ink">Category Scores</h2>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {result.diagnosis.scores.map((item) => (
                <article
                  className="rounded-[26px] border border-[#e6ddd3] bg-slate-50/70 p-5"
                  key={item.category}
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-semibold text-ink">{item.category}</p>
                    <p className="text-xl font-semibold text-tan-700">{item.score}</p>
                  </div>
                  <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-white">
                    <div
                      className="h-full rounded-full bg-tan-500"
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </article>
              ))}
            </div>
          </section>

          <ReportSection
            body={recommendations.likelyMeans}
            title="What This Likely Means"
          />
          <PriorityAreaSection areas={recommendations.priorityAreas} />
          <ReportSection
            body={recommendations.actionPlan30}
            title="30-Day Action Plan"
            variant="numbered"
          />
          <ReportSection
            body={recommendations.growthFocus90}
            title="90-Day Growth Focus"
            variant="numbered"
          />
          <ReportSection
            body={recommendations.suggestedKpis}
            title="Suggested KPIs to Track"
            variant="chips"
          />
        </div>
      </div>

      <section className="mt-8 flex flex-col gap-4 rounded-[32px] bg-white px-8 py-8 shadow-card md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-semibold text-ink">Ready to save or run another audit?</p>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Download the client-ready report or begin a new audit with a fresh intake.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button className="gap-2" onClick={handleDownloadPdf} type="button">
            <Download className="h-4 w-4" />
            {isExporting ? "Preparing PDF..." : "Download PDF Report"}
          </Button>
          <Button href="/saved-audits" variant="secondary">
            Saved Audits
          </Button>
          <Button onClick={handleStartNewAudit} type="button" variant="secondary">
            <RotateCcw className="mr-2 h-4 w-4" />
            Start New Audit
          </Button>
        </div>
      </section>

      <section className="mt-8 panel p-7 md:p-9">
        <div className="max-w-3xl">
          <span className="eyebrow">Consulting support</span>
          <h2 className="mt-4 text-3xl font-semibold text-ink md:text-4xl">
            Next Steps: Turn This Plan Into Results
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-600">
            If you want support putting these recommendations into action, we can help you move from diagnosis to implementation without adding complexity.
          </p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {serviceOptions.map((option) => (
            <article
              className="rounded-[28px] border border-[#e6d9cb] bg-[#fbf6ef] p-6"
              key={option.title}
            >
              <p className="text-base font-semibold text-ink">{option.title}</p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-tan-700">
                {option.meta}
              </p>
              <p className="mt-4 text-sm leading-7 text-slate-600">{option.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button onClick={() => openContactForm("I would like to schedule an audit review call.")} type="button">
            Schedule a Review
          </Button>
          <Button
            onClick={() =>
              openContactForm("I would like help implementing the growth plan from this audit.")
            }
            type="button"
            variant="secondary"
          >
            Get Help Implementing
          </Button>
        </div>
      </section>

      {isContactOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2e2823]/40 px-4 py-8">
          <div className="w-full max-w-2xl rounded-[32px] border border-[#e2d5c6] bg-[#f7f2eb] p-6 shadow-2xl sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div className="max-w-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tan-700">
                  Request support
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-ink">Tell us what you need help with</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Share a few details and we&apos;ll save your request for follow-up. No external integrations yet.
                </p>
              </div>
              <button
                className="rounded-full border border-[#ddcfbf] bg-white px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-tan-50"
                onClick={closeContactForm}
                type="button"
              >
                Close
              </button>
            </div>

            {isLeadSubmitted ? (
              <div className="mt-6 rounded-[24px] border border-[#e4d7c8] bg-white px-6 py-6">
                <p className="text-lg font-semibold text-ink">Thanks, your request has been saved.</p>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  We stored this lead locally so {brand.firmName} can reference it during follow-up planning inside this app.
                </p>
              </div>
            ) : null}

            <form className="mt-6 space-y-5" onSubmit={handleLeadSubmit}>
              <div className="grid gap-5 md:grid-cols-2">
                <ContactField label="Name" required>
                  <input
                    className={contactInputClassName}
                    onChange={(event) => updateContactField("name", event.target.value)}
                    placeholder="Alex Morgan"
                    required
                    type="text"
                    value={contactForm.name}
                  />
                </ContactField>
                <ContactField label="Email" required>
                  <input
                    className={contactInputClassName}
                    onChange={(event) => updateContactField("email", event.target.value)}
                    placeholder="alex@business.com"
                    required
                    type="email"
                    value={contactForm.email}
                  />
                </ContactField>
                <ContactField label="Phone (optional)">
                  <input
                    className={contactInputClassName}
                    onChange={(event) => updateContactField("phone", event.target.value)}
                    placeholder="(312) 555-0184"
                    type="tel"
                    value={contactForm.phone}
                  />
                </ContactField>
                <ContactField label="Business Name" required>
                  <input
                    className={contactInputClassName}
                    onChange={(event) => updateContactField("businessName", event.target.value)}
                    placeholder="BrightPath Plumbing"
                    required
                    type="text"
                    value={contactForm.businessName}
                  />
                </ContactField>
              </div>

              <ContactField label="What would you like help with?">
                <textarea
                  className={`${contactInputClassName} min-h-32 resize-none`}
                  onChange={(event) => updateContactField("helpRequest", event.target.value)}
                  placeholder="Example: We want help turning the 30-day action plan into a working execution roadmap."
                  value={contactForm.helpRequest}
                />
              </ContactField>

              <div className="flex flex-col gap-3 border-t border-[#e2d7cb] pt-5 sm:flex-row sm:justify-end">
                <Button onClick={closeContactForm} type="button" variant="ghost">
                  Cancel
                </Button>
                <Button type="submit">Send Request</Button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-slate-100 pb-4">
      <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{label}</dt>
      <dd className="mt-2 text-sm leading-6 text-slate-700">{value}</dd>
    </div>
  );
}

function RankCard({
  label,
  item
}: {
  label: string;
  item: PersistedAuditResult["diagnosis"]["primaryIssue"];
}) {
  return (
    <div className="rounded-[24px] border border-[#e6d9cb] bg-[#fbf6ef] p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{label}</p>
      <p className="mt-3 text-lg font-semibold text-ink">{item.category}</p>
      <p className="mt-2 text-sm text-tan-700">Score: {item.score}/100</p>
    </div>
  );
}

function ReportSection({
  title,
  body,
  variant = "list"
}: {
  title: string;
  body: string[];
  variant?: "list" | "numbered" | "chips";
}) {
  return (
    <section className="panel p-7">
      <h2 className="text-xl font-semibold text-ink">{title}</h2>
      {variant === "chips" ? (
        <div className="mt-6 flex flex-wrap gap-3">
          {body.map((item) => (
            <span
              className="rounded-full border border-[#e6d9cb] bg-[#fbf6ef] px-4 py-2 text-sm font-medium text-slate-700"
              key={item}
            >
              {item}
            </span>
          ))}
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {body.map((item, index) => (
            <div
              className="rounded-[24px] border border-[#e6ddd3] bg-slate-50/70 p-5"
              key={item}
            >
              {variant === "numbered" ? (
                <div className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-tan-500 text-sm font-semibold text-white">
                    {index + 1}
                  </span>
                  <p className="pt-1 text-sm leading-7 text-slate-700">{item}</p>
                </div>
              ) : (
                <p className="text-sm leading-7 text-slate-700">{item}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function PriorityAreaSection({ areas }: { areas: RecommendationArea[] }) {
  return (
    <section className="panel p-7">
      <h2 className="text-xl font-semibold text-ink">Priority Areas</h2>
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {areas.map((area) => (
          <article
            className="rounded-[26px] border border-[#e6d9cb] bg-[#fbf6ef] p-5"
            key={area.title}
          >
            <p className="text-base font-semibold text-ink">{area.title}</p>
            <p className="mt-3 text-sm leading-7 text-slate-700">{area.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ContactField({
  children,
  label,
  required
}: {
  children: React.ReactNode;
  label: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-700">
        {label}
        {required ? <span className="ml-1 text-tan-700">*</span> : null}
      </span>
      {children}
    </label>
  );
}
