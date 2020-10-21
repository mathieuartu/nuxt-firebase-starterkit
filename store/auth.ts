import { MutationTree, ActionTree } from 'vuex/types/index'

import { User } from '@/core/User'
export interface AuthState {
    user: User | null
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
        state.user = user
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
        if (authUser)
            return commit(mutationTypes.SET_AUTH_USER, new User(authUser))
        return commit(mutationTypes.RESET_AUTH_USER)
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

        return commit(mutationTypes.SET_AUTH_USER, new User(userResponse.user))
    },
    async signOut({ commit }) {
        await this.$fireAuth.signOut()
        commit(mutationTypes.RESET_AUTH_USER)
    },
}
