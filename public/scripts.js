

// FUNCIONALIDAD DEL FRONT

const newProductForm = document.querySelector("#newProductForm");

const daySections = document.querySelectorAll(".daySection")
// const mondaySection = document.querySelector(".mon");
// const tuesdaySection = document.querySelector(".tue");
// const wednesdaySection = document.querySelector(".wed");
// const thursdaySection = document.querySelector(".thurs");
// const fridaySection = document.querySelector(".fri");
// const saturdaySection = document.querySelector("sat");
// const sundaySection = document.querySelector(".sun");


function showModal() {

    newProductForm.classList.add("active")

}

function hideModal() {
    newProductForm.classList.remove("active")
}

let actualWeek;

function getWeek() {

    fetch(`http://localhost:8000/api/week`, { method: "get" })
        .then(function (response) {
            return response.json()
        })
        .then(function (response) {
            console.log(response)
            printWeek(response.week)
            actualWeek = response.week;
            return (response)
        })

}

getWeek();

// manejar los datos del formulario
newProductForm.addEventListener("submit", function (event) {
    event.preventDefault(); // para que no haga refresh

    hideModal();

    const newProduct =
    {
        name: event.target.productName.value,
        type: event.target.productType.value
    }


    if (event.target.monday.checked) {
        actualWeek.days[0].products.push(newProduct);
    }

    if (event.target.tuesday.checked) {
        actualWeek.days[1].products.push(newProduct);
    }

    if (event.target.wednesday.checked) {
        actualWeek.days[2].products.push(newProduct);
    }

    if (event.target.thursday.checked) {
        actualWeek.days[3].products.push(newProduct);
    }

    if (event.target.friday.checked) {
        actualWeek.days[4].products.push(newProduct);
    }

    if (event.target.saturday.checked) {
        actualWeek.days[5].products.push(newProduct);
    }

    if (event.target.sunday.checked) {
        actualWeek.days[6].products.push(newProduct)
    }



    const postConfig = {
        method: "put",
        body: JSON.stringify(actualWeek),
        headers: {
            "Content-type": "application/json"
        }
    }

    fetch(`http://localhost:8000/api/week`, postConfig)
        .then(function (response) {
            return response.json();
        })

        .catch(error => console.error('Error:', error))
        .then(response => {
            console.log('Success:', response)
            getWeek();
        })


})




function printWeek(week) {

    week.days.forEach((day, index) => {
        const productCards = day.products.map((product) => {
            return `<div class="cards">
            ${product.type}
            ${product.name}
            </div>`
        })

        daySections[index].innerHTML = productCards.join('');

    })




}

