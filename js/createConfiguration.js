document.addEventListener('DOMContentLoaded', function () {
    const loginData = JSON.parse(sessionStorage.getItem('login'));
    checkRole(loginData);
    const logoutLink = document.getElementById("logout-link");
    linkLogout(logoutLink);

    document.getElementById('configuration_form')
        .addEventListener('submit', function (event) {
            event.preventDefault();
            saveOrUpdateSetting();
        });
    loadConfiguration();
});

function checkRole(loginData) {
    const role = loginData.role;
    if (role !== 1) {
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

//get information of the inputs 
function getInformationSetting() {
    const publicName = document.getElementById('public-name').value;
    const publicBio = document.getElementById('public-bio').value;
    const login = JSON.parse(sessionStorage.getItem('login'));
    const currentUser = login.identification;
    const data = {
        idUser: currentUser,
        publicName: publicName,
        publicBio: publicBio,
    }
    return data;
}


function saveConfiguration() {
    const currentUser = JSON.parse(sessionStorage.getItem('login'));
    const role = currentUser.role;
    const data = getInformationSetting();
    let configurationList = JSON.parse(localStorage.getItem('configuration'));
    if (configurationList) {
        configurationList.push(data);
    }
    else {
        configurationList = [data];
    }
    localStorage.setItem('configuration', JSON.stringify(configurationList));
    loadConfiguration();
    if (role === 0) {
        window.location.href = 'bookings.html';
    }
    else {
        window.location.href = 'myRides.html';
    }
}


function saveOrUpdateSetting() {
    const configurationList = JSON.parse(localStorage.getItem('configuration')) || [];
    const login = JSON.parse(sessionStorage.getItem('login'));
    const currentUser = Number(login.identification);

    let currentIndex = -1;
    configurationList.forEach((conf, index) => {
        if (Number(conf.idUser) === currentUser) {
            currentIndex = index;
        }
    });

    if (currentIndex !== -1) {
        updateSetting();
    } else {
        saveConfiguration();
    }
}



function updateSetting() {

    const data = getInformationSetting();
    const configurationList = JSON.parse(localStorage.getItem('configuration'))
    let currentIndex = -1;
    const login = JSON.parse(sessionStorage.getItem('login'));
    const role = login.role;
    const currentUser = Number(login.identification);

    if (!configurationList) { return; }

    configurationList.forEach((conf, index) => {
        if (Number(conf.idUser) === Number(currentUser)) {
            currentIndex = index;
        }
    });

    if (currentIndex !== -1) {
        configurationList[currentIndex] = data;
        localStorage.setItem('configuration', JSON.stringify(configurationList));

    }
    if (role === 0) {
        window.location.href = 'bookings.html';
    }
    else {
        window.location.href = 'myRides.html';
    }

}

function loadConfiguration() {
    const login = JSON.parse(sessionStorage.getItem('login'));
    const currentUser = login.identification;
    const configurationList = JSON.parse(localStorage.getItem('configuration'))

    if (!configurationList) { return; }
    configurationList.forEach(conf => {
        if (Number(conf.idUser) === Number(currentUser)) {
            document.getElementById('public-name').value = conf.publicName;
            document.getElementById('public-bio').value = conf.publicBio;
        }
    });
}


