import { useEffect, useMemo, useState } from "react"
import { Card, Button, Upload, Typography, Space, message } from "antd"
import { UploadOutlined, EyeOutlined } from "@ant-design/icons"
import { BYLAWS_ADMIN_URL } from "@shared/backend/restApiUrls/adminApiUrls.ts"
import api from "@/axios.ts"
import { isAxiosError } from "axios"
import { BYLAWS_URL } from "@shared/backend/restApiUrls/restApiUrls.ts"
import Loading from "@/app/(main)/about/directors-board/(components)/ViewCard/ui/Loading.tsx"
import { useCurrentUserPermissionsQuery } from "@shared/backend/queries/usePermissionsQuery.ts"

const { Text } = Typography

export const BylawsFileCard = () => {
    const { data: permissions = [] } = useCurrentUserPermissionsQuery()

    const [isLoading, setIsLoading] = useState(true)
    const [isUploading, setIsUploading] = useState(false)
    const [bylawsUrl, setBylawsUrl] = useState<string | null>(null)

    const permissionsActions = useMemo(() => {
        return permissions.map((p) => p.action)
    }, [permissions])

    const canUpdate = permissionsActions.includes("legal_documents.update")
    const canDelete = permissionsActions.includes("legal_documents.delete")

    useEffect(() => {
        const fetchBylaws = async () => {
            try {
                setIsLoading(true)
                const result = await api.get(BYLAWS_URL)
                setBylawsUrl(result.data.url)
            } catch (error) {
                if (isAxiosError(error)) {
                    if (error.status === 404) {
                        setBylawsUrl(null)
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
            await api.delete(BYLAWS_ADMIN_URL)
            setBylawsUrl(null)
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

            const response = await api.put(BYLAWS_ADMIN_URL, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            setBylawsUrl(response.data.url)
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
                    {bylawsUrl ? (
                        <Text type="success">Bylaws exists</Text>
                    ) : (
                        <Text type="danger">Bylaws doesn't exists</Text>
                    )}

                    <Text type="success"></Text>

                    <Space>
                        {bylawsUrl && (
                            <Button
                                icon={<EyeOutlined />}
                                onClick={() => window.open(bylawsUrl, "_blank")}
                            >
                                Open
                            </Button>
                        )}

                        {canUpdate && (
                            <Upload
                                accept="application/pdf"
                                showUploadList={false}
                                beforeUpload={(file) => {
                                    uploadBylaws(file)
                                    return false
                                }}
                            >
                                <Button icon={<UploadOutlined />} loading={isUploading}>
                                    {bylawsUrl ? "Change Bylaws" : "Upload Bylaws"}
                                </Button>
                            </Upload>
                        )}

                        {bylawsUrl && canDelete && (
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
