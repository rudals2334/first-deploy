import Image from "next/image";
import Link from "next/link";

// 일반 정보
async function getResumeInfo() {
  const res = await fetch(
    "https://raw.githubusercontent.com/rudals2334/first-deploy/refs/heads/main/service/resume_general_info_service.json"
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

// 포트폴리오 정보
async function getPortfolioInfo() {
  const res = await fetch(
    "https://raw.githubusercontent.com/rudals2334/first-deploy/refs/heads/main/service/resume_portfolio_service.json"
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Home() {
  // 두 JSON 데이터 모두 불러오기
  const [general, portfolio] = await Promise.all([
    getResumeInfo(),
    getPortfolioInfo(),
  ]);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/selfy.png"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
          <li className="mb-2 tracking-[-.01em]">
            안녕하세요{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
              {general.name}입니다.
            </code>
          </li>
          <li className="mb-2 tracking-[-.01em]">
            프로젝트명:{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
              {portfolio.project}
            </code>
          </li>
          
        </ol>
        <Link
          href="/resume"
          className="inline-flex items-center rounded-full px-4 py-2 text-sm font-bold bg-black text-white dark:bg-white dark:text-black"
        >
          Resume 보러가기 →
        </Link>        
      </main>
    </div>
  );
}
