document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('login_form')
    .addEventListener('submit', function (event) {
      event.preventDefault();
      verifyUserExist();
    });
});

function verifyUserExist() {
  const userName = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const userList = JSON.parse(localStorage.getItem('users')) || [];

  let userFound = false;

  userList.forEach(user => {
    if (user.identification === userName && user.password === password) {

      const role = user.role;
      const identification = user.identification;

      const loginData = {
        role: role,
        identification: identification
      };

      sessionStorage.setItem('login', JSON.stringify(loginData));
      userFound = true;
      if (role === 1) { window.location.href = "myRides.html"; }
      else if (role === 0) { window.location.href = "searchRides.html"; }
    }
  });

  if (!userFound) {
    alert("Username or password incorrect");

  }
}
