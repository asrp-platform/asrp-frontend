"use client"

import styles from "@/app/(main)/about/directors-board/(components)/ViewCard/ui/styles.module.scss"
import { Button } from "antd"

interface IProps {
    onCancel?: () => void
    onSave?: () => void
    onDelete?: () => void
    editable: boolean
    canDelete?: boolean
}

const DetailViewEditButtons = ({
    onCancel,
    onSave,
    onDelete,
    editable,
    canDelete = true,
}: IProps) => {
    if (!editable && !canDelete) return null

    return (
        <div className={styles.buttonContainer}>
            <div className={styles.leftContainer}>
                {canDelete && (
                    <Button danger onClick={onDelete}>
                        Delete
                    </Button>
                )}
            </div>
            {editable && (
                <div className={styles.rightContainer}>
                    <Button htmlType={"button"} onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button type="primary" htmlType={"submit"} onClick={onSave}>
                        Save
                    </Button>
                </div>
            )}
        </div>
    )
}

export default DetailViewEditButtons
