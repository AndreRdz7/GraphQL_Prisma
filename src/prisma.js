import { Prisma } from "prisma-binding";

const prisma = new Prisma({
  typeDefs: "src/generated/prisma.graphql",
  endpoint: "http://localhost:4466"
});

const createPostForUser = (authorId, data) => {
  const post = await prisma.mutation.createPost({
    data: {
      ...data,
      author: {
        connect:{
          id: authorId
        }
      }
    }
  }, '{ id }')
  const user = await prisma.query.user({
    where: {
      id: authorId
    }
  }, '{ id name email posts { id title published }}')
  return user;
}

// prisma.query.users(null, "{ id name email }").then(data => {
//   console.log(JSON.stringify(data, undefined, 2));
// });

// prisma.mutation
//   .createPost(
//     {
//       data: {
//         title: "hello",
//         body: "is it me you are looking for",
//         published: true,
//         author: {
//           connect: {
//             id: "ck6cfz83l003i0754dh9sgdnd"
//           }
//         }
//       }
//     },
//     "{id title body published}"
//   )
//   .then(data => {
//     console.log(JSON.stringify(data, undefined, 2 ));
//     return prisma.query.users(null, "{id name posts {id title}}");
//   })
//   .then(data => {
//     console.log(JSON.stringify(data, undefined, 2));
//   });
