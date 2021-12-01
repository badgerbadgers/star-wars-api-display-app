// function getData() {
//   fetch('https://swapi.dev/api/people/1')
//     .then(response => response.json())
//   console.log(data)
// }
// // getData();
async function getData() {
    const url = 'https://swapi.dev/api/people/1';
    try {
        let res = await fetch(url)
        return await res.json();
    } catch(error) {
        console.log(error);
    }
//     // let response = await fetch('https://swapi.dev/api/people/1');
//     // let data = await response.text();
}
getData();

// function mapData() {
//     let stuff = getData();
//     console.log(stuff);
// }
// function displayData() {
//     let characters = getData();
//     let text = '';

//     characters.forEach(character => {
//         console.log(character)
//         let textInfo = 
//         `
//           <div class="character">
//           <h2>Your character is:</h2>
//             <h3>${character.name}</h3>
//           </div>
//         `;
//         text += textInfo;
//     });
//     let container = document.querySelector('.container');peopp
//     container.innerHTML = html;
// }
async function renderUsers() {
    let user = await getData()
    console.log(user)
  

    let html = '';
    let htmlSegment = `
    <div class="wrapper">
    <div class="user">
    <h2>Character Spotlight:<h2>
                            <h3> ${user.name}</h3>
                            <p>Birth year: ${user.birth_year}</p>
                            <p>Hair color: ${user.hair_color}</p>
                            <p>Eye color: ${user.eye_color}</p>
                            <p>Height: ${user.height}cm</p>
                            <p>Gender: ${user.gender}</p>
                        </div>
                        </div>
                        `;

    html += htmlSegment;
    let container = document.querySelector('.container');
    container.innerHTML = html;
    };

  

renderUsers();