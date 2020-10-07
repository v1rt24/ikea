import Fetch from './Fetch.js';
import UserData from './UserData.js';

const oneProduct = () => {
  if (location.hash && location.pathname.includes('card')) {
    const COUNT_PRODUCT = 6;

    const hash = location.hash.substring(1);

    const
      breadcrumbLink = document.querySelectorAll('.breadcrumb__link'),
      goodImages = document.querySelector('.good-images'),
      goodItemNew = document.querySelector('.good-item__new'),
      goodItemHeader = document.querySelector('.good-item__header'),
      goodItemDescription = document.querySelector('.good-item__description'),
      goodItemEmpty = document.querySelector('.good-item__empty'),
      goodItemPriceValue = document.querySelector('.good-item__price-value'),
      btnGood = document.querySelector('.btn-good'),
      btnAddWishlist = document.querySelector('.btn-add-wishlist')
    ;

    const renderPost = data => {
      document.title = data.name;

      // Хлебные крошки
      breadcrumbLink[0].textContent = data.category;
      breadcrumbLink[0].href = `goods.html?cat=${data.category}`;

      breadcrumbLink[1].textContent = data.subcategory;
      breadcrumbLink[1].href = `goods.html?subcat=${data.subcategory}`;

      breadcrumbLink[2].textContent = data.name;

      // Изображения
      let loadImg = '';
      for (const item of data.img) {
        loadImg += `
          <div class="good-image__item">
            <img src="${item}" alt="${data.name}">
        </div>
        `;
      }
      goodImages.insertAdjacentHTML('beforeend', loadImg);

      // Новинка
      data.count > COUNT_PRODUCT ? goodItemNew.style.display = 'block' : '';

      // Название товара
      goodItemHeader.textContent = data.name;

      // Описание товара
      goodItemDescription.textContent = data.description;

      // Нет в наличии
      if (!data.count) {
        goodItemEmpty.style.display = 'block';
        btnGood.remove();
      }

      // Стоимость товара
      goodItemPriceValue.textContent = data.price;

      // Кнопки
      btnGood.dataset.idd = btnAddWishlist.dataset.idd = data.id;

      // Отслеживание кнопок
      btnGood.addEventListener('click', () => {
        const id = btnGood.dataset.idd;
        UserData.cart = id;
      });

      const toggleClass = () => {
        if (UserData.wishList.includes(data.id)) {
          btnAddWishlist.classList.add('contains-wishlist');
        }
        else {
          btnAddWishlist.classList.remove('contains-wishlist');
        }
      };
      toggleClass();

      btnAddWishlist.addEventListener('click', () => {
        const id = btnAddWishlist.dataset.idd;
        UserData.wishList = id;
        toggleClass();
      });

    };

    Fetch.post(hash, renderPost);
  }
};

export default oneProduct;