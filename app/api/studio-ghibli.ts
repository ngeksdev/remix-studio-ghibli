import { json } from '@remix-run/node';
import { type CommentEntry, getMovieComments } from './comments';

export interface Movie {
  id: string;
  title: string;
  original_title: string;
  image: string;
  movie_banner: string;
  description: string;
  people: string[];
  characters: Character[];
  comments?: CommentEntry[];
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
  const resp = await fetch('https://ghibliapi.herokuapp.com/films');
  const movieList: Movie[] = await resp.json();

  if (movieTitle) {
    return movieList.filter((movie) =>
      movie.title.toLowerCase().includes(movieTitle.toLowerCase())
    );
  }

  return movieList;
};

export const getMovieById = async (movieId: string) => {
  const resp = await fetch(`https://ghibliapi.herokuapp.com/films/${movieId}`);
  const movieDetails: Movie = await resp.json();
  const comments: CommentEntry[] = await getMovieComments(movieId);

  const characrterResp = Promise.all(
    movieDetails.people
      .filter((url) => url !== 'https://ghibliapi.herokuapp.com/people/')
      .map(async (url) => {
        const resp = await fetch(url);
        const character: Character = await resp.json();
        return character;
      })
  );

  const characters = await characrterResp;

  return { ...movieDetails, characters, comments };
};

export const getCharacterById = async (characterId: string) => {
  const resp = await fetch(
    `https://ghibliapi.herokuapp.com/people/${characterId}`
  );

  const character: Character = await resp.json();

  if (!resp.ok) {
    throw json('Uh oh... something went wrong!', {
      status: 404,
      statusText: 'Request not found.'
    });
  }

  return character;
};
