async function commentFormHandler(event) {
    event.preventDefault();
    console.log('s');

    const restaurantId = document.getElementById('restaurant-id').value
    console.log(restaurantId);
    const comment = document.querySelector('textarea[name="comment-body"]').value;

    if(comment) {
        const response = await fetch('/api/comment', {
          method: 'POST',
          body: JSON.stringify({
            restaurantId,
            comment
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
      };
}

document.getElementById('new-comment-form').addEventListener('submit', commentFormHandler);