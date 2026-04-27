import React, { useEffect, useState } from "react";
import { Wrapper } from "../../components/Wrapper";
import axios from "axios";
import { User } from "../../models/user";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const { data } = await axios.get("users");
      setUsers(data.data);
    };

    getUsers();
  }, []);
  return (
    <Wrapper>
      <div className="table-responsive small">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: User) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  {user.first_name} {user.last_name}
                </td>
                <td>{user.email}</td>
                <td>{user.role.name}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Wrapper>
  );
}
