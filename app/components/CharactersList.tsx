import { NavLink } from '@remix-run/react';

import type { Character } from '~/api/studio-ghibli';

type CharactersListProps = {
  characters?: Character[];
};

export default function CharacterList({ characters }: CharactersListProps) {
  return (
    <div className="flex-1 max-w-md p-3">
      <h3 className="font-bold text-2xl py-3">Characters</h3>
      <ul className="flex flex-col space-y-3 my-3">
        {characters?.map((character) => (
          <li key={character.id}>
            <NavLink
              to={'character/' + character.id}
              className={({ isActive }) =>
                `w-full hover:underline p-3 rounded border border-slate-400 inline-block ${
                  isActive
                    ? 'bg-slate-300 text-black font-bold border-2'
                    : 'text-blue-500 '
                } `
              }
              prefetch="intent"
            >
              {character.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
