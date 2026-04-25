import Image from "next/image";
import { MatchWorkbench } from "@/components/match-workbench";
import { demoJobDescription, demoResume } from "@/lib/jobmatch/demo";
import { getBuyHref, hasBuyLink } from "@/lib/site";

export default function Home() {
  const buyHref = getBuyHref();
  const readyToSell = hasBuyLink();

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 py-4 sm:px-6 lg:px-8">
      <section className="hero-shell overflow-hidden rounded-[2rem] border border-[var(--line)] px-5 py-6 shadow-[0_28px_120px_rgba(2,8,24,0.45)] sm:px-8 sm:py-8">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
              <span className="rounded-full border border-[var(--line)] bg-white/4 px-3 py-1 text-[var(--paper)]">
                SignalMatch
              </span>
              <span>Truth-first ATS job match tool</span>
            </div>
            <div className="space-y-4">
              <h1 className="max-w-4xl text-5xl font-semibold tracking-normal text-[var(--paper)] sm:text-6xl lg:text-7xl">
                Beat the AI screen without faking anything.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-[var(--muted-strong)] sm:text-xl">
                SignalMatch compares a resume against a job description, surfaces
                missing signals, rewrites weak bullets, and turns the result
                into a cleaner interview pack for product, ops, analyst, growth,
                and customer-success roles.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                className="rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[var(--ink)] transition hover:bg-[rgba(163,255,18,0.88)]"
                href={buyHref}
              >
                Get the Role Pack
              </a>
              <a
                className="rounded-full border border-[var(--line)] bg-[rgba(255,255,255,0.04)] px-5 py-3 text-sm font-semibold text-[var(--paper)] transition hover:border-[var(--cyan)]"
                href="#scanner"
              >
                Try the free scan
              </a>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-[1.4rem] border border-[var(--line)] bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
                  Pain
                </p>
                <p className="mt-2 text-3xl font-semibold tracking-normal text-[var(--paper)]">
                  Crowded market
                </p>
                <p className="mt-3 text-sm leading-6 text-[var(--muted-strong)]">
                  Job seekers are using AI more, but they still struggle to
                  stand out and stay believable.
                </p>
              </div>
              <div className="rounded-[1.4rem] border border-[rgba(163,255,18,0.2)] bg-[rgba(163,255,18,0.08)] p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
                  Positioning
                </p>
                <p className="mt-2 text-3xl font-semibold tracking-normal text-[var(--paper)]">
                  Anti-hallucination
                </p>
                <p className="mt-3 text-sm leading-6 text-[var(--muted-strong)]">
                  The product does not invent achievements. It sharpens what is
                  already true and tells the user where proof is still missing.
                </p>
              </div>
              <div className="rounded-[1.4rem] border border-[var(--line)] bg-[rgba(99,210,255,0.08)] p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-[var(--cyan)]">
                  Money path
                </p>
                <p className="mt-2 text-3xl font-semibold tracking-normal text-[var(--paper)]">
                  $19 role packs
                </p>
                <p className="mt-3 text-sm leading-6 text-[var(--muted-strong)]">
                  Ship a free scan, sell one-role packs, then upsell interview
                  sprints for users under deadline pressure.
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative flex h-full flex-col justify-between rounded-[1.75rem] border border-[var(--line)] bg-[rgba(255,255,255,0.05)] p-5 backdrop-blur-md">
              <Image
                src="/generated/signalmatch-hero.png"
                alt="SignalMatch resume to job description proof-lines visual"
                width={1536}
                height={1024}
                priority
                className="mb-5 aspect-[3/2] w-full rounded-[1.25rem] border border-[var(--line)] object-cover"
              />
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
                  Market pressure
                </p>
                <div className="mt-5 space-y-4">
                  <div className="rounded-[1.2rem] border border-[var(--line)] bg-[rgba(255,255,255,0.04)] p-4">
                    <p className="text-4xl font-semibold tracking-normal text-[var(--paper)]">
                      80%
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[var(--muted-strong)]">
                      Nearly 80% of people told LinkedIn they feel unprepared to
                      find a job in 2026.
                    </p>
                  </div>
                  <div className="rounded-[1.2rem] border border-[var(--line)] bg-[rgba(255,255,255,0.04)] p-4">
                    <p className="text-4xl font-semibold tracking-normal text-[var(--paper)]">
                      93%
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[var(--muted-strong)]">
                      Of recruiters in LinkedIn research said they plan to
                      increase AI usage in 2026.
                    </p>
                  </div>
                  <div className="rounded-[1.2rem] border border-[var(--line)] bg-[rgba(255,255,255,0.04)] p-4">
                    <p className="text-4xl font-semibold tracking-normal text-[var(--paper)]">
                      26%
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[var(--muted-strong)]">
                      Only 26% of applicants in Gartner research trusted AI to
                      evaluate them fairly.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6 rounded-[1.25rem] border border-[var(--line)] bg-[rgba(163,255,18,0.08)] p-4">
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
                  Angle
                </p>
                <p className="mt-2 text-lg font-semibold tracking-normal text-[var(--paper)]">
                  Honest role packs for candidates under pressure.
                </p>
                <p className="mt-2 text-sm leading-6 text-[var(--muted-strong)]">
                  This is different from generic resume builders because it
                  highlights proof gaps instead of pretending every missing
                  claim can be solved with more copy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div id="scanner">
        <MatchWorkbench
          initialResume={demoResume}
          initialJobDescription={demoJobDescription}
        />
      </div>

      <section
        id="role-pack"
        className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]"
      >
        <div className="rounded-[1.8rem] border border-[var(--line)] bg-[rgba(255,255,255,0.05)] p-6 shadow-[0_18px_70px_rgba(2,8,24,0.32)]">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
            Paid product
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-normal text-[var(--paper)]">
            SignalMatch Role Pack
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--muted-strong)]">
            A downloadable truth-first application kit for product, ops,
            analyst, growth, and customer-success roles. It turns the free scan
            into a repeatable execution system instead of a one-off result.
          </p>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <div className="rounded-[1.2rem] border border-[var(--line)] bg-[rgba(255,255,255,0.04)] p-4">
              <p className="text-lg font-semibold tracking-normal text-[var(--paper)]">
                Inside
              </p>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-[var(--muted-strong)]">
                <li>• role targeting sheet</li>
                <li>• proof harvester prompts</li>
                <li>• bullet rewrite rubric</li>
                <li>• interview bank</li>
                <li>• 7-day application sprint</li>
                <li>• LinkedIn announcement template</li>
              </ul>
            </div>
            <div className="rounded-[1.2rem] border border-[var(--line)] bg-[rgba(255,255,255,0.04)] p-4">
              <p className="text-lg font-semibold tracking-normal text-[var(--paper)]">
                Promise
              </p>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-[var(--muted-strong)]">
                <li>• no fake achievements</li>
                <li>• no generic AI fluff</li>
                <li>• faster tailoring under deadline</li>
                <li>• stronger proof for interviews</li>
                <li>• clearer role targeting week to week</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              className="rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[var(--ink)] transition hover:bg-[rgba(163,255,18,0.88)]"
              href={buyHref}
            >
              Buy for $19
            </a>
            <a
              className="rounded-full border border-[var(--line)] bg-[rgba(255,255,255,0.04)] px-5 py-3 text-sm font-semibold text-[var(--paper)] transition hover:border-[var(--cyan)]"
              href="https://github.com/dicnunz/signal-match"
            >
              View repo
            </a>
          </div>
          {!readyToSell ? (
            <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
              Checkout is being connected from the Gumroad draft now.
            </p>
          ) : null}
        </div>

        <div className="rounded-[1.8rem] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(99,210,255,0.08),rgba(163,255,18,0.06))] p-6 shadow-[0_18px_70px_rgba(2,8,24,0.32)]">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--cyan)]">
            Funnel
          </p>
          <div className="mt-5 space-y-4">
            <div className="rounded-[1.2rem] border border-[var(--line)] bg-[rgba(255,255,255,0.05)] p-4">
              <p className="text-lg font-semibold tracking-normal text-[var(--paper)]">
                1. Free scan
              </p>
              <p className="mt-2 text-sm leading-6 text-[var(--muted-strong)]">
                User pastes a resume and job description and gets instant signal
                gaps plus one cleaner proof path.
              </p>
            </div>
            <div className="rounded-[1.2rem] border border-[var(--line)] bg-[rgba(255,255,255,0.05)] p-4">
              <p className="text-lg font-semibold tracking-normal text-[var(--paper)]">
                2. $19 role pack
              </p>
              <p className="mt-2 text-sm leading-6 text-[var(--muted-strong)]">
                Downloadable framework for tailoring, proof harvesting, and
                interview prep without hallucinating experience.
              </p>
            </div>
            <div className="rounded-[1.2rem] border border-[var(--line)] bg-[rgba(255,255,255,0.05)] p-4">
              <p className="text-lg font-semibold tracking-normal text-[var(--paper)]">
                3. $49 sprint
              </p>
              <p className="mt-2 text-sm leading-6 text-[var(--muted-strong)]">
                Seven-day upgrade for candidates who want a structured weekly
                application cycle and tighter interview stories.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[1.8rem] border border-[var(--line)] bg-[rgba(255,255,255,0.05)] p-6 shadow-[0_18px_70px_rgba(2,8,24,0.32)]">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
            Why this can sell
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-normal text-[var(--paper)]">
            It helps a stressed buyer get a more believable application out
            faster.
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <div className="rounded-[1.25rem] border border-[var(--line)] bg-[rgba(255,255,255,0.04)] p-4">
              <p className="text-lg font-semibold tracking-normal text-[var(--paper)]">
                1. Immediate use
              </p>
              <p className="mt-2 text-sm leading-6 text-[var(--muted-strong)]">
                The user pastes two blocks of text and gets a usable role pack
                on the spot.
              </p>
            </div>
            <div className="rounded-[1.25rem] border border-[var(--line)] bg-[rgba(255,255,255,0.04)] p-4">
              <p className="text-lg font-semibold tracking-normal text-[var(--paper)]">
                2. Clear differentiation
              </p>
              <p className="mt-2 text-sm leading-6 text-[var(--muted-strong)]">
                Truth-first positioning cuts against the fake-bullet problem
                that makes many AI job tools feel risky.
              </p>
            </div>
            <div className="rounded-[1.25rem] border border-[var(--line)] bg-[rgba(255,255,255,0.04)] p-4">
              <p className="text-lg font-semibold tracking-normal text-[var(--paper)]">
                3. Easy upgrade path
              </p>
              <p className="mt-2 text-sm leading-6 text-[var(--muted-strong)]">
                Free keyword scan now, paid role pack next, interview sprint
                after that.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[1.8rem] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(163,255,18,0.08),rgba(99,210,255,0.06))] p-6 shadow-[0_18px_70px_rgba(2,8,24,0.32)]">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
            Suggested pricing
          </p>
          <div className="mt-5 space-y-4">
            <div className="rounded-[1.2rem] border border-[var(--line)] bg-[rgba(255,255,255,0.05)] p-4">
              <p className="text-sm uppercase tracking-[0.18em] text-[var(--muted)]">
                Free
              </p>
              <p className="mt-1 text-3xl font-semibold tracking-normal text-[var(--paper)]">
                Keyword scan
              </p>
              <p className="mt-2 text-sm leading-6 text-[var(--muted-strong)]">
                Match gaps, missing signals, and one sample repair.
              </p>
            </div>
            <div className="rounded-[1.2rem] border border-[var(--line)] bg-[rgba(255,255,255,0.05)] p-4">
              <p className="text-sm uppercase tracking-[0.18em] text-[var(--muted)]">
                Main offer
              </p>
              <p className="mt-1 text-3xl font-semibold tracking-normal text-[var(--paper)]">
                $19 / role
              </p>
              <p className="mt-2 text-sm leading-6 text-[var(--muted-strong)]">
                Full role pack with bullet repairs, proof prompts, and interview
                bank.
              </p>
            </div>
            <div className="rounded-[1.2rem] border border-[var(--line)] bg-[rgba(255,255,255,0.05)] p-4">
              <p className="text-sm uppercase tracking-[0.18em] text-[var(--muted)]">
                Upsell
              </p>
              <p className="mt-1 text-3xl font-semibold tracking-normal text-[var(--paper)]">
                $49 sprint
              </p>
              <p className="mt-2 text-sm leading-6 text-[var(--muted-strong)]">
                A seven-day interview prep and job-targeting upgrade tier.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
