import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Axios from "../api/Axios";

export default function Post() {
  const [post, setPost] = useState();
  const [comments, setComments] = useState();

  const { id } = useParams();
  const getPost = async () => {
    try {
      const { data } = await Axios.get(`posts/${id}`);
      setPost(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getComments = async () => {
    try {
      const { data } = await Axios.get("comments", {
        postId: id,
      });
      setComments(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPost();
    getComments();
  }, [id]);
  return (
    <div>
      {post ? (
        <div className="border p-2">
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ) : (
        <div className="text-center mt-3">
          <div className="spinner-border text-primary">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <h5 className="mt-4">Comments</h5>
      {comments ? (
        <ul className="list-group">
          {comments.map((comment) => (
            <li className="list-group-item" key={post.id}>
              <h5>{comment.name}</h5>
              <p>{comment.body}</p>
              <p className="text-end text-primary">- {comment.email}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center mt-3">
          <div className="spinner-border text-primary">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
}
