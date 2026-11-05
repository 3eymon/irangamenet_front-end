import { Link } from "react-router-dom";
import { NotFoundIllustration } from "./StateIllustrations";
import StateLayout from "../layout/StateLayout";

function NotFound({
  title = "صفحه پیدا نشد",
  description = "صفحه‌ای که دنبالشی وجود نداره یا جابه‌جا شده.",
  backTo = "/",
  backLabel = "بازگشت به خانه",
  className,
}: {
  title?: string;
  description?: string;
  backTo?: string;
  backLabel?: string;
  className?: string;
}) {
  return (
      <StateLayout
        illustration={<NotFoundIllustration />}
        title={title}
        description={description}
        className={className}
        actions={
          <Link
            to={backTo}
            className="rounded-lg bg-primary-600 px-5 py-2 text-xs font-medium text-white transition hover:bg-primary-500 sm:text-sm"
          >
            {backLabel}
          </Link>
        }
      />
  );
}

export default NotFound;
