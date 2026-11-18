"use client"

import { useId, useState } from "react"
import { Button, Checkbox, message } from "antd"
import Link from "next/link"
import {
    ALL_COOKIE_CONSENT,
    COOKIE_CATEGORIES,
    COOKIE_CONSENT_KEY,
    DEFAULT_COOKIE_CONSENT,
    type CookieConsent,
} from "../cookieConsent"
import styles from "./styles.module.scss"

interface Props {
    initialConsent: CookieConsent
    onClose: () => void
}

const CookieBanner = ({ initialConsent, onClose }: Props) => {
    const [consents, setConsents] = useState<CookieConsent>(initialConsent)
    const titleId = useId()
    const descriptionId = useId()
    const dirty = COOKIE_CATEGORIES.some(({ key }) => consents[key] !== initialConsent[key])

    const saveConsent = (value: CookieConsent) => {
        try {
            window.localStorage.setItem(
                COOKIE_CONSENT_KEY,
                JSON.stringify({ ...value, necessary: true }),
            )
            onClose()
        } catch {
            message.error("Unable to save cookie preferences. Please try again.")
        }
    }

    return (
        <div className={styles.outerContainer}>
            <section
                className={styles.innerContainer}
                aria-labelledby={titleId}
                aria-describedby={descriptionId}
            >
                <div className={styles.header}>
                    <h2 id={titleId}>This website uses cookies</h2>
                    <p id={descriptionId}>
                        We use cookies to improve user experience. Choose what cookies you allow us
                        to use. You can read more about our Cookie Policy in our{" "}
                        <Link href="/policies">Privacy policy</Link>.
                    </p>
                </div>
                <div className={styles.footer}>
                    <div className={styles.choicesContainer}>
                        {COOKIE_CATEGORIES.map(({ key, label }) => (
                            <Checkbox
                                key={key}
                                checked={consents[key]}
                                disabled={key === "necessary"}
                                onChange={({ target }) =>
                                    setConsents((previous) => ({
                                        ...previous,
                                        [key]: target.checked,
                                    }))
                                }
                            >
                                {label}
                            </Checkbox>
                        ))}
                    </div>
                    <div className={styles.buttonContainer}>
                        <Button onClick={() => saveConsent(DEFAULT_COOKIE_CONSENT)}>
                            Reject all
                        </Button>
                        <Button
                            className={styles.acceptButton}
                            type="primary"
                            onClick={() => saveConsent(dirty ? consents : ALL_COOKIE_CONSENT)}
                        >
                            {dirty ? "Save preferences" : "Accept all"}
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default CookieBanner
