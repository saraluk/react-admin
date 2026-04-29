import axios from "axios";
import { SyntheticEvent, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Wrapper } from "../../components/Wrapper";
import { Role } from "../../models/role";

export function UserEdit(props: any) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [roleId, setRoleId] = useState("");
  const [roles, setRoles] = useState([]);
  const [redirect, setRedirect] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const getRoles = async () => {
      try {
        const { data: roleData } = await axios.get("roles");
        setRoles(roleData);

        const { data: userData } = await axios.get(`users/${id}`);
        setFirstName(userData.first_name);
        setLastName(userData.last_name);
        setEmail(userData.email);
        setRoleId(userData.role.id);
      } catch (e) {
        console.error(e);
      }
    };

    getRoles();
  }, [id]);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      await axios.put(`users/${id}`, {
        first_name: firstName,
        last_name: lastName,
        email,
        role_id: roleId,
      });

      setRedirect(true);
    } catch (e) {
      console.error(e);
    }
  };

  if (redirect) {
    return <Navigate to="/users" />;
  }

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="first-name" className="form-label">
            First Name
          </label>
          <input
            className="form-control"
            id="first-name"
            onChange={(e) => setFirstName(e.target.value)}
            defaultValue={firstName}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="last-name" className="form-label">
            Last Name
          </label>
          <input
            className="form-control"
            id="last-name"
            onChange={(e) => setLastName(e.target.value)}
            defaultValue={lastName}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            className="form-control"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            defaultValue={email}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="role" className="form-label">
            Role
          </label>
          <select
            id="role"
            className="form-control"
            onChange={(e) => setRoleId(e.target.value)}
            value={roleId}
          >
            {roles.map((role: Role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-outline-primary">
          Save
        </button>
      </form>
    </Wrapper>
  );
}
