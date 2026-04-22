import type { MatchReport } from "./types";

type AnalyzeRoleMatchInput = {
  resumeText: string;
  jobDescription: string;
  sourceMode: "demo" | "live";
};

type SignalDefinition = {
  term: string;
  aliases: string[];
  proofPrompt: string;
};

const signalDefinitions: SignalDefinition[] = [
  {
    term: "sql",
    aliases: ["sql"],
    proofPrompt:
      "If SQL is real experience, name one query type, dataset, or KPI you pulled with it.",
  },
  {
    term: "excel",
    aliases: ["excel", "spreadsheet", "spreadsheets"],
    proofPrompt:
      "If Excel is a strength, add the model, analysis, or reporting workflow you owned.",
  },
  {
    term: "dashboarding",
    aliases: ["dashboard", "dashboards", "reporting", "visualization"],
    proofPrompt:
      "If dashboard work was meaningful, mention the audience and the decisions those dashboards supported.",
  },
  {
    term: "stakeholder management",
    aliases: ["stakeholder", "stakeholders", "cross-functional", "cross functional"],
    proofPrompt:
      "If you managed stakeholders, name the teams, the cadence, and one decision you influenced.",
  },
  {
    term: "process improvement",
    aliases: ["process improvement", "workflow", "process design", "playbook"],
    proofPrompt:
      "If you improved a process, add the bottleneck, the change, and what got faster or cleaner.",
  },
  {
    term: "automation",
    aliases: ["automation", "automate", "automated"],
    proofPrompt:
      "If you automated work, specify what manual step disappeared and how often the task used to happen.",
  },
  {
    term: "salesforce",
    aliases: ["salesforce", "crm"],
    proofPrompt:
      "If you used Salesforce or another CRM, mention the object, workflow, or report you touched most.",
  },
  {
    term: "retention",
    aliases: ["retention", "renewal", "renewals", "churn"],
    proofPrompt:
      "If retention work matters for this role, add the churn, renewal, or health signal you owned.",
  },
  {
    term: "onboarding",
    aliases: ["onboarding", "implementation", "adoption"],
    proofPrompt:
      "If onboarding is relevant, show the milestone, completion metric, or handoff you improved.",
  },
  {
    term: "experimentation",
    aliases: ["experiment", "experimentation", "a/b", "ab test", "testing"],
    proofPrompt:
      "If you ran experiments, name the hypothesis, channel, and decision that followed.",
  },
  {
    term: "analytics",
    aliases: ["analytics", "analysis", "analyze", "analytical"],
    proofPrompt:
      "If analysis is core to your work, describe the business question and the recommendation you produced.",
  },
  {
    term: "kpi ownership",
    aliases: ["kpi", "metric", "metrics", "health score"],
    proofPrompt:
      "If you owned KPIs, say which ones and how often leadership looked at them.",
  },
  {
    term: "presentation",
    aliases: ["present", "presentation", "presenting", "business review"],
    proofPrompt:
      "If you presented to leadership or clients, note the forum and the action you were driving.",
  },
];

const weakVerbReplacements: Array<[RegExp, string]> = [
  [/^worked with\b/i, "Partnered with"],
  [/^worked on\b/i, "Built"],
  [/^helped\b/i, "Supported"],
  [/^responsible for\b/i, "Owned"],
  [/^did\b/i, "Executed"],
  [/^handled\b/i, "Owned"],
  [/^created\b/i, "Built"],
];

const metricPattern = /(\$|%|\b\d+\b|x\b|percent|million|thousand)/i;

