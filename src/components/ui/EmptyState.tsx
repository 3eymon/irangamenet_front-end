import { DocumentMagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ReactNode } from "react";

function EmptyState({
  title = "اطلاعاتی پیدا نشد",
  description = "اطلاعاتی برای نمایش وجود ندارد",
  icon = <DocumentMagnifyingGlassIcon className="size-8 sm:size-10" />,
}: {
  title?: string;
  description?: string;
  icon?: ReactNode;
}) {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-3 p-5 text-center sm:gap-4 sm:p-7">
      <div className="rounded-lg bg-primary-800/50 p-2">{icon}</div>
      <div className="flex flex-col items-center gap-1">
        <h2 className="text-base font-semibold sm:text-xl">{title}</h2>
        <p className="text-xs text-zinc-400 sm:text-sm">{description}</p>
      </div>
    </div>
  );
}

export default EmptyState;