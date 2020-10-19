import { MutationTree, ActionTree } from 'vuex/types/index'

export interface SiteState {
    isLoading: boolean
}

export const state = (): SiteState => ({
    isLoading: false,
})

export const mutations: MutationTree<SiteState> = {
    // loading state
    SET_LOADING_MODE(state, isLoading) {
        state.isLoading = isLoading
    },
}

export const actions: ActionTree<SiteState, SiteState> = {
    // loading state
    async setLoadingMode({ commit }, isLoading) {
        await commit('SET_LOADING_MODE', isLoading)
    },
}
