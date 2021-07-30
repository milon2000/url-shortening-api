const shortenBtn = document.querySelector('.shorten-btn');
const urlInput = document.querySelector('#url');
let shortLink;


async function inquiry(url) {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    shortLink = data.result.full_short_link;
    storageIt();

}
// link z inputa
// link skrocony
function shortenLink(e) {
    const inputValue = urlInput.value;
    e.preventDefault();
    const url = 'https://api.shrtco.de/v2/shorten?url=' + inputValue;
    inquiry(url);
}

function storageIt() {
    const inputValue = urlInput.value;
    console.log(inputValue);
    console.log('skrocony link', shortLink);
    if (localStorage) {
        // Store data
        localStorage.setItem(inputValue, shortLink);

        setTimeout(function () {
            localStorage.getItem(shortLink);
            //console.log(localStorage);
            console.log("Hi, " + localStorage.getItem(shortLink));
        }, 50);

    }
}

localStorage.clear();








shortenBtn.addEventListener('click', shortenLink);