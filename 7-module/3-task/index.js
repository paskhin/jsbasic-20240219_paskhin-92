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
        <span id = '${i}'></span>
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
      let oneOfsliderWidth = this.elem.clientWidth / 100;
      let sliderCoord = this.elem.getBoundingClientRect();
      let clickCoordLeft = event.clientX - sliderCoord.left;
      let clickToPercent = clickCoordLeft / oneOfsliderWidth / sliderSegment;
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
    });



    this.elem.addEventListener('pointerdown', (mouseDownEvent) => {
      this.elem.ondragstart = () => false;

      let thumb = mouseDownEvent.target.closest('.slider__thumb');
      let coordThumb = sliderThumb.getBoundingClientRect().left;
      // let shiftThumb = mouseDownEvent.clientX - coordThumb;

      if (thumb) {
        sliderThumb.style.position = 'absolute';
        sliderThumb.style.zIndex = 99999999;
        this.elem.classList.add('slider_dragging');
      }


      let calcLeftByEvent = (event) => {
        let newLeft = (event.clientX - this.elem.getBoundingClientRect().left) / this.elem.offsetWidth;

        if (newLeft < 0) { newLeft = 0; }
        if (newLeft > 1) { newLeft = 1; }

        return newLeft;
      }


      let onMouseMove = (mouseMoveEvent) => {


        mouseMoveEvent.preventDefault();

        let newLeft = calcLeftByEvent(mouseMoveEvent);

        this.elem.querySelector('.slider__thumb').style.left = `${newLeft * 100}%`;
        this.elem.querySelector('.slider__progress').style.width = `${newLeft * 100}%`;


        this.value = Math.round((this.steps - 1) * newLeft);
        this.elem.querySelector('.slider__value').innerHTML = this.value;

        if (this.elem.querySelector('.slider__step-active')) {
          this.elem.querySelector('.slider__step-active').classList.remove('slider__step-active');
        }

        this.elem.querySelector('.slider__steps').children[this.value].classList.add('slider__step-active');




      }
      document.addEventListener('pointermove', onMouseMove);

      document.addEventListener('pointerup', () => {
        document.removeEventListener('pointermove', onMouseMove);
        sliderThumb.onmouseup = null;
        this.elem.classList.remove('slider_dragging');
        let customEventMove = new CustomEvent("slider-change", {
          detail: this.value,
          bubbles: true
        });
        this.elem.dispatchEvent(customEventMove)
      })
    })
  }
}
