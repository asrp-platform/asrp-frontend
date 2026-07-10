import { Form, Input } from "antd"
import styles from "@app/(auth)/registration/styles.module.scss"
import type { RegisterFormFields } from "@app/(auth)/registration/(ui)/types.ts"

const NameSection = () => {
    return (
        <>
            <h2>Name</h2>
            <div className={styles.twoFieldContainer}>
                <Form.Item<RegisterFormFields>
                    label="First name"
                    name="firstname"
                    rules={[{ required: true, message: "Please enter your name" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<RegisterFormFields>
                    label="Last name"
                    name="lastname"
                    rules={[{ required: true, message: "Please enter your lastname" }]}
                >
                    <Input />
                </Form.Item>
            </div>
        </>
    )
}

export default NameSection
