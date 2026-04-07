import type {
  DiagnosisCategory,
  DiagnosisScore,
  PersistedAuditResult,
  RecommendationArea,
  RecommendationPlan
} from "@/lib/types";

type RecommendationTemplate = {
  summaryLead: string;
  likelyMeans: string;
  priorityTitle: string;
  priorityDescription: string;
  actionPlan30: string[];
  growthFocus90: string[];
  suggestedKpis: string[];
};

const RECOMMENDATION_TEMPLATES: Record<DiagnosisCategory, RecommendationTemplate> = {
  Awareness: {
    summaryLead:
      "local visibility is likely too inconsistent for a steady flow of qualified new customers",
    likelyMeans:
      "The business may be depending too heavily on walk-by traffic, word of mouth, or occasional bursts of promotion instead of a repeatable local visibility system.",
    priorityTitle: "Build steady local visibility",
    priorityDescription:
      "Make sure more of the right people can find the business consistently through local search, signage, social presence, and referral visibility.",
    actionPlan30: [
      "Refresh the Google Business Profile with updated services, photos, hours, and a clear business description.",
      "Set a simple weekly marketing rhythm: one local offer, one customer proof post, and one reminder post each week.",
      "Ask every new customer how they heard about the business and record the answer in one shared tracker."
    ],
    growthFocus90: [
      "Commit to a 90-day local visibility calendar covering social posts, Google Business updates, community partnerships, and seasonal offers.",
      "Test two customer acquisition channels and compare which one brings the most inquiries or foot traffic.",
      "Tighten referral prompts so satisfied customers actively recommend the business."
    ],
    suggestedKpis: [
      "Google Business interactions",
      "Website visits from local search",
      "Walk-in traffic",
      "New customer inquiries",
      "Customer source tracking"
    ]
  },
  Conversion: {
    summaryLead:
      "interest is reaching the business, but too much of that interest is not turning into purchases or booked work",
    likelyMeans:
      "Customers may be arriving with some level of intent, but the offer, front-line experience, or storefront clarity is not making the next step easy enough.",
    priorityTitle: "Improve conversion at the point of decision",
    priorityDescription:
      "Clarify the offer, strengthen staff interactions, and remove friction so more visitors become paying customers.",
    actionPlan30: [
      "Rewrite the main offer in plain language so customers can understand the value in under 10 seconds.",
      "Check the storefront, front desk, or service intake flow and fix any unclear signage, pricing confusion, or missing calls to action.",
      "Create a short staff script for greeting customers, identifying needs, and confidently recommending the next step."
    ],
    growthFocus90: [
      "Run a 90-day offer test with one core package or promotion and measure conversion by week.",
      "Coach the team on consistent customer handling and review conversion blockers every two weeks.",
      "Standardize the most effective sales or booking conversation so customers hear a clear and repeatable value message."
    ],
    suggestedKpis: [
      "Visit-to-purchase rate",
      "Booking conversion rate",
      "Offer redemption rate",
      "Average order value",
      "Lead response time"
    ]
  },
  Retention: {
    summaryLead:
      "the business may be working too hard for each sale because too few customers are coming back",
    likelyMeans:
      "There may be limited follow-up, weak customer capture, or no structured reason for past customers to return again soon.",
    priorityTitle: "Turn more first-time customers into repeat customers",
    priorityDescription:
      "Put simple retention systems in place so the business keeps more value from every customer it already earns.",
    actionPlan30: [
      "Start collecting customer contact details at checkout or after service with a simple opt-in process.",
      "Create one follow-up message that goes out after the first visit with a thank-you, reminder, or return offer.",
      "Launch a basic loyalty or repeat-visit incentive that is easy for both staff and customers to understand."
    ],
    growthFocus90: [
      "Build a 90-day retention cadence with reminders, bounce-back offers, and reactivation outreach to quiet customers.",
      "Track repeat behavior by customer segment so the business knows who comes back and who needs more follow-up.",
      "Add referral prompts into the follow-up flow so satisfied customers help create the next wave of demand."
    ],
    suggestedKpis: [
      "Repeat customer rate",
      "Customer contact capture rate",
      "Follow-up completion rate",
      "Loyalty program participation",
      "Referral rate"
    ]
  },
  Differentiation: {
    summaryLead:
      "the business may not be standing out clearly enough in a competitive local market",
    likelyMeans:
      "Customers may see several similar options nearby and not immediately understand why this business is the better choice for their needs.",
    priorityTitle: "Clarify what makes the business the better choice",
    priorityDescription:
      "Define and communicate the business's difference clearly so customers can understand why they should choose it over nearby alternatives.",
    actionPlan30: [
      "Write a short positioning statement that explains who the business serves, what it does best, and why that matters.",
      "Update the homepage, social bios, and in-store messaging so the same differentiator shows up everywhere customers look.",
      "Ask five recent customers what they value most and use their wording to sharpen the business message."
    ],
    growthFocus90: [
      "Build a stronger proof-based brand message using testimonials, before-and-after examples, or service guarantees.",
      "Align offers, signage, and staff language around the same differentiator so the market hears one consistent message.",
      "Track which value messages produce the best response and double down on the strongest one."
    ],
    suggestedKpis: [
      "Quote-to-close rate",
      "Offer response rate",
      "Customer survey clarity score",
      "Competitive win rate",
      "Referral mentions of differentiators"
    ]
  },
  "Tracking / Analytics": {
    summaryLead:
      "important business decisions are likely being made with too little reliable performance data",
    likelyMeans:
      "Without a simple tracking habit, it becomes hard to tell which days, offers, or marketing activities are helping and which ones are wasting effort.",
    priorityTitle: "Create a practical scorecard for business decisions",
    priorityDescription:
      "Build a simple reporting rhythm so the owner can see what is working, what is slipping, and where to focus each week.",
    actionPlan30: [
      "Set up one weekly scorecard that captures traffic, sales, source of customers, repeat visits, and reviews.",
      "Start tracking busiest days, busiest times, and the top reasons customers come in.",
      "Review marketing activity weekly and note which efforts generated calls, visits, or bookings."
    ],
    growthFocus90: [
      "Build a 90-day reporting cadence with weekly review points and one monthly decision meeting.",
      "Use the scorecard to compare offers, channels, and staffing patterns so adjustments are based on evidence.",
      "Remove any activity that is not producing measurable business movement and reinvest in what is working."
    ],
    suggestedKpis: [
      "Customer source tracking",
      "Weekly sales trend",
      "Busiest day and time performance",
      "Marketing-attributed leads",
      "Offer response rate"
    ]
  },
  "Reputation / Trust": {
    summaryLead:
      "buyers may need stronger proof and reassurance before they feel confident choosing the business",
    likelyMeans:
      "Even if the business delivers good work, weak review habits, limited testimonials, or unclear trust signals can slow down customer decision-making.",
    priorityTitle: "Strengthen proof, credibility, and trust signals",
    priorityDescription:
      "Make trust easier for new customers by actively gathering reviews, showcasing proof, and reinforcing professionalism across touchpoints.",
    actionPlan30: [
      "Create a simple review request process and ask happy customers within 24 hours of a positive experience.",
      "Add testimonials, review highlights, or proof points to the website, social profiles, and customer-facing materials.",
      "Tighten brand basics such as service descriptions, contact details, and photos so the business looks dependable everywhere customers check."
    ],
    growthFocus90: [
      "Build a steady review pipeline with weekly targets and staff accountability.",
      "Organize customer proof by service type so prospects can quickly find examples that match their needs.",
      "Use trust-building content such as customer stories, guarantees, or FAQs to reduce hesitation before purchase."
    ],
    suggestedKpis: [
      "Review count",
      "Average review rating",
      "Review request completion rate",
      "Website trust-content engagement",
      "Referral volume"
    ]
  }
};

