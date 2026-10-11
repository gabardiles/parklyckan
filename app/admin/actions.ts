"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  adminConfigured,
  endSession,
  passwordMatches,
  requireAdmin,
  startSession,
} from "@/lib/admin-auth";
import {
  deleteLead,
  getLead,
  isLeadStatus,
  listUnnotifiedLeads,
  recordNotification,
  updateLead,
} from "@/lib/leads";
import { sendLeadNotification } from "@/lib/lead-email";

export type LoginState = { error: string | null };

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  if (!adminConfigured()) {
    return { error: "Admin är inte aktiverat. Sätt ADMIN_PASSWORD (minst 10 tecken) i Vercel." };
  }
  const password = String(formData.get("password") ?? "");
  if (!passwordMatches(password)) {
    // Bromsar gissningsförsök något.
    await new Promise((resolve) => setTimeout(resolve, 800));
    return { error: "Fel lösenord." };
  }
  await startSession();
  redirect("/admin");
}

export async function logout() {
  await endSession();
  redirect("/admin/login");
}

function leadId(formData: FormData) {
  const id = Number(formData.get("id"));
  if (!Number.isSafeInteger(id) || id <= 0) throw new Error("Ogiltigt id");
  return id;
}

export async function saveLead(formData: FormData) {
  await requireAdmin();
  const status = formData.get("status");
  if (!isLeadStatus(status)) throw new Error("Ogiltig status");
  const notes = String(formData.get("notes") ?? "").trim().slice(0, 4000) || null;
  await updateLead(leadId(formData), { status, notes });
  revalidatePath("/admin");
}

export async function resendNotification(formData: FormData) {
  await requireAdmin();
  const lead = await getLead(leadId(formData));
  if (!lead) return;
  await recordNotification(lead.id, await sendLeadNotification(lead, lead.id));
  revalidatePath("/admin");
}

export async function resendAllUnnotified() {
  await requireAdmin();
  for (const lead of await listUnnotifiedLeads()) {
    const result = await sendLeadNotification(lead, lead.id);
    await recordNotification(lead.id, result);
    // Stoppa vid konfigurationsfel i stället för att upprepa samma fel 100 gånger.
    if (!result.ok && result.error.startsWith("E-post ej konfigurerad")) break;
  }
  revalidatePath("/admin");
}

export async function removeLead(formData: FormData) {
  await requireAdmin();
  if (formData.get("confirm") !== "yes") return;
  await deleteLead(leadId(formData));
  revalidatePath("/admin");
}
