import {
  type LoaderFunction,
  type LoaderArgs,
  type MetaFunction,
  type ActionFunction,
  redirect
} from '@remix-run/node';
import { useLoaderData, Outlet } from '@remix-run/react';

import { getMovieById } from '~/api/studio-ghibli';
import MovieBanner from '~/components/MovieBanner';
import CharacterList from '~/components/CharactersList';
import CommentsList from '~/components/CommentsList';

import invariant from 'tiny-invariant';
import { addComment, type CommentEntry } from '~/api/comments';

export const loader: LoaderFunction = async ({ params }: LoaderArgs) => {
  invariant(params.movieId, 'Expected as params.movieId');

  return await getMovieById(params.movieId);
};

export const action: ActionFunction = async ({ request, params }) => {
  invariant(params.movieId, 'Expected params.movieId');
  const body = await request.formData();

  const comment: CommentEntry = {
    name: body.get('name') as string,
    message: body.get('message') as string,
    movieId: params.movieId
  };

  // console.log(Object.fromEntries(body));
  // return null;

  await addComment(comment);

  return redirect(`/movies/${params.movieId}`);
};

export const meta: MetaFunction = ({ data }) => {
  return { title: data.title, description: data.description };
};

type LoaderData = Awaited<ReturnType<typeof getMovieById>>;

export default function MovieId() {
  const movieDetails = useLoaderData<LoaderData>();

  return (
    <div className="w-[80rem]">
      <MovieBanner movie={movieDetails} />
      <div className="p-10">
        <p>{movieDetails.description}</p>
        <div className="flex py-5 space-x-5">
          <CharacterList characters={movieDetails.characters} />
          <div className="flex-1 flex flex-col justify-between">
            <Outlet />
            <CommentsList
              movieId={movieDetails.id}
              comments={movieDetails.comments || []}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
