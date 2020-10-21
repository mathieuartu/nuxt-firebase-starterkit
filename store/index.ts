import { ActionTree } from 'vuex'

import { DeepPartial } from '@/index.d.ts'

// Plugins
import dispatch from '@/store/plugins/dispatch'

// Internal states
import { AuthState } from '@/store/auth'
import { SiteState } from '@/store/site'

// Plugins export
export const plugins = [dispatch]

// State
export interface RootState {
    auth?: DeepPartial<AuthState>
    site?: DeepPartial<SiteState>
}
export const state = () => {}

// Action
export const actions: ActionTree<RootState, RootState> = {
    async nuxtServerInit({ dispatch }, { res }) {
        if (res && res.locals && res.locals.user) {
            const { allClaims: claims, ...authUser } = res.locals.user

            await dispatch(
                'auth/onAuthStateChanged',
                {
                    authUser,
                    claims,
                },
                {
                    root: true,
                }
            )
        }
    },
}
