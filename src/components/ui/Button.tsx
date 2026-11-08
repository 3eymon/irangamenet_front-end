import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "../../utils/cn";

type Variant = "primary" | "outlined" | "ghost";
type Size = "sm" | "md" | "lg";

type OwnProps<T extends ElementType> = {
  as?: T;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  icon?: ReactNode;
  className?: string;
};

type Props<T extends ElementType> = OwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof OwnProps<T>>;

const base =
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-xl font-semibold transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-br from-primary-500 to-primary-700 text-white ring-1 ring-inset ring-white/10 hover:from-primary-400 hover:to-primary-600",
  outlined:
    "border border-primary-500 text-primary-300 hover:bg-primary-500/10 hover:border-primary-400",
  ghost: "text-primary-300 hover:bg-primary-500/10",
};

const sizes: Record<Size, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

export function Button<T extends ElementType = "button">({
  as,
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  className = "",
  children,
  ...props
}: Props<T>) {
  const Component: ElementType = as ?? "button";
  const isButton = Component === "button";

  const buttonProps = isButton
    ? {
        type: props.type ?? "button",
        disabled: props.disabled || loading,
        "aria-busy": loading,
      }
    : {};

  return (
    <Component
      {...props}
      {...buttonProps}
      className={cn(base, variants[variant], sizes[size], className)}
    >
      {loading ? (
        <span
          className="h-4 w-4 animate-spin rounded-full border-2 border-current/30 border-t-current"
          aria-hidden="true"
        />
      ) : (
        icon
      )}
      {children}
    </Component>
  );
}
