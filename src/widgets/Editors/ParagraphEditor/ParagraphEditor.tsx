"use client"

import type {IParagraphBlock} from "../../../entities/DirectorsBoardMember.ts";
import type {MouseEvent} from "react";
import styles from "./styles.module.scss"

interface IProps {
    block: IParagraphBlock;
    onChange: (block: IParagraphBlock) => void;
    onDelete: (block: IParagraphBlock) => void;
}


const ParagraphEditor = ({ block, onChange, onDelete }: IProps) => {

    const onDeleteBlock = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        onDelete(block);
    }

    return (
        <div className={styles.paragraphEditor}>
            <input
                type="text"
                value={block.text}
                className={styles.paragraphInput}
                onChange={e =>
                    onChange({ ...block, text: e.target.value })
                }
                placeholder="Paragraph..."
            />
            <button
                type="button"
                className={styles.deleteButton}
                onClick={onDeleteBlock}
                aria-label="Delete heading"
            >
                ✕
            </button>
        </div>
    );
};

export default ParagraphEditor;