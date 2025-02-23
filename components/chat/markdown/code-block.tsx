import ShikiHighlighter from "react-shiki"
import { CodeCopy } from "./code-copy"

export const CodeBlock = ({ code, language }: { code: string, language: string }) => {
    return <div className="flex flex-col border rounded-sm mt-4">
        <div className="flex flex-row bg-code-header justify-end items-center h-[30px] px-2">
            <CodeCopy content={code} />
        </div>
        <div className="flex flex-col w-full">
            <ShikiHighlighter language={language} theme="aurora-x">
                {code.trim()}
            </ShikiHighlighter>
        </div>
    </div>
}