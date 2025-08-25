document.addEventListener('DOMContentLoaded', function () {
    const logoutLink = document.getElementById("logout-link");
    linkLogout(logoutLink);
    document.getElementById('new_ride_form')
        .addEventListener('submit', function (event) {
            event.preventDefault();
            saveRide();
        });
    loadCarInformation();
});

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

function loadCarInformation() {
    const login = JSON.parse(sessionStorage.getItem('login'));
    const currentUserId = login.identification;
    const usersList = JSON.parse(localStorage.getItem('users'));

    usersList.forEach(user => {
        if (Number(user.identification) === Number(currentUserId) && user.car) {
            document.getElementById('make').value = user.car.make;
            document.getElementById('model').value = user.car.model;
            document.getElementById('year').value = user.car.year;
        }
    });
}

function getUserID() {
    let currentUser = JSON.parse(sessionStorage.getItem('login'));
    return currentUser.identification;
}

function getRideInformation() {
    let rideList = JSON.parse(localStorage.getItem('rides'));

    let idRide = -1;
    if (rideList) {
        idRide = rideList.length + 1;
    }
    else {
        idRide = 1;
    }

    //const idRide = rideList.length + 1;
    const riderId = Number(getUserID()); 
    const departureFrom = document.getElementById('departure-from').value;
    const arriveTo = document.getElementById('arrive-to').value;
    const time = document.getElementById('time').value;
    const seats = document.getElementById('seats').value;
    const fee = document.getElementById('fee').value;
    const make = document.getElementById('make').value;
    const model = document.getElementById('model').value;
    const year = document.getElementById('year').value;
    const selectedDays = [];
    let days = document.querySelectorAll('input[name="days[]"]');

    days.forEach((checkbox) => { //get the selected days and save them into an array
        if (checkbox.checked) {
            selectedDays.push(checkbox.value);
        }
    });

    return { idRide, riderId, departureFrom, arriveTo, selectedDays, time, seats, fee, make, model, year };
}
 
function saveRide() { //Store ride data on localstorage
    const rideData = getRideInformation();

    if (!rideData) {
        return;
    }

    let rideList = JSON.parse(localStorage.getItem('rides'));

    if (rideList) {
        rideList.push(rideData);
    }
    else {
        rideList = [rideData]
    }
    localStorage.setItem('rides', JSON.stringify(rideList));
    window.location.href = 'myRides.html';
}