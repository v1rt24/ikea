import { getLoacalStorage, setLocalStorage } from './utils.js';

class UserData {
  // Список желаний
  #wishListData = getLoacalStorage('wishList');

  get wishList () {
    return this.#wishListData;
  }

  set wishList (id) {
    if (!this.#wishListData.includes(id)) {
      this.#wishListData.push(id);
    }
    else {
      const idx = this.#wishListData.findIndex(el => el.id === id);
      this.#wishListData.splice(idx, 1);
    }

    setLocalStorage('wishList', this.wishList);
  }

  // Корзина
  #cartData = getLoacalStorage('cart');

  get cart () {
    return this.#cartData;
  }

  set cart (id) {
    let el = this.#cartData.find(el => el.id === id);

    if (el) {
      el.count++;
    }
    else {
      el = {
        id,
        count: 1,
      };
      this.#cartData.push(el);
    }

    setLocalStorage('cart', this.cart);
  }

  set changeCart ({id, count}) {
    const cart = this.#cartData.find(el => el.id === id);

    if (cart) {
      cart.count = count;
      setLocalStorage('cart', this.cart);
    }
  }

  set delCart (id) {
    const idx = this.#cartData.findIndex(el => el.id === id);
    this.#cartData.splice(idx, 1);
    setLocalStorage('cart', this.cart);
  }
}

export default new UserData();