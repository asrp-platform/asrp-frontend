"use client"

import { Layout, Typography, Divider, Button } from "antd"
import { useCookieConsent } from "../../../context/CookieConsentProvider/CookieConsentProvider.tsx"
import styles from "./styles.module.scss"

const { Title, Paragraph } = Typography
const { Content } = Layout

const Page = () => {
    const { resetConsent } = useCookieConsent()

    return (
        <div className={styles.outerContainer}>
            <div className={styles.innerContainer}>
                <Layout className={styles.legalLayout}>
                    <Content className={styles.legalContent}>
                        {/* Privacy Policy */}
                        <section className={styles.section}>
                            <Title level={2}>Privacy Policy</Title>
                            <Paragraph type="secondary">Last updated: March 1, 2025</Paragraph>
                            <Paragraph>
                                This Privacy Policy explains how we collect, use, and protect your
                                personal information when you use our website and services.
                            </Paragraph>
                            <Title level={4}>Information We Collect</Title>
                            <Paragraph>
                                We may collect personal data such as name, email, account details,
                                and technical data like IP address and browser type.
                            </Paragraph>
                            <Title level={4}>How We Use Your Information</Title>
                            <Paragraph>
                                To provide and improve services, personalize user experience,
                                communicate updates, and comply with legal obligations.
                            </Paragraph>
                            <Title level={4}>Your Rights</Title>
                            <Paragraph>
                                Under GDPR/CCPA you have the right to access, correct, or delete
                                your data and withdraw consent. Contact us at
                                <a href="mailto:contact@example.com"> contact@example.com</a>.
                            </Paragraph>
                        </section>

                        <Divider />

                        {/* Cookie Policy */}
                        <section className={styles.section}>
                            <Title level={2}>Cookie Policy</Title>
                            <Paragraph type="secondary">Last updated: March 1, 2025</Paragraph>
                            <Paragraph>
                                We use cookies to ensure the best user experience. On your first
                                visit, you can accept or reject cookies. You may change your
                                preferences anytime in the Cookie settings.
                            </Paragraph>
                            <Title level={4}>Types of Cookies</Title>
                            <Paragraph>
                                <ul>
                                    <li>Strictly necessary — essential for site functionality.</li>
                                    <li>Functional — remember your settings and preferences.</li>
                                    <li>Analytics — help us understand user behavior.</li>
                                    <li>Marketing — deliver personalized ads.</li>
                                </ul>
                            </Paragraph>
                            <Paragraph>
                                Please note that strictly necessary cookies cannot be disabled.
                            </Paragraph>
                            <Button onClick={resetConsent}>Manage cookies</Button>
                        </section>

                        <Divider />

                        {/* Terms of Use */}
                        <section className={styles.section}>
                            <Title level={2}>Terms of Use</Title>
                            <Paragraph type="secondary">Last updated: March 1, 2025</Paragraph>
                            <Paragraph>
                                By using this website, you agree to comply with the following terms.
                            </Paragraph>
                            <Title level={4}>Eligibility</Title>
                            <Paragraph>
                                You must be at least 18 years old or have parental consent.
                            </Paragraph>
                            <Title level={4}>Use of Service</Title>
                            <Paragraph>
                                You agree to use the site only for lawful purposes and keep your
                                account secure.
                            </Paragraph>
                            <Title level={4}>Intellectual Property</Title>
                            <Paragraph>
                                All content, logos, and designs are the property of Example Inc.
                                Unauthorized reproduction is prohibited.
                            </Paragraph>
                            <Title level={4}>Limitation of Liability</Title>
                            <Paragraph>
                                We are not liable for damages resulting from use of the website to
                                the extent permitted by law.
                            </Paragraph>
                        </section>
                    </Content>
                </Layout>
            </div>
        </div>
    )
}

export default Page
