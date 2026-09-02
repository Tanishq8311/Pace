import Link from "next/link";
import { signup } from "@/app/auth/actions";
import { SubmitButton } from "@/components/SubmitButton";

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; checkEmail?: string }>;
}) {
  const { error, checkEmail } = await searchParams;

  if (checkEmail) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="animate-fade-up font-display text-2xl font-extrabold tracking-tight">
          Check your email
        </h1>
        <p className="animate-fade-up max-w-xs text-sm text-muted">
          We sent you a confirmation link. Click it to activate your
          account, then log in.
        </p>
        <Link href="/login" className="btn-secondary mt-2">
          Back to login
        </Link>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col justify-center px-6 py-10">
      <div className="animate-fade-up mx-auto flex w-full max-w-xs flex-col gap-6">
        <div>
          <h1 className="font-display text-2xl font-extrabold tracking-tight">
            Create your account
          </h1>
          <p className="mt-1 text-sm text-muted">
            Takes two minutes to set up your plan.
          </p>
        </div>

        {error && <p className="pill w-fit text-danger">{error}</p>}

        <form action={signup} className="flex flex-col gap-4">
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
              minLength={6}
              className="field-input"
            />
          </label>
          <SubmitButton className="btn-primary mt-2" pendingText="Signing up…">
            Sign up
          </SubmitButton>
        </form>

        <p className="text-center text-sm text-muted">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-foreground underline">
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}
