import type {ReactNode} from "react";
import Header from "../../widgets/Header/Header.tsx";
import Footer from "../../widgets/Footer/Footer.tsx";


const Layout = async ({children}: {children: ReactNode}) => {
    return (
        <body>
            <header>
                <Header/>
            </header>

            <main>
                {children}
            </main>

            <footer>
                <Footer/>
            </footer>
        </body>
    );
};

export default Layout;