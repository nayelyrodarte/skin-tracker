const form = document.querySelector('form');
const addproduct_button = document.querySelector('.form_button');
const submitproduct_button = document.querySelector('.submit_product');
const close_form = document.querySelector('form>i');
const modal = document.querySelector('.modal');
const days_selection = document.querySelectorAll('input[type="checkbox"]');
const week_containers = document.querySelectorAll('.grid>div:nth-of-type(n+8)');
const main_grid = document.querySelector('.grid');

// TODO
// Get card items from DOM <-- async
// Delete products functionatility
// Fix date format
// Reloading after adding product
// Add loaders

addproduct_button.addEventListener('click', showModal);
close_form.addEventListener('click', hideModal);
submitproduct_button.addEventListener('click', addProduct);
main_grid.addEventListener('click', deleteCard);

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
  event.preventDefault();
  hideModal();

  const newProduct = {
    name: event.target.form.product_name.value,
    type: event.target.form.product_type.value,
    date: event.target.form.exp_date.value,
    days: [],
  };

  // Days of use checkboxes
  for (week_day of days_selection) {
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
  res.map((db_product) => {
    db_product.days.map((product_day) => {
      week_containers.forEach((week_day, index) => {
        if (product_day === week_day.className) {
          let card = `<div class="card" id="${db_product._id}" 
          style="background-color: ${uiColors(product_day)}">
          <i class="far fa-times-circle close_card"></i>
          <p>${db_product.name}</p>
          <p>${db_product.type}</p>
          <p>Expira ${db_product.date}</p>
          </div>`;

          week_containers[index].innerHTML += card;
        }
      });
    });
  });
}

function uiColors(day) {
  switch (day) {
    case 'monday':
      return '#3F2D76';
      break;
    case 'tuesday':
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

  if (e.target.classList.contains('close_card')) {
    id = e.target.parentNode.getAttribute('id');
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
      return response.json();
    })
    .catch((error) => console.error('Error:', error));
}
