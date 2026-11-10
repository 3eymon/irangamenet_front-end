import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "./ui/Image";

const components: Components = {
  h2: ({ children }) => (
    <h2 className="mt-16 mb-6 scroll-mt-28 border-b border-white/10 pb-4 text-xl font-black text-white first:mt-0 sm:text-2xl">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-10 mb-4 scroll-mt-28 text-lg font-bold text-white sm:text-xl">
      {children}
    </h3>
  ),
  p: ({ node, children }) => {
    const hasImage = node?.children.some(
      (child) => child.type === "element" && child.tagName === "img",
    );

    if (hasImage) {
      return <div className="my-6">{children}</div>;
    }

    return (
      <p className="my-6 text-sm leading-9 text-zinc-300 sm:text-base">
        {children}
      </p>
    );
  },
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-violet-400 underline-offset-4 hover:underline"
    >
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul className="my-6 list-disc space-y-2 pr-6 text-sm leading-9 text-zinc-300 sm:text-base">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-6 list-decimal space-y-2 pr-6 text-sm leading-9 text-zinc-300 sm:text-base">
      {children}
    </ol>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-6 border-r-4 border-violet-500/60 bg-white/5 py-2 pr-4 text-zinc-400">
      {children}
    </blockquote>
  ),
  strong: ({ children }) => (
    <strong className="font-bold text-white">{children}</strong>
  ),
  hr: () => <hr className="my-10 border-white/10" />,
  img: ({ src, alt }) => (
    <figure className="my-8 overflow-hidden rounded-2xl border border-white/10 bg-[#111116]">
      <Image
        src={src}
        alt={alt ?? ""}
        className="max-h-[520px] w-full object-cover"
      />
      {alt && (
        <figcaption className="border-t border-white/10 px-4 py-3 text-center text-xs text-zinc-500">
          {alt}
        </figcaption>
      )}
    </figure>
  ),
  table: ({ children }) => (
    <div className="my-8 overflow-x-auto rounded-2xl border border-white/10">
      <table className="w-full text-sm text-zinc-300">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-white/5 text-white">{children}</thead>
  ),
  th: ({ children }) => (
    <th className="px-4 py-3 text-right font-bold">{children}</th>
  ),
  td: ({ children }) => (
    <td className="border-t border-white/10 px-4 py-3">{children}</td>
  ),
};

export default function MarkDownContent({ content }: { content: string }) {
  return (
    <div dir="rtl">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
