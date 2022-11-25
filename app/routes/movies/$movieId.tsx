import type { LoaderFunction, LoaderArgs } from '@remix-run/node';
import { useLoaderData, Link } from '@remix-run/react';

import { getMovieById } from '~/api/studio-ghibli';
import MovieBanner from '~/components/MovieBanner';

import invariant from 'tiny-invariant';

export const loader: LoaderFunction = ({ params }: LoaderArgs) => {
  invariant(params.movieId, 'Expected as params.movieId');

  return getMovieById(params.movieId);
};

type LoaderData = Awaited<ReturnType<typeof getMovieById>>;

export default function MovieId() {
  const movieDetails = useLoaderData<LoaderData>();

  return (
    <div className="w-[80rem]">
      <MovieBanner movie={movieDetails} />

      <div className="py-3 px-3">{movieDetails.description}</div>
    </div>
  );
}
