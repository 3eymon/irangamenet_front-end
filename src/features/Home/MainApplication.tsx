import { ShieldCheckIcon } from "@heroicons/react/24/outline";
import { PresentationChartBarIcon } from "@heroicons/react/24/outline";
import { VideoCameraIcon } from "@heroicons/react/24/outline";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import { RocketLaunchIcon } from "@heroicons/react/24/outline";
function MainApplication() {
  return (
    <div className="text-xs leading-loose flex flex-col items-center lg:items-start px-4">
      <p className="font-Peyda">دانلود اپلیکیشن ایران گیم نت</p>
      <p className="text-gray-400">
        با اپلیکیشن ایرن گیم نت خیلی راحت میتونی مقالات رو بخونی
      </p>
      <AblitWebsite />
      <DownloadPlatform />
    </div>
  );
}

export default MainApplication;
function AblitWebsite() {
  return (
    <div className="flex flex-wrap justify-center gap-14 place-items-center items-center mx-auto text-[10px] text-gray-300 pt-5">
      <div className="flex flex-col gap-1 items-center">
        <ShieldCheckIcon className="w-11 h-11 stroke-1" />
        <span> بازار امن</span>
      </div>
      <div className="flex flex-col gap-1 items-center">
        <VideoCameraIcon className="w-11 h-11 stroke-1" />
        <span>استریمر های محبوب</span>
      </div>
      <div className="flex flex-col gap-1 items-center">
        <UserGroupIcon className="w-11 h-11 stroke-1" />
        <span>پشتیبانی قوی </span>
      </div>
      <div className="flex flex-col gap-1 items-center">
        <RocketLaunchIcon className="w-11 h-11 stroke-1" />
        <span>بروز بودن </span>
      </div>
      <div className="flex flex-col gap-1 items-center">
        <PresentationChartBarIcon className="w-11 h-11 stroke-1" />
        <span>ساده و کاربردی</span>
      </div>
    </div>
  );
}
function DownloadPlatform() {
  return (
    <div className="flex justify-center gap-5 py-5 mx-auto">
      <button className="flex items-center gap-1 text-xs font-thin bg-gradient-to-r from-[#3b35b2] to-[#733cb3] px-3 py-2 transition-shadow ease-linear rounded-md shadow-[#733cb39c_0px_0px_5px] hover:shadow-md ">
        <img src="images/icon/android.png" className="w-7 h-7" alt="" />
        <div className="flex flex-col items-start gap-1">
          <p className="font-Peyda">اندروید</p>
          <p className="text-gray-200 text-[10px]">
            دانلود برای سیستم عامل اندروید
          </p>
        </div>
      </button>
      <button className="flex items-center gap-1 text-xs font-thin bg-gradient-to-r from-[#3b35b2] to-[#733cb3] px-3 py-2 transition-shadow ease-linear rounded-md shadow-[#733cb39c_0px_0px_5px] hover:shadow-md ">
        <img src="images/icon/ios.png" className="w-7 h-7" alt="" />
        <div className="flex flex-col items-start gap-1">
          <p className="font-Peyda">IOS</p>
          <p className="text-gray-200 text-[10px]">
            دانلود برای سیستم عامل IOS
          </p>
        </div>
      </button>
    </div>
  );
}
