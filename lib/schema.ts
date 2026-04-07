import { z } from "zod";

const checkboxField = z.array(z.string()).default([]);

export const intakeFormSchema = z.object({
  businessName: z.string().min(2, "Please enter the business name."),
  contactName: z.string().min(2, "Please enter the contact name."),
  phone: z.string().min(7, "Please enter a phone number."),
  email: z.string().email("Please enter a valid email address."),
  website: z.string().min(3, "Please enter the website or social link."),
  address: z.string().min(6, "Please enter the business address."),
  businessType: z.string().min(2, "Please enter the business type."),
  yearsInBusiness: z.string().min(1, "Please select how long you've been in business."),
  locationCount: z.string().min(1, "Please select how many locations you have."),
  mainGoal: z.string().min(8, "Please choose or enter the main goal."),
  biggestChallenge: z.string().min(8, "Please choose the biggest challenge."),
  slowReason: z.string().min(8, "Please choose what usually causes slow periods."),
  clearReasonToChoose: z.enum(["yes", "somewhat", "no"]),
  idealCustomer: z.string().min(4, "Please describe the ideal customer."),
  howPeopleFindYou: checkboxField.refine(
    (value) => value.length > 0,
    "Please select at least one way customers find you."
  ),
  knowsWhyChooseYou: z.enum(["yes", "somewhat", "no"]),
  knowsWhyNotChooseYou: z.enum(["yes", "somewhat", "no"]),
  turnsPeopleAway: z.string().default(""),
  marketingActivities: checkboxField.refine(
    (value) => value.length > 0,
    "Please select at least one marketing activity or choose none yet."
  ),
  socialPostingFrequency: z.string().min(1, "Please select a posting frequency."),
  runsPromotions: z.enum(["yes", "sometimes", "no"]),
  collectsCustomerInfo: z.enum(["yes", "sometimes", "no"]),
  trackedMetrics: checkboxField.refine(
    (value) => value.length > 0,
    "Please select at least one tracked item or choose none yet."
  ),
  knowsBusyTimes: z.enum(["yes", "somewhat", "no"]),
  knowsBestMarketing: z.enum(["yes", "somewhat", "no"]),
  performanceTrackingMethod: z.string().min(4, "Please tell us how you track performance."),
  visitToPurchaseRate: z.string().min(1, "Please select the typical conversion rate."),
  teamGreetingConsistency: z.enum(["yes", "mostly", "no"]),
  offerClarity: z.enum(["yes", "mostly", "no"]),
  storefrontHelps: z.enum(["yes", "somewhat", "no"]),
  customerExperienceImprove: z.string().default(""),
  repeatCustomerFrequency: z.string().min(1, "Please select how often customers come back."),
  loyaltyProgram: z.enum(["yes", "no"]),
  followUpWithCustomers: z.enum(["yes", "sometimes", "no"]),
  askForReviews: z.enum(["yes", "sometimes", "no"]),
  competitionDescription: z.string().min(4, "Please describe your nearby competition."),
  competitiveDifference: z.string().min(8, "Please explain what makes your business different."),
  customersNoticeDifference: z.enum(["yes", "somewhat", "no"]),
  next90DayResult: z.string().min(8, "Please choose the result that matters most."),
  supportInterest: checkboxField.refine(
    (value) => value.length > 0,
    "Please select at least one support area."
  ),
  biggestPriority: z.string().min(8, "Please share the biggest priority right now."),
  notes: z.string().max(600, "Please keep notes under 600 characters.").default("")
});

export type IntakeFormSchema = z.infer<typeof intakeFormSchema>;

export const defaultIntakeValues: IntakeFormSchema = {
  businessName: "",
  contactName: "",
  phone: "",
  email: "",
  website: "",
  address: "",
  businessType: "",
  yearsInBusiness: "",
  locationCount: "",
  mainGoal: "",
  biggestChallenge: "",
  slowReason: "",
  clearReasonToChoose: "somewhat",
  idealCustomer: "",
  howPeopleFindYou: [],
  knowsWhyChooseYou: "somewhat",
  knowsWhyNotChooseYou: "somewhat",
  turnsPeopleAway: "",
  marketingActivities: [],
  socialPostingFrequency: "",
  runsPromotions: "sometimes",
  collectsCustomerInfo: "sometimes",
  trackedMetrics: [],
  knowsBusyTimes: "somewhat",
  knowsBestMarketing: "somewhat",
  performanceTrackingMethod: "",
  visitToPurchaseRate: "",
  teamGreetingConsistency: "mostly",
  offerClarity: "mostly",
  storefrontHelps: "somewhat",
  customerExperienceImprove: "",
  repeatCustomerFrequency: "",
  loyaltyProgram: "no",
  followUpWithCustomers: "sometimes",
  askForReviews: "sometimes",
  competitionDescription: "",
  competitiveDifference: "",
  customersNoticeDifference: "somewhat",
  next90DayResult: "",
  supportInterest: [],
  biggestPriority: "",
  notes: ""
};
