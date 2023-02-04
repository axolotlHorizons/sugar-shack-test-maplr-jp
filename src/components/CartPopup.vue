<script>
import { store } from '../store.js'
import * as cartsHandler from "../api/carts-handler";

export default {
  props: {
    callBackGoOrder: Function
  },
  setup() {
    return {
      store
    }
  },
  data() {
    return {
      cartItems: []
    }
  },
  mounted() {
    cartsHandler.get().then(res => {
      const {data} = res;
      this.cartItems = [...data];
    });
  },
  methods: {
    cleanCart() {
      cartsHandler.clean().then(res => {
        this.cartItems = [];
        this.store.reinitializeCartItem();
        this.store.infoText = `Votre panier à bien été vidé !`;
        this.store.infoType = 'success';
        this.store.isInfo = true;
      });
    },
    goOrder() {
      const tmpCartItems = [...this.cartItems];
      this.cartItems = [];
      this.callBackGoOrder(tmpCartItems);
    }
  }
}
</script>

<template>
    <v-card min-width="300">
      <v-list v-if="cartItems.length > 0">
        <v-list-item v-for="item in cartItems" :key="item.id"
            :prepend-avatar="item.image"
            :title="item.name"
            :subtitle="`Quantité(s) : ${item.qty}`"
        >
        </v-list-item>
      </v-list>
      <v-list v-else>
        <v-list-item title="Panier vide...">
          <template v-slot:prepend>
            <i class="material-icons mr-5">
              remove_shopping_cart
            </i>
          </template>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn :disabled="cartItems.length === 0" color="error" @click="cleanCart()">
          <span>Vider</span>
          <i class="material-icons">
            remove_shopping_cart
          </i>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn :disabled="cartItems.length === 0" color="primary" variant="text" @click="goOrder()">
          Passer Commande
        </v-btn>
      </v-card-actions>
    </v-card>
</template>



<style scoped>

</style>