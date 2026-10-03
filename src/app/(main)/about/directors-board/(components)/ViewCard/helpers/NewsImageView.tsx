import { NodeViewWrapper, type ReactNodeViewProps } from "@tiptap/react"

const NewsImageView = ({ node, editor, selected, updateAttributes }: ReactNodeViewProps) => {
    const width = ["50%", "75%", "100%"].includes(String(node.attrs.width))
        ? String(node.attrs.width)
        : "100%"
    const caption = String(node.attrs.caption ?? "")
    const imageAlignment = ["left", "center", "right"].includes(String(node.attrs.textAlign))
        ? String(node.attrs.textAlign)
        : "center"

    return (
        <NodeViewWrapper
            className="tiptapImageNode"
            data-selected={selected ? "true" : undefined}
            style={{
                width,
                marginLeft: imageAlignment === "left" ? 0 : "auto",
                marginRight: imageAlignment === "right" ? 0 : "auto",
            }}
        >
            <img
                src={String(node.attrs.src ?? "")}
                alt={String(node.attrs.alt ?? "")}
                title={node.attrs.title ? String(node.attrs.title) : undefined}
                loading="lazy"
                decoding="async"
                style={{
                    width: "100%",
                    margin: 0,
                }}
            />
            {editor.isEditable ? (
                <input
                    className="tiptapImageCaptionInput"
                    value={caption}
                    placeholder="Add image caption"
                    aria-label="Image caption"
                    maxLength={255}
                    onClick={(event) => event.stopPropagation()}
                    onChange={(event) => updateAttributes({ caption: event.target.value })}
                />
            ) : (
                caption && <figcaption className="tiptapImageCaption">{caption}</figcaption>
            )}
        </NodeViewWrapper>
    )
}

export default NewsImageView
