<template>
    <div id="register" class="container p-5">
        <div class="row">
            <div class="col-md-6 offset-md-3">
                <div class="card">
                    <div class="card-header">Create an Account</div>
                    <div class="card-body">
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
                            <button class="btn btn-primary btn-lg" @click="register">Create Decentralized User</button>
                        </div>
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
    computed: {
        user () {
            return this.$gun.user()
        }
    },
    methods: {
        async register () {
            // TODO: replace basic ass validation
            if (!this.newUser.username || !this.newUser.password) {
                return
            }
            // Create a user
            const self = this
            this.user.create(this.newUser.username, this.newUser.password, function(ack){
                if (ack.err) {
                    alert(ack.err)
                    return
                }
                self.$store.commit('setUser', self.user)
                self.$router.push({path: '/'})
            })
        }
    }
}
</script>
