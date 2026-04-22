export type MatchReport = {
  sourceMode: "demo" | "live";
  roleTitle: string;
  companyHint: string;
  marketMessage: string;
  pressureLabel: string;
  createdAt: string;
  matchedSignals: string[];
  missingSignals: string[];
  bulletRepairs: Array<{
    original: string;
    rewritten: string;
    why: string;
  }>;
  proofPrompts: string[];
  interviewPrompts: Array<{
    title: string;
    prompt: string;
  }>;
  pitch: string;
  stats: {
    matchedCount: number;
    missingCount: number;
    bulletCount: number;
    quantifiedBulletCount: number;
  };
};
