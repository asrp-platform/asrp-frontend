import CircularProgress from "@mui/material/CircularProgress"

import styles from "@/app/(main)/about/directors-board/(components)/ViewCard/ui/styles.module.scss"

const Loading = () => {
    return (
        <div className={styles.loadingContainer}>
            <CircularProgress size={24} />
        </div>
    )
}

export default Loading
