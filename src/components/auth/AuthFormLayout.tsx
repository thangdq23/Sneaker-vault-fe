import type { FormEvent } from "react";
import AuthSocials from "./AuthSocials";

interface Props {
  title: string;
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
  submitLabel = "Continue",
  onSubmit,
  children,
}: Props) => {
  return (
    <div className="w-full max-w-md">
      <div className="space-y-2 mb-8">
        <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
          {title}
        </h1>
        {subtitle ? (
          <p className="text-on-surface-variant">{subtitle}</p>
        ) : null}
      </div>

      <form className="space-y-6" onSubmit={onSubmit}>
        {error ? (
          <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-red-700">
            {error}
          </div>
        ) : null}
        {children}

        <button
          disabled={loading}
          className="w-full bg-on-surface text-surface-container-lowest font-label-md text-label-md uppercase tracking-widest py-4 rounded-lg shadow-lg hover:opacity-90 active:scale-95 transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-70"
          type="submit"
        >
          {loading ? "Loading..." : submitLabel}
        </button>
      </form>

      <div className="relative my-10">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-outline-variant/30"></div>
        </div>
        <div className="relative flex justify-center text-label-sm uppercase">
          <span className="bg-background px-4 text-on-surface-variant">
            Or continue with
          </span>
        </div>
      </div>

      <AuthSocials />
    </div>
  );
};

export default AuthFormLayout;
