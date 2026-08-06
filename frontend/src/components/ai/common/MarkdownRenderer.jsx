import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

import CodeBlock from "../chat/CodeBlock";

export default function MarkdownRenderer({ content }) {
  return (
    <div
      className="
        prose
        prose-slate
        max-w-none
        text-[15px]
        leading-7
        prose-headings:text-slate-900
        prose-p:text-slate-700
        prose-p:leading-8
        prose-strong:text-slate-900
        prose-code:before:hidden
        prose-code:after:hidden
      "
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          h1(props) {
            return (
              <h1
                className="mt-8 mb-5 text-3xl font-bold text-slate-900"
                {...props}
              />
            );
          },

          h2(props) {
            return (
              <h2
                className="mt-7 mb-4 text-2xl font-semibold text-slate-900"
                {...props}
              />
            );
          },

          h3(props) {
            return (
              <h3
                className="mt-6 mb-3 text-xl font-semibold text-slate-900"
                {...props}
              />
            );
          },

          p(props) {
            return (
              <p
                className="my-5 leading-8 text-slate-700"
                {...props}
              />
            );
          },

          ul(props) {
            return (
              <ul
                className="my-5 list-disc space-y-3 pl-7 marker:text-blue-600"
                {...props}
              />
            );
          },

          ol(props) {
            return (
              <ol
                className="my-5 list-decimal space-y-3 pl-7 marker:text-blue-600"
                {...props}
              />
            );
          },

          li(props) {
            return (
              <li
                className="my-1"
                {...props}
              />
            );
          },

          blockquote(props) {
            return (
              <blockquote
                className="my-6 rounded-r-xl border-l-4 border-blue-500 bg-blue-50 px-5 py-4 italic text-slate-700"
                {...props}
              />
            );
          },

          hr() {
            return (
              <hr className="my-8 border-slate-300" />
            );
          },

          a(props) {
            return (
              <a
                target="_blank"
                rel="noreferrer"
                className="font-medium text-blue-600 underline underline-offset-2 hover:text-blue-700"
                {...props}
              />
            );
          },

          img(props) {
            return (
              <img
                loading="lazy"
                className="my-5 rounded-xl border border-slate-200 shadow-sm"
                {...props}
              />
            );
          },

          table(props) {
            return (
              <div className="my-6 overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
                <table
                  className="min-w-full border-collapse text-sm"
                  {...props}
                />
              </div>
            );
          },

          th(props) {
            return (
              <th
                className="border-b bg-slate-100 px-5 py-3 text-left font-semibold text-slate-800"
                {...props}
              />
            );
          },

          td(props) {
            return (
              <td
                className="border-b border-slate-100 px-5 py-3 text-slate-700"
                {...props}
              />
            );
          },

          code({ children, className }) {
            const match = /language-(\w+)/.exec(className || "");

            if (match) {
              return (
                <CodeBlock
                  language={match[1]}
                  value={String(children).replace(/\n$/, "")}
                />
              );
            }

            return (
              <code className="rounded-md bg-slate-200 px-1.5 py-1 font-mono text-[13px] font-medium text-red-600">
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}