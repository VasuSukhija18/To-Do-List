const inputBox = document.getElementById("input-box");
const dueDateInput = document.getElementById("due-date");
const dueTimeInput = document.getElementById("due-time");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    }
    else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value + " - Due Date: " + formatDate(dueDateInput.value) + ", Time: " + formatTime(dueTimeInput.value);
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    dueDateInput.value = "";
    dueTimeInput.value = "";
    saveData();
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return year + "-" + month + "-" + day;
}

function formatTime(timeString) {
    const time = timeString.split(":");
    let hours = parseInt(time[0]);
    const minutes = time[1];
    let period = "AM";

    if (hours >= 12) {
        period = "PM";
        if (hours > 12) {
            hours -= 12;
        }
    }

    if (hours === 0) {
        hours = 12;
    }

    return hours + ":" + minutes + " " + period;
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    }
    else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();