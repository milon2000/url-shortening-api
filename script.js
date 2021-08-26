const shortenBtn = document.querySelector('.shorten-btn');
const urlInput = document.querySelector('#url');
let shortLink;
const addLink = document.querySelector('.add-link');
const input = document.querySelector('.input');

function emptyInput() {
    console.log('dziala');
    if (urlInput.value == '') {
        addLink.innerHTML = 'kurwa'
    } else {
        addLink.innerHTML = ''
    }
}

function createList(input, shortened) {
    const history = document.querySelector('.history');
    const inputLink = document.createElement('p');
    inputLink.classList.add('link');
    inputLink.textContent = input;
    history.appendChild(inputLink);
    const shortenedLink = document.createElement('p');
    shortenedLink.classList.add('shortened');
    shortenedLink.textContent = shortened;
    history.appendChild(shortenedLink);
    const button = document.createElement('button');
    button.classList.add('button');
    button.textContent = 'Copy';
    history.appendChild(button);
}

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
    let linksArray = localStorage.getItem('links') ?
        JSON.parse(localStorage.getItem('links')) : [];
    localStorage.setItem('links', JSON.stringify(linksArray));

    const inputValue = urlInput.value;
    linksArray.push({
        link: inputValue,
        shortened: shortLink,
    })
    localStorage.setItem('links', JSON.stringify(linksArray))
    const data = JSON.parse(localStorage.getItem('links'));

    //createList(inputValue, shortLink);
    data.forEach(item => {
        createList(item.link, item.shortened);
    })

}

input.addEventListener('onfocus', emptyInput);
shortenBtn.addEventListener('click', shortenLink);

//localStorage.clear();