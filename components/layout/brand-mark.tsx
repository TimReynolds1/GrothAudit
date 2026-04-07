import Link from "next/link";
import { brand } from "@/lib/brand";

type BrandMarkProps = {
  compact?: boolean;
};

export function BrandMark({ compact = false }: BrandMarkProps) {
  return (
    <Link className="group inline-flex items-center gap-3" href="/">
      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#dbcbb8] bg-[#fbf6ef] text-xs font-semibold uppercase tracking-[0.2em] text-tan-700 shadow-sm transition group-hover:border-tan-300">
        GAC
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold tracking-[0.08em] text-ink">
          {brand.firmName}
        </span>
        {!compact ? (
          <span className="block text-xs text-slate-500">{brand.tagline}</span>
        ) : null}
      </span>
    </Link>
  );
}
