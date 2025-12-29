"use client"



import styles from "./styles.module.scss"
import type {ContentBlock, IContent} from "../../../../../../entities/DirectorsBoardMember.ts";
import HeadingEditor from "./HeadingEditor/HeadingEditor.tsx";


interface IProps {
    value: IContent;
    onChange: (content: IContent) => void;
}


const ContentEditor = ({value, onChange}: IProps ) => {


    const addBlock = (block: ContentBlock) => {
        onChange({
            blocks: [...value.blocks, block],
        })
    }

    const deleteBlock = (block: ContentBlock) => {
        onChange({
            blocks: [...value.blocks.filter((item) => item.id !== block.id)],
        })
    }

    const updateBlock = (updated: ContentBlock) => {
        onChange({
            blocks: value.blocks.map(item => item.id === updated.id ? updated : item),
        })
    }


    return (
        <div className={styles.editorContainer}>
            <div className={styles.buttonContainer}>
                <button
                    className={styles.addBlockButton}
                    onClick={(event) => {
                        event.preventDefault()
                        addBlock({
                        id: crypto.randomUUID(),
                        type: "heading",
                        level: 2,
                        text: ""
                    })}
                }
                >
                    + Heading
                </button>
            </div>

            {value.blocks.map((block) => {
                switch (block.type) {
                    case "heading":
                        return <HeadingEditor key={block.id} block={block} onChange={updateBlock} onDelete={deleteBlock} />
                    case "paragraph":
                        return null
                }
            })}
        </div>
    );
};

export default ContentEditor;