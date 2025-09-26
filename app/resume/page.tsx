// app/resume/page.tsx
import Image from "next/image";

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

// JSON fetch 함수들
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

export const metadata = {
  title: "Resume",
};

export default async function ResumePage() {
  const [general, portfolio] = await Promise.all([
    getResumeInfo(),
    getPortfolioInfo(),
  ]);

  return (
    <div className="mx-auto max-w-3xl px-6 py-10 space-y-10">
      {/* 제목 */}
      <h1 className="text-3xl font-extrabold text-center">RESUME</h1>

      {/* 프로필 */}
      <div className="flex flex-col items-center text-center">
        <Image
          src="/selfy.png"
          alt="Profile"
          width={120}
          height={120}
          className="rounded-full mb-4"
        />
        <h2 className="text-xl font-bold">
          {general?.name ?? "이름"}{" "}
          <span className="text-gray-500">
            ({general?.englishName ?? "EnglishName"})
          </span>
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
          {general?.summary ?? "소개글"}
        </p>
        <div className="mt-3 space-y-1 text-sm">
          {general?.email && <div>Email : {general.email}</div>}
          {general?.github && (
            <div>
              GitHub :{" "}
              <a href={general.github} className="underline" target="_blank">
                {general.github}
              </a>
            </div>
          )}
        </div>
      </div>

      {/* About Me */}
      <section>
        <h3 className="flex items-center text-lg font-semibold mb-2">
          <span className="mr-2">📂</span> 내 소개
        </h3>
        <hr className="border-gray-300 dark:border-gray-700 mb-3" />
        <ul className="list-disc list-inside space-y-1 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
          {(general?.about ?? []).map((line, idx) => (
            <li key={idx}>{line}</li>
          ))}
        </ul>
      </section>

      {/* Educations */}
      <section>
        <h3 className="flex items-center text-lg font-semibold mb-2">
          <span className="mr-2">📘</span> 학과
        </h3>
        <hr className="border-gray-300 dark:border-gray-700 mb-3" />
        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
          {general?.education ?? "학력 정보"}
        </div>
      </section>

      {/* Portfolio */}
      <section>
        <h3 className="flex items-center text-lg font-semibold mb-2">
          <span className="mr-2">📕</span> Portfolio
        </h3>
        <hr className="border-gray-300 dark:border-gray-700 mb-3" />

        <div className="space-y-6">
          {(portfolio?.items ?? []).map((item: PortfolioItem, idx: number) => (
            <article
              key={idx}
              className="rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-md hover:shadow-lg transition"
            >
              {/* 헤더 */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="text-lg font-bold">{item.title}</h4>
                  <p className="text-xs text-gray-500 mt-1">
                    {item.period ?? item.date ?? ""}
                  </p>
                  {item.role && (
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      {item.role}
                    </p>
                  )}
                </div>
                {/* 기술스택 */}
                {Array.isArray(item.tech) && item.tech.length > 0 && (
                  <div className="flex flex-wrap gap-2 justify-end">
                    {item.tech.map((t) => (
                      <span
                        key={t}
                        className="bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1 text-xs"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* 설명 / bullet list */}
              {Array.isArray(item.bullets) && item.bullets.length > 0 && (
                <ul className="mt-4 space-y-2 text-gray-800 dark:text-gray-200 list-disc pl-5">
                  {item.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              )}

              {/* 링크 버튼 */}
              {item.links && (
                <div className="mt-5 flex flex-wrap gap-3">
                  {Object.entries(item.links).map(([k, v]) =>
                    typeof v === "string" && v ? (
                      <a
                        key={k}
                        href={v}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full bg-black text-white dark:bg-white dark:text-black text-xs px-4 py-1 font-semibold hover:opacity-80 transition"
                      >
                        {k}
                      </a>
                    ) : null
                  )}
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
