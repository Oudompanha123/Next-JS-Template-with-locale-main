import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";

import { getAuth } from "@/lib/session";
import { LoginForm } from "@/components/ui/auth/LoginForm";

export const metadata = {
  title: "PPCB E-Learning | Login",
  description: "PPCB E-Learning",
};

export default async function LoginPage() {
  const session = await getAuth();
  if (session) {
    redirect("/");
  }

  const t = await getTranslations("Login");

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6 rounded-lg border p-6 shadow-xs">
        <div className="space-y-1 text-center">
          <h1 className="text-xl font-semibold">{t("title")}</h1>
          <p className="text-sm text-muted-foreground">{t("subtitle")}</p>
        </div>
        <Suspense>
          <LoginForm showMockHint={process.env.MOCK_AUTH === "true"} />
        </Suspense>
      </div>
    </div>
  );
}
