document.addEventListener('DOMContentLoaded', function () {
    const loginData = JSON.parse(sessionStorage.getItem('login'));
    checkRole(loginData);

    const logoutLink = document.getElementById("logout-link");
    linkLogout(logoutLink);

    document.getElementById('rider_edit_form')
        .addEventListener('submit', function (event) {
            event.preventDefault();
            updateUser();
        });
    loadUser();
});

//check role and ID to grant access 
function checkRole(loginData) {
    const role = loginData.role;
    if (role !== 1) {
        $('#newRideBtn').hide();
        $('#actionTable').hide();
        $('#rides-navegation').hide();
    }
}

//listen to the event
function linkLogout(logoutLink) {
    if (logoutLink) {
        logoutLink.addEventListener("click", (event) => {
            event.preventDefault();
            logoutUser();
        });
    }
}

//clears the session storage and redirects to the login
function logoutUser() {
    sessionStorage.clear();
    window.location.href = "login.html";
}

function getUserData() {
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

function updateUser() {
    const currentUser = JSON.parse(sessionStorage.getItem('login'));
    const role = currentUser.role;
    const userId = currentUser.identification;
    const userData = getUserData();
    const carData = getCarInformation();

    if (!userData) {
        return;
    }

    let userList = JSON.parse(localStorage.getItem('users'));
    let indexUser = -1;

    userList.forEach((user, index) => {
        if (Number(user.identification) === Number(userId)) {
            indexUser = index;
        }
    });

    if (indexUser !== -1) {
        userList[indexUser] = {
            ...userData,
            car: carData
        };
        localStorage.setItem('users', JSON.stringify(userList));
       
        if (role === 0) {
            window.location.href = 'bookings.html';
        }
        else {
            window.location.href = 'myRides.html';
        }

    }
}

function loadUser() {
    const currentUser = JSON.parse(sessionStorage.getItem('login'));
    const userId = currentUser.identification;
    const userList = JSON.parse(localStorage.getItem('users')) || [];

    let indexUser = -1;

    userList.forEach((user, index) => {
        if (Number(user.identification) === Number(userId)) {
            indexUser = index;
        }
    });

    if (indexUser !== -1) {
        const userCurrent = userList[indexUser];
        document.getElementById('id-card').value = userCurrent.identification;
        document.getElementById('birth-date').value = userCurrent.birthDay;
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
        if (userCurrent.car) {
            document.getElementById('license').value = userCurrent.car.license;
            document.getElementById('make').value = userCurrent.car.make;
            document.getElementById('model').value = userCurrent.car.model;
            document.getElementById('year').value = userCurrent.car.year;
        }

    }
}
