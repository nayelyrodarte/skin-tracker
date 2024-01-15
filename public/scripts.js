import { rest } from '../API/rest.js';
import { handleForm, deleteProduct, validateForm } from './components/form.js';
import '../public/styles.css';
import { targetHasClass } from './utils/styling.js';

const body = document.querySelector('body');
const form = document.querySelector('form');
const calendar = document.querySelector('.calendar');
const addBtn = document.querySelector('.header__add-button');

export const modal = document.querySelector('.modal');
export const modalOverlay = document.querySelector('.modal__overlay');

body.addEventListener('click', showModal);
body.addEventListener('click', hideModal);
form.addEventListener('click', validateForm);
modal.addEventListener('click', deleteProduct);
calendar.addEventListener('click', productDetails);
addBtn.addEventListener('click', handleForm);

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
          const { name, type, _id } = productFromDB;

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
