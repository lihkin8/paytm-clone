import React from "react";
import { Appbar } from "../components/AppBar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = ({ userName, setAuthenticated }) => {
  const [balance, setBalance] = useState(0);

  const fetchBalance = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3002/api/v1/account/balance",
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      setBalance(response.data.balance.toFixed(2));
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);
  return (
    <div className="flex flex-col space-y-8 bg-gray-100 min-h-screen">
      <Appbar userName={userName} setAuthenticated={setAuthenticated} />
      <div className="w-full p-10 space-y-8">
        <Balance value={balance} />
        <Users />
      </div>
    </div>
  );
};

export default Dashboard;
