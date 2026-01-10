import CircularProgress from "@mui/material/CircularProgress";

import styles from "./styles.module.scss";

const Loading = () => {
    return (
        <div className={styles.loadingContainer}>
            <CircularProgress size={24}/>
        </div>
    );
};

export default Loading;