"use client"

import styles from "@/app/(main)/(account)/account/communication-preferences/ui/styles.module.scss"
import { ConfigProvider, Switch } from "antd"

type SwitchValues =
    | {
          setSwitch: (_key: string, _checked: boolean) => void
          preferenceKey: string
      }
    | {
          setSwitch?: (_key: string, _checked: boolean) => void
          preferenceKey?: string
      }

type IProps = SwitchValues & {
    title: string
    description: string
    defaultChecked: boolean
}

const CommunicationSwitchCard = ({
    title,
    description,
    setSwitch,
    preferenceKey,
    defaultChecked,
}: IProps) => {
    return (
        <div className={styles.container}>
            <div className={styles.membershipAccountNotificationInfoContainer}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.info}>{description}</p>
            </div>
            <div className={styles.switchContainer}>
                <ConfigProvider
                    theme={{
                        components: {
                            Switch: {
                                colorPrimary: "#ff4d4f",
                                colorPrimaryHover: "#ff7875",
                            },
                        },
                    }}
                >
                    {preferenceKey && setSwitch ? (
                        <Switch
                            checked={defaultChecked}
                            onChange={(checked) => setSwitch(preferenceKey, checked)}
                        />
                    ) : (
                        <Switch defaultChecked={defaultChecked} disabled />
                    )}
                </ConfigProvider>
            </div>
        </div>
    )
}

export default CommunicationSwitchCard
