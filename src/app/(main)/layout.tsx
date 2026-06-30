import type { ReactNode } from "react"
import Header from "@/widgets/Header/Header.tsx"
import Footer from "@/widgets/Footer/Footer.tsx"

const Layout = async ({ children }: { children: ReactNode }) => {
    return (
        <>
            <header>
                <Header />
            </header>

            <main>{children}</main>

            <footer>
                <Footer />
            </footer>
        </>
    )
}

export default Layout
