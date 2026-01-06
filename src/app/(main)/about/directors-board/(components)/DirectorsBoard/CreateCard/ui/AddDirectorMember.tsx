import styles from "./UI.module.scss"
import {CirclePlus} from "lucide-react";


interface IProps {
    setCreateMode: (newMode: boolean) => void;
}


const AddDirectorMember = ({setCreateMode}: IProps) => {
    return (
        <div
            className={styles.createCard}
            onClick={() => setCreateMode(true)}
        >
            <CirclePlus width={32} height={32} className={styles.addMemberIcon} />
        </div>
    );
};

export default AddDirectorMember;