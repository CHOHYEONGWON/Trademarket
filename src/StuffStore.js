import { observable, action, computed } from 'mobx';

export default class StuffStore {
    @observable cartStuffs = [];

    constructor() {
        let cartStuffs = localStorage.getItem('cart_stuffs');
        if (cartStuffs == null || cartStuffs.length < 1) {
            cartStuffs = [];
        } else {
            cartStuffs = JSON.parse(cartStuffs);
        }
        this.cartStuffs = cartStuffs
    }

    @action 
    addStuffToCart(stuff) {
        let isAdded = false;
        for (let cartStuff of this.cartStuffs) {
            if (cartStuff.stuff.id === stuff.id) {
                cartStuff.count++;
                isAdded = true;
                break;
            }
        }
        if (!isAdded) {
            this.cartStuffs.push({
                stuff: stuff,
                count: 1
            });
        }
        this.saveCartStuffs();
    }

    @computed
    get cartStuffsCount() {
        return this.cartStuffs.length;
    }

    @action
    clearCartStuffs() {
        this.cartStuffs = [];
        this.saveCartStuffs();
    }

    saveCartStuffs() {
        localStorage.setItem('cart_stuffs', JSON.stringify(this.cartStuffs));
    }
}