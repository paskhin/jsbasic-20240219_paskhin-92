
export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if (!product) {
      return;
    }

    let cartItem = this.cartItems.find(item => item.product.id == product.id);

    if (!cartItem) {
      cartItem = {
        product: {
          name: product.name,
          price: product.price,
          category: product.category,
          image: product.image,
          id: product.id
        },
        count: 1
      }
      this.cartItems.push(cartItem);
    } else {
      cartItem.count++;
    }
    this.onProductUpdate(cartItem);
  }


  updateProductCount(productId, amount) {
    this.cartItems.forEach((item, i) => {
      if (item.product.id == productId) {
        item.count = item.count + amount;
        if (item.count == 0) { this.cartItems.splice(i, 1) }
      }
      this.onProductUpdate(item);
    })
  }

  onProductUpdate() {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    return this.cartItems.reduce((sum, current) => sum + current.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((sum, current) => sum + (current.product.price * current.count), 0);
  }
}

