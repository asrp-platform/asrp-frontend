import { Tag } from "antd"

interface IProps {
    value: boolean
}

const BooleanTag = ({ value }: IProps) => {
    if (value) {
        return <Tag color={"green"}>Yes</Tag>
    }

    return <Tag color={"red"}>No</Tag>
}

export default BooleanTag
