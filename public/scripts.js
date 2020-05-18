const newProductForm = document.querySelector('#newProductForm');
const daySections = document.querySelectorAll('.daySection');

function getDB() {
  fetch(`http://localhost:8000/api`)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      //printWeek(response.week);
      addProduct(res);
      return res;
    });
}

getDB();

function showModal() {
  newProductForm.classList.add('active');
}

function hideModal() {
  newProductForm.classList.remove('active');
}

function addProduct(res) {
  // e.preventDefault();
  hideModal();

  const newProduct = {
    name: event.target.newProductForm.productName.value,
    type: event.target.productType.value,
  };
}

addProduct();

//   if (event.target.monday.checked) {
//     actualWeek.days[0].products.push(newProduct);
//   }

//   if (event.target.tuesday.checked) {
//     actualWeek.days[1].products.push(newProduct);
//   }

//   if (event.target.wednesday.checked) {
//     actualWeek.days[2].products.push(newProduct);
//   }

//   if (event.target.thursday.checked) {
//     actualWeek.days[3].products.push(newProduct);
//   }

//   if (event.target.friday.checked) {
//     actualWeek.days[4].products.push(newProduct);
//   }

//   if (event.target.saturday.checked) {
//     actualWeek.days[5].products.push(newProduct);
//   }

//   if (event.target.sunday.checked) {
//     actualWeek.days[6].products.push(newProduct);

//   const postConfig = {
//     method: 'put',
//     body: JSON.stringify(actualWeek),
//     headers: {
//       'Content-type': 'application/json',
//     },
//   };

//   fetch(`http://localhost:8000/api`, postConfig)
//     .then(function (response) {
//       return response.json();
//     })

//     .catch((error) => console.error('Error:', error))
//     .then((response) => {
//       console.log('Success:', response);
//       getDB();
//     });
// }

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

// newProductForm.addEventListener('submit', addProduct);
