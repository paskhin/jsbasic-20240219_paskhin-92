import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.render();
    this.addEventListeners();
  }

  render() {
    let carusel = createElement(`
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner">
        </div>
      </div>
    `);

    let slideContainer = carusel.querySelector('.carousel__inner');
    for (let slied of this.slides) {
      let newSlide = createElement(`
        <div class="carousel__slide" data-id="${slied.id}">
          <img src="/assets/images/carousel/${slied.image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
              <span class="carousel__price">€${slied.price.toFixed(2)}</span>
            <div class="carousel__title">${slied.name}</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>
      `);
      slideContainer.append(newSlide);
    }
    this.elem = carusel;
  }

  addEventListeners() {
    let buttonLeft = this.elem.querySelector('.carousel__arrow_left');
    let buttonRight = this.elem.querySelector('.carousel__arrow_right');
    let sliderList = this.elem.querySelector('.carousel__inner');
    let slides = this.elem.querySelectorAll('.carousel__slide');
    let slideWidth = sliderList.offsetWidth;
    let counter = 0;
    buttonLeft.style.display = 'none';

    this.elem.addEventListener('click', (event) => {
      let button = event.target.closest('.carousel__button');
      let isLeftClick = event.target.closest('.carousel__arrow_left');
      let isRightClick = event.target.closest('.carousel__arrow_right');
      slideWidth = sliderList.offsetWidth;
      if (button) {
        let customEvent = new CustomEvent("product-add", {
          detail: this.slides[counter].id,
          bubbles: true
        });
        this.elem.dispatchEvent(customEvent)
      } else if (isLeftClick) {
        counter--;
        buttonLeft.style.display = counter > 0 ? '' : 'none';
        buttonRight.style.display = '';
      } else if (isRightClick) {
        counter++;
        buttonLeft.style.display = '';
        buttonRight.style.display = counter >= slides.length - 1 ? 'none' : '';
      }

      if (isLeftClick || isRightClick) {
        let offset = -slideWidth * counter;
        sliderList.style.transform = `translateX(${offset}px)`;
      }
    })
  }
}



