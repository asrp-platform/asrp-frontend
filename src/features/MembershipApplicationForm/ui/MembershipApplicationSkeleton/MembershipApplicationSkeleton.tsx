import { Skeleton } from "antd"
import styles from "./MembershipApplicationSkeleton.module.scss"
import formStyles from "../../styles.module.scss"
import FormFieldsGrid from "../FormFieldsGrid/FormFieldsGrid"
const Heading = () => <Skeleton.Input active className={styles.heading} />
const Field = () => (
    <div className={styles.field}>
        <Skeleton.Input active size="small" className={styles.label} />
        <Skeleton.Input active block />
    </div>
)
const MembershipApplicationSkeleton = () => (
    <div
        className={styles.skeleton}
        role="status"
        aria-label="Loading membership application"
        aria-busy="true"
    >
        <div aria-hidden="true">
            <Heading />
            <Skeleton active title={false} paragraph={{ rows: 3 }} />
            <FormFieldsGrid>
                {Array.from({ length: 4 }, (_, i) => (
                    <Field key={i} />
                ))}
            </FormFieldsGrid>
            <Heading />
            <Skeleton active title={false} paragraph={{ rows: 2 }} />
            <Skeleton.Input active className={styles.label} />
            <Heading />
            <div className={formStyles.membershipCardsGrid}>
                {Array.from({ length: 4 }, (_, i) => (
                    <div className={styles.card} key={i}>
                        <Skeleton active paragraph={{ rows: 2 }} />
                    </div>
                ))}
            </div>
            <Heading />
            <FormFieldsGrid>
                <Field />
                <Field />
            </FormFieldsGrid>
            <Skeleton.Input active block className={styles.textarea} />
            <Heading />
            <Skeleton active title={false} paragraph={{ rows: 4 }} />
            <div className={formStyles.buttonContainer}>
                <Skeleton active title={false} paragraph={{ rows: 2 }} />
                <div className={formStyles.submitButtonContainer}>
                    <Skeleton.Button active size="large" />
                </div>
            </div>
        </div>
    </div>
)
export default MembershipApplicationSkeleton
