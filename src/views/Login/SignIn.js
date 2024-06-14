import ApiClient from "../../api-client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, FormGroup, Input, Label, InputGroup, InputGroupText } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { validation } from "../../utils/validation";
import "./login.css";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

function SignIn() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate("/admin/dashboard");
    }
  }, [navigate]);
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const validate = () => {
    const errors = {};
    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email address is invalid";
    }
    if (!password) {
      errors.password = "Password is required";
    } else if (!validation.validatePassword(password)) {
      errors.password = "Password must be at least 6 characters, include one uppercase letter, one lowercase letter, one number, and one special character.";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      try {
        const result = await ApiClient.post('users/signin', { email, password })
        dispatch({ type: "LOGIN", data: result.data });
        if (result.status) {
          navigate("/admin/dashboard");
        } else {
          toast.error("Something went wrong!", { autoClose: 3000 });
        }
      } catch (error) {
        toast.error(error.message, { autoClose: 3000 });
      }
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="mb-10">Welcome</h2>
        <div className="login-logo">Admin</div>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label className="label-text" for="email">
              Email
            </Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <div className="error-message">{errors.email}</div>
            )}
          </FormGroup>
          
          <FormGroup>
            <Label className="label-text" for="password">
              Password
            </Label>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={handlePasswordChange}
              />
              <InputGroupText onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </InputGroupText>
            </InputGroup>
            {errors.password && (
              <div className="error-message">{errors.password}</div>
            )}
          </FormGroup>
          <Button type="submit" className="login-button">
            Sign In
          </Button>
        </Form>
        <p className="signup-link" onClick={handleForgotPassword}>Forgot Password?</p>
      </div>
    </div>
  );
}

export default SignIn;
