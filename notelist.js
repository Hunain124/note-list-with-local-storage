// Elements selection
let form_parent = document.querySelector(".form_parent");
let homecontainner = document.querySelector(".homecontainner");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let userEmail = document.querySelector("#userEmail");
let note = document.querySelector("#note");
let list = document.querySelector("#list");

// login Function
function login_form() {
    if (!email.value || !password.value) {
        return alert("Please add email & password");
    }
    localStorage.setItem("email", email.value);
    checkIsUserLogin();
}

// Check User Login
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

// Logout Function
function logout() {
    localStorage.removeItem("email");
    checkIsUserLogin();
}

// Submit Note
function submit() {
    let storedEmail = localStorage.getItem("email");
    if (!storedEmail) {
        return alert("User not logged in!");
    }
    if (!note.value.trim()) {
        return alert("Please enter a note!");
    }

    let obj = {
        id: Date.now(),
        email: storedEmail,
        note: note.value
    };

    saveValueToLocalStorage(obj);
    note.value = "";
}

// Save to Local Storage
function saveValueToLocalStorage(obj) {
    let notes = localStorage.getItem("notes");
    notes = notes ? JSON.parse(notes) : [];

    notes.push(obj);
    localStorage.setItem("notes", JSON.stringify(notes));

    displayUserNotes();
}

// Display Notes
function displayUserNotes() {
    let notes = localStorage.getItem("notes");
    list.innerHTML = "";

    let storedEmail = localStorage.getItem("email");
    if (!storedEmail || !notes) return;

    notes = JSON.parse(notes);
    let filteredNotes = notes.filter(note => note.email === storedEmail);

    let content = "";
    filteredNotes.forEach(function (data) {
        content += `
        <div style="display:flex !important; align-items:center; justify-content:space-between; padding:30px; border-radius:20px; color:red; box-shadow: inset 5px 5px 15px rgba(0.5, 0.3, 0.3, 0.5);">
            <div>
                <li>${data.note} <p>${data.email}</p></li>
            </div>
            <div>
                <button onClick="upDate(${data.id})" class="btn_update"><i class="fa-solid fa-pen-to-square"></i></button>
                <button onClick="deleteBtn(${data.id})" class="btn_delete"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>`;
    });

    list.innerHTML = content;
}
displayUserNotes();

// Delete Note
function deleteBtn(noteId) {
    let notes = localStorage.getItem("notes");
    notes = notes ? JSON.parse(notes) : [];

    notes = notes.filter(note => note.id !== noteId);

    localStorage.setItem("notes", JSON.stringify(notes));
    displayUserNotes();
}

// Update Note
function upDate(noteId) {
    let notes = localStorage.getItem("notes");
    notes = notes ? JSON.parse(notes) : [];

    let storedEmail = localStorage.getItem("email");

    let noteToEdit = notes.find(note => note.id === noteId && note.email === storedEmail);
    if (!noteToEdit) return alert("Note not found!");

    let newNote = prompt("Enter new note:", noteToEdit.note);
    if (!newNote || newNote.trim() === "") return;

    // Update the note
    notes = notes.map(note => {
        if (note.id === noteId) {
            return { ...note, note: newNote };
        }
        return note;
    });

    localStorage.setItem("notes", JSON.stringify(notes));
    displayUserNotes();
}
