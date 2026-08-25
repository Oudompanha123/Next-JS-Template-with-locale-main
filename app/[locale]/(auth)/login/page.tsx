import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";

import { getAuth } from "@/lib/session";
import { LoginForm } from "@/components/ui/auth/LoginForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function LoginPage() {
  const session = await getAuth();
  if (session) {
    redirect("/");
  }

  const t = await getTranslations("Login");

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">{t("title")}</CardTitle>
          <CardDescription>{t("subtitle")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Suspense>
            <LoginForm />
          </Suspense>
          {process.env.MOCK_AUTH === "true" && (
            <div className="rounded-md border border-dashed p-3 text-xs text-muted-foreground">
              <p className="mb-1 font-medium text-foreground">Demo accounts (mock auth)</p>
              <ul className="space-y-0.5">
                <li>admin / admin123</li>
                <li>manager / manager123</li>
                <li>user / user123</li>
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
