// EmptyState.tsx
import { ReactNode } from "react";
import { EmptyIllustration } from "./StateIllustrations";
import StateLayout from "./layout/StateLayout";

function EmptyState({
  title = "اطلاعاتی پیدا نشد",
  description = "اطلاعاتی برای نمایش وجود ندارد",
  illustration = <EmptyIllustration />,
  actions,
  className,
}: {
  title?: string;
  description?: string;
  illustration?: ReactNode;
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <StateLayout
      illustration={illustration}
      title={title}
      description={description}
      actions={actions}
      className={className}
    />
  );
}

export default EmptyState;