import useServer from "../../hook/useServer";

import SliderCards, { Loader } from "../../ui/SliderCards";

export default function WeeklyHighlightNews({ children }) {
  const [weeklyHighlightNews, isLoading] = useServer("WeeklyHighlightNews");

  if (isLoading) return <Loader />;
  return (
    <div>
      {children}
      <SliderCards arr={weeklyHighlightNews} categ="خبر" />
    </div>
  );
}
