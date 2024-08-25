import React, { useEffect, useState } from 'react';
import api from '../../api/axios';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await api.get('/users');
        setUsers(data.results);
      } catch (error) {
        console.error('Failed to fetch users', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-light">Users</h1>
          <p className="text-gray-500">Users management</p>
        </div>
      </div>
      <ul>
        {users.map((user) => (
          <li key={user._id}>{`${user.email} - ${user._id}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
