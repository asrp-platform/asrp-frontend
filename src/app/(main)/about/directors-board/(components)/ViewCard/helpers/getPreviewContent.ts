export function getPreviewContent(content: any, maxBlocks: number) {
    if (!content?.content) return content

    const sliced = content.content.slice(0, maxBlocks).map((block: any) => ({
        ...block,
        content: block.content ? [...block.content] : block.content,
    }))

    const wasCut = content.content.length > maxBlocks

    if (wasCut && sliced.length > 0) {
        const lastBlock = sliced[sliced.length - 1]

        if (lastBlock.content) {
            const lastNode = lastBlock.content[lastBlock.content.length - 1]
            if (lastNode?.type !== "text" || lastNode.text !== "…") {
                lastBlock.content.push({ type: "text", text: "…" })
            }
        }
    }

    return {
        type: "doc",
        content: sliced,
    }
}
