import { TextStyleKit } from "@tiptap/extension-text-style"
import StarterKit from "@tiptap/starter-kit"
import TextAlign from "@tiptap/extension-text-align"
import { Highlight } from "@tiptap/extension-highlight"




export const detailViewExtensions = [
    TextStyleKit,
    StarterKit.configure({
        heading: { levels: [1, 2, 3] },
    }),
    TextAlign.configure({
        types: ["heading", "paragraph", "image"],
    }),
    Highlight,
]