const PARAMS = {
  cat: 'category',
  subcat: 'subcategory',
  search: ['category', 'subcategory', 'name', 'description'],
};

class Fetch {
  #url = 'database/dataBase.json';

  async #getData (calback) {
    const res = await fetch(this.#url);
    calback(await res.json());
  }

  catalog (callback) {
    this.#getData(data => {
      const res = data.reduce((acc, item) => {
        if (!acc.includes(item.category)) {
          acc.push(item.category);
        }
        return acc;
      }, []);

      callback(res);
    });
  }

  subCatalog (catName, callback) {
    this.#getData(data => {
      const res = data.reduce((acc, item) => {
        if (!acc.includes(item.subcategory) && item.category.toLowerCase() ===
          catName.toLowerCase()) {
          acc.push(item.subcategory);
        }
        return acc;
      }, []);

      callback(res);
    });
  }

  goods (key, val, callback) {
    this.#getData(data => {
      const res = data.filter(el => el[PARAMS[key]] === val);

      callback(res);
    });
  }

  wishList (idxArr, callback) {
    this.#getData(data => {
      const res = data.filter(el => idxArr.some(item => el.id === item));

      callback(res);
    });
  }

  search (value, callback) {
    this.#getData(data => {
      const res = data.filter(el => {
        for (const item in el) {
          if (PARAMS.search.includes(item) &&
            el[item].toLowerCase().includes(value.toLowerCase())) {
            return true;
          }
        }
      });

      callback(res);
    });
  }

  post (id, callback) {
    this.#getData(data => {
      const res = data.find(el => el.id === id);

      callback(res);
    });
  }

  cart (cartArr, callback) {
    this.#getData(data => {
      const res = data.filter(el => cartArr.some(item => item.id === el.id));

      callback(res);
    });
  }
}

export default new Fetch();