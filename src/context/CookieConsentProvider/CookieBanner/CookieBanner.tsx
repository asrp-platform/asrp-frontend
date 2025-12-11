"use client"

import styles from "./styles.module.scss"
import { useState } from "react"
import { Button, Checkbox, Typography } from "antd"

const { Title, Paragraph, Text } = Typography

const COOKIE_LABELS: Record<string, string> = {
    necessary: "Strictly necessary",
    performance: "Analytics cookies",
    targeting: "Marketing cookies",
    functionality: "Functional cookies",
    unclassified: "Other cookies",
}

interface IProps {
    onClose: () => void
}

const CookieBanner = ({ onClose }: IProps) => {
    const [consents, setConsents] = useState({
        necessary: true,
        performance: false,
        targeting: false,
        functionality: false,
        unclassified: false,
    })
    const [dirty, setDirty] = useState(false)

    const acceptAll = () => {
        const allTrue = {
            necessary: true,
            performance: true,
            targeting: true,
            functionality: true,
            unclassified: true,
        }
        setConsents(allTrue)
        window.localStorage.setItem("cookieConsent", JSON.stringify(allTrue))
        onClose()
    }

    const rejectAll = () => {
        const allFalse = {
            necessary: true,
            performance: false,
            targeting: false,
            functionality: false,
            unclassified: false,
        }
        setConsents(allFalse)
        window.localStorage.setItem("cookieConsent", JSON.stringify(allFalse))
        onClose()
    }

    const saveConsent = () => {
        window.localStorage.setItem("cookieConsent", JSON.stringify(consents))
        onClose()
    }

    const handleCheckbox = (key: keyof typeof consents, checked: boolean) => {
        setConsents({ ...consents, [key]: checked })
        setDirty(true)
    }

    return (
        <div className={styles.outerContainer}>
            <div className={styles.innerContainer}>
                <div className={styles.header}>
                    <Title level={4}>This website uses cookies</Title>
                    <Paragraph>
                        We use cookies to improve user experience. Choose what cookies you allow us
                        to use. You can read more about our Cookie Policy in our{" "}
                        <a href="/policies">Privacy policy</a>.
                    </Paragraph>
                </div>
                <div className={styles.footer}>
                    <div className={styles.choicesContainer}>
                        {Object.entries(consents).map(([key, value]) => (
                            <div key={key}>
                                <Checkbox
                                    checked={value}
                                    disabled={key === "necessary"}
                                    onChange={(event) =>
                                        handleCheckbox(
                                            key as keyof typeof consents,
                                            event.target.checked,
                                        )
                                    }
                                />
                                <Text className={styles.label}>{COOKIE_LABELS[key]}</Text>
                            </div>
                        ))}
                    </div>
                    <div className={styles.buttonContainer}>
                        <Button onClick={rejectAll}>Reject all</Button>
                        {dirty ? (
                            <Button className={styles.acceptButton} type="primary" onClick={saveConsent}>
                                Save preferences
                            </Button>
                        ) : (
                            <Button className={styles.acceptButton} type="primary" onClick={acceptAll}>
                                Accept all
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CookieBanner
