const card = document.querySelector("#cardContainer");
const searchInput = document.querySelector(".search-input");
const langFilter = document.querySelector("#langFilter");

const languages = ['English', 'Kannada', 'Hindi', 'Telugu', 'Tamil', 'Malayalam'];

async function fetchData() {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data = await response.json();
    renderCards(data);
}


function renderCards(data) {
    card.innerHTML='';
    data.forEach((item) => {
        const cardBody = document.createElement('div');
        cardBody.classList.add('card1');
        

        const h2 = document.createElement('h2');
        h2.classList.add('h2');
        // h2.textContent = item.title;

        const sliceTitle = item.title.length > 40 ? item.title.slice(0, 50)+"...." : item.title;
        h2.textContent = sliceTitle;

        const likes = document.createElement('p');
        likes.classList.add('likes');
        likes.textContent = 'likes: '+ Math.floor(Math.random() * 100) + 1;

        const language = document.createElement('p');
        language.classList.add('lang');
        language.textContent = 'languages: '+languages[Math.floor(Math.random() * languages.length)];

        const btn = document.createElement('button');
        btn.textContent = 'Delete';


        btn.onclick = function(button) {
            cardBody.remove(); // Removes the specific card
        };

        cardBody.appendChild(h2);
        cardBody.appendChild(likes);
        cardBody.appendChild(language);
        cardBody.appendChild(btn);

        card.appendChild(cardBody);
    });
}



searchInput.addEventListener('input', (e) => {

    const query = e.target.value.toLowerCase();
    const cards = card.children;
    Array.from(cards).forEach(card => {
        const title = card.querySelector('h2').textContent.toLowerCase();
        card.style.display = title.includes(query) ? 'block' : 'none';
    });
});

langFilter.addEventListener('change', (e) => {
    const selectedLanguage = e.target.value;
    const cards = card.children;
    Array.from(cards).forEach(card => {
        const language = card.querySelector('p:nth-child(3)').textContent.split(': ')[1];
        card.style.display = selectedLanguage === '' || language === selectedLanguage ? 'block' : 'none';
    });
});

fetchData();