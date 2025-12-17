import type {ReactNode} from "react";
import Header from "../../widgets/Header/Header.tsx";
import Footer from "../../widgets/Footer/Footer.tsx";


const Layout = async ({children}: {children: ReactNode}) => {
    return (
        <body>

        <main>
            {children}
        </main>

        </body>
    );
};

export default Layout;