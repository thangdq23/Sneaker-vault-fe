import type { ChangeEvent } from "react";

interface Props {
  id?: string;
  name: string;
  label?: string;
  type?: string;
  value: string;
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const AuthInput = ({
  id,
  name,
  label,
  type = "text",
  value,
  placeholder,
  onChange,
  className = "",
}: Props) => {
  return (
    <div className="space-y-1.5">
      {label ? (
        <label className="form-label" htmlFor={id ?? name}>
          {label}
        </label>
      ) : null}
      <input
        id={id ?? name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`form-input bg-surface-container-lowest border-0 border-b border-outline-variant rounded-none px-0 focus:ring-0 focus:border-on-surface ${className}`}
      />
    </div>
  );
};

export default AuthInput;
