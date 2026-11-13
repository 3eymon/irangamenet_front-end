import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

import { cn } from "../../utils/cn";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  icon?: ReactNode;

  wrapperClassName?: string;
  iconClassName?: string;

  containerClassName?: string;

  onValueChange?: (value: string) => void;
};

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    icon,
    wrapperClassName,
    containerClassName,
    iconClassName,
    className,
    onChange,
    onValueChange,
    ...props
  },
  ref,
) {
  return (
    <div className={cn("relative w-full", wrapperClassName)}>
      <input
        ref={ref}
        {...props}
        onChange={(event) => {
          onChange?.(event);
          onValueChange?.(event.target.value);
        }}
        className={cn(
          "w-full rounded-xl border-2 border-solid border-zinc-500",
          "bg-transparent py-3 text-right text-sm lg:text-base",
          "font-Peyda text-white outline-none transition-all",
          "caret-gray-300 placeholder:text-right",
          "placeholder:select-none placeholder:text-gray-400",
          "focus:border-primary-500",
          icon ? "pl-12" : "pl-4",
          className,
        )}
      />

      {icon && (
        <span
          className={cn(
            "absolute left-4 top-1/2 -translate-y-1/2",
            "flex items-center justify-center",
            "pointer-events-none",
            iconClassName,
          )}
        >
          {icon}
        </span>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
