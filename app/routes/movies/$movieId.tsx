import type { LoaderFunction, LoaderArgs } from '@remix-run/node';
import { useLoaderData, Outlet } from '@remix-run/react';

import { getMovieById } from '~/api/studio-ghibli';
import MovieBanner from '~/components/MovieBanner';
import CharacterList from '~/components/CharactersList';

import invariant from 'tiny-invariant';

export const loader: LoaderFunction = async ({ params }: LoaderArgs) => {
  invariant(params.movieId, 'Expected as params.movieId');

  return await getMovieById(params.movieId);
};

type LoaderData = Awaited<ReturnType<typeof getMovieById>>;

export default function MovieId() {
  const movieDetails = useLoaderData<LoaderData>();

  return (
    <div className="w-[80rem]">
      <MovieBanner movie={movieDetails} />

      <p className="py-3 px-3">{movieDetails.description}</p>
      <CharacterList characters={movieDetails.characters} />
      <Outlet />
    </div>
  );
}
