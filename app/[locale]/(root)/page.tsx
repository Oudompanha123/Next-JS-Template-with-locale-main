import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/components/shared";
import { LogoutButton } from "@/components/ui/auth/LogoutButton";

export default function HomePage() {
  const t = useTranslations("HomePage");
  return (
    <div>
      <div className="flex items-center justify-between">
        <LanguageSwitcher />
        <LogoutButton />
      </div>
      <h1 className="text-2xl font-bold text-green-500">{t("title")}</h1>
    </div>
  );
}
