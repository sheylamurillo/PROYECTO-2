document.addEventListener('DOMContentLoaded', function () {
  const logoutLink = document.getElementById("logout-link");
  linkLogout(logoutLink);
  document.getElementById('newRide_form')
    .addEventListener('submit', function (event) {
      event.preventDefault();
      saveBooking();
    });
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


function saveBooking(riderName, ride) {

  let bookingList = JSON.parse(localStorage.getItem('bookings'));
  const data = {
    riderName: riderName,
    ride: ride
  };

  if (bookingList) {
    bookingList.push(data);
  }
  else {
    bookingList = [data];
  }
  localStorage.setItem('bookings', JSON.stringify(bookingList));
}