export function buildRecommendations(
  result: PersistedAuditResult
): RecommendationPlan {
  const topIssues = [
    result.diagnosis.primaryIssue,
    result.diagnosis.secondaryIssue,
    result.diagnosis.tertiaryIssue
  ];

  const topTemplates = topIssues.map((issue) => ({
    issue,
    template: RECOMMENDATION_TEMPLATES[issue.category]
  }));

  const executiveSummary = buildExecutiveSummary(result, topTemplates);
  const likelyMeans = topTemplates.map(({ template, issue }) =>
    `${issue.category}: ${template.likelyMeans}`
  );
  const priorityAreas = topTemplates.map(({ template, issue }) =>
    toPriorityArea(issue, template)
  );
  const actionPlan30 = dedupeItems(topTemplates.flatMap(({ template }) => template.actionPlan30), 6);
  const growthFocus90 = dedupeItems(topTemplates.flatMap(({ template }) => template.growthFocus90), 6);
  const suggestedKpis = dedupeItems(topTemplates.flatMap(({ template }) => template.suggestedKpis), 6);

  return {
    executiveSummary,
    likelyMeans,
    priorityAreas,
    actionPlan30,
    growthFocus90,
    suggestedKpis
  };
}

function buildExecutiveSummary(
  result: PersistedAuditResult,
  topTemplates: { issue: DiagnosisScore; template: RecommendationTemplate }[]
) {
  const [primary, secondary, tertiary] = topTemplates;
  const goal = result.intake.mainGoal.toLowerCase();

  return `${result.businessName} appears to be facing its biggest growth pressure in ${primary.issue.category.toLowerCase()}, with additional drag coming from ${secondary.issue.category.toLowerCase()} and ${tertiary.issue.category.toLowerCase()}. This usually means ${primary.template.summaryLead}. To support the current goal of ${goal}, the business should focus first on the areas that improve near-term performance fastest while building a more repeatable growth system.`;
}

function toPriorityArea(
  issue: DiagnosisScore,
  template: RecommendationTemplate
): RecommendationArea {
  return {
    title: template.priorityTitle,
    description: `${template.priorityDescription} Current pressure score: ${issue.score}/100 in ${issue.category}.`
  };
}

function dedupeItems(items: string[], limit: number) {
  const seen = new Set<string>();
  const results: string[] = [];

  for (const item of items) {
    const key = item.toLowerCase();
    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    results.push(item);

    if (results.length === limit) {
      break;
    }
  }

  return results;
}
