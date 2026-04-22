"use client";

import { useState, useTransition } from "react";
import { MatchReportPanel } from "@/components/match-report-panel";
import { analyzeRoleMatch } from "@/lib/jobmatch/engine";
import { getBuyHref } from "@/lib/site";

type MatchWorkbenchProps = {
  initialResume: string;
  initialJobDescription: string;
};

export function MatchWorkbench({
  initialResume,
  initialJobDescription,
}: MatchWorkbenchProps) {
  const buyHref = getBuyHref();
  const [resumeText, setResumeText] = useState(initialResume);
  const [jobDescription, setJobDescription] = useState(initialJobDescription);
  const [report, setReport] = useState(
    analyzeRoleMatch({
      resumeText: initialResume,
      jobDescription: initialJobDescription,
      sourceMode: "demo",
    }),
  );
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function runAnalysis(sourceMode: "live" | "demo") {
    setError(null);

    startTransition(() => {
      try {
        if (!resumeText.trim() || !jobDescription.trim()) {
          throw new Error("Both text boxes need content before SignalMatch can run.");
        }

        const nextReport = analyzeRoleMatch({
          resumeText,
          jobDescription,
          sourceMode,
        });
        setReport(nextReport);
      } catch (caughtError) {
        const message =
          caughtError instanceof Error
            ? caughtError.message
            : "SignalMatch could not analyze this role.";
        setError(message);
      }
    });
  }

  function loadDemo() {
    setResumeText(initialResume);
    setJobDescription(initialJobDescription);
    runAnalysis("demo");
  }

  async function copyPitch() {
    await navigator.clipboard.writeText(report.pitch);
  }

  async function copyInterviewBank() {
    const interviewPack = report.interviewPrompts
      .map((prompt) => `${prompt.title}\n${prompt.prompt}`)
      .join("\n\n");
    await navigator.clipboard.writeText(interviewPack);
  }

  return (
    <section className="grid gap-4 lg:grid-cols-[0.98fr_1.02fr]">
      <div className="rounded-[1.8rem] border border-[var(--line)] bg-[rgba(255,255,255,0.05)] p-5 shadow-[0_18px_80px_rgba(2,8,24,0.32)] sm:p-6">
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
          Role scanner
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-[var(--paper)]">
          Turn two messy text blocks into one cleaner application pack.
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--muted-strong)]">
          Paste a current resume and one target job description. SignalMatch
          highlights what is already strong, what still looks thin, and what
          should only be added if the candidate can prove it.
        </p>

        <div className="mt-6 grid gap-4">
          <label className="block">
            <span className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
              Resume text
            </span>
            <textarea
              className="mt-2 h-64 w-full rounded-[1.25rem] border border-[var(--line)] bg-[rgba(255,255,255,0.04)] px-4 py-4 text-sm leading-6 text-[var(--paper)] outline-none transition focus:border-[var(--accent)]"
              value={resumeText}
              onChange={(event) => setResumeText(event.target.value)}
            />
          </label>

          <label className="block">
            <span className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
              Job description
            </span>
            <textarea
              className="mt-2 h-64 w-full rounded-[1.25rem] border border-[var(--line)] bg-[rgba(255,255,255,0.04)] px-4 py-4 text-sm leading-6 text-[var(--paper)] outline-none transition focus:border-[var(--cyan)]"
              value={jobDescription}
              onChange={(event) => setJobDescription(event.target.value)}
            />
          </label>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            className="rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[var(--ink)] transition hover:bg-[rgba(163,255,18,0.88)] disabled:cursor-not-allowed disabled:opacity-60"
            type="button"
            onClick={() => runAnalysis("live")}
            disabled={isPending}
          >
            {isPending ? "Analyzing..." : "Analyze match"}
          </button>
          <button
            className="rounded-full border border-[var(--line)] bg-[rgba(255,255,255,0.04)] px-5 py-3 text-sm font-semibold text-[var(--paper)] transition hover:border-[var(--cyan)] disabled:cursor-not-allowed disabled:opacity-60"
            type="button"
            onClick={loadDemo}
            disabled={isPending}
          >
            Load demo role
          </button>
          <a
            className="rounded-full border border-[rgba(163,255,18,0.24)] bg-[rgba(163,255,18,0.08)] px-5 py-3 text-center text-sm font-semibold text-[var(--paper)] transition hover:border-[var(--accent)]"
            href={buyHref}
          >
            Get the $19 role pack
          </a>
        </div>

        {error ? (
          <div className="mt-4 rounded-[1.1rem] border border-[rgba(255,125,125,0.28)] bg-[rgba(255,125,125,0.08)] p-4 text-sm leading-6 text-[var(--paper)]">
            {error}
          </div>
        ) : null}

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-[1.15rem] border border-[var(--line)] bg-[rgba(255,255,255,0.04)] p-4">
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
              Best fit
            </p>
            <p className="mt-2 text-sm leading-6 text-[var(--muted-strong)]">
              Business, ops, analyst, growth, and customer-success roles.
            </p>
          </div>
          <div className="rounded-[1.15rem] border border-[var(--line)] bg-[rgba(255,255,255,0.04)] p-4">
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
              Core promise
            </p>
            <p className="mt-2 text-sm leading-6 text-[var(--muted-strong)]">
              Stronger application language without fake achievements.
            </p>
          </div>
          <div className="rounded-[1.15rem] border border-[var(--line)] bg-[rgba(255,255,255,0.04)] p-4">
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
              Upgrade hook
            </p>
            <p className="mt-2 text-sm leading-6 text-[var(--muted-strong)]">
              Free scan now, paid role pack or interview sprint after.
            </p>
          </div>
        </div>
      </div>

      <MatchReportPanel
        report={report}
        onCopyPitch={copyPitch}
        onCopyInterviewBank={copyInterviewBank}
      />
    </section>
  );
}
