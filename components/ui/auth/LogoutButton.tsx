"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useLoginStore } from "@/lib/store/store";

type LogoutButtonProps = {
  className?: string;
};

export function LogoutButton({ className }: LogoutButtonProps) {
  const t = useTranslations("Common");
  const setStoredUserId = useLoginStore((state) => state.setUserId);
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    if (loading) return;
    setLoading(true);

    const toastId = toast.loading(t("loggingOut"));
    try {
      // Clear the in-memory "last signed in" id; the opt-in "remember my ID"
      // value in localStorage is a separate, deliberate convenience and is
      // left untouched.
      setStoredUserId(undefined);
      await signOut({ callbackUrl: "/login" });
    } finally {
      toast.dismiss(toastId);
      setLoading(false);
    }
  }

  return (
    <Button variant="outline" onClick={handleLogout} disabled={loading} className={className}>
      <LogOut className="size-4" />
      {loading ? t("loggingOut") : t("logout")}
    </Button>
  );
}

export default LogoutButton;
