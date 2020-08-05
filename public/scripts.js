import { getRoutine, postProduct, removeProduct } from '../API/methods.js';

const body = document.querySelector('body');
const form = document.querySelector('form');

// TODO
// Fix date format
// Add loaders

body.addEventListener('click', showModal);
body.addEventListener('click', hideModal);
body.addEventListener('click', addNewProduct);
body.addEventListener('click', deleteCards);

// Get all routine from DB & print UI
getRoutine(printCards);

const targetHasClass = (target, className) =>
  target.classList.contains(className);

function showModal(e) {
  if (targetHasClass(e.target, 'addProduct')) {
    form.classList.add('active');
    document.querySelector('.modalOverlay').classList.add('overlay');
  }
}

function hideModal(e) {
  if (
    targetHasClass(e.target, 'closeFormButton') ||
    targetHasClass(e.target, 'submitProduct')
  ) {
    form.classList.remove('active');
    document.querySelector('.modalOverlay').classList.remove('overlay');
  } else if (
    targetHasClass(e.target, 'cancelButton') ||
    targetHasClass(e.target, 'deleteProduct')
  ) {
    document.querySelector('.deletedProductModal').style.display = 'none';
    document.querySelector('.modalOverlay').classList.remove('overlay');
  }
}

function addNewProduct(e) {
  if (targetHasClass(e.target, 'submitProduct')) {
    const newProduct = {
      name: e.target.form.product_name.value,
      type: e.target.form.product_type.value,
      date: e.target.form.exp_date.value,
      days: [],
    };

    const newProductUsage = document.querySelectorAll('input[type="checkbox"]');

    for (let day of newProductUsage) {
      if (day.checked) {
        newProduct.days.push(day.value);
      }
    }
    // Post product to DB
    postProduct(newProduct);
  }
}

function printCards(res) {
  const calendarContainers = document.querySelectorAll(
    '.calendar>div:nth-of-type(n+8)'
  );

  res.map((productFromDB) => {
    productFromDB.days.map((weekdayFromDB) => {
      calendarContainers.forEach((calendarDay, index) => {
        if (weekdayFromDB === calendarDay.className) {
          const { name, type, date, _id } = productFromDB;

          let card = `<div class="card" id="${_id}"
          style="background-color: ${cardColors(weekdayFromDB)}">
          <i class="far fa-times-circle deleteCard"></i>
          <p>${name}</p>
          <p>${type}</p>
          <p>Expira ${date}</p>
          </div>`;

          calendarContainers[index].innerHTML += card;
        }
      });
    });
  });
}

function cardColors(day) {
  switch (day) {
    case 'monday':
    case 'saturday':
      return '#3F2D76';
      break;
    case 'tuesday':
    case 'sunday':
      return '#5E548E';
      break;
    case 'wednesday':
      return '#9F86C0';
      break;
    case 'thursday':
      return '#BE95C4';
      break;
    case 'friday':
      return '#E0B1CB';
      break;
  }
}

function deleteCards(e) {
  let id;

  if (targetHasClass(e.target, 'deleteCard')) {
    document.querySelector('.deletedProductModal').style.display = 'block';
    document.querySelector('.modalOverlay').classList.add('overlay');
    // get selected card's id
    id = e.target.parentNode.getAttribute('id');

    document.querySelector('.deleteProduct').addEventListener('click', remove);
  }

  function remove() {
    document.querySelectorAll(`[id="${id}"]`).forEach((card) => {
      card.style.display = 'none';
    });
    //remove from DB
    removeProduct(id);
  }
}
