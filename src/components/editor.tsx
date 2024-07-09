import { useEffect, useMemo, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { remark } from "remark";
import remarkHtml from "remark-html";

import rehypeParse from "rehype-parse";
import rehypeRemark from "rehype-remark";
import remarkStringify from "remark-stringify";
import dynamic from "next/dynamic";


export interface EditorContentChanged {
    html: string;
    markdown: string;
}

export interface EditorProps {
    value?: string;
    defaultValue?: string;
    onChange?: (changes: EditorContentChanged) => void;
}

const TOOLBAR_OPTIONS = [
    [{ header: [1, 2, 3, 4, 5, false] }],
    ["bold", "italic", "underline", "strike", "blockquote", "link"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    ["emoji"],
    ["clean"]
];

export function htmlToMarkdown(htmlText: string) {
    const file = remark()
        .use(rehypeParse, { emitParseErrors: true, duplicateAttribute: false })
        .use(rehypeRemark)
        .use(remarkStringify)
        .processSync(htmlText);

    return String(file);
}
export function markdownToHtml(markdownText: string) {
    const file = remark().use(remarkHtml).processSync(markdownText);
    return String(file);
}

export default function Editor(props: EditorProps) {
    const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), []);
    const [value, setValue] = useState<string | undefined>();
    const reactQuillRef = useRef<ReactQuill>(null);
    useEffect(() => {
        setValue(props.value)
    }, [props.value])

    const onChange = (content: string) => {
        setValue(content);

        if (props.onChange) {
            props.onChange({
                html: content,
                markdown: htmlToMarkdown(content)
            });
        }
    };

    return (
        <div className="rounded-md border-primary focus:border-primary focus:ring-primary outline-primary">
            <ReactQuill
                className="h-1/2 overflow-y-visible"
                // ref={reactQuillRef}
                theme="snow"
                placeholder="Newsletter details here..."
                modules={{
                    toolbar: {
                        container: TOOLBAR_OPTIONS
                    },
                }}
                value={value}
                onChange={onChange}
                defaultValue={props.defaultValue}
            />
        </div>

    );
}
