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
    <div className="flex gap-8 mb-12 border-b border-outline-variant/30">
      <button
        onClick={handleClick("login")}
        className={`font-label-md text-label-md uppercase tracking-widest pb-4 ${
          active === "login"
            ? "text-on-surface border-b-2 border-on-surface"
            : "text-on-surface-variant hover:text-on-surface"
        }`}
      >
        Login
      </button>
      <button
        onClick={handleClick("register")}
        className={`font-label-md text-label-md uppercase tracking-widest pb-4 ${
          active === "register"
            ? "text-on-surface border-b-2 border-on-surface"
            : "text-on-surface-variant hover:text-on-surface"
        }`}
      >
        Register
      </button>
    </div>
  );
};

export default AuthToggle;
