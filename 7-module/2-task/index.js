import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.render();
    this.addEventListeners();
  }

  render() {
    this.elem = createElement(`
    <div class="modal">
      <div class="modal__overlay"></div>
      <div class="modal__inner">
        <div class="modal__header">
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>
          <h3 class="modal__title">
          </h3>
        </div>
        <div class="modal__body"></div>
      </div>
   </div>
    `);
  }

  open() {
    let body = document.body;
    body.classList.add('is-modal-open');
    body.append(this.elem);
  }

  setTitle(title) {
    let modalTitle = this.elem.querySelector('.modal__title');
    modalTitle.innerHTML = title;
  }

  setBody(node) {
    let bodyContainer = this.elem.querySelector('.modal__body');
    bodyContainer.innerHTML = '';
    bodyContainer.append(node);
  }

  close() {
    let body = document.body;
    body.classList.remove('is-modal-open');
    this.elem.remove();
  }

  addEventListeners() {
    this.elem.addEventListener('click', (event) => {
      let button = event.target.closest('.modal__close');
      if (button) {
        this.close();
      }
    })

    let onKeydown = (event) => {
      if (event.code === 'Escape') {
        this.close();
      }
    };
    document.addEventListener('keydown', onKeydown);
    // document.removeEventListener('keydown', onKeydown);
  };
}
