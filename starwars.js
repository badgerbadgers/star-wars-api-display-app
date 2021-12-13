/* declares strict mode, cannot use undeclared variables */
"use strict"

/* variable for container */
const container = document.querySelector('.container');

/* html Segments */
let characterHtmlSegment = ''
let homeworldHtmlSegment = ''
let filmHtmlSegment = ''

/* function that renders previous data shown on screen */
function renderPreviousData(htmlSegment){
	container.innerHTML = htmlSegment;
}

/* Generates list of all characters with index equal to order number */
/*
async function createCharacterIndex(){
  for(var i = 1; i <= 83; i++){
	  let url = `https://swapi.dev/api/people/${i}`
	  let character = await getData(url)
	  characterIndex.push(character.name)
  } 
//   characterIndex = characterIndex.join(", ")
  console.log(characterIndex)
  return characterIndex
}
*/

/* Generates a random number to get 1 of the 83 of Star Wars characters in API data. 
Fetches API data using constructed URL or passed URL. 
*/
async function getData(selectedUrl) {
    let randomNum = Math.floor(Math.random() * 83) + 1;
    const url = selectedUrl ? selectedUrl : `https://swapi.dev/api/people/${randomNum}`
    try {
        let res = await fetch(url)
        return await res.json();
    } catch(error) {
        console.log(error);
    }
 }


 /* Gets API data and renders character  */
 async function renderCharacter(data) {
    //const characterIndex = await createCharacterIndex()
    const character = await getData()
    const homeworld = await getData(character.homeworld)
    const filmUrls = character.films
    const filmList = []
    /* uses film urls from API data to get and render name of each residents' homeworld, 
    each resident name is
    seprated by commas */
    for (const filmUrl of filmUrls) {
      const film = await getData(filmUrl)
      filmList.push(film.title)
    }
      const films = filmList.join(", ");
      characterHtmlSegment =
        `
        <div class="child">
          <h1>Character Spotlight<h1>
            <h2>${character.name}</h2>
              <h3>Height: <span class="bodyText">${character.height}cm</span></h3>
              <h3>Mass: <span class="bodyText">${character.mass}kg</span><h3>
              <h3>Birth year: <span class="bodyText">${character.birth_year}</span></h3>
              <h3>Hair color: <span class="bodyText">${character.hair_color}</span></h3>
              <h3>Skin color: <span class="bodyText">${character.skin_color}</span></h3>
              <h3>Eye color: <span class="bodyText">${character.eye_color}</span></h3>
              <h3>Gender: <span class="bodyText">${character.gender}</span></h3>
              <h3>Films: <span class="bodyText">${films}</span></h3>
              <h3 onClick="renderHomeworld('${character.name}','${character.homeworld}')">Homeworld: <span class="bodyText link">${homeworld.name}</span></h3>
            <button onClick="renderCharacter()">Generate New Character</button>
        </div>
        `;
    if (character.name === "unknown" || character.name === undefined) {
      renderCharacter()
    } else {
    container.innerHTML = characterHtmlSegment;
    }
};
  
/* Renders homeworld data if known. */
async function renderHomeworld(characterName, homeworldUrl) {
  const homeworld = await getData(homeworldUrl)
  const residentUrls = homeworld.residents
  const residentList= [];
  /* for of loops through array of residenturls 
  calls getData with endpoint of homeworld.url, gets resident.name value
  pushes resident.name string to residentList an empty array then after all values pushed
  there will a join method to add ',' to each resident in the list
  */
  for (const resUrl of residentUrls) {
    let resident = await getData(resUrl);
    residentList.push(resident.name);
   }
   const residents = residentList.join(', ');   
  /*
   const resIdx = []
   const residentLink = residentList.map((resident, i) => {
	   resIdx.push({i: resident})
   })
   const residentLinkHtmlSegment = `<li onClick="get()">${residentLink}</li>`
  */
  homeworldHtmlSegment =
    `
    <div class="child">
      <h1>Homeworld<h1>
        <h2>${homeworld.name}</h2>
        <h3>Climate: <span class="bodyText">${homeworld.climate}</span></h3>
        <h3>Terrain: <span class="bodyText">${homeworld.terrain}</span></h3>
        <h3>Residents: <span class="bodyText">${residents}</span></h3>
      <button onClick="renderCharacter()">Generate New Character</button>
      <button onClick="renderPreviousData(characterHtmlSegment)">Back</button>
    </div>
    `;
     container.innerHTML = homeworldHtmlSegment;
};

/* calls render characters function on page load*/
renderCharacter();

 