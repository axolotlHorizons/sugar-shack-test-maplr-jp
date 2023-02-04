<script>
  import { store } from "../store";
  import * as cartsHandler from "../api/carts-handler";

  export default {
    props: {
      product: Object
    },
    setup() {
      return {
        store
      }
    },
    methods: {
      addToCart() {
        cartsHandler.add(this.product).then(res => {
          this.store.incrementCartItem();
          this.store.infoText = `${this.product.name} ajouté dans votre panier !`;
          this.store.infoType = 'success';
          this.store.isInfo = true;
        }).catch(err => {
          this.store.infoText = `Impossible d'ajouter ${this.product.name} dans votre panier !`;
          this.store.infoType = 'error';
          this.store.isInfo = true;
        });
      }
    }
  }
</script>

<template>
  <v-card>
    <v-img :src="product.image" class="align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="200px" cover>
      <v-card-title class="text-white" v-text="product.name"></v-card-title>
    </v-img>
    <v-card-item>
      <v-card-subtitle>{{ product.description }}</v-card-subtitle>
    </v-card-item>
    <v-card-actions>
      <v-btn class="ma-2" color="primary" @click.stop.prevent="addToCart()">
        <i class="material-icons mr-2">
          add_shopping_cart
        </i>
        Ajouter au panier
      </v-btn>
    </v-card-actions>
  </v-card>
</template>



<style scoped>

</style>