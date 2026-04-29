import React, { useEffect, useMemo, useState } from "react";
import { Wrapper } from "../../components/Wrapper";
import axios from "axios";
import { User } from "../../models/user";
import { Link } from "react-router-dom";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data } = await axios.get(`users?page=${page}`);
        setUsers(data.data);
        setLastPage(data.meta.last_page);
      } catch (e) {
        console.error(e);
      }
    };

    getUsers();
  }, [page]);

  const handleNextClick = () => {
    if (page < lastPage) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePreviousClick = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleNumberClick = (page: number) => {
    setPage(page);
  };

  const handleDeleteClick = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await axios.delete(`users/${id}`);

        setUsers(users.filter((user: User) => user.id !== id));
      } catch (e) {
        console.error(e);
      }
    }
  };

  const paginatedNumbers = useMemo(() => {
    const length = lastPage > 3 ? 3 : lastPage;
    const pages = Array.from({ length }, (_, i) => i + 1);
    return pages;
  }, [lastPage]);

  return (
    <Wrapper>
      <div className="pt-3 pb-2 mb-3 border-bottom">
        <Link to="/users/create" className="btn btn-sm btn-outline-secondary">
          Add
        </Link>
      </div>

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
                <td>
                  <div className="btn-group mr-2">
                    <Link
                      to={`/users/${user.id}/edit`}
                      className="btn btn-sm btn-outline-secondary"
                    >
                      Edit
                    </Link>
                    <a
                      href="#"
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => handleDeleteClick(user.id)}
                    >
                      Delete
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <nav>
        <ul className="pagination">
          <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
            <a href="#" className="page-link" onClick={handlePreviousClick}>
              Previous
            </a>
          </li>
          {paginatedNumbers.map((num) => (
            <li className={`page-item ${page === num ? "active" : ""}`}>
              <a
                className="page-link"
                href="#"
                onClick={() => handleNumberClick(num)}
              >
                {num}
              </a>
            </li>
          ))}
          <li className="page-item">
            <a
              className={`page-link ${page === lastPage ? "disabled" : ""}`}
              href="#"
              onClick={handleNextClick}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </Wrapper>
  );
}
