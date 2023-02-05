<script>
import { store } from '../store.js'
import * as ordersHandler from "../api/orders-handler";
import * as utils from "../utils";
import tinyEmitter from "tiny-emitter/instance";

export default {
  emits: ['onCloseOrderPopup'],
  props: {
    cartOrder: Array,
    isOpenOrderPopup: Boolean
  },
  setup() {
    return {
      store
    }
  },
  data() {
    return {
      showDialog: false,
      orderDetails: {}
    }
  },
  watch: {
    isOpenOrderPopup: function () {
      this.showDialog = this.isOpenOrderPopup;
    },
    showDialog: function () {
      if (!this.showDialog) {
        this.$emit('onCloseOrderPopup', false);
        this.orderDetails = {};
      }
    },
    cartOrder: function () {
      this.orderDetails = {
        total: this.cartOrder.reduce((acc, current) => {return acc + (current.price * current.qty)}, 0).toFixed(2),
        products: [...this.cartOrder.map(value => {return {id: value.id, qty: value.qty}})]
      };
      this.orderDetails.totalTaxesInclude = utils.getPriceWithTaxe(this.orderDetails.total);
    },
  },
  methods: {
    confirmCommand: function() {
      ordersHandler.addOrder({...this.orderDetails, total: parseFloat(this.orderDetails.total), totalTaxesInclude: parseFloat(this.orderDetails.totalTaxesInclude)}).then((response) => {
        this.store.reinitializeCartItem();
        this.showDialog = false;
        this.store.infoText = `Votre commande est validé !`;
        this.store.infoType = 'success';
        this.store.isInfo = true;
        tinyEmitter.emit('orderConfirm', this.orderDetails);
      });
    }
  }
}
</script>

<template>
  <v-dialog v-model="showDialog" max-width="450">
    <v-card>
      <v-list class="mx-auto mt-6 mb-6">
        <v-list-item v-for="item in cartOrder" :key="item.id"
                     :prepend-avatar="item.image"
                     :title="item.name"
                     :subtitle="`Quantité(s) : ${item.qty}, Prix : ${(item.price * item.qty).toFixed(2)}`"
        >
        </v-list-item>
        <v-list-item class="text-center mt-6" :title="`Total : ${orderDetails.total} $CAD`"></v-list-item>
        <v-list-item class="text-center" :title="`(Avec taxes : ${orderDetails.totalTaxesInclude} $CAD)`"></v-list-item>
      </v-list>
      <v-card-actions>
        <v-btn color="primary" block @click="confirmCommand()">Valider la commande</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>



<style scoped>

</style>