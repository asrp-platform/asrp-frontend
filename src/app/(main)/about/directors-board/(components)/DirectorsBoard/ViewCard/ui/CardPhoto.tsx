import styles from "../styles.module.scss";
import type {IDirectorsBoardMember} from "../../../../../../../../entities/DirectorsBoardMember.ts";


interface IProps {
    member: IDirectorsBoardMember;
}


const CardPhoto = ({member}: IProps) => {
    return (
        <div className={styles.photoContainer}>
            <div className={styles.photoInnerContainer}>
                {member.photo_url && <img src={member.photo_url} alt="" />}
            </div>
        </div>
    );
};

export default CardPhoto;