export function analyzeRoleMatch({
  resumeText,
  jobDescription,
  sourceMode,
}: AnalyzeRoleMatchInput): MatchReport {
  const cleanResume = resumeText.trim();
  const cleanJob = jobDescription.trim();

  if (cleanResume.length < 80 || cleanJob.length < 80) {
    throw new Error("Paste more complete text for both the resume and job description.");
  }

  const roleTitle = extractRoleTitle(cleanJob);
  const companyHint = extractCompanyHint(cleanJob);
  const resumeSignals = extractSignals(cleanResume);
  const jobSignals = extractSignals(cleanJob);
  const matchedSignals = jobSignals.filter((term) => resumeSignals.includes(term));
  const missingSignals = jobSignals.filter((term) => !resumeSignals.includes(term));
  const bullets = extractResumeBullets(cleanResume);
  const quantifiedBulletCount = bullets.filter((bullet) =>
    metricPattern.test(bullet),
  ).length;
  const bulletRepairs = bullets.slice(0, 4).map((bullet) =>
    repairBullet(bullet, jobSignals),
  );

  return {
    sourceMode,
    roleTitle,
    companyHint,
    marketMessage:
      "Best fit for product, ops, analyst, growth, and customer-success roles.",
    pressureLabel: describePressure({
      matchedCount: matchedSignals.length,
      missingCount: missingSignals.length,
      quantifiedBulletCount,
    }),
    createdAt: new Date().toISOString(),
    matchedSignals,
    missingSignals: missingSignals.slice(0, 7),
    bulletRepairs,
    proofPrompts: buildProofPrompts({
      bullets,
      missingSignals,
      matchedSignals,
    }),
    interviewPrompts: buildInterviewPrompts({
      bullets,
      matchedSignals,
      roleTitle,
    }),
    pitch: buildPitch({
      roleTitle,
      matchedSignals,
      bullets,
    }),
    stats: {
      matchedCount: matchedSignals.length,
      missingCount: missingSignals.length,
      bulletCount: bullets.length,
      quantifiedBulletCount,
    },
  };
}

function extractSignals(text: string) {
  const normalized = text.toLowerCase();
  return signalDefinitions
    .filter((definition) =>
      definition.aliases.some((alias) => normalized.includes(alias)),
    )
    .map((definition) => definition.term);
}

function extractRoleTitle(jobDescription: string) {
  const lines = jobDescription
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const firstLine = lines[0] ?? "Target role";
  return firstLine.replace(/^title:\s*/i, "");
}

function extractCompanyHint(jobDescription: string) {
  const companyLine = jobDescription
    .split("\n")
    .map((line) => line.trim())
    .find((line) => /^company:/i.test(line));

  if (companyLine) {
    return companyLine.replace(/^company:\s*/i, "");
  }

  const match = jobDescription.match(/\bat\s+([A-Z][A-Za-z0-9&.\- ]{2,40})/);
  return match?.[1]?.trim() ?? "Target company";
}

function extractResumeBullets(resumeText: string) {
  const lines = resumeText
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const explicitBullets = lines
    .filter(
      (line) =>
        /^[-*•]/.test(line) ||
        /^[A-Z][a-z]+ed\b/.test(line) ||
        /^[A-Z][a-z]+ing\b/.test(line),
    )
    .map(stripBulletPrefix)
    .filter((line) => line.length > 20);

  if (explicitBullets.length > 0) {
    return explicitBullets.slice(0, 6);
  }

  return resumeText
    .split(/[.?!]\s+/)
    .map((line) => line.trim())
    .filter((line) => line.length > 30)
    .slice(0, 6);
}

function repairBullet(bullet: string, jobSignals: string[]) {
  const rewritten = tightenBullet(bullet);
  const relatedSignal = jobSignals.find((signal) =>
    bullet.toLowerCase().includes(signal.split(" ")[0]),
  );
  const quantified = metricPattern.test(bullet);

  let why = quantified
    ? "This version keeps the action first and makes the proof easier to scan."
    : "This version tightens the verb, but it still needs scope or outcome proof if the candidate can supply it.";

  if (!quantified && relatedSignal) {
    why += ` If true, make the ${relatedSignal} angle more explicit.`;
  }

  return {
    original: bullet,
    rewritten,
    why,
  };
}

function tightenBullet(bullet: string) {
  const base = stripBulletPrefix(bullet).replace(/\.$/, "").trim();
  const matchedReplacement = weakVerbReplacements.find(([pattern]) =>
    pattern.test(base),
  );

  if (matchedReplacement) {
    const [pattern, replacement] = matchedReplacement;
    return base.replace(pattern, replacement);
  }

  if (/^[a-z]/.test(base)) {
    return `${base.charAt(0).toUpperCase()}${base.slice(1)}`;
  }

  return base;
}

