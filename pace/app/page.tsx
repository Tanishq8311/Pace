import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 p-6 text-center">
      <h1 className="text-4xl font-semibold">Pace</h1>
      <p className="max-w-sm text-gray-600">
        A fat-loss plan computed from your actual biometrics - diet, training,
        cardio, and a daily tracker that adapts as you go.
      </p>
      <div className="flex gap-4">
        <Link href="/signup" className="rounded bg-black px-5 py-2 text-white">
          Sign up
        </Link>
        <Link
          href="/login"
          className="rounded border px-5 py-2 text-black"
        >
          Log in
        </Link>
      </div>
    </main>
  );
}
