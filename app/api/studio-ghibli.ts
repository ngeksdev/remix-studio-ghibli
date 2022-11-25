import { resolvePath } from 'react-router';

export interface Movie {
  id: string;
  title: string;
  original_title: string;
  image: string;
  movie_banner: string;
  description: string;
  people: string[];
  characters: Character[];
}

export interface Character {
  id: string;
  name: string;
  gender?: string;
  age?: string;
  eye_color?: string;
  hair_color?: string;
}

export const getMovies = async (movieTitle?: string) => {
  const moviePromise: Promise<Movie[]> = fetch(
    'https://ghibliapi.herokuapp.com/films'
  )
    .then((resp) => resp.json())
    .then((movies: Movie[]) => {
      return movies;
    });

  const movieList = await moviePromise;

  const filteredMovieList = movieTitle
    ? movieList.filter((movie) =>
        movie.title.toLowerCase().includes(movieTitle.toLowerCase())
      )
    : movieList;

  return filteredMovieList;
};

export const getMovieById = async (movieId: string) => {
  const moviePromise: Promise<Movie> = fetch(
    `https://ghibliapi.herokuapp.com/films/${movieId}`
  )
    .then((resp) => resp.json())
    .then((movie: Movie) => {
      return movie;
    });

  const movieDetails = await moviePromise;

  const charactersPromise: Promise<Character[]> = Promise.all(
    movieDetails.people
      .filter((url) => url !== 'https://ghibliapi.herokuapp.com/people/')
      .map((url) =>
        fetch(url)
          .then((resp) => resp.json())
          .then((character: Character) => {
            return character;
          })
      )
  );

  const characters = await charactersPromise;

  return { ...movieDetails, characters };
};
