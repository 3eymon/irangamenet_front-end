import useInc from "../../hook/useInc";

function Header({ scroll }) {
  const creaedGames = useInc(980);
  const hTraller = useInc(568);
  return (
    <div className="mx-auto min-h-[100vh] flex flex-col justify-evenly z-10">
      <div className="flex flex-col md:flex-row  md:gap-20 items-center h-full">
        <div className="relative">
          <img 
            src="/images/games/Character.png"
            className=" animate-fade-up [filter:drop-shadow(-5px_20px_7px_black)]"
          />
          <div className="absolute rounded-full shadow-2xl animate-fade-left bg-white/35 backdrop-blur-md top-20 left-12 px-5  py-1 font-PeydaBlack flex flex-col  items-center gap-0 justify-center text-xs p-0 m-0 text-gray-300">
            <span className="text-yellow-400 text-lg p-0 m-0">
              {creaedGames}
            </span>{" "}
            بازی ثبت شده{" "}
          </div>
          <div className="absolute rounded-full shadow-2xl animate-fade-right bg-white/35 backdrop-blur-md bottom-44 right-16 px-5  py-1 font-PeydaBlack flex flex-col  items-center gap-0 justify-center text-xs p-0 m-0 text-gray-300">
            <span className="text-green-400 text-lg p-0 m-0">{hTraller}</span>{" "}
            ساعت تریلر{" "}
          </div>
        </div>
        <div className="max-w-80 flex flex-col gap-5">
          <h2 className="text-3xl font-PeydaBlack text-red-500">
            فقط یه بازی انتخاب کن
          </h2>
          <p className="text-gray-400 text-sm">
            همین الان یک بازی انتخاب کن و هرچی میخوای درموردش بفهم پس منتظر چی
            هستی د یالا از قدیم گفتن وقت طلاست ما هم برات بدون چیز اضافه ای
            مطالب مهم رو هایلایت کردیم
          </p>
        </div>
      </div>
      <img
        onClick={scroll}
        src="/images/games/88221.png"
        className="w-6 invert mx-auto cursor-pointer animate-bounce animate-infinite animate-ease-linear animate-duration-[2000ms]"
      />
    </div>
  );
}

export default Header;
