import MainApplication from "../features/Home/MainApplication";
import MainTopProducers from "../features/Home/MainTopProducers";
import MainHeader from "../features/Home/MainHeader";
import MainPopular from "../features/Home/MainSlider";
import MainFaqs from "../features/Home/MainFaqs";
import MainAbout from "../features/Home/MainAbout";


function Main() {
  const headerCards = [
    {
      id: 1,
      title: "سایبرپانک همچنین یکی از زیرسبک‌های داستان‌های پادآرمان‌شهری",
      image: "images/Cyberpunk2077.jpg",
      view: "665",
      score: "4",
      creatorName: "Ali Ahmadi",
      creatorImage: "",
    },
    {
      id: 2,
      title: " یک بازی اول شخص از مجموعه بازی‌های ندای وظیفه است",
      image: "images/callofduty_کالاف دیوتی.jpg",
      view: "46",
      score: "4.5",
      creatorName: "Ali Ahmadi",
      creatorImage: "",
    },
    {
      id: 3,
      title:
        "این بازی پنجمین قسمت اصلی در مجموعهٔ کانتر استرایک به‌شمار می‌رود.",
      image: "images/csgo.jpg",
      view: "775",
      score: "5",
      creatorName: "Ali Ahmadi",
      creatorImage: "",
    },
  ];
  const allCards = [
    {
      id: 1,
      title: "سایبرپانک همچنین یکی از زیرسبک‌های داستان‌های پادآرمان‌شهری",
      image: "images/cyberpunk/2.jpeg",
      view: "665",
      score: "4",
      creatorName: "Ali Ahmadi",
      creatorImage: "",
    },
    {
      id: 2,
      title: " یک بازی اول شخص از مجموعه بازی‌های ندای وظیفه است",
      image: "images/callofduty/2.jpg",
      view: "46",
      score: "4.5",
      creatorName: "Ali Ahmadi",
      creatorImage: "",
    },
    {
      id: 3,
      title:
        "این بازی پنجمین قسمت اصلی در مجموعهٔ کانتر استرایک به‌شمار می‌رود.",
      image: "images/csgo/3.webp",
      view: "775",
      score: "5",
      creatorName: "Ali Ahmadi",
      creatorImage: "",
    },
    {
      id: 4,
      title: "سایبرپانک همچنین یکی از زیرسبک‌های داستان‌های پادآرمان‌شهری",
      image: "images/cyberpunk/1.jpg",
      view: "665",
      score: "4",
      creatorName: "Ali Ahmadi",
      creatorImage: "",
    },
    {
      id: 5,
      title: " یک بازی اول شخص از مجموعه بازی‌های ندای وظیفه است",
      image: "images/callofduty/4.jpg",
      view: "46",
      score: "4.5",
      creatorName: "Ali Ahmadi",
      creatorImage: "",
    },
    {
      id: 6,
      title:
        "این بازی پنجمین قسمت اصلی در مجموعهٔ کانتر استرایک به‌شمار می‌رود.",
      image: "images/csgo/2.webp",
      view: "775",
      score: "5",
      creatorName: "Ali Ahmadi",
      creatorImage: "",
    },
  ];
  const topProducers = [
    {
      id: 1,
      name: "سونی /Sony",
      icon: "images/icon/producers/PlayStation.jpg",
      employees: "113,000 (2023)",
      Revenue: "🔼 ¥11.540 trillion ",
      Founded: "7 May 1946",
      creatorImage: "",
    },
    {
      id: 2,
      name: "ایکس باکس /Xbox",
      icon: "images/icon/producers/xbox.jpg",
      employees: "113,000 (2023)",
      Revenue: "🔼 ¥11.540 trillion ",
      Founded: "7 May 1946",
      creatorImage: "",
    },
    {
      id: 3,
      name: "تنسنت / Tencent",
      icon: "images/icon/producers/Tencent.jpg",
      employees: "113,000 (2023)",
      Revenue: "🔼 ¥11.540 trillion ",
      Founded: "7 May 1946",
      creatorImage: "",
    },
    {
      id: 4,
      name: "اکتیویژن /Activision",
      icon: "images/icon/producers/activision.svg",
      employees: "113,000 (2023)",
      Revenue: "🔼 ¥11.540 trillion ",
      Founded: "7 May 1946",
      creatorImage: "",
    },
    {
      id: 5,
      name: " الکترو .. / Electronic  Arts",
      icon: "images/icon/producers/ea_sports.png",
      employees: "113,000 (2023)",
      Revenue: "🔼 ¥11.540 trillion ",
      Founded: "7 May 1946",
      creatorImage: "",
    },
    {
      id: 6,
      name: "اپیک گیمز / Epic Games",
      icon: "images/icon/producers/Epic_Games.png",
      employees: "113,000 (2023)",
      Revenue: "🔼 ¥11.540 trillion ",
      Founded: "7 May 1946",
      creatorImage: "",
    },
  ];
  return (
    <main className="pb-10 flex flex-col gap-10">
      <MainHeader cards={headerCards} />
      <MainApplication />
      <MainPopular cards={allCards} title="محبوب ترین IGN ها" />
      <MainTopProducers producers={topProducers} />
      <MainPopular cards={allCards} title="جدید ترین IGN ها" />
      <MainFaqs />
      <MainAbout />
    </main>
  );
}

export default Main;
