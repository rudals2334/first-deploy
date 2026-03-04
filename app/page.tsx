// app/resume/page.tsx
import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";

// 타입 정의
type GeneralInfo = {
  name?: string;
  englishName?: string;
  summary?: string;
  email?: string;
  github?: string;
  about?: string[];
  education?: string;
};

type Links = Record<string, string>;

type PortfolioItem = {
  title: string;
  role?: string;
  desc?: string;
  period?: string;
  date?: string;
  tech?: string[];
  bullets?: string[];
  links?: Links;
  github?: string;
};

type Portfolio = {
  project?: string;
  items: PortfolioItem[];
};

// JSON fetch
async function getResumeInfo(): Promise<GeneralInfo> {
  const res = await fetch(
    "https://raw.githubusercontent.com/rudals2334/first-deploy/main/service/resume_general_info_service.json",
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to fetch resume info");
  return res.json();
}

async function getPortfolioInfo(): Promise<Portfolio> {
  const res = await fetch(
    "https://raw.githubusercontent.com/rudals2334/first-deploy/main/service/resume_portfolio_service.json",
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to fetch portfolio info");
  return res.json();
}

export const metadata: Metadata = {
  title: "Resume",
};

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 backdrop-blur">
      {children}
    </span>
  );
}

function SectionTitle({
  icon,
  title,
  desc,
}: {
  icon: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="space-y-2">
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/90 backdrop-blur">
        <span>{icon}</span>
        <span className="font-semibold">{title}</span>
      </div>
      {desc ? <p className="text-sm text-white/60">{desc}</p> : null}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
    </div>
  );
}

