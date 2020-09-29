import { rest } from '../API/rest.js';

const body = document.querySelector('body');
const form = document.querySelector('form');

body.addEventListener('click', showModal);
body.addEventListener('click', hideModal);
body.addEventListener('click', addNewProduct);
body.addEventListener('click', deleteCards);

rest.get(printProductCards);

const targetHasClass = (target, className) =>
  target.classList.contains(className);

function showModal(e) {
  if (targetHasClass(e.target, 'addProduct')) {
    form.classList.add('active');
    document.querySelector('.modalOverlay').classList.add('overlay');
  } else if (targetHasClass(e.target, 'deleteCardButton')) {
    document.querySelector('.deletedProductModal').style.display = 'block';
    document.querySelector('.modalOverlay').classList.add('overlay');
  }
}

function hideModal(e) {
  if (
    targetHasClass(e.target, 'closeFormButton') ||
    targetHasClass(e.target, 'submitProductButton')
  ) {
    form.classList.remove('active');
    document.querySelector('.modalOverlay').classList.remove('overlay');
  } else if (
    targetHasClass(e.target, 'cancel') ||
    targetHasClass(e.target, 'delete')
  ) {
    document.querySelector('.deletedProductModal').style.display = 'none';
    document.querySelector('.modalOverlay').classList.remove('overlay');
  }
}

function addNewProduct(e) {
  if (targetHasClass(e.target, 'submitProductButton')) {
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
}

function printProductCards(res) {
  const calendarContainers = document.querySelectorAll(
    '.calendar-container>div:nth-of-type(n+8)'
  );

  res.map((productFromDB) => {
    productFromDB.days.map((weekdayFromDB) => {
      calendarContainers.forEach((calendarDay, index) => {
        if (weekdayFromDB === calendarDay.className) {
          const { name, type, date, _id } = productFromDB;

          let card = `<div class="card" id="${_id}"
          style="background-color: ${cardColors(weekdayFromDB)}">
          <i class="fa fa-times-circle deleteCardButton"></i>
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

function deleteCards(e) {
  let cardToDeleteId;

  if (targetHasClass(e.target, 'deleteCardButton')) {
    cardToDeleteId = e.target.parentNode.getAttribute('id');
    document
      .querySelector('button.delete')
      .addEventListener('click', removeFromDOMAndDatabase);
  }

  function removeFromDOMAndDatabase() {
    document.querySelectorAll(`[id="${cardToDeleteId}"]`).forEach((card) => {
      card.style.display = 'none';
    });
    rest.delete(cardToDeleteId);
  }
}
