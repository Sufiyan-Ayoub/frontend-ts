import { AppStore, Store } from "@/store";
import { Children } from "@/types";
import createStore from "@zuzjs/store";
import { FC } from "react";

const Main : FC<Children> = ({ children }) => {
    
    return (
        <div className="app">
            {children}
        </div>
    )
    
}

const AppLayout: FC<Children> = ({ children }) => {
     const { Provider } = createStore(Store.App, AppStore.App)
    
    return (
        <Provider>
            <Main>{children}</Main>
        </Provider>
    )
}
export default AppLayout;