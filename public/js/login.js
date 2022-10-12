async function loginFormHandler(event) {
    event.preventDefault();
    console.log('s');

    const userInput = document.getElementById('username-input-login');
    const passInput = document.getElementById('password-input-login');

    if (userInput && passInput) {
      const response = await fetch('/api/user/login', {
        method: 'post',
        body: JSON.stringify({
          username: userInput.value,
          password: passInput.value
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

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);