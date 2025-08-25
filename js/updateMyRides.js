document.addEventListener('DOMContentLoaded', function () {
    const logoutLink = document.getElementById("logout-link");
    linkLogout(logoutLink);

    document.getElementById('edit_ride_form')
        .addEventListener('submit', function (event) {
            event.preventDefault();
            updateRide();
        });
    loadRide();
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

function getRideIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

function getUserID() {
    let currentUser = JSON.parse(sessionStorage.getItem('login'));
    return currentUser.identification;
}
function getRideInformation() {
    //get ride information 
    const idRide = Number(getRideIdFromURL());
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

function updateRide() {
    const rideIdCurrent = Number(getRideIdFromURL());

    const rideData = getRideInformation();
    let rideList = JSON.parse(localStorage.getItem('rides')) || [];
    let currentIndex = -1;

    if (rideIdCurrent !== null) {

        rideList.forEach((ride, index) => {
            if (ride.idRide === rideIdCurrent) {
                currentIndex = index;
            }
        });

        if (currentIndex !== -1) {
            rideList[currentIndex] = rideData;
            localStorage.setItem('rides', JSON.stringify(rideList));
            
            window.location.href = 'myRides.html';
        } 
    }
}

function loadInputs(index, rideList) {
    const currentRide = rideList[index];
    document.getElementById('departure-from').value = currentRide.departureFrom;
    document.getElementById('arrive-to').value = currentRide.arriveTo;
    document.getElementById('time').value = currentRide.time;
    document.getElementById('seats').value = currentRide.seats;
    document.getElementById('fee').value = currentRide.fee;
    document.getElementById('make').value = currentRide.make;
    document.getElementById('model').value = currentRide.model;
    document.getElementById('year').value = currentRide.year;

    const daysCheckboxes = document.querySelectorAll('input[name="days[]"]');
    daysCheckboxes.forEach((checkbox) => {
        if (currentRide.selectedDays.includes(checkbox.value)) {
            checkbox.checked = true;
        } else {
            checkbox.checked = false;
        }
    });
}

function loadRide() { //show ride information when page load
    const rideIdCurrent = Number(getRideIdFromURL());
    const rideList = JSON.parse(localStorage.getItem('rides'));

    if (rideIdCurrent !== null) {
        let currentIndex = -1;
        rideList.forEach((ride, index) => {
            if (ride.idRide === rideIdCurrent) {
                currentIndex = index;
            }
        });

        if (currentIndex !== -1) {
            loadInputs(currentIndex, rideList);
        }
    }
}

