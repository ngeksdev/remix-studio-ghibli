import { redirect } from '@remix-run/node';

export interface Movie {
  id: string;
  title: string;
  original_title: string;
  image: string;
  movie_banner: string;
  description: string;
  characters: string[];
}

export const getMovies = async (movieTitle?: string | null) => {
  const resp = fetch('https://ghibliapi.herokuapp.com/films');
  const movieList: Movie[] = await (await resp).json();

  const filteredMovieList = movieTitle
    ? movieList.filter((m) =>
        m.title.toLowerCase().includes(movieTitle.toLowerCase())
      )
    : movieList;

  return filteredMovieList;
};
