import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { ErrorIllustration } from "./StateIllustrations";
import StateLayout from "./layout/StateLayout";

function ErrorState({
  title = "مشکلی پیش اومد",
  description = "دریافت اطلاعات با خطا مواجه شد. لطفاً دوباره تلاش کن.",
  retry,
  className,
}: {
  title?: string;
  description?: string;
  retry?: {
    label?: string;
    fn: () => void;
    isLoading: boolean;
  };
  className?: string;
}) {
  return (
    <StateLayout
      isError
      illustration={<ErrorIllustration />}
      title={title}
      description={description}
      className={className}
      actions={
        retry && (
          <button
            type="button"
            onClick={retry.fn}
            disabled={retry.isLoading}
            className="flex items-center gap-2 rounded-lg bg-primary-600 px-5 py-2 text-xs font-medium text-white transition hover:bg-primary-500 sm:text-sm"
          >
            <ArrowPathIcon className="size-4" />
            {retry?.label || "تلاش دوباره"}
          </button>
        )
      }
    />
  );
}

export default ErrorState;
