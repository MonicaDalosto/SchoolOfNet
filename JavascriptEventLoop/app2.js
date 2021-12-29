const start = () => {
  setTimeout(() => {
    const store = {id: 1, name: 'Magazine XPTO'}
    console.log(store)

    setTimeout((idStore) => {
      const category = { id: 3, title: "Promoções", store_id: idStore}
      console.log(category)

      setTimeout((idCategory) => {
        const products = [
          { id: 1, product: 'TV 32', category_id: idCategory},
          { id: 2, product: 'TV 42', category_id: idCategory},
          { id: 3, product: 'TV 50', category_id: idCategory},
          { id: 4, product: 'TV 55', category_id: idCategory}
        ]
        console.log(products)
      }, 2000, category.id);
    }, 2000, store.id);
  }, 2000)
}
