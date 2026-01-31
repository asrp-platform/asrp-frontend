import styles from "./styles.module.scss"
import { Checkbox, type CheckboxChangeEvent } from "antd"

interface IProps {
    future_committee_working_checked: boolean
    future_leadership_positions_checked: boolean
    setChecked: (_event: CheckboxChangeEvent, _fieldName: string) => void
}

const LeadershipAndCommitteesSection = ({
    setChecked,
    future_committee_working_checked,
    future_leadership_positions_checked,
}: IProps) => {
    return (
        <div className={styles.intentionGridColumn}>
            <h3>Future leadership & committee roles</h3>
            <div className={styles.intentionCheckboxContainer}>
                <Checkbox
                    className={styles.intentionCheckbox}
                    value="future_committee_working"
                    checked={future_committee_working_checked}
                    onChange={(e) => setChecked(e, "future_committee_working")}
                />

                <span>
                    I would like to be considered for future committee or working group roles as
                    ASRP grows.
                </span>
            </div>
            <div className={styles.intentionCheckboxContainer}>
                <Checkbox
                    className={styles.intentionCheckbox}
                    value="future_leadership_positions"
                    checked={future_leadership_positions_checked}
                    onChange={(e) => setChecked(e, "future_leadership_positions")}
                />
                <span>
                    I may be interested in future leadership positions (for example, committee
                    chair, taskforce lead, or board role).
                </span>
            </div>
        </div>
    )
}

export default LeadershipAndCommitteesSection
