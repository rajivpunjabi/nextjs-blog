import * as React from "react";
import { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from "next";

type TPost = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type TStaticProps = {
  post: TPost;
};

type TStaticPaths = {
  postId: string;
};

type TSinglePostProps = {} & InferGetStaticPropsType<typeof getStaticProps>;

const SinglePost = (props: TSinglePostProps) => {
  console.log(`---------- PROPS -----------`, props);
  return (
    <article>
      <h2>{props.post.title}</h2>
      <p>{props.post.body}</p>
    </article>
  );
};

export default SinglePost;

export const getStaticProps: GetStaticProps<TStaticProps, TStaticPaths> = async (context) => {
  const link = `https://jsonplaceholder.typicode.com/posts/${context.params!.postId}`;

  const post = await (await fetch(link)).json();

  console.log(
    `---------------------FETCHED POST FOR ${context.params?.postId} ---------------------`,
    post
  );

  return {
    props: {
      post,
    },
  };
};

export const getStaticPaths: GetStaticPaths<TStaticPaths> = async (context) => {
  return {
    paths: [{ params: { postId: "1" } }, { params: { postId: "2" } }],
    fallback: true,
  };
};
