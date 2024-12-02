// define the local varibales
var nameInput = document.getElementById("nameinput");
var urlInput = document.getElementById("urlinput");
var add = document.getElementById("add");
var form = document.forms[0]
var tbody = document.querySelector("tbody");
var rules = document.querySelector("#rules")
var close = document.querySelector("#close")
var alert = document.querySelector(".alert")
var regexForName = /\w{3,}/;
var regexForURl = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/;
// regex and valid input
nameInput.addEventListener("keyup", function () {
    if (regexForName.test(nameInput.value) !== true) {
        nameInput.classList.add("is-invalid")
    } else {
        nameInput.classList.remove("is-invalid")
        nameInput.classList.add("is-valid")
    }
    for (var i = 0; i < books.length; i++){
        if (nameInput.value == books[i].name) {
            alert.style.display ="block"
            nameInput.classList.add("is-invalid")
        } else {
            alert.style.display = "none"
            nameInput.classList.remove("is-invalid")
            nameInput.classList.add("is-valid")
        }
    }
})
urlInput.addEventListener("keyup", function () {
    if (regexForURl.test(urlInput.value) !== true) {
        urlInput.classList.add("is-invalid")
    } else {
        urlInput.classList.remove("is-invalid")
        urlInput.classList.add("is-valid")
    }
})

// popup rules
close.addEventListener("click", function () {
    rules.style.display="none"
})
// make the form doesnt refresh
form.addEventListener("submit", function (e) {
    e.preventDefault()
})
if (localStorage.getItem("data") != null) {
    var books = JSON.parse(localStorage.getItem("data"));
    show()
} else {
    var books = []
}
// handel button add
add.addEventListener("click", function () {
    if ( regexForName.test(nameInput.value) !== true || 
        regexForURl.test(urlInput.value) !== true) {
        rules.style.display="block"
    } else {
            var book = {
                name: nameInput.value,
                url : urlInput.value
            }
            books.push(book);
            localStorage.setItem("data",JSON.stringify(books))
            show()
            clearform();
    }
})
// handele show books
function show() {
    var str = ""
    for (var i = 0; i < books.length; i++){
        str += `
    <tr>
    <td class="position-relative"><span class="position-absolute top-50 start-50 translate-middle">${i+1}</span></td>
    <td class="position-relative"><span class="position-absolute top-50 start-50 translate-middle">${books[i].name}</span></td>
    <td><button type="button" class="btn btn-success"><a class="text-white  text-decoration-none" href="${books[i].url}" target="_blank"><i class="fa-solid fa-eye"></i> Visit</a></button></td>
    <td><button type="button" data-i="${i}" class="btn btn-danger" id="delet"><i class="fa-solid fa-trash"></i> Delete</button></td>  
    </tr>
        `
    }
    tbody.innerHTML = str;
    var delet = document.querySelectorAll("#delet");
    for (var i = 0; i < delet.length; i++){
        delet[i].addEventListener("click", function (e) {
     // e.srcElement.getAttribute("data-i")
     books.splice(e.srcElement.getAttribute("data-i"), 1)
     localStorage.setItem("data",JSON.stringify(books))
    show()
        })   
    }
}
// clear the form every time add book
function clearform() {
    nameInput.value = null;
    urlInput.value = null;
    nameInput.classList.remove("is-valid")
    urlInput.classList.remove("is-valid")
}


