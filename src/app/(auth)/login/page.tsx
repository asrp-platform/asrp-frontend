import styles from "./styles.module.scss"
import LoginForm from "./ui/LoginForm.tsx";
import type {Metadata} from "next";


export const metadata: Metadata = {
    title: "ASRP | Login",
}


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
