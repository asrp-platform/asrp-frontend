"use client"

import styles from "./styles.module.scss"
import LoginForm from "./ui/LoginForm.tsx";

const LoginPage = () => {

    return (
        <div className={styles.outerContainer}>
            <div className={styles.loginFormContainer}>
                <h2>Login</h2>
                <LoginForm />
            </div>
        </div>
    )
}

export default LoginPage
