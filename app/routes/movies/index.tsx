import { type LoaderFunction } from '@remix-run/node';
import { useLoaderData, Link } from '@remix-run/react';

import { type Movie, getMovies } from '~/api/studio-ghibli';

export const loader: LoaderFunction = () => {
  return getMovies();
};

export default function MoviesIndex() {
  const movieData = useLoaderData<Movie[]>();

  return (
    <div className="p-10">
      <h1 className="text-center text-4xl font-bold mb-10">
        Studio Ghibli Movies
      </h1>
      <div className="grid grid-cols-4 gap-4 max-w-7xl">
        {movieData.map((m) => (
          <Link
            to={m.id}
            key={m.id}
            className="hover:font-bold hover:shadow-md"
            prefetch="intent"
          >
            <h2 className="text-sm">{m.title}</h2>
            <img src={m.image} alt="movie poster" />
          </Link>
        ))}
      </div>
    </div>
  );
}
