"use client"

import { Button, Popconfirm, message } from "antd"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import api from "@/axios"
import { getAdminContactMessageManualResponseUrl } from "@shared/backend/restApiUrls/adminApiUrls"
import { ADMIN_ATTENTION_QUERY_KEY } from "@shared/backend/queries/useAdminAttentionQuery"
import { handleApiError } from "@shared/helpers/formsHelpers"

type Props = { messageId: number; disabled?: boolean; onAnswered: () => void }

const ContactMessageManualResponseButton = ({ messageId, disabled, onAnswered }: Props) => {
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: () => api.post(getAdminContactMessageManualResponseUrl(messageId)),
        onSuccess: () => {
            onAnswered()
            queryClient.invalidateQueries({ queryKey: ADMIN_ATTENTION_QUERY_KEY })
            message.success("Marked as responded manually. No email was sent.")
        },
        onError: (error) => handleApiError({ error }),
    })

    return (
        <Popconfirm
            title="Mark as responded manually?"
            description="Confirm that you have already replied outside ASRP. This will not send an email."
            okText="Mark as responded"
            disabled={disabled || mutation.isPending}
            onConfirm={() => mutation.mutateAsync()}
            okButtonProps={{ loading: mutation.isPending }}
        >
            <Button
                size="small"
                disabled={disabled || mutation.isPending}
                loading={mutation.isPending}
            >
                Responded manually
            </Button>
        </Popconfirm>
    )
}

export default ContactMessageManualResponseButton
