import { rest } from '../API/rest.js';
import '../public/styles.css';

const body = document.querySelector('body');
const form = document.querySelector('form');
const modal = document.querySelector('.modal');
const modalOverlay = document.querySelector('.modal__overlay');
const calendar = document.querySelector('.calendar');
const addBtn = document.querySelector('.header__add-button');

body.addEventListener('click', showModal);
body.addEventListener('click', hideModal);
form.addEventListener('click', validateForm);
modal.addEventListener('click', deleteProduct);
calendar.addEventListener('click', productDetails);
addBtn.addEventListener('click', handleForm);

const targetHasClass = (target, className) =>
  target.classList.contains(className);

const data = await rest.get();

if (data) {
  printProductCards(data);
}

function printProductCards(res) {
  const calendarContainers = document.querySelectorAll('.calendar__container');

  res.map((productFromDB) => {
    productFromDB.days.map((weekdayFromDB) => {
      calendarContainers.forEach((calendarDay, index) => {
        if (weekdayFromDB === calendarDay.classList[1]) {
          const { name, type, date, _id } = productFromDB;

          let card = `<button class="card" id="${_id}">
         <p>${name}</p>
         <p>${type}</p>
         </button>`;

          calendarContainers[index].innerHTML += card;
        }
      });
    });
  });
}

function handleForm(e) {
  form.classList.add('active');
  modalOverlay.classList.add('active');

  if (targetHasClass(e.target, 'form__close-button')) {
    form.classList.remove('active');
    modalOverlay.classList.remove('active');
  }
}

function showModal(e) {
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

function hideModal(e) {
  if (targetHasClass(e.target, 'modal__cancel-button')) {
    modal.classList.remove('active');
    modalOverlay.classList.remove('active');
  }
}

function productDetails(e) {
  const id = e.target.id;
  localStorage.setItem('pId', id);

  const product = data.find(({ _id }) => _id === id);

  if (product) {
    modalOverlay.classList.add('active');
    modal.classList.add('active');

    modal.innerHTML = `
    <p>${product.name}</p>
    <p>${product.type}</p>
    <p>${product.days}</p>
    <button class="product-card__delete-button">Remove product</button>
    <button class="modal__cancel-button">Cancel</button>
  `;
  }
}

function validateForm(e) {
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

function addNewProduct(e) {
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

async function deleteProduct(e) {
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
