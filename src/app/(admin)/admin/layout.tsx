import { Children } from '@/types'
import React, { FC } from 'react'
import AppSidebar from './sidebar'
import { SidebarProvider } from '@/app/comps/ui/sidebar'

const AdminLayout:FC<Children> = ({ children }) => {
    return (
        <SidebarProvider
            className='admin'
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            }
        >
            <AppSidebar />
            {children}
        </SidebarProvider>
    )
}

export default AdminLayout