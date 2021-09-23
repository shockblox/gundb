<template>
    <button
        class="btn btn-lg btn-primary"
        @click="logout"
        v-bind:class="{disabled: loading}"
        :disabled="loading"
    >
        <span v-if="loading">Logging Out...</span>
        <span v-else>Logout</span>
    </button>
</template>

<script>
import Gun from 'gun/gun'
export default {
    data() {
        return {
            loading: false
        }
    },
    computed: {
        pubKey () {
            return this.$store.state.pubKey
        },
        user () {
            return this.$store.state.user
        }
    },
    methods: {
        async logout () {
            this.$gun.user().leave()
            this.$store.commit('setPubKey', null)
            this.$router.push({path: '/login'})
        }
    }
}
</script>