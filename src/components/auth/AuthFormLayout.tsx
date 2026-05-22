import type { FormEvent } from "react";
import AuthSocials from "./AuthSocials";

interface Props {
  title?: string;
  subtitle?: string;
  error?: string | null;
  loading?: boolean;
  submitLabel?: string;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
}

const AuthFormLayout = ({
  title,
  subtitle,
  error,
  loading = false,
  submitLabel = "Tiếp tục",
  onSubmit,
  children,
}: Props) => {
  return (
    <div className="w-full max-w-md">
      {title ? (
        <div className="mb-8 text-center md:text-left">
          <h1 className="section-title text-on-surface">{title}</h1>
          {subtitle ? (
            <p className="section-desc mt-2 text-on-surface-variant">
              {subtitle}
            </p>
          ) : null}
        </div>
      ) : null}

      <form className="space-y-5" onSubmit={onSubmit}>
        {error ? (
          <div
            className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-relaxed text-red-700"
            role="alert"
          >
            {error}
          </div>
        ) : null}
        {children}

        <button
          disabled={loading}
          className="btn btn-primary w-full min-h-[3rem] text-base shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
          type="submit"
        >
          {loading ? "Đang xử lý..." : submitLabel}
        </button>
      </form>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-outline-variant/30" />
        </div>
        <div className="relative flex justify-center text-xs text-on-surface-variant">
          <span className="bg-background px-3">Hoặc tiếp tục với</span>
        </div>
      </div>

      <AuthSocials />
    </div>
  );
};

export default AuthFormLayout;
