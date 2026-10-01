import { Link } from "react-router-dom";
import useServer from "../../hook/useServer";
import { PopularCard } from "./HeaderNews";
import ReactTimeAgo from "react-time-ago";
import { BookOpenIcon } from "@heroicons/react/24/outline";
import LazyLoad from "react-lazyload";

export default function MostViewed({ children }) {
  const [news, isLoading] = useServer("news");
  news.sort(function (a, b) {
    return b.views - a.views;
  });
  if (isLoading) return <div>LOading ...</div>;
  return (
    <div>
      {children}
      <div className="w-full flex flex-col lg:flex-row px-5">
        <TopViewed news={news} />
        <span className="w-full h-0.5 rounded-full bg-gray-400 my-5 lg:hidden"></span>
        <div className="w-full">
          {news.map((n, index) =>
            index > 0 && index <= 3 ? (
              <PopularCard
                key={index}
                title={n.title}
                author={n.author}
                id={n.id}
                views={n.views}
                createdAt={n.date}
                image={n.image}
              />
            ) : undefined
          )}
        </div>
      </div>
    </div>
  );
}

function TopViewed({ news }) {
  const topview = news[0];
  return (
    <div className="w-full">
      {topview ? (
        <div key={topview.id} className="w-full ">
          <Link to={topview.id}>
            <LazyLoad>
              <img
                loading="lazy"
                src={topview.image}
                className="w-full h-60 object-cover rounded-xl hover:brightness-[.8] transition-all ease-linear bg-gray-400"
                alt={`خبر ${topview.title} `}
              />
            </LazyLoad>
          </Link>
          <div className="flex flex-col gap-1 pt-3">
            <div className="inline-flex gap-2 items-center text-sm pr-1">
              <Link to={`/news/${topview.id}`} className="inline-flex gap-1 items-center">
                <img
                  loading="lazy"
                  src="/images/icon/header/Grand-Theft-Auto-San-Andreas.jpg"
                  className="w-7 h-7 rounded-full object-cover"
                  alt={`${topview.author} سازنده خبر `}
                />
                <p className="hover:underline">{topview.author}</p>
              </Link>
              <p className="text-gray-400">
                <ReactTimeAgo
                  date={new Date(topview.date)}
                  locale="fa-IR"
                  timeStyle="round"
                />
              </p>
            </div>
            <h2 className="text-lg font-PeydaMed w-11/12 ">
              <Link to={topview.id}>{topview.title}</Link>
            </h2>
            <p className="text-gray-300 text-xs line-clamp-3">
              {topview.description}
            </p>
            <div className="pt-2">
              <p className="text-gray-400 inline-flex items-center text-xs gap-1">
                <Link to="action" className="text-red-500 pl-2">
                  اکشن
                </Link>
                <BookOpenIcon className="w-4" />
                {topview.views.toLocaleString()} نفر خوندن
              </p>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
