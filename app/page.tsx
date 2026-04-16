"use client";
import { useMemo, useState } from "react";
import {
  AnswerOption,
  PersonalityKey,
  personalityLookup,
  questions,
} from "./quiz-data";

type QuizState = "intro" | "questions" | "results";

const initialScores: Record<PersonalityKey, number> = {
  boldExplorer: 0,
  smoothOperator: 0,
  cozyClassic: 0,
  wildCard: 0,
};

export default function Home() {
  const [quizState, setQuizState] = useState<QuizState>("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] =
    useState<Record<PersonalityKey, number>>(initialScores);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [shareStatus, setShareStatus] = useState<"idle" | "copied">("idle");

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const activeQuestion = questions[currentQuestion];

  const rankedResults = useMemo(() => {
    const totalAnswers =
      Object.values(scores).reduce((sum, value) => sum + value, 0) || 1;

    return Object.entries(scores)
      .map(([key, count]) => ({
        profile: personalityLookup[key as PersonalityKey],
        count,
        percentage: Math.round((count / totalAnswers) * 100),
      }))
      .sort((a, b) => b.count - a.count);
  }, [scores]);

  const topResult = rankedResults[0];

  const handleStart = () => {
    setQuizState("questions");
    setCurrentQuestion(0);
    setScores(initialScores);
    setSelectedAnswers([]);
    setShareStatus("idle");
  };

  const handleAnswer = (answer: AnswerOption) => {
    setSelectedAnswers((prev) => [...prev, answer.id]);
    setScores((prev) => ({
      ...prev,
      [answer.personality]: prev[answer.personality] + 1,
    }));

    if (currentQuestion === questions.length - 1) {
      setQuizState("results");
      return;
    }

    setCurrentQuestion((prev) => prev + 1);
  };

  const handleRetake = () => {
    setQuizState("intro");
    setCurrentQuestion(0);
    setScores(initialScores);
    setSelectedAnswers([]);
    setShareStatus("idle");
  };

  const handleShare = async () => {
    const message = `I got ${topResult.profile.name} on the NovaBrew Coffee Taste Profile Quiz. My coffee match is ${topResult.profile.coffeeName}.`;

    try {
      await navigator.clipboard.writeText(message);
      setShareStatus("copied");
      window.setTimeout(() => setShareStatus("idle"), 2200);
    } catch {
      setShareStatus("idle");
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(209,182,153,0.38),_transparent_22%),linear-gradient(180deg,#f7f0e7_0%,#f2e7d9_48%,#efe2d2_100%)] px-4 py-5 text-stone-900 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-2.5rem)] max-w-6xl items-center">
        <div className="w-full overflow-hidden rounded-[2rem] border border-[rgba(91,67,49,0.12)] bg-[rgba(255,250,244,0.88)] shadow-[0_32px_90px_rgba(77,54,35,0.14)] backdrop-blur">
          {quizState === "intro" ? (
            <section className="grid gap-10 px-6 py-7 sm:px-8 sm:py-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:px-12 lg:py-12">
              <div className="flex flex-col justify-between gap-8">
                <div>
                  <div className="mb-5 inline-flex items-center rounded-full border border-[rgba(120,88,63,0.14)] bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(245,233,219,0.72))] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-600 shadow-[0_10px_24px_rgba(90,62,42,0.06)] sm:text-xs">
                    NovaBrew Coffee Personality Quiz
                  </div>
                  <p className="mb-3 text-[0.82rem] uppercase tracking-[0.32em] text-[#8d6d52]">
                    Curated for taste, memory, and identity
                  </p>
                  <h1 className="font-display max-w-2xl text-balance text-[2.9rem] leading-[0.88] tracking-[-0.03em] text-stone-900 sm:text-[4rem] lg:text-[5.35rem]">
                    Find the coffee that feels like it was picked for you.
                  </h1>
                  <p className="mt-6 max-w-2xl text-base leading-7 text-stone-600 sm:text-[1.08rem]">
                    Answer six quick questions about the flavors, routines, and
                    coffee moods you naturally gravitate toward. We’ll map your
                    percentages across four NovaBrew personalities and recommend
                    the bag that fits you best.
                  </p>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <PremiumTag label="6 thoughtful questions" />
                    <PremiumTag label="4 coffee personalities" />
                    <PremiumTag label="Personalized result" />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  <InfoCard
                    label="Questions"
                    value="6"
                    caption="Fast, preference-based, and easy to finish."
                  />
                  <InfoCard
                    label="Result Style"
                    value="Percentages"
                    caption="See your full mix, not just one label."
                  />
                  <InfoCard
                    label="Output"
                    value="Coffee Match"
                    caption="A personality and a NovaBrew recommendation."
                  />
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <button
                    type="button"
                    onClick={handleStart}
                    className="inline-flex h-14 items-center justify-center rounded-full bg-[linear-gradient(135deg,#2a1a12,#59402e)] px-7 text-base font-semibold text-[color:var(--paper)] shadow-[0_18px_34px_rgba(66,44,29,0.2)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_40px_rgba(66,44,29,0.24)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--paper)]"
                  >
                    Start quiz
                  </button>
                  <p className="text-sm leading-6 text-stone-500 sm:max-w-xs">
                    Built to feel premium, warm, and simple. No harsh white,
                    no clutter, no guesswork.
                  </p>
                </div>
              </div>

              <div className="overflow-hidden rounded-[1.95rem] border border-[rgba(120,88,63,0.12)] bg-[linear-gradient(160deg,rgba(255,251,246,0.98),rgba(245,231,217,0.92))] shadow-[inset_0_1px_0_rgba(255,255,255,0.78),0_26px_52px_rgba(88,60,40,0.1)]">
                <div className="border-b border-[rgba(120,88,63,0.1)] px-5 py-4 sm:px-6">
                  <div className="mb-2 flex items-center justify-between text-sm text-stone-500">
                    <span>Premium preview</span>
                    <span>Minimal, warmer, less white</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="font-display text-[1.7rem] leading-none text-stone-900">
                        First impression
                      </div>
                      <p className="mt-2 max-w-md text-sm leading-6 text-stone-600">
                        The landing experience should feel like a premium coffee
                        brand inviting you into something personal.
                      </p>
                    </div>
                    <div className="rounded-full border border-[rgba(120,88,63,0.12)] bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-stone-600">
                      Shareable result
                    </div>
                  </div>
                </div>
                <div className="grid gap-5 p-5 sm:p-6">
                  <div className="rounded-[1.6rem] bg-[radial-gradient(circle_at_top_right,rgba(205,173,140,0.22),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.92),rgba(250,242,232,0.96))] p-5 shadow-[0_22px_40px_rgba(88,60,40,0.08)] sm:p-6">
                    <div className="mb-5 flex items-center justify-between text-sm text-stone-500">
                      <span>Question 1 of 6</span>
                      <span>Direct preference style</span>
                    </div>
                    <h2 className="font-display max-w-xl text-[2.25rem] leading-tight tracking-[-0.02em] text-stone-900">
                      What kind of coffee flavor do you reach for most often?
                    </h2>
                    <div className="mt-6 grid gap-3">
                      {questions[0].answers.map((answer) => (
                        <PreviewAnswer key={answer.id} answer={answer} />
                      ))}
                    </div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <PremiumStat label="Brand feel" value="Elevated" />
                    <PremiumStat label="Quiz tone" value="Personal" />
                    <PremiumStat label="Result energy" value="Shareable" />
                  </div>
                </div>
              </div>
            </section>
          ) : null}

          {quizState === "questions" && activeQuestion ? (
            <section className="grid gap-8 px-6 py-7 sm:px-8 sm:py-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-10 lg:px-12 lg:py-12">
              <aside className="flex flex-col justify-between gap-6 rounded-[1.75rem] border border-[rgba(120,88,63,0.12)] bg-[linear-gradient(180deg,rgba(249,242,233,0.9),rgba(243,231,218,0.82))] p-5 sm:p-6">
                <div>
                  <div className="inline-flex items-center rounded-full border border-[rgba(120,88,63,0.12)] bg-white/70 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-600">
                    NovaBrew Match
                  </div>
                  <h2 className="font-display mt-4 text-[2.45rem] leading-[0.96] tracking-[-0.03em] text-stone-900">
                    We’re calibrating your coffee profile.
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-stone-600">
                    Every answer shapes your percentage mix across the four
                    NovaBrew personalities. Choose the one that feels most like
                    you, not the one that seems “correct.”
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-stone-600">
                    <span>
                      Question {currentQuestion + 1} of {questions.length}
                    </span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-[rgba(120,88,63,0.12)]">
                    <div
                      className="h-full rounded-full bg-[linear-gradient(90deg,#ad7f5a,#5c3c27)] transition-[width] duration-500 ease-out"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm text-stone-600">
                    {personalityOrder.map((key) => {
                      const profile = personalityLookup[key];
                      const count = scores[key];
                      return (
                        <div
                          key={key}
                          className="rounded-2xl border border-[rgba(120,88,63,0.12)] bg-white/75 px-3 py-3"
                        >
                          <p className="font-medium text-stone-800">
                            {profile.name}
                          </p>
                          <p className="mt-1 text-xs uppercase tracking-[0.14em] text-stone-500">
                            {count} point{count === 1 ? "" : "s"}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </aside>

              <div className="rounded-[1.75rem] border border-[rgba(120,88,63,0.12)] bg-white/85 p-5 shadow-[0_30px_60px_rgba(79,54,36,0.08)] sm:p-7">
                <div className="flex items-center justify-between text-sm text-stone-500">
                  <span>Direct preference question</span>
                  <span>{selectedAnswers.length} answered</span>
                </div>
                <h3 className="font-display mt-4 max-w-3xl text-balance text-[2.45rem] leading-[0.98] tracking-[-0.03em] text-stone-900 sm:text-[3rem]">
                  {activeQuestion.prompt}
                </h3>
                <div className="mt-7 grid gap-3">
                  {activeQuestion.answers.map((answer) => (
                    <button
                      key={answer.id}
                      type="button"
                      onClick={() => handleAnswer(answer)}
                      className="group rounded-[1.35rem] border border-[rgba(120,88,63,0.14)] bg-[linear-gradient(180deg,rgba(255,252,249,0.98),rgba(249,242,234,0.92))] px-4 py-4 text-left transition duration-200 hover:-translate-y-0.5 hover:border-[rgba(120,88,63,0.28)] hover:shadow-[0_18px_30px_rgba(84,59,39,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7e5a3e] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--paper)] sm:px-5 sm:py-5"
                    >
                      <div className="flex items-start gap-4">
                        <div className="mt-0.5 flex h-11 w-11 items-center justify-center rounded-2xl bg-[rgba(120,88,63,0.08)] text-stone-700 transition group-hover:bg-[rgba(120,88,63,0.12)]">
                          <AnswerIcon kind={answer.icon} />
                        </div>
                        <div className="min-w-0">
                          <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">
                            Choose this if it feels most like you
                          </div>
                          <p className="text-base leading-7 text-stone-900 sm:text-lg">
                            {answer.text}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </section>
          ) : null}

          {quizState === "results" && topResult ? (
            <section className="grid gap-8 px-6 py-7 sm:px-8 sm:py-8 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10 lg:px-12 lg:py-12">
              <div className="rounded-[1.75rem] border border-[rgba(120,88,63,0.12)] bg-[linear-gradient(180deg,rgba(255,253,250,0.96),rgba(246,236,224,0.84))] p-5 sm:p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center rounded-full border border-[rgba(120,88,63,0.12)] bg-white/75 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-600">
                      Your NovaBrew result
                    </div>
                    <h2 className="font-display mt-4 text-[3.3rem] leading-[0.92] tracking-[-0.03em] text-stone-900 sm:text-[4.5rem]">
                      {topResult.profile.name}
                    </h2>
                    <p className="mt-3 text-lg text-stone-600">
                      {topResult.profile.headline}
                    </p>
                  </div>
                  <div className="rounded-[1.5rem] border border-[rgba(120,88,63,0.12)] bg-white/80 px-4 py-4 text-center shadow-[0_12px_28px_rgba(84,59,39,0.06)]">
                    <div className="text-sm uppercase tracking-[0.18em] text-stone-500">
                      Top match
                    </div>
                    <div className="mt-2 text-3xl font-semibold text-stone-900">
                      {topResult.percentage}%
                    </div>
                  </div>
                </div>

                <div className="mt-7 overflow-hidden rounded-[1.6rem] border border-[rgba(120,88,63,0.12)] bg-white/85">
                  <div
                    className={`animate-shimmer-in relative overflow-hidden bg-gradient-to-br ${topResult.profile.accent} px-5 py-5 text-[color:var(--paper)] sm:px-6 sm:py-6`}
                  >
                    <div className="absolute inset-0 opacity-25 [background:radial-gradient(circle_at_top_right,rgba(255,255,255,0.55),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.25),transparent_30%)]" />
                    <div className="animate-float-up absolute left-5 top-5 h-16 w-16 rounded-full bg-white/12 blur-[2px]" />
                    <div className="animate-float-up absolute right-12 top-16 h-10 w-10 rounded-full bg-white/20 [animation-delay:0.8s]" />
                    <div className="animate-float-up absolute bottom-8 left-[44%] h-12 w-12 rounded-full bg-white/12 [animation-delay:1.6s]" />
                    <div className="relative grid gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
                      <div className="space-y-4">
                        <div className="inline-flex items-center rounded-full bg-white/14 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[rgba(255,249,241,0.86)]">
                          Freshly matched
                        </div>
                        <p className="max-w-xl text-base leading-7 text-[rgba(255,249,241,0.92)] sm:text-lg">
                          {topResult.profile.description}
                        </p>
                        <div className="inline-flex rounded-full bg-white/18 px-4 py-2 text-sm tracking-[0.12em] text-[rgba(255,249,241,0.9)]">
                          {topResult.profile.energy}
                        </div>
                      </div>
                      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] border border-white/20 bg-white/10">
                        <img
                          src={topResult.profile.image}
                          alt={`${topResult.profile.name} coffee illustration`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-6 px-5 py-5 sm:px-6 sm:py-6">
                    <div className="grid gap-3 rounded-[1.35rem] border border-[rgba(120,88,63,0.12)] bg-[rgba(247,239,229,0.68)] p-4">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">
                        Your coffee match
                      </div>
                      <div className="font-display text-[2.4rem] leading-[0.96] tracking-[-0.02em] text-stone-900">
                        {topResult.profile.coffeeName}
                      </div>
                      <p className="max-w-2xl text-sm leading-6 text-stone-600 sm:text-base">
                        {topResult.profile.coffeeDescription}
                      </p>
                    </div>

                    <div>
                      <div className="mb-3 text-sm uppercase tracking-[0.18em] text-stone-500">
                        Your full personality mix
                      </div>
                      <div className="space-y-3">
                        {rankedResults.map((result) => (
                          <div
                            key={result.profile.key}
                            className="rounded-[1.25rem] border border-[rgba(120,88,63,0.12)] bg-white/80 p-4"
                          >
                            <div className="mb-2 flex items-center justify-between gap-4">
                              <div>
                                <div className="font-semibold text-stone-900">
                                  {result.profile.name}
                                </div>
                                <div className="text-sm text-stone-500">
                                  {result.profile.energy}
                                </div>
                              </div>
                              <div className="text-xl font-semibold text-stone-900">
                                {result.percentage}%
                              </div>
                            </div>
                            <div className="h-2.5 overflow-hidden rounded-full bg-[rgba(120,88,63,0.1)]">
                              <div
                                className={`h-full rounded-full bg-gradient-to-r ${result.profile.accent}`}
                                style={{ width: `${result.percentage}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                      <button
                        type="button"
                        onClick={handleRetake}
                        className="inline-flex h-13 items-center justify-center rounded-full bg-stone-900 px-6 text-sm font-semibold text-[color:var(--paper)] transition hover:bg-stone-800"
                      >
                        Retake quiz
                      </button>
                      <button
                        type="button"
                        onClick={handleShare}
                        className="inline-flex h-13 items-center justify-center rounded-full border border-[rgba(120,88,63,0.16)] bg-white/82 px-6 text-sm font-semibold text-stone-800 transition hover:bg-white"
                      >
                        {shareStatus === "copied"
                          ? "Result copied"
                          : "Copy result to share"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <aside className="space-y-4 rounded-[1.75rem] border border-[rgba(120,88,63,0.12)] bg-white/78 p-5 sm:p-6">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">
                    Why this works for NovaBrew
                  </div>
                  <h3 className="font-display mt-3 text-[2.25rem] leading-[0.98] tracking-[-0.03em] text-stone-900">
                    The experience feels personal from the first result screen.
                  </h3>
                </div>
                <div className="grid gap-3">
                  <ResultNote
                    title="Identity"
                    body="The result gives the subscriber a language for their taste instead of treating them like a generic account."
                  />
                  <ResultNote
                    title="Memory"
                    body="The percentages create a sense that NovaBrew has learned something real and can keep refining it over time."
                  />
                  <ResultNote
                    title="Action"
                    body="The coffee pairing turns the quiz from a fun interaction into a clear recommendation the business can use."
                  />
                </div>
              </aside>
            </section>
          ) : null}
        </div>
      </div>
    </main>
  );
}

const personalityOrder: PersonalityKey[] = [
  "boldExplorer",
  "smoothOperator",
  "cozyClassic",
  "wildCard",
];

function InfoCard({
  label,
  value,
  caption,
}: {
  label: string;
  value: string;
  caption: string;
}) {
  return (
    <div className="rounded-[1.45rem] border border-[rgba(120,88,63,0.12)] bg-white/78 px-4 py-4 shadow-[0_16px_32px_rgba(84,59,39,0.05)]">
      <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">
        {label}
      </div>
      <div className="font-display mt-2 text-[1.8rem] leading-none tracking-[-0.02em] text-stone-900">
        {value}
      </div>
      <p className="mt-2 text-sm leading-6 text-stone-600">{caption}</p>
    </div>
  );
}

function PremiumTag({ label }: { label: string }) {
  return (
    <div className="rounded-full border border-[rgba(120,88,63,0.12)] bg-[rgba(255,255,255,0.72)] px-4 py-2 text-sm text-stone-700 shadow-[0_10px_24px_rgba(90,62,42,0.05)]">
      {label}
    </div>
  );
}

function PremiumStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.2rem] border border-[rgba(120,88,63,0.12)] bg-white/70 px-4 py-4">
      <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500">
        {label}
      </div>
      <div className="font-display mt-2 text-[1.55rem] leading-none text-stone-900">
        {value}
      </div>
    </div>
  );
}

function PreviewAnswer({ answer }: { answer: AnswerOption }) {
  return (
    <div className="rounded-[1.2rem] border border-[rgba(120,88,63,0.12)] bg-[linear-gradient(180deg,rgba(255,252,249,0.98),rgba(249,242,234,0.9))] px-4 py-4">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[rgba(120,88,63,0.08)] text-stone-700">
          <AnswerIcon kind={answer.icon} />
        </div>
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-500">
            Preference option
          </div>
          <div className="mt-1 text-base leading-7 text-stone-900">
            {answer.text}
          </div>
        </div>
      </div>
    </div>
  );
}

function ResultNote({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-[1.3rem] border border-[rgba(120,88,63,0.12)] bg-[rgba(248,240,230,0.7)] p-4">
      <div className="text-sm font-semibold uppercase tracking-[0.16em] text-stone-500">
        {title}
      </div>
      <p className="mt-2 text-sm leading-6 text-stone-600">{body}</p>
    </div>
  );
}

function AnswerIcon({
  kind,
}: {
  kind: "ember" | "balance" | "comfort" | "spark";
}) {
  switch (kind) {
    case "ember":
      return (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M12.4 2.8C13.4 6 18.2 7.2 18.2 12c0 4-2.8 7.2-6.3 7.2S5.8 16 5.8 12.3c0-2.1.9-3.8 2.7-5.3.5 1.9 2 3.4 3.9 4.1-.5-2.1-.4-4.6 0-8.3Z"
            fill="currentColor"
          />
        </svg>
      );
    case "balance":
      return (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M6 7.5 12 4l6 3.5M8 8.7l-3.3 5.5a2.5 2.5 0 0 0 2.2 3.8h3.5a2.5 2.5 0 0 0 2.2-3.8L9.2 8.7M14.8 8.7l-3.4 5.5a2.5 2.5 0 0 0 2.2 3.8H17a2.5 2.5 0 0 0 2.2-3.8l-3.4-5.5M12 4v16"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "comfort":
      return (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M6 9.5h9.4a2.6 2.6 0 0 1 0 5.2H15V16a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V9.5Z"
            fill="currentColor"
          />
          <path
            d="M9.2 4.4c1 1 .9 2.1.3 3.4M13.4 4.4c1 1 .9 2.1.3 3.4"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );
    case "spark":
      return (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="m12 2 1.9 5.5L19.5 9 14 10.9 12 16.5 10.1 11 4.5 9 10 7.2 12 2ZM19 15l.9 2.6L22.5 19l-2.6.9L19 22.5l-.9-2.6-2.6-.9 2.6-.9L19 15ZM6 15.5l.7 1.8 1.8.7-1.8.7L6 20.5l-.7-1.8-1.8-.7 1.8-.7L6 15.5Z"
            fill="currentColor"
          />
        </svg>
      );
  }
}
