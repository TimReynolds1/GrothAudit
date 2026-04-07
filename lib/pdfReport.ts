import { jsPDF } from "jspdf";
import { brand } from "@/lib/brand";
import { buildRecommendations } from "@/lib/recommendations";
import type { DiagnosisScore, PersistedAuditResult, RecommendationArea } from "@/lib/types";

const PAGE_WIDTH = 210;
const PAGE_HEIGHT = 297;
const MARGIN = 18;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;
const CARD_GAP = 5;

const COLORS = {
  tan: [196, 157, 104] as const,
  charcoal: [46, 40, 35] as const,
  muted: [106, 97, 90] as const,
  border: [223, 213, 200] as const,
  panel: [248, 244, 238] as const
};

type PdfState = {
  doc: jsPDF;
  y: number;
};

export function downloadAuditReport(result: PersistedAuditResult) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });

  const state: PdfState = { doc, y: MARGIN };
  const recommendations = buildRecommendations(result);
  const generatedDate = new Date(result.generatedAt).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  drawHeader(state, result.businessName, generatedDate);
  drawExecutiveSummary(state, recommendations.executiveSummary);
  drawScoreTable(state, result.diagnosis.scores);
  drawTopIssues(state, result);
  drawParagraphListSection(state, "What This Likely Means", recommendations.likelyMeans);
  drawPriorityAreaSection(state, recommendations.priorityAreas);
  drawNumberedSection(state, "30-Day Action Plan", recommendations.actionPlan30);
  drawNumberedSection(state, "90-Day Growth Focus", recommendations.growthFocus90);
  drawChipSection(state, "Suggested KPIs to Track", recommendations.suggestedKpis);
  drawFooter(state.doc);

  const fileName = `${slugify(result.businessName || "business")}-growth-audit-report.pdf`;
  doc.save(fileName);
}

function drawHeader(state: PdfState, businessName: string, generatedDate: string) {
  const { doc } = state;

  doc.setFillColor(...COLORS.panel);
  doc.roundedRect(MARGIN, state.y, CONTENT_WIDTH, 40, 5, 5, "F");

  doc.setDrawColor(...COLORS.border);
  doc.line(MARGIN + 6, state.y + 12, PAGE_WIDTH - MARGIN - 6, state.y + 12);

  doc.setTextColor(...COLORS.tan);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text(brand.firmName.toUpperCase(), MARGIN + 6, state.y + 8);

  doc.setTextColor(...COLORS.charcoal);
  doc.setFontSize(22);
  doc.text(businessName || "Local Business", MARGIN + 6, state.y + 24);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...COLORS.muted);
  doc.text(brand.reportTitle, MARGIN + 6, state.y + 30);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...COLORS.muted);
  doc.text(`Date generated: ${generatedDate}`, PAGE_WIDTH - MARGIN - 6, state.y + 8, {
    align: "right"
  });
  doc.text(brand.tagline, PAGE_WIDTH - MARGIN - 6, state.y + 14, {
    align: "right"
  });

  state.y += 50;
}

function drawExecutiveSummary(state: PdfState, summary: string) {
  const summaryLines = blockHeight(state.doc, summary, 10, CONTENT_WIDTH - 12);
  ensureSpace(state, summaryLines + 28);

  sectionHeading(state, "Executive Summary");
  drawParagraphPanel(state, summary);
}

function drawScoreTable(state: PdfState, scores: DiagnosisScore[]) {
  ensureSpace(state, 28);
  sectionHeading(state, "Category Scores");

  for (const score of scores) {
    ensureSpace(state, 16);

    const rowTop = state.y;
    state.doc.setFillColor(...COLORS.panel);
    state.doc.setDrawColor(...COLORS.border);
    state.doc.roundedRect(MARGIN, rowTop, CONTENT_WIDTH, 12, 3, 3, "FD");

    state.doc.setFont("helvetica", "bold");
    state.doc.setFontSize(10);
    state.doc.setTextColor(...COLORS.charcoal);
    state.doc.text(score.category, MARGIN + 5, rowTop + 7.5);

    state.doc.setTextColor(...COLORS.tan);
    state.doc.text(`${score.score}/100`, PAGE_WIDTH - MARGIN - 5, rowTop + 7.5, {
      align: "right"
    });

    const barX = MARGIN + 5;
    const barY = rowTop + 9;
    const barWidth = CONTENT_WIDTH - 50;
    state.doc.setFillColor(255, 255, 255);
    state.doc.roundedRect(barX, barY, barWidth, 1.8, 1, 1, "F");
    state.doc.setFillColor(...COLORS.tan);
    state.doc.roundedRect(barX, barY, (barWidth * score.score) / 100, 1.8, 1, 1, "F");

    state.y += 15;
  }

  state.y += 2;
}

