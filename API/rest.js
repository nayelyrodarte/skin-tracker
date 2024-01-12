export const rest = {
  get: async function () {
    return fetch(`/api/routine`)
      .then((res) => res.json())
      .then((res) => res)
      .catch((error) => console.error('Error:', error));
  },
  post: function (product) {
    const config = {
      method: 'post',
      body: JSON.stringify(product),
      headers: {
        'Content-type': 'application/json',
      },
    };

    fetch(`/api/routine/`, config)
      .then((response) => {
        console.log('Success:', response);
        return response.json();
      })
      .catch((error) => console.error('Error:', error));
  },
  delete: function (id) {
    const config = {
      method: 'delete',
      headers: {
        'Content-type': 'application/json',
      },
    };

    fetch(`/api/routine/${id}`, config)
      .then((response) => {
        console.log('Success:', response);
        return response.json();
      })
      .catch((error) => console.error('Error:', error));
  },
};
