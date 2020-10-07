import subCatalogLoad from './inc/subCatalog.js';
import { band, band2 } from './utils.js';
import Fetch from './Fetch.js';

const menu = () => {
  const subCatal = subCatalogLoad();

  const
    btnBurger = document.querySelector('.btn-burger'),
    catalog = document.querySelector('.catalog'),
    btnClose = document.querySelector('.btn-close'),
    subCatalog = document.querySelector('.subcatalog'),
    btnReturn = document.querySelector('.btn-return')
  ;

  // Задний фон меню
  const overlay = document.createElement('div');
  overlay.classList.add('overlay');
  document.body.insertAdjacentElement('beforeend', overlay);

  // Открытие меню
  const openMenu = () => {
    band();
    catalog.classList.add('open');
    overlay.classList.add('active');
  };

  // Закрытие меню
  const closeMenu = () => {
    band2();
    catalog.classList.remove('open');
    overlay.classList.remove('active');
    closeSubMenu();
  };

  // Закрытие под меню
  const closeSubMenu = () => {
    subCatalog.classList.remove('subopen');
  };

  // Клик в меню категорий
  const catalogBx = event => {
    const targetLink = event.target.closest('.catalog-list__item a');

    if (targetLink) {
      event.preventDefault();
      const nameCat = decodeURI(targetLink.href).match(/[^=]+$/)[0];
      Fetch.subCatalog(nameCat, data => {
        subCatal(targetLink.textContent, data);
        subCatalog.classList.add('subopen');
      });
    }
  };

  btnBurger.addEventListener('click', openMenu);
  btnClose.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);
  catalog.addEventListener('click', catalogBx);
  btnReturn.addEventListener('click', closeSubMenu);
};

export default menu;