let form_parent = document.querySelector(".form_parent");
let homecontainner = document.querySelector(".homecontainner"); 
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let userEmail = document.querySelector("#userEmail");
let note = document.querySelector("#note");

function login_form() {
    if (!email.value || !password.value) {
        return alert("Please add email & password");
    }
    localStorage.setItem("email", email.value);
    checkIsUserLogin();
}

function checkIsUserLogin() {
    let storedEmail = localStorage.getItem("email");
    if (storedEmail) {
        form_parent.style.display = "none";
        homecontainner.style.display = "block";
        userEmail.innerHTML = storedEmail;
        displayUserNotes();
    } else {
        form_parent.style.display = "block";
        homecontainner.style.display = "none";
    }
}

checkIsUserLogin();

function logout() {
    localStorage.removeItem("email");
    checkIsUserLogin();
}

function submit() {
    let storedEmail = localStorage.getItem("email");
    if (!storedEmail) {
        return alert("User not logged in!");
    }

    let obj = {
        email: storedEmail,
        note: note.value
    };

    saveValueToLocalStorage(obj);
    note.value = "";
}

function saveValueToLocalStorage(obj) {
    let notes = localStorage.getItem("notes");
    notes = notes ? JSON.parse(notes) : [];

    notes.push(obj);
    localStorage.setItem("notes", JSON.stringify(notes));

    displayUserNotes();
}

function displayUserNotes() {
    let notes = localStorage.getItem("notes");
    let list = document.querySelector("#list");
    list.innerHTML = "";

    let storedEmail = localStorage.getItem("email");
    if (!storedEmail || !notes) return;

    notes = JSON.parse(notes);
    
    let filteredNotes = notes.filter(note => note.email === storedEmail);

    let content = "";
    filteredNotes.forEach(function(data, index) {
        content += `<div style="display:flex; align-items:center; justify-content:space-between; border:1px solid red; list-style:none; padding:10px;">
        <div>
        <li>
            ${data.note}
            <p>${data.email}</p>
        </li></div>
        <div><button onClick="deleteBtn('${data.note}')" class="btn_delete">Delete</button></div>
        </div>`;
    });

    list.innerHTML = content;
}

displayUserNotes();

function deleteBtn(noteToDelete) {
    let notes = localStorage.getItem("notes");
    notes = notes ? JSON.parse(notes) : [];

    notes = notes.filter(note => note.note !== noteToDelete);

    localStorage.setItem("notes", JSON.stringify(notes));
    displayUserNotes();
}
