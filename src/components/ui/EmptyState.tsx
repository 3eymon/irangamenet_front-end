import { DocumentMagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ReactNode } from "react";

function EmptyState({
  title = "اطلاعاتی پیدا نشد ",
  description = "اطلاعاتی برای نمایش وجود ندارد ",
  icon = <DocumentMagnifyingGlassIcon className="size-10" />,
}: {
  title?: string;
  description?: string;
  icon?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 justify-center items-center size-full p-7">
      <div className="bg-primary-800/50 p-2 rounded-lg">{icon}</div>
      <div className="flex flex-col items-center">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-zinc-400 text-sm">{description}</p>
      </div>
    </div>
  );
}

export default EmptyState;
