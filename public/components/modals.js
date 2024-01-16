import { targetHasClass } from '../utils/styling';

const modal = document.querySelector('.modal');
const modalOverlay = document.querySelector('.modal__overlay');

export function showModal(e) {
  if (targetHasClass(e.target, 'product-card__delete-button')) {
    modal.classList.add('active');

    modal.innerHTML = `
     <p>¿Estás seguro/a?</p>
     <button type="button" class="modal__delete-button">
       Eliminar producto
     </button>
     <button type="button" class="modal__cancel-button">Cancelar</button>
   `;
  }
}

export function hideModal(e) {
  if (targetHasClass(e.target, 'modal__cancel-button')) {
    modal.classList.remove('active');
    modalOverlay.classList.remove('active');
  }
}
