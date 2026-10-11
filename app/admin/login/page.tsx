import { redirect } from "next/navigation";
import { adminConfigured, isAdmin } from "@/lib/admin-auth";
import { LoginForm } from "./login-form";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  if (await isAdmin()) redirect("/admin");
  const configured = adminConfigured();

  return (
    <main className="flex min-h-dvh items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm rounded-lg border border-border bg-card p-8 shadow-sm">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">Parklyckan</p>
        <h1 className="mt-2 font-display text-2xl font-light">Admin</h1>
        <p className="mt-2 text-sm text-muted-foreground">Logga in för att se intresseanmälningar.</p>
        {!configured ? (
          <p className="mt-6 rounded-md bg-muted px-3 py-2 text-sm text-muted-foreground">
            Admin är inte aktiverat. Sätt miljövariabeln <code>ADMIN_PASSWORD</code> (minst 10 tecken)
            i Vercel och gör en ny deploy.
          </p>
        ) : null}
        <div className="mt-6">
          <LoginForm disabled={!configured} />
        </div>
      </div>
    </main>
  );
}
