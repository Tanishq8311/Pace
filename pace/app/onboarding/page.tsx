import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { OnboardingForm } from "./OnboardingForm";

export default async function OnboardingPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { error } = await searchParams;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col gap-5 px-4 py-8">
      <div className="animate-fade-up">
        <h1 className="text-2xl font-extrabold tracking-tight">
          Tell us about you
        </h1>
        <p className="mt-1 text-sm text-muted">
          This computes your calories, macros, and training split — exactly
          like the book&apos;s worksheets, just automated.
        </p>
      </div>
      <OnboardingForm error={error} />
    </main>
  );
}
