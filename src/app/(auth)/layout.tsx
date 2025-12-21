import type {ReactNode} from "react";


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