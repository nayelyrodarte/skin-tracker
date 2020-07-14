const form = document.querySelector('form');
const addProductBtn = document.querySelector('.form_button');
const submitProductBtn = document.querySelector('.submit_product');
const closeFormBtn = document.querySelector('form>i');
const modal = document.querySelector('.modal');
const daysOfUse = document.querySelectorAll('input[type="checkbox"]');
const weeklyContainers = document.querySelectorAll(
  '.grid>div:nth-of-type(n+8)'
);
const mainGrid = document.querySelector('.grid');

// TODO
// Delete card from DOM then from DB
// Fix date format
// Add loaders

addProductBtn.addEventListener('click', showModal);
closeFormBtn.addEventListener('click', hideModal);
submitProductBtn.addEventListener('click', addProduct);
mainGrid.addEventListener('click', deleteCard);

async function getDB() {
  const DB = await fetch(`http://localhost:8000/api/routine`)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      print(res);
      return res;
    });
}

getDB();

function showModal() {
  form.classList.add('active');
  modal.classList.add('overlay');
}

function hideModal() {
  form.classList.remove('active');
  modal.classList.remove('overlay');
}

function addProduct(event) {
  hideModal();

  const newProduct = {
    name: event.target.form.product_name.value,
    type: event.target.form.product_type.value,
    date: event.target.form.exp_date.value,
    days: [],
  };

  // Days of use checkboxes
  for (week_day of daysOfUse) {
    if (week_day.checked) {
      const day = week_day.value;
      newProduct.days.push(day);
    }
  }

  const post = {
    method: 'post',
    body: JSON.stringify(newProduct),
    headers: {
      'Content-type': 'application/json',
    },
  };

  fetch(`http://localhost:8000/api/routine/`, post)
    .then((response) => {
      console.log('Success:', response);
      return response.json();
    })
    .catch((error) => console.error('Error:', error));
}

function print(res) {
  res.map((dbProduct) => {
    dbProduct.days.map((dbDayOfUse) => {
      weeklyContainers.forEach((weekDay, index) => {
        if (dbDayOfUse === weekDay.className) {
          const { name, type, date, _id } = dbProduct;

          let card = `<div class="card" id="${_id}" 
          style="background-color: ${uiColors(dbDayOfUse)}">
          <i class="far fa-times-circle close_card"></i>
          <p>${name}</p>
          <p>${type}</p>
          <p>Expira ${date}</p>
          </div>`;

          weeklyContainers[index].innerHTML += card;
        }
      });
    });
  });
}

function uiColors(day) {
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

function deleteCard(e) {
  let id;
  let cards;

  if (e.target.classList.contains('close_card')) {
    id = e.target.parentNode.getAttribute('id');
    cards = document.querySelectorAll(`[id="${id}"]`);
  }

  function removeFromDOM() {
    cards.forEach((card) => {
      card.style.display = 'none';
    });
  }

  const remove = {
    method: 'delete',
    headers: {
      'Content-type': 'application/json',
    },
  };

  fetch(`http://localhost:8000/api/routine/${id}`, remove)
    .then((response) => {
      console.log('Success:', response);
      removeFromDOM();
      return response.json();
    })
    .catch((error) => console.error('Error:', error));
}
