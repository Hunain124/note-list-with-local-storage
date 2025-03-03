let signup = document.querySelector(".signup");
let homecontainner = document.querySelector(".homecontainner"); // Added missing dot (.)
let email = document.querySelector("#email");
let password = document.querySelector("#password");

function login_form() {
    if (!email.value || !password.value) {
        return alert("Please add email & password");
    }
    localStorage.setItem("email", email.value);
    checkIsUserLogin();
}

function checkIsUserLogin() {
    let storedEmail = localStorage.getItem("email"); // Fixed key name
    if (storedEmail) {
        signup.style.display = "none";
        homecontainner.style.display = "block";
    } else {
        signup.style.display = "block";
        homecontainner.style.display = "none";
    }
}

checkIsUserLogin();
