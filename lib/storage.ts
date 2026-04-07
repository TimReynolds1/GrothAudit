import type { IntakeFormValues, LeadSubmission, PersistedAuditResult } from "@/lib/types";
import { sampleAuditData } from "@/lib/audit";
import { generateDiagnosisSummary } from "@/lib/diagnosisRules";

const INTAKE_STORAGE_KEY = "local-business-growth-audit:intake";
const RESULTS_STORAGE_KEY = "local-business-growth-audit:results";
const AUDIT_HISTORY_STORAGE_KEY = "local-business-growth-audit:history";
const LEAD_STORAGE_KEY = "local-business-growth-audit:leads";

export function saveAuditData(values: IntakeFormValues) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(INTAKE_STORAGE_KEY, JSON.stringify(values));
}

export function saveAuditResult(values: IntakeFormValues): PersistedAuditResult {
  const result: PersistedAuditResult = {
    id: createAuditId(),
    businessName: values.businessName,
    generatedAt: new Date().toISOString(),
    intake: values,
    diagnosis: generateDiagnosisSummary(values)
  };

  if (typeof window !== "undefined") {
    window.localStorage.setItem(RESULTS_STORAGE_KEY, JSON.stringify(result));
    window.localStorage.setItem(INTAKE_STORAGE_KEY, JSON.stringify(values));
    saveAuditToHistory(result);
  }

  return result;
}

export function loadAuditData(): IntakeFormValues {
  if (typeof window === "undefined") {
    return sampleAuditData;
  }

  const stored = window.localStorage.getItem(INTAKE_STORAGE_KEY);

  if (!stored) {
    return sampleAuditData;
  }

  try {
    return JSON.parse(stored) as IntakeFormValues;
  } catch {
    return sampleAuditData;
  }
}

export function loadAuditResult(): PersistedAuditResult | null {
  if (typeof window === "undefined") {
    return null;
  }

  const stored = window.localStorage.getItem(RESULTS_STORAGE_KEY);

  if (!stored) {
    return null;
  }

  try {
    return normalizeAuditResult(JSON.parse(stored) as PersistedAuditResult);
  } catch {
    return null;
  }
}

export function clearAuditResult() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(RESULTS_STORAGE_KEY);
  window.localStorage.removeItem(INTAKE_STORAGE_KEY);
}

export function loadSavedAudits(): PersistedAuditResult[] {
  if (typeof window === "undefined") {
    return [];
  }

  const stored = window.localStorage.getItem(AUDIT_HISTORY_STORAGE_KEY);

  if (!stored) {
    return [];
  }

  try {
    const parsed = JSON.parse(stored) as PersistedAuditResult[];
    return parsed.map(normalizeAuditResult);
  } catch {
    return [];
  }
}

export function openSavedAudit(id: string) {
  if (typeof window === "undefined") {
    return null;
  }

  const match = loadSavedAudits().find((audit) => audit.id === id);

  if (!match) {
    return null;
  }

  window.localStorage.setItem(RESULTS_STORAGE_KEY, JSON.stringify(match));
  window.localStorage.setItem(INTAKE_STORAGE_KEY, JSON.stringify(match.intake));
  return match;
}

export function deleteSavedAudit(id: string) {
  if (typeof window === "undefined") {
    return;
  }

  const activeStored = window.localStorage.getItem(RESULTS_STORAGE_KEY);
  const remaining = loadSavedAudits().filter((audit) => audit.id !== id);
  window.localStorage.setItem(AUDIT_HISTORY_STORAGE_KEY, JSON.stringify(remaining));

  if (activeStored) {
    try {
      const activeResult = normalizeAuditResult(JSON.parse(activeStored) as PersistedAuditResult);
      if (activeResult.id === id) {
        window.localStorage.removeItem(RESULTS_STORAGE_KEY);
        window.localStorage.removeItem(INTAKE_STORAGE_KEY);
      }
    } catch {
      window.localStorage.removeItem(RESULTS_STORAGE_KEY);
    }
  }
}

export function saveLeadSubmission(
  submission: Omit<LeadSubmission, "id" | "createdAt">
): LeadSubmission {
  const nextSubmission: LeadSubmission = {
    id: createRecordId("lead"),
    createdAt: new Date().toISOString(),
    ...submission
  };

  if (typeof window !== "undefined") {
    const current = loadLeadSubmissions();
    window.localStorage.setItem(
      LEAD_STORAGE_KEY,
      JSON.stringify([nextSubmission, ...current].slice(0, 100))
    );
  }

  return nextSubmission;
}

export function loadLeadSubmissions(): LeadSubmission[] {
  if (typeof window === "undefined") {
    return [];
  }

  const stored = window.localStorage.getItem(LEAD_STORAGE_KEY);

  if (!stored) {
    return [];
  }

  try {
    return JSON.parse(stored) as LeadSubmission[];
  } catch {
    return [];
  }
}

function saveAuditToHistory(result: PersistedAuditResult) {
  if (typeof window === "undefined") {
    return;
  }

  const history = loadSavedAudits().filter((audit) => audit.id !== result.id);
  const nextHistory = [result, ...history].slice(0, 25);
  window.localStorage.setItem(AUDIT_HISTORY_STORAGE_KEY, JSON.stringify(nextHistory));
}

function normalizeAuditResult(result: PersistedAuditResult): PersistedAuditResult {
  return {
    ...result,
    id: result.id || createRecordId("audit")
  };
}

function createAuditId() {
  return createRecordId("audit");
}

function createRecordId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
