"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/app/auth/actions";
import { ChartIcon, ChecklistIcon, DumbbellIcon, LogoutIcon } from "./icons";
import { ThemeToggle } from "./ThemeToggle";

const NAV = [
  { href: "/plan", label: "Plan", icon: ChartIcon },
  { href: "/training", label: "Training", icon: DumbbellIcon },
  { href: "/tracker", label: "Tracker", icon: ChecklistIcon },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b-2 border-border bg-surface/95 backdrop-blur-lg">
        <div className="mx-auto flex w-full max-w-md items-center justify-between px-4 py-3">
          <span className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-md border-2 border-border bg-yellow text-xs font-extrabold text-black">
              P
            </span>
            <span className="font-display text-base font-extrabold tracking-tight">
              Pace
            </span>
          </span>
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <form action={logout}>
              <button
                type="submit"
                aria-label="Log out"
                className="rounded-lg border-2 border-transparent p-1.5 text-muted transition-all duration-150 hover:border-border hover:text-foreground active:scale-90"
              >
                <LogoutIcon className="h-4.5 w-4.5" />
              </button>
            </form>
          </div>
        </div>
      </header>

      {children}

      <nav className="fixed bottom-0 left-0 right-0 z-10 border-t-2 border-border bg-surface/95 backdrop-blur-lg">
        <div className="mx-auto flex w-full max-w-md gap-1.5 p-2">
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex flex-1 flex-col items-center gap-0.5 rounded-xl border-2 py-2 text-xs font-bold transition-all duration-150 active:scale-90 ${
                  active
                    ? "border-border bg-yellow text-black"
                    : "border-transparent text-muted"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