function drawTopIssues(state: PdfState, result: PersistedAuditResult) {
  ensureSpace(state, 28);
  sectionHeading(state, "Top Issues");

  const rankedIssues = [
    { label: "Primary Issue", item: result.diagnosis.primaryIssue },
    { label: "Secondary Issue", item: result.diagnosis.secondaryIssue },
    { label: "Tertiary Issue", item: result.diagnosis.tertiaryIssue }
  ];

  for (const rankedIssue of rankedIssues) {
    ensureSpace(state, 20);

    const rowTop = state.y;
    state.doc.setFillColor(...COLORS.panel);
    state.doc.setDrawColor(...COLORS.border);
    state.doc.roundedRect(MARGIN, rowTop, CONTENT_WIDTH, 16, 3, 3, "FD");

    state.doc.setFont("helvetica", "bold");
    state.doc.setFontSize(10);
    state.doc.setTextColor(...COLORS.charcoal);
    state.doc.text(rankedIssue.label, MARGIN + 5, rowTop + 6.5);
    state.doc.setFont("helvetica", "normal");
    state.doc.setTextColor(...COLORS.muted);
    state.doc.text(
      `${rankedIssue.item.category} (${rankedIssue.item.score}/100)`,
      MARGIN + 5,
      rowTop + 11.5
    );

    state.y += 19;
  }

  state.y += 2;
}

function drawParagraphListSection(state: PdfState, title: string, items: string[]) {
  ensureSpace(state, 24);
  sectionHeading(state, title);

  for (const item of items) {
    const height = blockHeight(state.doc, item, 10, CONTENT_WIDTH - 12);
    ensureSpace(state, height + 18);
    drawParagraphPanel(state, item);
  }
}

function drawPriorityAreaSection(state: PdfState, areas: RecommendationArea[]) {
  ensureSpace(state, 24);
  sectionHeading(state, "Priority Areas");

  for (const area of areas) {
    state.doc.setFont("helvetica", "bold");
    state.doc.setFontSize(11);
    const titleLines = state.doc.splitTextToSize(area.title, CONTENT_WIDTH - 12);
    const titleHeight = titleLines.length * 5;

    state.doc.setFont("helvetica", "normal");
    state.doc.setFontSize(10);
    const bodyLines = state.doc.splitTextToSize(area.description, CONTENT_WIDTH - 12);
    const bodyHeight = bodyLines.length * 5;
    ensureSpace(state, titleHeight + bodyHeight + 22);

    const panelHeight = titleHeight + bodyHeight + 14;
    state.doc.setFillColor(...COLORS.panel);
    state.doc.setDrawColor(...COLORS.border);
    state.doc.roundedRect(MARGIN, state.y, CONTENT_WIDTH, panelHeight, 3, 3, "FD");

    state.doc.setFillColor(...COLORS.tan);
    state.doc.roundedRect(MARGIN, state.y, 4, panelHeight, 2, 2, "F");

    state.doc.setFont("helvetica", "bold");
    state.doc.setFontSize(11);
    state.doc.setTextColor(...COLORS.charcoal);
    state.doc.text(titleLines, MARGIN + 10, state.y + 8);

    state.doc.setFont("helvetica", "normal");
    state.doc.setFontSize(10);
    state.doc.setTextColor(...COLORS.muted);
    state.doc.text(bodyLines, MARGIN + 10, state.y + 12 + titleHeight);

    state.y += panelHeight + CARD_GAP;
  }

  state.y += 2;
}

