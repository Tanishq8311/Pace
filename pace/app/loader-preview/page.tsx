import { Loader, RunningLoader } from "@/components/Loader";

export default function LoaderPreviewPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-10">
      <Loader label="Loading" />
      <RunningLoader label="Loading" />
    </main>
  );
}
