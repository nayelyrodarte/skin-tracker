const form = document.querySelector('form');
const addproduct_button = document.querySelector('.form_button');
const submitproduct_button = document.querySelector('.submit_product');
const close_form = document.querySelector('i');
const modal = document.querySelector('.modal');
const checkbox = document.querySelectorAll('input[type="checkbox"]');

addproduct_button.addEventListener('click', showModal);
close_form.addEventListener('click', hideModal);
submitproduct_button.addEventListener('click', addProduct);

function getDB() {
  fetch(`http://localhost:8000/api/routine`)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      //printWeek(response.week);
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

  for (let i = 0; i <= checkbox.length; i++) {
    if (checkbox[i].checked) {
      const day = checkbox[i].value;

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
}

// function printWeek(week) {
//   week.days.forEach((day, index) => {
//     const productCards = day.products.map((product) => {
//       return `<div class="cards">
//             ${product.type}
//             ${product.name}
//             </div>`;
//     });

//     daySections[index].innerHTML = productCards.join('');
//   });
// }
