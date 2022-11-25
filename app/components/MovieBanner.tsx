import type { Movie } from '~/api/studio-ghibli';
import { Link } from '@remix-run/react';

type MovieAsProps = {
  movie: Movie;
};

export default function MovieBanner({ movie: m }: MovieAsProps) {
  return (
    <div className="relative w-full">
      <img
        className="object-cover object-top h-96 w-full"
        src={m.movie_banner}
        alt={m.title}
      />
      <div className="font-bold text-white h-96 absolute top-0 left-0 flex flex-col justify-between">
        <Link
          to="/movies"
          prefetch="intent"
          className="text-xl underline py-3 px-3"
        >
          Back
        </Link>
        <h2 className="text-2xl bg-gray-800 opacity-70 px-3 py-3 text-white">
          {m.title}
        </h2>
      </div>
    </div>
  );
}
