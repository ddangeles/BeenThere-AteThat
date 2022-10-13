const newFormHandler = async function(event) {
    event.preventDefault();
  
   
    const name = document.getElementById('restaurant-name').value;
    const location = document.getElementById('restaurant-location').value;

    // console.log(restaurantName);
    // console.log(restaurantLocation)
  
    await fetch(`/api/restaurant`, {
      method: 'POST',
      body: JSON.stringify({
        name,
        location,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    document.location.replace('/my-restaurants');
  };
  
  document
    .querySelector('#new-restaurant-form')
    .addEventListener('submit', newFormHandler);



// async function addRestaurantFormHandler(event) {
//     event.preventDefault();
//     console.log('s');

//     const restaurantName = document.getElementById('restaurant-name').value
//     const restaurantLocation = document.getElementById('restaurant-location').value;

//     const restaurant = document.querySelector('textarea[name="comment-body"]').value;

//     if(restaurant) {
//         const response = await fetch('/api/restaurant', {
//           method: 'POST',
//           body: JSON.stringify({
//             restaurantName,
//             restaurantLocation
//           }),
//           headers: {
//             'Content-Type': 'application/json'
//           }
//         });
//         if (response.ok) {
//           document.location.reload();
//         } else {
//           alert(response.statusText);
//         }
//       };
// }

// document.getElementById('new-restaurant-form').addEventListener('submit', addRestaurantFormHandler);