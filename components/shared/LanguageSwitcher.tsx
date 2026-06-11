"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

export const LanguageSwitcher = () => {
  const locale = useLocale();

  return (
    <div className="flex gap-2">
      <Link href={`/`} locale="en">
        EN
      </Link>
      <Link href={`/`} locale="km">
        KM
      </Link>
      <Link href={`/`} locale="zh">
        ZH
      </Link>
    </div>
  );
};
