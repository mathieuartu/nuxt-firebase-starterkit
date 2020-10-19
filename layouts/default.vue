<template>
    <div class="Main">
        <Loader v-if="isSiteLoading" />
        <nuxt />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

import Loader from '@/components/Loader/Loader.vue'

import { SiteState } from '@/store/site'

export default Vue.extend({
    components: {
        Loader,
    },
    computed: {
        siteState(): SiteState {
            return this.$store.state.site as SiteState
        },
        isSiteLoading(): boolean {
            return this.siteState.isLoading
        },
    },
})
</script>
