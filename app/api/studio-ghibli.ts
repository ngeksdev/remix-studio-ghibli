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
  const resp = fetch('https://ghibliapi.herokuapp.com/films');
  const movieList: Movie[] = await (await resp).json();

  const filteredMovieList: Movie[] = movieTitle
    ? movieList.filter((movie) =>
        movie.title.toLowerCase().includes(movieTitle.toLowerCase())
      )
    : movieList;

  return filteredMovieList;
};

export const getMovieById = async (movieId: string) => {
  const resp = fetch(`https://ghibliapi.herokuapp.com/films/${movieId}`);
  const movieDetails: Movie = await (await resp).json();

  const characrterResp = Promise.all(
    movieDetails.people
      .filter((url) => url !== 'https://ghibliapi.herokuapp.com/people/')
      .map(async (url) => {
        const resp = fetch(url);
        const character: Character = await (await resp).json();
        return character;
      })
  );

  const characters = await characrterResp;

  return { ...movieDetails, characters };
};

export const getCharacterById = async (characterId: string) => {
  const resp = fetch(`https://ghibliapi.herokuapp.com/people/${characterId}`);
  const character: Character = await (await resp).json();

  return character;
};
