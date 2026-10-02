import { PlusOutlined } from "@ant-design/icons"
import { Button, Card, Empty, Flex, Spin, Tag } from "antd"

import type { CaseTag } from "@entities/CaseOfTheMonth.ts"

import styles from "../../CaseOfTheMonth.module.scss"

interface IProps {
    tags: CaseTag[]
    loading: boolean
    onAddTag: () => void
    onEditTag: (tag: CaseTag) => void
    canCreate: boolean
    canUpdate: boolean
}

const CaseTagsCard = ({ tags, loading, onAddTag, onEditTag, canCreate, canUpdate }: IProps) => (
    <Card
        className={styles.tagsCard}
        title="Case tags"
        extra={
            canCreate && (
                <Button type="primary" icon={<PlusOutlined />} onClick={onAddTag}>
                    Add tag
                </Button>
            )
        }
    >
        <Spin spinning={loading}>
            {tags.length ? (
                <Flex gap={8} wrap="wrap">
                    {tags.map((tag) => (
                        <Tag
                            key={tag.id}
                            role="button"
                            tabIndex={0}
                            style={{ cursor: "pointer" }}
                            onClick={() => canUpdate && onEditTag(tag)}
                            onKeyDown={(event) => {
                                if (event.key === "Enter" || event.key === " ") {
                                    event.preventDefault()
                                    if (canUpdate) onEditTag(tag)
                                }
                            }}
                        >
                            {tag.name}
                        </Tag>
                    ))}
                </Flex>
            ) : (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No case tags yet" />
            )}
        </Spin>
    </Card>
)

export default CaseTagsCard
