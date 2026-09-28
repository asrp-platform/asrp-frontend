import { ExternalLink } from "lucide-react"

import styles from "../styles.module.scss"

interface IProps {
    slides: string[]
}

const VirtualSlidesSection = ({ slides }: IProps) => {
    if (!slides.length) return null

    return (
        <section className={styles.slideSection} aria-labelledby="virtual-slides-title">
            <div>
                <h2 id="virtual-slides-title">Whole-slide image available</h2>
                <p>Explore the case using an external virtual-slide viewer.</p>
            </div>
            <div className={styles.slideLinks}>
                {slides.map((slide, index) => (
                    <a
                        href={slide}
                        key={slide}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.slideLink}
                    >
                        Open Virtual Slide {slides.length > 1 ? index + 1 : ""}
                        <ExternalLink size={16} />
                    </a>
                ))}
            </div>
        </section>
    )
}

export default VirtualSlidesSection
