document.addEventListener('DOMContentLoaded', function () {
    const logoutLink = document.getElementById("logout-link");
    linkLogout(logoutLink);

    const loginData = JSON.parse(sessionStorage.getItem('login'));
    const id = Number(loginData.identification);
    loadRides(id);
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

function handleDeleteClick(event) {
    event.preventDefault();
    const idRideToDelete = parseInt(this.getAttribute('data-index'));
    const loginData = JSON.parse(sessionStorage.getItem('login'));
    const id = Number(loginData.identification);
    deleteRide(idRideToDelete);
    loadRides(id);
}


function loadRides(id) {
    const ridesList = JSON.parse(localStorage.getItem('rides')) || [];
    const tableRides = document.getElementById('ride_list');
    tableRides.innerHTML = '';
    loadRidesForRider(ridesList, id, tableRides);
}

function loadRidesForRider(ridesList, id, table) {
    ridesList.forEach(ride => {
        if (ride.riderId === id) {
            const row = document.createElement('tr');
            row.innerHTML = `           
                <td>
                    <a href="rideDetail.html?id=${ride.idRide}">${ride.departureFrom}</a>
                </td>
                <td>${ride.arriveTo}</td>
                <td>${ride.seats}</td>
                <td>${ride.make} ${ride.model} ${ride.year}</td>
                <td>${ride.fee}</td>
                <td>
                    <a href="editRide.html?id=${ride.idRide}">Edit</a> |
                    <a class="Delete" href="#" data-index="${ride.idRide}">Delete</a>
                </td>
                `;
            row.querySelector('.Delete').addEventListener('click', handleDeleteClick);
            table.appendChild(row);
        }
    });
}

function deleteRide(idRideDelete) {
    let rideList = JSON.parse(localStorage.getItem('rides'));
    let indexToDelete = -1;
    const loginData = JSON.parse(sessionStorage.getItem('login'));
    const id = Number(loginData.identification);
    rideList.forEach((ride, index) => {
        if (ride.idRide === idRideDelete) {
            indexToDelete = index;

        }
    });
    
    if (indexToDelete !== -1) {
        rideList.splice(indexToDelete, 1);
        localStorage.setItem('rides', JSON.stringify(rideList));
        loadRides(id);
    } 
}
