import type { InputHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: ReactNode;
  className?: string;
  prop?: any;
  setValue?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  mode?: string;
};

function Input({ label, className, prop, setValue, ...props }: InputProps) {
  return (
    <div className="relative w-full">
      {label && (
        <label className="absolute top-1/2 -translate-y-1/2 right-4">
          {label}
        </label>
      )}

      <input
        {...props}
        {...(prop ?? {})}
        onChange={(event) => {
          prop?.onChange?.(event);
          setValue?.(event);
        }}
        className={clsx(
          "w-full text-left bg-transparent caret-gray-300 outline-none border-2 border-solid border-zinc-500 transition-all placeholder:text-gray-400 placeholder:select-none text-sm lg:text-base  rounded-xl py-3 lg:py-3 placeholder:text-right pr-10 md:pr-12 lg:pr-18 pl-4 lg:pl-6 bg-gray-100 font-Peyda",
          className
        )}
      />
    </div>
  );
}

export default Input;
