import { Form, Input } from "antd"
import styles from "@app/(auth)/registration/styles.module.scss"
import type { RegisterFormFields } from "@app/(auth)/registration/(ui)/types.ts"

const AccountCredentialsSection = () => {
    return (
        <>
            <h2>Credentials</h2>
            <Form.Item<RegisterFormFields>
                label="Email"
                name="email"
                rules={[{ required: true, message: "Please enter your email" }]}
                className={styles.emailInput}
            >
                <Input />
            </Form.Item>

            <div className={styles.twoFieldContainer}>
                <Form.Item<RegisterFormFields>
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: "Please enter your password" }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item<RegisterFormFields>
                    label="Repeat password"
                    name="repeat_password"
                    dependencies={["password"]}
                    rules={[
                        { required: true, message: "Please repeat your password" },
                        ({ getFieldValue }) => ({
                            validator(_, value: string | undefined) {
                                if (!value || getFieldValue("password") === value) {
                                    return Promise.resolve()
                                }

                                return Promise.reject(new Error("Passwords do not match"))
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
            </div>
        </>
    )
}

export default AccountCredentialsSection
