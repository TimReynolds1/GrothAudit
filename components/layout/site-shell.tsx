import Link from "next/link";
import { BrandMark } from "@/components/layout/brand-mark";
import { brand } from "@/lib/brand";

type SiteShellProps = {
  children: React.ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b border-[#e8ddd0] bg-[rgba(250,245,238,0.86)] backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <BrandMark compact />
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
            <Link className="transition hover:text-ink" href="/">
              Home
            </Link>
            <Link className="transition hover:text-ink" href="/intake">
              New Audit
            </Link>
            <Link className="transition hover:text-ink" href="/saved-audits">
              Saved Audits
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="mt-20 border-t border-slate-200/80 bg-white/70">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-10 md:flex-row md:items-start md:justify-between lg:px-10">
          <div className="max-w-md">
            <BrandMark />
            <p className="mt-4 text-sm leading-7 text-slate-500">
              {brand.productName} is the consulting-led assessment experience from {brand.firmName}, designed to help local businesses understand whether growth is being held back by visibility, conversion, retention, or tracking gaps.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <p className="text-sm font-semibold text-ink">Explore</p>
              <div className="mt-4 flex flex-col gap-3 text-sm text-slate-500">
                <Link href="/">Home</Link>
                <Link href="/intake">New audit</Link>
                <Link href="/saved-audits">Saved audits</Link>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-ink">Brand Promise</p>
              <div className="mt-4 flex flex-col gap-3 text-sm text-slate-500">
                <p>{brand.tagline}</p>
                <p>Professional consulting presentation</p>
                <p>Simple business language</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
