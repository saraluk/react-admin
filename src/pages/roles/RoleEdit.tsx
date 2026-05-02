import axios from "axios";
import { SyntheticEvent, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Wrapper } from "../../components/Wrapper";
import { Permission } from "../../models/permission";

export function RoleEdit() {
  const [permissions, setPermissions] = useState([]);
  const [selected, setSelected] = useState<Array<number>>([]);
  const [name, setName] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const getRole = async () => {
      try {
        const { data: role } = await axios.get(`roles/${id}`);
        setName(role.name);

        const { data: permissions } = await axios.get("permissions");
        setPermissions(permissions);

        setSelected(role.permissions.map((p: Permission) => p.id));
      } catch (e) {
        console.error(e);
      }
    };

    getRole();
  }, [id]);

  const handleCheckPermission = (id: number) => {
    if (selected.some((s) => s === id)) {
      setSelected(selected.filter((s) => s !== id));
      return;
    }

    setSelected([...selected, id]);
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      await axios.put(`roles/${id}`, {
        name,
        permissions: selected,
      });

      setRedirect(true);
    } catch (e) {}
  };

  if (redirect) {
    return <Navigate to="/roles" />;
  }

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 mt-3 row">
          <label htmlFor="name" className="col-sm-2 col-form-label">
            Name
          </label>
          <div className="col-sm-10">
            <input
              className="form-control"
              id="name"
              onChange={(e) => setName(e.target.value)}
              defaultValue={name}
            />
          </div>
        </div>

        <div className="mb-3 row">
          <label htmlFor="permissions" className="col-sm-2 col-form-label">
            Permissions
          </label>
          <div className="col-sm-10">
            {permissions.map((permission: Permission) => (
              <div
                key={permission.id}
                className="form-check form-check-inline col-3"
              >
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="permissions"
                  value={permission.id}
                  onChange={() => handleCheckPermission(permission.id)}
                  checked={selected.some((s) => s === permission.id)}
                />
                <label className="form-check-label">{permission.name}</label>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="btn btn-outline-secondary">
          Save
        </button>
      </form>
    </Wrapper>
  );
}
