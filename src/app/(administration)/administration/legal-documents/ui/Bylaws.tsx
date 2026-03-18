import { useEffect, useState } from "react"
import { Card, Button, Upload, Typography, Space, message } from "antd"
import { UploadOutlined, EyeOutlined } from "@ant-design/icons"
import { BYLAWS_ADMIN_URL } from "../../../../../shared/backend/adminApiUrls.ts"
import api from "../../../../../axios.ts"
import { isAxiosError } from "axios"
import { BYLAWS_URL } from "../../../../../shared/backend/restApiUrls.ts"
import Loading from "../../../../(main)/about/directors-board/(components)/ViewCard/ui/Loading.tsx"

const { Text } = Typography

export const BylawsFileCard = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [isUploading, setIsUploading] = useState(false)
    const [bylawsFileExists, setBylawsFileExists] = useState<boolean>(false)

    useEffect(() => {
        const fetchBylaws = async () => {
            try {
                setIsLoading(true)
                const result = await api.get(BYLAWS_URL)
                console.log(result)
                setBylawsFileExists(result.data)
            } catch (error) {
                if (isAxiosError(error)) {
                    if (error.status === 404) {
                        setBylawsFileExists(false)
                    } else {
                        message.error(error.message)
                    }
                }
            } finally {
                setIsLoading(false)
            }
        }
        fetchBylaws()
    }, [])

    const deleteBylaws = async () => {
        try {
            setIsLoading(true)
            const result = await api.delete(BYLAWS_ADMIN_URL)
            setBylawsFileExists(result.data)
        } catch (error) {
            if (isAxiosError(error)) {
                message.error(error.message)
            }
        } finally {
            setIsLoading(false)
        }
    }

    const uploadBylaws = async (file: File) => {
        try {
            setIsUploading(true)

            const formData = new FormData()
            formData.append("file", file)

            await api.put(BYLAWS_ADMIN_URL, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })

            setBylawsFileExists(true)
        } catch (error) {
            if (isAxiosError(error)) {
                message.error(error.message)
            }
        } finally {
            setIsUploading(false)
        }
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <Card title="Bylaws">
            <Space orientation="vertical" size="middle" style={{ width: "100%" }}>
                <>
                    {bylawsFileExists ? (
                        <Text type="success">Bylaws exists</Text>
                    ) : (
                        <Text type="danger">Bylaws doesn't exists</Text>
                    )}

                    <Text type="success"></Text>

                    <Space>
                        {bylawsFileExists && (
                            <Button
                                icon={<EyeOutlined />}
                                onClick={() => window.open(BYLAWS_URL, "_blank")}
                            >
                                Open
                            </Button>
                        )}

                        <Upload
                            accept="application/pdf"
                            showUploadList={false}
                            beforeUpload={(file) => {
                                uploadBylaws(file)
                                return false
                            }}
                        >
                            <Button icon={<UploadOutlined />} loading={isUploading}>
                                {bylawsFileExists ? "Change Bylaws" : "Upload Bylaws"}
                            </Button>
                        </Upload>

                        {bylawsFileExists && (
                            <Button danger onClick={deleteBylaws}>
                                Delete
                            </Button>
                        )}
                    </Space>
                </>
            </Space>
        </Card>
    )
}
