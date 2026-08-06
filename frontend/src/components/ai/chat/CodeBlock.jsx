import { useState } from "react";
import { FaCheck, FaCopy } from "react-icons/fa";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function CodeBlock({

  language,
  value,

}) {

  const [copied, setCopied] = useState(false);

  async function handleCopy() {

    await navigator.clipboard.writeText(value);

    setCopied(true);

    setTimeout(() => {

      setCopied(false);

    }, 2000);

  }

  return (

    <div className="my-5 overflow-hidden rounded-2xl border border-slate-200">

      <div className="flex items-center justify-between border-b bg-slate-100 px-4 py-2">

        <span className="text-xs font-medium uppercase text-slate-500">

          {language || "text"}

        </span>

        <button
          onClick={handleCopy}
          className="flex items-center gap-2 text-xs text-slate-600 hover:text-blue-600"
        >

          {copied ? (

            <>

              <FaCheck />

              Copied

            </>

          ) : (

            <>

              <FaCopy />

              Copy

            </>

          )}

        </button>

      </div>

      <SyntaxHighlighter

        language={language}

        style={oneLight}

        customStyle={{
          margin: 0,
          padding: "20px",
          fontSize: "14px",
          background: "#ffffff",
        }}

      >

        {value}

      </SyntaxHighlighter>

    </div>

  );

}