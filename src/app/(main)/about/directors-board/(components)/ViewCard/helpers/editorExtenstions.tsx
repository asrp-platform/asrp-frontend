import { TextStyleKit } from "@tiptap/extension-text-style"
import StarterKit from "@tiptap/starter-kit"
import TextAlign from "@tiptap/extension-text-align"
import { Highlight } from "@tiptap/extension-highlight"
import Image from "@tiptap/extension-image"

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

interface EditorExtensionOptions {
    image?: boolean
}

const NewsImage = Image.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            objectKey: {
                default: null,
                parseHTML: (element) => element.getAttribute("data-object-key"),
                renderHTML: (attributes) =>
                    attributes.objectKey ? { "data-object-key": attributes.objectKey } : {},
            },
            width: {
                default: "100%",
                parseHTML: (element) => element.getAttribute("data-width") || "100%",
                renderHTML: (attributes) => ({
                    "data-width": attributes.width,
                    style: `width: ${attributes.width}`,
                }),
            },
        }
    },
}).configure({
    inline: false,
    allowBase64: false,
    HTMLAttributes: { loading: "lazy", decoding: "async" },
})

export const createEditorExtensions = (
    headingLevels: HeadingLevel[],
    options: EditorExtensionOptions = {},
) => [
    TextStyleKit,
    StarterKit.configure({
        heading: { levels: headingLevels },
    }),
    TextAlign.configure({
        types: ["heading", "paragraph", "image"],
    }),
    Highlight,
    ...(options.image ? [NewsImage] : []),
]

export const detailViewExtensions = createEditorExtensions([3, 4, 5])
