import { ActionTree, ActionContext } from 'vuex'
import { Context as AppContext } from '@nuxt/types'

import { DeepPartial } from '@/index.d.ts'

// Plugins
import dispatch from '@/store/plugins/dispatch'

// Internal states
import { SiteState } from '@/store/site'
export const plugins = [dispatch]

// State
export interface RootState {
    site?: DeepPartial<SiteState>
}
export const state = () => {}

// Actions
interface CustomAppContext extends Omit<AppContext, 'req'> {
    req: {}
}

interface Actions<S, R> extends ActionTree<S, R> {
    nuxtServerInit(
        actionContext: ActionContext<S, R>,
        appContext: CustomAppContext
    ): void
}

export const actions: Actions<RootState, RootState> = {
    async nuxtServerInit() {},
}
