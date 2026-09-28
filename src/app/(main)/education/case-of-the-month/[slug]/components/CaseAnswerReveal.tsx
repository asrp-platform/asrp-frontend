"use client"

import type { JSONContent } from "@tiptap/react"
import { useState } from "react"

import ArticleBody from "@app/(main)/news-and-events/[slug]/ArticleBody.tsx"

import styles from "../styles.module.scss"

interface IProps {
    answer: JSONContent
}

const CaseAnswerReveal = ({ answer }: IProps) => {
    const [isRevealed, setIsRevealed] = useState(false)

    return (
        <div className={styles.answerArea}>
            <button
                type="button"
                className={styles.revealButton}
                onClick={() => setIsRevealed((current) => !current)}
                aria-expanded={isRevealed}
            >
                {isRevealed ? "Hide Answer" : "Reveal Answer"}
            </button>
            {isRevealed && (
                <div className={styles.answerContent}>
                    <ArticleBody content={answer} />
                </div>
            )}
        </div>
    )
}

export default CaseAnswerReveal
