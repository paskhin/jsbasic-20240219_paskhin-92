import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.open();
    this.addEventListeners();
  }

  open() {
    let body = document.body;
    let modal = createElement(`
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
    body.classList.add('is-modal-open');
    this.elem = modal;
    body.append(modal);
  }

  setTitle(title) {
    let modalTitle = document.querySelector('.modal__title');
    modalTitle.innerHTML = title;
  }

  setBody(node) {
    let bodyContainer = document.querySelector('.modal__body');
    bodyContainer.innerHTML = '';
    bodyContainer.append(node);
  }

  close() {
    let body = document.body;
    let modal = body.querySelector('.modal');
    body.classList.remove('is-modal-open');
    modal.remove();
  }

  addEventListeners() {
    this.elem.addEventListener('click', (event) => {
      let button = event.target.closest('.modal__close');
      if (button) {
        this.close();
      }
    })

    let onKeydown = function (event) {
      if (event.code === 'Escape') {
        let body = document.body;
        body.classList.remove('is-modal-open');
        let modal = body.querySelector('.modal');
        modal.remove();
      }
    };
    document.addEventListener('keydown', onKeydown);
    // document.removeEventListener('keydown', onKeydown);
  };
}
