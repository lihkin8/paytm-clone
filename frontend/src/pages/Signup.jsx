import React, { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Signup = ({ setAuthenticated }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    const userData = {
      firstName,
      lastName,
      email,
      password,
    };

    try {
      const response = await axios.post(
        "http://localhost:3002/api/v1/user/signup",
        userData
      );
      const token = response.data.token;

      // Store the token in localStorage
      localStorage.setItem("authToken", token);
      localStorage.setItem("userName", `${firstName} ${lastName}`);

      // Optionally, redirect the user to another page
      setAuthenticated(true);
      navigate("/dashboard");
    } catch (err) {
      console.error("Error signing up:", err);
      setError("Failed to sign up. Please try again.");
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
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your information to create an account"} />
          {error && <p className="text-red-500">{error}</p>}
          <InputBox
            placeholder="John"
            label={"First Name"}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <InputBox
            placeholder="Doe"
            label={"Last Name"}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
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
            <Button label={"Sign up"} onClick={handleSubmit} />
          </div>
          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};
