import {
  BookmarkIcon,
  PuzzlePieceIcon,
} from "@heroicons/react/24/outline";
function SavedGames() {
  const games = [];

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-semibold">بازی‌های ذخیره‌شده</h1>
        <p className="text-sm text-neutral-500">
          بازی‌هایی که ذخیره کردی اینجا در دسترس هستن تا هر زمان خواستی بهشون
          سر بزنی.
        </p>
      </div>

      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">لیست بازی‌ها</h2>
          <span className="text-xs text-neutral-500">
            {games.length} بازی
          </span>
        </div>

        {games.length === 0 ? (
          <div className="flex min-h-72 flex-col items-center justify-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] px-5 text-center">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-primary-500/10 text-primary-400">
              <PuzzlePieceIcon className="size-7" />
            </div>

            <div className="space-y-1">
              <h3 className="font-semibold">هنوز بازی‌ای ذخیره نکردی!</h3>
              <p className="max-w-xs text-xs leading-6 text-neutral-500">
                هر بازی‌ای که دوست داری بعداً بررسی کنی، ذخیره کن تا اینجا
                پیداش کنی.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {/* Game Cards */}
          </div>
        )}
      </div>
    </div>
  );
}

export default SavedGames;