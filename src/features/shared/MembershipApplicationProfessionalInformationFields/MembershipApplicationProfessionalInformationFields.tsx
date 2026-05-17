import { Form, Input, Select } from "antd"
import { jobTitleOptions, practiceSettingOptions } from "@shared/options.ts"

const MembershipApplicationProfessionalInformationFields = () => {
    return (
        <>
            <Form.Item
                label="Primary institution / affiliation"
                name="primary_affiliation"
                rules={[{ required: true }]}
            >
                <Input placeholder="e.g. University Hospital, Research Institute" />
            </Form.Item>

            <Form.Item label="Job title / role" name="job_title" rules={[{ required: true }]}>
                <Select placeholder="Select an option" options={jobTitleOptions} />
            </Form.Item>

            <Form.Item
                label="Primary practice setting"
                name="practice_setting"
                rules={[{ required: true }]}
            >
                <Select placeholder="Select an option" options={practiceSettingOptions} />
            </Form.Item>

            <Form.Item label="Subspecialty focus" name="subspecialty" rules={[{ required: true }]}>
                <Input placeholder="e.g. Hematopathology, Breast, GI, Cytopathology" />
            </Form.Item>
        </>
    )
}

export default MembershipApplicationProfessionalInformationFields
