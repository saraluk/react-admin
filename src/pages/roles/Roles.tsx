import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Wrapper } from "../../components/Wrapper";
import { Role } from "../../models/role";

export function Roles() {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const getRoles = async () => {
      try {
        const { data } = await axios.get("roles");
        setRoles(data);
      } catch (e) {
        console.error(e);
      }
    };

    getRoles();
  }, []);

  const handleDeleteClick = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await axios.delete(`roles/${id}`);

        setRoles(roles.filter((role: Role) => role.id !== id));
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <Wrapper>
      <div className="pt-3 pb-2 mb-3 border-bottom">
        <Link to="/roles/create" className="btn btn-sm btn-outline-secondary">
          Add
        </Link>
      </div>
      <div className="table-responsive small">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role: Role) => (
              <tr key={role.id}>
                <td>{role.id}</td>
                <td>{role.name}</td>
                <td>
                  <div className="btn-group mr-2">
                    <Link
                      to={`/roles/${role.id}/edit`}
                      className="btn btn-sm btn-outline-secondary"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => handleDeleteClick(role.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Wrapper>
  );
}
