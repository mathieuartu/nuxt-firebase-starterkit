import { MutationTree, ActionTree } from 'vuex/types/index'

export interface AuthState {
    user: {
        uid: string
        email: string
    } | null
    authError: any
}

export const state = (): AuthState => ({
    user: null,
    authError: null,
})

enum mutationTypes {
    SET_AUTH_USER = 'SET_AUTH_USER',
    SET_AUTH_ERROR = 'SET_AUTH_ERROR',
    RESET_AUTH_USER = 'RESET_AUTH_USER',
}

export const mutations: MutationTree<AuthState> = {
    [mutationTypes.SET_AUTH_USER](state, user) {
        // eslint-disable-next-line no-console
        console.log(user)
        state.user = {
            email: user.email,
            uid: user.uid,
        }
    },
    [mutationTypes.SET_AUTH_ERROR](state, error) {
        state.authError = error
    },
    [mutationTypes.RESET_AUTH_USER](state) {
        state.user = null
    },
}

export const actions: ActionTree<AuthState, AuthState> = {
    onAuthStateChanged({ commit }, { authUser }) {
        if (authUser) return commit('SET_AUTH_USER', authUser)
        return commit('RESET_AUTH_USER')
    },
    async signInWithEmailAndPassword({ commit }, { email, password }) {
        const userResponse = await this.$fireAuth.signInWithEmailAndPassword(
            email,
            password
        )

        if (
            !userResponse.user ||
            !userResponse.user.email ||
            !userResponse.user.uid
        )
            return commit(mutationTypes.SET_AUTH_ERROR, userResponse)

        return commit(mutationTypes.SET_AUTH_USER, {
            email: userResponse.user.email,
            uid: userResponse.user.uid,
        })
    },
    async signOut({ commit }) {
        await this.$fireAuth.signOut()
        commit(mutationTypes.RESET_AUTH_USER)
    },
}
