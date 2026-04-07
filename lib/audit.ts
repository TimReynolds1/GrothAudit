import type { DiagnosisIssue, IntakeFormValues } from "@/lib/types";

export function getDiagnoses(values: IntakeFormValues): DiagnosisIssue[] {
  const issues: DiagnosisIssue[] = [];

  if (
    values.biggestChallenge === "Not enough new customers" ||
    values.slowReason === "Not enough people know about us" ||
    values.howPeopleFindYou.includes("Mostly referrals") ||
    values.howPeopleFindYou.includes("Walk-ins only")
  ) {
    issues.push({
      title: "Lead generation is likely underpowered",
      summary:
        "The business may be relying on a narrow set of lead sources or too little proactive visibility.",
      impact:
        "Revenue can become inconsistent when new customer flow depends on chance, word of mouth, or seasonal traffic.",
      recommendation:
        "Strengthen local visibility, improve marketing consistency, and make sure the business is easier to discover and remember.",
      priority: "High"
    });
  }

  if (
    values.biggestChallenge === "People inquire but do not buy" ||
    values.visitToPurchaseRate === "Lower than it should be" ||
    values.offerClarity === "no" ||
    values.teamGreetingConsistency === "no"
  ) {
    issues.push({
      title: "Sales conversion may be leaking opportunities",
      summary:
        "Potential customers may be showing interest without getting enough clarity, trust, or support to move forward.",
      impact:
        "The business can end up working hard for each lead but converting too few of them into paying customers.",
      recommendation:
        "Tighten the customer experience, improve response and service consistency, and make the offer easier to understand.",
      priority: "High"
    });
  }

  if (
    values.customerExperienceImprove.length > 20 &&
    values.customerExperienceImprove !== ""
  ) {
    issues.push({
      title: "The customer experience may need attention",
      summary:
        "Your comments suggest there may be friction in how customers are greeted, helped, or guided toward the next step.",
      impact:
        "Even a strong offer can underperform if the in-person or service experience feels inconsistent.",
      recommendation:
        "Choose one customer experience improvement to standardize and review over the next 30 days.",
      priority: "High"
    });
  }

  if (
    values.repeatCustomerFrequency === "Rarely" ||
    values.followUpWithCustomers === "no" ||
    values.askForReviews === "no"
  ) {
    issues.push({
      title: "Customer retention could be improved",
      summary:
        "The business may be missing repeat visits, referrals, and valuable follow-up after the first sale.",
      impact:
        "New customer acquisition has to carry too much of the growth load when past customers do not come back consistently.",
      recommendation:
        "Add simple follow-up habits, ask for reviews consistently, and create a stronger reason for past customers to return.",
      priority: "Medium"
    });
  }

  if (
    values.clearReasonToChoose === "no" ||
    values.customersNoticeDifference === "no" ||
    values.competitionDescription === "Very crowded and aggressive"
  ) {
    issues.push({
      title: "Competitive positioning may not be clear enough",
      summary:
        "The business may have strengths, but customers may not be noticing a clear reason to choose it over nearby alternatives.",
      impact:
        "When the difference is unclear, pricing pressure increases and marketing becomes less effective.",
      recommendation:
        "Clarify the value proposition, make the difference more visible, and align messaging with what customers care about most.",
      priority: "Medium"
    });
  }

  if (
    values.trackedMetrics.includes("None yet") ||
    values.knowsBestMarketing === "no" ||
    values.performanceTrackingMethod === "Mostly by feel"
  ) {
    issues.push({
      title: "Tracking and reporting may be too light",
      summary:
        "The business may not have enough clear data to confidently decide what to keep, fix, or stop.",
      impact:
        "Owners are forced to rely on instinct when they should be able to see what is driving results.",
      recommendation:
        "Start with a short weekly dashboard covering lead sources, busy times, conversion, repeat business, and top-performing efforts.",
      priority: "High"
    });
  }

  if (issues.length === 0) {
    issues.push({
      title: "The business appears fundamentally healthy",
      summary:
        "Your responses suggest a solid foundation with opportunities to sharpen consistency and decision-making.",
      impact:
        "The strongest gains are likely to come from focused refinements rather than major structural repair.",
      recommendation:
        "Use the report to prioritize one visibility improvement, one customer experience improvement, and one reporting improvement.",
      priority: "Medium"
    });
  }

  return issues;
}

export function getPrioritySummary(issues: DiagnosisIssue[]) {
  const highCount = issues.filter((issue) => issue.priority === "High").length;

  if (highCount >= 3) {
    return "Several core systems likely need attention first.";
  }

  if (highCount >= 1) {
    return "A few high-impact fixes could unlock clearer growth.";
  }

  return "The strongest opportunity is refinement rather than major repair.";
}

export const sampleAuditData: IntakeFormValues = {
  businessName: "Harbor Street Dental",
  contactName: "Jordan Ellis",
  phone: "(312) 555-0148",
  email: "jordan@harborstreetdental.com",
  website: "www.harborstreetdental.com",
  address: "144 Harbor Street, Chicago, IL",
  businessType: "Dental practice",
  yearsInBusiness: "4-7 years",
  locationCount: "1 location",
  mainGoal: "Get more qualified new patients",
  biggestChallenge: "Not enough new customers",
  slowReason: "Not enough people know about us",
  clearReasonToChoose: "somewhat",
  idealCustomer: "Families and professionals looking for a long-term dental office.",
  howPeopleFindYou: ["Google search", "Google Business Profile", "Referrals"],
  knowsWhyChooseYou: "yes",
  knowsWhyNotChooseYou: "somewhat",
  turnsPeopleAway: "Some people compare prices and choose a practice closer to home.",
  marketingActivities: ["Google Business Profile", "Email follow-up", "Review requests"],
  socialPostingFrequency: "A few times a month",
  runsPromotions: "sometimes",
  collectsCustomerInfo: "yes",
  trackedMetrics: ["Leads by source", "Appointments booked", "Reviews", "Repeat customers"],
  knowsBusyTimes: "yes",
  knowsBestMarketing: "somewhat",
  performanceTrackingMethod: "A spreadsheet and practice management reports",
  visitToPurchaseRate: "Average",
  teamGreetingConsistency: "mostly",
  offerClarity: "mostly",
  storefrontHelps: "somewhat",
  customerExperienceImprove: "We want the front-desk experience to feel smoother and more consistent.",
  repeatCustomerFrequency: "Sometimes",
  loyaltyProgram: "no",
  followUpWithCustomers: "sometimes",
  askForReviews: "sometimes",
  competitionDescription: "Several established local competitors nearby",
  competitiveDifference: "Friendly service, a strong local reputation, and convenient scheduling.",
  customersNoticeDifference: "somewhat",
  next90DayResult: "More qualified leads",
  supportInterest: ["Marketing strategy", "Conversion improvements", "Reporting and tracking"],
  biggestPriority: "Create steadier patient growth while making the front-desk experience feel more consistent.",
  notes: "We get referrals, but marketing feels uneven and scheduling is busy."
};
