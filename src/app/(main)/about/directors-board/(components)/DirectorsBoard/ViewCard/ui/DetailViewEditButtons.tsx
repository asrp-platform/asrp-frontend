"use client"

import styles from "./styles.module.scss";
import {Button} from "antd";


interface IProps {
    onCancel?: () => void;
    onSave?: () => void;
    editable: boolean;
}


const DetailViewEditButtons = ({onCancel, onSave, editable}: IProps) => {

    if (!editable) return null;

    return (
        <div className={styles.buttonContainer}>
            <Button htmlType={"button"} onClick={onCancel}>
                Cancel
            </Button>
            <Button type="primary" htmlType={"submit"} onClick={onSave}>
                Save
            </Button>
        </div>
    );
};

export default DetailViewEditButtons;