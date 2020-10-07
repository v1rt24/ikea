const subCatalog = () => {

  const contentSubCatalog = document.createElement('div');
  contentSubCatalog.classList.add('subcatalog');
  contentSubCatalog.insertAdjacentHTML('beforeend', `
    <button type="button" class="btn btn-return catalog-btn" aria-expanded="true" title="Закрыть меню"
                aria-label="Закрыть меню">
        <svg focusable="false" class="svg-icon  hnf-svg-icon" width="24" height="24" viewBox="0 0 24 24" fill="none"
             xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M4.70613 11.2927L3.99902 11.9997L4.70606 12.7069L11.999 20.0008L13.4133 18.5867L7.82744 13.0001H19.9999V11.0001H7.82729L13.4144 5.41328L12.0002 3.99902L4.70613 11.2927Z"></path>
        </svg>
    </button>
  `);

  const h3 = document.createElement('h3');
  h3.classList.add('subcatalog-header');

  const ul = document.createElement('ul');
  ul.classList.add('subcatalog-list');

  const catalog = (title, lists) => {

    h3.textContent = ul.textContent = '';

    let li = '';
    for (const item of lists) {
      li += `<li class="subcatalog-list__item"><a href="goods.html?subcat=${item}">${item}</a></li>`;
    }

    h3.insertAdjacentHTML('beforeend', `
      <h3 class="subcatalog-header"><a href="goods.html?cat=${title}">${title}</a></h3>
    `);

    ul.insertAdjacentHTML('beforeend', li);

  };

  contentSubCatalog.append(h3);
  contentSubCatalog.append(ul);

  document.body.append(contentSubCatalog);

  return catalog;
};

export default subCatalog;
