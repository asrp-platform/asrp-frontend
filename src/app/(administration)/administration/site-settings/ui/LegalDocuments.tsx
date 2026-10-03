"use client"

import { EyeOutlined, UploadOutlined } from "@ant-design/icons"
import { Button, Card, Space, Typography, Upload, message } from "antd"
import { isAxiosError } from "axios"
import { useEffect, useMemo, useState } from "react"

import api from "@/axios.ts"
import { useCurrentUserPermissionsQuery } from "@shared/backend/queries/usePermissionsQuery.ts"
import { BYLAWS_URL, SUBMISSION_GUIDELINES_URL } from "@shared/backend/restApiUrls/restApiUrls.ts"
import {
    BYLAWS_ADMIN_URL,
    SUBMISSION_GUIDELINES_ADMIN_URL,
} from "@shared/backend/restApiUrls/adminApiUrls.ts"

import Loading from "@app/(main)/about/directors-board/(components)/ViewCard/ui/Loading.tsx"

import styles from "./LegalDocuments.module.scss"

type DocumentKey = "bylaws" | "submissionGuidelines"

interface DocumentConfig {
    key: DocumentKey
    title: string
    publicUrl: string
    adminUrl: string
}

interface LegalDocumentResponse {
    url: string
}

const DOCUMENTS: DocumentConfig[] = [
    {
        key: "bylaws",
        title: "Bylaws",
        publicUrl: BYLAWS_URL,
        adminUrl: BYLAWS_ADMIN_URL,
    },
    {
        key: "submissionGuidelines",
        title: "Submission Guidelines",
        publicUrl: SUBMISSION_GUIDELINES_URL,
        adminUrl: SUBMISSION_GUIDELINES_ADMIN_URL,
    },
]

const LegalDocuments = () => {
    const { data: permissions = [] } = useCurrentUserPermissionsQuery()
    const [isLoading, setIsLoading] = useState(true)
    const [busyDocument, setBusyDocument] = useState<DocumentKey | null>(null)
    const [documentUrls, setDocumentUrls] = useState<Record<DocumentKey, string | null>>({
        bylaws: null,
        submissionGuidelines: null,
    })

    const permissionsActions = useMemo(
        () => permissions.map((permission) => permission.action),
        [permissions],
    )
    const canUpdate = permissionsActions.includes("legal_documents.update")
    const canDelete = permissionsActions.includes("legal_documents.delete")

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const results = await Promise.all(
                    DOCUMENTS.map(async (document) => {
                        try {
                            const response = await api.get<LegalDocumentResponse>(
                                document.publicUrl,
                            )
                            return [document.key, response.data.url] as const
                        } catch (error) {
                            if (isAxiosError(error) && error.response?.status === 404) {
                                return [document.key, null] as const
                            }

                            throw error
                        }
                    }),
                )

                setDocumentUrls(Object.fromEntries(results) as Record<DocumentKey, string | null>)
            } catch (error) {
                message.error(isAxiosError(error) ? error.message : "Unable to load documents")
            } finally {
                setIsLoading(false)
            }
        }

        void fetchDocuments()
    }, [])

    const uploadDocument = async (document: DocumentConfig, file: File) => {
        try {
            setBusyDocument(document.key)
            const formData = new FormData()
            formData.append("file", file)

            const response = await api.put<LegalDocumentResponse>(document.adminUrl, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })

            setDocumentUrls((current) => ({ ...current, [document.key]: response.data.url }))
            message.success(`${document.title} uploaded`)
        } catch (error) {
            message.error(
                isAxiosError(error) ? error.message : `Unable to upload ${document.title}`,
            )
        } finally {
            setBusyDocument(null)
        }
    }

    const deleteDocument = async (document: DocumentConfig) => {
        try {
            setBusyDocument(document.key)
            await api.delete(document.adminUrl)
            setDocumentUrls((current) => ({ ...current, [document.key]: null }))
            message.success(`${document.title} deleted`)
        } catch (error) {
            message.error(
                isAxiosError(error) ? error.message : `Unable to delete ${document.title}`,
            )
        } finally {
            setBusyDocument(null)
        }
    }

    if (isLoading) return <Loading />

    return (
        <Card title="Legal documents">
            <div className={styles.documents}>
                {DOCUMENTS.map((document) => {
                    const documentUrl = documentUrls[document.key]
                    const isBusy = busyDocument === document.key

                    return (
                        <div className={styles.documentRow} key={document.key}>
                            <div className={styles.documentInfo}>
                                <Typography.Title level={5}>{document.title}</Typography.Title>
                                <Typography.Text type={documentUrl ? "success" : "danger"}>
                                    {documentUrl ? "Document exists" : "Document is not uploaded"}
                                </Typography.Text>
                            </div>

                            <Space wrap>
                                {documentUrl && (
                                    <Button
                                        icon={<EyeOutlined />}
                                        onClick={() => window.open(documentUrl, "_blank")}
                                    >
                                        Open
                                    </Button>
                                )}

                                {canUpdate && (
                                    <Upload
                                        accept="application/pdf"
                                        showUploadList={false}
                                        beforeUpload={(file) => {
                                            void uploadDocument(document, file)
                                            return false
                                        }}
                                    >
                                        <Button icon={<UploadOutlined />} loading={isBusy}>
                                            {documentUrl ? "Replace PDF" : "Upload PDF"}
                                        </Button>
                                    </Upload>
                                )}

                                {documentUrl && canDelete && (
                                    <Button
                                        danger
                                        loading={isBusy}
                                        onClick={() => void deleteDocument(document)}
                                    >
                                        Delete
                                    </Button>
                                )}
                            </Space>
                        </div>
                    )
                })}
            </div>
        </Card>
    )
}

export default LegalDocuments
