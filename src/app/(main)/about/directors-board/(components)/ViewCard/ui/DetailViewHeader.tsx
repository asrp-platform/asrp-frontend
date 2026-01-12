"use client"

import {Form, Input, Typography} from "antd"
import type { IDirectorsBoardMember } from "../../../../../../../entities/DirectorsBoardMember.ts"
import styles from "./styles.module.scss"
import DetailViewTitle from "./DetailViewTitle.tsx";
import type {ReactNode} from "react";
import DetailViewEditButtons from "./DetailViewEditButtons.tsx";

const { Title } = Typography

interface Props {
    editable: boolean
    member: IDirectorsBoardMember
    role: string
    name: string
    onChangeRole: (value: string) => void
    onChangeName: (value: string) => void
    onFinish: () => void
    onCancel: () => void
    editor: ReactNode
}

const DetailViewHeader = ({
                              editable,
                              member,
                              role,
                              name,
                              onChangeRole,
                              onChangeName,
                              onFinish,
                              onCancel,
                              editor,
                          }: Props) => {

    const [form] = Form.useForm();

    if (!editable) {
        return (
            <>
                <DetailViewTitle member={member} />
                {editor}
            </>
            )
    }

    return (
        <div>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
            >
                <Form.Item
                    label="Role"
                    name="role"
                    rules={[{ required: true, message: "Please enter role" }]}
                    initialValue={role}
                >
                    <Input value={role} onChange={e => onChangeRole(e.target.value)} />
                </Form.Item>

                <Title level={3} className={styles.inputTitle}>
                    Name
                </Title>

                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: "Please enter name" }]}
                    initialValue={name}
                >
                    <Input value={name} onChange={e => onChangeName(e.target.value)} />
                </Form.Item>
                {editor}
                <DetailViewEditButtons editable={editable} onCancel={onCancel} onSave={onFinish}/>
            </Form>
        </div>
    )
}

export default DetailViewHeader
