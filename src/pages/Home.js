import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "../api/Axios";

export default function Home() {
  const [users, setUsers] = useState();
  const [posts, setPosts] = useState();

  const getUsers = async () => {
    try {
      const { data } = await Axios.get("users");
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getPosts = async () => {
    try {
      const { data } = await Axios.get("posts");
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPostsCount = (userId) => {
    return posts.filter((post) => post.userId == userId).length;
  };

  useEffect(() => {
    getUsers();
    getPosts();
  }, []);

  if (users && posts)
    return (
      <table className="table table-bordered">
        <tr className="">
          <th>ID</th>
          <th>Name</th>
          <th>Username</th>
          <th>Posts</th>
          <th>Details</th>
        </tr>
        {users.map((user) => (
          <tr key={user.username}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.username}</td>
            <td>{getPostsCount(user.id)}</td>
            <td>
              <Link to={`/${user.id}`}>
                <button className="btn btn-outline-primary btn-sm">View</button>
              </Link>
            </td>
          </tr>
        ))}
      </table>
    );
  else
    return (
      <div className="text-center mt-3">
        <div className="spinner-border text-primary">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
}
