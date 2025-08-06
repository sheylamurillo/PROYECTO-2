document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('login_form')
    .addEventListener('submit', function(event) {
    event.preventDefault(); 
    verifyUserExist(); 
  });
});

function verifyUserExist() {
    const userName = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const userList = JSON.parse(localStorage.getItem('users')) || [];

    let userFound = false;

    userList.forEach((user, index) => {
        if (user.email === userName && user.password === password) {
            sessionStorage.setItem('loginIndex', index); 
            userFound = true;
            window.location.href = "myRides.html";
        }
    });

    if (!userFound) {
        alert("Username or password incorrect");

    }
}
