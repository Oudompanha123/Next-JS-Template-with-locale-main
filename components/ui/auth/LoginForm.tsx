"use client";

import { useEffect, useReducer, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, type SignInResponse } from "next-auth/react";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoginStore } from "@/lib/store/store";

const REMEMBERED_USER_ID_KEY = "rememberedUserId";

type LoginFormState = {
  userId: string;
  password: string;
  userIdError: boolean;
  passwordError: boolean;
};

type LoginFormAction = Partial<LoginFormState>;

type LoginFormProps = {
  showMockHint?: boolean;
};

export function LoginForm({ showMockHint = false }: LoginFormProps) {
  const t = useTranslations("Login");
  const router = useRouter();
  const searchParams = useSearchParams();
  const storedUserId = useLoginStore((state) => state.userId);
  const setStoredUserId = useLoginStore((state) => state.setUserId);

  const [showPassword, setShowPassword] = useState(false);
  const [rememberId, setRememberId] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, dispatch] = useReducer(
    (state: LoginFormState, action: LoginFormAction) => ({ ...state, ...action }),
    {
      userId: storedUserId || "",
      password: "",
      userIdError: false,
      passwordError: false,
    }
  );

  // Prefill from a previously "remembered" id (opt-in via the checkbox below),
  // only after mount so server-rendered markup stays empty and hydration matches.
  useEffect(() => {
    const saved = window.localStorage.getItem(REMEMBERED_USER_ID_KEY);
    if (saved) {
      dispatch({ userId: saved });
      setRememberId(true);
    }
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    dispatch({ [name]: value, [`${name}Error`]: false } as LoginFormAction);
  }

  // Backend error message conventions vary; best-effort match on which field
  // the message is about so we can highlight it, falling back to a plain toast.
  function applyErrorToField(error: string) {
    const lower = error.toLowerCase();
    if (lower.includes("user")) {
      dispatch({ userIdError: true, passwordError: false });
    } else if (lower.includes("password")) {
      dispatch({ userIdError: false, passwordError: true });
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    const toastId = toast.loading(t("submitting"));
    try {
      const result: SignInResponse | undefined = await signIn("credentials", {
        user_id: form.userId,
        password: form.password,
        callbackUrl: searchParams.get("callbackUrl") ?? "/",
        redirect: false,
      });

      if (result?.ok) {
        if (rememberId) {
          window.localStorage.setItem(REMEMBERED_USER_ID_KEY, form.userId);
        } else {
          window.localStorage.removeItem(REMEMBERED_USER_ID_KEY);
        }
        setStoredUserId(form.userId);
        router.push(result.url ?? "/");
        router.refresh();
      } else {
        applyErrorToField(result?.error ?? "");
        toast.error(result?.error || t("invalidCredentials"));
      }
    } finally {
      setSubmitting(false);
      toast.dismiss(toastId);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="space-y-2">
        <Label htmlFor="userId">{t("userIdLabel")}</Label>
        <Input
          id="userId"
          name="userId"
          type="text"
          autoComplete="username"
          placeholder={t("userIdPlaceholder")}
          value={form.userId}
          onChange={handleChange}
          aria-invalid={form.userIdError}
          disabled={submitting}
          required
          maxLength={150}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">{t("passwordLabel")}</Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder={t("passwordPlaceholder")}
            value={form.password}
            onChange={handleChange}
            aria-invalid={form.passwordError}
            disabled={submitting}
            required
            maxLength={50}
            className="pr-9"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="rememberId"
          checked={rememberId}
          onChange={() => setRememberId((v) => !v)}
          className="size-4 rounded border-input"
        />
        <Label htmlFor="rememberId" className="font-normal">
          {t("rememberId")}
        </Label>
      </div>

      <Button type="submit" className="w-full" disabled={submitting}>
        {submitting ? t("submitting") : t("submit")}
      </Button>

      {showMockHint && (
        <div className="rounded-md border border-dashed p-3 text-xs text-muted-foreground">
          <p className="mb-1 font-medium text-foreground">Demo accounts (mock auth)</p>
          <ul className="space-y-0.5">
            <li>admin / admin123</li>
            <li>manager / manager123</li>
            <li>user / user123</li>
          </ul>
        </div>
      )}
    </form>
  );
}

export default LoginForm;
