import useServer from "../../hook/useServer";
import SliderCards, { Loader } from "../../ui/SliderCards";
function FreeGames({ children }) {
  const [Games, isLoading] = useServer("Games");
  if (isLoading) return <Loader />;
  return (
    <div>
      {children}
      <div className="mb-16">
        <SliderCards arr={Games} categ="ایران گی نت " />
      </div>
    </div>
  );
}

export default FreeGames;
