let form_parent = document.querySelector(".form_parent");
let homecontainner = document.querySelector(".homecontainner"); // Added missing dot (.)
let email = document.querySelector("#email");
let password = document.querySelector("#password");


function login_form() {
    if (!email.value || !password.value) {
        return Swal.fire({
            title: "false!",
            text: "Please add email & password",
            icon: "false",
            confirmButtonText: "NO"
        });
    }
    sessionStorage.setItem("email", email.value);
    checkIsUserLogin();
}

function checkIsUserLogin() {
    let storedEmail = sessionStorage.getItem("email"); // Fixed key name
    if (storedEmail) {
        form_parent.style.display = "none";
        homecontainner.style.display = "block";
    } else {
        form_parent.style.display = "block";
        homecontainner.style.display = "none";
    }
}

checkIsUserLogin();
