document.addEventListener('DOMContentLoaded', function () {
    const loginData = JSON.parse(sessionStorage.getItem('login'));
    checkRole(loginData);

    const logoutLink = document.getElementById("logout-link");
    linkLogout(logoutLink);

    document.getElementById('search-form')
        .addEventListener('submit', function (event) {
            event.preventDefault();
            filter();
        });
    loadSelect();
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

//show all place of the from and to
function loadSelect() {
    const ridesList = JSON.parse(localStorage.getItem('rides')) || [];
    if (ridesList.length === 0) { return; }

    const fromSet = new Set();
    const toSet = new Set();

    ridesList.forEach(ride => {
        fromSet.add(ride.departureFrom);
        toSet.add(ride.arriveTo);
    });

    loadInformationSelect(fromSet, toSet);
}

//carga the selects
function loadInformationSelect(fromSet, toSet) {
    let fromOptions = '<option value="">Seleccione origen</option>';
    for (let from of fromSet) {
        fromOptions += `<option value="${from}">${from}</option>`;
    }

    let toOptions = '<option value="">Seleccione destino</option>';
    for (let to of toSet) {
        toOptions += `<option value="${to}">${to}</option>`;
    }

    document.getElementById('from-select').innerHTML = fromOptions;
    document.getElementById('to-select').innerHTML = toOptions;
}


//------------------------Filter------------------------------------------

function getSelectedDays() {
    const selectedDays = [];
    const days = document.querySelectorAll('input[name="days[]"]');
    days.forEach((checkbox) => {
        if (checkbox.checked) {
            selectedDays.push(checkbox.value);
        }
    });
    return selectedDays;
}


//filter data
function filterRides(ridesList, from, to, selectedDaysFilter) {
    const filtered = [];

    ridesList.forEach(ride => {

        if (ride.departureFrom === from && ride.arriveTo === to) {

            let matchesDay = false;
            selectedDaysFilter.forEach(day => {
                if (ride.selectedDays.includes(day)) {
                    matchesDay = true;
                }
            });

            if (matchesDay) {
                filtered.push(ride);
            }
        }
    });

    return filtered;
}

function getNameRider(idRider) {
    const listUser = JSON.parse(localStorage.getItem('users'));
    let nameUser = "";
    listUser.forEach(user => {
        if (Number(user.identification) === Number(idRider)) {
            nameUser = user.firstName;
        }
    });
    return nameUser;
}

function showRides(rides) {
    const tableRides = document.getElementById('search_list');
    tableRides.innerHTML = '';

    rides.forEach((ride, index) => {
        const row = document.createElement('tr');
        let riderName = getNameRider(ride.riderId);
        row.innerHTML = `
            <td>${riderName}</td>
            <td>
                <a href="rideDetail.html?id=${ride.idRide}">${ride.departureFrom}</a>
            </td>
            <td>${ride.arriveTo}</td>
            <td>${ride.seats}</td>
            <td>${ride.make + " " + ride.model + " " + ride.year}</td>
            <td>${ride.fee}</td>
            <td>
                <a href="#" onclick="obtainInformationforBookings('${ride.idRide}', '${ride.departureFrom}', '${ride.arriveTo}')">Request</a>
            </td>
        `;

        tableRides.appendChild(row);
    });
}

function filter() {
    const ridesList = JSON.parse(localStorage.getItem("rides")) || [];
    const from = document.getElementById('from-select').value.trim();
    const to = document.getElementById('to-select').value.trim();
    const selectedDaysFilter = getSelectedDays();
    const infoText = document.getElementById('rides-info-text');
    infoText.innerHTML = `Rides found from <strong>${from || "from"}</strong> to <strong>${to || "to"}</strong>`;
    const filteredRides = filterRides(ridesList, from, to, selectedDaysFilter);
    showRides(filteredRides);
}
//----------------------------------------------------------------------------------



function obtainInformationforBookings(rideId, from, to) {
    const currentUser = JSON.parse(sessionStorage.getItem('login'));
    const idCurrentUser = currentUser.identification;

    const userList = JSON.parse(localStorage.getItem('users'));
    const rideList = JSON.parse(localStorage.getItem('rides')) || [];

    const fullRide = from + "-" + to;

    let nameUserCurrent = '';
    let rideIdentification = -1;
    let riderIdentification = '';
    const statu = "Pending";
    rideList.forEach(ride => {
        if (Number(ride.idRide) === Number(rideId)) {
            rideIdentification = rideId;
            riderIdentification = ride.riderId;
        }
    });

    userList.forEach(user => {
        if (user.identification === idCurrentUser) {
            nameUserCurrent = user.firstName + " " + user.lastName;
        }
    });

    saveBooking(Number(riderIdentification), idCurrentUser, nameUserCurrent, rideIdentification, fullRide, statu);


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

