import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface TactileButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "blue" | "danger" | "warning";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export function TactileButton({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
  disabled,
  ...props
}: TactileButtonProps) {
  const baseClasses =
    "font-bold uppercase tracking-wider rounded-2xl select-none transition-all duration-150 inline-flex items-center justify-center gap-2 cursor-pointer border-none";

  const sizeClasses = {
    sm: "py-2 px-3.5 text-xs",
    md: "py-3 px-5 text-sm",
    lg: "py-4 px-8 text-base",
  };

  const variantClasses = {
    primary:
      "bg-[#7c3aed] text-white shadow-[0_4px_0_#5b21b6] hover:-translate-y-0.5 hover:shadow-[0_6px_0_#5b21b6] active:translate-y-1 active:shadow-[0_1px_0_#5b21b6]",
    secondary:
      "bg-white text-[#7c3aed] border-2 border-[#e5e5e5] shadow-[0_2px_0_#e5e5e5] hover:bg-[#f3e8ff]/50 active:translate-y-0.5 active:shadow-none",
    blue:
      "bg-[#1cb0f6] text-white shadow-[0_4px_0_#1899d6] hover:-translate-y-0.5 hover:shadow-[0_6px_0_#1899d6] active:translate-y-1 active:shadow-[0_1px_0_#1899d6]",
    danger:
      "bg-[#ff4b4b] text-white shadow-[0_4px_0_#ea2b2b] hover:-translate-y-0.5 hover:shadow-[0_6px_0_#ea2b2b] active:translate-y-1 active:shadow-[0_1px_0_#ea2b2b]",
    warning:
      "bg-[#ff9600] text-white shadow-[0_4px_0_#e58500] hover:-translate-y-0.5 hover:shadow-[0_6px_0_#e58500] active:translate-y-1 active:shadow-[0_1px_0_#e58500]",
  };

  const disabledClasses =
    "disabled:bg-[#e5e5e5] disabled:text-[#afafaf] disabled:shadow-[0_4px_0_#d0d0d0] disabled:cursor-not-allowed disabled:transform-none disabled:border-none";

  return (
    <button
      disabled={disabled}
      className={twMerge(
        clsx(
          baseClasses,
          sizeClasses[size],
          variantClasses[variant],
          disabledClasses,
          fullWidth && "w-full",
          className
        )
      )}
      {...props}
    >
      {children}
    </button>
  );
}
