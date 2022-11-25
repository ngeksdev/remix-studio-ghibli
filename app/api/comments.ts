export interface CommentEntry {
  name: string;
  message: string;
  movieId: string;
}

export const getMovieComments = async (movieId: string) => {
  const resp = await fetch(`http://localhost:3001/comments?movieId=${movieId}`);
  const movieComments: CommentEntry[] = await resp.json();

  return movieComments;
};

export const addComment = async (comment: CommentEntry) => {
  const resp = await fetch('http://localhost:3001/comments', {
    method: 'POST',
    body: JSON.stringify(comment),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const newComment: CommentEntry = await resp.json();

  return newComment;
};
