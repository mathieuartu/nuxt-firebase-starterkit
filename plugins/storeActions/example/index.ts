import { Dispatch } from 'vuex'

export const exampleStoreActions = (dispatch: Dispatch) => {
    return {
        products: {
            get: async () => {
                return await dispatch('catalog/getProducts', null, {
                    useLoader: true,
                })
            },
        },
    }
}
