document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('registration_rider_form')
        .addEventListener('submit', function (event) {
            event.preventDefault();
            saveUser();

        });
    clearInputs();
});

function getUserInformation() {
    // get user information
    const identification = document.getElementById('id-card').value;
    const birthDay = document.getElementById('birth-date').value;
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
    const role = 1;

    if (password !== repeatPassword) { // Check that both passwords match
        alert('Passwords do not match. Please try again.');
        return null;
    }
    return { identification, birthDay, firstName, lastName, email, password, address, country, state, city, phoneNumber, role };
}

function getCarInformation() {

    //get car information
    const license = document.getElementById('license').value;
    const make = document.getElementById('make').value;
    const model = document.getElementById('model').value;
    const year = document.getElementById('year').value;
    return { license, make, model, year };
}

function saveUser() {
    const userData = getUserInformation();
    const carData = getCarInformation();
    if (!userData) { //if userData is null, stop and dont save
        return;
    }

    const allData = {
        ...userData,
        car: carData
    }
    let user_list = JSON.parse(localStorage.getItem('users'));

    // If the list already exists, add the new user, otherwise, create a new array
    if (user_list) {
        user_list.push(allData);
    }
    else {
        user_list = [allData]
    }
    // save data on localStorage
    localStorage.setItem('users', JSON.stringify(user_list));
    window.location.href = 'login.html';
}

function clearInputs() {
    document.getElementById('id-card').value = "";
    document.getElementById('birth-date').value = "";
    document.getElementById('first-name').value = "";
    document.getElementById('last-name').value = "";
    document.getElementById('email').value = "";
    document.getElementById('password').value = "";
    document.getElementById('repeat-password').value = "";
    document.getElementById('address').value = "";
    document.getElementById('country').value = "";
    document.getElementById('state').value = "";
    document.getElementById('city').value = "";
    document.getElementById('phone-number').value = "";
    document.getElementById('license').value = "";
    document.getElementById('make').value = "";
    document.getElementById('model').value = "";
    document.getElementById('year').value = "";
}