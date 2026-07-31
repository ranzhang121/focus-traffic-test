import { headers } from "next/headers";
import { recordVisit } from "@/lib/visitors";

export const dynamic = "force-dynamic";

function getClientIp(requestHeaders: Headers) {
  const forwardedFor = requestHeaders.get("x-forwarded-for");

  return (
    forwardedFor?.split(",")[0]?.trim() ||
    requestHeaders.get("x-real-ip") ||
    "unknown"
  );
}

export default async function Home() {
  try {
    await recordVisit(getClientIp(await headers()));
  } catch (error) {
    console.error("Unable to record visit", error);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-center text-white">
      <div className="space-y-8">
        <p className="text-3xl leading-relaxed sm:text-5xl">
          远离低价值刺激，
          <br />
          掌控你的时间与未来。
        </p>
        <p className="text-base leading-relaxed text-zinc-300 sm:text-xl">
          Stay away from harmful distractions.
          <br />
          Take control of your time and build a better future.
        </p>
      </div>
    </main>
  );
}
