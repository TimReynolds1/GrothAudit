import Link, { type LinkProps } from "next/link";
import { clsx } from "clsx";
import type { ReactNode, ButtonHTMLAttributes } from "react";

type ButtonProps = {
  children: ReactNode;
  className?: string;
  href?: LinkProps<HTMLAnchorElement>["href"];
  variant?: "primary" | "secondary" | "ghost";
} & ButtonHTMLAttributes<HTMLButtonElement>;

const buttonStyles = {
  primary:
    "bg-tan-500 text-white hover:bg-tan-600 focus-visible:outline-tan-600",
  secondary:
    "bg-white text-slate-900 ring-1 ring-[#ddd0c0] hover:bg-tan-50 focus-visible:outline-tan-500",
  ghost:
    "bg-transparent text-slate-700 ring-1 ring-transparent hover:bg-tan-50 focus-visible:outline-tan-300"
};

const baseClassName =
  "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

export function Button({
  children,
  className,
  href,
  type = "button",
  variant = "primary",
  disabled,
  ...props
}: ButtonProps) {
  const classes = clsx(baseClassName, buttonStyles[variant], className);

  if (href) {
    return (
      <Link className={classes} href={href}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      disabled={disabled}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}