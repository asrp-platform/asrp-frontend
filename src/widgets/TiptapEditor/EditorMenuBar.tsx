import { type Editor, useEditorState } from "@tiptap/react"


import {
    AlignCenter,
    AlignLeft,
    AlignRight,
    Bold,
    Code,
    Heading3,
    Highlighter,
    Italic,
    List,
    ListOrdered,
    Strikethrough,
    Undo,
    Redo,
    SeparatorHorizontal,
    CornerDownLeft,
    Link, Heading4, Heading5,
} from "lucide-react"
import { Button } from "antd"


interface IProps {
    editor: Editor
    show?: boolean
}


const EditorMenuBar = ({ editor, show = true }: IProps) => {
    // Read the current editor's state, and re-render the component when it changes
    const editorState = useEditorState({
        editor,
        selector: (ctx) => {
            return {
                isBold: ctx.editor.isActive("bold") ?? false,
                canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
                isItalic: ctx.editor.isActive("italic") ?? false,
                canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
                isStrike: ctx.editor.isActive("strike") ?? false,
                canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
                isCode: ctx.editor.isActive("code") ?? false,
                canCode: ctx.editor.can().chain().toggleCode().run() ?? false,
                canClearMarks: ctx.editor.can().chain().unsetAllMarks().run() ?? false,
                isParagraph: ctx.editor.isActive("paragraph") ?? false,
                isHeading1: ctx.editor.isActive("heading", { level: 1 }) ?? false,
                isHeading2: ctx.editor.isActive("heading", { level: 2 }) ?? false,
                isHeading3: ctx.editor.isActive("heading", { level: 3 }) ?? false,
                isHeading4: ctx.editor.isActive("heading", { level: 4 }) ?? false,
                isHeading5: ctx.editor.isActive("heading", { level: 5 }) ?? false,
                isHeading6: ctx.editor.isActive("heading", { level: 6 }) ?? false,
                isBulletList: ctx.editor.isActive("bulletList") ?? false,
                isOrderedList: ctx.editor.isActive("orderedList") ?? false,
                isCodeBlock: ctx.editor.isActive("codeBlock") ?? false,
                isBlockquote: ctx.editor.isActive("blockquote") ?? false,
                canUndo: ctx.editor.can().chain().undo().run() ?? false,
                canRedo: ctx.editor.can().chain().redo().run() ?? false,
                isAlignLeft: ctx.editor.isActive({ textAlign: "left" }),
                isAlignCenter: ctx.editor.isActive({ textAlign: "center" }),
                isAlignRight: ctx.editor.isActive({ textAlign: "right" }),
                canAlign: ctx.editor.can().chain().setTextAlign("center").run(),
                isHighlight: ctx.editor.isActive("highlight") ?? false,
                isLink: ctx.editor.isActive("link") ?? false,
            }
        },
    })

    const options = [

        {
            icon: <Heading3 width={18} />,
            onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
            pressed: editorState.isHeading3,
            disabled: false,
        },
        {
            icon: <Heading4 width={18} />,
            onClick: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
            pressed: editorState.isHeading4,
            disabled: false,
        },
        {
            icon: <Heading5 width={18} />,
            onClick: () => editor.chain().focus().toggleHeading({ level: 5 }).run(),
            pressed: editorState.isHeading5,
            disabled: false,
        },
        {
            icon: <Bold width={18} />,
            onClick: () => editor.chain().focus().toggleBold().run(),
            pressed: editorState.isBold,
            disabled: !editorState.canBold,
        },
        {
            icon: <Italic width={18} />,
            onClick: () => editor.chain().focus().toggleItalic().run(),
            pressed: editorState.isItalic,
            disabled: !editorState.canItalic,
        },
        {
            icon: <AlignLeft width={18} />,
            onClick: () => editor.chain().focus().setTextAlign("left").run(),
            pressed: editorState.isAlignLeft,
            // disabled: !editorState.canAlign,
            disabled: false,
        },
        {
            icon: <AlignCenter width={18} />,
            onClick: () => editor.chain().focus().setTextAlign("center").run(),
            pressed: editorState.isAlignCenter,
            // disabled: !editorState.canAlign,
            disabled: false,
        },
        {
            icon: <AlignRight width={18} />,
            onClick: () => editor.chain().focus().setTextAlign("right").run(),
            pressed: editorState.isAlignRight,
            // disabled: !editorState.canAlign,
            disabled: false,
        },
        {
            icon: <Strikethrough width={18} />,
            onClick: () => editor.chain().focus().toggleStrike().run(),
            pressed: editorState.isStrike,
            disabled: !editorState.canStrike,
        },
        {
            icon: <List width={18} />,
            onClick: () => editor.chain().focus().toggleBulletList().run(),
            pressed: editorState.isBulletList,
            disabled: false,
        },
        {
            icon: <ListOrdered width={18} />,
            onClick: () => editor.chain().focus().toggleOrderedList().run(),
            pressed: editorState.isOrderedList,
            disabled: false,
        },
        {
            icon: <Highlighter width={18} />,
            onClick: () => editor.chain().focus().toggleHighlight().run(),
            pressed: editorState.isHighlight,
            disabled: false,
        },
        {
            icon: <Code width={18} />,
            onClick: () => editor.chain().focus().toggleCode().run(),
            pressed: editorState.isCode,
            disabled: !editorState.canCode,
        },
        {
            icon: <SeparatorHorizontal width={18} />,
            onClick: () => editor.chain().focus().setHorizontalRule().run(),
            pressed: false,
            disabled: false,
        },
        {
            icon: <CornerDownLeft width={18} />,
            onClick: () => editor.chain().focus().setHardBreak().run(),
            pressed: false,
            disabled: false,
        },
        {
            icon: <Undo width={18} />,
            onClick: () => editor.chain().focus().undo().run(),
            pressed: false,
            disabled: !editorState.canUndo,
        },
        {
            icon: <Redo width={18} />,
            onClick: () => editor.chain().focus().redo().run(),
            pressed: false,
            disabled: !editorState.canRedo,
        },
        {
            icon: <Link width={18} />,
            onClick: () => {
                const url = prompt("Enter URL")
                if (url) {
                    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run()
                }
            },
            pressed: editorState.isLink,
            disabled: false,
        },
    ]


    if (!show) {
        return null
    }

    return (
        <div className="control-group">
            <div className="button-group">
                {options.map((option, index) => (
                    <Button
                        key={index}
                        type={option.pressed ? "primary" : "default"}
                        onClick={option.onClick}
                        className="editorMenuButton"
                        disabled={option.disabled}
                    >
                        {option.icon}
                    </Button>
                ))}
            </div>
        </div>
    )
}

export default EditorMenuBar