import { reactive } from 'vue'

export const store = reactive({
    cartItem: 0,
    incrementCartItem() {
        this.cartItem++;
    },
    reinitializeCartItem() {
        this.cartItem = 0;
    },
    isInfo: false,
    infoText: '',
    infoType: ''
});