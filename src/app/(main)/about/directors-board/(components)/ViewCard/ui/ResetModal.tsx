"use client"

import styles from "@/app/(main)/about/directors-board/(components)/ViewCard/ui/styles.module.scss"
import { Modal, Button } from "antd"

interface IProps {
    open: boolean
    setOpen: (_open: boolean) => void
    onReset: () => void
}

const ResetModal = ({ open, setOpen, onReset }: IProps) => {
    return (
        <Modal
            open={open}
            title="Discard changes?"
            onCancel={() => setOpen(false)}
            getContainer={false}
            centered={true}
            footer={[
                <div className={styles.buttonContainer}>
                    <Button key="cancel" onClick={() => setOpen(false)} type={"primary"}>
                        Cancel
                    </Button>
                    <Button
                        key="confirm"
                        onClick={() => {
                            setOpen(false)
                            onReset()
                        }}
                        variant={"outlined"}
                        danger
                    >
                        Reset
                    </Button>
                </div>,
            ]}
        >
            <p>
                You have unsaved changes. If you continue, all entered data will be permanently
                lost.
            </p>
        </Modal>
    )
}

export default ResetModal
