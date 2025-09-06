'use client'
import { AppStore, Store } from "@/store";
import { Children } from "@/types";
import createStore from "@zuzjs/store";
import { FC, useEffect } from "react";
import Authenticate from "@/app/oauth";

const Main : FC<Children> = ({ children }) => {

    return (
        <div className="app">
            {children}
        </div>
    )
    
}

const AppLayout: FC<Children> = ({ children }) => {
    const { Provider } = createStore(Store.App, AppStore.App)
    
    useEffect(() => {

    }, [])

    return (
        <Provider>
            <Authenticate />
            <Main>{children}</Main>
        </Provider>
    )
}
export default AppLayout;