export interface Movie {
  id: string;
  title: string;
  original_title: string;
  image: string;
  movie_banner: string;
  description: string;
  characters: string[];
}

export const getMovies = async (movieTitle?: string): Promise<Movie[]> => {
  const resp = fetch('https://ghibliapi.herokuapp.com/films');
  const movieList: Movie[] = await (await resp).json();

  const filteredMovieList = movieTitle
    ? movieList.filter((m) =>
        m.title.toLowerCase().includes(movieTitle.toLowerCase())
      )
    : movieList;

  return filteredMovieList;
};

export const getMovieById = async (movieId: string): Promise<Movie> => {
  const resp = fetch(`https://ghibliapi.herokuapp.com/films/${movieId}`);
  const movieDetails: Movie = await (await resp).json();

  return movieDetails;
};
