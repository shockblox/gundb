<template>
  <router-view/>
</template>

<script>
export default {
  async mounted() {
    await this.$gun.user().recall({ sessionStorage: true })
  }
}
</script>

<style lang="scss">
@import 'bootstrap'
</style>
