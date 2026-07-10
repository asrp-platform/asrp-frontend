import { Form, Input, Select } from "antd"
import styles from "@app/(auth)/registration/styles.module.scss"
import type { RegisterFormFields } from "@app/(auth)/registration/(ui)/types.ts"
import { credentialsOptions } from "@shared/options.ts"

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

            <Form.Item label="Credentials" name="credentials">
                <Select mode={"multiple"} allowClear placeholder="Select an option">
                    {credentialsOptions.map((c) => (
                        <Select.Option key={c} value={c}>
                            {c}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
        </>
    )
}

export default AccountCredentialsSection