export default async function ResumePage() {
  const [general, portfolio] = await Promise.all([
    getResumeInfo(),
    getPortfolioInfo(),
  ]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070A12] text-white">
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-24 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(124,92,255,.55),rgba(124,92,255,.12),transparent_70%)] blur-3xl" />
        <div className="absolute -right-52 -top-24 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle_at_60%_30%,rgba(58,214,255,.45),rgba(58,214,255,.10),transparent_70%)] blur-3xl" />
        <div className="absolute inset-0 opacity-[0.14] [mask-image:radial-gradient(circle_at_50%_10%,black_30%,transparent_70%)]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.04) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />
        </div>
      </div>

      {/* Top bar */}
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#070A12]/60 backdrop-blur">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="group inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-[#7C5CFF] to-[#3AD6FF] shadow-[0_0_24px_rgba(124,92,255,.45)]" />
            <span className="text-xs font-extrabold tracking-[0.22em] text-white/90">
              RESUME
            </span>
          </Link>

          <nav className="hidden items-center gap-2 sm:flex">
            <a
              href="#about"
              className="rounded-full border border-transparent px-3 py-1.5 text-sm text-white/70 hover:border-white/10 hover:bg-white/5 hover:text-white"
            >
              About
            </a>
            <a
              href="#edu"
              className="rounded-full border border-transparent px-3 py-1.5 text-sm text-white/70 hover:border-white/10 hover:bg-white/5 hover:text-white"
            >
              Education
            </a>
            <a
              href="#portfolio"
              className="rounded-full border border-transparent px-3 py-1.5 text-sm text-white/70 hover:border-white/10 hover:bg-white/5 hover:text-white"
            >
              Portfolio
            </a>
          </nav>

          <div className="flex items-center gap-2">
            {general?.github ? (
              <a
                href={general.github}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/90 hover:bg-white/10"
              >
                GitHub →
              </a>
            ) : null}
            {general?.email ? (
              <a
                href={`mailto:${general.email}`}
                className="rounded-full bg-gradient-to-br from-[#7C5CFF] to-[#3AD6FF] px-4 py-2 text-sm font-extrabold text-[#071018] hover:opacity-95"
              >
                Contact
              </a>
            ) : null}
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto w-full max-w-5xl px-6 py-10">
        {/* HERO */}
        <section className="grid gap-6 md:grid-cols-[1.2fr_.8fr]">
          {/* left */}
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur">
              <span className="font-semibold">Backend · DevOps · Product</span>
              <span className="text-white/40">|</span>
              <span className="text-white/60">
                {general?.education ?? "Education"}
              </span>
            </div>

            <h1 className="text-4xl font-extrabold leading-[1.08] tracking-[-0.03em] md:text-5xl">
              안녕하세요,{" "}
              <span className="bg-gradient-to-br from-[#7C5CFF] to-[#3AD6FF] bg-clip-text text-transparent">
                {general?.name ?? "이름"}
              </span>{" "}
              입니다.
            </h1>

            <p className="text-base leading-7 text-white/70">
              {general?.summary ?? "소개글"}
            </p>

            <div className="flex flex-wrap gap-2">
              {general?.englishName ? <Pill>{general.englishName}</Pill> : null}
              {general?.email ? <Pill>{general.email}</Pill> : null}
              {general?.github ? (
                <Pill>{general.github.replace("https://", "")}</Pill>
              ) : null}
            </div>
          </div>

          {/* right profile card */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_60px_rgba(0,0,0,.45)] backdrop-blur">
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-full border border-white/10 bg-white/5">
                {/* public/selfy.png 있어야 함 */}
                <Image
                  src="/selfy.png"
                  alt="Profile"
                  fill
                  className="object-cover"
                  sizes="64px"
                  priority
                />
              </div>
              <div className="min-w-0">
                <div className="text-lg font-extrabold">{general?.name}</div>
                <div className="truncate text-sm text-white/60">
                  {general?.englishName}
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-3">
              <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                <div className="text-xs font-bold tracking-[0.18em] text-white/60">
                  HIGHLIGHT
                </div>
                <div className="mt-2 text-sm leading-6 text-white/80">
                  “사용자 친화적이고 직관적인 서비스를 만들기 위해,
                  설계부터 운영까지 흐름을 책임지는 개발자”
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs text-white/60">Focus</div>
                  <div className="mt-1 font-extrabold">End-to-End</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs text-white/60">Style</div>
                  <div className="mt-1 font-extrabold">Clean & Dark</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="mt-12 space-y-5">
          <SectionTitle
            icon="📂"
            title="내 소개"
            desc="짧고 명확하게, 내가 어떤 사람인지 보여주는 영역"
          />

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <ul className="space-y-2 text-sm leading-6 text-white/75">
              {(general?.about ?? []).map((line, idx) => (
                <li key={idx} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-[#7C5CFF] to-[#3AD6FF]" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* EDUCATION */}
        <section id="edu" className="mt-12 space-y-5">
          <SectionTitle icon="📘" title="학과" desc="학력/전공 한 줄로 깔끔하게" />

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="text-sm text-white/80">
              {general?.education ?? "학력 정보"}
            </div>
          </div>
        </section>

        {/* PORTFOLIO */}
        <section id="portfolio" className="mt-12 space-y-5">
          <SectionTitle
            icon="📕"
            title="Portfolio"
            desc="프로젝트는 제목 → 역할/기간 → 핵심 성과(불릿) → 링크 순으로"
          />

          <div className="grid gap-5">
            {(portfolio?.items ?? []).map((item, idx) => (
              <article
                key={idx}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_60px_rgba(0,0,0,.35)] backdrop-blur transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/7"
              >
                {/* header */}
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="space-y-1">
                    <h3 className="text-lg font-extrabold tracking-[-0.01em]">
                      {item.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-white/55">
                      {(item.period ?? item.date) ? (
                        <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1">
                          {item.period ?? item.date}
                        </span>
                      ) : null}
                      {item.role ? (
                        <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1">
                          {item.role}
                        </span>
                      ) : null}
                    </div>
                    {item.desc ? (
                      <p className="mt-2 text-sm leading-6 text-white/70">
                        {item.desc}
                      </p>
                    ) : null}
                  </div>

                  {/* tech pills */}
                  {Array.isArray(item.tech) && item.tech.length > 0 ? (
                    <div className="flex flex-wrap gap-2 md:justify-end">
                      {item.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>

                {/* bullets */}
                {Array.isArray(item.bullets) && item.bullets.length > 0 ? (
                  <ul className="mt-5 space-y-2 text-sm leading-6 text-white/75">
                    {item.bullets.map((b, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/35 group-hover:bg-white/60" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {/* links */}
                {item.links ? (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {Object.entries(item.links).map(([k, v]) =>
                      typeof v === "string" && v ? (
                        <a
                          key={k}
                          href={v}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-xs font-semibold text-white/85 hover:bg-white/10"
                        >
                          <span className="capitalize">{k}</span>
                          <span className="text-white/50">→</span>
                        </a>
                      ) : null
                    )}
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        {/* footer */}
        <footer className="mt-14 border-t border-white/10 py-8 text-center text-xs text-white/50">
          © {new Date().getFullYear()} {general?.name ?? "Portfolio"} — Built with Next.js
        </footer>
      </div>
    </main>
  );
}