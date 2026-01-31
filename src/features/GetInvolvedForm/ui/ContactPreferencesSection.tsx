import styles from "./styles.module.scss"
import { Checkbox, type CheckboxChangeEvent } from "antd"

interface ContactPreferencesSectionProps {
    checked: boolean
    setChecked: (_event: CheckboxChangeEvent, _fieldName: string) => void
}

const ContactPreferencesSection = ({ checked, setChecked }: ContactPreferencesSectionProps) => {
    return (
        <div className={styles.intentionGridColumn}>
            <h3>Contact preferences</h3>

            <p>
                By submitting this form, you agree that ASRP may contact you by email regarding
                volunteer opportunities, events, and society updates.
            </p>

            <div className={styles.intentionCheckboxContainer}>
                <Checkbox
                    className={styles.intentionCheckbox}
                    checked={checked}
                    onChange={(e) => setChecked(e, "receive_updates")}
                />
                <span>
                    I would also like to receive occasional updates about ASRP news, meetings, and
                    educational programs.
                </span>
            </div>
        </div>
    )
}

export default ContactPreferencesSection
