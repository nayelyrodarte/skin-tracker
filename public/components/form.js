import { rest } from '../../API/rest';
import { targetHasClass } from '../utils/styling';

const form = document.querySelector('form');
const modal = document.querySelector('.modal');
const modalOverlay = document.querySelector('.modal__overlay');

export function handleForm(e) {
  form.classList.add('active');
  modalOverlay.classList.add('active');

  if (targetHasClass(e.target, 'form__close-button')) {
    form.classList.remove('active');
    modalOverlay.classList.remove('active');
  }
}

export function validateForm(e) {
  if (targetHasClass(e.target, 'form__submit-button')) {
    const { product_name, product_type, exp_date } = form;
    if (
      product_name.value === '' ||
      product_type.value === '' ||
      exp_date.value === ''
    ) {
      e.preventDefault();
      document.querySelector('.alert').textContent =
        'Completa todos los campos';
    } else {
      addNewProduct(e);
    }
  }
}

export function addNewProduct(e) {
  const newProduct = {
    name: e.target.form.product_name.value,
    type: e.target.form.product_type.value,
    date: e.target.form.exp_date.value.toString(),
    days: [],
  };

  const daysOfUseCheckboxes = document.querySelectorAll(
    'input[type="checkbox"]'
  );

  for (let checkbox of daysOfUseCheckboxes) {
    if (checkbox.checked) {
      newProduct.days.push(checkbox.value);
    }
  }
  rest.post(newProduct);
}

export async function deleteProduct(e) {
  let id = localStorage.getItem('pId');

  if (targetHasClass(e.target, 'modal__delete-button') && id) {
    let productToDelete = document.querySelectorAll(`[id="${id}"]`);

    if (productToDelete.length) {
      removeFromDOMAndDatabase(productToDelete);
      modal.classList.remove('active');
      modalOverlay.classList.remove('active');
    }
  }
}

function removeFromDOMAndDatabase(list) {
  list.forEach((item) => {
    item.remove();
    rest.delete(item.id);
  });
  localStorage.removeItem('pId');
}
