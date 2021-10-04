import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Axios from "../api/Axios";
import Loader from "../components/Loader";

export default function User() {
  const [user, setUser] = useState();
  const [posts, setPosts] = useState();
  const [comments, setComments] = useState();

  const { id } = useParams();
  const getUser = async () => {
    try {
      const { data } = await Axios.get(`users/${id}`);
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getPosts = async () => {
    try {
      const { data } = await Axios.get("posts", {
        params: {
          userId: id,
        },
      });
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getComments = async () => {
    try {
      const { data } = await Axios.get("comments");
      setComments(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCommentsCount = (postId) => {
    return comments.filter((comment) => comment.postId == postId).length;
  };

  useEffect(() => {
    getUser();
    getPosts();
    getComments();
  }, [id]);
  return (
    <div>
      <h2>User Details</h2>
      {user ? (
        <div>
          <p>Name : {user.name}</p>
          <p>Username : {user.username}</p>
          <p>Email : {user.email}</p>
          <p>Phone : {user.phone}</p>
          <p>Website : {user.website}</p>
        </div>
      ) : (
        <Loader />
      )}
      <h2>Posts</h2>
      {posts && comments ? (
        <ul className="list-group">
          {posts.map((post) => (
            <Link to={`/post/${post.id}`} key={post.id}>
              <li className="list-group-item">
                <h5>{post.title}</h5>
                <p>{post.body}</p>
                <p>{getCommentsCount(post.id)} Comments</p>
              </li>
            </Link>
          ))}
        </ul>
      ) : (
        <Loader />
      )}
    </div>
  );
}
