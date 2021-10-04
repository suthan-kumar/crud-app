import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "../api/Axios";
import Loader from "../components/Loader";

export default function Home() {
  const [users, setUsers] = useState();
  const [user, setUser] = useState();
  const [posts, setPosts] = useState();
  const nameRef = useRef();
  const userNameRef = useRef();

  const getUsers = async () => {
    try {
      const { data } = await Axios.get("users");
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  const createUser = async (user) => {
    try {
      await Axios.post("users", user);
      setUsers([...users, { ...user, id: getId() }]);
      handleClear();
    } catch (error) {
      console.log(error);
      handleClear();
    }
  };

  const updateUser = async () => {
    if (!user) {
      return;
    }
    try {
      const name = nameRef.current.value;
      const username = userNameRef.current.value;
      const data = { name, username };
      await Axios.put(`users/${user.id}`, data);
      data.id = user.id;
      const filtered = users.filter((e) => e.id != user.id);
      setUsers([data, ...filtered]);
      handleClear();
    } catch (error) {
      console.log(error);
      handleClear();
    }
  };

  const deleteUser = async (user) => {
    try {
      await Axios.delete(`users/${user.id}`);
      setUsers(users.filter((e) => e.id !== user.id));
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

  const getId = () => {
    return users.pop().id + 1;
  };

  const handleClear = () => {
    nameRef.current.value = "";
    userNameRef.current.value = "";
    setUser(null);
  };

  const handleCreate = () => {
    const name = nameRef.current.value;
    const username = userNameRef.current.value;
    if (!name && !username) {
      return;
    }
    createUser({ name, username });
  };
  const handleUpdate = (user) => {
    nameRef.current.value = user.name;
    userNameRef.current.value = user.username;
    setUser(user);
  };
  const handleDelete = (user) => {
    deleteUser(user);
  };

  useEffect(() => {
    getUsers();
    getPosts();
  }, []);

  if (users && posts)
    return (
      <div>
        <div className="text-end my-2">
          <div className="row">
            <div className="col-md-4">
              <input
                ref={nameRef}
                className="form-control "
                placeholder="Name"
              />
            </div>
            <div className="col-md-4">
              <input
                ref={userNameRef}
                className="form-control "
                placeholder="Username"
              />
            </div>
            <div className="col-md-3">
              {user ? (
                <button onClick={updateUser} className="btn btn-info me-2">
                  Update
                </button>
              ) : (
                <button onClick={handleCreate} className="btn btn-primary me-2">
                  Create New
                </button>
              )}

              <button onClick={handleClear} className="btn btn-secondary">
                Clear
              </button>
            </div>
          </div>
        </div>
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
                <div>
                  <Link to={`/${user.id}`}>
                    <button className="btn btn-outline-primary btn-sm me-1">
                      View
                    </button>
                  </Link>
                  <button
                    onClick={() => handleUpdate(user)}
                    className="btn btn-outline-info btn-sm me-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user)}
                    className="btn btn-outline-danger  btn-sm me-1"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </table>
      </div>
    );
  else return <Loader />;
}
