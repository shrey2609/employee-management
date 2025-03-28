import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './CSS/UsersPage.css'

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  // redirect  to the login if no token is found
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    axios
      .get(`https://reqres.in/api/users?page=${page}`)
      .then((res) => setUsers(res.data.data))
      .catch((err) => console.error("Failed to fetch users:", err));
  }, [page]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      alert("Failed to delete user.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="users-container">
      <div className="header">
        <h2>Users List</h2>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
      <ul className="users-list">
        {users.map((user) => (
          <li key={user.id} className="user-item">
            <img src={user.avatar} alt={user.first_name} />
            {user.first_name} {user.last_name} - {user.email}
            <button>Edit</button>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default UsersPage;
