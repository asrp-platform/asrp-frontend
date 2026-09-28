import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons"
import { Button, Flex, Form, Input } from "antd"

import styles from "./VirtualSlidesList.module.scss"

const VirtualSlidesList = () => (
    <Form.Item label="Virtual slides">
        <Form.List name="virtual_slides">
            {(fields, { add, remove }) => (
                <div className={styles.list}>
                    {fields.map((field, index) => (
                        <Flex key={field.key} gap={8} align="start">
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
                                type="text"
                                danger
                                icon={<MinusCircleOutlined />}
                                aria-label={`Remove virtual slide ${index + 1}`}
                                onClick={() => remove(field.name)}
                            />
                        </Flex>
                    ))}
                    <Button type="dashed" icon={<PlusOutlined />} onClick={() => add()}>
                        Add virtual slide
                    </Button>
                </div>
            )}
        </Form.List>
    </Form.Item>
)

export default VirtualSlidesList
