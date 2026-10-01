import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const faqs = [
  {
    id: 1,
    title: "استریمر به چه کسایی میگن ؟ ",
    desc: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است",
  },
  {
    id: 2,
    title: "تو بازار ایران گیم نت چیا هست ؟",
    desc: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است",
  },
  {
    id: 3,
    title: "از کجا شروع کنم ؟ ",
    desc: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است",
  },
  {
    id: 4,
    title: "چطوری با پشتیبانی IGNدر ارتباط باشم ؟ ",
    desc: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است",
  },
];

function MainFaqs() {
  const [open, setOpen] = useState(1);

  return (
    <div className="relative">
      <h2 className="pr-5 py-4">سوالات متداول</h2>
      <div className="flex justify-end absolute rotate-[61deg] top-0 right-36">
        <svg
          viewBox="0 0 39 104"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 lg:w-6 block text-white"
        >
          <path
            d="M9.96 92.03c3.946 3.092 9.307 7.14 13.43 9.493m0 0c.474.271.204-3.913.177-4.109-.581-4.301-1.625-8.535-2.764-12.848m2.586 16.957C4.44 80.457-2.175 53.037 5.481 38.907c.758-1.4 1.586-2.924 2.55-4.313m0 0c1.537-2.213 3.422-4.087 5.935-4.59 2.318-.463 5.784.17 7.94 2.607 4.027 4.553 2.166 11.094-2.429 11.22-4.037.112-9.76-4.42-11.445-9.237Zm0 0a9.684 9.684 0 0 1-.1-.305C.23 9.709 19.54-1.921 36.868 3.657"
            stroke="currentColor"
            strokeWidth="3"
            strokeMiterlimit="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </div>
      <div className="flex justify-between items-center gap-10 px-14">
        <div>
          {faqs.map((item) => (
            <AccordionItem
              title={item.title}
              text={item.desc}
              key={item.id}
              open={open}
              id={item.id}
              setOpen={setOpen}
            />
          ))}
        </div>
        <div className="hidden lg:block rounded-s-[5rem] rounded-bl-[5rem] border px-10 pt-12 border-b-[#3b35b2b6] text-center border-t-[#743cb380] border-l-[#743cb380] border-r-[#3b35b2b6]">
          <span className="bg-gradient-to-r from-[#3b35b2] to-[#733cb3] bg-clip-text text-transparent font-PeydaBlack font-bold pb-2 text-4xl">
            I G N
          </span>
          <img
            loading="lazy"
            src="images/20945728.png"
            className="px-10 object-cover"
            width="500px"
            alt="iranGameNet Faqs سوالات متداول"
          />
        </div>
      </div>
    </div>
  );
}

export default MainFaqs;

function AccordionItem({ title, text, setOpen, open, id }) {
  const isOpen = id === open;
  const active = "bg-gradient-to-r from-[#3b35b2] to-[#733cb3] border-none";
  return (
    <div className="sm:w-3/4 mx-auto">
      <div
        onClick={() => setOpen(id)}
        className={`flex justify-between drop-shadow-2xl  items-center cursor-pointer p-2 pr-5 rounded-xl border border-b-[#3b35b2b6] text-center border-t-[#743cb380] border-l-[#743cb380] border-r-[#3b35b2b6]  transition-all ease-linear ${
          isOpen ? active : ""
        }`}
      >
        <h2 className="pt-1">{title}</h2>
        <div className={isOpen ? "rounded-md border border-gray-400" : ""}>
          <ChevronDownIcon
            className={`w-10 h-10 p-2 transition-transform ease-linear ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>
      <div
        className={`[transition:_all_.4s;] ease-linear py-2 px-2 text-sm text-gray-200${
          isOpen
            ? " max-h-screen opacity-100 py-4"
            : " max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        {text}
      </div>
    </div>
  );
}
