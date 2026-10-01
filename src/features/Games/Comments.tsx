import { TitleHeader } from "./SinglePage";
import { IoSendOutline } from "react-icons/io5";

function Comments({ el }) {
  return (
    <div
      ref={el}
      className="text-white p-5 rounded-xl flex flex-col gap-6 max-h-full "
    >
      <TitleHeader title="نظرات و پرسش ها" />
      <h2 className="text-2xl font-PeydaMed my-4 ml-10 text-left">
        0 نظر ثبت شده
      </h2>
      <div className="input input-bordered flex items-center gap-2 bg-transparent">
        <input
          type="text"
          className="grow bg-transparent text-white placeholder:text-gray-200"
          placeholder="چه سوالی داری ؟ ( نظر )"
        />
        <button>
          <IoSendOutline className=" rotate-180 w-8 h-6" />
        </button>
      </div>
    </div>
  );
}

export default Comments;
