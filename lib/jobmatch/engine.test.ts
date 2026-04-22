import { describe, expect, test } from "vitest";
import { analyzeRoleMatch } from "./engine";

describe("analyzeRoleMatch", () => {
  test("finds matched and missing signals", () => {
    const report = analyzeRoleMatch({
      sourceMode: "demo",
      resumeText: `
        Alex Rivera
        - Built weekly reporting for churn and onboarding completion.
        - Managed renewal planning with sales partners.
        - Used Salesforce to maintain account notes.
      `,
      jobDescription: `
        Customer Success Operations Analyst
        Company: Northstar Cloud
        We need SQL, dashboards, onboarding, retention, process improvement, and stakeholder management.
      `,
    });

    expect(report.matchedSignals).toContain("retention");
    expect(report.matchedSignals).toContain("onboarding");
    expect(report.missingSignals).toContain("sql");
    expect(report.stats.bulletCount).toBeGreaterThan(0);
  });

  test("classifies pressure lower when coverage and proof are stronger", () => {
    const report = analyzeRoleMatch({
      sourceMode: "demo",
      resumeText: `
        Jordan Lee
        - Built dashboards used by leadership to review weekly pipeline and retention metrics for 120 accounts.
        - Partnered with RevOps, Finance, and Customer Success stakeholders to redesign onboarding workflows.
        - Used SQL and Excel to analyze churn drivers and automate monthly KPI reporting.
      `,
      jobDescription: `
        Senior Revenue Operations Analyst
        We need SQL, Excel, dashboard, KPI ownership, stakeholder management, automation, and process improvement.
      `,
    });

    expect(report.matchedSignals).toContain("sql");
    expect(report.stats.quantifiedBulletCount).toBeGreaterThan(0);
    expect(["Strong base", "Competitive with tightening"]).toContain(
      report.pressureLabel,
    );
  });
});
