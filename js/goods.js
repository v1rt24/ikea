import Fetch from './Fetch.js';
import UserData from './UserData.js';

const renderGoods = data => {
  const COUNT_PRODUCT = 6;

  const goodsList = document.querySelector('.goods-list');

  if (!data.length) {
    const goods = document.querySelector('.goods');
    goods.textContent = location.search === '?wishlist'
      ? 'Список желаний пуст'
      : 'Товары не найдены';
  }

  let goodsHtml = '';
  for (const product of data) {
    goodsHtml += `
      <li class="goods-list__item">
        <a class="goods-item__link" href="card.html#${product.id}">
          <article class="goods-item">
            <div class="goods-item__img">
              <img 
                   src="${product.img[0]}"
                   ${product.img[1]
      ? `data-second-image="${product.img[1]}"`
      : ''}
                   alt="${product.title}"
              >
            </div>
            ${product.count > COUNT_PRODUCT
      ? '<p class="goods-item__new">Новинка</p>'
      : ''}
            <h3 class="goods-item__header">${product.name}</h3>
            <p class="goods-item__description">${product.description}</p>
            <p class="goods-item__price">
              <span class="goods-item__price-value">${product.price}</span>
              <span class="goods-item__currency"> ₽</span>
            </p>
            <button class="btn btn-add-card" aria-label="Добравить в корзину" data-idd="${product.id}"></button>
          </article>
        </a>
      </li>
    `;
  }

  goodsList.insertAdjacentHTML('beforeend', goodsHtml);

  // Добавление в корзину
  goodsList.addEventListener('click', event => {
    const btn = event.target.closest('.btn-add-card');

    if (btn) {
      event.preventDefault();
      const id = btn.dataset.idd;
      UserData.cart = id;
    }
  });
};

const goods = () => {
  if (location.pathname.includes('goods') && location.search) {
    const mainHeader = document.querySelector('.main-header');

    const search = decodeURI(location.search).substring(1);
    const key = search.split('=')[0];
    const value = search.split('=')[1];

    if (key === 'cat' || key === 'subcat') {
      document.title = mainHeader.textContent = value;
      Fetch.goods(key, value, renderGoods);
    }
    else if (key === 'wishlist') {
      document.title = mainHeader.textContent = 'Список желаний';
      Fetch.wishList(UserData.wishList, renderGoods);
    }
    else if (key === 's') {
      document.title = mainHeader.textContent = `Поиск: ${value}`;
      Fetch.search(value, renderGoods);
    }
  }
};

export default goods;