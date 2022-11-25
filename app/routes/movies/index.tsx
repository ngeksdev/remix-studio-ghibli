import type { LoaderFunction } from '@remix-run/node';
import { useLoaderData, Link, Form } from '@remix-run/react';

import { type Movie, getMovies } from '~/api/studio-ghibli';

export const loader: LoaderFunction = ({ request }) => {
  const url = new URL(request.url);
  const titleParam = url.searchParams.get('title')!;

  return getMovies(titleParam);
};

export default function MoviesIndex() {
  const movieData = useLoaderData<Movie[]>();

  return (
    <div className="p-10">
      <h1 className="text-center text-4xl font-bold mb-10">
        Studio Ghibli Movies
      </h1>
      <Form method="get" className="my-5">
        <input
          type="text"
          name="title"
          placeholder="Enter movie title..."
          className="border py-2 px-3 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Search
        </button>
      </Form>

      {movieData.length === 0 ? (
        <div className="min-w-[80rem]">
          <h2>No results found.</h2>
          <Link to="/movies" className="hover:underline">
            Back to Home
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-5 gap-4 max-w-7xl">
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
      )}
    </div>
  );
}
