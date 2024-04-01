import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.render();
  }

  render() {
    this.elem = createElement(`<div class="products-grid">
      <div class="products-grid__inner"></div>
    </div>`);

    this.renderContent();
  }

  renderContent() {
    this.sub('inner').innerHTML = '';

    for (let product of this.products) {
      if (this.filters.noNuts && product.nuts) {continue;}

      if (this.filters.vegeterianOnly && !product.vegeterian) {continue;}

      if (this.filters.maxSpiciness !== undefined && product.spiciness > this.filters.maxSpiciness) {
        continue;
      }

      if (this.filters.category && product.category != this.filters.category) {
        continue;
      }

      let card = new ProductCard(product);
      this.sub("inner").append(card.elem);

    }
  }

  updateFilter(filters) {
    Object.assign(this.filters, filters);
    this.renderContent();
  }

  sub(ref) {
    return this.elem.querySelector(`.products-grid__${ref}`);
  }

}

// export default class ProductGrid {
//   constructor(products) {
//     this.products = products;
//     this.filters = {};
//     this.render();

//   }

//   render() {
//     let cardList = createElement(`
//       <div class="products-grid">
//         <div class="products-grid__inner">
//         </div>
//       </div>
//     `)
//     this.elem = cardList;
//     let productsGridInner = this.elem.querySelector('.products-grid__inner');
//     this.products.forEach((product) => {
//       let card = new ProductCard({
//         name: product.name,
//         price: product.price,
//         category: product.category,
//         image: product.image,
//         id: product.id,
//         spiciness: product.spiciness,
//         nuts: product.nuts,
//         vegeterian: product.vegeterian
//       });
//       productsGridInner.append(card.elem);
//     })
//   }
//   updateFilter(filters) {
//     let productsGridInner = this.elem.querySelector('.products-grid__inner');
//     let newArr = [...this.products];

//     if (filters.category) {
//       newArr = newArr.filter((product) => {
//         if ( filters.category === product.category) {
//           return product
//         }
//       })
//     } else if (filters.noNuts) {
//       newArr = newArr.filter((product) => {
//         if (!product.nuts) {
//           return product
//         }
//       })
//     } else if (filters.vegeterianOnly) {
//       newArr = newArr.filter((product) => {
//         if (product.vegeterian) {
//           return product
//         }
//       })
//     } else if (filters.maxSpiciness) {
//       newArr = newArr.filter((product) => {
//         if (product.spiciness <= filters.maxSpiciness) {
//           return product
//         }
//       })
//     }
//      let cardOld = this.elem.querySelectorAll('.card');
//      cardOld.forEach(card => card.remove())
//      newArr.forEach((product) => {
//       let card = new ProductCard({
//         name: product.name,
//         price: product.price,
//         category: product.category,
//         image: product.image,
//         id: product.id,
//         spiciness: product.spiciness,
//         nuts: product.nuts,
//         vegeterian: product.vegeterian
//       });
//       productsGridInner.append(card.elem);
//     })
//   }
// }

