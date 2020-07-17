export async function getRoutine(callback) {
  const DB = await fetch(`http://localhost:8000/api/routine`)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      callback(res);
      return res;
    });
}

export function postProduct(product) {
  const config = {
    method: 'post',
    body: JSON.stringify(product),
    headers: {
      'Content-type': 'application/json',
    },
  };

  fetch(`http://localhost:8000/api/routine/`, config)
    .then((response) => {
      console.log('Success:', response);
      return response.json();
    })
    .catch((error) => console.error('Error:', error));
}

export function removeProduct(id) {
  const config = {
    method: 'delete',
    headers: {
      'Content-type': 'application/json',
    },
  };

  fetch(`http://localhost:8000/api/routine/${id}`, config)
    .then((response) => {
      console.log('Success:', response);
      return response.json();
    })
    .catch((error) => console.error('Error:', error));
}
