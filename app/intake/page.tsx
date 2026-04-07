import { IntakeFlow } from "@/components/audit/intake-flow";
import { SiteShell } from "@/components/layout/site-shell";

export default function IntakePage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
        <IntakeFlow />
      </div>
    </SiteShell>
  );
}
