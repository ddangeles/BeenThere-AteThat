const newFormHandler = async function (event) {
    event.preventDefault();
  
  
    const restaurantId = document.getElementById('restaurantId').value;
    //const location = document.getElementById('restaurant-location').value;
  
  
    await fetch(`/api/beenthere`, {
      method: 'POST',
      body: JSON.stringify({
        restaurantId,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    
  };
   console.log(err);

  
  document.getElementById('visitedBtn').onclick = function(){
    location.reload('/my-restaurants')
  }  