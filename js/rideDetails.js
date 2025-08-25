document.addEventListener('DOMContentLoaded', function () {
    disableElements();

    const logoutLink = document.getElementById("logout-link");
    linkLogout(logoutLink);

    const loginData = JSON.parse(sessionStorage.getItem('login'));
    checkRole(loginData);

    document.getElementById('ride_details_form')
        .addEventListener('submit', function (event) {
            event.preventDefault();
            obtainInformationforBookings();
        });
    setupCancelButton(loginData.role);
    loadRide();
});

//check role and ID to grant access 
function checkRole(loginData) {
    const role = loginData.role;
    const id = loginData.identification;
    if (role !== 1) {
        $('#newRideBtn').hide();
        $('#actionTable').hide();
        $('#rides-navegation').hide();
    }
}

//disable elements
function disableElements() {
    const form = document.getElementById("ride_details_form");
    const elements = form.querySelectorAll("input, select, textarea");

    elements.forEach(el => {
        el.disabled = true;
    });
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


function setupCancelButton(role) {
    const cancelBtn = document.getElementById("cancel");
    if (!cancelBtn) return;
    cancelBtn.addEventListener("click", function (event) {
        event.preventDefault();

        if (role === 1) {
            window.location.href = "myRides.html";
        } else {
            window.location.href = "searchRides.html";
        }
    });
}


function getRideIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

function loadRide() { //show ride information when page load
    const rideIdCurrent = Number(getRideIdFromURL());

    const rideList = JSON.parse(localStorage.getItem('rides'));
    let currentIndex = -1;
    if (rideIdCurrent !== null) {
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

function loadInputs(currentIndex, rideList) { //load inputs with ride details 
    let nameUserCurrent = '';
    const userList = JSON.parse(localStorage.getItem('users'));

    const currentRide = rideList[currentIndex];
    userList.forEach(user => {
        if (Number(user.identification) === Number(currentRide.riderId)) {
            nameUserCurrent = user.firstName + " " + user.lastName;
        }
    });

    document.getElementById('rider-name').textContent = nameUserCurrent;
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

function obtainInformationforBookings() {
    const currentUser = JSON.parse(sessionStorage.getItem('login'));
    const userList = JSON.parse(localStorage.getItem('users'));
    const rideList = JSON.parse(localStorage.getItem('rides')) || [];

    const idCurrentUser = currentUser.identification;
    const rideIdCurrent = getRideIdFromURL();

    const from = document.getElementById('departure-from').value;
    const to = document.getElementById('arrive-to').value;
    const fullRide = from + "-" + to;

    let nameUserCurrent = '';
    let riderIdentification = '';
    const statu = "Pending";
    rideList.forEach(ride => {
        if (Number(ride.idRide) === Number(rideIdCurrent)) {
            riderIdentification = ride.riderId;
        }
    });

    userList.forEach(user => {
        if (user.identification === idCurrentUser) {
            nameUserCurrent = user.firstName + " " + user.lastName;
        }
    });

    saveBooking(Number(riderIdentification), idCurrentUser, nameUserCurrent, rideIdCurrent, fullRide, statu);

}

function saveBooking(rider, idCurrentUser, nameUserCurrent, rideIdCurrent, fullRide, statu) {

    let bookingList = JSON.parse(localStorage.getItem('bookings')) || [];

    const data = {
        idBooking: bookingList.length + 1,
        riderId: rider,
        requestedUserId: idCurrentUser,
        nameUser: nameUserCurrent,
        requestedRide: rideIdCurrent,
        ride: fullRide,
        statu: statu
    };

    if (bookingList) {
        bookingList.push(data);
    }
    else {
        bookingList = [data];
    }

    localStorage.setItem('bookings', JSON.stringify(bookingList));
    window.location.href = 'bookings.html';
}
