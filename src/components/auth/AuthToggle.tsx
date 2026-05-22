import type { MouseEventHandler } from "react";

type Tab = "login" | "register";

interface Props {
  active: Tab;
  onSwitch?: (tab: Tab) => void;
}

const AuthToggle = ({ active, onSwitch }: Props) => {
  const handleClick =
    (tab: Tab): MouseEventHandler<HTMLButtonElement> =>
    (e) => {
      e.preventDefault();
      onSwitch?.(tab);
    };

  return (
    <div className="mb-8 flex w-full max-w-md gap-4 border-b border-outline-variant/30 sm:gap-8">
      <button
        type="button"
        onClick={handleClick("login")}
        className={`shrink-0 pb-3 text-sm font-semibold leading-snug transition-colors sm:text-base ${
          active === "login"
            ? "border-b-2 border-on-surface text-on-surface"
            : "text-on-surface-variant hover:text-on-surface"
        }`}
      >
        Đăng nhập
      </button>
      <button
        type="button"
        onClick={handleClick("register")}
        className={`shrink-0 pb-3 text-sm font-semibold leading-snug transition-colors sm:text-base ${
          active === "register"
            ? "border-b-2 border-on-surface text-on-surface"
            : "text-on-surface-variant hover:text-on-surface"
        }`}
      >
        Tạo tài khoản
      </button>
    </div>
  );
};

export default AuthToggle;
