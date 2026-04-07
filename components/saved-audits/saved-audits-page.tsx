"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Archive, ChevronRight, Trash2 } from "lucide-react";
import { brand } from "@/lib/brand";
import { deleteSavedAudit, loadSavedAudits, openSavedAudit } from "@/lib/storage";
import type { PersistedAuditResult } from "@/lib/types";
import { Button } from "@/components/ui/button";

export function SavedAuditsPage() {
  const [audits, setAudits] = useState<PersistedAuditResult[]>([]);
  const router = useRouter();

  useEffect(() => {
    setAudits(loadSavedAudits());
  }, []);

  function handleOpenAudit(id: string) {
    openSavedAudit(id);
    router.push("/results");
  }

  function handleDeleteAudit(id: string) {
    deleteSavedAudit(id);
    setAudits((current) => current.filter((audit) => audit.id !== id));
  }

  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 lg:px-10">
      <section className="panel px-8 py-10 md:px-10">
        <span className="eyebrow">{brand.firmName}</span>
        <p className="mt-4 brand-copy">{brand.tagline}</p>
        <h1 className="mt-5 font-[family-name:var(--font-display)] text-4xl leading-tight text-ink md:text-5xl">
          Client audit history
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
          Reopen completed assessments, review prior findings, and keep client work organized in one place.
        </p>
      </section>

      <section className="mt-8 panel p-7">
        <div className="flex flex-col gap-3 border-b border-[#e4dacf] pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-ink">Saved assessments</h2>
            <p className="mt-2 text-sm leading-7 text-slate-500">
              Completed audits are stored locally in this browser so you can reopen them later.
            </p>
          </div>
          <Button href="/intake" variant="secondary">
            Start new audit
          </Button>
        </div>

        {audits.length === 0 ? (
          <div className="mt-8 rounded-[28px] border border-dashed border-[#dbcdbd] bg-[#fbf6ef] px-6 py-10 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-tan-700 shadow-sm">
              <Archive className="h-5 w-5" />
            </div>
            <h3 className="mt-5 text-lg font-semibold text-ink">No saved audits yet</h3>
            <p className="mt-3 text-sm leading-7 text-slate-500">
              Complete an intake to create your first saved business growth audit.
            </p>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {audits.map((audit) => {
              const generatedDate = new Date(audit.generatedAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric"
              });

              return (
                <article
                  className="rounded-[28px] border border-[#e5d9ca] bg-[#fcf8f2] p-6"
                  key={audit.id}
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                        Saved {generatedDate}
                      </p>
                      <h3 className="mt-3 text-xl font-semibold text-ink">{audit.businessName}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-600">
                        Primary issue: {audit.diagnosis.primaryIssue.category} ({audit.diagnosis.primaryIssue.score}/100)
                      </p>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <Button onClick={() => handleOpenAudit(audit.id)} type="button">
                        Open audit <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                      <Button
                        className="gap-2"
                        onClick={() => handleDeleteAudit(audit.id)}
                        type="button"
                        variant="ghost"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
