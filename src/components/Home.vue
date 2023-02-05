<script>
import * as productsHandler from "../api/products-handler";
import ProductCard from './ProductCard.vue';
import ProductDetail from "./ProductDetail.vue";
import * as utils from "../utils";
import tinyEmitter from "tiny-emitter/instance";

export default {
  components: {
    ProductDetail,
    ProductCard
  },
  async setup() {
    const res = await productsHandler.get();
    const {data} = res;
    return {
      listItems: [...data]
    }
  },
  mounted() {
    tinyEmitter.on('orderConfirm', (orderDetail) => {
      this.handleStockChange(orderDetail);
    });
  },
  data() {
    return {
      selectedProductId: "",
      openProductDetail: false,
      mapleTypeSelected: [0,1,2],
      listMapleType: utils.getListMapleType(),
      filteredProductList: [...this.listItems]
    }
  },
  watch: {
    mapleTypeSelected: () => {
      this.filterProductByMapleType();
    },
  },
  methods: {
    handleCloseCartPopup(event) {
      this.openProductDetail = event;
    },
    onSelectedProduct(itemId) {
      this.selectedProductId = itemId;
      this.openProductDetail = true;
    },
    getMapleName(type) {
      return utils.getTypeOfMaple(type);
    },
    filterProductByMapleType() {
      let tmpFiltered = [...this.listItems]
      let tmpMapleType = this.mapleTypeSelected.map(index => {
        return this.listMapleType[index];
      });
      this.filteredProductList = tmpFiltered.filter(value => tmpMapleType.includes(value.type));
    },
    handleStockChange(orderDetail) {
      let tmpListItems = this.listItems.map(item => {
        let orderItem = orderDetail.products.find(orderProduct => orderProduct.id === item.id) ?? null;
        if (orderItem !== null) {
          item.stock -= orderItem.qty;
        }
        return item;
      });
      this.listItems = [...tmpListItems];
    }
  }
}
</script>

<template>
  <v-container fluid>
    <v-chip-group class="mb-3" v-model="mapleTypeSelected" @change="onChangeMapleTypeSelected()" column multiple selected-class="text-primary">
      <v-chip v-for="(mapleType, index) in listMapleType" :key="index" variant="outlined">
        {{ getMapleName(mapleType) }}
      </v-chip>
    </v-chip-group>
    <v-row dense>
      <v-col v-for="item in filteredProductList" :key="item.id" sm="6" md="3">
        <ProductCard :product="item" style="cursor: pointer" @click="onSelectedProduct(item.id)"/>
      </v-col>
      <ProductDetail :idProduct="selectedProductId" :isOpenProductDetail="openProductDetail" @onCloseCartPopup="handleCloseCartPopup"/>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>