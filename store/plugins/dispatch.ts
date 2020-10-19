import { Store } from 'vuex'

interface DispatchOptions {
    root?: boolean
    useLoader?: boolean
}
declare module 'vuex/types/index' {
    interface DispatchOptions {
        root?: boolean
        useLoader?: boolean
    }
}

export default (store: Store<any>) => {
    const originalDispatchFunction = store.dispatch

    // Wrap the original dispatch function to add a useLoader parameter in the options
    store.dispatch = async (
        type: string,
        payload?: any,
        options?: DispatchOptions
    ) => {
        try {
            if (options && options.useLoader) {
                await originalDispatchFunction('site/setLoadingMode', true)
            }

            await originalDispatchFunction(type, payload, options)

            if (options && options.useLoader) {
                await originalDispatchFunction('site/setLoadingMode', false)
            }
        } catch (error) {
            await originalDispatchFunction('site/setLoadingMode', false)
            throw error
        }
    }
}