function stripBulletPrefix(line: string) {
  return line.replace(/^[-*•]\s*/, "").trim();
}

function buildProofPrompts({
  bullets,
  missingSignals,
  matchedSignals,
}: {
  bullets: string[];
  missingSignals: string[];
  matchedSignals: string[];
}) {
  const prompts = new Set<string>();

  bullets
    .filter((bullet) => !metricPattern.test(bullet))
    .slice(0, 3)
    .forEach((bullet) => {
      prompts.add(
        `For "${stripBulletPrefix(
          bullet,
        )}", add volume, cadence, team scope, or business result if the candidate can prove it.`,
      );
    });

  missingSignals.slice(0, 3).forEach((signal) => {
    const definition = signalDefinitions.find((item) => item.term === signal);
    if (definition) {
      prompts.add(definition.proofPrompt);
    }
  });

  if (matchedSignals.includes("stakeholder management")) {
    prompts.add(
      "Name one cross-functional project where the candidate had to align teams that wanted different outcomes.",
    );
  }

  return [...prompts].slice(0, 5);
}

function buildInterviewPrompts({
  bullets,
  matchedSignals,
  roleTitle,
}: {
  bullets: string[];
  matchedSignals: string[];
  roleTitle: string;
}) {
  const prompts: MatchReport["interviewPrompts"] = [];

  if (
    matchedSignals.includes("dashboarding") ||
    matchedSignals.includes("analytics")
  ) {
    prompts.push({
      title: "Data to decision",
      prompt:
        "Walk me through a time you turned reporting or analysis into a concrete recommendation. What was the question, what did you look at, and what changed after your recommendation?",
    });
  }

  if (
    matchedSignals.includes("stakeholder management") ||
    matchedSignals.includes("presentation")
  ) {
    prompts.push({
      title: "Cross-functional influence",
      prompt:
        "Tell me about a project where you had to align multiple stakeholders. What friction showed up, and how did you keep the work moving?",
    });
  }

  if (
    matchedSignals.includes("process improvement") ||
    matchedSignals.includes("automation")
  ) {
    prompts.push({
      title: "Workflow repair",
      prompt:
        "Describe a broken workflow you improved. What was wasting time before, what change did you make, and how did you know it helped?",
    });
  }

  if (matchedSignals.includes("retention") || matchedSignals.includes("onboarding")) {
    prompts.push({
      title: "Customer lifecycle judgment",
      prompt:
        "Share a time you spotted onboarding or churn risk early. What signal told you there was a problem, and what action followed?",
    });
  }

  if (prompts.length < 4) {
    const strongestBullet = bullets[0] ?? `your work related to ${roleTitle}`;
    prompts.push({
      title: "Core story",
      prompt: `Prepare a STAR answer built around this proof point: "${stripBulletPrefix(
        strongestBullet,
      )}". Anchor it in business impact, not just activity.`,
    });
  }

  return prompts.slice(0, 4);
}

function buildPitch({
  roleTitle,
  matchedSignals,
  bullets,
}: {
  roleTitle: string;
  matchedSignals: string[];
  bullets: string[];
}) {
  const strongestSignals = matchedSignals.slice(0, 3).join(", ");
  const strongestBullet = stripBulletPrefix(bullets[0] ?? "");

  return `I am targeting ${roleTitle} roles where the value is turning messy workflows and customer signals into cleaner decisions. My background already shows ${strongestSignals || "relevant operational work"}, and one of the strongest proof points is: ${strongestBullet || "a solid operating example from my recent experience"}.`;
}

function describePressure({
  matchedCount,
  missingCount,
  quantifiedBulletCount,
}: {
  matchedCount: number;
  missingCount: number;
  quantifiedBulletCount: number;
}) {
  if (matchedCount >= 6 && missingCount <= 3 && quantifiedBulletCount >= 2) {
    return "Strong base";
  }

  if (matchedCount >= 4 && missingCount <= 5) {
    return "Competitive with tightening";
  }

  return "Keyword pressure high";
}
