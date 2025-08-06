document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('registration_form')
    .addEventListener('submit', function(event) {
    event.preventDefault(); 
    saveUser(); 
  });
});

function getUserInformation() {
    // get user information
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const repeatPassword = document.getElementById('repeat-password').value;
    const address = document.getElementById('address').value;
    const country = document.getElementById('country').value;
    const state = document.getElementById('state').value;
    const city = document.getElementById('city').value;
    const phoneNumber = document.getElementById('phone-number').value;

    
    if (password !== repeatPassword) { // Check that both passwords match
        alert('Passwords do not match. Please try again.');
        return null;
    }
    return { firstName, lastName, email, password, address, country, state, city, phoneNumber };
}

function saveUser() {
    const userData = getUserInformation();
    if (!userData) { //if userData is null, stop and dont save
        return;
    }

    let user_list = JSON.parse(localStorage.getItem('users'));

    // If the list already exists, add the new user, otherwise, create a new array
    if (user_list) {
        user_list.push(userData);
    }
    else {
        user_list = [userData]
    }
    // save data on localStorage
    localStorage.setItem('users', JSON.stringify(user_list));
    alert("User saved successfully")
}