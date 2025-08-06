document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('users_edit_form')
        .addEventListener('submit', function (event) {
            event.preventDefault();
            updateUser();
        });
    loadUser();
});



function getUserData() {
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

function updateUser() {
    const userIndex = sessionStorage.getItem('loginIndex');
    const userData = getUserData();

    if (!userData) { //if userData is null, stop and dont save
        return;
    }

    let userList = JSON.parse(localStorage.getItem('users'));

    if (userIndex !== null && userIndex < userList.length) {
        userList[userIndex] = userData; //replace old information with new data
        localStorage.setItem('users', JSON.stringify(userList));
        alert('User updated successfully!');
        window.location.href = 'myRides.html';
    }
}

function loadUser() {
    const userIndex = sessionStorage.getItem('loginIndex');
    const userList = JSON.parse(localStorage.getItem('users')) || [];

    if (userIndex !== null && userIndex < userList.length) {
        const userCurrent = userList[userIndex];
        document.getElementById('first-name').value = userCurrent.firstName;
        document.getElementById('last-name').value = userCurrent.lastName;
        document.getElementById('email').value = userCurrent.email;
        document.getElementById('password').value = userCurrent.password;
        document.getElementById('repeat-password').value = userCurrent.repeatPassword;
        document.getElementById('address').value = userCurrent.address;
        document.getElementById('country').value = userCurrent.country;
        document.getElementById('state').value = userCurrent.state;
        document.getElementById('city').value = userCurrent.city;
        document.getElementById('phone-number').value = userCurrent.phoneNumber;
    }
}
