import * as React from "react";

const SinglePost = (props) => {
  console.log(`---------- PROPS -----------`, props);
  return (
    <article>
      <h2>{props.post.title}</h2>
      <p>{props.post.body}</p>
    </article>
  );
};

export default SinglePost;

export const getStaticProps = async (context) => {
  const link = `https://jsonplaceholder.typicode.com/posts/${context.params.postId}`;

  const post = await (await fetch(link)).json();

  console.log(
    `------FETCHED POST  ${context.params?.postId} -------`,
    post
  );

  return {
    props: {
      post,
    },
  };
};

export const getStaticPaths= async (context) => {
  return {
    paths: [{ params: { postId: "1" } }, { params: { postId: "2" } }],
    fallback: true,
  };
};
