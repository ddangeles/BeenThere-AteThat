const newFormHandler = async function (event) {
  event.preventDefault();


  const name = document.getElementById('restaurant-name').value;
  const location = document.getElementById('restaurant-location').value;


  await fetch(`/api/restaurant`, {
    method: 'POST',
    body: JSON.stringify({
      name,
      location
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  // document.location.replace('/my-restaurants');
};

document
  .querySelector('#new-restaurant-form')
  .addEventListener('submit', newFormHandler);

document.getElementById('no-image').onclick = function(){
  location.replace('/my-restaurants')
}  

const show = (element) => {
  element.classList.remove("image-uploader-hide")
}

document.getElementById('add-image').onclick = function(){
  show(document.getElementById('image-uploader'))
}

// document.getElementById('add-image').addEventListener('submit', newFormHandler);