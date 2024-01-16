import { rest } from '../API/rest.js';
import { handleForm, validateForm } from './components/form.js';
import { showModal, hideModal, deleteProduct } from './components/modals.js';
import '../public/styles.css';

const body = document.querySelector('body');
const form = document.querySelector('form');
const calendar = document.querySelector('.calendar');
const addBtn = document.querySelector('.header__add-button');

const modal = document.querySelector('.modal-confirmation');
const modalOverlay = document.querySelector('.overlay');

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
