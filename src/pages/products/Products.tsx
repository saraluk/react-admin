import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Wrapper } from "../../components/Wrapper";
import { Product } from "../../models/product";

export function Products() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await axios.get(`products?page=${page}`);

        setProducts(data.data);
        setLastPage(data.meta.last_page);
      } catch (error) {
        console.error(error);
      }
    };

    getProducts();
  }, [page]);

  const handleDeleteClick = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await axios.delete(`products/${id}`);
        setProducts(products.filter((p: Product) => p.id !== id));
      } catch (error) {
        console.error(error);
      }
    }
  };

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

  const paginatedNumbers = useMemo(() => {
    const length = lastPage > 3 ? 3 : lastPage;
    const pages = Array.from({ length }, (_, i) => i + 1);
    return pages;
  }, [lastPage]);

  return (
    <Wrapper>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Image</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: Product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>
                  <img src={product.image} alt={product.title} width={50} />
                </td>
                <td>{product.title}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>
                  <div className="btn-group mr-2">
                    <Link
                      to={`/products/${product.id}/edit`}
                      className="btn btn-sm btn-outline-secondary"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => handleDeleteClick(product.id)}
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

      <nav>
        <ul className="pagination">
          <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
            <button
              type="button"
              className="page-link"
              onClick={handlePreviousClick}
              disabled={page === 1}
            >
              Previous
            </button>
          </li>
          {paginatedNumbers.map((num) => (
            <li className={`page-item ${page === num ? "active" : ""}`}>
              <button
                type="button"
                className="page-link"
                onClick={() => handleNumberClick(num)}
                aria-current={page === num ? "page" : undefined}
              >
                {num}
              </button>
            </li>
          ))}
          <li className={`page-item ${page === lastPage ? "disabled" : ""}`}>
            <button
              type="button"
              className="page-link"
              onClick={handleNextClick}
              disabled={page === lastPage}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </Wrapper>
  );
}
