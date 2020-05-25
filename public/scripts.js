const form = document.querySelector('form');
const addproduct_button = document.querySelector('.form_button');
const submitproduct_button = document.querySelector('.submit_product');
const close_form = document.querySelector('i');
const modal = document.querySelector('.modal');
const days_selection = document.querySelectorAll('input[type="checkbox"]');
const week_containers = document.querySelectorAll('.content');

addproduct_button.addEventListener('click', showModal);
close_form.addEventListener('click', hideModal);
submitproduct_button.addEventListener('click', addProduct);

//TO DO
// Delete cards
// Delete whole routine

function getDB() {
  fetch(`http://localhost:8000/api/routine`)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      printRoutine(res);
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

function addProduct(e) {
  e.preventDefault();
  hideModal();

  const newProduct = {
    name: event.target.form.product_name.value,
    type: event.target.form.product_type.value,
    date: event.target.form.exp_date.value,
  };

  for (week_day of days_selection) {
    if (week_day.checked) {
      const day = week_day.value;

      console.log(day, newProduct);

      const put = {
        method: 'put',
        body: JSON.stringify(newProduct),
        headers: {
          'Content-type': 'application/json',
        },
      };

      fetch(`http://localhost:8000/api/routine/${day}`, put)
        .then((response) => {
          console.log('Success:', response);
          return response.json();
        })
        .catch((error) => console.error('Error:', error));
    }
  }
  //getDB();
}

function printRoutine(res) {
  res.forEach((day, index) => {
    for (let i = 0; i < day.products.length; i++) {
      let cards = `<div class="card">
    <p>${day.products[i].name}</p>
    <p>${day.products[i].type}</p>
    <p>Expira ${day.products[i].date}</p>
    </div>
    `;

      week_containers[index].innerHTML += cards;
    }
  });
}

printRoutine();
