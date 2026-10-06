import LinkButton from "@shared/ui/Buttons/LinkButton.tsx"
import styles from "@features/MembershipApplicationForm/ui/AuthenticationRequiredWarning/AuthenticationRequiredWarning.module.scss"
import { Alert } from "antd"
import { ExclamationCircleOutlined } from "@ant-design/icons"

const Description = () => (
    <div className={styles.warningContent}>
        <p>
            To complete your membership application, please sign in to your account.
            <br />
            Once signed in, you’ll be able to fill out the form and proceed with your application.
        </p>
        <LinkButton href="/login" variant="default">
            Sign Up
        </LinkButton>
    </div>
)

const AuthenticationRequiredWarning = () => {
    return (
        <div className={styles.container}>
            <Alert
                icon={<ExclamationCircleOutlined />}
                title="Authentication required"
                description={<Description />}
                type="warning"
                showIcon
                className={styles.alert}
            />
        </div>
    )
}

export default AuthenticationRequiredWarning
