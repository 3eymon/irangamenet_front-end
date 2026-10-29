import { SparklesIcon } from "@heroicons/react/24/solid";

function Streamers() {
  return (
    <section className="relative flex min-h-[80vh] flex-col items-center justify-center gap-6 px-5 text-center">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 md:h-96 md:w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/25 blur-3xl"
      />

      <span className="relative flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-1 text-[11px] text-violet-300">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-400" />
        </span>
        Coming Soon
      </span>

      <h1 className="relative flex items-center gap-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-5xl font-black text-transparent md:text-7xl">
        <SparklesIcon className="h-8 w-8 text-violet-300 md:h-12 md:w-12" />
        به زودی
      </h1>

      <p className="relative max-w-xs text-xs leading-7 text-gray-400 md:max-w-md md:text-sm">
        بخش استریمرها در راهه؛ محبوب‌ترین استریمرهای ایرانی به‌زودی اینجا هستن
      </p>
    </section>
  );
}

export default Streamers;