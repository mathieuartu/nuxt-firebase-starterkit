<template>
    <div class="Main">
        <Loader v-if="isSiteLoading" />
        <Header />
        <nuxt />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

import Loader from '@/components/Loader.vue'
import Header from '@/components/Header.vue'

import { SiteState } from '@/store/site'

export default Vue.extend({
    components: {
        Loader,
        Header,
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

<style lang="scss">
.Main {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
}
</style>
