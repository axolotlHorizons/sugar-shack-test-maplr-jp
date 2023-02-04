<script>
import { store } from '../store.js'
import CartPopup from "./CartPopup.vue";
import OrderPopup from "./OrderPopup.vue";

export default {
  components: {
    OrderPopup,
    CartPopup
  },
  props: {
    title: String
  },
  setup() {
    return {
      store
    }
  },
  data() {
    return {
      openOrderPopup: false,
      listCart: []
    }
  },
  methods: {
    handleCloseOrderPopup(event) {
      this.openOrderPopup = event;
    },
    callBackGoOrder(listCart) {
      this.listCart = [...listCart];
      this.openOrderPopup = true;
    }
  }
}
</script>

<template>
  <v-card color="grey-lighten-4" flat rounded="0">
    <v-toolbar :height="100">

      <img class="ml-10 mr-5" :width="55" src="../assets/favicon-maplr.png"/>
      <v-divider class="ma-auto" :length="50" vertical></v-divider>
      <v-toolbar-title>{{ title }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn color="primary" v-bind="props">
            <span v-if="store.cartItem > 0"> {{ store.cartItem }}</span>
            <i class="material-icons">
              shopping_cart
            </i>
          </v-btn>
        </template>
        <CartPopup :callBackGoOrder="callBackGoOrder"/>
      </v-menu>
      <OrderPopup :cartOrder="listCart" :isOpenOrderPopup="openOrderPopup" @onCloseOrderPopup="handleCloseOrderPopup"/>
    </v-toolbar>

  </v-card>
</template>



<style scoped>

</style>