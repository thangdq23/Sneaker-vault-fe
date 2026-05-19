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
    <div className="space-y-1">
      {label ? (
        <label
          className="font-label-sm text-label-sm uppercase text-on-surface-variant"
          htmlFor={id ?? name}
        >
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
        className={`w-full bg-surface-container-lowest border-0 border-b border-outline-variant focus:ring-0 focus:border-on-surface transition-all py-3 px-0 font-body-md placeholder:text-outline-variant ${className}`}
      />
    </div>
  );
};

export default AuthInput;
