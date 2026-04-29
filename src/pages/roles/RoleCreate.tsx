import axios from "axios";
import { useEffect, useState } from "react";
import { Wrapper } from "../../components/Wrapper";
import { Permission } from "../../models/permission";

export function RoleCreate() {
  const [permissions, setPermissions] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const getPermissions = async () => {
      try {
        const { data } = await axios.get("permissions");
        setPermissions(data);
      } catch (e) {
        console.error(e);
      }
    };

    getPermissions();
  }, []);

  const handleCheckPermission = (id: number) => {};

  return (
    <Wrapper>
      <form>
        <div className="mb-3 mt-3 row">
          <label htmlFor="name" className="col-sm-2 col-form-label">
            Name
          </label>
          <div className="col-sm-10">
            <input className="form-control" id="name" />
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
