/* function that gets API data, 
on call of function it generates a number between 1 and 83 */

async function getData() {
    /* Generate a random number between 1 and 83 */
let randomNum = Math.floor(Math.random() * 83) + 1;
    const url = `https://swapi.dev/api/people/${randomNum}`;
    /* uses fetch method to get api data then json to  */
    try {
        let res = await fetch(url)
        return await res.json();
    } catch(error) {
        console.log(error);
    }
}
function handleClick(event) {
    event.preventDefault();
    alert('hi')
}
/* function that will display API data to the webpage. uses object */
async function renderUsers() {
    let user = await getData()
    console.log(user)
  

    let html = '';
    let htmlSegment = `
    <div class="child">
    <div class="user">
    <h1>Character Spotlight:<h1>
                            <h2> ${user.name}</h2>
                            <h3>Birth year: ${user.birth_year}</h3>
                            <h3>Hair color: ${user.hair_color}</h3>
                            <h3>Eye color: ${user.eye_color}</h3>
                            <h3>Height: ${user.height}cm</h3>
                            <h3>Gender: ${user.gender}</h3>
                            <button>Generate New Character</button>
                        </div>
                        </div>
                        `;

    html += htmlSegment;
    let container = document.querySelector('.container');
    container.innerHTML = html;
    };

  document.addEventListener('click', function () {
      renderUsers();
  })

renderUsers();