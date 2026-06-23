import { useState } from "react"
import { Button, Form, Image, Input, Space, Upload } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import type { UploadProps } from "antd"

import type { SponsorFormValues } from "./types"

interface IProps {
    isSubmitting: boolean
    onSubmit: (values: SponsorFormValues, logoFile: File | null) => Promise<boolean>
}

const SponsorCreateForm = ({ isSubmitting, onSubmit }: IProps) => {
    const [form] = Form.useForm<SponsorFormValues>()
    const [selectedLogoFile, setSelectedLogoFile] = useState<File | null>(null)
    const [logoPreviewUrl, setLogoPreviewUrl] = useState<string | null>(null)

    const uploadProps: UploadProps = {
        accept: "image/*",
        maxCount: 1,
        showUploadList: false,
        beforeUpload: (file) => {
            setSelectedLogoFile(file)
            setLogoPreviewUrl(URL.createObjectURL(file))
            return false
        },
    }

    const handleFinish = async (values: SponsorFormValues) => {
        const isCreated = await onSubmit(values, selectedLogoFile)

        if (!isCreated) {
            return
        }

        form.resetFields()
        setSelectedLogoFile(null)
        setLogoPreviewUrl(null)
    }

    return (
        <Form form={form} layout="vertical" onFinish={handleFinish} disabled={isSubmitting}>
            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Enter sponsor name" }]}
            >
                <Input placeholder="Sponsor name" />
            </Form.Item>

            <Form.Item
                label="Link"
                name="link"
                rules={[
                    { required: true, message: "Enter sponsor link" },
                    { type: "url", message: "Enter a valid URL" },
                ]}
            >
                <Input placeholder="https://example.com" />
            </Form.Item>

            <Form.Item label="Short name" name="short_name">
                <Input placeholder="Optional" />
            </Form.Item>

            <Space align="center" wrap>
                <Upload {...uploadProps}>
                    <Button icon={<UploadOutlined />}>Choose logo</Button>
                </Upload>

                {logoPreviewUrl && (
                    <Image
                        src={logoPreviewUrl}
                        alt="Sponsor logo preview"
                        width={72}
                        height={48}
                        style={{ objectFit: "contain" }}
                    />
                )}

                <Button type="primary" htmlType="submit" loading={isSubmitting}>
                    Create sponsor
                </Button>
            </Space>
        </Form>
    )
}

export default SponsorCreateForm
