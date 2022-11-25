import { Form } from '@remix-run/react';
import type { CommentEntry } from '~/api/comments';

type CommentsListProps = {
  movieId: string;
  comments: CommentEntry[];
};

export default function CommentsList({ movieId, comments }: CommentsListProps) {
  return (
    <div className="p-3">
      <h3 className="font-bold text-2xl">Commnity Comments</h3>
      <div className="flex flex-col space-y-4 my-3">
        {comments.length === 0 && <p>No comments in record.</p>}
        {comments.map((comment) => (
          <div
            key={comment.name}
            className="p-4 rounded border border-slate-400 mb-3"
          >
            <div className="text-gray-700 font-bold text-xl mb-2">
              {comment.name}
            </div>
            <p className="text-gray-700">{comment.message}</p>
          </div>
        ))}

        <div className="p-4 rounded border border-slate-400">
          <Form method="post">
            <fieldset>
              <label className="inline-block my-2">Name: </label>
              <input
                name="name"
                type="text"
                className="border border-slate-400 rounded py-2 px-3 inline-block w-full"
              />

              <label className="inline-block my-2">Message: </label>
              <input
                name="message"
                type="text"
                className="border border-slate-400 rounded py-2 px-3 inline-block w-full"
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                style={{ marginTop: '12px' }}
              >
                Add comment
              </button>
            </fieldset>
          </Form>
        </div>
      </div>
    </div>
  );
}
