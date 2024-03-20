import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.render();
    this.addEventListeners();
  }

  render() {
    let menu = createElement(`
    <div class="ribbon">
      <button class="ribbon__arrow ribbon__arrow_left">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
      <nav class="ribbon__inner"></nav>
      <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    </div>`);

    let linkContainer = menu.querySelector('.ribbon__inner');
    for (let categories of this.categories) {
      let newLink = createElement(`
      <a href="#" class="ribbon__item" data-id="${categories.id}">${categories.name}</a>
      `);
      linkContainer.append(newLink);
    }
    this.elem = menu;
  }

  addEventListeners() {
    let ribbonInner = this.elem.querySelector('.ribbon__inner');
    let leftButton = this.elem.querySelector('.ribbon__arrow_left');
    let rightButton = this.elem.querySelector('.ribbon__arrow_right');
    let ribbonItems = this.elem.querySelectorAll('.ribbon__item');

    this.elem.addEventListener('click', (event) => {
      let isLeftClick = event.target.closest('.ribbon__arrow_left');
      let isRightClick = event.target.closest('.ribbon__arrow_right');
      let islinkClick = event.target.closest('.ribbon__item');
      if (isLeftClick) {
        ribbonInner.scrollBy(-350, 0);
      } else if (isRightClick) {
        ribbonInner.scrollBy(350, 0);
      } else if (islinkClick) {
        this.elem.preventDefault;
        ribbonItems.forEach(item => item.classList.remove('ribbon__item_active'));
        event.target.classList.add('ribbon__item_active');
        let customEvent = new CustomEvent("ribbon-select", {
          detail: event.target.dataset.id,
          bubbles: true
        });
        this.elem.dispatchEvent(customEvent)
      }

      ribbonInner.addEventListener("scroll", function () {
        let scrollWidth = ribbonInner.scrollWidth;
        let clientWidth = ribbonInner.clientWidth;
        let scrollLeft = ribbonInner.scrollLeft;
        let scrollRight = scrollWidth - scrollLeft - clientWidth;

        if (scrollLeft > 100) {
          leftButton.classList.add('ribbon__arrow_visible');
        } else if (scrollLeft < 100) {
          leftButton.classList.remove('ribbon__arrow_visible');
        };

        if (scrollRight < 100) {
          rightButton.classList.remove('ribbon__arrow_visible');
        } else if (scrollRight > 100) {
          rightButton.classList.add('ribbon__arrow_visible');
        }
      })
    });
  }
}
