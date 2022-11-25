import { db } from '~/utils/db.server';

export interface CommentEntry {
  name: string;
  message: string;
  movieId: string;
}

export const getMovieComments = async (movieId: string) => {
  return await db.comment.findMany({ where: { movieId } });
};

export const addComment = async (comment: CommentEntry) => {
  return await db.comment.create({ data: comment });
};
