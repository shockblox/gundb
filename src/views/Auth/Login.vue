<template>
    <div id="register" class="container p-5">
        <div class="row">
            <div class="col-md-6 offset-md-3">
                <div class="card">
                    <div class="card-header">Login</div>
                    <div class="card-body">
                        <div v-if="$route.query.newAccount" class="alert alert-info">
                            Thanks for registering! You can now login below.
                        </div>
                        <div class="form-group mb-4">
                            <label>Shockblox Username</label>
                            <input type="email" v-model="newUser.username" class="form-control">
                            <small>You can use your Shockblox Username across all Shockblox properties to log in.</small>
                        </div>
                        <div class="form-group mb-4">
                            <label>Password</label>
                            <input type="password" v-model="newUser.password" class="form-control">
                        </div>
                        <div class="form-group mb-4">
                            <button class="btn btn-primary btn-lg" @click="login">Login</button>
                        </div>
                        <router-link to="/register">Create an account.</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Gun from 'gun/gun'
export default {
    data() {
        return {
            newUser: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        async login () {
            // TODO: replace basic ass validation
            if (!this.newUser.username || !this.newUser.password) {
                return
            }
            // Create a user
            const self = this
            this.$gun.user().auth(this.newUser.username, this.newUser.password, async function(ack){
                if (ack.err) {
                    alert(ack.err)
                    return
                }
                await self.$gun.user().recall({ sessionStorage: true })
                self.$store.commit('setPubKey', ack.sea.pub)
                self.$router.push({path: '/'})
            })
        }
    }
}
</script>
