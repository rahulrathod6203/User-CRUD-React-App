import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function UserList() {
  const [users, setUsers] = useState([]);

  const { id } = useParams();

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8080/api/user");
    setUsers(result.data);
  };

  const deleteUser = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover the data!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        await axios.delete(`http://localhost:8080/api/user/${id}`);
        swal({
          title: "User with id " + id + " deleted successfully",
        });
        loadUsers();
      }
    });
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mt-5 ">UserList</h1>
      <Link className="btn btn-primary" to="/addUser">
        Add User
      </Link>
      <hr />
      <table className="table border shadow text-center">
        <thead className="table-success">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Username</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody className="table-striped">
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <Link
                  to={`/updateUser/${user.id}`}
                  className="btn btn-warning mx-2"
                >
                  Update
                </Link>
                <button
                  onClick={() => deleteUser(user.id)}
                  className="btn btn-danger mx-2 "
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
