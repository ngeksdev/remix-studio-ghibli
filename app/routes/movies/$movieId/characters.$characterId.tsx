import type { LoaderFunction, LoaderArgs, MetaFunction } from '@remix-run/node';
import { useLoaderData, useCatch } from '@remix-run/react';
import { getCharacterById } from '~/api/studio-ghibli';
import invariant from 'tiny-invariant';

export const loader: LoaderFunction = async ({ params }: LoaderArgs) => {
  invariant(params.characterId, 'Expected params.characterId');

  return await getCharacterById(params.characterId);
};

type LoaderData = Awaited<ReturnType<typeof getCharacterById>>;

export default function Character() {
  const characterDetails = useLoaderData<LoaderData>();

  return (
    <div className="mb-3">
      <h3 className="font-bold text-2xl py-3">Character Details</h3>
      <div className="p-4 rounded shadow-lg border">
        <div className="text-gray-700 font-bold text-xl mb-2">
          {characterDetails.name}
        </div>
        <ul className="py-2">
          <li>Gender: {characterDetails.gender}</li>
          <li>Age: {characterDetails.age}</li>
          <li>Eye Color: {characterDetails.eye_color}</li>
          <li>Hair Color: {characterDetails.hair_color}</li>
        </ul>
      </div>
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return (
      <div className="mb-3">
        <div className="text-3xl mb-2">Details</div>
        <div className="p-4 rounded shadow-lg border bg-orange-200 border-orange-600">
          <div className="text-gray-700 font-bold text-xl mb-2">
            {caught.data}
          </div>
          <p>
            {caught.status}: {caught.statusText}
          </p>
        </div>
      </div>
    );
  }

  throw new Error('Unkown error occured.');
}

// export function ErrorBoundary({ error }: any) {
//   return (
//     <div className="mb-3">
//       <div className="font-bold text-2xl py-3">Details</div>
//       <div className="p-4 rounded shadow-lg border bg-orange-200 border-orange-600">
//         <div className="text-gray-700 font-bold text-xl mb-2">
//           Uh oh... Something went wrong!
//         </div>
//         <p>{error?.message}</p>
//       </div>
//     </div>
//   );
// }
