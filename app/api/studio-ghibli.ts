export interface Movie {
  id: string;
  title: string;
  original_title: string;
  image: string;
  movie_banner: string;
  description: string;
  characters: string[];
}

export const getMovies = async () => {
  const resp = fetch('https://ghibliapi.herokuapp.com/films');
  const movieList: Movie[] = await (await resp).json();

  return movieList;
};
