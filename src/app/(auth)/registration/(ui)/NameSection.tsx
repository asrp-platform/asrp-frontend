import { Form, Input } from "antd"
import styles from "@app/(auth)/registration/styles.module.scss"
import type { RegisterFormFields } from "@app/(auth)/registration/(ui)/types.ts"

const NameSection = () => {
    return (
        <section className={styles.formSection}>
            <div className={styles.sectionHeading}>
                <h2>Name</h2>
                <p>Tell us how we should address you.</p>
            </div>
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
        </section>
    )
}

export default NameSection
