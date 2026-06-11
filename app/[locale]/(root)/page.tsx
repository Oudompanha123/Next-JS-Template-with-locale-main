import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/components/shared";

export default function HomePage() {
  const t = useTranslations("HomePage");
  return (
    <div>
      <LanguageSwitcher />
      <h1 className="text-2xl font-bold text-green-500">{t("title")}</h1>
    </div>
  );
}
