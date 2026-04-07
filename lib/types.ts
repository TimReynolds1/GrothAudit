export type IntakeFormValues = {
  businessName: string;
  contactName: string;
  phone: string;
  email: string;
  website: string;
  address: string;
  businessType: string;
  yearsInBusiness: string;
  locationCount: string;
  mainGoal: string;
  biggestChallenge: string;
  slowReason: string;
  clearReasonToChoose: "yes" | "somewhat" | "no";
  idealCustomer: string;
  howPeopleFindYou: string[];
  knowsWhyChooseYou: "yes" | "somewhat" | "no";
  knowsWhyNotChooseYou: "yes" | "somewhat" | "no";
  turnsPeopleAway: string;
  marketingActivities: string[];
  socialPostingFrequency: string;
  runsPromotions: "yes" | "sometimes" | "no";
  collectsCustomerInfo: "yes" | "sometimes" | "no";
  trackedMetrics: string[];
  knowsBusyTimes: "yes" | "somewhat" | "no";
  knowsBestMarketing: "yes" | "somewhat" | "no";
  performanceTrackingMethod: string;
  visitToPurchaseRate: string;
  teamGreetingConsistency: "yes" | "mostly" | "no";
  offerClarity: "yes" | "mostly" | "no";
  storefrontHelps: "yes" | "somewhat" | "no";
  customerExperienceImprove: string;
  repeatCustomerFrequency: string;
  loyaltyProgram: "yes" | "no";
  followUpWithCustomers: "yes" | "sometimes" | "no";
  askForReviews: "yes" | "sometimes" | "no";
  competitionDescription: string;
  competitiveDifference: string;
  customersNoticeDifference: "yes" | "somewhat" | "no";
  next90DayResult: string;
  supportInterest: string[];
  biggestPriority: string;
  notes: string;
};

export type DiagnosisIssue = {
  title: string;
  summary: string;
  impact: string;
  recommendation: string;
  priority: "High" | "Medium";
};

export type DiagnosisCategory =
  | "Awareness"
  | "Conversion"
  | "Retention"
  | "Differentiation"
  | "Tracking / Analytics"
  | "Reputation / Trust";

export type DiagnosisScore = {
  category: DiagnosisCategory;
  score: number;
};

export type DiagnosisSummary = {
  scores: DiagnosisScore[];
  primaryIssue: DiagnosisScore;
  secondaryIssue: DiagnosisScore;
  tertiaryIssue: DiagnosisScore;
  executiveSummary: string;
};

export type PersistedAuditResult = {
  id: string;
  businessName: string;
  generatedAt: string;
  intake: IntakeFormValues;
  diagnosis: DiagnosisSummary;
};

export type RecommendationArea = {
  title: string;
  description: string;
};

export type RecommendationPlan = {
  executiveSummary: string;
  likelyMeans: string[];
  priorityAreas: RecommendationArea[];
  actionPlan30: string[];
  growthFocus90: string[];
  suggestedKpis: string[];
};

export type LeadSubmission = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  businessName: string;
  helpRequest: string;
};