function drawNumberedSection(state: PdfState, title: string, items: string[]) {
  ensureSpace(state, 24);
  sectionHeading(state, title);

  items.forEach((item, index) => {
    const textLines = state.doc.splitTextToSize(item, CONTENT_WIDTH - 24);
    const textHeight = textLines.length * 5;
    const rowHeight = Math.max(17, textHeight + 8);
    ensureSpace(state, rowHeight + 6);

    state.doc.setFillColor(255, 255, 255);
    state.doc.setDrawColor(...COLORS.border);
    state.doc.roundedRect(MARGIN, state.y, CONTENT_WIDTH, rowHeight, 3, 3, "FD");

    state.doc.setFillColor(...COLORS.tan);
    state.doc.circle(MARGIN + 9, state.y + 8, 4.5, "F");
    state.doc.setTextColor(255, 255, 255);
    state.doc.setFont("helvetica", "bold");
    state.doc.setFontSize(9);
    state.doc.text(String(index + 1), MARGIN + 9, state.y + 9, { align: "center" });

    state.doc.setTextColor(...COLORS.charcoal);
    state.doc.setFont("helvetica", "normal");
    state.doc.setFontSize(10);
    state.doc.text(textLines, MARGIN + 18, state.y + 8);

    state.y += rowHeight + CARD_GAP;
  });

  state.y += 2;
}

function drawChipSection(state: PdfState, title: string, items: string[]) {
  ensureSpace(state, 24);
  sectionHeading(state, title);

  for (const item of items) {
    const height = blockHeight(state.doc, item, 10, CONTENT_WIDTH - 12);
    ensureSpace(state, height + 16);

    state.doc.setFillColor(...COLORS.panel);
    state.doc.setDrawColor(...COLORS.border);
    state.doc.roundedRect(MARGIN, state.y, CONTENT_WIDTH, height + 8, 3, 3, "FD");
    state.doc.setFont("helvetica", "normal");
    state.doc.setFontSize(10);
    state.doc.setTextColor(...COLORS.charcoal);
    state.doc.text(state.doc.splitTextToSize(item, CONTENT_WIDTH - 12), MARGIN + 6, state.y + 7);

    state.y += height + 12;
  }
}

function sectionHeading(state: PdfState, title: string) {
  ensureSpace(state, 16);
  state.doc.setFont("helvetica", "bold");
  state.doc.setFontSize(9);
  state.doc.setTextColor(...COLORS.tan);
  state.doc.text(title.toUpperCase(), MARGIN, state.y);

  state.doc.setFontSize(16);
  state.doc.setTextColor(...COLORS.charcoal);
  state.doc.text(title, MARGIN, state.y + 7);
  state.doc.setDrawColor(...COLORS.border);
  state.doc.line(MARGIN, state.y + 10, PAGE_WIDTH - MARGIN, state.y + 10);
  state.y += 16;
}

function drawParagraphPanel(state: PdfState, text: string) {
  const height = blockHeight(state.doc, text, 10, CONTENT_WIDTH - 12);
  const lines = state.doc.splitTextToSize(text, CONTENT_WIDTH - 12);

  state.doc.setFillColor(255, 255, 255);
  state.doc.setDrawColor(...COLORS.border);
  state.doc.roundedRect(MARGIN, state.y, CONTENT_WIDTH, height + 10, 3, 3, "FD");

  state.doc.setFont("helvetica", "normal");
  state.doc.setFontSize(10);
  state.doc.setTextColor(...COLORS.muted);
  state.doc.text(lines, MARGIN + 6, state.y + 8);

  state.y += height + 14;
}

function ensureSpace(state: PdfState, neededHeight: number) {
  if (state.y + neededHeight <= PAGE_HEIGHT - MARGIN) {
    return;
  }

  drawFooter(state.doc);
  state.doc.addPage();
  state.y = MARGIN;
}

function drawFooter(doc: jsPDF) {
  doc.setDrawColor(...COLORS.border);
  doc.line(MARGIN, PAGE_HEIGHT - 14, PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 14);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...COLORS.muted);
  doc.text(`Prepared by ${brand.firmName}`, MARGIN, PAGE_HEIGHT - 8);
}

function blockHeight(doc: jsPDF, text: string, fontSize: number, width: number) {
  doc.setFontSize(fontSize);
  const lines = doc.splitTextToSize(text, width);
  return lines.length * 5;
}

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
