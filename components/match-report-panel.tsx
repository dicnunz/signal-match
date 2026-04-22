import type { MatchReport } from "@/lib/jobmatch/types";
import { getBuyHref } from "@/lib/site";

type MatchReportPanelProps = {
  report: MatchReport;
  onCopyPitch: () => Promise<void>;
  onCopyInterviewBank: () => Promise<void>;
};

export function MatchReportPanel({
  report,
  onCopyPitch,
  onCopyInterviewBank,
}: MatchReportPanelProps) {
  const buyHref = getBuyHref();
  const timestamp = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(report.createdAt));

  return (
    <div className="report-rise rounded-[1.8rem] border border-[var(--line)] bg-[rgba(255,255,255,0.04)] p-5 shadow-[0_18px_80px_rgba(2,8,24,0.32)] sm:p-6">
      <div className="flex flex-col gap-3 border-b border-[var(--line)] pb-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
              {report.sourceMode === "demo" ? "Demo analysis" : "Live analysis"}
            </p>
            <h3 className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-[var(--paper)]">
              {report.roleTitle}
            </h3>
          </div>
          <div className="rounded-full border border-[var(--line)] bg-[rgba(255,255,255,0.04)] px-4 py-2 text-sm text-[var(--paper)]">
            {report.pressureLabel}
          </div>
        </div>
        <div className="flex flex-wrap gap-2 text-sm text-[var(--muted-strong)]">
          <span className="rounded-full border border-[var(--line)] px-3 py-1">
            {report.companyHint}
          </span>
          <span className="rounded-full border border-[var(--line)] px-3 py-1">
            {report.marketMessage}
          </span>
          <span className="rounded-full border border-[var(--line)] px-3 py-1">
            {timestamp}
          </span>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-4">
        <MetricCard label="Matched" value={String(report.stats.matchedCount)} />
        <MetricCard label="Missing" value={String(report.stats.missingCount)} />
        <MetricCard
          label="Bullets"
          value={String(report.stats.bulletCount)}
        />
        <MetricCard
          label="With metrics"
          value={String(report.stats.quantifiedBulletCount)}
        />
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-4">
          <section className="rounded-[1.35rem] border border-[var(--line)] bg-[rgba(255,255,255,0.04)] p-4">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
              Matched signals
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {report.matchedSignals.map((signal) => (
                <span
                  key={signal}
                  className="rounded-full border border-[rgba(163,255,18,0.24)] bg-[rgba(163,255,18,0.1)] px-3 py-2 text-sm text-[var(--paper)]"
                >
                  {signal}
                </span>
              ))}
            </div>
          </section>

          <section className="rounded-[1.35rem] border border-[var(--line)] bg-[rgba(255,255,255,0.04)] p-4">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
              Missing signals to add only if true
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {report.missingSignals.length > 0 ? (
                report.missingSignals.map((signal) => (
                  <span
                    key={signal}
                    className="rounded-full border border-[rgba(255,125,125,0.24)] bg-[rgba(255,125,125,0.1)] px-3 py-2 text-sm text-[var(--paper)]"
                  >
                    {signal}
                  </span>
                ))
              ) : (
                <span className="text-sm text-[var(--muted-strong)]">
                  No major missing signals were flagged for this role.
                </span>
              )}
            </div>
          </section>

          <section className="rounded-[1.35rem] border border-[var(--line)] bg-[rgba(255,255,255,0.04)] p-4">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
              Bullet repairs
            </p>
            <div className="mt-4 space-y-3">
              {report.bulletRepairs.map((repair) => (
                <article
                  key={`${repair.original}-${repair.rewritten}`}
                  className="rounded-[1.1rem] border border-[var(--line)] bg-[rgba(255,255,255,0.04)] p-4"
                >
                  <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                    Original
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted-strong)]">
                    {repair.original}
                  </p>
                  <p className="mt-3 text-xs uppercase tracking-[0.18em] text-[var(--cyan)]">
                    Tightened
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[var(--paper)]">
                    {repair.rewritten}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-[var(--muted-strong)]">
                    <span className="font-semibold text-[var(--paper)]">
                      Why:
                    </span>{" "}
                    {repair.why}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-4">
          <section className="rounded-[1.35rem] border border-[var(--line)] bg-[rgba(255,255,255,0.04)] p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
                30-second pitch
              </p>
              <button
                className="rounded-full border border-[var(--line)] px-3 py-2 text-xs font-semibold text-[var(--paper)] transition hover:border-[var(--accent)]"
                type="button"
                onClick={onCopyPitch}
              >
                Copy pitch
              </button>
            </div>
            <div className="mt-4 rounded-[1.1rem] border border-[var(--line)] bg-[rgba(163,255,18,0.08)] p-4 text-sm leading-6 text-[var(--paper)]">
              {report.pitch}
            </div>
            <a
              className="mt-4 inline-flex rounded-full border border-[rgba(163,255,18,0.24)] bg-[rgba(163,255,18,0.08)] px-4 py-3 text-sm font-semibold text-[var(--paper)] transition hover:border-[var(--accent)]"
              href={buyHref}
            >
              Upgrade to the role pack
            </a>
          </section>

          <section className="rounded-[1.35rem] border border-[var(--line)] bg-[rgba(255,255,255,0.04)] p-4">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
              Proof prompts
            </p>
            <div className="mt-4 space-y-3">
              {report.proofPrompts.map((prompt) => (
                <div
                  key={prompt}
                  className="rounded-[1.1rem] border border-[var(--line)] bg-[rgba(255,255,255,0.04)] p-4 text-sm leading-6 text-[var(--muted-strong)]"
                >
                  {prompt}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[1.35rem] border border-[var(--line)] bg-[rgba(255,255,255,0.04)] p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
                Interview bank
              </p>
              <button
                className="rounded-full border border-[var(--line)] px-3 py-2 text-xs font-semibold text-[var(--paper)] transition hover:border-[var(--cyan)]"
                type="button"
                onClick={onCopyInterviewBank}
              >
                Copy bank
              </button>
            </div>
            <div className="mt-4 space-y-3">
              {report.interviewPrompts.map((prompt) => (
                <article
                  key={prompt.title}
                  className="rounded-[1.1rem] border border-[var(--line)] bg-[rgba(255,255,255,0.04)] p-4"
                >
                  <p className="text-lg font-semibold tracking-[-0.03em] text-[var(--paper)]">
                    {prompt.title}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted-strong)]">
                    {prompt.prompt}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

type MetricCardProps = {
  label: string;
  value: string;
};

function MetricCard({ label, value }: MetricCardProps) {
  return (
    <div className="rounded-[1.2rem] border border-[var(--line)] bg-[rgba(255,255,255,0.04)] p-4">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
        {label}
      </p>
      <p className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-[var(--paper)]">
        {value}
      </p>
    </div>
  );
}
