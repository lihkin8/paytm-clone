import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  const REACT_APP_URI = import.meta.env.VITE_REACT_APP_URI;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${REACT_APP_URI}/api/v1/user/bulk?filter=${filter}`
        );
        setUsers(response.data.user);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const debounceFetch = setTimeout(() => {
      fetchData();
    }, 300); // Adjust the delay as needed

    return () => clearTimeout(debounceFetch);
  }, [filter]);

  return (
    <>
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="my-2">
        <input
          type="text"
          placeholder="Search users..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full px-2 py-1 border rounded border-slate-200"
        />
      </div>
      <div>
        {users.map((user) => (
          <User key={user._id} user={user} />
        ))}
      </div>
    </>
  );
};

function User({ user }) {
  const navigate = useNavigate();

  const handleSendMoney = () => {
    navigate(`/send?id=${user._id}&name=${user.firstName}`);
  };

  return (
    <div className="flex justify-between my-2 p-2 border rounded border-slate-200">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center items-center mt-1 mr-2">
          <div className="text-xl">{user.firstName[0]}</div>
        </div>
        <div className="flex flex-col justify-center">
          <div>
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <Button label={"Send Money"} onClick={handleSendMoney} />
      </div>
    </div>
  );
}
