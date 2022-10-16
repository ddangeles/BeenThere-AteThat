async function visitedFormHandler(event) {
  event.preventDefault();
  console.log('s');

  const restaurantId = document.getElementById('restaurant-id').value
  console.log(restaurantId);
  const userId = document.getElementById('user-id').value

 
      const response = await fetch('/api/beenthere', {
        method: 'POST',
        body: JSON.stringify({
          userId,
          restaurantId,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        document.location.reload();
      } else {
        alert(response.statusText);
      }
}

document.getElementById('visited-beenthere').addEventListener('submit', visitedFormHandler);