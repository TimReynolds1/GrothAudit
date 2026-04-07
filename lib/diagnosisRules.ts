import type {
  DiagnosisCategory,
  DiagnosisScore,
  DiagnosisSummary,
  IntakeFormValues
} from "@/lib/types";

type CategoryRule = {
  points: number;
  when: (values: IntakeFormValues) => boolean;
};

type CategoryConfig = {
  label: DiagnosisCategory;
  rules: CategoryRule[];
};

const CATEGORY_CONFIG: CategoryConfig[] = [
  {
    label: "Awareness",
    rules: [
      {
        points: 28,
        when: (values) =>
          values.slowReason === "Not enough people know about us" ||
          values.biggestChallenge === "Not enough new customers"
      },
      {
        points: 24,
        when: (values) =>
          values.howPeopleFindYou.includes("Walk-ins only") ||
          values.howPeopleFindYou.includes("Mostly referrals")
      },
      {
        points: 26,
        when: (values) =>
          values.marketingActivities.includes("None yet") ||
          values.socialPostingFrequency === "Rarely" ||
          values.socialPostingFrequency === "We do not post"
      },
      {
        points: 22,
        when: (values) => values.knowsBestMarketing === "no"
      }
    ]
  },
  {
    label: "Conversion",
    rules: [
      {
        points: 30,
        when: (values) => values.visitToPurchaseRate === "Lower than it should be"
      },
      {
        points: 25,
        when: (values) => values.offerClarity === "no"
      },
      {
        points: 20,
        when: (values) => values.storefrontHelps === "no"
      },
      {
        points: 25,
        when: (values) => values.teamGreetingConsistency === "no"
      }
    ]
  },
  {
    label: "Retention",
    rules: [
      {
        points: 30,
        when: (values) => values.repeatCustomerFrequency === "Rarely"
      },
      {
        points: 18,
        when: (values) => values.loyaltyProgram === "no"
      },
      {
        points: 26,
        when: (values) => values.followUpWithCustomers === "no"
      },
      {
        points: 26,
        when: (values) => values.collectsCustomerInfo === "no"
      }
    ]
  },
  {
    label: "Differentiation",
    rules: [
      {
        points: 28,
        when: (values) =>
          values.competitiveDifference.trim().length < 12 ||
          values.clearReasonToChoose === "no"
      },
      {
        points: 32,
        when: (values) => values.competitionDescription === "Very crowded and aggressive"
      },
      {
        points: 24,
        when: (values) => values.customersNoticeDifference === "no"
      },
      {
        points: 16,
        when: (values) => values.clearReasonToChoose === "somewhat"
      }
    ]
  },
  {
    label: "Tracking / Analytics",
    rules: [
      {
        points: 34,
        when: (values) => values.trackedMetrics.includes("None yet")
      },
      {
        points: 18,
        when: (values) => values.knowsBusyTimes === "no"
      },
      {
        points: 24,
        when: (values) => values.knowsBestMarketing === "no"
      },
      {
        points: 24,
        when: (values) =>
          values.performanceTrackingMethod === "Mostly by feel" ||
          values.performanceTrackingMethod.toLowerCase().includes("feel") ||
          values.performanceTrackingMethod.toLowerCase().includes("memory") ||
          values.performanceTrackingMethod.toLowerCase().includes("guess")
      }
    ]
  },
  {
    label: "Reputation / Trust",
    rules: [
      {
        points: 28,
        when: (values) => values.askForReviews === "no"
      },
      {
        points: 24,
        when: (values) =>
          !values.trackedMetrics.includes("Reviews") &&
          !values.marketingActivities.includes("Google Business Profile updates")
      },
      {
        points: 24,
        when: (values) =>
          values.knowsWhyChooseYou === "no" ||
          values.clearReasonToChoose === "no"
      },
      {
        points: 18,
        when: (values) => values.customersNoticeDifference === "no"
      }
    ]
  }
];

const CATEGORY_EXPLANATIONS: Record<DiagnosisCategory, string> = {
  Awareness:
    "not enough of the right local customers are consistently finding the business",
  Conversion:
    "interest is not turning into enough purchases or booked work",
  Retention:
    "the business is not getting enough repeat visits, follow-up, or returning customers",
  Differentiation:
    "the market may not be seeing a clear reason to choose this business",
  "Tracking / Analytics":
    "the business may be making decisions without enough reliable performance data",
  "Reputation / Trust":
    "trust signals such as reviews, clarity, and social proof may be too weak"
};

function clampScore(value: number) {
  return Math.max(0, Math.min(100, value));
}

export function calculateDiagnosisScores(
  values: IntakeFormValues
): DiagnosisScore[] {
  return CATEGORY_CONFIG.map((category) => {
    const rawScore = category.rules.reduce((total, rule) => {
      return total + (rule.when(values) ? rule.points : 0);
    }, 0);

    return {
      category: category.label,
      score: clampScore(rawScore)
    };
  });
}

export function generateDiagnosisSummary(
  values: IntakeFormValues
): DiagnosisSummary {
  const scores = calculateDiagnosisScores(values).sort(
    (left, right) => right.score - left.score
  );

  const [primaryIssue, secondaryIssue, tertiaryIssue] = scores;

  const executiveSummary =
    primaryIssue.score === 0
      ? "The intake suggests a relatively balanced business with no single severe breakdown, though there is still room to refine visibility, conversion, and reporting."
      : `The strongest signal is ${primaryIssue.category.toLowerCase()}, which suggests ${CATEGORY_EXPLANATIONS[primaryIssue.category]}. Secondary pressure appears to be ${secondaryIssue.category.toLowerCase()}, followed by ${tertiaryIssue.category.toLowerCase()}.`;

  return {
    scores,
    primaryIssue,
    secondaryIssue,
    tertiaryIssue,
    executiveSummary
  };
}
