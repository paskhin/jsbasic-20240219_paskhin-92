import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, { once: true });

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
    let container = document.querySelector('.container');
    if (!container) return;
    let containerRight = container.getBoundingClientRect().right;
    let scrollTop = document.documentElement.scrollTop;

    if (!this.elem.classList.contains('cart-icon_visible')) {
      return;
    } else {
      this.elem.style.position = 'fixed';
      this.elem.style.zIndex = 999;
    };

    if (this.elem.style.position === 'fixed' && scrollTop < 50 && document.documentElement.clientWidth > 767) {
      Object.assign(this.elem.style, {
        position: '',
        top: '',
        left: '',
        zIndex: ''
      });
    } else if (scrollTop > 50 && document.documentElement.clientWidth > 767) {
      let containerLeft = container.getBoundingClientRect().left;
      if (containerLeft >= this.elem.offsetWidth + 30) {
        this.elem.style.left = containerRight + 20 + 'px';
      } else {
        this.elem.style.left = document.documentElement.clientWidth - this.elem.offsetWidth - 10 + 'px';
      }
    }
  }
}
