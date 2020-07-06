const form = document.querySelector('form');
const addproduct_button = document.querySelector('.form_button');
const submitproduct_button = document.querySelector('.submit_product');
const close_form = document.querySelector('i');
const modal = document.querySelector('.modal');
const days_selection = document.querySelectorAll('input[type="checkbox"]');
const week_containers = document.querySelectorAll('.grid>div:nth-of-type(n+8)');

addproduct_button.addEventListener('click', showModal);
close_form.addEventListener('click', hideModal);
submitproduct_button.addEventListener('click', addProduct);

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
      week_containers.forEach((day, index) => {
        if (product_day === day.className) {
          let card = `<div class="card">
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
