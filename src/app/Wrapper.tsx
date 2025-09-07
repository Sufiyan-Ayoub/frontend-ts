'use client'
import { AppStore, Store } from '@/store'
import { Children } from '@/types'
import createStore from '@zuzjs/store'
import { FC, useEffect } from 'react'
import Authenticate from '@/app/oauth'

const Wrapper:FC<Children> = ({ children }) => {
    const { Provider } = createStore(Store.App, AppStore.App)
    
    useEffect(() => {

    }, [])

    return (
        <Provider>
            <Authenticate />
            {children}
        </Provider>
    )
}

export default Wrapper