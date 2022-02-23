const randomIndex = function (length) {
  return Math.floor(Math.random() * length);
}
// Fetching Data
const fetchData = async function (url) {
  let output = '';
  try {
    const response = await fetch(url);
    if (!response.ok) {
      output = `<p>Error retriving data. Got bad response: ${response.status}</p>`;
      throw new Error(response.statusText);
    }
    const ghibliMovies = await response.json();
    console.log(ghibliMovies);

    // validating ghibliMovies
    if (ghibliMovies == null) {
      console.log(`The selected data was null. List f Ghibli movies: ${ghibliMovies}`);
      throw new Error();
    }
    else if (ghibliMovies.length < 1) {
      console.log(`The selected data is empty. List f Ghibli movies: ${ghibliMovies}`);
      throw new Error();
    }

    const selectedMovie = ghibliMovies[randomIndex(ghibliMovies.length)];

    // validating selectedMovie
    if (selectedMovie == null) {
      console.log(`The selected data was null. Selected movie: ${selectedMovie}`);
      throw new Error();
    }
    else if (selectedMovie.length < 1) {
      console.log(`The selected data is empty. Selected movie: ${selectedMovie}`);
      throw new Error();
    }

    console.log(selectedMovie);
    // validation
    checkIfNullOrNotString(selectedMovie.title);
    checkIfNullOrNotString(selectedMovie.original_title);
    checkIfNullOrNotString(selectedMovie.image);
    checkIfNullOrNotString(selectedMovie.description);
    checkIfNullOrNotString(selectedMovie.producer);
    checkIfNullOrNotString(selectedMovie.director);
    checkIfNullOrNotString(selectedMovie.release_date);
    checkIfNullOrNotString(selectedMovie.url);

    output = `

     <h1>${selectedMovie.title}</h1>
     <h2>${selectedMovie.original_title}</h2>
    <img class="poster" src="${selectedMovie.image}" alt="Images of ${selectedMovie.title}">
    <section class="article-container">
    <h2>Description</h2>
     <p>${selectedMovie.description}</p>
     </section>
    <p><strong>Producer:</strong> ${selectedMovie.producer}&emsp;
    <strong>Director:</strong> ${selectedMovie.director}&emsp;
    <strong>Released In:</strong> ${selectedMovie.release_date}</p>
    <p>
     <a href="${selectedMovie.url}">Locations</a>
    </p>
    `;

  } catch (error) {
    console.error(`Error retriving data. Got bad response: ${error}`);
  }
  document.querySelector('.content').innerHTML = output;
}

const endpoint = 'https://ghibliapi.herokuapp.com/films';
fetchData(endpoint);

//button
const next = function () {
  fetchData(endpoint);
}


// validating 
const checkIfNullOrNotString = function (propertyValue) {
  if (propertyValue == null || !(typeof propertyValue) === 'string') {
    console.log(`Property value ${propertyValue} is type ${typeof propertyValue}`);
    throw new Error();
  }
  else {
    console.log(`Property value ${propertyValue} is not null and of type string.`);
  }

}
