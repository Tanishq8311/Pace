import Link from "next/link";
import { login } from "@/app/auth/actions";
import { SubmitButton } from "@/components/SubmitButton";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main className="flex min-h-screen flex-col justify-center px-6 py-10">
      <div className="animate-fade-up mx-auto flex w-full max-w-xs flex-col gap-6">
        <div>
          <h1 className="font-display text-2xl font-extrabold tracking-tight">
            Log in to Pace
          </h1>
          <p className="mt-1 text-sm text-muted">Welcome back.</p>
        </div>

        {error && <p className="pill w-fit text-danger">{error}</p>}

        <form action={login} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="field-label">Email</span>
            <input name="email" type="email" required className="field-input" />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="field-label">Password</span>
            <input
              name="password"
              type="password"
              required
              className="field-input"
            />
          </label>
          <SubmitButton className="btn-primary mt-2" pendingText="Logging in…">
            Log in
          </SubmitButton>
        </form>

        <p className="text-center text-sm text-muted">
          No account?{" "}
          <Link href="/signup" className="font-bold text-foreground underline">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}
