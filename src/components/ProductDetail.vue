<script>
import * as productsHandler from "../api/products-handler";
import * as utils from "../utils";

export default {
  emits: ['onCloseCartPopup'],
  props: {
    idProduct: String,
    isOpenProductDetail: Boolean
  },
  data() {
    return {
      showDialog: false,
      productDetail: {}
    }
  },
  watch: {
    isOpenProductDetail: function () {
      this.showDialog = this.isOpenProductDetail;
    },
    showDialog: function () {
      if (!this.showDialog) {
        this.$emit('onCloseCartPopup', false);
      }
      else {
        this.getInfoProduct();
      }
    },
  },
  computed: {
    fixedPrice() {
      return this.productDetail.price?.toFixed(2);
    }
  },
  methods: {
    getInfoProduct() {
      productsHandler.getOne(this.idProduct).then(res => {
        const {data} = res;
        this.productDetail = {...data, syropType: utils.getTypeOfMaple(data.type)};
      });
    },
  }
}
</script>

<template>
  <v-dialog v-model="showDialog">
    <v-card>
      <v-img :src="productDetail.image" class="align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="300px" contain>
        <v-card-title class="text-white" v-text="productDetail.name"></v-card-title>
      </v-img>
      <v-card-item>
        <v-card-text>{{ productDetail.description }}</v-card-text>
        <v-card-subtitle>{{ fixedPrice }} $CAD</v-card-subtitle>
        <v-card-subtitle>{{ productDetail.stock }} en stock</v-card-subtitle>
        <v-card-subtitle>Type du sirop : {{ productDetail.syropType }}</v-card-subtitle>
      </v-card-item>
      <v-card-actions>
        <v-btn color="primary" block @click="showDialog = false">Fermer</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>



<style scoped>

</style>