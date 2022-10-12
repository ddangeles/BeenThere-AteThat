async function loginFormHandler(event) {
    event.preventDefault();
    console.log('s');

    const userInput = document.getElementById('username-input-signup').value.trim();
    const passInput = document.getElementById('password-input-signup').value.trim();

    if (userInput && passInput) {
      const response = await fetch('/api/user', {
        method: 'post',
        body: JSON.stringify({
          username: userInput,
          password: passInput
        }),
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (response.ok) {
        document.location.replace('/my-restaurants');
      } else {
        alert(response.statusText);
      }
    }
}

document.querySelector('.signup-form').addEventListener('submit', loginFormHandler);