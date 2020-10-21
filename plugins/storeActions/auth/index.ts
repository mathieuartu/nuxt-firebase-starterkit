import { Dispatch } from 'vuex'

export const authStoreActions = (dispatch: Dispatch) => {
    return {
        signInWithEmailAndPassword: async (email: string, password: string) => {
            return await dispatch(
                'auth/signInWithEmailAndPassword',
                { email, password },
                {
                    useLoader: true,
                }
            )
        },
        signOut: async () => {
            return await dispatch('auth/signOut', {}, { useLoader: true })
        },
    }
}
