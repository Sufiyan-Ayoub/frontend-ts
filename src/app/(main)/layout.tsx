import { Children } from "@/types";
import { FC } from "react";

const AppLayout: FC<Children> = ({ children }) => {
    
    return (
        <div className="app w-screen h-screen">
            {children}
        </div>
    )
}
export default AppLayout;