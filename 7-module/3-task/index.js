import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.render();
    this.addEventListeners();
  }

  render() {
    let slider = createElement(`
    <div class="slider">

    <div class="slider__thumb" style="left: ${this.value * (100 / this.steps)}%;">
      <span class="slider__value">${this.value}</span>
    </div>

    <div class="slider__progress" style="width: ${this.value * (100 / this.steps)}%;"></div>

    <div class="slider__steps">
    </div>
  </div>
`)

    let sliderSteps = slider.querySelector('.slider__steps');
    for (let i = 0; i < this.steps; i++) {
      let step = createElement(`
        <span></span>
  `);
      if (i == this.value) {
        step.classList.add('slider__step-active')
      }
      sliderSteps.append(step);
    }

    this.elem = slider;
  }

  addEventListeners() {
    let value = this.elem.querySelector('.slider__value');
    let stepsContainer = this.elem.querySelector('.slider__steps');
    let spans = stepsContainer.querySelectorAll('span');
    let sliderThumb = this.elem.querySelector('.slider__thumb');
    let sliderProgress = this.elem.querySelector('.slider__progress');
    this.elem.addEventListener('click', (event) => {
      let sliderSegment = 100 / (spans.length - 1);
      let sliderWidth = this.elem.clientWidth / 100;
      let sliderCoord = this.elem.getBoundingClientRect();
      let clickCoordLeft = event.clientX - sliderCoord.left;
      let clickToPercent = clickCoordLeft / sliderWidth / sliderSegment;
      spans.forEach((span, index) => {
        span.classList.remove('slider__step-active');
        if (index == Math.round(clickToPercent)) {
          span.classList.add('slider__step-active');
          value.textContent = index;
          sliderThumb.style.left = `${sliderSegment * index}%`;
          sliderProgress.style.width = `${sliderSegment * index}%`;
          this.value = index;
          let customEvent = new CustomEvent("slider-change", {
            detail: this.value,
            bubbles: true
          });
          this.elem.dispatchEvent(customEvent)
        }
      });
    })
  }
}
