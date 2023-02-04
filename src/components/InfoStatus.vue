<script>
import { store } from '../store.js'

export default {
  setup() {
    return {
      store,
    }
  },
  data() {
    return {
      timeout: 2000
    }
  }
}
</script>

<template>
  <v-snackbar v-model="store.isInfo" :timeout="timeout" :color="store.infoType">
    {{ store.infoText }}
  </v-snackbar>
</template>



<style scoped>

</style>