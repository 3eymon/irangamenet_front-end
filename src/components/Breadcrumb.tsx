import { clsx } from "clsx";
import { Link } from "react-router-dom";
import { cn } from "../utils/cn";

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "mb-8 flex items-center gap-2 text-xs text-zinc-500",
        className,
      )}
    >
      <Link to="/" className="transition hover:text-primary-300">
        خانه
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div
            key={`${item.label}-${index}`}
            className="flex min-w-0 items-center gap-2"
          >
            <span aria-hidden="true">/</span>

            {item.to && !isLast ? (
              <Link
                to={item.to}
                className="truncate transition hover:text-primary-300"
              >
                {item.label}
              </Link>
            ) : (
              <span
                aria-current={isLast ? "page" : undefined}
                className={`max-w-[180px] truncate ${
                  isLast ? "text-zinc-300" : ""
                }`}
              >
                {item.label}
              </span>
            )}
          </div>
        );
      })}
    </nav>
  );
}
