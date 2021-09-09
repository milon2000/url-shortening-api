const shortenBtn = document.querySelector(".shorten-btn");
const urlInput = document.querySelector("#url");
let shortLink;
const addLink = document.querySelector(".add-link");
const input = document.querySelector(".input");
const navbar = document.querySelector(".navbar-icons");

function validateForm(e) {
    e.preventDefault();
    if (urlInput.value == "") {
        addLink.innerHTML = "Please add a link";
        input.classList.add("empty-input");
    } else {
        addLink.innerHTML = "";
        input.classList.remove("empty-input");
        return false;
    }
}

function createList(input, shortened) {
    const result = document.querySelector(".result");
    const singleResult = document.createElement("div");
    singleResult.classList.add("single-result");
    result.appendChild(singleResult);
    const inputLink = document.createElement("p");
    inputLink.classList.add("link");
    inputLink.textContent = input;
    singleResult.appendChild(inputLink);
    const output = document.createElement("div");
    output.classList.add("output");
    singleResult.appendChild(output);
    const shortenedLink = document.createElement("p");
    shortenedLink.classList.add("shortened");
    shortenedLink.textContent = shortened;
    output.appendChild(shortenedLink);
    const button = document.createElement("button");
    button.classList.add("button", "btn", "copy-btn");
    button.textContent = "Copy";
    output.appendChild(button);
}

async function inquiry(url) {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    shortLink = data.result.full_short_link;
    storageIt();
}

function shortenLink(e) {
    const inputValue = urlInput.value;
    e.preventDefault();
    const url = "https://api.shrtco.de/v2/shorten?url=" + inputValue;
    inquiry(url);
}

function getItems() {
    const data = JSON.parse(localStorage.getItem("links"))
        .reverse()
        .slice(0, 5)
        .forEach((item) => {
            createList(item.link, item.shortened);
        });
}

function storageIt() {
    let linksArray = localStorage.getItem("links") ?
        JSON.parse(localStorage.getItem("links")) :
        [];
    localStorage.setItem("links", JSON.stringify(linksArray));

    const inputValue = urlInput.value;
    linksArray.push({
        link: inputValue,
        shortened: shortLink,
    });
    localStorage.setItem("links", JSON.stringify(linksArray));
    getItems();
}

//mobile navigation

function openNav() {
    const navbarWrapper = document.querySelector(".navbar-wrapper");
    if (!navbarWrapper.classList.contains("navbar-wrapper-visible")) {
        navbarWrapper.classList.add("navbar-wrapper-visible");
    } else {
        navbarWrapper.classList.remove("navbar-wrapper-visible");
    }
}

navbar.addEventListener("click", openNav);
shortenBtn.addEventListener("click", validateForm);
shortenBtn.addEventListener("click", shortenLink);

//localStorage.clear();