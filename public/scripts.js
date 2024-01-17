import { rest } from '../API/rest.js';
import { handleForm, validateForm } from './components/form.js';
import {
  showConfirmationModal,
  hideAllModals,
  deleteProduct,
} from './components/modals.js';
import '../public/styles.css';

const body = document.querySelector('body');

//modals
const modal = document.querySelector('.modal-confirmation');
const modalOverlay = document.querySelector('.overlay');

body.addEventListener('click', showConfirmationModal);
body.addEventListener('click', hideAllModals);
modal.addEventListener('click', deleteProduct);

// form
const form = document.querySelector('form');
form.addEventListener('click', validateForm);

// calendar grid
const calendar = document.querySelector('.calendar');
const addBtn = document.querySelector('.header__add-button');

calendar.addEventListener('click', displayProductDetails);
addBtn.addEventListener('click', handleForm);

const data = await rest.get();

if (data) {
  renderProductCards(data);
}

function renderProductCards(data) {
  const calendarContainers = document.querySelectorAll('.calendar__container');

  data.map((productFromDB) => {
    productFromDB.days.map((weekdayFromDB) => {
      calendarContainers.forEach((calendarDay, index) => {
        if (weekdayFromDB === calendarDay.classList[1]) {
          const { name, type, _id } = productFromDB;

          let card = `
         <button class="card" id="${_id}">
          <p>${name}</p>
          <p>${type}</p>
         </button>`;

          calendarContainers[index].innerHTML += card;
        }
      });
    });
  });
}

function displayProductDetails(e) {
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
