let email = document.querySelector("#email");
let password = document.querySelector("#password");

function login_form(){
    if(!email.value || !password.value) return alert("Please add email & password");
    localStorage.setItem("email", email.value);
}