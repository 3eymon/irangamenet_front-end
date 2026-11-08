import { BookOpenIcon } from "@heroicons/react/24/outline";
import { cn } from "../../utils/cn";

export default function CardSkeleton({ className = "" }) {
  return (
    <div className={cn("w-full px-5 md:px-0", className)}>
      <div>
        <div className="w-full h-60 rounded-xl bg-neutral-800 animate-pulse"></div>
      </div>
      <div className="flex flex-col gap-1 pt-3">
        <div className="inline-flex gap-2 items-center text-sm pr-1">
          <div className="inline-flex gap-1 items-center">
            <div className="w-7 h-7 rounded-full bg-neutral-800 animate-pulse"></div>
            <div className="w-12 h-3 bg-neutral-800 animate-pulse rounded-sm"></div>
          </div>
          <div className="w-16 h-3 bg-neutral-800/70 rounded-sm animate-pulse"></div>
        </div>
        <h2 className="text-lg font-PeydaMed w-11/12 h-3 bg-neutral-800 animate-pulse rounded-sm mb-1"></h2>
        <h2 className="text-lg font-PeydaMed w-8/12 h-3 bg-neutral-800 animate-pulse rounded-sm"></h2>
        <div className="w-full pt-2 flex flex-col gap-1">
          <div className="w-full h-2 bg-neutral-800/70 animate-pulse rounded-sm"></div>
          <div className="w-full h-2 bg-neutral-800/70 animate-pulse rounded-sm"></div>
          <div className="w-3/4 h-2 bg-neutral-800/70 animate-pulse rounded-sm"></div>
        </div>
        <div className="pt-2">
          <div className="inline-flex items-center text-xs gap-1">
            <div className="ml-2 bg-neutral-800 w-7 h-3 animate-pulse rounded-sm"></div>
            <BookOpenIcon className="w-4 text-neutral-800 animate-pulse" />
            <div className="bg-neutral-800/70 w-16 h-3 animate-pulse rounded-sm"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
