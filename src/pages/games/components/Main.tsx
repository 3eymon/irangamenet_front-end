import {
  UsersIcon,
  HandThumbUpIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import "./games.css"
function Main({ el }) {
  return (
    <div ref={el} className="w-full mx-auto px-7">
      <h2 className="text-center text-gray-300 text-xl font-PeydaBlack  mt-5">
        با بازی های جدید قدم بعدی رو به سوی قوی تر شدن در صنعت گیم بردار
      </h2>
      <div className="flex flex-wrap items-center gap-10 justify-center mt-11 mb-5">
        <div className="relative flex  p-6 py-9 gap-2 items-center rounded-xl w-full sm:w-auto">
          <div className=" bg-orange-400/15 text-orange-400 p-4 rounded-full">
            <UsersIcon className="w-6" />
          </div>
          <div>
            <h3 className=" font-PeydaMed text-slate-100">
              اشنایی با بازی سازان حرفه ای
            </h3>
            <p className="text-gray-400 text-xs pt-1">
              از جمله اکتیویژن ,راکستار,سونی ...
            </p>
          </div>
          <span className="w-1.5 h-14 rounded-lg bg-orange-400 right-0 absolute"></span>
        </div>
        <div className="relative flex  p-6 py-9 gap-2 items-center rounded-xl w-full sm:w-auto">
          <div className=" bg-green-400/15 text-green-400 p-4 rounded-full">
            <HandThumbUpIcon className="w-6" />
          </div>
          <div>
            <h3 className=" font-PeydaMed text-slate-100">اعتبار اطلاعات</h3>
            <p className="text-gray-400 text-xs pt-1">
              با اطمینان به همه ی اطلاعات کارتو بکن
            </p>
          </div>
          <span className="w-1.5 h-14 rounded-lg bg-green-400 right-0 absolute"></span>
        </div>
        <div className="relative flex  p-6 py-9 gap-2 items-center rounded-xl w-full sm:w-auto">
          <div className=" bg-blue-400/15 text-blue-400 p-4 rounded-full">
            <InformationCircleIcon className="w-6" />
          </div>
          <div>
            <h3 className=" font-PeydaMed text-slate-100">پشتیبانی همیشگی</h3>
            <p className="text-gray-400 text-xs pt-1">
              همیشه در کنار شما برای بهبود عملکرد
            </p>
          </div>
          <span className="w-1.5 h-14 rounded-lg bg-blue-400 right-0 absolute"></span>
        </div>
      </div>
      <div className="flex">
        <Link to="all" className="mx-auto">
          <button className="all-games ">همه ی بازی ها</button>
        </Link>
      </div>
    </div>
  );
}

export default Main;
