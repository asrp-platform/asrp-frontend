import { TextStyleKit } from "@tiptap/extension-text-style"
import StarterKit from "@tiptap/starter-kit"
import TextAlign from "@tiptap/extension-text-align"
import { Highlight } from "@tiptap/extension-highlight"

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

export const createEditorExtensions = (headingLevels: HeadingLevel[]) => [
    TextStyleKit,
    StarterKit.configure({
        heading: { levels: headingLevels },
    }),
    TextAlign.configure({
        types: ["heading", "paragraph", "image"],
    }),
    Highlight,
]

export const detailViewExtensions = createEditorExtensions([3, 4, 5])
