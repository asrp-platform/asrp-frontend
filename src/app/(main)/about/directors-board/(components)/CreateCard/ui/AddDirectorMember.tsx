import styles from "@/app/(main)/about/directors-board/(components)/CreateCard/ui/UI.module.scss"
import { CirclePlus } from "lucide-react"

interface IProps {
    setCreateMode: (_newMode: boolean) => void
}

const AddDirectorMember = ({ setCreateMode }: IProps) => {
    return (
        <div className={styles.createCard} onClick={() => setCreateMode(true)}>
            <CirclePlus width={32} height={32} className={styles.addMemberIcon} />
        </div>
    )
}

export default AddDirectorMember
