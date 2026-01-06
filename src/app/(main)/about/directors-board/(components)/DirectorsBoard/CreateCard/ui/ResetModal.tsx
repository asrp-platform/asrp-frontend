"use client"

import styles from "./UI.module.scss"
import {Modal, Button} from "antd";


interface IProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    resetForm: () => void;
}


const ResetModal = ({open, setOpen, resetForm}: IProps) => {



    return (
        <Modal
            open={open}
            title="Discard changes?"
            onCancel={() => setOpen(false)}
            getContainer={false}
            footer={[
                <div className={styles.buttonContainer}>
                    <Button
                        key="cancel"
                        onClick={() => setOpen(false)}
                        type={"primary"}
                    >
                        Cancel
                    </Button>
                    <Button
                        key="confirm"
                        onClick={() => {
                            setOpen(false);
                            resetForm();
                        }}
                        variant={"outlined"}
                        danger
                    >
                        Reset
                    </Button>
                </div>
            ]}
        >
            <p>
                You have unsaved changes. If you continue, all entered data will be
                permanently lost.
            </p>
        </Modal>
    );
};

export default ResetModal;