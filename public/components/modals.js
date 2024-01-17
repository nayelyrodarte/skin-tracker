import { targetHasClass } from '../utils/styling';
import { rest } from '../../API/rest';

const modalConfirmation = document.querySelector('.modal-confirmation');
const modalProduct = document.querySelector('.modal-product');
const modalOverlay = document.querySelector('.overlay');

export function showConfirmationModal(e) {
  if (targetHasClass(e.target, 'product-card__delete-button')) {
    modalProduct.classList.remove('active');
    modalConfirmation.classList.add('active');

    modalConfirmation.innerHTML = `
     <p>¿Estás seguro/a?</p>
     <button type="button" class="modal__delete-button">
       Eliminar producto
     </button>
     <button type="button" class="modal__cancel-button">Cancelar</button>
   `;
  }
}

export function hideAllModals(e) {
  if (targetHasClass(e.target, 'modal__cancel-button')) {
    modalConfirmation.remove('active');
    modalProduct.classList.remove('active');
    modalOverlay.classList.remove('active');
  }
}

export async function deleteProduct(e) {
  let id = localStorage.getItem('pId');

  if (targetHasClass(e.target, 'modal__delete-button') && id) {
    let productToDelete = document.querySelectorAll(`[id="${id}"]`);

    if (productToDelete.length) {
      productToDelete.forEach((item) => {
        item.remove();
        rest.delete(item.id);
      });

      localStorage.removeItem('pId');

      modalConfirmation.classList.remove('active');
      modalOverlay.classList.remove('active');
    }
  }
}
