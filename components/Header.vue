<template>
    <div class="Header">
        <img class="Header-logo" src="~@/assets/images/logo.svg" alt="" />
        <div class="Header-navigation">
            <b-button size="is-small" @click="login">Log in</b-button>
            <b-button size="is-small" @click="logout">Logout</b-button>
            <b-button size="is-small" @click="addNewUser">
                Add new user
            </b-button>
            <div v-if="authState.user">Welcome {{ authState.user.email }}</div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { AuthState } from '@/store/auth'

export default Vue.extend({
    name: 'Header',
    computed: {
        authState(): AuthState {
            return this.$store.state.auth as AuthState
        },
    },
    methods: {
        async login() {
            await this.$storeActions.auth.signInWithEmailAndPassword(
                'mathieu.artu@gmail.com',
                'Coucousalut86!'
            )
        },
        async logout() {
            await this.$storeActions.auth.signOut()
        },
        async addNewUser() {
            // eslint-disable-next-line no-console
            const response = await this.$fireStore.collection('users').get()
            // eslint-disable-next-line no-console
            console.log(response.docs.map((doc) => doc.data()))
        },
    },
})
</script>

<style lang="scss">
.Header {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: $spacer-large;

    &-logo {
        width: 150px;
        margin-bottom: $spacer-large;
    }

    &-navigation {
        text-align: center;
    }
}
</style>
