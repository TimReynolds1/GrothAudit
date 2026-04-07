"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type FieldValues, type Path, type UseFormReturn } from "react-hook-form";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { brand } from "@/lib/brand";
import { defaultIntakeValues, intakeFormSchema, type IntakeFormSchema } from "@/lib/schema";
import { saveAuditResult } from "@/lib/storage";

type StepConfig = {
  title: string;
  description: string;
  fields: Array<keyof IntakeFormSchema>;
};

const steps: StepConfig[] = [
  {
    title: "Business Snapshot",
    description: "Start with the core business details and the main outcome you care about right now.",
    fields: [
      "businessName",
      "contactName",
      "phone",
      "email",
      "website",
      "address",
      "businessType",
      "yearsInBusiness",
      "locationCount",
      "mainGoal"
    ]
  },
  {
    title: "Growth Problem Identification",
    description: "Clarify what feels hardest right now so the audit can focus on the right issue.",
    fields: ["biggestChallenge", "slowReason", "clearReasonToChoose"]
  },
  {
    title: "Customer Understanding",
    description: "Describe who you serve, how they find you, and what you know about their decisions.",
    fields: [
      "idealCustomer",
      "howPeopleFindYou",
      "knowsWhyChooseYou",
      "knowsWhyNotChooseYou",
      "turnsPeopleAway"
    ]
  },
  {
    title: "Current Marketing Activity",
    description: "Review what the business is doing right now to stay visible and generate demand.",
    fields: [
      "marketingActivities",
      "socialPostingFrequency",
      "runsPromotions",
      "collectsCustomerInfo"
    ]
  },
  {
    title: "Tracking and Data",
    description: "Understand how clearly the business tracks performance and what signals are easiest to trust.",
    fields: [
      "trackedMetrics",
      "knowsBusyTimes",
      "knowsBestMarketing",
      "performanceTrackingMethod"
    ]
  },
  {
    title: "Customer Experience and Conversion",
    description: "Look at what happens when a potential customer actually visits, calls, or asks for help.",
    fields: [
      "visitToPurchaseRate",
      "teamGreetingConsistency",
      "offerClarity",
      "storefrontHelps",
      "customerExperienceImprove"
    ]
  },
  {
    title: "Retention and Loyalty",
    description: "Review whether the business stays top of mind after the first purchase or visit.",
    fields: [
      "repeatCustomerFrequency",
      "loyaltyProgram",
      "followUpWithCustomers",
      "askForReviews"
    ]
  },
  {
    title: "Competitive Position",
    description: "Capture how the local market feels and what makes the business different.",
    fields: ["competitionDescription", "competitiveDifference", "customersNoticeDifference"]
  },
  {
    title: "Goals and Priorities",
    description: "Finish with the result you care about most and the kind of support that would help.",
    fields: ["next90DayResult", "supportInterest", "biggestPriority", "notes"]
  }
];

const inputClassName =
  "mt-2 w-full rounded-2xl border border-[#dfd3c6] bg-white/90 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-tan-500 focus:ring-2 focus:ring-tan-100";

