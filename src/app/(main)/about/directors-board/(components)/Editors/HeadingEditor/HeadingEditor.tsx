"use client"

import type { MouseEvent, ChangeEvent } from "react";

import type {HeadingLevel, IHeadingBlock} from "../../../../../../../entities/DirectorsBoardMember.ts";
import styles from "./styles.module.scss"




interface IProps {
    block: IHeadingBlock;
    onChange: (block: IHeadingBlock) => void;
    onDelete: (block: IHeadingBlock) => void;
}


const HeadingEditor = ({ block, onChange, onDelete }: IProps) => {

    const onDeleteBlock = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        onDelete(block);
    }

    const onLevelChange = (event: ChangeEvent<HTMLSelectElement>, block: IHeadingBlock) => {
        onChange({...block, level: Number(event.target.value) as HeadingLevel});
    }

    return (
        <div className={styles.headingEditor}>
            <input
                type="text"
                value={block.text}
                className={styles.headingInput}
                onChange={e =>
                    onChange({ ...block, text: e.target.value })
                }
                placeholder="Heading text"
            />
            <select
                className={styles.levelSelect}
                value={block.level}
                onChange={(event) => onLevelChange(event, block)}
            >
                {[1,2,3,4,5].map((level) => (
                    <option key={level} value={level}>H{level}</option>
                ))}
            </select>

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

export default HeadingEditor;