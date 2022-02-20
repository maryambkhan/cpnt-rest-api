const randomIndex = function (length) {
  return Math.floor(Math.random() * length);
}
const fetchData = async function (url) {
  
  try {
     
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        const character = data[randomIndex(data.length)];

        console.log(character);

        const output = `
     <h1>${character.title}</h1>
     <h2>${character.original_title}</h2>
     <img src="${character.image}" alt="Images of ${character.title}">
     <p>${character.description}</p>
    <p>Producer:  ${character.producer}</p>
    <p>Director:  ${character.director}</p>
    <p>
     <a href="${character.url}">Locations</a>
    </p>
      
      `;
        document.querySelector('.content').innerHTML = output;

      } catch (error) {
      console.error("There was problem.");
    }

  }

 const endpoint = 'https://ghibliapi.herokuapp.com/films';
 fetchData(endpoint);

  // button
  const next = function () {
    fetchData(endpoint);
  }