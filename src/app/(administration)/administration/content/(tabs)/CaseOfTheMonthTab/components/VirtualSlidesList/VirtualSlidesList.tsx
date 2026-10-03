import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons"
import { Button, Form, Input } from "antd"

import styles from "./VirtualSlidesList.module.scss"

const VirtualSlidesList = () => (
    <Form.Item label="Virtual slides">
        <Form.List name="virtual_slides">
            {(fields, { add, remove }) => (
                <div className={styles.list}>
                    {fields.map((field, index) => (
                        <div key={field.key} className={styles.row}>
                            <Form.Item
                                {...field}
                                className={styles.item}
                                rules={[
                                    {
                                        required: true,
                                        whitespace: true,
                                        message: "Enter a virtual slide",
                                    },
                                ]}
                            >
                                <Input placeholder={`Virtual slide ${index + 1}`} />
                            </Form.Item>
                            <Button
                                className={styles.removeButton}
                                type="text"
                                danger
                                icon={<MinusCircleOutlined />}
                                aria-label={`Remove virtual slide ${index + 1}`}
                                onClick={() => remove(field.name)}
                            />
                        </div>
                    ))}
                    <div className={styles.actions}>
                        <Button type="dashed" icon={<PlusOutlined />} onClick={() => add()}>
                            Add virtual slide
                        </Button>
                    </div>
                </div>
            )}
        </Form.List>
    </Form.Item>
)

export default VirtualSlidesList
