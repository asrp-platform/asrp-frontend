"use client"


import type {IListBlock, IListItem} from "../../../entities/DirectorsBoardMember.ts";
import {type ChangeEvent, type MouseEvent} from "react";

import styles from "./styles.module.scss"


interface IProps {
    block: IListBlock;
    onChange: (block: IListBlock) => void;
    onDelete: (block: IListBlock) => void;
}





const ListEditor = ({block, onChange, onDelete}: IProps) => {

    const onDeleteBlock = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        onDelete(block);
    }

    const handleAddItem = () => {
        const newItem: IListItem = {id: crypto.randomUUID(), text: ''}
        onChange({...block, items: [...block.items, newItem]});
    }

    const handleItemChange = (event: ChangeEvent<HTMLInputElement>, updatedItem: IListItem) => {
        onChange({
            ...block,
            items: block.items.map(item =>
                item.id === updatedItem.id
                    ? { ...item, text: event.currentTarget.value }
                    : item
            ),
        });
    }

    const handleDeleteItem = (deletedItem: IListItem) => {
        onChange({
            ...block,
            items: block.items.filter((item) => deletedItem.id !== item.id)
        })
    }

    return (
        <div className={styles.listEditorContainer}>
            <div className={styles.listEditor}>
                <button
                    type="button"
                    className={styles.addItemButton}
                    onClick={handleAddItem}
                >
                    + item
                </button>
                <button
                    type="button"
                    className={styles.deleteButton}
                    onClick={onDeleteBlock}
                    aria-label="Delete heading"
                >
                    Delete List
                </button>
            </div>

            <div className={styles.listItemsContainer}>
                {block.items.map((item) =>
                    <div className={styles.listItemInputContainer}>
                        <input
                            className={styles.listItemInput}
                            onChange={(e) => handleItemChange(e, item)} value={item.text} key={item.id}
                            placeholder="List item..."
                        />
                        <button
                            type="button"
                            className={styles.deleteButton}
                            onClick={() => handleDeleteItem(item)}
                            aria-label="Delete heading"
                        >
                            ✕
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ListEditor;