"use client";

import { useEffect, useState } from "react";
import { getDiagnoses } from "@/lib/audit";
import { brand } from "@/lib/brand";
import { loadAuditData } from "@/lib/storage";
import type { DiagnosisIssue, IntakeFormValues } from "@/lib/types";

export function ReportPage() {
  const [data, setData] = useState<IntakeFormValues | null>(null);
  const [issues, setIssues] = useState<DiagnosisIssue[]>([]);

  useEffect(() => {
    const loaded = loadAuditData();
    setData(loaded);
    setIssues(getDiagnoses(loaded));
  }, []);

  if (!data) {
    return null;
  }

  return (
    <div className="mx-auto max-w-5xl px-6 pb-24 lg:px-10">
      <article className="overflow-hidden rounded-[36px] border border-slate-200 bg-white shadow-soft">
        <div className="border-b border-slate-200 bg-navy-900 px-8 py-10 text-white md:px-12">
          <p className="text-sm uppercase tracking-[0.24em] text-white/60">{brand.firmName}</p>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl leading-tight">
            {data.businessName}
          </h1>
          <p className="mt-3 text-sm uppercase tracking-[0.18em] text-white/65">{brand.tagline}</p>
          <p className="mt-4 max-w-3xl text-base leading-7 text-white/80">
            Prepared for {data.contactName} by {brand.firmName}. This report summarizes likely growth constraints and practical next steps based on the business intake.
          </p>
        </div>

        <div className="grid gap-10 px-8 py-10 md:px-12 lg:grid-cols-[0.75fr_1.25fr]">
          <aside className="space-y-8">
            <section>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Business overview
              </p>
              <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                <p><strong className="text-slate-900">Business type:</strong> {data.businessType}</p>
                <p><strong className="text-slate-900">Address:</strong> {data.address}</p>
                <p><strong className="text-slate-900">Locations:</strong> {data.locationCount}</p>
                <p><strong className="text-slate-900">Years in business:</strong> {data.yearsInBusiness}</p>
              </div>
            </section>

            <section className="rounded-[28px] bg-slate-50 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Primary objective
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-700">{data.mainGoal}</p>
            </section>

            <section className="rounded-[28px] bg-ivory p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Consultant note
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-700">
                The business appears to have solid demand potential, but clearer positioning, steadier marketing, and stronger reporting would likely improve consistency.
              </p>
            </section>
          </aside>

          <div>
            <section>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Key findings
              </p>
              <div className="mt-5 space-y-5">
                {issues.map((issue, index) => (
                  <div className="rounded-[28px] border border-slate-200 p-6" key={issue.title}>
                    <div className="flex items-center justify-between gap-3">
                      <h2 className="text-xl font-semibold text-ink">
                        {index + 1}. {issue.title}
                      </h2>
                      <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                        {issue.priority}
                      </span>
                    </div>
                    <p className="mt-4 text-sm leading-7 text-slate-600">{issue.summary}</p>
                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                          Business impact
                        </p>
                        <p className="mt-2 text-sm leading-6 text-slate-700">{issue.impact}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                          Recommended action
                        </p>
                        <p className="mt-2 text-sm leading-6 text-slate-700">{issue.recommendation}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-8 rounded-[28px] bg-navy-50 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy-700">
                Next 30-60 days
              </p>
              <ol className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
                <li>1. Pick the single most important growth bottleneck and assign an owner.</li>
                <li>2. Create one weekly dashboard for lead sources, conversion, and repeat customer activity.</li>
                <li>3. Implement one marketing or customer experience improvement that can be reviewed within 30 days.</li>
              </ol>
            </section>
          </div>
        </div>
      </article>
    </div>
  );
}
