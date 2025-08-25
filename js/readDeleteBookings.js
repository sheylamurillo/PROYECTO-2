document.addEventListener('DOMContentLoaded', function () {

    const logoutLink = document.getElementById("logout-link");
    linkLogout(logoutLink);

    const loginData = JSON.parse(sessionStorage.getItem('login'));
    checkRole(loginData);
});

//check role and ID to grant access and load inputs
function checkRole(loginData) {
    const role = loginData.role;
    const id = Number(loginData.identification);
    if (role !== 1) {

        document.getElementById('actionsHeader').textContent = 'Status';
        $('#rides-navegation').hide();
    }
    loadBookings(role, id);
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

//updates the booking status
function handleStatusClick(event, newStatus) {
    event.preventDefault();
    const bookingId = parseInt(this.getAttribute('data-index'));
    const loginData = JSON.parse(sessionStorage.getItem('login'));
    const role = loginData.role;
    const id = loginData.identification;
    updateBookingStatus(bookingId, newStatus);
    loadBookings(role, id);
}

function getUserID() {
    let currentUser = JSON.parse(sessionStorage.getItem('login'));
    return currentUser.identification;
}


function loadBookings(role, id) {
    const bookingList = JSON.parse(localStorage.getItem('bookings')) || [];
    const tableBooking = document.getElementById('bookings_list');

    tableBooking.innerHTML = '';

    if (role === 0) {
        loadBookingsForUser(bookingList, id, tableBooking)
    }
    else if (role === 1) {
        loadBookingsForRider(bookingList, id, tableBooking)
        loadBookingsForUser(bookingList, id, tableBooking)
    }
}

function updateBookingStatus(idBooking, newStatus) {
    const bookingList = JSON.parse(localStorage.getItem('bookings')) || [];

    bookingList.forEach(booking => {
        if (booking.idBooking === idBooking) {
            booking.statu = newStatus;
        }
    });

    localStorage.setItem('bookings', JSON.stringify(bookingList));
}


function loadBookingsForRider(bookingList, currentUser, tableBooking) {
    bookingList.forEach(booking => {
        if (Number(booking.riderId) === Number(currentUser) && booking.statu === "Pending") {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${booking.nameUser}</td>
            <td>
                <a href="rideDetail.html?id=${booking.idBooking}">${booking.ride}</a>
            </td>
            <td>
                <a class= "Accept" data-index="${booking.idBooking} href="myRides.html?id=${booking.idBooking}">Accept</a> |
                <a class="Delete" href="#" data-index="${booking.idBooking}">Reject</a>
            </td>`;

            row.querySelector('.Accept').addEventListener('click', function (event) {
                handleStatusClick.call(this, event, "Accepted");
            });

            row.querySelector('.Delete').addEventListener('click', function (event) {
                handleStatusClick.call(this, event, "Rejected");
            });

            tableBooking.appendChild(row);
        }
    });
}

function loadBookingsForUser(bookingList, currentUser, tableBooking) {
    bookingList.forEach(booking => {
        if (Number(booking.requestedUserId) === Number(currentUser)) {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${booking.nameUser}</td>
            <td>
                <a href="rideDetail.html?id=${booking.idBooking}">${booking.ride}</a>
            </td>
            <td>${booking.statu}</td>`;
            tableBooking.appendChild(row);
        }
    });
}

function rejectBooking(idBookingDelete) {
    let BookingList = JSON.parse(localStorage.getItem('bookings'));
    let indexToDelete = -1;

    BookingList.forEach((booking, index) => {
        if (booking.idBooking === idBookingDelete) {
            indexToDelete = index;
        }
    });

    if (indexToDelete !== -1) {
        BookingList.splice(indexToDelete, 1);
        localStorage.setItem('bookings', JSON.stringify(BookingList));
    }
}
