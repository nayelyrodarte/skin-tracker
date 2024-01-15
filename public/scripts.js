import { rest } from '../API/rest.js';
import '../public/styles.css';

const body = document.querySelector('body');
const form = document.querySelector('form');
const modal = document.querySelector('.modal');
const modalOverlay = document.querySelector('.modal__overlay');

body.addEventListener('click', showModal);
body.addEventListener('click', hideModal);
body.addEventListener('click', validateForm);
body.addEventListener('click', deleteProduct);
body.addEventListener('click', productDetails);

const data = await rest.get();

if (data) {
  printProductCards(data);
  console.log(data);
}

const targetHasClass = (target, className) =>
  target.classList.contains(className);

function showModal(e) {
  if (targetHasClass(e.target, 'header__add-button')) {
    form.classList.add('active');
    modalOverlay.style.display = 'block';
  } else if (targetHasClass(e.target, 'product-card__delete-button')) {
    modal.style.display = 'block';
    modalOverlay.style.display = 'block';

    modal.innerHTML = `
    <section>
      <p>¿Estás seguro/a?</p>
      <button type="button" class="modal__delete-button">
        Eliminar productos
      </button>
      <button type="button" class="modal__cancel-button">Cancelar</button>
    </section>
    `;
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

function productDetails(e) {
  const id = e.target.id;

  const product = data.find(({ _id }) => _id === id);

  if (product) {
    modalOverlay.style.display = 'block';
    modal.classList.add('active');

    modal.innerHTML = `
    <section id=${id}>
    <p>${product.name}</p>
    <p>${product.type}</p>
    <p>${product.days}</p>
    <button class="product-card__delete-button">Remove product</button>
    </section>
  `;
  }
}

function printProductCards(res) {
  const calendarContainers = document.querySelectorAll('.calendar__container');

  res.map((productFromDB) => {
    productFromDB.days.map((weekdayFromDB) => {
      calendarContainers.forEach((calendarDay, index) => {
        if (weekdayFromDB === calendarDay.classList[1]) {
          const { name, type, date, _id } = productFromDB;

          let card = `<button class="card" id="${_id}"
          style="background-color: ${cardColors(weekdayFromDB)}">
          <p>${name}</p>
          <p>${type}</p>
          </button>`;

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
      return '#4F000B';
      break;
    case 'tuesday':
    case 'sunday':
      return '#720026';
      break;
    case 'wednesday':
      return '#CE4257';
      break;
    case 'thursday':
      return '#FF7F51';
      break;
    case 'friday':
      return '#FF9B54';
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

async function deleteProduct(e) {
  let productToDelete = '';
  let modalDeleteBtn = document.querySelector('.modal__delete-button');

  if (targetHasClass(e.target, 'product-card__delete-button')) {
    let id = e.target.parentNode.id;
    productToDelete = document.querySelectorAll(`[id="${id}"]`);
  } else if (targetHasClass(e.target, 'header__reset-button')) {
    productToDelete = document.querySelectorAll('.card');
  }

  if (productToDelete.length) {
    modalDeleteBtn.addEventListener('click', () => {
      removeFromDOMAndDatabase(productToDelete);
      modal.style.display = 'none';
      modalOverlay.style.display = 'none';
      modal.classList.remove('active');
    });
  }
}

function removeFromDOMAndDatabase(list) {
  list.forEach((item) => {
    item.remove();
    rest.delete(item.id);
  });
}
