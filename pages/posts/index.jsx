import * as React from "react";
import Link from "next/link";

const Posts = (props) => {
  return (
    <div>
      {props.posts.map((post) => (
        <Link href={`/posts/${post.id}`}>
          <a>
            <article key={post.id}>
              <h2>{`${post.id} - ${post.title}`}</h2>
              <p>{post.body}</p>
            </article>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default Posts;

export const getStaticProps = async (context) => {
  let posts = await (await fetch("https://jsonplaceholder.typicode.com/posts")).json();

  return {
    props: {
      posts,
    },
  };
};
