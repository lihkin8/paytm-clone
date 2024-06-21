import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";

export const Signin = ({ setUserName, setAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3002/api/v1/user/signin",
        {
          email,
          password,
        }
      );
      const token = response.data.token;

      // Store the token in localStorage
      localStorage.setItem("authToken", token);

      // Fetch the user's profile details
      const profileResponse = await axios.get(
        "http://localhost:3002/api/v1/user/profile",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      const { firstName, lastName } = profileResponse.data;

      setUserName(`${firstName} ${lastName}`);

      localStorage.setItem("userName", `${firstName} ${lastName}`);

      setError("");
      // Redirect to dashboard
      setAuthenticated(true);
      navigate("/dashboard");
    } catch (err) {
      console.error("Error signing in:", err);
      setError(
        "Failed to sign in. Please check your credentials and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4 relative">
          {loading && (
            <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center">
              <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
            </div>
          )}
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          {error && <p className="text-red-500">{error}</p>}
          <InputBox
            placeholder="harkirat@gmail.com"
            label={"Email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputBox
            placeholder="123456"
            label={"Password"}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="pt-4">
            <Button label={"Sign in"} onClick={handleSubmit} />
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};
