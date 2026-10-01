import { Link } from "react-router-dom";
import { ButtonBase } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { ArrowLongLeftIcon, BookOpenIcon } from "@heroicons/react/24/outline";
function BestIGNGameNets({ gameNets, isLoading }) {
  const bestGameNets = gameNets.sort((a, b) => b.rating - a.rating).slice(0, 4);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 lg:gap-6 gap-20 px-10 lg:px-0 justify-items-center sm:justify-items-stretch my-10">
      {isLoading ? (
        <>
          <BestIGNGameNetCardLoader />
          <BestIGNGameNetCardLoader />
          <BestIGNGameNetCardLoader />
          <BestIGNGameNetCardLoader />
        </>
      ) : (
        bestGameNets.map((gn, i) => <BestIGNGameNetCard key={i} item={gn} />)
      )}
    </div>
  );
}
function BestIGNGameNetCard({ item }) {
  return (
    <div className="group">
      <div className="flex justify-between items-center pb-2">
        <div>
          <h2 className="text-xl font-PeydaMed p-0 m-0">
            <Link to={`${item.id}`}>{item.title}</Link>
          </h2>
          <div className="text-xs text-gray-400 flex gap-2 items-center">
            <BookOpenIcon className="w-12" />
            <p className="line-clamp-1 pl-28">{item.description}</p>
          </div>
        </div>
        <ButtonBase className="!text-white ring-1 ring-gray-500 !p-2 !rounded-lg">
          <Link to={`${item.id}`}>
            <ArrowLongLeftIcon className="w-5 mx-auto" />
          </Link>
        </ButtonBase>
      </div>
      <Link to={`${item.id}`} className="h-full w-full">
        <img
          src={item.image}
          alt={`${item.titl} عکس  `}
          className="w-full h-32 object-cover rounded-lg group-hover:brightness-75 transition ease-linear bg-gray-400"
          loading="lazy"
        />
      </Link>
    </div>
  );
}
function BestIGNGameNetCardLoader() {
  return (
    <div className="group">
      <div className="flex justify-between items-center pb-2">
        <div>
          <h2 className="h-5 w-20 rounded bg-gray-400 animate-pulse"></h2>
          <div className="text-xs text-gray-400 flex gap-2 items-center mt-2">
            <BookOpenIcon className="w-3 animate-pulse" />
            <p className="w-44 rounded h-3 bg-gray-400 animate-pulse"></p>
          </div>
        </div>
        <LoadingButton
          loading
          variant="outlined"
          className="!min-w-10 w-10  ring-1 ring-gray-500 !p-1 !rounded-lg"
          size="small"
        >
          Submit
        </LoadingButton>
      </div>
      <div className="w-full h-32 object-cover rounded-md group-hover:brightness-75 transition ease-linear bg-gray-400" />
    </div>
  );
}

export default BestIGNGameNets;
