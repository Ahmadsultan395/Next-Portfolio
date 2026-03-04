import React from "react";
import { Eye, EyeOff, LucideIcon } from "lucide-react";

interface AuthInputProps {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  icon: LucideIcon;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  touched?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
  isPassword?: boolean;
}

export default function InputComponent({
  label,
  name,
  type = "text",
  placeholder,
  icon: Icon,
  value,
  onChange,
  onBlur,
  error,
  touched,
  showPassword,
  onTogglePassword,
  isPassword = false,
}: AuthInputProps) {
  return (
    <div className="form-element">
      <label className="block text-sm font-semibold text-[var(--foreground)] mb-2">
        {label}
      </label>
      <div className="relative group">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted)] group-hover:text-[var(--hero-image)] transition-colors" />
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={`w-full pl-12 ${isPassword ? "pr-12" : "pr-4"} py-4 bg-[var(--background)]/50 border-2 ${
            error && touched
              ? "border-red-500/50 focus:border-red-500"
              : "border-[var(--hero-image)]/20 focus:border-[var(--hero-image)]"
          } rounded-xl text-[var(--foreground)] placeholder:text-[var(--muted)]/50 focus:outline-none focus:ring-2 ${
            error && touched
              ? "focus:ring-red-500/20"
              : "focus:ring-[var(--hero-image)]/20"
          } transition-all`}
        />
        {isPassword && onTogglePassword && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-[var(--hero-image)] transition-colors"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
      {error && touched && (
        <p className="mt-2 text-sm text-red-500 animate-shake">{error}</p>
      )}
    </div>
  );
}
