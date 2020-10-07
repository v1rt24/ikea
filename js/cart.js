import Fetch from './Fetch.js';
import UserData from './UserData.js';

const cart = () => {
  const
    cartList = document.querySelector('.cart-list'),
    cartTotalPrice = document.querySelector('.cart-total-price')
  ;

  const renderCart = carts => {
    cartList.textContent = '';

    let totalPrice = 0;

    !carts.length ? cartList.insertAdjacentHTML('beforeend',
      `<li>В корзине товаров нет</li>`) : '';

    let cartHtml = '';
    for (const item of carts) {
      let userCount = UserData.cart.find(el => el.id === item.id).count;

      if (userCount > item.count) {
        userCount = item.count;
      }

      let options = '';
      for (let i = 1; i <= item.count; i++) {
        options += `<option
          value="${i}" 
          ${i === userCount ? 'selected' : ''}
          >
            ${i}
          </option>`;
      }

      totalPrice += item.price * userCount;

      cartHtml += `
        <li class="cart-item">
            <div class="product">
                <div class="product__image-container">
                    <img src="${item.img[0]}"
                         alt="${item.name}" 
                         aria-describedby="${name}_${item.id}"
                         itemprop="image">
                </div>
                <div class="product__description">
                    <h3 class="product__name">
                        <a href="card.html#${item.id}">${item.name}</a>
                    </h3>
                    <p class="product_description-text">${item.description}</p>
                </div>
                <div class="product__prices">
                    <div class="product__price-type product__price-type-regular">
                        <div>
                            <div class="product__total product__total-regular">
                                ${item.price * userCount}.-
                            </div>
                            ${userCount > 1
        ? `<div class="product__price-regular">${item.price}.-</div>`
        : ''}
                        </div>
                    </div>
                </div>
                <div class="product__controls">
                    <div class="product-controls__remove">
                        <button type="button" class="btn btn-remove" data-idd="${item.id}">
                            <img src="image/remove-thin-24.16c1cc7a.svg" alt="Удалить товар">
                        </button>
                    </div>
                    <div class="product-controls__quantity">
                        <select data-idd="${item.id}" title="Выберите количество" aria-label="Выберите количество">${options}</select>
                    </div>
                </div>
            </div>
        </li>
      `;
    }

    cartList.insertAdjacentHTML('beforeend', cartHtml);

    cartTotalPrice.textContent = `${totalPrice}.-`;
  };

  const createCart = () => Fetch.cart(UserData.cart, renderCart);

  // Изменение количества товара в карточке и удаление товара с корзины
  const changeDataCarts = () => {
    cartList.addEventListener('change', event => {
      const id = event.target.dataset.idd;
      const count = +event.target.value;
      UserData.changeCart = {id, count};
      createCart();
    });

    cartList.addEventListener('click', event => {
      const btnDel = event.target.closest('.btn-remove');

      if (btnDel) {
        const id = btnDel.dataset.idd;
        UserData.delCart = id;
        createCart();
      }
    });
  };

  if (location.pathname.includes('cart')) {
    createCart();
    changeDataCarts();
  }
};

export default cart;