let form_parent = document.querySelector(".form_parent");
let homecontainner = document.querySelector(".homecontainner"); // Added missing dot (.)
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let userEmail = document.querySelector("#userEmail");
let note = document.querySelector("#note");


function login_form() {
    if (!email.value || !password.value) {
        return alert("Please add email & password")
    }
    localStorage.setItem("email", email.value);
    checkIsUserLogin();
}

function checkIsUserLogin() {
    let storedEmail = localStorage.getItem("email"); // Fixed key name
    if (storedEmail) {
        form_parent.style.display = "none";
        homecontainner.style.display = "block";
        userEmail.innerHTML = storedEmail
        displayUserNotes()
    } else if(!storedEmail) {
        console.log(storedEmail);
        
        form_parent.style.display = "block";
        homecontainner.style.display = "none";
    }
}

checkIsUserLogin();

function logout (){
    localStorage.removeItem("email")
        checkIsUserLogin();
}

function submit(){
    let email = localStorage.getItem("email");
    let obj = {
        email : email,
        note : note.value
    }
    saveValueToLocalStorage(obj)
    note.value="";
}

function saveValueToLocalStorage(obj) {
    let notes = localStorage.getItem("notes");
    if (notes) {
        notes = JSON.parse(notes);
        notes.push(obj);
        localStorage.setItem("notes", JSON.stringify(notes));
    } else {
        notes = [obj];
        localStorage.setItem("notes", JSON.stringify(notes));
    }
    displayUserNotes()
}

function displayUserNotes(){
    let notes = localStorage.getItem("notes");
    let list = document.querySelector("#list")
    list.innerHTML = "";
    if(notes){
        notes = JSON.parse(notes);
        notes.forEach(function(data , ind){
            var liElement =`<li style="border:1px solid red; list-style:none; padding:10px;">${data.note}
            <p>${data.email}</p>
            </li>`;
            list.innerHTML += liElement;
        })
    }
}
displayUserNotes()