export function IntakeFlow() {
  const [stepIndex, setStepIndex] = useState(0);
  const router = useRouter();

  const form = useForm<IntakeFormSchema>({
    resolver: zodResolver(intakeFormSchema),
    defaultValues: defaultIntakeValues,
    mode: "onBlur"
  });

  const currentStep = steps[stepIndex];
  const progressPercent = useMemo(
    () => Math.round(((stepIndex + 1) / steps.length) * 100),
    [stepIndex]
  );

  async function handleNext() {
    const isValid = await form.trigger(currentStep.fields);

    if (!isValid) {
      return;
    }

    setStepIndex((current) => Math.min(current + 1, steps.length - 1));
  }

  const handleSubmit = form.handleSubmit((values) => {
    saveAuditResult(values);
    router.push("/results");
  });

  return (
    <div className="grid gap-8 xl:grid-cols-[0.36fr_0.64fr]">
      <aside className="panel h-fit p-6 sm:p-8">
        <span className="eyebrow">{brand.firmName}</span>
        <p className="mt-4 brand-copy">{brand.tagline}</p>
        <h1 className="mt-5 font-[family-name:var(--font-display)] text-4xl leading-tight text-ink">
          {brand.productName}
        </h1>
        <p className="mt-4 text-sm leading-7 text-slate-500">
          This intake is designed by {brand.firmName} to feel calm, clear, and professional in a live client conversation. Each section focuses on one business area so the final diagnosis is easier to trust.
        </p>

        <div className="mt-8 rounded-[28px] border border-[#e5d7c6] bg-[#fbf6ef] p-5">
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Progress
            </p>
            <p className="text-sm font-semibold text-slate-700">{progressPercent}%</p>
          </div>
          <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-white">
            <div
              className="h-full rounded-full bg-tan-500 transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="mt-3 text-sm text-slate-500">
            Step {stepIndex + 1} of {steps.length}
          </p>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
          {steps.map((step, index) => (
            <div
              className={`rounded-2xl border px-4 py-4 ${
                index === stepIndex
                  ? "border-tan-200 bg-tan-50"
                  : "border-[#e6ddd3] bg-white/80"
              }`}
              key={step.title}
            >
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-semibold text-ink">{step.title}</p>
                <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  {index + 1}
                </span>
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-500">{step.description}</p>
            </div>
          ))}
        </div>
      </aside>

      <section className="panel p-6 sm:p-8 md:p-10">
        <div className="flex flex-col gap-5 border-b border-[#e4dacf] pb-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
              Step {stepIndex + 1} of {steps.length}
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-ink">
              {currentStep.title}
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-500">{currentStep.description}</p>
          </div>
          <Button className="gap-2 self-start" type="button" variant="secondary">
            <Save className="h-4 w-4" />
            Save and Continue Later
          </Button>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {stepIndex === 0 ? (
            <SectionCard
              title="Business Snapshot"
              description="Capture the core details first so the rest of the audit stays grounded in the real business."
            >
              <div className="grid gap-5 md:grid-cols-2">
                <Field error={form.formState.errors.businessName?.message} label="Business name">
                  <input className={inputClassName} {...form.register("businessName")} placeholder="BrightPath Plumbing" />
                </Field>
                <Field error={form.formState.errors.contactName?.message} label="Contact name">
                  <input className={inputClassName} {...form.register("contactName")} placeholder="Alex Morgan" />
                </Field>
                <Field error={form.formState.errors.phone?.message} label="Phone">
                  <input className={inputClassName} {...form.register("phone")} placeholder="(312) 555-0184" />
                </Field>
                <Field error={form.formState.errors.email?.message} label="Email">
                  <input className={inputClassName} {...form.register("email")} placeholder="alex@brightpath.com" type="email" />
                </Field>
                <Field error={form.formState.errors.website?.message} label="Website">
                  <input className={inputClassName} {...form.register("website")} placeholder="www.brightpath.com" />
                </Field>
                <Field error={form.formState.errors.businessType?.message} label="Business type">
                  <input className={inputClassName} {...form.register("businessType")} placeholder="Plumbing company" />
                </Field>
                <Field className="md:col-span-2" error={form.formState.errors.address?.message} label="Business address">
                  <input className={inputClassName} {...form.register("address")} placeholder="123 Main Street, Naperville, IL" />
                </Field>
                <Field error={form.formState.errors.yearsInBusiness?.message} label="How long have you been in business?">
                  <select className={inputClassName} {...form.register("yearsInBusiness")}>
                    <option value="">Select one</option>
                    <option value="Under 1 year">Under 1 year</option>
                    <option value="1-3 years">1-3 years</option>
                    <option value="4-7 years">4-7 years</option>
                    <option value="8+ years">8+ years</option>
                  </select>
                </Field>
                <Field error={form.formState.errors.locationCount?.message} label="How many locations do you have?">
                  <select className={inputClassName} {...form.register("locationCount")}>
                    <option value="">Select one</option>
                    <option value="1 location">1 location</option>
                    <option value="2-3 locations">2-3 locations</option>
                    <option value="4+ locations">4+ locations</option>
                  </select>
                </Field>
              </div>
              <RadioGroup
                form={form}
                label="What best describes your main goal right now?"
                name="mainGoal"
                options={[
                  "Get more new customers",
                  "Increase sales from existing customers",
                  "Improve customer retention",
                  "Understand what is holding growth back",
                  "Make marketing more effective"
                ]}
              />
            </SectionCard>
          ) : null}

          {stepIndex === 1 ? (
            <SectionCard
              title="Growth Problem Identification"
              description="This section helps identify the business issue that deserves attention first."
            >
              <RadioGroup
                form={form}
                label="What feels like the biggest challenge right now?"
                name="biggestChallenge"
                options={[
                  "Not enough new customers",
                  "People inquire but do not buy",
                  "Customers are not coming back enough",
                  "Marketing feels inconsistent",
                  "We are not sure what is working"
                ]}
              />
              <RadioGroup
                form={form}
                label="When business is slow, what do you think is the main reason?"
                name="slowReason"
                options={[
                  "Not enough people know about us",
                  "We are not standing out clearly",
                  "Too few leads turn into customers",
                  "Customers are choosing competitors",
                  "We are not tracking the right things"
                ]}
              />
              <RadioGroup
                form={form}
                label="Do you feel your business has a clear reason people should choose you?"
                name="clearReasonToChoose"
                options={[
                  { label: "Yes", value: "yes" },
                  { label: "Somewhat", value: "somewhat" },
                  { label: "No", value: "no" }
                ]}
              />
            </SectionCard>
          ) : null}

          {stepIndex === 2 ? (
            <SectionCard
              title="Customer Understanding"
              description="The clearer the business is on customer behavior, the easier it is to improve marketing and conversion."
            >
              <Field error={form.formState.errors.idealCustomer?.message} label="Who is your ideal customer?">
                <input className={inputClassName} {...form.register("idealCustomer")} placeholder="Example: Busy homeowners who value trust and reliability" />
              </Field>
              <CheckboxGroup
                form={form}
                label="How do most people currently find you?"
                name="howPeopleFindYou"
                options={[
                  "Google search",
                  "Google Business Profile",
                  "Social media",
                  "Referrals",
                  "Walk-ins only",
                  "Paid ads",
                  "Community events or networking",
                  "Mostly referrals"
                ]}
              />
              <RadioGroup
                form={form}
                label="Do you know why customers choose you?"
                name="knowsWhyChooseYou"
                options={[
                  { label: "Yes", value: "yes" },
                  { label: "Somewhat", value: "somewhat" },
                  { label: "No", value: "no" }
                ]}
              />
              <RadioGroup
                form={form}
                label="Do you know why some customers do not choose you?"
                name="knowsWhyNotChooseYou"
                options={[
                  { label: "Yes", value: "yes" },
                  { label: "Somewhat", value: "somewhat" },
                  { label: "No", value: "no" }
                ]}
              />
              <Field error={form.formState.errors.turnsPeopleAway?.message} label="If yes, what do you think turns them away?">
                <textarea className={`${inputClassName} min-h-28 resize-none`} {...form.register("turnsPeopleAway")} placeholder="Optional comment" />
              </Field>
            </SectionCard>
          ) : null}

          {stepIndex === 3 ? (
            <SectionCard
              title="Current Marketing Activity"
              description="This section captures what the business is actively doing today to stay visible and generate demand."
            >
              <CheckboxGroup
                form={form}
                label="Which marketing activities are you doing consistently right now?"
                name="marketingActivities"
                options={[
                  "Social media posting",
                  "Email marketing",
                  "Text message follow-up",
                  "Google Business Profile updates",
                  "Paid ads",
                  "Referral outreach",
                  "Community partnerships",
                  "None yet"
                ]}
              />
              <RadioGroup
                form={form}
                label="How often do you post on social media?"
                name="socialPostingFrequency"
                options={[
                  "Multiple times a week",
                  "About once a week",
                  "A few times a month",
                  "Rarely",
                  "We do not post"
                ]}
              />
              <RadioGroup
                form={form}
                label="Do you run any promotions or offers?"
                name="runsPromotions"
                options={[
                  { label: "Yes", value: "yes" },
                  { label: "Sometimes", value: "sometimes" },
                  { label: "No", value: "no" }
                ]}
              />
              <RadioGroup
                form={form}
                label="Do you collect customer contact information?"
                name="collectsCustomerInfo"
                options={[
                  { label: "Yes", value: "yes" },
                  { label: "Sometimes", value: "sometimes" },
                  { label: "No", value: "no" }
                ]}
              />
            </SectionCard>
          ) : null}

          {stepIndex === 4 ? (
            <SectionCard
              title="Tracking and Data"
              description="Reliable numbers make it much easier to see what is working and where the next improvement should come from."
            >
              <CheckboxGroup
                form={form}
                label="Do you track any of the following?"
                name="trackedMetrics"
                options={[
                  "Leads by source",
                  "Appointments or consultations booked",
                  "Sales or booked revenue",
                  "Repeat customers",
                  "Reviews",
                  "Website traffic",
                  "None yet"
                ]}
              />
              <RadioGroup
                form={form}
                label="Do you know your busiest days or times?"
                name="knowsBusyTimes"
                options={[
                  { label: "Yes", value: "yes" },
                  { label: "Somewhat", value: "somewhat" },
                  { label: "No", value: "no" }
                ]}
              />
              <RadioGroup
                form={form}
                label="Do you know which marketing efforts bring in customers?"
                name="knowsBestMarketing"
                options={[
                  { label: "Yes", value: "yes" },
                  { label: "Somewhat", value: "somewhat" },
                  { label: "No", value: "no" }
                ]}
              />
              <Field error={form.formState.errors.performanceTrackingMethod?.message} label="How are you currently tracking business performance?">
                <input className={inputClassName} {...form.register("performanceTrackingMethod")} placeholder="Example: Spreadsheet, POS reports, CRM, or mostly by feel" />
              </Field>
            </SectionCard>
          ) : null}

          {stepIndex === 5 ? (
            <SectionCard
              title="Customer Experience and Conversion"
              description="Even when demand is present, the customer experience can make the difference between interest and action."
            >
              <RadioGroup
                form={form}
                label="When customers visit, how often do they usually make a purchase or book a service?"
                name="visitToPurchaseRate"
                options={[
                  "Most of the time",
                  "About half the time",
                  "Lower than it should be",
                  "Not sure"
                ]}
              />
              <RadioGroup
                form={form}
                label="Do employees consistently greet and help customers?"
                name="teamGreetingConsistency"
                options={[
                  { label: "Yes", value: "yes" },
                  { label: "Mostly", value: "mostly" },
                  { label: "No", value: "no" }
                ]}
              />
              <RadioGroup
                form={form}
                label="Do customers clearly understand what you offer and why it is valuable?"
                name="offerClarity"
                options={[
                  { label: "Yes", value: "yes" },
                  { label: "Mostly", value: "mostly" },
                  { label: "No", value: "no" }
                ]}
              />
              <RadioGroup
                form={form}
                label="Do you feel your location, signage, or storefront helps attract people?"
                name="storefrontHelps"
                options={[
                  { label: "Yes", value: "yes" },
                  { label: "Somewhat", value: "somewhat" },
                  { label: "No", value: "no" }
                ]}
              />
              <Field error={form.formState.errors.customerExperienceImprove?.message} label="Anything about the customer experience you want to improve?">
                <textarea className={`${inputClassName} min-h-28 resize-none`} {...form.register("customerExperienceImprove")} placeholder="Optional comment" />
              </Field>
            </SectionCard>
          ) : null}

          {stepIndex === 6 ? (
            <SectionCard
              title="Retention and Loyalty"
              description="Repeat business, follow-up, and referrals can create steadier growth with less acquisition pressure."
            >
              <RadioGroup
                form={form}
                label="How often do past customers come back?"
                name="repeatCustomerFrequency"
                options={[
                  "Often",
                  "Sometimes",
                  "Rarely",
                  "Not sure"
                ]}
              />
              <RadioGroup
                form={form}
                label="Do you have a loyalty or rewards program?"
                name="loyaltyProgram"
                options={[
                  { label: "Yes", value: "yes" },
                  { label: "No", value: "no" }
                ]}
              />
              <RadioGroup
                form={form}
                label="Do you follow up with past customers?"
                name="followUpWithCustomers"
                options={[
                  { label: "Yes", value: "yes" },
                  { label: "Sometimes", value: "sometimes" },
                  { label: "No", value: "no" }
                ]}
              />
              <RadioGroup
                form={form}
                label="Do you ask for reviews or referrals?"
                name="askForReviews"
                options={[
                  { label: "Yes", value: "yes" },
                  { label: "Sometimes", value: "sometimes" },
                  { label: "No", value: "no" }
                ]}
              />
            </SectionCard>
          ) : null}

          {stepIndex === 7 ? (
            <SectionCard
              title="Competitive Position"
              description="This section helps reveal whether the business is clearly differentiated in the local market."
            >
              <RadioGroup
                form={form}
                label="How would you describe your competition nearby?"
                name="competitionDescription"
                options={[
                  "Very crowded and aggressive",
                  "Competitive but manageable",
                  "A few clear competitors",
                  "Not very crowded"
                ]}
              />
              <Field error={form.formState.errors.competitiveDifference?.message} label="What makes your business different?">
                <textarea className={`${inputClassName} min-h-28 resize-none`} {...form.register("competitiveDifference")} placeholder="Example: Faster response, clearer communication, and a more personal experience" />
              </Field>
              <RadioGroup
                form={form}
                label="Do you feel customers clearly notice that difference?"
                name="customersNoticeDifference"
                options={[
                  { label: "Yes", value: "yes" },
                  { label: "Somewhat", value: "somewhat" },
                  { label: "No", value: "no" }
                ]}
              />
            </SectionCard>
          ) : null}

          {stepIndex === 8 ? (
            <SectionCard
              title="Goals and Priorities"
              description="Finish with the result that matters most and the support that would feel most valuable right now."
            >
              <RadioGroup
                form={form}
                label="What result matters most in the next 90 days?"
                name="next90DayResult"
                options={[
                  "More qualified leads",
                  "Higher conversion from inquiries",
                  "Better customer retention",
                  "Clearer marketing direction",
                  "Stronger reporting and visibility"
                ]}
              />
              <CheckboxGroup
                form={form}
                label="What kind of support are you most interested in?"
                name="supportInterest"
                options={[
                  "Marketing strategy",
                  "Lead generation ideas",
                  "Conversion improvements",
                  "Customer experience improvements",
                  "Retention and loyalty ideas",
                  "Reporting and tracking"
                ]}
              />
              <Field error={form.formState.errors.biggestPriority?.message} label="What is your biggest priority right now?">
                <input className={inputClassName} {...form.register("biggestPriority")} placeholder="Example: Bring in more steady, high-quality customers" />
              </Field>
              <Field error={form.formState.errors.notes?.message} label="Anything else you want us to keep in mind?">
                <textarea className={`${inputClassName} min-h-28 resize-none`} {...form.register("notes")} placeholder="Optional comment" />
              </Field>
            </SectionCard>
          ) : null}

          <div className="flex flex-col justify-between gap-4 border-t border-[#e4dacf] pt-6 sm:flex-row">
            <Button
              className="order-3 sm:order-1"
              disabled={stepIndex === 0}
              onClick={() => setStepIndex((current) => Math.max(current - 1, 0))}
              variant="ghost"
            >
              Back
            </Button>
            <div className="order-1 flex flex-col gap-3 sm:order-2 sm:flex-row">
              <Button type="button" variant="secondary">
                Save and Continue Later
              </Button>
              {stepIndex < steps.length - 1 ? (
                <Button onClick={handleNext} type="button">
                  Next
                </Button>
              ) : (
                <Button type="submit">See audit results</Button>
              )}
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}

type FieldProps = {
  children: React.ReactNode;
  label: string;
  error?: string;
  className?: string;
};

type SectionCardProps = {
  children: React.ReactNode;
  title: string;
  description: string;
};

type RadioOption = string | { label: string; value: string };

type ChoiceGroupProps<TFormValues extends FieldValues> = {
  form: UseFormReturn<TFormValues>;
  name: Path<TFormValues>;
  label: string;
  options: RadioOption[];
};

type CheckboxGroupProps<TFormValues extends FieldValues> = {
  form: UseFormReturn<TFormValues>;
  name: Path<TFormValues>;
  label: string;
  options: string[];
};

function Field({ children, label, error, className }: FieldProps) {
  return (
    <label className={className}>
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      {children}
      {error ? <span className="mt-2 block text-sm text-red-600">{error}</span> : null}
    </label>
  );
}

function SectionCard({ children, title, description }: SectionCardProps) {
  return (
    <div className="rounded-[30px] border border-[#e5d9ca] bg-[#fcf8f2] p-6 sm:p-7">
      <div className="max-w-2xl">
        <h3 className="text-xl font-semibold text-ink">{title}</h3>
        <p className="mt-2 text-sm leading-7 text-slate-500">{description}</p>
      </div>
      <div className="mt-6 space-y-6">{children}</div>
    </div>
  );
}

function RadioGroup<TFormValues extends FieldValues>({
  form,
  name,
  label,
  options
}: ChoiceGroupProps<TFormValues>) {
  const error = (
    form.formState.errors as Record<string, { message?: string } | undefined>
  )[name as string]?.message;
  const selectedValue = form.watch(name) as string | undefined;

  return (
    <div>
      <p className="text-sm font-semibold text-slate-700">{label}</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {options.map((option) => {
          const normalized = typeof option === "string" ? { label: option, value: option } : option;
          const checked = selectedValue === normalized.value;

          return (
            <label
              className={`rounded-2xl border px-4 py-4 text-sm transition ${
                checked
                  ? "border-tan-300 bg-tan-50 text-ink"
                  : "border-[#e3d8cc] bg-white/85 text-slate-600 hover:border-tan-200"
              }`}
              key={normalized.value}
            >
              <input className="sr-only" type="radio" value={normalized.value} {...form.register(name)} />
              <span className="font-medium">{normalized.label}</span>
            </label>
          );
        })}
      </div>
      {error ? <span className="mt-2 block text-sm text-red-600">{error}</span> : null}
    </div>
  );
}

function CheckboxGroup<TFormValues extends FieldValues>({
  form,
  name,
  label,
  options
}: CheckboxGroupProps<TFormValues>) {
  const error = (
    form.formState.errors as Record<string, { message?: string } | undefined>
  )[name as string]?.message;
  const selectedValues = (form.watch(name) as string[] | undefined) ?? [];

  return (
    <div>
      <p className="text-sm font-semibold text-slate-700">{label}</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {options.map((option) => {
          const checked = selectedValues.includes(option);

          return (
            <label
              className={`rounded-2xl border px-4 py-4 text-sm transition ${
                checked
                  ? "border-tan-300 bg-tan-50 text-ink"
                  : "border-[#e3d8cc] bg-white/85 text-slate-600 hover:border-tan-200"
              }`}
              key={option}
            >
              <input className="sr-only" type="checkbox" value={option} {...form.register(name)} />
              <span className="font-medium">{option}</span>
            </label>
          );
        })}
      </div>
      {error ? <span className="mt-2 block text-sm text-red-600">{error}</span> : null}
    </div>
  );
}
