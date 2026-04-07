import { SiteShell } from "@/components/layout/site-shell";
import { brand } from "@/lib/brand";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-5xl px-6 pb-24 lg:px-10">
        <section className="panel px-8 py-12 text-center md:px-12">
          <span className="eyebrow">{brand.firmName}</span>
          <h1 className="mt-5 font-[family-name:var(--font-display)] text-4xl leading-tight text-ink md:text-5xl">
            This page could not be found
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-600">
            The page you were looking for is not available. You can return home, start a new audit, or reopen a saved client assessment.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="/">Go Home</Button>
            <Button href="/intake" variant="secondary">
              New Audit
            </Button>
            <Button href="/saved-audits" variant="secondary">
              Saved Audits
            </Button>
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
