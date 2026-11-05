import { ReactNode } from "react";

export interface StateLayoutProps {
  illustration: ReactNode;
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
  isError?: boolean;
}

function StateLayout({
  illustration,
  title,
  description,
  actions,
  className = "",
  isError,
}: StateLayoutProps) {
  return (
    <div
      role={isError ? "alert" : "status"}
      className={`flex size-full flex-col items-center justify-center gap-4 p-6 text-center sm:p-10 ${className}`}
    >
      {illustration}

      <div className="flex max-w-xs flex-col items-center gap-1.5 sm:max-w-sm">
        <h2 className="text-base font-bold text-zinc-100 sm:text-xl">
          {title}
        </h2>
        {description && (
          <p className="text-xs leading-6 text-zinc-400 sm:text-sm sm:leading-7">
            {description}
          </p>
        )}
      </div>

      {actions && (
        <div className="mt-1 flex flex-wrap items-center justify-center gap-2">
          {actions}
        </div>
      )}
    </div>
  );
}

export default StateLayout;
