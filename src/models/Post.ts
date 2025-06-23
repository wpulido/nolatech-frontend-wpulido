/* This code snippet is defining an interface named `Post` in TypeScript. An interface in TypeScript is
a way to define the shape of an object. In this case, the `Post` interface has five properties: */
export interface Post {
  id: string | number;
  title: string;
  author: string;
  status: string;
  body: string;
}
