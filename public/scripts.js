import { rest } from '../API/rest.js';

const body = document.querySelector('body');
const form = document.querySelector('form');
const modal = document.querySelector('.modal');
const modalOverlay = document.querySelector('.modal__overlay');

body.addEventListener('click', showModal);
body.addEventListener('click', hideModal);
body.addEventListener('click', validateForm);
body.addEventListener('click', deleteProduct);

rest.get(printProductCards);

const targetHasClass = (target, className) =>
  target.classList.contains(className);

function showModal(e) {
  if (targetHasClass(e.target, 'header__add-button')) {
    form.classList.add('active');
    modalOverlay.style.display = 'block';
  } else if (
    targetHasClass(e.target, 'product-card__delete-button') ||
    targetHasClass(e.target, 'header__reset-button')
  ) {
    modal.style.display = 'block';
    modalOverlay.style.display = 'block';
  }
}

function hideModal(e) {
  if (targetHasClass(e.target, 'form__close-button')) {
    form.classList.remove('active');
    modalOverlay.style.display = 'none';
  } else if (targetHasClass(e.target, 'modal__cancel-button')) {
    modal.style.display = 'none';
    modalOverlay.style.display = 'none';
  }
}

function printProductCards(res) {
  const calendarContainers = document.querySelectorAll('.calendar__container');

  res.map((productFromDB) => {
    productFromDB.days.map((weekdayFromDB) => {
      calendarContainers.forEach((calendarDay, index) => {
        if (weekdayFromDB === calendarDay.classList[1]) {
          const { name, type, date, _id } = productFromDB;

          let card = `<div class="card" id="${_id}"
          style="background-color: ${cardColors(weekdayFromDB)}">
          <i class="fa fa-times-circle product-card__delete-button"></i>
          <p>${name}</p>
          <p>${type}</p>
          <p>Expira ${formateDate(date)}</p>
          </div>`;

          calendarContainers[index].innerHTML += card;
        }
      });
    });
  });
}

function formateDate(date) {
  if (date !== null) {
    let regex = /(\d{1,4})-(\d{1,2})-(\d{1,2})/;
    let match = date.match(regex);

    const day = match[3];
    const month = match[2];
    const year = match[1];

    return `${day}/${month}/${year}`;
  }
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

function validateForm(e) {
  if (targetHasClass(e.target, 'form__submit-button')) {
    if (
      form.product_name.value === '' ||
      form.product_type.value === '' ||
      form.exp_date.value === ''
    ) {
      e.preventDefault();
      form.classList.add('active');
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

function deleteProduct(e) {
  let productToDelete = '';

  if (targetHasClass(e.target, 'product-card__delete-button')) {
    let id = e.target.parentNode.id;
    productToDelete = document.querySelectorAll(`[id="${id}"]`);
  } else if (targetHasClass(e.target, 'header__reset-button')) {
    productToDelete = document.querySelectorAll('.card');
  }

  document
    .querySelector('.modal__delete-button')
    .addEventListener('click', removeFromDOMAndDatabase(productToDelete));
}

function removeFromDOMAndDatabase(querySelector) {
  querySelector.forEach((item) => {
    item.remove();
    rest.delete(item.id);
  });
}
