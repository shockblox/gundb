<template>
  <div id="home" class="container p-5">
    <h1 class="mb-4">GunDB Playground</h1>
    <BTNLogout />
  </div>
</template>

<script>
import BTNLogout from '@/components/BTNLogout'
export default {
  name: 'Home',
  components: {
    BTNLogout
  },
  async mounted() {
    const user = this.$gun.user() 
    if (user.is) { 
      console.log('logged in')
    } else { 
      console.log('not logged in')
    }
  }
}
</script>
