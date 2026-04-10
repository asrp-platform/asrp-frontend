"use client"

import { Button, Typography } from "antd"

import styles from "./GuidesListCard.module.scss"

import { useRouter } from "next/router"

const { Title } = Typography

const GuidesListCard = () => {
    const router = useRouter()

    const items = [
        "Elevating clinical quality through shared expertise",
        "Championing bilingual education and inclusive mentorship",
        "Advocating for members in national professional forums",
    ]

    return (
        <div className={styles.container}>
            <Title level={3} className={styles.title}>
                What guides our work
            </Title>
            <ul className={styles.guidingWorkList}>
                {items.map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
            <Button className={styles.button} onClick={() => router.push("/about")}>
                Learn about ASRP
            </Button>
        </div>
    )
}

export default GuidesListCard
