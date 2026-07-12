import { Alert, Button, Result, Typography } from "antd"
import ResendEmailConfirmationButton from "@features/ResendEmailConfirmation/ResendEmailConfirmationButton.tsx"
import styles from "@app/(auth)/registration/styles.module.scss"

const { Paragraph, Text } = Typography

interface IProps {
    registrationEmail: string
    resendMessage: string | null
    resendStatus: "success" | "error"
    onBackToLogin: () => void
    onHome: () => void
    onResendSuccess: (_message: string) => void
    onResendError: (_message: string) => void
}

const RegistrationSuccess = ({
    registrationEmail,
    resendMessage,
    resendStatus,
    onBackToLogin,
    onHome,
    onResendSuccess,
    onResendError,
}: IProps) => {
    return (
        <div className={styles.registrationSuccessContainer}>
            <Result
                status="success"
                title="Check your email"
                subTitle={
                    <div className={styles.confirmationMessage}>
                        <Paragraph>
                            We sent a confirmation link to <Text strong>{registrationEmail}</Text>.
                        </Paragraph>
                        <Paragraph>
                            To complete your registration, open the email and follow the
                            confirmation link.
                        </Paragraph>
                        {resendMessage && (
                            <Alert
                                type={resendStatus}
                                title={resendMessage}
                                showIcon
                                className={styles.resendAlert}
                            />
                        )}
                    </div>
                }
                extra={[
                    <ResendEmailConfirmationButton
                        key="resend"
                        email={registrationEmail}
                        onSuccess={onResendSuccess}
                        onError={onResendError}
                    />,
                    <Button type="primary" key="login" onClick={onBackToLogin}>
                        Back to login
                    </Button>,
                    <Button key="home" onClick={onHome}>
                        Home
                    </Button>,
                ]}
            />
        </div>
    )
}

export default RegistrationSuccess
