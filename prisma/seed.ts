import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

async function seed() {
  await Promise.all(
    getComments().map((comment) => {
      return db.comment.create({ data: comment });
    })
  );
}

seed();

function getComments() {
  return [
    {
      name: 'John Doe',
      message: 'Lorem ipsum dolor sit amet.',
      movieId: '2baf70d1-42bb-4437-b551-e5fed5a87abe'
    },
    {
      name: 'Regina Meyer',
      message: 'Lorem ipsum dolor sit amet.',
      movieId: '2baf70d1-42bb-4437-b551-e5fed5a87abe'
    }
  ];
}
