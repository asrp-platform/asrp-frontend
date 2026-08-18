/* eslint-disable react-refresh/only-export-components */
import type { ReactNode } from "react"
import type { JSONContent } from "@tiptap/react"

interface IProps {
    content: JSONContent
}

export const getArticlePlainText = (content?: JSONContent): string => {
    if (!content) return ""
    const ownText = typeof content.text === "string" ? content.text : ""
    const children = content.content?.map(getArticlePlainText).filter(Boolean).join(" ") ?? ""
    return [ownText, children].filter(Boolean).join(" ").replace(/\s+/g, " ").trim()
}

const renderMarks = (node: JSONContent, value: ReactNode): ReactNode =>
    node.marks?.reduce<ReactNode>((child, mark) => {
        switch (mark.type) {
            case "bold":
                return <strong>{child}</strong>
            case "italic":
                return <em>{child}</em>
            case "strike":
                return <s>{child}</s>
            case "code":
                return <code>{child}</code>
            case "highlight":
                return <mark>{child}</mark>
            case "link":
                return (
                    <a href={String(mark.attrs?.href ?? "#")} rel="noopener noreferrer">
                        {child}
                    </a>
                )
            default:
                return child
        }
    }, value) ?? value

const renderNode = (node: JSONContent, key: number | string): ReactNode => {
    if (node.type === "text") return renderMarks(node, node.text ?? "")

    const children = node.content?.map((child, index) => renderNode(child, index)) ?? null

    switch (node.type) {
        case "doc":
            return <div key={key}>{children}</div>
        case "paragraph":
            return <p key={key}>{children}</p>
        case "heading": {
            const level = Number(node.attrs?.level ?? 2)
            if (level === 1) return <h1 key={key}>{children}</h1>
            if (level === 2) return <h2 key={key}>{children}</h2>
            if (level === 3) return <h3 key={key}>{children}</h3>
            if (level === 4) return <h4 key={key}>{children}</h4>
            return <h5 key={key}>{children}</h5>
        }
        case "bulletList":
            return <ul key={key}>{children}</ul>
        case "orderedList":
            return <ol key={key}>{children}</ol>
        case "listItem":
            return <li key={key}>{children}</li>
        case "blockquote":
            return <blockquote key={key}>{children}</blockquote>
        case "codeBlock":
            return (
                <pre key={key}>
                    <code>{getArticlePlainText(node)}</code>
                </pre>
            )
        case "hardBreak":
            return <br key={key} />
        case "horizontalRule":
            return <hr key={key} />
        case "image": {
            const imageWidth = ["50%", "75%", "100%"].includes(String(node.attrs?.width))
                ? String(node.attrs?.width)
                : "100%"
            const imageAlignment = ["left", "center", "right"].includes(
                String(node.attrs?.textAlign),
            )
                ? String(node.attrs?.textAlign)
                : "left"
            return (
                <img
                    key={key}
                    src={String(node.attrs?.src ?? "")}
                    alt={String(node.attrs?.alt ?? "")}
                    title={node.attrs?.title ? String(node.attrs.title) : undefined}
                    loading="lazy"
                    decoding="async"
                    style={{
                        width: imageWidth,
                        marginLeft:
                            imageAlignment === "center" || imageAlignment === "right" ? "auto" : 0,
                        marginRight:
                            imageAlignment === "center" || imageAlignment === "left" ? "auto" : 0,
                    }}
                />
            )
        }
        default:
            return <div key={key}>{children}</div>
    }
}

const ArticleBody = ({ content }: IProps) => (
    <div className="tiptap">{renderNode(content, "article-body")}</div>
)

export default ArticleBody
