import { Plugin } from '@nuxt/types'
import Vue, { ComponentOptions } from 'vue'
import { Store } from 'vuex'

import { exampleStoreActions } from '@/plugins/storeActions/example'

export class StoreActions {
    example: ReturnType<typeof exampleStoreActions>

    constructor(dispatch: any) {
        this.example = exampleStoreActions(dispatch)
    }
}

const storeActionsPlugin: Plugin = ({ store }, inject) => {
    const $storeActions = new StoreActions(store.dispatch)
    inject('storeActions', $storeActions)
}

export default storeActionsPlugin

declare module 'vue/types/vue' {
    interface Vue {
        $storeActions: StoreActions
        $i18n: any
        $t: any
        switchLocalePath: any
        localePath: any
        nuxtI18n: any
    }
}

declare module 'vue/types/options' {
    interface ComponentOptions<V extends Vue> {
        nuxtI18n?: any
    }
}

declare module '@nuxt/types' {
    interface NuxtAppOptions {
        $storeActions: StoreActions
        $i18n: any
        $t: any
        switchLocalePath: any
        localePath: any
        nuxtI18n: any
    }
}

declare module 'vuex/types/index' {
    interface Store<S> {
        $storeActions: StoreActions
        $i18n: any
        $t: any
        switchLocalePath: any
        localePath: any
        nuxtI18n: any
    }
}
