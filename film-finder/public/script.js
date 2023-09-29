const tmdbKey = "5fe108494d3411a0ee3ba1d439d378b3";
const tmdbBaseUrl = "https://api.themoviedb.org/3";
const playBtn = document.getElementById("playBtn");

const getGenres = async () => {
  const genreRequestEndpoint = "/genre/movie/list"; // Removed full URL
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`;

  try {
    const response = await fetch(urlToFetch, { cache: "no-cache" });
    if (response.ok) {
      const jsonResponse = await response.json();
      const genres = jsonResponse.genres;
      console.log(genres);
      return genres;
    }
  } catch (error) {
    console.log(error);
  }
};

const getMovies = async () => {
  const selectedGenre = getSelectedGenre();
  const discoverMovieEndpoint = "/discover/movie";
  const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}`;

  const urlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`;

  console.log(urlToFetch);

  try {
    const response = await fetch(urlToFetch, { cache: "no-cache" });
    if (response.ok) {
      const jsonResponse = await response.json();
      const movies = jsonResponse.results;
      //console.log(movies);
      return movies;
    }
  } catch (error) {
    console.log(error);
  }
};

// getMovies();

const getMovieInfo = async (movie) => {
  const movieId = movie.id;
  const movieEndpoint = `/movie/${movieId}`;
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = `${tmdbBaseUrl}${movieEndpoint}${requestParams}`;

  try {
        const response = await fetch(urlToFetch, { cache: "no-cache" });

        if (response){
            const movieInfo = await response.json();
            return movieInfo;
        }

  } catch (error) {
    console.log(error);
  }
};

const showRandomMovie = async () => {
  const movieInfo = document.getElementById("movieInfo");
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  }
  // Define the logic to show a random movie here
  const movies = await getMovies();
  const randomMovie = getRandomMovie(movies);
  const info = await getMovieInfo(randomMovie);
  displayMovie(info);
};

getGenres().then((genres) => {
  populateGenreDropdown(genres);
});

playBtn.onclick = showRandomMovie;
