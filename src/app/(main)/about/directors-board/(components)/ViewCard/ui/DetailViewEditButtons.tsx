"use client"

import styles from "@/app/(main)/about/directors-board/(components)/ViewCard/ui/styles.module.scss"
import { Button } from "antd"

interface IProps {
    onCancel?: () => void
    onSave?: () => void
    onDelete?: () => void
    editable: boolean
}

const DetailViewEditButtons = ({ onCancel, onSave, onDelete, editable }: IProps) => {
    if (!editable) return null

    return (
        <div className={styles.buttonContainer}>
            <div className={styles.leftContainer}>
                <Button danger onClick={onDelete}>
                    Delete
                </Button>
            </div>
            <div className={styles.rightContainer}>
                <Button htmlType={"button"} onClick={onCancel}>
                    Cancel
                </Button>
                <Button type="primary" htmlType={"submit"} onClick={onSave}>
                    Save
                </Button>
            </div>
        </div>
    )
}

export default DetailViewEditButtons
