const restaurantId = document.getElementById('restaurant-id').value;

const editFormHandler = async (event) => {
  event.preventDefault();

  const name = document.getElementById('restaurant-name').value;
  const location = document.getElementById('restaurant-location').value;


  const response = await fetch(`/api/restaurant/${restaurantId}`, {
    method: 'PUT',
    body: JSON.stringify({
      name,
      location
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  console.log(response);
  if (response.ok) {
    document.location.replace('/my-restaurants');
  } else {
    console.log('Failed to update your restaurant');
  }
  document.location.replace('/my-restaurants');
};

const deleteClickHandler = async () => {
  await fetch(`/api/restaurant/${restaurantId}`, {
    method: 'DELETE'
  });

  document.location.replace('/my-restaurants');
};

document
  .querySelector('#edit-post-form')
  .addEventListener('submit', editFormHandler);
document
  .querySelector('#delete-btn')
  .addEventListener('click', deleteClickHandler);