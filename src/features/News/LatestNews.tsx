import useServer from "../../hook/useServer";
import SliderCards, { Loader } from "../../ui/SliderCards";

export default function LatestNews({ children }) {
  const [news, isLoading] = useServer<any>("news");
  const latest = [...news]
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))
    .slice(0, 4);
  if (isLoading) return <Loader />;
  return (
    <div>
      {children}
      <SliderCards arr={latest} categ="خبر" />
    </div>
  );
}
