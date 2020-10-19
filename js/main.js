const entrySubmit = document.querySelector("#entry-submit");

function Entry(title, body, dateAdded, id) {
    this.title = title;
    this.body = body;
    this.dateAdded = dateAdded;
    this.id = id
}


// To Get and Display Entries
document.addEventListener('DOMContentLoaded', displayEntries);


function displayEntries() {
    entries = getEntriesFromStorage();
    
    entries.forEach((entry) => {
        addEntryToUI(entry);
    })
}

function getEntriesFromStorage() {
    let entries;
    if (localStorage.getItem('entries') === null) entries = [];
    else entries = JSON.parse(localStorage.getItem('entries'));
    return entries;
}


// To Add Entry To UI and Local Storage
entrySubmit.addEventListener("click", (e) => {
    e.preventDefault();
    const title = document.querySelector("#entry-title").value;
    const body = document.querySelector("#entry-body").value;
    const date = new Date();
    const timeAdded = `${date.getHours()}:${date.getMinutes()}`;
    const dateAdded = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
    const fullDate = `${timeAdded} ${dateAdded}`;
    const id = date.getTime();

    const entry = new Entry(title, body, fullDate, id);
    
    addEntryToUI(entry);
    addEntryToStorage(entry);
    showAlert("Entry Added!", "success");
});

function addEntryToUI(entry) {

    const entryData = `
    <div class="card border-0 my-3">
        <div class="card-body">
            <h5 class="card-title">${entry.title}</h5>
            <h6 class="card-subtitle mb-2 text-muted">Posted ${entry.dateAdded}</h6>
            <p class="card-text">${entry.body}</p>
            <a href="#" class="btn btn-danger delete" data-set="${entry.id}">&times;</a>
        </div>
    </div>
    `

    document.querySelector('#entry-list').innerHTML += entryData;
    document.querySelector("#entry-form").reset();
}

function addEntryToStorage(entry) {
    entries = getEntriesFromStorage();
    entries.push(entry);
    localStorage.setItem('entries', JSON.stringify(entries));
}


// To Delete Entries from UI and Local Storage
document.querySelector("#entry-list").addEventListener("click", (e) => {
    
    deleteEntryFromStorage(e.target);
    deleteEntryfromUI(e.target);
    
    showAlert("Entry Deleted!", "success");
});

function deleteEntryfromUI(element) {
    (element.classList.contains("delete")) ? element.parentElement.parentElement.remove() : "";
}

function deleteEntryFromStorage(element) {
    let entries = getEntriesFromStorage();
    let dataset;
    if (element.classList.contains("delete")) {
        dataset = element.getAttribute("data-set");
        entries.forEach((entry, index) => {
            if(+dataset === +entry.id) entries.splice(index, 1);
        });

        localStorage.setItem('entries', JSON.stringify(entries));        
    }
}


// To show alerts
function showAlert(message, type) {
    let alert = `<div class="alert alert-${type}">${message}</div>`;
    document.querySelector(".alerts").innerHTML = alert;

    setTimeout(() => document.querySelector(".alerts").innerHTML = "", 2000);
}